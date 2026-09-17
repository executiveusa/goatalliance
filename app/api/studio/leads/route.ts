import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { scoreLead } from '@/lib/lead-scoring'

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

    const lead = await db.lead.create({
      data: {
        nicheId: body.nicheId,
        landingPageId: body.landingPageId,
        landingVariantId: body.landingVariantId,
        abTestId: body.abTestId,
        source: body.source ?? 'WEBSITE',
        status: body.status ?? 'NEW',
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
          scoring: scoringNote
        }
      }
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
