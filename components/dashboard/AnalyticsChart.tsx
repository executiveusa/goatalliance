'use client'

import { useState, useEffect } from 'react'

interface ChartData {
  label: string
  leads: number
  revenue: number
  appointments: number
}

const DEMO_DATA: ChartData[] = [
  { label: 'Mon', leads: 3, revenue: 1200, appointments: 2 },
  { label: 'Tue', leads: 5, revenue: 2800, appointments: 3 },
  { label: 'Wed', leads: 2, revenue: 950, appointments: 1 },
  { label: 'Thu', leads: 7, revenue: 3400, appointments: 4 },
  { label: 'Fri', leads: 4, revenue: 1900, appointments: 3 },
  { label: 'Sat', leads: 6, revenue: 2200, appointments: 2 },
  { label: 'Sun', leads: 1, revenue: 600, appointments: 1 },
]

const sourceBreakdown = [
  { source: 'Facebook', leads: 12, color: 'bg-blue-500', pct: 38 },
  { source: 'Google', leads: 8, color: 'bg-red-500', pct: 25 },
  { source: 'Referral', leads: 7, color: 'bg-green-500', pct: 22 },
  { source: 'Website', leads: 3, color: 'bg-purple-500', pct: 9 },
  { source: 'Other', leads: 2, color: 'bg-slate-500', pct: 6 },
]

interface AnalyticsChartProps {
  businessId: string
}

export default function AnalyticsChart({ businessId }: AnalyticsChartProps) {
  const [data] = useState<ChartData[]>(DEMO_DATA)
  const [metric, setMetric] = useState<'leads' | 'revenue' | 'appointments'>('leads')

  const maxVal = Math.max(...data.map(d => d[metric]))

  const metricConfig = {
    leads: { label: 'Leads', color: 'bg-indigo-500', textColor: 'text-indigo-400' },
    revenue: { label: 'Revenue ($)', color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    appointments: { label: 'Appointments', color: 'bg-purple-500', textColor: 'text-purple-400' },
  }

  const mc = metricConfig[metric]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar chart */}
      <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Weekly Performance</h3>
          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            {(['leads', 'revenue', 'appointments'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  metric === m ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {metricConfig[m].label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart bars */}
        <div className="flex items-end gap-3 h-40">
          {data.map((d, i) => {
            const height = maxVal > 0 ? (d[metric] / maxVal) * 100 : 0
            const val = metric === 'revenue' ? `$${d[metric].toLocaleString()}` : d[metric]
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex justify-center">
                  <div
                    className={`${mc.color} rounded-t-lg w-full opacity-80 group-hover:opacity-100 transition-all cursor-pointer min-h-1`}
                    style={{ height: `${Math.max(height, 2)}%` }}
                    title={`${d.label}: ${val}`}
                  />
                  <div className="absolute -top-7 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {val}
                  </div>
                </div>
                <span className="text-slate-500 text-xs">{d.label}</span>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-white/10 flex gap-6">
          <div>
            <div className={`text-xl font-bold ${mc.textColor}`}>
              {metric === 'revenue'
                ? `$${data.reduce((s, d) => s + d[metric], 0).toLocaleString()}`
                : data.reduce((s, d) => s + d[metric], 0)}
            </div>
            <div className="text-slate-500 text-xs">Total this week</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">
              {metric === 'revenue'
                ? `$${Math.round(data.reduce((s, d) => s + d[metric], 0) / data.length).toLocaleString()}`
                : (data.reduce((s, d) => s + d[metric], 0) / data.length).toFixed(1)}
            </div>
            <div className="text-slate-500 text-xs">Daily average</div>
          </div>
        </div>
      </div>

      {/* Source breakdown */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-5">Lead Sources</h3>
        <div className="space-y-4">
          {sourceBreakdown.map((s) => (
            <div key={s.source}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">{s.source}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs">{s.leads} leads</span>
                  <span className="text-white text-sm font-semibold">{s.pct}%</span>
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${s.color} rounded-full`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">42%</div>
            <div className="text-slate-400 text-sm">Avg conversion rate</div>
            <div className="text-green-400 text-xs mt-1">↑ 14% vs industry avg</div>
          </div>
        </div>
      </div>
    </div>
  )
}
