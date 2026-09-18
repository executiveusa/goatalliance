import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const projects = await db.projectEvidence.findMany({
    where: { contractorId: (await params).id },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ success: true, data: projects, timestamp: new Date().toISOString() })
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    if (!body?.title) {
      return NextResponse.json({ success: false, message: 'title is required.' }, { status: 400 })
    }
    // Media without documented consent is refused at intake, not at
    // publish time - consent is a storage rule, not a render rule.
    const media = Array.isArray(body.mediaUrls) ? body.mediaUrls : []
    if (media.length > 0 && body.consentToPublish !== true) {
      return NextResponse.json(
        { success: false, message: 'Media requires consentToPublish: true documented at intake.' },
        { status: 400 }
      )
    }
    const project = await db.projectEvidence.create({
      data: {
        contractorId: (await params).id,
        title: body.title,
        description: body.description,
        mediaUrls: JSON.stringify(media),
        city: body.city,
        completedAt: body.completedAt ? new Date(body.completedAt) : null,
        consentToPublish: body.consentToPublish === true,
        source: body.source,
        status: 'CLAIMED'
      }
    })
    return NextResponse.json({ success: true, data: project, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Project create error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create project evidence', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
