// Stripe-ready offer structure for the GOAT Alliance directory.
// Config only. Nothing here creates a checkout, charges a card,
// or publishes a listing. Copy fields are placeholders pending
// Bambu's own copy pass (his law: no agent-written copy on his sites).
//
// Activation requires ALL of:
//   1. Real Stripe price IDs in env (STRIPE_PRICE_* below)
//   2. STRIPE_SECRET_KEY set (test mode first)
//   3. Explicit owner approval to go live
// Until then every offer reports purchasable: false.

export interface Offer {
  id: string
  kind: 'directory_tier' | 'landing_package' | 'lead_service'
  name: string
  placeholderCopy: true
  interval: 'month' | 'one_time'
  amountUsdCents: number
  stripePriceEnvVar: string
  features: string[]
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
  },
  {
    id: 'directory-featured',
    kind: 'directory_tier',
    name: 'Featured',
    placeholderCopy: true,
    interval: 'month',
    amountUsdCents: 4900,
    stripePriceEnvVar: 'STRIPE_PRICE_DIRECTORY_FEATURED',
    features: ['priority placement', 'verified badge review', 'lead alerts'],
  },
  {
    id: 'directory-premium',
    kind: 'directory_tier',
    name: 'Premium',
    placeholderCopy: true,
    interval: 'month',
    amountUsdCents: 14900,
    stripePriceEnvVar: 'STRIPE_PRICE_DIRECTORY_PREMIUM',
    features: ['top of vertical', 'landing page included', 'monthly performance report'],
  },
  {
    id: 'landing-page-build',
    kind: 'landing_package',
    name: 'Landing Page Build',
    placeholderCopy: true,
    interval: 'one_time',
    amountUsdCents: 49900,
    stripePriceEnvVar: 'STRIPE_PRICE_LANDING_BUILD',
    features: ['one niche landing page', 'two variants', 'A/B test setup'],
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
    purchasable: Boolean(priceId) && process.env.STRIPE_LIVE_ENABLED === 'true',
  }
}

export function listOffers() {
  return OFFERS.map(offerWithStatus)
}
