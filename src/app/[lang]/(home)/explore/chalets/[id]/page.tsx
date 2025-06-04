import AmenitiesList from '@/components/AmenitiesList'
import PropertyDetails from '@/components/ChaletsDetails/PropertyDetails'
import PropertyDetailsCard from '@/components/ChaletsDetails/PropertyDetailsCard'
import LocationMap from '@/components/LocationMap'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWidget from '@/components/BookingWidget'
import ChaletsRules from '@/components/ChaletsRules'
import Calender from '@/components/Calender/Calender'
import { propertyData } from '@/lib/constant'
import HotelMap from '@/components/LocationMap'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = propertyData

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.images?.[0] ? [{ url: data.images[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.images?.[0] ? [data.images[0]] : [],
    },
  }
}
const hotel = {
  name: 'Grand Hotel',
  description: 'Luxurious stay in downtown.',
  reviews: 87,
  lat: 24.7136,
  lng: 46.6753,
}
export default async function ChaletDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = propertyData
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <PropertyDetailsCard
          title={data.title}
          location={data.location}
          rating={data.rating}
          reviewCount={data.reviewCount}
          images={data.images}
        />

        <div className="py-6 xl:px-22 lg:px-18 md:px-14 px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertyDetails
                description={data.description}
                maxGuests={data.maxGuests}
                bedrooms={data.bedrooms}
                bathrooms={data.bathrooms}
                title={data.title}
                beds={data.bedrooms}
                points={data.points}
              />
              <AmenitiesList amenities={data.amenities} />
              <Calender />
            </div>

            <div className="lg:col-span-1">
              {/* BookingWidget must remain a client component if it uses useState */}
              <BookingWidget
                maxGuests={data.maxGuests}
                packageOptions={data.packageOptions}
                bookingConfig={data.bookingConfig}
              />
            </div>
          </div>

          <>
            <ReviewsSection rating={data.rating} reviewCount={data.reviewCount} />
            <HotelMap
              center={{ lat: hotel.lat, lng: hotel.lng }}
              hotelInfo={{
                name: hotel.name,
                description: hotel.description,
                reviews: hotel.reviews,
              }}
            />
            <ChaletsRules />
          </>
        </div>
      </div>
    </div>
  )
}
