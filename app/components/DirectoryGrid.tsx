import ListingCard from "./ListingCard"

interface Professional {
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

interface DirectoryGridProps {
  professionals: Professional[]
  className?: string
}

export default function DirectoryGrid({ professionals, className = "" }: DirectoryGridProps) {
  return (
    <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {professionals.map((professional) => (
        <ListingCard 
          key={professional.id} 
          professional={professional} 
        />
      ))}
    </div>
  )
}