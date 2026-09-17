import { NextResponse } from 'next/server'

import { listOffers } from '@/lib/offers'

// Read-only offer catalog. Returns tier structure and whether each
// offer is purchasable (requires Stripe env + explicit activation).
// No checkout session is ever created here.
export async function GET() {
  return NextResponse.json({
    success: true,
    data: listOffers(),
    timestamp: new Date().toISOString()
  })
}
