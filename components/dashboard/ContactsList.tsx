'use client'

import { useState, useEffect } from 'react'

interface Contact {
  id: string
  name: string
  phone?: string
  email?: string
  source: string
  status: string
  totalRevenue: number
  jobCount: number
  createdAt: string
}

const DEMO_CONTACTS: Contact[] = [
  { id: '1', name: 'James Rodriguez', phone: '+1 (206) 555-0142', email: 'james@email.com', source: 'FACEBOOK', status: 'ACTIVE', totalRevenue: 2400, jobCount: 3, createdAt: '2026-03-10T10:00:00Z' },
  { id: '2', name: 'Sarah Kim', phone: '+1 (206) 555-0198', email: 'sarah@email.com', source: 'GOOGLE', status: 'VIP', totalRevenue: 8700, jobCount: 9, createdAt: '2026-02-28T14:00:00Z' },
  { id: '3', name: 'Marcus Chen', phone: '+1 (206) 555-0231', email: '', source: 'REFERRAL', status: 'NEW', totalRevenue: 0, jobCount: 0, createdAt: '2026-03-13T09:00:00Z' },
  { id: '4', name: 'Emily Torres', phone: '+1 (206) 555-0177', email: 'emily.t@gmail.com', source: 'WEBSITE', status: 'ACTIVE', totalRevenue: 1800, jobCount: 2, createdAt: '2026-03-05T11:00:00Z' },
  { id: '5', name: 'Robert Davis', phone: '+1 (206) 555-0263', email: 'rdavis@outlook.com', source: 'GOOGLE', status: 'ACTIVE', totalRevenue: 3200, jobCount: 4, createdAt: '2026-02-15T15:00:00Z' },
  { id: '6', name: 'Linda Washington', phone: '+1 (206) 555-0312', email: '', source: 'PHONE', status: 'INACTIVE', totalRevenue: 950, jobCount: 1, createdAt: '2026-01-20T10:00:00Z' },
  { id: '7', name: 'Tom Park', phone: '+1 (206) 555-0089', email: 'tom.park@email.com', source: 'FACEBOOK', status: 'VIP', totalRevenue: 12400, jobCount: 14, createdAt: '2025-11-12T09:00:00Z' },
]

const sourceColors: Record<string, string> = {
  FACEBOOK: 'bg-blue-500/20 text-blue-400',
  GOOGLE: 'bg-red-500/20 text-red-400',
  REFERRAL: 'bg-green-500/20 text-green-400',
  WEBSITE: 'bg-slate-500/20 text-slate-400',
  WHATSAPP: 'bg-emerald-500/20 text-emerald-400',
  PHONE: 'bg-purple-500/20 text-purple-400',
  OTHER: 'bg-gray-500/20 text-gray-400',
}

const statusColors: Record<string, string> = {
  NEW: 'bg-yellow-500/20 text-yellow-400',
  ACTIVE: 'bg-green-500/20 text-green-400',
  INACTIVE: 'bg-slate-500/20 text-slate-300',
  VIP: 'bg-purple-500/20 text-purple-400',
}

interface ContactsListProps {
  businessId: string
  limit?: number
  showAll?: boolean
}

export default function ContactsList({ businessId, limit, showAll }: ContactsListProps) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [businessId])

  async function fetchContacts() {
    try {
      const res = await fetch(`/api/contacts?businessId=${businessId}`)
      const data = await res.json()
      setContacts(data.contacts?.length ? data.contacts : DEMO_CONTACTS)
    } catch {
      setContacts(DEMO_CONTACTS)
    } finally {
      setLoading(false)
    }
  }

  const filtered = contacts.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search) || c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const displayed = limit ? filtered.slice(0, limit) : filtered

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div>
      {showAll && (
        <input
          placeholder="Search contacts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm mb-4"
        />
      )}

      <div className="space-y-2">
        {displayed.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors cursor-pointer group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold shrink-0">
              {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-medium text-white text-sm">{contact.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[contact.status]}`}>
                  {contact.status}
                </span>
              </div>
              <div className="text-slate-400 text-xs flex items-center gap-2">
                {contact.phone && <span>{contact.phone}</span>}
                {contact.email && contact.phone && <span>·</span>}
                {contact.email && <span className="truncate">{contact.email}</span>}
              </div>
            </div>

            {/* Metrics */}
            {showAll && (
              <div className="text-right hidden sm:block">
                <div className="text-emerald-400 text-sm font-semibold">
                  ${contact.totalRevenue.toLocaleString()}
                </div>
                <div className="text-slate-500 text-xs">{contact.jobCount} jobs</div>
              </div>
            )}

            {/* Source */}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${sourceColors[contact.source]}`}>
              {contact.source}
            </span>
          </div>
        ))}
      </div>

      {!showAll && contacts.length > (limit || 0) && (
        <div className="mt-3 text-center">
          <span className="text-indigo-400 text-sm cursor-pointer hover:text-indigo-300">
            +{contacts.length - (limit || 0)} more contacts →
          </span>
        </div>
      )}
    </div>
  )
}
