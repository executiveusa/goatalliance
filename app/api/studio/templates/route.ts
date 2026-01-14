import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  try {
    const templates = await db.siteTemplate.findMany({
      include: { niche: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: templates,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Template list error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load templates',
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
        { success: false, message: 'Name and slug are required.' },
        { status: 400 }
      )
    }

    const template = await db.siteTemplate.create({
      data: {
        name: body.name,
        slug: body.slug,
        nicheId: body.nicheId,
        status: body.status ?? 'ACTIVE',
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
    console.error('Template create error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create template',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
