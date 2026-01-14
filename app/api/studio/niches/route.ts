import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const niches = await db.niche.findMany({
      include: {
        services: true,
        landingPages: true,
        templates: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: niches,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Niche list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load niches',
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

    if (!body?.name || !body?.slug) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and slug are required to create a niche.'
        },
        { status: 400 }
      )
    }

    const niche = await db.niche.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        isActive: body.isActive ?? true,
        services: body.services?.length
          ? {
              create: body.services.map((service: { name: string; slug: string; description?: string }) => ({
                name: service.name,
                slug: service.slug,
                description: service.description
              }))
            }
          : undefined
      },
      include: { services: true }
    })

    return NextResponse.json({
      success: true,
      data: niche,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Niche create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create niche',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
