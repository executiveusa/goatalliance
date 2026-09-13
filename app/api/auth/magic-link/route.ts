import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { phone, email, businessSlug } = await request.json()

    if (!phone && !email) {
      return NextResponse.json({ error: 'phone or email required' }, { status: 400 })
    }

    // Find business by slug or use demo
    const slug = businessSlug || 'demo-biz'
    let business = await prisma.business.findUnique({ where: { slug } })

    if (!business) {
      // Auto-create demo business for development
      business = await prisma.business.create({
        data: {
          id: 'demo-biz',
          name: 'Seattle Pro Painters',
          slug: 'demo-biz',
          ownerName: 'Mike Johnson',
          niche: 'painter',
          city: 'Seattle',
          state: 'WA',
        }
      })
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    await prisma.magicToken.create({
      data: {
        businessId: business.id,
        token,
        phone: phone || null,
        email: email || null,
        expiresAt,
      }
    })

    // Build magic link URL
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const magicLink = `${baseUrl}/avatar?token=${token}`

    // Send via WhatsApp if configured, otherwise log for dev
    const sent = await sendMagicLink({ phone, email, magicLink, businessName: business.name })

    return NextResponse.json({
      success: true,
      sent,
      // Include link in dev mode for testing
      ...(process.env.NODE_ENV === 'development' ? { magicLink, devNote: 'Magic link shown in dev mode only' } : {})
    })
  } catch (error) {
    console.error('POST /api/auth/magic-link error:', error)
    return NextResponse.json({ error: 'Failed to send magic link' }, { status: 500 })
  }
}

async function sendMagicLink({
  phone, email, magicLink, businessName
}: {
  phone?: string
  email?: string
  magicLink: string
  businessName: string
}): Promise<string> {
  const message = `🔐 Login to ${businessName}\n\nClick your magic link:\n${magicLink}\n\nExpires in 10 minutes. Do not share.`

  // Try WhatsApp first
  if (phone && process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_ID) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: phone.replace(/\D/g, ''),
            type: 'text',
            text: { body: message },
          }),
        }
      )
      if (res.ok) return 'whatsapp'
    } catch (e) {
      console.error('WhatsApp send failed:', e)
    }
  }

  // Fallback: log to console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('\n📱 MAGIC LINK (dev mode):\n', magicLink, '\n')
    return 'console'
  }

  return 'none'
}
