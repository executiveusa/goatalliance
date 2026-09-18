import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Reminder wiring, fail-closed. Sending reminders requires
// REMINDERS_ENABLED=true plus configured delivery rails (none exist
// yet). Until then this refuses instead of pretending to send.
export async function POST(_request: NextRequest, { params }: RouteContext) {
  const id = (await params).id

  if (process.env.REMINDERS_ENABLED !== 'true') {
    return NextResponse.json(
      { success: false, message: 'Reminders are not enabled.' },
      { status: 503 }
    )
  }

  const appointment = await db.appointment.findUnique({ where: { id } })
  if (!appointment) {
    return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 })
  }

  // Delivery rails land here once approved. Until then, send nothing.
  return NextResponse.json(
    { success: false, message: 'Reminder delivery rails not implemented.' },
    { status: 501 }
  )
}
