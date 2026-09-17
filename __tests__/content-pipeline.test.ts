import { redactTranscript, canTransitionReview, approvalProblems, isStale } from '@/lib/content-pipeline'

describe('redaction assist', () => {
  it('redacts phone, email, address, zip, card', () => {
    const r = redactTranscript('Call me at (253) 555-0188 or jo@example.com, I am at 1234 Cedar Ave, Tacoma 98402. Card 4242 4242 4242 4242.')
    expect(r.text).not.toMatch(/555-0188|jo@example\.com|Cedar Ave|98402|4242/)
    expect(r.redactions).toEqual(expect.arrayContaining(['phone', 'email', 'address', 'zip', 'card']))
  })

  it('flags identity residue for human check', () => {
    const r = redactTranscript('My name is Jo and my roof leaks.')
    expect(r.needsHumanCheck).toBe(true)
  })

  it('never claims full redaction on empty hits', () => {
    expect(redactTranscript('How much does a roof cost?').needsHumanCheck).toBe(true)
  })
})

describe('review state machine', () => {
  it('flows DRAFT -> PENDING_REVIEW -> APPROVED, approved is terminal', () => {
    expect(canTransitionReview('DRAFT', 'PENDING_REVIEW')).toBe(true)
    expect(canTransitionReview('PENDING_REVIEW', 'APPROVED')).toBe(true)
    expect(canTransitionReview('APPROVED', 'DRAFT')).toBe(false)
    expect(canTransitionReview('REJECTED', 'DRAFT')).toBe(true)
  })

  it('approval requires confirmed redaction, expert reviewer, freshness date', () => {
    expect(approvalProblems({ redactionStatus: 'PENDING' }).length).toBe(3)
    expect(approvalProblems({
      redactionStatus: 'REDACTED', reviewer: 'EARL', freshnessAt: new Date(),
    })).toEqual([])
  })

  it('staleness is visible via recheck date', () => {
    expect(isStale(new Date(Date.now() - 86400000))).toBe(true)
    expect(isStale(new Date(Date.now() + 86400000))).toBe(false)
    expect(isStale(null)).toBe(false)
  })
})
