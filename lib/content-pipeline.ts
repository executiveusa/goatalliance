// Transcript-to-content rules (Phlash digest): redact private data
// before drafting; expert verifies facts before approval; freshness
// dates make stale content visible. Redaction here is ASSISTED, never
// trusted: patterns catch the obvious, a human confirms before the
// record counts as REDACTED.

export interface RedactionResult {
  text: string
  redactions: string[]   // what pattern classes were hit
  needsHumanCheck: boolean
}

const PATTERNS: { label: string; re: RegExp; replacement: string }[] = [
  { label: 'email', re: /[\w.+-]+@[\w-]+\.[\w.]+/g, replacement: '[EMAIL]' },
  { label: 'phone', re: /(\+1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g, replacement: '[PHONE]' },
  { label: 'address', re: /\d{1,6}\s+[\w\s.]{2,30}\s+(st|street|ave|avenue|rd|road|dr|drive|ln|lane|way|ct|court|blvd|pl|place)\b\.?/gi, replacement: '[ADDRESS]' },
  { label: 'zip', re: /\b98\d{3}(-\d{4})?\b/g, replacement: '[ZIP]' },
  { label: 'card', re: /\b(?:\d[ -]*?){13,16}\b/g, replacement: '[PAYMENT]' },
]

export function redactTranscript(source: string): RedactionResult {
  let text = source
  const redactions: string[] = []
  for (const p of PATTERNS) {
    if (p.re.test(text)) {
      redactions.push(p.label)
      text = text.replace(p.re, p.replacement)
    }
    p.re.lastIndex = 0
  }
  // Any first-person identity residue ("my name is", "I live at") forces
  // human review even when patterns caught things.
  const needsHumanCheck =
    redactions.length === 0 || /my name is|i live (at|in)|my address/i.test(source)
  return { text, redactions, needsHumanCheck }
}

export type ReviewTransition =
  | 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED'

export const REVIEW_TRANSITIONS: Record<ReviewTransition, ReviewTransition[]> = {
  DRAFT: ['PENDING_REVIEW'],
  PENDING_REVIEW: ['APPROVED', 'REJECTED', 'DRAFT'],
  APPROVED: [],          // approved is terminal here; publishing is a separate, owner-only act
  REJECTED: ['DRAFT'],
}

export function canTransitionReview(from: ReviewTransition, to: ReviewTransition): boolean {
  if (from === to) return true
  return REVIEW_TRANSITIONS[from]?.includes(to) ?? false
}

// Approval requirements per the digest: redaction confirmed (not just
// assisted), a named expert reviewer, and a freshness date so the
// content can go stale visibly.
export function approvalProblems(d: {
  redactionStatus: string
  reviewer?: string | null
  freshnessAt?: Date | null
}): string[] {
  const problems: string[] = []
  if (d.redactionStatus !== 'REDACTED') problems.push('redactionStatus must be REDACTED (human-confirmed)')
  if (!d.reviewer) problems.push('reviewer (expert who verified the facts)')
  if (!d.freshnessAt) problems.push('freshnessAt (facts-verified-as-of date)')
  return problems
}

export function isStale(recheckAt: Date | null, now: Date = new Date()): boolean {
  return !!recheckAt && recheckAt < now
}
