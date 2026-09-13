import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status')

  if (!businessId) {
    return NextResponse.json({ error: 'businessId required' }, { status: 400 })
  }

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        businessId,
        ...(status ? { status: status as any } : {}),
        ...(search ? {
          OR: [
            { name: { contains: search } },
            { phone: { contains: search } },
            { email: { contains: search } },
          ]
        } : {})
      },
      include: {
        appointments: {
          orderBy: { scheduledAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ contacts, total: contacts.length })
  } catch (error) {
    console.error('GET /api/contacts error:', error)
    return NextResponse.json({ contacts: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, name, phone, email, source, status, notes } = body

    if (!businessId || !name) {
      return NextResponse.json({ error: 'businessId and name required' }, { status: 400 })
    }

    // Ensure business exists (create demo if not)
    await ensureBusinessExists(businessId)

    const contact = await prisma.contact.create({
      data: {
        businessId,
        name,
        phone: phone || null,
        email: email || null,
        source: source || 'WEBSITE',
        status: status || 'NEW',
        notes: notes || null,
      }
    })

    // Log analytics event
    await prisma.analyticsEvent.create({
      data: {
        businessId,
        eventType: 'lead_received',
        source: source || 'WEBSITE',
        value: 0,
      }
    }).catch(() => {}) // Non-blocking

    return NextResponse.json({ contact }, { status: 201 })
  } catch (error) {
    console.error('POST /api/contacts error:', error)
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const contact = await prisma.contact.update({
      where: { id },
      data: updates
    })
    return NextResponse.json({ contact })
  } catch (error) {
    console.error('PATCH /api/contacts error:', error)
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

async function ensureBusinessExists(businessId: string) {
  const existing = await prisma.business.findUnique({ where: { id: businessId } })
  if (!existing) {
    await prisma.business.create({
      data: {
        id: businessId,
        name: 'Demo Business',
        slug: businessId,
        ownerName: 'Demo Owner',
        niche: 'general',
      }
    }).catch(() => {})
  }
}
