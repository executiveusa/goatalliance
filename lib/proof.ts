// Proof graph rules (Phlash digest): every fact has source, observed
// date, verifier and recheck/expiry; "verified" names what was checked;
// stale proof is marked, never silently trusted. Pure helpers here so
// the rules are testable without a database.

export type ProofStatus = 'CLAIMED' | 'SOURCE_VERIFIED' | 'EXPIRED' | 'DISPUTED' | 'UNKNOWN'

export interface CredentialLike {
  status: ProofStatus
  expiresAt: Date | null
  recheckAt: Date | null
}

// Derived display status: a verified credential past expiry or recheck
// is stale. DISPUTED always wins - a human must resolve it.
export function derivedCredentialStatus(c: CredentialLike, now: Date = new Date()): ProofStatus {
  if (c.status === 'DISPUTED') return 'DISPUTED'
  if (c.expiresAt && c.expiresAt < now) return 'EXPIRED'
  if (c.status === 'SOURCE_VERIFIED' && c.recheckAt && c.recheckAt < now) return 'CLAIMED'
  return c.status
}

export function needsRecheck(c: CredentialLike, now: Date = new Date()): boolean {
  if (c.status === 'DISPUTED') return true
  if (c.expiresAt && c.expiresAt < now) return true
  if (c.recheckAt && c.recheckAt < now) return true
  return false
}

// Default recheck cadence per credential type, in days.
export const RECHECK_CADENCE_DAYS: Record<string, number> = {
  license: 180,
  insurance: 90,
  certification: 365,
}

export function defaultRecheckDate(type: string, from: Date = new Date()): Date {
  const days = RECHECK_CADENCE_DAYS[type] ?? 180
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000)
}
