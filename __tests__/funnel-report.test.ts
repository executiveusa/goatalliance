import { computeFunnelReport } from '@/lib/funnel-report'

const day = (n: number) => new Date(Date.UTC(2026, 8, n))

describe('nine-step funnel report', () => {
  it('computes the flywheel chain with revenue lineage', () => {
    const r = computeFunnelReport({
      leads: [
        { source: 'PAID_SEARCH', validation: 'VALID', createdAt: day(1) },
        { source: 'PAID_SEARCH', validation: 'VALID', createdAt: day(2) },
        { source: 'PAID_SEARCH', validation: 'DUPLICATE', createdAt: day(2) },
        { source: 'ORGANIC', validation: 'VALID', createdAt: day(3) },
        { source: 'ORGANIC', validation: 'VALID', createdAt: day(4) },
      ],
      bookings: [{ createdAt: day(5) }, { createdAt: day(6) }],
      estimates: [
        { status: 'WON', amount: 12000, presentedAt: day(7), decidedAt: day(9) },
        { status: 'LOST', amount: 8000, presentedAt: day(7), decidedAt: day(10) },
        { status: 'WON', amount: 6000, presentedAt: day(8), decidedAt: day(11) },
      ],
      events: [
        { kind: 'SPEND', amount: 900, source: 'PAID_SEARCH', occurredAt: day(2) },
      ],
    })
    expect(r.leads).toBe(5)
    expect(r.validLeads).toBe(4)
    expect(r.duplicateLeads).toBe(1)
    expect(r.bookingRate).toBe(0.5)
    expect(r.closeRate).toBeCloseTo(2 / 3)
    expect(r.averageTicket).toBe(9000)
    expect(r.revenue).toBe(18000)
    expect(r.cac).toBe(450) // 900 spend / 2 won
  })

  it('flags booking rate as the binding constraint when below benchmark', () => {
    const r = computeFunnelReport({
      leads: Array.from({ length: 10 }, (_, i) => ({ source: 'WEBSITE', validation: 'VALID', createdAt: day(i + 1) })),
      bookings: [{ createdAt: day(2) }],
      estimates: [],
      events: [],
    })
    expect(r.bookingRate).toBe(0.1)
    expect(r.bindingConstraint).toMatch(/booking rate/)
  })

  it('says insufficient data with too few leads instead of fake precision', () => {
    const r = computeFunnelReport({ leads: [], bookings: [], estimates: [], events: [] })
    expect(r.bindingConstraint).toBe('insufficient data')
    expect(r.bookingRate).toBeNull()
    expect(r.cac).toBeNull()
  })

  it('respects the period filter', () => {
    const r = computeFunnelReport(
      {
        leads: [
          { source: 'WEBSITE', validation: 'VALID', createdAt: day(1) },
          { source: 'WEBSITE', validation: 'VALID', createdAt: day(20) },
        ],
        bookings: [], estimates: [], events: [],
      },
      day(15),
      day(30)
    )
    expect(r.leads).toBe(1)
  })
})
