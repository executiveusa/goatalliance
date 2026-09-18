import { NextResponse } from 'next/server'
import type { ContentReviewStatus, RedactionStatus } from '@prisma/client'

import { db } from '@/lib/db'
import { canTransitionReview, approvalProblems } from '@/lib/content-pipeline'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    const id = (await params).id

    const existing = await db.contentDraft.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Draft not found' }, { status: 404 })
    }

    if (body.reviewStatus && !canTransitionReview(existing.reviewStatus, body.reviewStatus as ContentReviewStatus)) {
      return NextResponse.json(
        { success: false, message: `Invalid review transition ${existing.reviewStatus} -> ${body.reviewStatus}` },
        { status: 409 }
      )
    }

    const nextRedaction = (body.redactionStatus ?? existing.redactionStatus) as RedactionStatus
    const nextReviewer = body.reviewer ?? existing.reviewer
    const nextFreshness = body.freshnessAt ? new Date(body.freshnessAt) : existing.freshnessAt

    if (body.reviewStatus === 'APPROVED') {
      const problems = approvalProblems({
        redactionStatus: nextRedaction,
        reviewer: nextReviewer,
        freshnessAt: nextFreshness
      })
      if (problems.length) {
        return NextResponse.json(
          { success: false, message: `Cannot approve without: ${problems.join('; ')}` },
          { status: 400 }
        )
      }
    }

    const draft = await db.contentDraft.update({
      where: { id },
      data: {
        question: body.question,
        extractedLanguage: body.extractedLanguage,
        draftBody: body.draftBody,
        redactionStatus: body.redactionStatus,
        reviewStatus: body.reviewStatus,
        reviewer: body.reviewer,
        reviewNotes: body.reviewNotes,
        freshnessAt: body.freshnessAt ? new Date(body.freshnessAt) : undefined,
        recheckAt: body.recheckAt ? new Date(body.recheckAt) : undefined,
        reviewedAt: body.reviewStatus === 'APPROVED' || body.reviewStatus === 'REJECTED' ? new Date() : undefined
      }
    })

    return NextResponse.json({ success: true, data: draft, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Content draft update error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update draft', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
