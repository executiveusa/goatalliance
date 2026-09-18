import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { needsRecheck, derivedCredentialStatus } from '@/lib/proof'

// Stale-proof monitor: credentials that are expired, due for recheck,
// or disputed. Read-only; agents watch this and flag, never auto-verify.
export async function GET() {
  const credentials = await db.credential.findMany({ include: { contractor: { select: { id: true, businessName: true } } } })
  const now = new Date()
  const stale = credentials
    .filter(c => needsRecheck(c, now))
    .map(c => ({ ...c, derivedStatus: derivedCredentialStatus(c, now) }))

  return NextResponse.json({
    success: true,
    data: stale,
    count: stale.length,
    timestamp: new Date().toISOString()
  })
}
