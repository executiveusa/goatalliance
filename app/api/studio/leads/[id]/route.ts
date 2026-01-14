import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const lead = await db.lead.update({
      where: { id: params.id },
      data: {
        status: body.status,
        score: body.score,
        name: body.name,
        email: body.email,
        phone: body.phone,
        serviceType: body.serviceType,
        message: body.message,
        zipCode: body.zipCode,
        city: body.city,
        state: body.state,
        metadata: body.metadata
      }
    })

    return NextResponse.json({
      success: true,
      data: lead,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Lead update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update lead',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
