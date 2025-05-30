'use client'
import { useState } from 'react'
import AmenitiesList from '@/components/AmenitiesList'
import PropertyDetails from '@/components/ChaletsDetails/PropertyDetails'
import PropertyDetailsCard from '@/components/ChaletsDetails/PropertyDetailsCard'
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import LocationMap from '@/components/LocationMap'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWidget from '@/components/BookingWidget'
import { propertyData } from '@/lib/utils'
import ChaletsRules from '@/components/ChaletsRules'
import Calender from '@/components/Calender/Calender'

const ChaletsDetails = () => {
  const [checkIn, setCheckIn] = useState<Date | undefined>()
  const [checkOut, setCheckOut] = useState<Date | undefined>()
  const [guests, setGuests] = useState<number>(2)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto">
        <PropertyDetailsCard
          title={propertyData.title}
          location={propertyData.location}
          rating={propertyData.rating}
          reviewCount={propertyData.reviewCount}
          images={propertyData.images}
        />

        <div className="py-6 xl:px-22 lg:px-18 md:px-14 px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PropertyDetails
                description={propertyData.description}
                maxGuests={propertyData.maxGuests}
                bedrooms={propertyData.bedrooms}
                bathrooms={propertyData.bathrooms}
                title={propertyData.title}
                beds={propertyData.bedrooms}
                points={propertyData.points}
              />

              <AmenitiesList amenities={propertyData.amenities} />
              <Calender />
            </div>

            <div className="lg:col-span-1">
              <div>
                <BookingWidget
                  checkIn={checkIn}
                  setCheckIn={setCheckIn}
                  checkOut={checkOut}
                  setCheckOut={setCheckOut}
                  guests={guests}
                  setGuests={setGuests}
                  maxGuests={propertyData.maxGuests}
                  packageOptions={propertyData.packageOptions}
                  bookingConfig={propertyData.bookingConfig}
                />
              </div>
            </div>
          </div>
          <div>
            <ReviewsSection rating={propertyData.rating} reviewCount={propertyData.reviewCount} />
            <LocationMap />
            <ChaletsRules />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ChaletsDetails
