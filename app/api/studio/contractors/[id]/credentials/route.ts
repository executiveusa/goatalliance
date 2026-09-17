import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { derivedCredentialStatus } from '@/lib/proof'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const credentials = await db.credential.findMany({
    where: { contractorId: (await params).id },
    orderBy: { createdAt: 'desc' }
  })
  const now = new Date()
  return NextResponse.json({
    success: true,
    data: credentials.map(c => ({ ...c, derivedStatus: derivedCredentialStatus(c, now) })),
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const body = await request.json()
    if (!body?.type || !body?.issuer) {
      return NextResponse.json(
        { success: false, message: 'type and issuer are required.' },
        { status: 400 }
      )
    }
    const credential = await db.credential.create({
      data: {
        contractorId: (await params).id,
        type: body.type,
        issuer: body.issuer,
        scope: body.scope,
        number: body.number,
        issuedAt: body.issuedAt ? new Date(body.issuedAt) : null,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        source: body.source,
        status: 'CLAIMED'
      }
    })
    return NextResponse.json({ success: true, data: credential, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Credential create error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create credential', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
