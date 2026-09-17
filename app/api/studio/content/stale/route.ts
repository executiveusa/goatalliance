import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { isStale } from '@/lib/content-pipeline'

// Stale-content monitor: approved/drafted content past its recheck
// date. Read-only; freshness facts get refreshed by humans.
export async function GET() {
  const drafts = await db.contentDraft.findMany()
  const now = new Date()
  const stale = drafts.filter(d => isStale(d.recheckAt, now))
  return NextResponse.json({
    success: true,
    data: stale,
    count: stale.length,
    timestamp: new Date().toISOString()
  })
}
