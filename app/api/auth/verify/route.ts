import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'token required' }, { status: 400 })
    }

    const magicToken = await prisma.magicToken.findUnique({
      where: { token },
      include: { business: true }
    })

    if (!magicToken) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    if (magicToken.usedAt) {
      return NextResponse.json({ error: 'Token already used' }, { status: 401 })
    }

    if (magicToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }

    // Mark token as used
    await prisma.magicToken.update({
      where: { id: magicToken.id },
      data: { usedAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      businessId: magicToken.businessId,
      businessName: magicToken.business.name,
      ownerName: magicToken.business.ownerName,
      slug: magicToken.business.slug,
    })
  } catch (error) {
    console.error('POST /api/auth/verify error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
