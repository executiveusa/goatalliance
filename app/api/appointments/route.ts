import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  const upcoming = searchParams.get('upcoming') === 'true'

  if (!businessId) {
    return NextResponse.json({ error: 'businessId required' }, { status: 400 })
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        businessId,
        ...(upcoming ? { scheduledAt: { gte: new Date() } } : {})
      },
      include: {
        contact: { select: { id: true, name: true, phone: true } }
      },
      orderBy: { scheduledAt: 'asc' }
    })
    return NextResponse.json({ appointments, total: appointments.length })
  } catch (error) {
    console.error('GET /api/appointments error:', error)
    return NextResponse.json({ appointments: [], total: 0 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, contactId, title, service, scheduledAt, duration, notes, price } = body

    if (!businessId || !contactId || !title || !scheduledAt) {
      return NextResponse.json(
        { error: 'businessId, contactId, title, scheduledAt required' },
        { status: 400 }
      )
    }

    const appointment = await prisma.appointment.create({
      data: {
        businessId,
        contactId,
        title,
        service: service || 'General Service',
        scheduledAt: new Date(scheduledAt),
        duration: duration || 60,
        notes: notes || null,
        price: price ? parseFloat(price) : null,
        status: 'SCHEDULED',
      },
      include: {
        contact: { select: { id: true, name: true, phone: true } }
      }
    })

    // Log analytics event
    await prisma.analyticsEvent.create({
      data: {
        businessId,
        eventType: 'appointment_booked',
        value: price ? parseFloat(price) : 0,
      }
    }).catch(() => {})

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error('POST /api/appointments error:', error)
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, ...rest } = body

    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status, ...rest },
      include: { contact: { select: { id: true, name: true } } }
    })

    // If completed, log revenue
    if (status === 'COMPLETED' && appointment.price) {
      await prisma.analyticsEvent.create({
        data: {
          businessId: appointment.businessId,
          eventType: 'revenue_recorded',
          value: appointment.price,
        }
      }).catch(() => {})

      // Update contact revenue + job count
      await prisma.contact.update({
        where: { id: appointment.contactId },
        data: {
          totalRevenue: { increment: appointment.price },
          jobCount: { increment: 1 },
        }
      }).catch(() => {})
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('PATCH /api/appointments error:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
  }
}
