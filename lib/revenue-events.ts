// Append-only writer for the revenue event spine. No update or delete
// path exists by design: corrections are new events (e.g. REFUND).

import { db } from '@/lib/db'
import type { RevenueEventKind } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'

export interface RevenueEventInput {
  kind: RevenueEventKind
  businessId?: string | null
  leadId?: string | null
  estimateId?: string | null
  appointmentId?: string | null
  source?: string | null
  campaign?: string | null
  amount?: number | null
  metadata?: Record<string, unknown>
}

export async function appendRevenueEvent(input: RevenueEventInput) {
  return db.revenueEvent.create({
    data: {
      kind: input.kind,
      businessId: input.businessId ?? null,
      leadId: input.leadId ?? null,
      estimateId: input.estimateId ?? null,
      appointmentId: input.appointmentId ?? null,
      source: input.source ?? null,
      campaign: input.campaign ?? null,
      amount: input.amount ?? null,
      metadata: input.metadata as InputJsonValue | undefined
    }
  })
}
