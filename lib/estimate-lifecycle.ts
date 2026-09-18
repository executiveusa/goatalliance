import type { EstimateStatus } from '@prisma/client'

export const ESTIMATE_TRANSITIONS: Record<EstimateStatus, EstimateStatus[]> = {
  DRAFT: ['PRESENTED'],
  PRESENTED: ['WON', 'LOST', 'EXPIRED'],
  WON: [],
  LOST: [],
  EXPIRED: [],
}

export function canTransitionEstimate(from: EstimateStatus, to: EstimateStatus): boolean {
  if (from === to) return true
  return ESTIMATE_TRANSITIONS[from]?.includes(to) ?? false
}
