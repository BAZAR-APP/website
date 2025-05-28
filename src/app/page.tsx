import { PropertyCard } from '@/components/PropertyCard'
import { Card, Heading } from '@radix-ui/themes'
const mockProperties = [
  {
    id: 1,
    title: 'Luxury Lakeside Retreat',
    location: 'Al Khiran',
    guests: '5-7 guests',
    beds: '5 beds',
    baths: '4 bath',
    amenities: ['Wifi', 'Free Parking'],
    rating: 4.7,
    reviews: 200,
    price: 100,
    priceUnit: 'night' as const,
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9df58597e3e3f82cf04ba41b5826302522a3872d?placeholderIfAbsent=true',
  },
  // Add more mock properties as needed
]

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {mockProperties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  )
}
