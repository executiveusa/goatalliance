import { scoreLead } from '@/lib/lead-scoring'

describe('scoreLead', () => {
  it('scores a bare anonymous lead at zero', () => {
    expect(scoreLead({}).score).toBe(0)
  })

  it('rewards phone contact heavily', () => {
    const withPhone = scoreLead({ phone: '(206) 555-0142' })
    const without = scoreLead({})
    expect(withPhone.score).toBeGreaterThanOrEqual(25)
    expect(withPhone.score).toBeGreaterThan(without.score)
  })

  it('rewards complete in-area leads the most', () => {
    const hot = scoreLead({
      name: 'Sam Ro',
      email: 'sam@example.com',
      phone: '2065550142',
      serviceType: 'roof repair',
      message: 'Leak over the garage, need someone this week.',
      state: 'WA',
      zipCode: '98101',
      source: 'REFERRAL',
    })
    expect(hot.score).toBe(100)
    expect(hot.reasons.length).toBeGreaterThan(3)
  })

  it('does not reward out-of-area leads the WA bonuses', () => {
    const out = scoreLead({ state: 'OR', zipCode: '97201' })
    expect(out.score).toBe(0)
  })

  it('rejects malformed email', () => {
    expect(scoreLead({ email: 'not-an-email' }).score).toBe(0)
  })

  it('clamps to 0-100', () => {
    const r = scoreLead({
      name: 'x'.repeat(50), email: 'a@b.co', phone: '2065550142',
      serviceType: 'paint', message: 'm'.repeat(100), state: 'WA', zipCode: '98001',
    })
    expect(r.score).toBeLessThanOrEqual(100)
    expect(r.score).toBeGreaterThanOrEqual(0)
  })
})
