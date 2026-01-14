import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const variant = await db.landingVariant.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        isControl: body.isControl,
        trafficPercentage: body.trafficPercentage,
        headline: body.headline,
        subheadline: body.subheadline,
        content: body.content
      }
    })

    return NextResponse.json({
      success: true,
      data: variant,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing variant update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update landing variant',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.landingVariant.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'Landing variant deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing variant delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete landing variant',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
