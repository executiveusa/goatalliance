import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const agents = await db.voiceAgent.findMany({
      include: { calls: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: agents,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Voice agent list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load voice agents',
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

    if (!body?.name || !body?.provider) {
      return NextResponse.json(
        { success: false, message: 'Name and provider are required.' },
        { status: 400 }
      )
    }

    const agent = await db.voiceAgent.create({
      data: {
        name: body.name,
        provider: body.provider,
        status: body.status ?? 'INACTIVE',
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
    console.error('Voice agent create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create voice agent',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
