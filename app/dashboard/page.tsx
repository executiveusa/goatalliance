'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import StatsCards from '@/components/dashboard/StatsCards'
import ContactsList from '@/components/dashboard/ContactsList'
import AppointmentsList from '@/components/dashboard/AppointmentsList'
import AnalyticsChart from '@/components/dashboard/AnalyticsChart'

type Tab = 'overview' | 'contacts' | 'appointments' | 'analytics'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'contacts', label: 'Contacts', icon: '👥' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
]

// Demo business data
const DEMO_BUSINESS = {
  id: 'demo-biz',
  name: "Seattle Pro Painters",
  ownerName: "Mike Johnson",
  niche: "painter",
  city: "Seattle",
  state: "WA",
  plan: "pro"
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [stats, setStats] = useState({
    totalContacts: 0,
    appointmentsThisWeek: 0,
    revenueThisMonth: 0,
    conversionRate: 0,
    leadsThisWeek: 0,
    jobsCompleted: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      const res = await fetch(`/api/analytics?businessId=${DEMO_BUSINESS.id}&period=week`)
      const data = await res.json()
      if (data.stats) setStats(data.stats)
    } catch {
      // Use demo data if API unavailable
      setStats({
        totalContacts: 47,
        appointmentsThisWeek: 8,
        revenueThisMonth: 14200,
        conversionRate: 42,
        leadsThisWeek: 12,
        jobsCompleted: 156
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top navigation */}
      <header className="bg-slate-900/80 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/avatar" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-sm font-bold">
                G
              </div>
              <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                GOAT Alliance
              </span>
            </Link>
            <div className="h-5 w-px bg-white/20" />
            <div>
              <div className="text-sm font-semibold text-white">{DEMO_BUSINESS.name}</div>
              <div className="text-xs text-slate-400 capitalize">{DEMO_BUSINESS.niche} • {DEMO_BUSINESS.city}, {DEMO_BUSINESS.state}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">AI Active</span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer">
              {DEMO_BUSINESS.ownerName[0]}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Good morning, {DEMO_BUSINESS.ownerName.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-400 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 bg-slate-900 border border-white/10 rounded-xl p-1 w-fit mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <StatsCards stats={stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span>📅</span> Upcoming Appointments
                  </h3>
                  <AppointmentsList businessId={DEMO_BUSINESS.id} limit={5} />
                </div>
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span>👥</span> Recent Contacts
                  </h3>
                  <ContactsList businessId={DEMO_BUSINESS.id} limit={5} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">All Contacts</h3>
                <AddContactButton businessId={DEMO_BUSINESS.id} />
              </div>
              <ContactsList businessId={DEMO_BUSINESS.id} showAll />
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Appointments</h3>
                <AddAppointmentButton businessId={DEMO_BUSINESS.id} />
              </div>
              <AppointmentsList businessId={DEMO_BUSINESS.id} showAll />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <StatsCards stats={stats} />
              <AnalyticsChart businessId={DEMO_BUSINESS.id} />
            </div>
          )}
        </motion.div>
      </div>

      {/* WhatsApp FAB */}
      <div className="fixed bottom-6 right-6">
        <motion.a
          href="https://wa.me/?text=Show me today's appointments"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-full shadow-xl shadow-green-500/30 transition-colors"
        >
          <span className="text-xl">💬</span>
          <span className="text-sm">Ask PopeBot</span>
        </motion.a>
      </div>
    </div>
  )
}

function AddContactButton({ businessId }: { businessId: string }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', source: 'WEBSITE' })
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!form.name) return
    setSaving(true)
    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, businessId })
      })
      setOpen(false)
      setForm({ name: '', phone: '', email: '', source: 'WEBSITE' })
    } finally {
      setSaving(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
      >
        <span>+</span> Add Contact
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">New Contact</h3>
        <div className="space-y-3">
          <input
            placeholder="Full name *"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          />
          <input
            placeholder="Phone number"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          />
          <input
            placeholder="Email address"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          />
          <select
            value={form.source}
            onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
          >
            <option value="WEBSITE">Website</option>
            <option value="FACEBOOK">Facebook</option>
            <option value="GOOGLE">Google</option>
            <option value="REFERRAL">Referral</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="PHONE">Phone</option>
          </select>
        </div>
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.name || saving}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            {saving ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AddAppointmentButton({ businessId }: { businessId: string }) {
  return (
    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
      <span>+</span> New Appointment
    </button>
  )
}
