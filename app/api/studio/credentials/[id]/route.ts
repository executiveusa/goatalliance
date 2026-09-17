import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { defaultRecheckDate } from '@/lib/proof'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Verify or dispute a credential. Verification names what was checked:
// verifier + source + verifiedAt + recheckAt are all required for
// SOURCE_VERIFIED - a bare status flip is rejected.
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    const id = (await params).id

    const existing = await db.credential.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Credential not found' }, { status: 404 })
    }

    if (body.status === 'SOURCE_VERIFIED') {
      if (!body.verifier || !body.source) {
        return NextResponse.json(
          { success: false, message: 'SOURCE_VERIFIED requires verifier and source (verified names what was checked).' },
          { status: 400 }
        )
      }
    }

    const credential = await db.credential.update({
      where: { id },
      data: {
        status: body.status,
        scope: body.scope,
        number: body.number,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
        verifier: body.status === 'SOURCE_VERIFIED' ? body.verifier : undefined,
        verifiedAt: body.status === 'SOURCE_VERIFIED' ? new Date() : undefined,
        source: body.source,
        recheckAt: body.status === 'SOURCE_VERIFIED'
          ? defaultRecheckDate(existing.type)
          : undefined
      }
    })

    return NextResponse.json({ success: true, data: credential, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Credential update error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update credential', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
