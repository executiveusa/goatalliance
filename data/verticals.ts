export type Vertical = {
  slug: string
  name: string
  shortName: string
  buyerIntent: string
  aiReadableAngle: string
  socialPurposeAngle: string
  priorityFields: string[]
  proofAssets: string[]
  cta: string
  image: string
}

export const verticals: Vertical[] = [
  {
    slug: 'plumbers',
    name: 'Plumbers',
    shortName: 'Plumbing',
    buyerIntent: 'Emergency, leak repair, water heater, sewer, remodel support',
    aiReadableAngle: 'Make emergency availability, license status, service radius, and after-hours rules easy for AI assistants to parse.',
    socialPurposeAngle: 'Support safe housing by routing low-income households to verified emergency and prevention resources.',
    priorityFields: ['license', 'bond', 'insurance', '24/7 status', 'water heater brands', 'sewer camera', 'service radius'],
    proofAssets: ['van photo', 'license screenshot', 'before-after repair photos', 'service menu', 'verified reviews'],
    cta: 'Get a plumbing profile audit',
    image: '/images/sector-plumbers.svg'
  },
  {
    slug: 'hvac',
    name: 'HVAC Contractors',
    shortName: 'HVAC',
    buyerIntent: 'Heat pumps, furnace repair, AC, maintenance, indoor air quality',
    aiReadableAngle: 'Expose equipment brands, rebates, maintenance plans, emergency heat rules, and seasonal capacity in structured data.',
    socialPurposeAngle: 'Help families find efficient heating/cooling options and connect qualified contractors to weatherization programs.',
    priorityFields: ['license', 'heat pump', 'furnace', 'rebates', 'maintenance plans', 'emergency heat', 'service radius'],
    proofAssets: ['equipment installs', 'brand certifications', 'rebate notes', 'technician photos', 'review patterns'],
    cta: 'Get an HVAC profile audit',
    image: '/images/sector-hvac.svg'
  },
  {
    slug: 'roofers',
    name: 'Roofers',
    shortName: 'Roofing',
    buyerIntent: 'Leaks, storm repair, replacement, moss removal, gutters, inspections',
    aiReadableAngle: 'Turn roof type, materials, warranty, emergency leak response, and weather-window capacity into structured pages.',
    socialPurposeAngle: 'Support housing resilience by making leak-prevention and maintenance education easy to find.',
    priorityFields: ['license', 'roof types', 'materials', 'warranty', 'leak response', 'gutters', 'moss treatment'],
    proofAssets: ['roof photos', 'drone images', 'warranty docs', 'material brands', 'inspection checklist'],
    cta: 'Get a roofing profile audit',
    image: '/images/sector-roofers.svg'
  },
  {
    slug: 'painters',
    name: 'Painters',
    shortName: 'Painting',
    buyerIntent: 'Exterior painting, interior painting, cabinets, commercial repaint, prep work',
    aiReadableAngle: 'Make paint systems, surface prep, lead-safe practices, portfolio examples, and service timelines discoverable.',
    socialPurposeAngle: 'Promote low-VOC options, repair-before-paint education, and beautification projects in neighborhoods that need care.',
    priorityFields: ['license', 'interior', 'exterior', 'cabinetry', 'low VOC', 'lead-safe', 'portfolio'],
    proofAssets: ['before-after photos', 'color examples', 'paint brand notes', 'prep checklist', 'warranty'],
    cta: 'Get a painting profile audit',
    image: '/images/sector-painters.svg'
  },
  {
    slug: 'pressure-washers',
    name: 'Pressure Washers',
    shortName: 'Pressure Washing',
    buyerIntent: 'Driveways, siding, decks, roofs, storefronts, graffiti, property management turns',
    aiReadableAngle: 'Expose surfaces served, soft-wash capability, runoff controls, seasonal packages, before-after proof, and property-manager availability.',
    socialPurposeAngle: 'Create an EcoWash lane: water-conscious cleaning, runoff education, graffiti cleanup days, and neighborhood beautification.',
    priorityFields: ['insurance', 'surface types', 'soft wash', 'water recovery', 'detergents', 'before-after photos', 'commercial availability'],
    proofAssets: ['before-after photos', 'equipment photo', 'runoff plan', 'detergent list', 'property-manager references'],
    cta: 'Get a pressure washing profile audit',
    image: '/images/sector-pressure-washers.svg'
  }
]

export function getVertical(slug: string) {
  return verticals.find(v => v.slug === slug)
}
