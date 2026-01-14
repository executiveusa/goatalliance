import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const variants = await db.landingVariant.findMany({
      where: { landingPageId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: variants,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing variant list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load landing variants',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    if (!body?.name || !body?.slug) {
      return NextResponse.json(
        { success: false, message: 'Name and slug are required.' },
        { status: 400 }
      )
    }

    const variant = await db.landingVariant.create({
      data: {
        landingPageId: params.id,
        name: body.name,
        slug: body.slug,
        isControl: body.isControl ?? false,
        trafficPercentage: body.trafficPercentage ?? 50,
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
    console.error('Landing variant create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create landing variant',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
