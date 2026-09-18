import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { simulateInbound, validateCallRecord } from '@/lib/voice-scope'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Test-only call simulation. Exercises the intake + escalation logic
// against scripted input and stores the call record marked testOnly.
// No telephony: this endpoint cannot place or receive a real call.
export async function POST(request: Request, { params }: RouteContext) {
  try {
    const agentId = (await params).id
    const body = await request.json().catch(() => ({}))

    const agent = await db.voiceAgent.findUnique({ where: { id: agentId } })
    if (!agent) {
      return NextResponse.json({ success: false, message: 'Voice agent not found' }, { status: 404 })
    }

    const plan = simulateInbound({
      safety: body.safety,
      emergency: body.emergency,
      priceCommitment: body.priceCommitment,
      complaint: body.complaint,
      legalOrInsurance: body.legalOrInsurance,
      highTicketAmbiguous: body.highTicketAmbiguous,
      unsupportedQuestion: body.unsupportedQuestion,
      service: body.service,
      place: body.place,
      urgency: body.urgency,
    })

    const outcome = body.outcome ?? (plan.action === 'escalate' ? 'escalated' : undefined)
    const record = {
      callerConsent: body.callerConsent === true,
      disclosureGiven: body.disclosureGiven === true,
      service: body.service,
      place: body.place,
      summary: body.summary,
      outcome,
      escalationReason: plan.escalationReason,
      humanOwner: body.humanOwner,
      slaDueAt: body.slaDueAt ? new Date(body.slaDueAt) : null,
      commitments: body.commitments,
      direction: 'INBOUND' as const,
    }
    const problems = validateCallRecord(record)

    const call = await db.voiceCall.create({
      data: {
        voiceAgentId: agentId,
        direction: 'INBOUND',
        status: 'COMPLETED',
        testOnly: true,
        callerConsent: record.callerConsent,
        disclosureGiven: record.disclosureGiven,
        service: record.service,
        place: record.place,
        urgency: body.urgency,
        summary: record.summary,
        outcome,
        escalationReason: plan.escalationReason,
        humanOwner: record.humanOwner,
        slaDueAt: record.slaDueAt,
        commitments: record.commitments,
        metadata: { simulation: plan, recordProblems: problems }
      }
    })

    return NextResponse.json({
      success: true,
      data: { call, plan, recordComplete: problems.length === 0, recordProblems: problems },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test call error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to simulate call', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
