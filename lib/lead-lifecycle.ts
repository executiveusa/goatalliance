// Lead status lifecycle for the GOAT Alliance pipeline.
// Guards the state machine so leads can't jump NEW -> WON or
// resurrect from LOST without going back through qualification.

import type { LeadStatus } from '@prisma/client'

export const LEAD_TRANSITIONS: Record<LeadStatus, LeadStatus[]> = {
  NEW: ['CONTACTED', 'DISQUALIFIED'],
  CONTACTED: ['QUALIFIED', 'DISQUALIFIED'],
  QUALIFIED: ['WON', 'LOST', 'DISQUALIFIED'],
  WON: [],
  LOST: [],
  // A disqualified lead can be re-opened into NEW if new info arrives.
  DISQUALIFIED: ['NEW'],
}

export function canTransition(from: LeadStatus, to: LeadStatus): boolean {
  if (from === to) return true // idempotent re-write is fine
  return LEAD_TRANSITIONS[from]?.includes(to) ?? false
}

export interface TransitionRecord {
  from: LeadStatus
  to: LeadStatus
  at: string
  note?: string
}

// Appends a transition record into the lead's metadata history without
// clobbering existing metadata keys.
export function withTransition(
  metadata: unknown,
  record: TransitionRecord
): Record<string, unknown> {
  const base =
    metadata && typeof metadata === 'object' && !Array.isArray(metadata)
      ? (metadata as Record<string, unknown>)
      : {}
  const history = Array.isArray(base.statusHistory) ? base.statusHistory : []
  return { ...base, statusHistory: [...history, record] }
}

// Lead source -> contact source mapping for conversion.
export function leadSourceToContactSource(source: string | null | undefined): string {
  switch (source) {
    case 'REFERRAL':
      return 'REFERRAL'
    case 'PAID_SEARCH':
    case 'ORGANIC':
      return 'GOOGLE'
    case 'SOCIAL':
      return 'FACEBOOK'
    case 'WEBSITE':
      return 'WEBSITE'
    default:
      return 'OTHER'
  }
}
