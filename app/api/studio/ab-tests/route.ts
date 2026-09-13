import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const tests = await db.aBTest.findMany({
      include: {
        landingPage: true,
        variants: {
          include: { landingVariant: true }
        },
        leads: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: tests,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load A/B tests',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body?.landingPageId || !body?.name) {
      return NextResponse.json(
        { success: false, message: 'Landing page and name are required.' },
        { status: 400 }
      )
    }

    const test = await db.aBTest.create({
      data: {
        landingPageId: body.landingPageId,
        name: body.name,
        status: body.status ?? 'PLANNED',
        goal: body.goal,
        metric: body.metric,
        startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
        endsAt: body.endsAt ? new Date(body.endsAt) : undefined,
        variants: body.variants?.length
          ? {
              create: body.variants.map((variant: {
                landingVariantId: string
                trafficPercentage?: number
                isControl?: boolean
              }) => ({
                landingVariantId: variant.landingVariantId,
                trafficPercentage: variant.trafficPercentage ?? 50,
                isControl: variant.isControl ?? false
              }))
            }
          : undefined
      },
      include: {
        variants: {
          include: { landingVariant: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: test,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create A/B test',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
