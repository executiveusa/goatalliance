import { ContractorProfile } from '@/data/profiles'
import { Vertical } from '@/data/verticals'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pnwaidirectory.com'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PNW AI Directory',
    url: baseUrl,
    description: 'An AI-readable local contractor directory for the Pacific Northwest, built for homeowners, property managers, AI assistants, and social-purpose community reinvestment.',
    areaServed: ['Washington', 'Oregon', 'Pacific Northwest'],
    knowsAbout: ['plumbing', 'HVAC', 'roofing', 'painting', 'pressure washing', 'llms.txt', 'LocalBusiness structured data'],
    sameAs: []
  }
}

export function verticalServiceSchema(vertical: Vertical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI-readable ${vertical.name} profiles`,
    serviceType: vertical.name,
    areaServed: ['Washington', 'Oregon', 'Pacific Northwest'],
    provider: organizationSchema(),
    description: vertical.aiReadableAngle,
    url: `${baseUrl}/directory/${vertical.slug}`
  }
}

export function demoLocalBusinessSchema(profile: ContractorProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: profile.businessName,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.city,
      addressRegion: profile.state,
      addressCountry: 'US'
    },
    areaServed: profile.serviceArea,
    knowsAbout: profile.services,
    description: `Demo profile showing the minimum data needed for an AI-readable ${profile.vertical} listing. Not a verified public contractor claim.`,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'profileStatus', value: profile.status },
      { '@type': 'PropertyValue', name: 'aiReadinessScore', value: profile.aiReadinessScore },
      { '@type': 'PropertyValue', name: 'profileCompleteness', value: profile.profileCompleteness }
    ]
  }
}
