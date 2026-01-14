import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const agent = await db.voiceAgent.update({
      where: { id: params.id },
      data: {
        name: body.name,
        provider: body.provider,
        status: body.status,
        phoneNumber: body.phoneNumber,
        voice: body.voice,
        config: body.config
      }
    })

    return NextResponse.json({
      success: true,
      data: agent,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Voice agent update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update voice agent',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.voiceAgent.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'Voice agent deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Voice agent delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete voice agent',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
