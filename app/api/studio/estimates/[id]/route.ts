import { NextResponse } from 'next/server'
import type { EstimateStatus } from '@prisma/client'

import { db } from '@/lib/db'
import { canTransitionEstimate } from '@/lib/estimate-lifecycle'
import { appendRevenueEvent } from '@/lib/revenue-events'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    const id = (await params).id

    const existing = await db.estimate.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Estimate not found' }, { status: 404 })
    }

    if (body.status && !canTransitionEstimate(existing.status, body.status as EstimateStatus)) {
      return NextResponse.json(
        { success: false, message: `Invalid estimate transition ${existing.status} -> ${body.status}` },
        { status: 409 }
      )
    }

    // A decided estimate needs a reason when lost (rehash engine input).
    if (body.status === 'LOST' && !body.lossReason && !existing.lossReason) {
      return NextResponse.json(
        { success: false, message: 'lossReason is required when marking an estimate LOST' },
        { status: 400 }
      )
    }

    const estimate = await db.estimate.update({
      where: { id },
      data: {
        status: body.status,
        amount: body.amount,
        notes: body.notes,
        lossReason: body.lossReason,
        presentedAt: body.status === 'PRESENTED' && !existing.presentedAt ? new Date() : undefined,
        decidedAt: (body.status === 'WON' || body.status === 'LOST') ? new Date() : undefined
      }
    })

    if (body.status === 'PRESENTED' && !existing.presentedAt) {
      await appendRevenueEvent({ kind: 'ESTIMATE_PRESENTED', businessId: estimate.businessId, estimateId: id, leadId: estimate.leadId, amount: estimate.amount })
    }
    if (body.status === 'WON') {
      await appendRevenueEvent({ kind: 'WON', businessId: estimate.businessId, estimateId: id, leadId: estimate.leadId, amount: estimate.amount })
    }
    if (body.status === 'LOST') {
      await appendRevenueEvent({ kind: 'LOST', businessId: estimate.businessId, estimateId: id, leadId: estimate.leadId, amount: estimate.amount, metadata: { lossReason: estimate.lossReason } })
    }

    return NextResponse.json({ success: true, data: estimate, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Estimate update error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update estimate', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
