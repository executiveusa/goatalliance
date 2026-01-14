import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const landingPage = await db.landingPage.findUnique({
      where: { id: params.id },
      include: {
        niche: true,
        variants: true,
        abTests: true,
        leads: true
      }
    })

    if (!landingPage) {
      return NextResponse.json(
        { success: false, message: 'Landing page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: landingPage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing page fetch error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load landing page',
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

    const landingPage = await db.landingPage.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        status: body.status,
        goal: body.goal,
        locale: body.locale
      }
    })

    return NextResponse.json({
      success: true,
      data: landingPage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing page update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update landing page',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.landingPage.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'Landing page deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Landing page delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete landing page',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
