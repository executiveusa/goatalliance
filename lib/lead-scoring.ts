// Lead scoring for the GOAT Alliance studio pipeline.
// Pure function: deterministic, no I/O, safe to unit test.
// Score is 0-100. Reasons are returned so the API can store
// a human-auditable explanation alongside the number.

export interface LeadSignals {
  name?: string | null
  email?: string | null
  phone?: string | null
  serviceType?: string | null
  message?: string | null
  zipCode?: string | null
  city?: string | null
  state?: string | null
  source?: string | null
  utm?: unknown
}

export interface LeadScoreResult {
  score: number
  reasons: string[]
}

// Western Washington ZIP prefixes (980xx-985xx, 988xx) cover the
// Seattle/Tacoma/Olympia service area the directory targets.
const WESTERN_WA_ZIP = /^(98[0-5]|988)\d{2}$/

export function scoreLead(signals: LeadSignals): LeadScoreResult {
  let score = 0
  const reasons: string[] = []

  const add = (points: number, reason: string) => {
    score += points
    reasons.push(`${reason} (+${points})`)
  }

  if (signals.phone && signals.phone.replace(/\D/g, '').length >= 10) {
    add(25, 'reachable phone number')
  }
  if (signals.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signals.email)) {
    add(20, 'valid email')
  }
  if (signals.name && signals.name.trim().length > 1) {
    add(5, 'named contact')
  }
  if (signals.serviceType) {
    add(15, 'specific service requested')
  }
  if (signals.message && signals.message.trim().length >= 20) {
    add(10, 'described the job')
  }
  if (signals.state && signals.state.toUpperCase() === 'WA') {
    add(10, 'in Washington')
  }
  if (signals.zipCode && WESTERN_WA_ZIP.test(signals.zipCode.trim())) {
    add(10, 'Western WA service area')
  }
  if (signals.source === 'REFERRAL') {
    add(5, 'referral source')
  }
  if (signals.utm && typeof signals.utm === 'object' && Object.keys(signals.utm as object).length > 0) {
    add(0, 'has campaign attribution')
  }

  return { score: Math.min(100, Math.max(0, score)), reasons }
}
