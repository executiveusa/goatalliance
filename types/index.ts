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

// Printify API Types
export interface PrintifyShop {
  id: number
  title: string
  sales_channel: string
}

export interface PrintifyProduct {
  id: string
  title: string
  description: string
  tags: string[]
  options: PrintifyProductOption[]
  variants: PrintifyProductVariant[]
  images: PrintifyProductImage[]
  created_at: string
  updated_at: string
  visible: boolean
  is_locked: boolean
  blueprint_id: number
  user_id: number
  shop_id: number
  print_provider_id: number
  print_areas: PrintifyPrintArea[]
  sales_channel_properties: Record<string, unknown>[]
}

export interface PrintifyProductOption {
  name: string
  type: string
  values: PrintifyProductOptionValue[]
}

export interface PrintifyProductOptionValue {
  id: number
  title: string
}

export interface PrintifyProductVariant {
  id: number
  sku: string
  cost: number
  price: number
  title: string
  grams: number
  is_enabled: boolean
  is_default: boolean
  is_available: boolean
  options: number[]
}

export interface PrintifyProductImage {
  src: string
  variant_ids: number[]
  position: string
  is_default: boolean
}

export interface PrintifyPrintArea {
  variant_ids: number[]
  placeholders: PrintifyPlaceholder[]
}

export interface PrintifyPlaceholder {
  position: string
  images: PrintifyPlaceholderImage[]
}

export interface PrintifyPlaceholderImage {
  id: string
  name: string
  type: string
  height: number
  width: number
  x: number
  y: number
  scale: number
  angle: number
}

export interface PrintifyOrder {
  id: string
  external_id: string
  shop_id: number
  status: string
  shipping_method: number
  is_printify_express: boolean
  is_economy_shipping: boolean
  created_at: string
  updated_at: string
  address_to: PrintifyAddress
  line_items: PrintifyLineItem[]
  metadata: Record<string, unknown>
}

export interface PrintifyAddress {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  region: string
  address1: string
  address2?: string
  city: string
  zip: string
}

export interface PrintifyLineItem {
  product_id: string
  variant_id: number
  quantity: number
  print_provider_id: number
  blueprint_id: number
  sku: string
  cost: number
  shipping_cost: number
  status: string
  metadata: Record<string, unknown>
}