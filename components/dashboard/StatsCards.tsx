'use client'

import { motion } from 'framer-motion'

interface Stats {
  totalContacts: number
  appointmentsThisWeek: number
  revenueThisMonth: number
  conversionRate: number
  leadsThisWeek: number
  jobsCompleted: number
}

interface StatsCardsProps {
  stats: Stats
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Leads This Week',
      value: stats.leadsThisWeek,
      icon: '🎯',
      color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      textColor: 'text-blue-400',
      trend: '+23% vs last week',
      trendUp: true
    },
    {
      label: 'Appointments',
      value: stats.appointmentsThisWeek,
      icon: '📅',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      textColor: 'text-purple-400',
      trend: '2 today',
      trendUp: true
    },
    {
      label: 'Revenue This Month',
      value: `$${stats.revenueThisMonth.toLocaleString()}`,
      icon: '💰',
      color: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      textColor: 'text-emerald-400',
      trend: '+18% vs last month',
      trendUp: true
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: '📊',
      color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      textColor: 'text-orange-400',
      trend: 'Industry avg: 28%',
      trendUp: stats.conversionRate >= 28
    },
    {
      label: 'Total Contacts',
      value: stats.totalContacts,
      icon: '👥',
      color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
      textColor: 'text-pink-400',
      trend: '+5 this week',
      trendUp: true
    },
    {
      label: 'Jobs Completed',
      value: stats.jobsCompleted,
      icon: '✅',
      color: 'from-teal-500/20 to-teal-600/20 border-teal-500/30',
      textColor: 'text-teal-400',
      trend: 'All time',
      trendUp: true
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className={`bg-gradient-to-br ${card.color} border rounded-2xl p-4 cursor-default`}
        >
          <div className="text-2xl mb-2">{card.icon}</div>
          <div className={`text-2xl font-bold ${card.textColor} mb-0.5`}>{card.value}</div>
          <div className="text-slate-300 text-xs font-medium mb-2">{card.label}</div>
          <div className={`text-xs flex items-center gap-1 ${card.trendUp ? 'text-green-400' : 'text-red-400'}`}>
            <span>{card.trendUp ? '↑' : '↓'}</span>
            <span>{card.trend}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
