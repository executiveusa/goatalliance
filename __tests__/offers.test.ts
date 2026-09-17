import { listOffers, OFFERS } from '@/lib/offers'

describe('offers config', () => {
  it('every offer has a stable id and kind', () => {
    for (const o of OFFERS) {
      expect(o.id).toMatch(/^[a-z-]+$/)
      expect(['directory_tier', 'sponsor_slot', 'lead_fee', 'growth_subscription']).toContain(o.kind)
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

describe('phlash alignment', () => {
  it('exactly one pilot offer exists (monetization pilot, one cohort)', () => {
    expect(OFFERS.filter(o => o.pilot)).toHaveLength(1)
  })

  it('no offer sells editorial rank - paid placement is labeled sponsor only', () => {
    for (const o of OFFERS) {
      const sellsRank = o.features.some(f => /top of|priority placement|rank first|best list/i.test(f))
      expect(sellsRank).toBe(false)
    }
    for (const o of OFFERS.filter(o => o.sponsored)) {
      expect(o.features.some(f => /labeled|disclosure/i.test(f))).toBe(true)
    }
  })
})
