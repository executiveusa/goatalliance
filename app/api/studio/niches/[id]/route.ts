import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const niche = await db.niche.findUnique({
      where: { id: params.id },
      include: {
        services: true,
        landingPages: true,
        templates: true
      }
    })

    if (!niche) {
      return NextResponse.json(
        { success: false, message: 'Niche not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: niche,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Niche fetch error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load niche',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const niche = await db.niche.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        isActive: body.isActive
      }
    })

    return NextResponse.json({
      success: true,
      data: niche,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Niche update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update niche',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.niche.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'Niche deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Niche delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete niche',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
