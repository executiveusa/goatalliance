import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const landingPages = await db.landingPage.findMany({
      include: {
        niche: true,
        variants: true,
        abTests: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: landingPages,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing page list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load landing pages',
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

    if (!body?.name || !body?.slug || !body?.nicheId) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, and nicheId are required.' },
        { status: 400 }
      )
    }

    const landingPage = await db.landingPage.create({
      data: {
        name: body.name,
        slug: body.slug,
        nicheId: body.nicheId,
        status: body.status ?? 'DRAFT',
        goal: body.goal,
        locale: body.locale ?? 'en-US',
        variants: body.variants?.length
          ? {
              create: body.variants.map((variant: {
                name: string
                slug: string
                isControl?: boolean
                trafficPercentage?: number
                headline?: string
                subheadline?: string
                content?: unknown
              }) => ({
                name: variant.name,
                slug: variant.slug,
                isControl: variant.isControl ?? false,
                trafficPercentage: variant.trafficPercentage ?? 50,
                headline: variant.headline,
                subheadline: variant.subheadline,
                content: variant.content
              }))
            }
          : undefined
      },
      include: { variants: true }
    })

    return NextResponse.json({
      success: true,
      data: landingPage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing page create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create landing page',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
