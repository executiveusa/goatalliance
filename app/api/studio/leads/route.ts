import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { scoreLead } from '@/lib/lead-scoring'
import { appendRevenueEvent } from '@/lib/revenue-events'

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      include: {
        niche: true,
        landingPage: true,
        landingVariant: true,
        abTest: true,
        voiceCalls: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: leads,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load leads',
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

    if (!body?.nicheId) {
      return NextResponse.json(
        { success: false, message: 'nicheId is required to create a lead.' },
        { status: 400 }
      )
    }

    const scoring = scoreLead(body)
    const scoringNote = `auto-score ${scoring.score}: ${scoring.reasons.join('; ')}`

    // Duplicate check (Phlash: inspect invalid/duplicate/disputed leads
    // before trusting lead counts). Same email or phone in the last 30
    // days flags the lead DUPLICATE; it is kept for the audit trail.
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const dupe = await db.lead.findFirst({
      where: {
        createdAt: { gte: thirtyDaysAgo },
        OR: [
          ...(body.email ? [{ email: body.email }] : []),
          ...(body.phone ? [{ phone: body.phone }] : [])
        ]
      },
      select: { id: true }
    })
    const validation = dupe ? 'DUPLICATE' : 'VALID'

    const lead = await db.lead.create({
      data: {
        nicheId: body.nicheId,
        landingPageId: body.landingPageId,
        landingVariantId: body.landingVariantId,
        abTestId: body.abTestId,
        exposureId: body.exposureId,
        source: body.source ?? 'WEBSITE',
        status: body.status ?? 'NEW',
        validation,
        score: typeof body.score === 'number' ? body.score : scoring.score,
        name: body.name,
        email: body.email,
        phone: body.phone,
        serviceType: body.serviceType,
        message: body.message,
        zipCode: body.zipCode,
        city: body.city,
        state: body.state,
        utm: body.utm,
        metadata: {
          ...(body.metadata && typeof body.metadata === 'object' ? body.metadata : {}),
          scoring: scoringNote,
          ...(dupe ? { duplicateOf: dupe.id } : {})
        }
      }
    })

    await appendRevenueEvent({
      kind: 'LEAD_CREATED',
      leadId: lead.id,
      source: lead.source,
      metadata: { validation, score: lead.score }
    })

    return NextResponse.json({
      success: true,
      data: lead,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create lead',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
