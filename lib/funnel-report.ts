// Nine-step revenue flywheel math (Phlash methodology).
// Pure functions over plain records so the math is unit-testable
// without a database. Never optimizes to clicks/forms: every step
// carries lineage back to lead source and forward to won revenue.

export interface FunnelInput {
  leads: { source: string; validation: string; createdAt: Date }[]
  bookings: { createdAt: Date; contactId?: string | null }[]
  estimates: { status: string; amount: number | null; presentedAt: Date | null; decidedAt: Date | null; contactId?: string | null }[]
  events: { kind: string; amount: number | null; source: string | null; occurredAt: Date }[]
}

export interface FunnelReport {
  period: { from: string | null; to: string | null }
  leads: number
  validLeads: number
  duplicateLeads: number
  bookings: number
  bookingRate: number | null        // booked / valid leads
  estimatesPresented: number
  estimatesWon: number
  closeRate: number | null          // won / estimates decided
  averageTicket: number | null      // avg won estimate amount
  revenue: number
  refunds: number
  spend: number
  cac: number | null                // spend / new customers (won estimates)
  bindingConstraint: string         // weakest step vs healthy benchmark
  benchmarks: Record<string, [number, number]>  // contextual, not targets
}

const inRange = (d: Date | null, from?: Date, to?: Date) =>
  !!d && (!from || d >= from) && (!to || d <= to)

export function computeFunnelReport(
  input: FunnelInput,
  from?: Date,
  to?: Date
): FunnelReport {
  const leads = input.leads.filter(l => inRange(l.createdAt, from, to))
  const bookings = input.bookings.filter(b => inRange(b.createdAt, from, to))
  const presented = input.estimates.filter(e => inRange(e.presentedAt, from, to))
  const decided = input.estimates.filter(e =>
    inRange(e.decidedAt, from, to) && (e.status === 'WON' || e.status === 'LOST'))
  const won = decided.filter(e => e.status === 'WON')

  const events = input.events.filter(e => inRange(e.occurredAt, from, to))
  const sum = (kind: string) =>
    events.filter(e => e.kind === kind).reduce((a, e) => a + (e.amount ?? 0), 0)

  const validLeads = leads.filter(l => l.validation !== 'DUPLICATE' && l.validation !== 'INVALID')
  const bookingRate = validLeads.length ? bookings.length / validLeads.length : null
  const closeRate = decided.length ? won.length / decided.length : null
  const averageTicket = won.length
    ? won.reduce((a, e) => a + (e.amount ?? 0), 0) / won.length
    : null
  const spend = sum('SPEND')
  const revenue = sum('REVENUE') + won.reduce((a, e) => a + (e.amount ?? 0), 0)

  // Phlash contextual benchmarks (not universal targets).
  const benchmarks: Record<string, [number, number]> = {
    bookingRate: [0.3, 0.62],   // ServiceTitan range cited by Phlash
    closeRate: [0.4, 0.6],
  }

  let bindingConstraint = 'insufficient data'
  if (validLeads.length >= 5) {
    if (bookingRate !== null && bookingRate < benchmarks.bookingRate[0]) {
      bindingConstraint = 'booking rate below 30% benchmark: fix response speed and intake before buying traffic'
    } else if (closeRate !== null && decided.length >= 5 && closeRate < benchmarks.closeRate[0]) {
      bindingConstraint = 'close rate below 40% benchmark: run estimate follow-up engine before scaling spend'
    } else {
      bindingConstraint = 'no step below benchmark: compare cost of conversion lift vs more leads'
    }
  }

  return {
    period: {
      from: from ? from.toISOString() : null,
      to: to ? to.toISOString() : null
    },
    leads: leads.length,
    validLeads: validLeads.length,
    duplicateLeads: leads.filter(l => l.validation === 'DUPLICATE').length,
    bookings: bookings.length,
    bookingRate,
    estimatesPresented: presented.length,
    estimatesWon: won.length,
    closeRate,
    averageTicket,
    revenue,
    refunds: sum('REFUND'),
    spend,
    cac: won.length && spend ? spend / won.length : null,
    bindingConstraint,
    benchmarks,
  }
}
