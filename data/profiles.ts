export type ContractorProfile = {
  id: string
  businessName: string
  vertical: string
  city: string
  state: string
  status: 'demo-seed' | 'claimed' | 'verified'
  aiReadinessScore: number
  profileCompleteness: number
  services: string[]
  serviceArea: string[]
  socialPurposeFit: string
  missingData: string[]
}

export const contractorProfiles: ContractorProfile[] = [
  {
    id: 'demo-seattle-plumbing-001',
    businessName: 'Demo Emergency Plumbing Profile',
    vertical: 'plumbers',
    city: 'Seattle',
    state: 'WA',
    status: 'demo-seed',
    aiReadinessScore: 42,
    profileCompleteness: 36,
    services: ['leak repair', 'water heaters', 'drain cleaning', 'sewer camera'],
    serviceArea: ['Seattle', 'Shoreline', 'Burien'],
    socialPurposeFit: 'Emergency leak-prevention education and safe-housing referral partner.',
    missingData: ['license number', 'after-hours rules', 'brand certifications', 'insurance proof']
  },
  {
    id: 'demo-bellevue-hvac-001',
    businessName: 'Demo Heat Pump Contractor Profile',
    vertical: 'hvac',
    city: 'Bellevue',
    state: 'WA',
    status: 'demo-seed',
    aiReadinessScore: 48,
    profileCompleteness: 41,
    services: ['heat pumps', 'furnace repair', 'maintenance plans', 'indoor air quality'],
    serviceArea: ['Bellevue', 'Kirkland', 'Redmond'],
    socialPurposeFit: 'Energy-efficiency education and weatherization partner candidate.',
    missingData: ['rebate eligibility notes', 'equipment brands', 'emergency heat rules']
  },
  {
    id: 'demo-tacoma-roofing-001',
    businessName: 'Demo Weather-Ready Roofing Profile',
    vertical: 'roofers',
    city: 'Tacoma',
    state: 'WA',
    status: 'demo-seed',
    aiReadinessScore: 39,
    profileCompleteness: 33,
    services: ['leak repair', 'roof replacement', 'moss treatment', 'gutters'],
    serviceArea: ['Tacoma', 'Puyallup', 'Lakewood'],
    socialPurposeFit: 'Storm-readiness education and leak-prevention content.',
    missingData: ['material warranties', 'drone proof', 'storm response process']
  },
  {
    id: 'demo-portland-painting-001',
    businessName: 'Demo Low-VOC Painting Profile',
    vertical: 'painters',
    city: 'Portland',
    state: 'OR',
    status: 'demo-seed',
    aiReadinessScore: 45,
    profileCompleteness: 38,
    services: ['interior painting', 'exterior painting', 'cabinet painting', 'surface prep'],
    serviceArea: ['Portland', 'Beaverton', 'Gresham'],
    socialPurposeFit: 'Neighborhood beautification, low-VOC education, and repair-before-paint guidance.',
    missingData: ['portfolio by surface type', 'paint systems', 'lead-safe practices']
  },
  {
    id: 'demo-vancouver-pressure-wash-001',
    businessName: 'Demo EcoWash Pressure Washing Profile',
    vertical: 'pressure-washers',
    city: 'Vancouver',
    state: 'WA',
    status: 'demo-seed',
    aiReadinessScore: 51,
    profileCompleteness: 44,
    services: ['driveways', 'siding', 'soft wash', 'storefronts', 'graffiti cleanup'],
    serviceArea: ['Vancouver', 'Camas', 'Portland'],
    socialPurposeFit: 'Runoff education, graffiti cleanup days, and property-manager maintenance routes.',
    missingData: ['water recovery plan', 'detergent list', 'before-after photo set', 'commercial response time']
  }
]
