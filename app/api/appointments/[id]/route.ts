import { NextRequest, NextResponse } from 'next/server'
import type { AppointmentStatus } from '@prisma/client'

import { db } from '@/lib/db'
import { canTransitionAppointment } from '@/lib/appointment-lifecycle'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const appointment = await db.appointment.findUnique({
    where: { id: (await params).id },
    include: { contact: { select: { id: true, name: true, phone: true } } }
  })
  if (!appointment) {
    return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
  }
  return NextResponse.json({ appointment })
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const body = await request.json()
    const id = (await params).id

    if (body.status) {
      const existing = await db.appointment.findUnique({ where: { id } })
      if (!existing) {
        return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
      }
      if (!canTransitionAppointment(existing.status, body.status as AppointmentStatus)) {
        return NextResponse.json(
          { error: `Invalid status transition ${existing.status} -> ${body.status}` },
          { status: 409 }
        )
      }
    }

    const appointment = await db.appointment.update({
      where: { id },
      data: {
        status: body.status,
        title: body.title,
        service: body.service,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
        duration: body.duration,
        notes: body.notes,
        price: body.price !== undefined ? parseFloat(body.price) : undefined
      },
      include: { contact: { select: { id: true, name: true, phone: true } } }
    })

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error('PATCH /api/appointments/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update appointment' }, { status: 500 })
  }
}
