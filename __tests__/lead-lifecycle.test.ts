import { canTransition, withTransition, leadSourceToContactSource } from '@/lib/lead-lifecycle'

describe('lead lifecycle', () => {
  it('allows the happy path NEW -> CONTACTED -> QUALIFIED -> WON', () => {
    expect(canTransition('NEW', 'CONTACTED')).toBe(true)
    expect(canTransition('CONTACTED', 'QUALIFIED')).toBe(true)
    expect(canTransition('QUALIFIED', 'WON')).toBe(true)
  })

  it('blocks skipping qualification', () => {
    expect(canTransition('NEW', 'WON')).toBe(false)
    expect(canTransition('NEW', 'QUALIFIED')).toBe(false)
  })

  it('terminal states stay terminal', () => {
    expect(canTransition('WON', 'LOST')).toBe(false)
    expect(canTransition('LOST', 'NEW')).toBe(false)
  })

  it('lets a disqualified lead be reopened to NEW only', () => {
    expect(canTransition('DISQUALIFIED', 'NEW')).toBe(true)
    expect(canTransition('DISQUALIFIED', 'WON')).toBe(false)
  })

  it('same-state rewrite is allowed', () => {
    expect(canTransition('NEW', 'NEW')).toBe(true)
  })

  it('appends history without losing existing metadata', () => {
    const meta = withTransition({ scoring: 'auto-score 80' }, { from: 'NEW', to: 'CONTACTED', at: 't1' })
    expect(meta.scoring).toBe('auto-score 80')
    const meta2 = withTransition(meta, { from: 'CONTACTED', to: 'QUALIFIED', at: 't2' })
    expect(meta2.statusHistory).toHaveLength(2)
  })

  it('maps lead sources to contact sources', () => {
    expect(leadSourceToContactSource('REFERRAL')).toBe('REFERRAL')
    expect(leadSourceToContactSource('PAID_SEARCH')).toBe('GOOGLE')
    expect(leadSourceToContactSource(undefined)).toBe('OTHER')
  })
})

describe('appointment lifecycle', () => {
  it('flows SCHEDULED -> CONFIRMED -> COMPLETED', async () => {
    const { canTransitionAppointment } = await import('@/lib/appointment-lifecycle')
    expect(canTransitionAppointment('SCHEDULED', 'CONFIRMED')).toBe(true)
    expect(canTransitionAppointment('CONFIRMED', 'COMPLETED')).toBe(true)
    expect(canTransitionAppointment('SCHEDULED', 'COMPLETED')).toBe(false)
    expect(canTransitionAppointment('COMPLETED', 'SCHEDULED')).toBe(false)
    expect(canTransitionAppointment('CANCELLED', 'SCHEDULED')).toBe(true)
  })
})
