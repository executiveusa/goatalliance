import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { assignArm } from '@/lib/experiments'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Sticky assignment endpoint. A visitor sees one arm, recorded once,
// with the exact revision at assignment. Only RUNNING tests assign.
export async function POST(request: Request, { params }: RouteContext) {
  try {
    const testId = (await params).id
    const body = await request.json().catch(() => ({}))
    if (!body?.visitorKey) {
      return NextResponse.json({ success: false, message: 'visitorKey is required.' }, { status: 400 })
    }

    const test = await db.aBTest.findUnique({
      where: { id: testId },
      include: { variants: { include: { landingVariant: true } } }
    })
    if (!test) {
      return NextResponse.json({ success: false, message: 'Test not found' }, { status: 404 })
    }
    if (test.status !== 'RUNNING') {
      return NextResponse.json({ success: false, message: `Test is ${test.status}; only RUNNING tests assign exposures.` }, { status: 409 })
    }

    const existing = await db.exposure.findUnique({
      where: { abTestId_visitorKey: { abTestId: testId, visitorKey: body.visitorKey } }
    })
    if (existing) {
      return NextResponse.json({ success: true, data: existing, sticky: true, timestamp: new Date().toISOString() })
    }

    const arm = assignArm(
      testId,
      body.visitorKey,
      test.variants.map(v => ({ id: v.id, trafficPercentage: v.trafficPercentage }))
    )
    if (!arm) {
      return NextResponse.json({ success: false, message: 'Test has no assignable variants.' }, { status: 409 })
    }

    const variant = test.variants.find(v => v.id === arm.id)!
    const exposure = await db.exposure.create({
      data: {
        abTestId: testId,
        abTestVariantId: arm.id,
        visitorKey: body.visitorKey,
        revision: `${variant.landingVariantId}@${variant.landingVariant.updatedAt.toISOString()}`
      }
    })

    return NextResponse.json({ success: true, data: exposure, sticky: false, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Exposure assign error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to assign exposure', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
