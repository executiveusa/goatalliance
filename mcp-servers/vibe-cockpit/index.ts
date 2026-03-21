#!/usr/bin/env node
/**
 * GOAT ALLIANCE — Vibe Cockpit MCP Server
 * AI-native CRM for local service businesses.
 *
 * Tools:
 *   - add_contact          → Create new contact/lead
 *   - get_contacts         → List contacts with filtering
 *   - schedule_appointment → Book appointment
 *   - get_appointments     → List upcoming appointments
 *   - get_analytics        → Business performance metrics
 *   - update_contact       → Update contact status/notes
 *   - complete_job         → Mark job done + log revenue
 *
 * This MCP server connects AI agents directly to the CRM.
 * Claude uses these tools to manage the business autonomously.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const BASE_URL = process.env.VIBE_COCKPIT_URL || 'http://localhost:3000'
const BUSINESS_ID = process.env.BUSINESS_ID || 'demo-biz'

const server = new Server(
  { name: 'vibe-cockpit', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'add_contact',
      description: 'Add a new contact/lead to the CRM.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Full name' },
          phone: { type: 'string', description: 'Phone number' },
          email: { type: 'string', description: 'Email address' },
          source: { type: 'string', enum: ['FACEBOOK', 'GOOGLE', 'REFERRAL', 'WEBSITE', 'WHATSAPP', 'PHONE', 'OTHER'], description: 'Lead source' },
          notes: { type: 'string', description: 'Initial notes about this lead' },
        },
        required: ['name'],
      },
    },
    {
      name: 'get_contacts',
      description: 'List contacts with optional search and status filter.',
      inputSchema: {
        type: 'object',
        properties: {
          search: { type: 'string', description: 'Search by name, phone, or email' },
          status: { type: 'string', enum: ['NEW', 'ACTIVE', 'INACTIVE', 'VIP'], description: 'Filter by status' },
          limit: { type: 'number', description: 'Max results (default 20)' },
        },
      },
    },
    {
      name: 'schedule_appointment',
      description: 'Schedule an appointment for a contact.',
      inputSchema: {
        type: 'object',
        properties: {
          contactId: { type: 'string', description: 'Contact ID' },
          contactName: { type: 'string', description: 'Contact name (used to find ID if contactId not provided)' },
          title: { type: 'string', description: 'Job title (e.g. "Kitchen Repaint")' },
          service: { type: 'string', description: 'Service type (e.g. "Interior Painting")' },
          scheduledAt: { type: 'string', description: 'ISO 8601 datetime (e.g. 2026-03-14T09:00:00Z)' },
          duration: { type: 'number', description: 'Duration in minutes (default 60)' },
          price: { type: 'number', description: 'Job price in USD' },
          notes: { type: 'string', description: 'Job notes' },
        },
        required: ['title', 'scheduledAt'],
      },
    },
    {
      name: 'get_appointments',
      description: 'List upcoming appointments.',
      inputSchema: {
        type: 'object',
        properties: {
          upcoming: { type: 'boolean', description: 'Show only upcoming appointments (default true)' },
          limit: { type: 'number', description: 'Max results (default 10)' },
        },
      },
    },
    {
      name: 'get_analytics',
      description: 'Get business performance metrics: leads, revenue, conversion rate, appointments.',
      inputSchema: {
        type: 'object',
        properties: {
          period: { type: 'string', enum: ['week', 'month', 'all'], description: 'Time period (default: week)' },
        },
      },
    },
    {
      name: 'update_contact',
      description: 'Update contact status, tags, or notes.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Contact ID' },
          status: { type: 'string', enum: ['NEW', 'ACTIVE', 'INACTIVE', 'VIP'] },
          notes: { type: 'string' },
        },
        required: ['id'],
      },
    },
    {
      name: 'complete_job',
      description: 'Mark a job/appointment as completed and log revenue.',
      inputSchema: {
        type: 'object',
        properties: {
          appointmentId: { type: 'string', description: 'Appointment ID to complete' },
          actualPrice: { type: 'number', description: 'Final price charged' },
          notes: { type: 'string', description: 'Completion notes' },
        },
        required: ['appointmentId'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case 'add_contact': {
        const res = await apiCall('POST', '/api/contacts', { ...args, businessId: BUSINESS_ID })
        const { contact } = res
        return successResult(`✅ Contact added!\n\n**Name:** ${contact.name}\n**ID:** ${contact.id}\n**Source:** ${contact.source}\n**Status:** ${contact.status}`)
      }

      case 'get_contacts': {
        const { search = '', status, limit = 20 } = args as any
        const params = new URLSearchParams({ businessId: BUSINESS_ID, search })
        if (status) params.set('status', status)
        const res = await apiCall('GET', `/api/contacts?${params}`)
        const contacts = res.contacts?.slice(0, limit) || []

        if (!contacts.length) return successResult('No contacts found.')

        const table = contacts.map((c: any) =>
          `- **${c.name}** (${c.status}) | ${c.phone || 'no phone'} | ${c.source} | $${c.totalRevenue} revenue`
        ).join('\n')

        return successResult(`**Contacts (${contacts.length}):**\n\n${table}`)
      }

      case 'schedule_appointment': {
        const { contactId, title, service, scheduledAt, duration, price, notes } = args as any
        const res = await apiCall('POST', '/api/appointments', {
          businessId: BUSINESS_ID,
          contactId: contactId || 'demo-contact',
          title,
          service,
          scheduledAt,
          duration,
          price,
          notes,
        })
        const { appointment } = res
        const date = new Date(scheduledAt).toLocaleString('en-US', {
          weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
        })
        return successResult(`✅ Appointment scheduled!\n\n**Job:** ${title}\n**When:** ${date}\n**Duration:** ${duration || 60} min\n**Price:** ${price ? `$${price}` : 'TBD'}\n**ID:** ${appointment?.id || 'appt-created'}`)
      }

      case 'get_appointments': {
        const { upcoming = true, limit = 10 } = args as any
        const params = new URLSearchParams({ businessId: BUSINESS_ID, upcoming: String(upcoming) })
        const res = await apiCall('GET', `/api/appointments?${params}`)
        const appointments = res.appointments?.slice(0, limit) || []

        if (!appointments.length) return successResult('No appointments found.')

        const list = appointments.map((a: any) => {
          const date = new Date(a.scheduledAt).toLocaleString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
          })
          return `- **${a.title}** | ${date} | ${a.contact?.name || 'Unknown'} | ${a.status}${a.price ? ` | $${a.price}` : ''}`
        }).join('\n')

        return successResult(`**Upcoming Appointments (${appointments.length}):**\n\n${list}`)
      }

      case 'get_analytics': {
        const { period = 'week' } = args as any
        const res = await apiCall('GET', `/api/analytics?businessId=${BUSINESS_ID}&period=${period}`)
        const s = res.stats

        return successResult(`📊 **${period.toUpperCase()} Analytics**

**Leads:** ${s.leadsThisWeek}
**Appointments:** ${s.appointmentsThisWeek}
**Revenue:** $${s.revenueThisMonth?.toLocaleString()}
**Conversion Rate:** ${s.conversionRate}%
**Total Contacts:** ${s.totalContacts}
**Jobs Completed:** ${s.jobsCompleted}

${s.conversionRate >= 40 ? '🔥 Conversion rate is above target!' : '📈 Tip: Follow up with leads within 2 hours to improve conversion.'}`)
      }

      case 'update_contact': {
        const res = await apiCall('PATCH', '/api/contacts', args)
        return successResult(`✅ Contact updated: ${JSON.stringify(res.contact?.status)}`)
      }

      case 'complete_job': {
        const { appointmentId, actualPrice, notes } = args as any
        const res = await apiCall('PATCH', '/api/appointments', {
          id: appointmentId,
          status: 'COMPLETED',
          ...(actualPrice ? { price: actualPrice } : {}),
          ...(notes ? { notes } : {}),
        })
        return successResult(`✅ Job completed!\n\n**Revenue recorded:** $${actualPrice || res.appointment?.price || 0}\n**Appointment:** ${appointmentId}\n\n💡 Consider sending a review request to this customer.`)
      }

      default:
        return errorResult(`Unknown tool: ${name}`)
    }
  } catch (err) {
    return errorResult(`API error: ${err instanceof Error ? err.message : String(err)}`)
  }
})

async function apiCall(method: string, path: string, body?: any) {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
  return res.json()
}

function successResult(text: string) {
  return { content: [{ type: 'text' as const, text }] }
}
function errorResult(text: string) {
  return { content: [{ type: 'text' as const, text: `❌ ${text}` }], isError: true }
}

const transport = new StdioServerTransport()
await server.connect(transport)
console.error('🎯 Vibe Cockpit MCP Server running')
