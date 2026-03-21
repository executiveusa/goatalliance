'use client'

import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  title: string
  service: string
  scheduledAt: string
  duration: number
  status: string
  contact: { name: string }
  price?: number
}

const DEMO_APPOINTMENTS: Appointment[] = [
  { id: '1', title: 'Kitchen Repaint', service: 'Interior Painting', scheduledAt: '2026-03-14T09:00:00Z', duration: 480, status: 'CONFIRMED', contact: { name: 'Sarah Kim' }, price: 1800 },
  { id: '2', title: 'Exterior Touch-up', service: 'Exterior Painting', scheduledAt: '2026-03-14T14:00:00Z', duration: 240, status: 'SCHEDULED', contact: { name: 'James Rodriguez' }, price: 950 },
  { id: '3', title: 'Living Room & Hallway', service: 'Interior Painting', scheduledAt: '2026-03-15T08:00:00Z', duration: 360, status: 'SCHEDULED', contact: { name: 'Emily Torres' }, price: 1200 },
  { id: '4', title: 'Fence Staining', service: 'Exterior Staining', scheduledAt: '2026-03-17T10:00:00Z', duration: 300, status: 'CONFIRMED', contact: { name: 'Robert Davis' }, price: 750 },
  { id: '5', title: 'Master Bath + Bedroom', service: 'Interior Painting', scheduledAt: '2026-03-19T09:00:00Z', duration: 420, status: 'SCHEDULED', contact: { name: 'Marcus Chen' }, price: 1400 },
]

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  SCHEDULED: { label: 'Scheduled', color: 'bg-blue-500/20 text-blue-400', dot: 'bg-blue-400' },
  CONFIRMED: { label: 'Confirmed', color: 'bg-green-500/20 text-green-400', dot: 'bg-green-400' },
  COMPLETED: { label: 'Completed', color: 'bg-slate-500/20 text-slate-400', dot: 'bg-slate-400' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400', dot: 'bg-red-400' },
  NO_SHOW: { label: 'No Show', color: 'bg-orange-500/20 text-orange-400', dot: 'bg-orange-400' },
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow'

  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

interface AppointmentsListProps {
  businessId: string
  limit?: number
  showAll?: boolean
}

export default function AppointmentsList({ businessId, limit, showAll }: AppointmentsListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [businessId])

  async function fetchAppointments() {
    try {
      const res = await fetch(`/api/appointments?businessId=${businessId}&upcoming=true`)
      const data = await res.json()
      setAppointments(data.appointments?.length ? data.appointments : DEMO_APPOINTMENTS)
    } catch {
      setAppointments(DEMO_APPOINTMENTS)
    } finally {
      setLoading(false)
    }
  }

  const displayed = limit ? appointments.slice(0, limit) : appointments

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {displayed.map((appt) => {
        const sc = statusConfig[appt.status] || statusConfig.SCHEDULED
        return (
          <div key={appt.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors cursor-pointer">
            {/* Date column */}
            <div className="w-14 shrink-0 text-center">
              <div className="text-xs text-slate-400 font-medium">{formatDate(appt.scheduledAt)}</div>
              <div className="text-sm font-bold text-white">{formatTime(appt.scheduledAt)}</div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-white/10 shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-0.5 truncate">{appt.title}</div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>{appt.contact.name}</span>
                <span>·</span>
                <span>{appt.service}</span>
                <span>·</span>
                <span>{appt.duration >= 60 ? `${appt.duration / 60}h` : `${appt.duration}m`}</span>
              </div>
            </div>

            {/* Price */}
            {appt.price && (
              <div className="text-emerald-400 font-semibold text-sm shrink-0">
                ${appt.price.toLocaleString()}
              </div>
            )}

            {/* Status */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${sc.color}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
              {sc.label}
            </div>
          </div>
        )
      })}

      {!displayed.length && (
        <div className="text-center py-8 text-slate-500">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-sm">No appointments scheduled</div>
        </div>
      )}
    </div>
  )
}
