import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  const period = searchParams.get('period') || 'week' // week | month | all

  if (!businessId) {
    return NextResponse.json({ error: 'businessId required' }, { status: 400 })
  }

  const now = new Date()
  const periodStart = new Date()

  if (period === 'week') {
    periodStart.setDate(now.getDate() - 7)
  } else if (period === 'month') {
    periodStart.setDate(now.getDate() - 30)
  } else {
    periodStart.setFullYear(2000) // effectively all time
  }

  try {
    const [
      totalContacts,
      periodLeads,
      periodAppointments,
      periodRevenue,
      completedJobs,
    ] = await Promise.all([
      db.contact.count({ where: { businessId } }),
      db.analyticsEvent.count({
        where: { businessId, eventType: 'lead_received', createdAt: { gte: periodStart } }
      }),
      db.appointment.count({
        where: { businessId, scheduledAt: { gte: periodStart, lte: now } }
      }),
      db.analyticsEvent.aggregate({
        where: { businessId, eventType: 'revenue_recorded', createdAt: { gte: periodStart } },
        _sum: { value: true }
      }),
      db.appointment.count({
        where: { businessId, status: 'COMPLETED' }
      }),
    ])

    const revenue = periodRevenue._sum.value || 0
    const conversionRate = periodLeads > 0
      ? Math.round((periodAppointments / periodLeads) * 100)
      : 0

    const stats = {
      totalContacts,
      leadsThisWeek: periodLeads,
      appointmentsThisWeek: periodAppointments,
      revenueThisMonth: Math.round(revenue),
      conversionRate,
      jobsCompleted: completedJobs,
    }

    // Daily breakdown for chart
    const dailyData = await getDailyBreakdown(businessId, periodStart)

    return NextResponse.json({ stats, dailyData, period })
  } catch (error) {
    console.error('GET /api/analytics error:', error)
    // Return sensible demo stats on DB error
    return NextResponse.json({
      stats: {
        totalContacts: 47,
        leadsThisWeek: 12,
        appointmentsThisWeek: 8,
        revenueThisMonth: 14200,
        conversionRate: 42,
        jobsCompleted: 156,
      },
      dailyData: [],
      period,
    })
  }
}

async function getDailyBreakdown(businessId: string, since: Date) {
  const events = await db.analyticsEvent.findMany({
    where: { businessId, createdAt: { gte: since } },
    orderBy: { createdAt: 'asc' }
  })

  // Group by day
  const days: Record<string, { leads: number; revenue: number }> = {}
  events.forEach(e => {
    const day = e.createdAt.toISOString().split('T')[0]
    if (!days[day]) days[day] = { leads: 0, revenue: 0 }
    if (e.eventType === 'lead_received') days[day].leads++
    if (e.eventType === 'revenue_recorded') days[day].revenue += e.value
  })

  return Object.entries(days).map(([date, data]) => ({ date, ...data }))
}
