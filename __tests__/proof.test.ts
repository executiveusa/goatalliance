import { derivedCredentialStatus, needsRecheck, defaultRecheckDate } from '@/lib/proof'

const past = new Date(Date.now() - 24 * 3600 * 1000)
const future = new Date(Date.now() + 30 * 24 * 3600 * 1000)

describe('proof graph rules', () => {
  it('verified credential past expiry derives EXPIRED', () => {
    expect(derivedCredentialStatus({ status: 'SOURCE_VERIFIED', expiresAt: past, recheckAt: null })).toBe('EXPIRED')
  })

  it('verified credential past recheck drops back to CLAIMED', () => {
    expect(derivedCredentialStatus({ status: 'SOURCE_VERIFIED', expiresAt: null, recheckAt: past })).toBe('CLAIMED')
  })

  it('dispute always wins', () => {
    expect(derivedCredentialStatus({ status: 'DISPUTED', expiresAt: future, recheckAt: future })).toBe('DISPUTED')
  })

  it('fresh verified credential stays verified', () => {
    expect(derivedCredentialStatus({ status: 'SOURCE_VERIFIED', expiresAt: future, recheckAt: future })).toBe('SOURCE_VERIFIED')
  })

  it('recheck cadence: insurance is checked more often than licenses', () => {
    const from = new Date('2026-09-17T00:00:00Z')
    const ins = defaultRecheckDate('insurance', from)
    const lic = defaultRecheckDate('license', from)
    expect(ins.getTime()).toBeLessThan(lic.getTime())
  })

  it('needsRecheck flags disputed and expired', () => {
    expect(needsRecheck({ status: 'DISPUTED', expiresAt: future, recheckAt: future })).toBe(true)
    expect(needsRecheck({ status: 'SOURCE_VERIFIED', expiresAt: future, recheckAt: future })).toBe(false)
  })
})
