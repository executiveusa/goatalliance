// Stripe-ready offer structure for the GOAT Alliance directory.
// Config only. Nothing here creates a checkout, charges a card,
// or publishes a listing. Copy fields are placeholders pending
// Bambu's own copy pass (his law: no agent-written copy on his sites).
//
// Phlash methodology constraints baked in:
// - Monetization is the LAST build step: pilot ONE offer/cohort first.
// - Paid placement is always a labeled sponsor slot, never editorial
//   rank. No pay-to-win "best" lists.
// - Every offer stores its proof/eligibility terms, not just a price.
//
// Activation requires ALL of:
//   1. Real Stripe price IDs in env (STRIPE_PRICE_* below)
//   2. STRIPE_SECRET_KEY set (test mode first)
//   3. Explicit owner approval to go live
// Until then every offer reports purchasable: false.

export interface Offer {
  id: string
  kind: 'directory_tier' | 'sponsor_slot' | 'lead_fee' | 'growth_subscription'
  name: string
  placeholderCopy: true
  interval: 'month' | 'one_time' | 'per_qualified_lead'
  amountUsdCents: number
  stripePriceEnvVar: string
  features: string[]
  sponsored: boolean          // true = labeled sponsor placement, kept out of editorial rank
  pilot: boolean              // the single pilot offer for the first cohort
  requiresProof: string[]     // verification that must exist before sale
}

export const OFFERS: Offer[] = [
  {
    id: 'directory-listed',
    kind: 'directory_tier',
    name: 'Listed',
    placeholderCopy: true,
    interval: 'month',
    amountUsdCents: 0,
    stripePriceEnvVar: '',
    features: ['directory profile', 'review collection'],
    sponsored: false,
    pilot: false,
    requiresProof: ['verified contact info'],
  },
  {
    // THE PILOT: one offer, one county cohort, per digest guidance.
    id: 'directory-verified-profile',
    kind: 'directory_tier',
    name: 'Verified Profile',
    placeholderCopy: true,
    interval: 'month',
    amountUsdCents: 7900,
    stripePriceEnvVar: 'STRIPE_PRICE_DIRECTORY_VERIFIED',
    features: [
      'credential + license verification maintained with recheck dates',
      'project/proof evidence hosting',
      'price-guidance fields',
      'lead alerts',
    ],
    sponsored: false,
    pilot: true,
    requiresProof: ['license check', 'insurance check', 'review source audit'],
  },
  {
    id: 'sponsor-slot',
    kind: 'sponsor_slot',
    name: 'Labeled Sponsor Slot',
    placeholderCopy: true,
    interval: 'month',
    amountUsdCents: 14900,
    stripePriceEnvVar: 'STRIPE_PRICE_SPONSOR_SLOT',
    features: [
      'visibly labeled sponsored placement',
      'never mixed into editorial rank',
      'monthly performance report',
    ],
    sponsored: true,
    pilot: false,
    requiresProof: ['sponsorship disclosure rendered on page'],
  },
  {
    id: 'qualified-lead-fee',
    kind: 'lead_fee',
    name: 'Qualified Lead Fee',
    placeholderCopy: true,
    interval: 'per_qualified_lead',
    amountUsdCents: 4500,
    stripePriceEnvVar: 'STRIPE_PRICE_QUALIFIED_LEAD',
    features: [
      'charged only on valid, in-area, consented leads',
      'duplicate/invalid leads credited',
      'lead source lineage included',
    ],
    sponsored: false,
    pilot: false,
    requiresProof: ['lead validation pipeline live', 'refund terms in writing'],
  },
]

export function offerWithStatus(offer: Offer) {
  const priceId = offer.stripePriceEnvVar
    ? process.env[offer.stripePriceEnvVar] ?? ''
    : ''
  return {
    id: offer.id,
    kind: offer.kind,
    interval: offer.interval,
    amountUsdCents: offer.amountUsdCents,
    features: offer.features,
    sponsored: offer.sponsored,
    pilot: offer.pilot,
    purchasable: Boolean(priceId) && process.env.STRIPE_LIVE_ENABLED === 'true',
  }
}

export function listOffers() {
  return OFFERS.map(offerWithStatus)
}
