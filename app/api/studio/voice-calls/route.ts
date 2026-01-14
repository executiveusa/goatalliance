import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const calls = await db.voiceCall.findMany({
      include: {
        voiceAgent: true,
        lead: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: calls,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Voice call list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load voice calls',
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

    if (!body?.voiceAgentId) {
      return NextResponse.json(
        { success: false, message: 'voiceAgentId is required.' },
        { status: 400 }
      )
    }

    const call = await db.voiceCall.create({
      data: {
        voiceAgentId: body.voiceAgentId,
        leadId: body.leadId,
        direction: body.direction ?? 'INBOUND',
        status: body.status ?? 'QUEUED',
        startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
        endedAt: body.endedAt ? new Date(body.endedAt) : undefined,
        recordingUrl: body.recordingUrl,
        transcript: body.transcript,
        summary: body.summary,
        metadata: body.metadata
      }
    })

    return NextResponse.json({
      success: true,
      data: call,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Voice call create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create voice call',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
