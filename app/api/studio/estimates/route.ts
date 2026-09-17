import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { appendRevenueEvent } from '@/lib/revenue-events'

export async function GET() {
  const estimates = await db.estimate.findMany({
    include: { contact: true, lead: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ success: true, data: estimates, timestamp: new Date().toISOString() })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body?.businessId) {
      return NextResponse.json(
        { success: false, message: 'businessId is required.' },
        { status: 400 }
      )
    }

    const estimate = await db.estimate.create({
      data: {
        businessId: body.businessId,
        contactId: body.contactId ?? null,
        leadId: body.leadId ?? null,
        amount: body.amount ?? null,
        status: body.status ?? 'DRAFT',
        notes: body.notes ?? null,
        presentedAt: body.status === 'PRESENTED' ? new Date() : null
      }
    })

    if (estimate.status === 'PRESENTED') {
      await appendRevenueEvent({
        kind: 'ESTIMATE_PRESENTED',
        businessId: estimate.businessId,
        estimateId: estimate.id,
        leadId: estimate.leadId,
        amount: estimate.amount
      })
    }

    return NextResponse.json({ success: true, data: estimate, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Estimate create error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create estimate', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
