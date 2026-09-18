import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    const testId = (await params).id

    // Digest test contract: a test may only go RUNNING with one
    // hypothesis, a predefined sample size, an end date and a
    // guardrails attestation (no fake proof/urgency, hidden fees or
    // accessibility harm). This stops noise-peeking launches.
    if (body.status === 'RUNNING') {
      const existing = await db.aBTest.findUnique({ where: { id: testId } })
      if (!existing) {
        return NextResponse.json({ success: false, message: 'Test not found' }, { status: 404 })
      }
      const hypothesis = body.hypothesis ?? existing.hypothesis
      const plannedSampleSize = body.plannedSampleSize ?? existing.plannedSampleSize
      const endsAt = body.endsAt ?? existing.endsAt
      const guardrails = body.guardrails ?? existing.guardrails
      const missing = []
      if (!hypothesis) missing.push('hypothesis')
      if (!plannedSampleSize) missing.push('plannedSampleSize')
      if (!endsAt) missing.push('endsAt')
      if (!guardrails) missing.push('guardrails')
      if (missing.length) {
        return NextResponse.json(
          { success: false, message: `Cannot start a test without: ${missing.join(', ')}` },
          { status: 400 }
        )
      }
    }

    const test = await db.aBTest.update({
      where: { id: testId },
      data: {
        name: body.name,
        status: body.status,
        goal: body.goal,
        metric: body.metric,
        hypothesis: body.hypothesis,
        plannedSampleSize: body.plannedSampleSize,
        guardrails: body.guardrails,
        startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
        endsAt: body.endsAt ? new Date(body.endsAt) : undefined
      }
    })

    return NextResponse.json({
      success: true,
      data: test,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update A/B test',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.aBTest.delete({ where: { id: (await params).id } })

    return NextResponse.json({
      success: true,
      message: 'A/B test deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete A/B test',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
