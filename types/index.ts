export interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: 'CLIENT' | 'CONTRACTOR' | 'ADMIN'
  emailVerified?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Contractor {
  id: string
  userId: string
  businessName?: string | null
  description?: string | null
  website?: string | null
  phone?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  country: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  isPremium: boolean
  rating?: number | null
  reviewCount: number
  skills: string[]
  experience?: number | null
  portfolio?: any
  certifications: string[]
  createdAt: Date
  updatedAt: Date
  user?: User
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  icon?: string | null
  parentId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  contractorId: string
  clientId: string
  rating: number
  title?: string | null
  comment?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  published: boolean
  featured: boolean
  authorId?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  stripeSubscriptionId?: string | null
  stripePriceId: string
  stripeCustomerId?: string | null
  status: 'ACTIVE' | 'INACTIVE' | 'CANCELLED' | 'PAST_DUE'
  currentPeriodStart?: Date | null
  currentPeriodEnd?: Date | null
  createdAt: Date
  updatedAt: Date
}