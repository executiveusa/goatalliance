"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ListingCardProps {
  professional: {
    id: number
    name: string
    title: string
    location: string
    rating: number
    reviewCount: number
    hourlyRate?: string
    image?: string
    logo?: string
    blurb: string
    slug?: string
  }
}

export default function ListingCard({ professional }: ListingCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group"
         style={{ 
           padding: '16px',
           borderRadius: '12px',
           boxShadow: 'var(--shadow-soft)'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.boxShadow = 'var(--shadow-strong)'
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.boxShadow = 'var(--shadow-soft)'
         }}
    >
      {/* 16:9 Cover Image */}
      <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4">
        {professional.image ? (
          <Image
            src={professional.image}
            alt={`${professional.name} portfolio`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Portfolio Image</span>
          </div>
        )}
      </div>

      {/* Professional Info */}
      <div className="space-y-3">
        {/* Name and Logo Row */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-card-foreground leading-tight">
              {professional.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {professional.title}
            </p>
          </div>
          
          {/* 64px Logo */}
          <div className="w-16 h-16 flex-shrink-0 ml-3">
            {professional.logo ? (
              <Image
                src={professional.logo}
                alt={`${professional.name} logo`}
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-accent rounded-lg flex items-center justify-center text-charcoal font-bold text-lg">
                {professional.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <p className="text-muted-foreground text-sm flex items-center">
          📍 {professional.location}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex text-gold">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < Math.floor(professional.rating) ? 'opacity-100' : 'opacity-30'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {professional.rating.toFixed(1)} ({professional.reviewCount} reviews)
          </span>
        </div>

        {/* Hourly Rate */}
        {professional.hourlyRate && (
          <div className="text-lg font-bold text-charcoal">
            {professional.hourlyRate}/hr
          </div>
        )}

        {/* Blurb */}
        <p className="text-card-foreground text-sm leading-relaxed line-clamp-3">
          {professional.blurb}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <a 
            href={`/listing/${professional.slug || professional.id}`}
            className="flex-1"
          >
            <Button className="w-full bg-charcoal hover:bg-charcoal/90 text-cream">
              View profile
            </Button>
          </a>
          <Button 
            variant="outline" 
            className="flex-1 border-gold text-gold hover:bg-gold hover:text-charcoal"
          >
            Contact
          </Button>
        </div>
      </div>
    </div>
  )
}