'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

// Northwest Contractor-focused stats
const stats = [
  { title: "Today's Jobs", value: "12", change: "+3 from yesterday", trend: "up", icon: "📋" },
  { title: "New Leads (24h)", value: "8", change: "+2 from yesterday", trend: "up", icon: "🎯" },
  { title: "Open Estimates", value: "15", change: "5 pending approval", trend: "neutral", icon: "💰" },
  { title: "Emergency Requests", value: "2", change: "Requires attention", trend: "urgent", icon: "🚨" }
]

const todaysJobs = [
  {
    id: 1,
    type: "Roofing",
    client: "Johnson Residence",
    address: "Seattle, WA 98101",
    status: "in-progress",
    crew: "Northwest Roofing Crew A",
    time: "9:00 AM",
    priority: "normal"
  },
  {
    id: 2,
    type: "Graffiti Removal",
    client: "City of Portland",
    address: "Portland, OR 97201",
    status: "scheduled",
    crew: "Graffiti Response Team",
    time: "10:30 AM",
    priority: "urgent"
  },
  {
    id: 3,
    type: "Pressure Washing",
    client: "Evergreen Shopping Center",
    address: "Tacoma, WA 98402",
    status: "scheduled",
    crew: "Pressure Pro Team B",
    time: "1:00 PM",
    priority: "normal"
  }
]

const recentLeads = [
  {
    id: 1,
    name: "Michael Chen",
    service: "Exterior Painting",
    location: "Seattle, WA",
    status: "new",
    source: "Website Form",
    age: "5 minutes ago",
    urgency: "high"
  },
  {
    id: 2,
    name: "Sarah Williams",
    service: "Roof Repair",
    location: "Bellevue, WA",
    status: "contacted",
    source: "Referral",
    age: "1 hour ago",
    urgency: "medium"
  },
  {
    id: 3,
    name: "Pacific Northwest HOA",
    service: "Graffiti Removal",
    location: "Portland, OR",
    status: "qualified",
    source: "LSA",
    age: "3 hours ago",
    urgency: "urgent"
  }
]

export default function GoatDashboard() {
  const [showTour, setShowTour] = useState(false)
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">
              G.O.A.T.
            </div>
            <div className="text-lg font-bold text-gray-900">Alliance Dashboard</div>
            <span className="text-sm text-gray-500 hidden md:inline">Pacific Northwest Contractors</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setShowTour(true)} aria-label="Start guided tour">
              📖 Tour
            </Button>
            <Button variant="ghost" aria-label="Open settings">⚙️ Settings</Button>
            <Button variant="ghost" aria-label="Logout">Logout</Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen sticky top-[73px] self-start">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-3 text-blue-600 bg-blue-50 px-4 py-3 rounded-lg font-medium hover:bg-blue-100 transition">
                  <span className="text-xl">📊</span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">📋</span>
                  <span>Jobs</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">🎯</span>
                  <span>Leads</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">🏢</span>
                  <span>Network</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">🤖</span>
                  <span>AI Agents</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">💬</span>
                  <span>Communications</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition">
                  <span className="text-xl">⚙️</span>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
            
            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button size="sm" className="w-full justify-start" variant="outline" aria-label="Add new lead">
                  ➕ Add Lead
                </Button>
                <Button size="sm" className="w-full justify-start" variant="outline" aria-label="Book new job">
                  📅 Book Job
                </Button>
                <Button size="sm" className="w-full justify-start" variant="outline" aria-label="Launch AI lead triage">
                  🤖 Launch AI Triage
                </Button>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 max-w-[1400px]">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, Earl 👋</h1>
            <p className="text-gray-600 text-lg">Here&apos;s what&apos;s happening with your Northwest contractor network today.</p>
          </div>

          {/* Tour Notification */}
          {showTour && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h3 className="font-bold text-blue-900 text-lg mb-1">Welcome to Your New Dashboard!</h3>
                    <p className="text-blue-700 mb-3">
                      This is your command center for managing roofing, painting, graffiti removal, and pressure washing jobs across the Pacific Northwest.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Start Tour</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowTour(false)}>Skip</Button>
                    </div>
                  </div>
                </div>
                <button onClick={() => setShowTour(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${
                  stat.trend === 'urgent' ? 'border-red-500' : 
                  stat.trend === 'up' ? 'border-green-500' : 'border-blue-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`text-2xl font-bold ${
                    stat.trend === 'urgent' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-xs ${
                  stat.trend === 'urgent' ? 'text-red-600 font-semibold' : 'text-gray-500'
                }`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">📅 Today&apos;s Schedule</h2>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todaysJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            job.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {job.type}
                          </span>
                          <span className="text-xs text-gray-500">{job.time}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{job.client}</h4>
                        <p className="text-sm text-gray-600">{job.address}</p>
                        <p className="text-xs text-gray-500 mt-1">Crew: {job.crew}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          job.status === 'in-progress' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status}
                        </span>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">🎯 Recent Leads</h2>
                  <Button size="sm" variant="outline">View All</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            lead.urgency === 'urgent' ? 'bg-red-100 text-red-800' : 
                            lead.urgency === 'high' ? 'bg-orange-100 text-orange-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {lead.service}
                          </span>
                          <span className="text-xs text-gray-500">{lead.age}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                        <p className="text-sm text-gray-600">{lead.location}</p>
                        <p className="text-xs text-gray-500 mt-1">Source: {lead.source}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          lead.status === 'new' 
                            ? 'bg-purple-100 text-purple-800' 
                            : lead.status === 'contacted'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {lead.status}
                        </span>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm border border-purple-100 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🤖</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-3">AI Insights & Recommendations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-2">📍 Hot ZIP Codes This Week</h3>
                    <p className="text-sm text-gray-700">98101 (Seattle) showing 40% increase in roofing requests. Consider crew allocation.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-2">🌧️ Weather Alert</h3>
                    <p className="text-sm text-gray-700">Heavy rain predicted next week. Suggest rescheduling 3 exterior paint jobs.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-2">⏱️ Response Time Optimization</h3>
                    <p className="text-sm text-gray-700">Average lead response time: 8 minutes. Top 20% faster than competitors.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-2">👥 Crew Utilization</h3>
                    <p className="text-sm text-gray-700">Team B at 95% capacity. Consider assigning overflow to Team C.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Type Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <p className="text-sm text-gray-600">Roofing Jobs</p>
              <p className="text-xs text-green-600 mt-1">↑ 12% this month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-2xl font-bold text-gray-900">18</div>
              <p className="text-sm text-gray-600">Painting Jobs</p>
              <p className="text-xs text-green-600 mt-1">↑ 8% this month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl mb-2">🚿</div>
              <div className="text-2xl font-bold text-gray-900">31</div>
              <p className="text-sm text-gray-600">Pressure Wash</p>
              <p className="text-xs text-green-600 mt-1">↑ 15% this month</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="text-2xl mb-2">🧹</div>
              <div className="text-2xl font-bold text-gray-900">9</div>
              <p className="text-sm text-gray-600">Graffiti Removal</p>
              <p className="text-xs text-yellow-600 mt-1">→ Stable</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}