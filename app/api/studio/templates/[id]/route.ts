import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: { id: string }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()

    const template = await db.siteTemplate.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        nicheId: body.nicheId,
        status: body.status,
        description: body.description,
        sections: body.sections
      }
    })

    return NextResponse.json({
      success: true,
      data: template,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Template update error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update template',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    await db.siteTemplate.delete({ where: { id: params.id } })

    return NextResponse.json({
      success: true,
      message: 'Template deleted',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Template delete error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete template',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
