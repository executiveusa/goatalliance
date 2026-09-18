// Revenue-linked experiment rules (Phlash digest test contract):
// one hypothesis/variable; sticky assignment + exact revision; primary
// metric qualified booked opportunity per unique visitor; predefined
// sample, no early winner-calling on noise.

export interface VariantArm {
  id: string
  trafficPercentage: number
}

// Deterministic sticky assignment: same visitor+test always lands on
// the same arm for a given traffic configuration. No randomness, no DB.
export function assignArm(testId: string, visitorKey: string, arms: VariantArm[]): VariantArm | null {
  if (!arms.length) return null
  const total = arms.reduce((a, v) => a + v.trafficPercentage, 0)
  if (total <= 0) return null

  // FNV-1a hash: stable across processes.
  let h = 0x811c9dc5
  const s = `${testId}:${visitorKey}`
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  let slot = (h % 10000) / 10000 * total
  for (const arm of arms) {
    slot -= arm.trafficPercentage
    if (slot < 0) return arm
  }
  return arms[arms.length - 1]
}

export interface ArmFunnel {
  armId: string
  visitors: number
  leads: number
  validLeads: number
  qualifiedLeads: number      // QUALIFIED or WON = qualified booked opportunity proxy
  wonEstimates: number
  revenue: number
  visitorToLead: number | null
  primaryMetric: number | null  // qualified per unique visitor
}

export function armFunnel(
  armId: string,
  visitors: number,
  leads: { validation: string; status: string }[],
  wonEstimates: { amount: number | null }[]
): ArmFunnel {
  const valid = leads.filter(l => l.validation !== 'DUPLICATE' && l.validation !== 'INVALID')
  const qualified = valid.filter(l => l.status === 'QUALIFIED' || l.status === 'WON')
  return {
    armId,
    visitors,
    leads: leads.length,
    validLeads: valid.length,
    qualifiedLeads: qualified.length,
    wonEstimates: wonEstimates.length,
    revenue: wonEstimates.reduce((a, e) => a + (e.amount ?? 0), 0),
    visitorToLead: visitors ? valid.length / visitors : null,
    primaryMetric: visitors ? qualified.length / visitors : null,
  }
}

// No winner below the predefined sample on EVERY arm. Ever.
export function isConclusive(arms: ArmFunnel[], plannedSampleSize: number | null): boolean {
  if (!plannedSampleSize) return false
  return arms.every(a => a.visitors >= plannedSampleSize)
}
