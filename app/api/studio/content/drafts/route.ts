import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { redactTranscript } from '@/lib/content-pipeline'

export async function GET() {
  const drafts = await db.contentDraft.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ success: true, data: drafts, timestamp: new Date().toISOString() })
}

// Create a content draft from a call transcript or raw source text.
// Redaction is assisted + flagged for human confirmation; the original
// transcript stays on the call record, never copied here unredacted.
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    if (!body?.question) {
      return NextResponse.json({ success: false, message: 'question is required.' }, { status: 400 })
    }

    let redactedSource: string | null = null
    let redactionStatus: 'PENDING' | 'NEEDS_HUMAN_CHECK' = 'PENDING'
    let redactionHits: string[] = []

    if (body.voiceCallId) {
      const call = await db.voiceCall.findUnique({ where: { id: body.voiceCallId } })
      if (!call) {
        return NextResponse.json({ success: false, message: 'Voice call not found' }, { status: 404 })
      }
      if (call.transcript) {
        const r = redactTranscript(call.transcript)
        redactedSource = r.text
        redactionHits = r.redactions
        redactionStatus = r.needsHumanCheck ? 'NEEDS_HUMAN_CHECK' : 'PENDING'
      }
    } else if (body.sourceText) {
      const r = redactTranscript(body.sourceText)
      redactedSource = r.text
      redactionHits = r.redactions
      redactionStatus = r.needsHumanCheck ? 'NEEDS_HUMAN_CHECK' : 'PENDING'
    }

    const draft = await db.contentDraft.create({
      data: {
        voiceCallId: body.voiceCallId ?? null,
        question: body.question,
        extractedLanguage: body.extractedLanguage,
        redactedSource,
        redactionStatus,
        draftBody: body.draftBody ?? null,
        recheckAt: body.recheckAt ? new Date(body.recheckAt) : null,
      }
    })

    return NextResponse.json({
      success: true,
      data: draft,
      note: 'Draft created. Redaction is assisted and needs human confirmation; nothing publishes from this table.',
      redactionHits,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Content draft create error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create draft', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
