import AmenitiesList from '@/components/AmenitiesList'
import PropertyDetails from '@/components/ChaletsDetails/PropertyDetails'
import PropertyDetailsCard from '@/components/ChaletsDetails/PropertyDetailsCard'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWidget from '@/components/BookingWidget'
import ChaletsRules from '@/components/ChaletsRules'
import Calender from '@/components/Calender/Calender'
import { propertyData } from '@/lib/constant'
import SelectablePlans from '@/components/SelectablePlans'
import BedroomCard from '@/components/BedroomCard'
import HotelMap from '@/components/LocationMap'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import toast from 'react-hot-toast'
import { extractErrorMessage } from '@/lib/utils'
import { Amenity, Chalet, ChaletBedroom } from '../../../../../../types/chalets'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; lang: string }>
}): Promise<Metadata> {
  const { id, lang } = await params
  try {
    // Get session on server-side
    const session = await getServerSession(authOptions)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chalets/readById/${id}?language=${lang}`,
      {
        method: 'GET',
        headers: {
          ...(session?.user?.accessToken && {
            Authorization: `Bearer ${session.user.accessToken}`,
          }),
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch chalet data')
    }

    const data = await res.json()

    return {
      title: data.title || propertyData.title,
      description: data.description || propertyData.description,
      openGraph: {
        title: data.title || propertyData.title,
        description: data.description || propertyData.description,
        images: [{ url: data?.photoURL }],
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title || propertyData.title,
        description: data.description || propertyData.description,
        images: [data?.photoURL],
      },
    }
  } catch (error) {
    return {
      title: propertyData.title,
      description: propertyData.description,
      openGraph: {
        title: propertyData.title,
        description: propertyData.description,
        images: propertyData.images?.[0] ? [{ url: propertyData.images[0] }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: propertyData.title,
        description: propertyData.description,
        images: propertyData.images?.[0] ? [propertyData.images[0]] : [],
      },
    }
  }
}

const hotel = {
  name: 'Grand Hotel',
  description: 'Luxurious stay in downtown.',
  reviews: 87,
  lat: 24.7136,
  lng: 46.6753,
}

export default async function ChaletDetailsPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>
}) {
  const { id, lang } = await params

  let data: Chalet | null = null
  let allAmenities: Amenity[] = []

  try {
    const session = await getServerSession(authOptions)
    const [chaletRes, amenitiesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chalets/readById/${id}?language=${lang}`, {
        method: 'GET',
        headers: {
          ...(session?.user?.accessToken && {
            Authorization: `Bearer ${session.user.accessToken}`,
          }),
        },
      }),
      fetch(
        `${process.env.NEXT_PUBLIC_NESTJS_API_URL}/chaletAmenity/readByChaletId/${id}?language=${lang}&limit=1000`,
        {
          method: 'GET',
          headers: {
            ...(session?.user?.accessToken && {
              Authorization: `Bearer ${session.user.accessToken}`,
            }),
          },
        },
      ),
    ])

    if (chaletRes.ok) {
      data = await chaletRes.json()
    }

    if (amenitiesRes.ok) {
      const amenitiesData = await amenitiesRes.json()
      allAmenities = Array.isArray(amenitiesData?.data) ? amenitiesData.data : []
    }
  } catch (error) {
    toast.error(extractErrorMessage(error))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-p">
        <PropertyDetailsCard
          title={data?.title || ''}
          location={data?.city || ''}
          rating={data?.rating ?? 0}
          reviewCount={data?.noOfReviews ?? 0}
          images={data?.galleryPhotoURLs || []}
        />

        <div className="py-6 xl:px-22 lg:px-18 md:px-14 px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 md:pr-8">
              <PropertyDetails
                description={data?.description || ''}
                maxGuests={data?.maxNoOfGuests || ''}
                bedrooms={data?.noOfBedrooms || ''}
                bathrooms={data?.noOfBaths || ''}
                title={data?.title || ''}
                beds={data?.maxNoOfBeds || ''}
                points={data?.noOfLoyalityPoints || 0}
                trustedByPlatform={data?.trustedByPlatform ?? false}
                badge={data?.badge}
                isFamilyFriendlyOnly={data?.isFamilyFriendlyOnly}
                viewTypes={data?.viewTypes}
                isSelfCheckIn={data?.isSelfCheckIn}
                area={data?.area + ' ' + data?.areaUnit}
                host={data?.host}
              />
              <SelectablePlans subscriptions={data?.subscriptions || []} />
              <div className="border-b border-[#E5E7EB]">
                <AmenitiesList
                  amenities={(allAmenities || []).slice(0, 10)}
                  allAmenities={allAmenities}
                />
                <h2 className="md:text-[25px] text-xl font-semibold leading-[32px] text-[#19191A] mt-7">
                  Where you'll sleep
                </h2>
                {data?.chaletRooms?.length === 0 ? (
                  <div className="text-center text-lg text-gray-500 py-10 w-full">
                    No Rooms Available
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7 mb-10">
                    {data?.chaletRooms?.map((room: ChaletBedroom, index) => (
                      <BedroomCard key={index} room={room} />
                    ))}
                  </div>
                )}
              </div>
              <Calender />
            </div>

            <div className="lg:col-span-1">
              <BookingWidget
                maxGuests={data?.maxNoOfGuests || ''}
                bookingConfig={propertyData.bookingConfig}
                guests={2}
                chalet={data}
                packageInfo={{
                  perHourCost: data?.perHourCost,
                  perNightCost: data?.perNightCost,
                  weekendCost: data?.weekendCost,
                  weekDaysCost: data?.weekDaysCost,
                  fullWeekCost: data?.fullWeekCost,
                  fullMonthCost: data?.fullMonthCost,
                }}
                bookings={data?.bookings || []}
              />
            </div>
          </div>

          <>
            <ReviewsSection rating={10} reviewCount={100} />
            <HotelMap
              center={{ lat: data?.latitude || hotel?.lat, lng: data?.longitude || hotel?.lng }}
              hotelInfo={{
                name:
                  data?.title ?? (data?.perHourCost !== undefined ? String(data.perHourCost) : ''),
                description: data?.description || '',
                reviews: hotel.reviews || 12,
              }}
            />
            <div className="py-8 mt-3">
              <ChaletsRules />
            </div>
          </>
        </div>
      </div>
    </div>
  )
}
