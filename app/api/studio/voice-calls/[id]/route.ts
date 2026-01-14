import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const call = await db.voiceCall.update({
      where: { id: params.id },
      data: {
        status: body.status,
        direction: body.direction,
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
    console.error('Voice call update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update voice call',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
