import { assignArm, armFunnel, isConclusive } from '@/lib/experiments'

describe('sticky assignment', () => {
  const arms = [
    { id: 'control', trafficPercentage: 50 },
    { id: 'variant', trafficPercentage: 50 },
  ]

  it('same visitor always gets the same arm', () => {
    const a = assignArm('test1', 'visitor-42', arms)
    const b = assignArm('test1', 'visitor-42', arms)
    expect(a?.id).toBe(b?.id)
  })

  it('different visitors split across arms', () => {
    const picks = new Set(
      Array.from({ length: 50 }, (_, i) => assignArm('test1', `v-${i}`, arms)?.id)
    )
    expect(picks.size).toBe(2)
  })

  it('returns null with no arms', () => {
    expect(assignArm('t', 'v', [])).toBeNull()
  })
})

describe('experiment report rules', () => {
  it('primary metric is qualified per unique visitor, not clicks', () => {
    const arm = armFunnel('a', 100, [
      { validation: 'VALID', status: 'NEW' },
      { validation: 'VALID', status: 'QUALIFIED' },
      { validation: 'DUPLICATE', status: 'NEW' },
    ], [])
    expect(arm.primaryMetric).toBe(0.01)
    expect(arm.visitorToLead).toBe(0.02)
  })

  it('no winner below the predefined sample on every arm', () => {
    const arms = [
      armFunnel('a', 50, [], []),
      armFunnel('b', 120, [], []),
    ]
    expect(isConclusive(arms, 100)).toBe(false)
    expect(isConclusive(arms, 50)).toBe(true)
    expect(isConclusive(arms, null)).toBe(false)
  })
})
