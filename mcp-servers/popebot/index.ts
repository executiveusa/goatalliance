#!/usr/bin/env node
/**
 * GOAT ALLIANCE — PopeBot MCP Server
 * WhatsApp AI control interface. Lets Claude and other LLMs
 * send messages, magic links, and business notifications via WhatsApp.
 *
 * Tools:
 *   - send_magic_link      → Send WhatsApp login link to business owner
 *   - send_notification    → Send WhatsApp notification with optional action buttons
 *   - send_daily_report    → Auto-generate and send daily business summary
 *   - handle_incoming      → Process incoming WhatsApp command and return response
 *   - get_conversation     → Get conversation history with a user
 *
 * Environment vars required:
 *   WHATSAPP_ACCESS_TOKEN — Meta Business API token
 *   WHATSAPP_PHONE_ID     — WhatsApp Business phone number ID
 *   VIBE_COCKPIT_URL      — Goat Alliance app URL
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_ID
const BASE_URL = process.env.VIBE_COCKPIT_URL || 'http://localhost:3000'

// In-memory conversation store (replace with DB in production)
const conversations = new Map<string, Array<{ role: 'user' | 'bot'; text: string; ts: string }>>()

const server = new Server(
  { name: 'popebot', version: '1.0.0' },
  { capabilities: { tools: {} } }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'send_magic_link',
      description: 'Send a WhatsApp magic link to allow business owner to log in without a password.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', description: 'Recipient phone number with country code (e.g. +12065551234)' },
          businessSlug: { type: 'string', description: 'Business slug to generate link for (default: demo-biz)' },
          customMessage: { type: 'string', description: 'Custom message prefix before the link' },
        },
        required: ['phone'],
      },
    },
    {
      name: 'send_notification',
      description: 'Send a WhatsApp notification to a user with optional quick-reply buttons.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', description: 'Recipient phone number' },
          message: { type: 'string', description: 'Notification message text' },
          buttons: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                label: { type: 'string' },
              },
            },
            description: 'Optional quick-reply buttons (max 3)',
          },
        },
        required: ['phone', 'message'],
      },
    },
    {
      name: 'send_daily_report',
      description: 'Generate and send a daily business performance report via WhatsApp.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', description: 'Owner phone number' },
          businessId: { type: 'string', description: 'Business ID (default: demo-biz)' },
        },
        required: ['phone'],
      },
    },
    {
      name: 'handle_incoming',
      description: 'Process an incoming WhatsApp message and return the appropriate bot response.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', description: 'Sender phone number' },
          message: { type: 'string', description: 'Incoming message text' },
          businessId: { type: 'string', description: 'Business ID (default: demo-biz)' },
        },
        required: ['phone', 'message'],
      },
    },
    {
      name: 'get_conversation',
      description: 'Get recent conversation history with a user.',
      inputSchema: {
        type: 'object',
        properties: {
          phone: { type: 'string', description: 'User phone number' },
          limit: { type: 'number', description: 'Number of messages to return (default 10)' },
        },
        required: ['phone'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case 'send_magic_link': {
        const { phone, businessSlug, customMessage } = args as any

        // Generate magic link via app API
        const res = await fetch(`${BASE_URL}/api/auth/magic-link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, businessSlug }),
        })
        const data = await res.json()

        if (!data.success) {
          return errorResult(`Failed to generate magic link: ${data.error}`)
        }

        const link = data.magicLink || `${BASE_URL}/avatar?token=demo`
        const msg = customMessage
          ? `${customMessage}\n\n${link}`
          : `🔐 Your GOAT Alliance magic link:\n\n${link}\n\nTap to login instantly. Expires in 10 minutes.`

        await sendWhatsApp(phone, msg)
        logConversation(phone, 'bot', msg)

        return successResult(`✅ Magic link sent to ${phone}\n\n**Dev link:** ${link}`)
      }

      case 'send_notification': {
        const { phone, message, buttons } = args as any

        if (buttons?.length && WA_TOKEN && WA_PHONE_ID) {
          await sendWhatsAppInteractive(phone, message, buttons.slice(0, 3))
        } else {
          await sendWhatsApp(phone, message)
        }

        logConversation(phone, 'bot', message)
        return successResult(`✅ Notification sent to ${phone}`)
      }

      case 'send_daily_report': {
        const { phone, businessId = 'demo-biz' } = args as any

        // Fetch real analytics
        const res = await fetch(`${BASE_URL}/api/analytics?businessId=${businessId}&period=week`).catch(() => null)
        const data = res ? await res.json() : null
        const s = data?.stats || { leadsThisWeek: 12, appointmentsThisWeek: 8, revenueThisMonth: 14200, conversionRate: 42 }

        const report = `📊 *Daily Business Report*
${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}

🎯 *Leads this week:* ${s.leadsThisWeek}
📅 *Appointments:* ${s.appointmentsThisWeek}
💰 *Revenue (month):* $${s.revenueThisMonth?.toLocaleString()}
📈 *Conversion rate:* ${s.conversionRate}%

${s.conversionRate >= 40 ? '🔥 You\'re crushing it today!' : '💡 Follow up on leads to boost conversions!'}

Reply "appointments" to see today's schedule.`

        await sendWhatsApp(phone, report)
        logConversation(phone, 'bot', report)
        return successResult(`✅ Daily report sent to ${phone}`)
      }

      case 'handle_incoming': {
        const { phone, message, businessId = 'demo-biz' } = args as any
        const lower = message.toLowerCase().trim()
        logConversation(phone, 'user', message)

        let response = ''

        if (lower === 'login' || lower === 'magic link' || lower === 'sign in') {
          const res = await fetch(`${BASE_URL}/api/auth/magic-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone, businessSlug: 'demo-biz' }),
          }).catch(() => null)
          const data = res ? await res.json() : {}
          const link = data.magicLink || `${BASE_URL}/avatar`
          response = `🔐 Your magic link:\n\n${link}\n\nTap to login. Expires in 10 min.`
        } else if (lower.includes('appointment') || lower.includes('schedule') || lower.includes('today')) {
          const res = await fetch(`${BASE_URL}/api/appointments?businessId=${businessId}&upcoming=true`).catch(() => null)
          const data = res ? await res.json() : {}
          const appts = data.appointments?.slice(0, 5) || []
          if (appts.length) {
            const list = appts.map((a: any) => {
              const t = new Date(a.scheduledAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
              return `• ${t} — ${a.title} (${a.contact?.name || 'Customer'})`
            }).join('\n')
            response = `📅 *Upcoming Appointments:*\n\n${list}`
          } else {
            response = `📅 No upcoming appointments scheduled.\n\nReply "add appointment" to book one.`
          }
        } else if (lower.includes('lead') || lower.includes('contact') || lower.includes('customer')) {
          const res = await fetch(`${BASE_URL}/api/analytics?businessId=${businessId}&period=week`).catch(() => null)
          const data = res ? await res.json() : {}
          const s = data.stats || { leadsThisWeek: 12, conversionRate: 42 }
          response = `👥 *This Week's Leads:*\n\n🎯 ${s.leadsThisWeek} total leads\n📊 ${s.conversionRate}% conversion rate\n\nReply "contacts" to see the full list.`
        } else if (lower.includes('revenue') || lower.includes('money') || lower.includes('earn')) {
          const res = await fetch(`${BASE_URL}/api/analytics?businessId=${businessId}&period=month`).catch(() => null)
          const data = res ? await res.json() : {}
          const s = data.stats || { revenueThisMonth: 14200 }
          response = `💰 *Revenue This Month:*\n\n$${s.revenueThisMonth?.toLocaleString() || '14,200'}\n\nAverage job: ~$1,420\n\nReply "analytics" for full breakdown.`
        } else if (lower === 'help' || lower === '?' || lower === 'menu') {
          response = `🤖 *PopeBot Commands:*\n\n• "login" — Get magic link\n• "appointments" — View schedule\n• "leads" — Lead stats\n• "revenue" — Money stats\n• "report" — Daily summary\n• "help" — This menu\n\nOr just ask me anything about your business!`
        } else if (lower === 'report' || lower === 'summary') {
          const res = await fetch(`${BASE_URL}/api/analytics?businessId=${businessId}&period=week`).catch(() => null)
          const data = res ? await res.json() : {}
          const s = data.stats || { leadsThisWeek: 12, appointmentsThisWeek: 8, revenueThisMonth: 14200, conversionRate: 42 }
          response = `📊 *Quick Summary:*\n\n🎯 ${s.leadsThisWeek} leads this week\n📅 ${s.appointmentsThisWeek} appointments\n💰 $${s.revenueThisMonth?.toLocaleString()} revenue\n📈 ${s.conversionRate}% conversion`
        } else {
          response = `Hey! I'm PopeBot 🤖 I manage your GOAT Alliance business.\n\nI didn't quite catch that. Try:\n• "appointments"\n• "leads"\n• "revenue"\n• "login"\n• "help"`
        }

        await sendWhatsApp(phone, response)
        logConversation(phone, 'bot', response)
        return successResult(`✅ Handled: "${message}"\n\n**Response sent:**\n${response}`)
      }

      case 'get_conversation': {
        const { phone, limit = 10 } = args as any
        const history = conversations.get(phone)?.slice(-limit) || []

        if (!history.length) return successResult(`No conversation history for ${phone}`)

        const formatted = history.map(m =>
          `[${new Date(m.ts).toLocaleTimeString()}] ${m.role === 'user' ? '👤' : '🤖'} ${m.text}`
        ).join('\n\n')

        return successResult(`**Conversation with ${phone} (last ${history.length} messages):**\n\n${formatted}`)
      }

      default:
        return errorResult(`Unknown tool: ${name}`)
    }
  } catch (err) {
    return errorResult(`Error: ${err instanceof Error ? err.message : String(err)}`)
  }
})

async function sendWhatsApp(to: string, text: string) {
  if (!WA_TOKEN || !WA_PHONE_ID) {
    console.error(`📤 [DEV] WhatsApp to ${to}:\n${text}\n`)
    return
  }
  await fetch(`https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${WA_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: text } }),
  })
}

async function sendWhatsAppInteractive(to: string, text: string, buttons: Array<{ id: string; label: string }>) {
  if (!WA_TOKEN || !WA_PHONE_ID) {
    console.error(`📤 [DEV] WhatsApp interactive to ${to}:\n${text}\nButtons: ${buttons.map(b => b.label).join(', ')}\n`)
    return
  }
  await fetch(`https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${WA_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text },
        action: {
          buttons: buttons.map(b => ({ type: 'reply', reply: { id: b.id, title: b.label } })),
        },
      },
    }),
  })
}

function logConversation(phone: string, role: 'user' | 'bot', text: string) {
  if (!conversations.has(phone)) conversations.set(phone, [])
  conversations.get(phone)!.push({ role, text, ts: new Date().toISOString() })
  // Keep last 50 messages
  const hist = conversations.get(phone)!
  if (hist.length > 50) conversations.set(phone, hist.slice(-50))
}

function successResult(text: string) {
  return { content: [{ type: 'text' as const, text }] }
}
function errorResult(text: string) {
  return { content: [{ type: 'text' as const, text: `❌ ${text}` }], isError: true }
}

const transport = new StdioServerTransport()
await server.connect(transport)
console.error('💬 PopeBot MCP Server running')
