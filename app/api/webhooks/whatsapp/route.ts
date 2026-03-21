import { NextRequest, NextResponse } from 'next/server'

// WhatsApp Business API webhook
// Handles incoming messages and routes to PopeBot command parser

const WEBHOOK_VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_SECRET || 'goat-alliance-dev'

// GET: Webhook verification by Meta
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified')
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// POST: Incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract message from WhatsApp webhook payload
    const entry = body?.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value
    const messages = value?.messages

    if (!messages?.length) {
      return NextResponse.json({ status: 'no_messages' })
    }

    for (const message of messages) {
      if (message.type !== 'text') continue

      const from = message.from // phone number
      const text = message.text?.body?.trim() || ''

      console.log(`📱 WhatsApp from ${from}: "${text}"`)

      // Route to PopeBot command handler
      await handlePopeBotCommand(from, text)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePopeBotCommand(phone: string, text: string) {
  const lower = text.toLowerCase()

  // Simple intent routing — expand with Claude Haiku for production
  let response = ''

  if (lower.includes('login') || lower.includes('magic link')) {
    // Trigger magic link send
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    response = `🔐 Sending your magic link to log in to your Vibe Cockpit...\n\nCheck WhatsApp in a moment!`
  } else if (lower.includes('appointment') || lower.includes('schedule')) {
    response = `📅 Here are your upcoming appointments:\n\n1. Kitchen Repaint — Today 9:00 AM (Sarah Kim)\n2. Exterior Touch-up — Today 2:00 PM (James Rodriguez)\n\nReply with a number to get details, or say "Book appointment" to schedule new.`
  } else if (lower.includes('lead') || lower.includes('contact')) {
    response = `👥 This week's leads:\n\n✅ 12 total leads\n📘 5 from Facebook\n🔍 4 from Google\n🤝 3 from referrals\n\nConversion rate: 42% 🔥\n\nSay "Show contacts" to see the full list.`
  } else if (lower.includes('revenue') || lower.includes('money') || lower.includes('how much')) {
    response = `💰 Revenue Summary:\n\nThis week: $6,350\nThis month: $14,200\nAll time: $87,450\n\nAverage job value: $1,420\n\nYou're crushing it! 🚀`
  } else if (lower.includes('help')) {
    response = `🤖 PopeBot Commands:\n\n"Appointments" — View schedule\n"Leads" — Lead stats\n"Revenue" — Money stats\n"Login" — Get magic link\n"Help" — This menu\n\nOr just ask me anything about your business!`
  } else {
    response = `Hey! I'm PopeBot, your AI business manager. 🤖\n\nI can show you appointments, leads, revenue, or send you a login link.\n\nWhat do you need? (Say "help" for all commands)`
  }

  // Send WhatsApp reply
  await sendWhatsAppReply(phone, response)
}

async function sendWhatsAppReply(to: string, message: string) {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_ID) {
    console.log(`📤 WhatsApp reply to ${to}:\n${message}`)
    return
  }

  await fetch(
    `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      }),
    }
  )
}
