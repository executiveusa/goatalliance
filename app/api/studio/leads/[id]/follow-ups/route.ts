import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Speed-to-sale / estimate follow-up log. Log-only: attempts and
// outcomes are recorded here; nothing is dispatched. Dispatch rails
// are a separate, owner-approved, fail-closed concern.
export async function GET(_request: Request, { params }: RouteContext) {
  const followUps = await db.followUp.findMany({
    where: { leadId: (await params).id },
    orderBy: { attemptedAt: 'desc' }
  })
  return NextResponse.json({ success: true, data: followUps, timestamp: new Date().toISOString() })
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const leadId = (await params).id
    const body = await request.json().catch(() => ({}))
    if (!body?.channel || !['SMS', 'EMAIL', 'CALL'].includes(body.channel)) {
      return NextResponse.json(
        { success: false, message: 'channel is required (SMS, EMAIL or CALL).' },
        { status: 400 }
      )
    }

    const lead = await db.lead.findUnique({ where: { id: leadId } })
    if (!lead) {
      return NextResponse.json({ success: false, message: 'Lead not found' }, { status: 404 })
    }

    const followUp = await db.followUp.create({
      data: {
        leadId,
        channel: body.channel,
        outcome: body.outcome ?? 'LOGGED',
        note: body.note,
        attemptedAt: body.attemptedAt ? new Date(body.attemptedAt) : undefined
      }
    })

    return NextResponse.json({
      success: true,
      data: followUp,
      note: 'Logged only. No message or call was dispatched.',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Follow-up log error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to log follow-up', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
