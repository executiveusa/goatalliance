// Voice agent scope rules (Phlash digest): agents answer overflow/
// after-hours, disclose automated identity, do basic intake, book
// against verified availability or create callbacks - and escalate to
// a human for safety, emergencies, price commitments, complaints,
// legal/insurance, high-ticket ambiguity or unsupported questions.
// They never autonomously quote complex work or replace accountable
// sales. Pure functions, test-only adapters around them.

export type EscalationReason =
  | 'safety'
  | 'emergency'
  | 'price_commitment'
  | 'complaint'
  | 'legal_or_insurance'
  | 'high_ticket_ambiguity'
  | 'unsupported_question'

export interface EscalationSignals {
  safety?: boolean
  emergency?: boolean
  priceCommitment?: boolean
  complaint?: boolean
  legalOrInsurance?: boolean
  highTicketAmbiguous?: boolean
  unsupportedQuestion?: boolean
}

export function requiresHumanEscalation(s: EscalationSignals): EscalationReason | null {
  if (s.safety) return 'safety'
  if (s.emergency) return 'emergency'
  if (s.priceCommitment) return 'price_commitment'
  if (s.complaint) return 'complaint'
  if (s.legalOrInsurance) return 'legal_or_insurance'
  if (s.highTicketAmbiguous) return 'high_ticket_ambiguity'
  if (s.unsupportedQuestion) return 'unsupported_question'
  return null
}

export interface CallRecordFields {
  callerConsent: boolean
  disclosureGiven: boolean
  service?: string | null
  place?: string | null
  summary?: string | null
  outcome?: string | null
  escalationReason?: string | null
  humanOwner?: string | null
  slaDueAt?: Date | null
  commitments?: string | null
  direction: 'INBOUND' | 'OUTBOUND'
}

// The digest's required call record. Returns the list of missing or
// invalid requirements - empty means the record is complete.
export function validateCallRecord(f: CallRecordFields): string[] {
  const missing: string[] = []
  if (!f.disclosureGiven) missing.push('disclosureGiven (truthful automated identity)')
  if (!f.callerConsent) missing.push('callerConsent (recording/use consent)')
  if (!f.service) missing.push('service')
  if (!f.summary) missing.push('summary')
  if (!f.outcome) missing.push('outcome (booked/callback_scheduled/escalated/no_fit/abandoned)')
  if (f.direction === 'OUTBOUND' && !f.callerConsent) {
    missing.push('prior consent for outbound')
  }
  if (f.escalationReason) {
    if (f.outcome !== 'escalated' && f.outcome !== 'callback_scheduled') {
      missing.push('escalated call must end in outcome escalated or callback_scheduled')
    }
    if (!f.humanOwner) missing.push('humanOwner for escalated call')
    if (!f.slaDueAt) missing.push('slaDueAt for escalated call')
  }
  if (f.commitments && f.commitments.trim().length > 0 && !f.humanOwner) {
    // any commitment made on a call must have an accountable owner
    missing.push('humanOwner for recorded commitments')
  }
  return missing
}

// Test-only inbound simulation: given scripted input, returns what a
// scoped agent MAY do. Never dials, never sends, never quotes price.
export function simulateInbound(input: EscalationSignals & { service?: string; place?: string; urgency?: string }) {
  const escalation = requiresHumanEscalation(input)
  if (escalation) {
    return {
      mode: 'test-only' as const,
      action: 'escalate',
      escalationReason: escalation,
      allowedOutcomes: ['escalated', 'callback_scheduled'],
      requiresHumanOwner: true,
    }
  }
  if (input.urgency === 'emergency') {
    return {
      mode: 'test-only' as const,
      action: 'escalate',
      escalationReason: 'emergency' as const,
      allowedOutcomes: ['escalated', 'callback_scheduled'],
      requiresHumanOwner: true,
    }
  }
  return {
    mode: 'test-only' as const,
    action: 'intake',
    escalationReason: null,
    allowedOutcomes: ['booked', 'callback_scheduled', 'no_fit'],
    requiresHumanOwner: false,
  }
}
