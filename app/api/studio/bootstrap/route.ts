import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

const defaultNiches = [
  {
    name: 'Painting',
    slug: 'painting',
    description: 'Interior and exterior painting services focused on curb appeal and durability.',
    services: [
      { name: 'Interior Painting', slug: 'interior-painting' },
      { name: 'Exterior Painting', slug: 'exterior-painting' },
      { name: 'Commercial Painting', slug: 'commercial-painting' },
      { name: 'Cabinet Refinishing', slug: 'cabinet-refinishing' }
    ]
  },
  {
    name: 'Roofing',
    slug: 'roofing',
    description: 'Residential and commercial roofing focused on weather readiness and longevity.',
    services: [
      { name: 'Roof Replacement', slug: 'roof-replacement' },
      { name: 'Roof Repair', slug: 'roof-repair' },
      { name: 'Roof Inspection', slug: 'roof-inspection' },
      { name: 'Moss Removal', slug: 'moss-removal' }
    ]
  },
  {
    name: 'Pressure Washing',
    slug: 'pressure-washing',
    description: 'Exterior surface cleaning for homes, storefronts, and hardscapes.',
    services: [
      { name: 'Driveway Cleaning', slug: 'driveway-cleaning' },
      { name: 'Siding Wash', slug: 'siding-wash' },
      { name: 'Deck Cleaning', slug: 'deck-cleaning' },
      { name: 'Commercial Pressure Washing', slug: 'commercial-pressure-washing' }
    ]
  },
  {
    name: 'Graffiti Removal',
    slug: 'graffiti-removal',
    description: 'Rapid response removal with surface protection and prevention planning.',
    services: [
      { name: 'Emergency Removal', slug: 'emergency-removal' },
      { name: 'Protective Coatings', slug: 'protective-coatings' },
      { name: 'Surface Restoration', slug: 'surface-restoration' },
      { name: 'Commercial Contracts', slug: 'commercial-contracts' }
    ]
  }
]

const defaultTemplates = [
  {
    name: 'High-Intent Lead Capture',
    slug: 'high-intent-lead-capture',
    description: 'Hero-led conversion flow with rapid quote capture and urgency signals.',
    sections: {
      hero: { primaryCta: 'Get My Quote', secondaryCta: 'See Pricing', layout: 'split', media: 'hero-image' },
      trust: { items: ['Local crews', 'Insured', 'Fast response', '5-star rated'] },
      proof: { layout: 'cards', emphasis: 'before-after' },
      offer: { type: 'bundle', headline: 'Seasonal specials available' },
      contact: { fields: ['name', 'email', 'phone', 'zipCode', 'serviceType'] }
    }
  },
  {
    name: 'Multi-Location Service Funnel',
    slug: 'multi-location-service-funnel',
    description: 'Localized landing page template for city/zip-based service funnels.',
    sections: {
      hero: { primaryCta: 'Schedule Inspection', secondaryCta: 'Talk to a Specialist', layout: 'stacked' },
      coverage: { layout: 'map', label: 'Service areas' },
      services: { layout: 'grid', highlight: 'seasonal' },
      testimonials: { layout: 'carousel' },
      contact: { fields: ['name', 'email', 'phone', 'city', 'serviceType'] }
    }
  }
]

const defaultLandingPages = [
  {
    nicheSlug: 'painting',
    name: 'Pacific Northwest Painting Leads',
    slug: 'pnw-painting-leads',
    goal: 'Quote requests for interior/exterior painting',
    locale: 'en-US',
    variants: [
      {
        name: 'Control',
        slug: 'control',
        isControl: true,
        trafficPercentage: 60,
        headline: 'Fresh paint. Fast crews. Guaranteed curb appeal.',
        subheadline: 'Book a certified painting team and get same-week availability in the PNW.'
      },
      {
        name: 'Urgency',
        slug: 'urgency',
        isControl: false,
        trafficPercentage: 40,
        headline: 'Seasonal painting spots are filling this week.',
        subheadline: 'Lock in a fast quote from vetted PNW crews today.'
      }
    ]
  },
  {
    nicheSlug: 'roofing',
    name: 'Pacific Northwest Roofing Leads',
    slug: 'pnw-roofing-leads',
    goal: 'Roof inspections and emergency repair leads',
    locale: 'en-US',
    variants: [
      {
        name: 'Control',
        slug: 'control',
        isControl: true,
        trafficPercentage: 50,
        headline: 'Storm-ready roofing teams on standby.',
        subheadline: 'Schedule inspections and repairs with trusted crews near you.'
      },
      {
        name: 'Warranty Focus',
        slug: 'warranty-focus',
        isControl: false,
        trafficPercentage: 50,
        headline: 'Protect your roof with certified, warrantied crews.',
        subheadline: 'Get a same-day inspection quote in minutes.'
      }
    ]
  }
]

export async function POST() {
  try {
    const niches = []

    for (const niche of defaultNiches) {
      const createdNiche = await db.niche.upsert({
        where: { slug: niche.slug },
        update: {
          name: niche.name,
          description: niche.description,
          isActive: true
        },
        create: {
          name: niche.name,
          slug: niche.slug,
          description: niche.description,
          isActive: true,
          services: {
            create: niche.services.map((service) => ({
              name: service.name,
              slug: service.slug
            }))
          }
        },
        include: { services: true }
      })

      niches.push(createdNiche)
    }

    const templates = []
    for (const template of defaultTemplates) {
      const createdTemplate = await db.siteTemplate.upsert({
        where: { slug: template.slug },
        update: {
          name: template.name,
          description: template.description,
          sections: template.sections,
          status: 'ACTIVE'
        },
        create: {
          name: template.name,
          slug: template.slug,
          description: template.description,
          sections: template.sections,
          status: 'ACTIVE'
        }
      })
      templates.push(createdTemplate)
    }

    const landingPages = []
    for (const landingPage of defaultLandingPages) {
      const niche = niches.find((item) => item.slug === landingPage.nicheSlug)
      if (!niche) {
        continue
      }

      const createdLandingPage = await db.landingPage.upsert({
        where: { slug: landingPage.slug },
        update: {
          name: landingPage.name,
          nicheId: niche.id,
          goal: landingPage.goal,
          locale: landingPage.locale,
          status: 'ACTIVE'
        },
        create: {
          name: landingPage.name,
          slug: landingPage.slug,
          nicheId: niche.id,
          goal: landingPage.goal,
          locale: landingPage.locale,
          status: 'ACTIVE',
          variants: {
            create: landingPage.variants.map((variant) => ({
              name: variant.name,
              slug: variant.slug,
              isControl: variant.isControl,
              trafficPercentage: variant.trafficPercentage,
              headline: variant.headline,
              subheadline: variant.subheadline
            }))
          }
        },
        include: { variants: true }
      })

      landingPages.push(createdLandingPage)
    }

    return NextResponse.json({
      success: true,
      message: 'Studio bootstrap completed',
      data: {
        niches,
        templates,
        landingPages
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Studio bootstrap error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to bootstrap studio defaults',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
