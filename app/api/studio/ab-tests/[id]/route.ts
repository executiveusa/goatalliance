import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const test = await db.aBTest.update({
      where: { id: params.id },
      data: {
        name: body.name,
        status: body.status,
        goal: body.goal,
        metric: body.metric,
        startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
        endsAt: body.endsAt ? new Date(body.endsAt) : undefined
      }
    })

    return NextResponse.json({
      success: true,
      data: test,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update A/B test',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.aBTest.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'A/B test deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AB test delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete A/B test',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
