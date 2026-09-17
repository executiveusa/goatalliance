import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { armFunnel, isConclusive } from '@/lib/experiments'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Revenue-linked experiment report. Primary metric: qualified booked
// opportunity per unique visitor. No winner is declared below the
// predefined sample size - the report says inconclusive instead.
export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const testId = (await params).id
    const test = await db.aBTest.findUnique({
      where: { id: testId },
      include: { variants: true }
    })
    if (!test) {
      return NextResponse.json({ success: false, message: 'Test not found' }, { status: 404 })
    }

    const arms = []
    for (const variant of test.variants) {
      const [visitors, leads] = await Promise.all([
        db.exposure.count({ where: { abTestVariantId: variant.id } }),
        db.lead.findMany({
          where: { exposure: { abTestVariantId: variant.id } },
          select: { id: true, validation: true, status: true }
        })
      ])
      const wonEstimates = await db.estimate.findMany({
        where: { leadId: { in: leads.map(l => l.id) }, status: 'WON' },
        select: { amount: true }
      })
      arms.push(armFunnel(variant.id, visitors, leads, wonEstimates))
    }

    return NextResponse.json({
      success: true,
      data: {
        testId,
        status: test.status,
        hypothesis: test.hypothesis,
        plannedSampleSize: test.plannedSampleSize,
        primaryMetric: 'qualified booked opportunity per unique visitor',
        arms,
        conclusive: isConclusive(arms, test.plannedSampleSize),
        note: 'No winner below the predefined sample. Downstream measures (valid lead, booking, estimate, win, revenue) are listed per arm; compare on the primary metric only when conclusive.'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Experiment report error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to build experiment report', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
