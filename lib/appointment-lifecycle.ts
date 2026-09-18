// Appointment status lifecycle. Keeps the schedule honest:
// a booked appointment flows forward, and completed/cancelled
// states are terminal.

import type { AppointmentStatus } from '@prisma/client'

export const APPOINTMENT_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  SCHEDULED: ['CONFIRMED', 'CANCELLED', 'NO_SHOW'],
  CONFIRMED: ['COMPLETED', 'CANCELLED', 'NO_SHOW'],
  COMPLETED: [],
  CANCELLED: ['SCHEDULED'], // rescheduling reopens to SCHEDULED
  NO_SHOW: ['SCHEDULED'],
}

export function canTransitionAppointment(from: AppointmentStatus, to: AppointmentStatus): boolean {
  if (from === to) return true
  return APPOINTMENT_TRANSITIONS[from]?.includes(to) ?? false
}
