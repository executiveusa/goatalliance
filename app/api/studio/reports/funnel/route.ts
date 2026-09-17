import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { computeFunnelReport } from '@/lib/funnel-report'

// Nine-step flywheel report. Read-only.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : undefined
    const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : undefined

    const [leads, bookings, estimates, events] = await Promise.all([
      db.lead.findMany({ select: { source: true, validation: true, createdAt: true } }),
      db.appointment.findMany({ select: { createdAt: true, contactId: true } }),
      db.estimate.findMany({ select: { status: true, amount: true, presentedAt: true, decidedAt: true, contactId: true } }),
      db.revenueEvent.findMany({ select: { kind: true, amount: true, source: true, occurredAt: true } })
    ])

    return NextResponse.json({
      success: true,
      data: computeFunnelReport(
        {
          leads: leads.map(l => ({ ...l, source: l.source as string })),
          bookings,
          estimates,
          events: events.map(e => ({ ...e, kind: e.kind as string }))
        },
        from,
        to
      ),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Funnel report error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to build funnel report', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
