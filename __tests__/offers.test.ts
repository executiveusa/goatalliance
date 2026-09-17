import { listOffers, OFFERS } from '@/lib/offers'

describe('offers config', () => {
  it('every offer has a stable id and kind', () => {
    for (const o of OFFERS) {
      expect(o.id).toMatch(/^[a-z-]+$/)
      expect(['directory_tier', 'landing_package', 'lead_service']).toContain(o.kind)
    }
  })

  it('nothing is purchasable without Stripe env and activation', () => {
    delete process.env.STRIPE_PRICE_DIRECTORY_FEATURED
    process.env.STRIPE_LIVE_ENABLED = 'false'
    const offers = listOffers()
    expect(offers.every(o => o.purchasable === false)).toBe(true)
  })

  it('paid tiers carry real price-env wiring slots', () => {
    const paid = OFFERS.filter(o => o.amountUsdCents > 0)
    expect(paid.length).toBeGreaterThan(0)
    for (const o of paid) {
      expect(o.stripePriceEnvVar).toMatch(/^STRIPE_PRICE_/)
    }
  })
})
