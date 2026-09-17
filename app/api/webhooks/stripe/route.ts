import { NextResponse } from 'next/server'

// Stripe webhook endpoint stub. Stripe-ready, not Stripe-live:
// without STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET configured it
// refuses every event instead of silently accepting unsigned ones.
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || process.env.STRIPE_LIVE_ENABLED !== 'true') {
    return NextResponse.json(
      { success: false, message: 'Stripe webhooks are not enabled.' },
      { status: 503 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json(
      { success: false, message: 'Missing stripe-signature header.' },
      { status: 400 }
    )
  }

  // Signature verification + event handling are wired here when the
  // owner approves Stripe activation. Until then, accept nothing.
  void body
  return NextResponse.json(
    { success: false, message: 'Stripe event handling not yet implemented.' },
    { status: 501 }
  )
}
