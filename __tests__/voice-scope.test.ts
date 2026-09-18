import { requiresHumanEscalation, validateCallRecord, simulateInbound } from '@/lib/voice-scope'

describe('escalation gates', () => {
  it('escalates emergencies, price commitments, complaints, legal, ambiguity, unsupported', () => {
    expect(requiresHumanEscalation({ emergency: true })).toBe('emergency')
    expect(requiresHumanEscalation({ priceCommitment: true })).toBe('price_commitment')
    expect(requiresHumanEscalation({ complaint: true })).toBe('complaint')
    expect(requiresHumanEscalation({ legalOrInsurance: true })).toBe('legal_or_insurance')
    expect(requiresHumanEscalation({ highTicketAmbiguous: true })).toBe('high_ticket_ambiguity')
    expect(requiresHumanEscalation({ unsupportedQuestion: true })).toBe('unsupported_question')
  })

  it('safety outranks everything', () => {
    expect(requiresHumanEscalation({ safety: true, emergency: true, complaint: true })).toBe('safety')
  })

  it('clean intake does not escalate', () => {
    expect(requiresHumanEscalation({})).toBeNull()
  })
})

describe('required call record', () => {
  const good = {
    callerConsent: true, disclosureGiven: true, service: 'roof repair',
    summary: 'Leak reported', outcome: 'booked', direction: 'INBOUND' as const,
  }
  it('accepts a complete record', () => {
    expect(validateCallRecord(good)).toEqual([])
  })
  it('rejects missing disclosure/consent', () => {
    const problems = validateCallRecord({ ...good, disclosureGiven: false, callerConsent: false })
    expect(problems.join()).toMatch(/disclosureGiven/)
    expect(problems.join()).toMatch(/callerConsent/)
  })
  it('escalated calls need owner and SLA', () => {
    const problems = validateCallRecord({ ...good, escalationReason: 'emergency', outcome: 'escalated' })
    expect(problems.join()).toMatch(/humanOwner/)
    expect(problems.join()).toMatch(/slaDueAt/)
  })
  it('commitments need an accountable owner', () => {
    const problems = validateCallRecord({ ...good, commitments: 'will call back at 9am' })
    expect(problems.join()).toMatch(/humanOwner/)
  })
})

describe('test-only simulation', () => {
  it('never dials: mode is always test-only', () => {
    expect(simulateInbound({}).mode).toBe('test-only')
    expect(simulateInbound({ emergency: true }).mode).toBe('test-only')
  })
  it('urgency=emergency escalates even without explicit flag', () => {
    expect(simulateInbound({ urgency: 'emergency' }).action).toBe('escalate')
  })
  it('clean intake allows booking outcomes', () => {
    expect(simulateInbound({ service: 'roof repair' }).allowedOutcomes).toContain('booked')
  })
})
