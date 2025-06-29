import AmenitiesList from '@/components/AmenitiesList'
import PropertyDetails from '@/components/ChaletsDetails/PropertyDetails'
import PropertyDetailsCard from '@/components/ChaletsDetails/PropertyDetailsCard'
import ReviewsSection from '@/components/ReviewsSection'
import BookingWidget from '@/components/BookingWidget'
import ChaletsRules from '@/components/ChaletsRules'
import Calender from '@/components/Calender/Calender'
import { propertyData, rooms } from '@/lib/constant'
import SelectablePlans from '@/components/SelectablePlans'
import BedroomCard from '@/components/BedroomCard'
import HotelMap from '@/components/LocationMap'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { toast } from '@/lib/toast'
import { extractErrorMessage } from '@/lib/utils'
import { Chalet, ChaletBedroom } from '../../../../../../types/chalets'

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
        images: data.images?.[0]
          ? [{ url: data.images[0] }]
          : propertyData.images?.[0]
            ? [{ url: propertyData.images[0] }]
            : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: data.title || propertyData.title,
        description: data.description || propertyData.description,
        images: data.images?.[0]
          ? [data.images[0]]
          : propertyData.images?.[0]
            ? [propertyData.images[0]]
            : [],
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

  try {
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

    if (res.ok) {
      const fetchedData = await res.json()
      data = fetchedData as Chalet // Use fetched data if available
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
          rating={5}
          reviewCount={5}
          images={data?.galleryPhotoIds || ['']}
        />

        <div className="py-6 xl:px-22 lg:px-18 md:px-14 px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8 md:pr-8">
              <PropertyDetails
                description={data?.description || ''}
                maxGuests={data?.maxNoOfGuests || ''}
                bedrooms={data?.noOfBaths || ''}
                bathrooms={data?.noOfBedrooms || ''}
                title={data?.title || ''}
                beds={data?.noOfBedrooms || ''}
                points={200}
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
                <AmenitiesList amenities={data?.amenities || []} />
                <h2 className="md:text-[25px] text-xl font-semibold leading-[32px] text-[#19191A] mt-7">
                  Where you'll sleep
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7 mb-10">
                  {data?.chaletRooms?.map((room: ChaletBedroom, index) => (
                    <BedroomCard key={index} room={room} />
                  ))}
                </div>
              </div>
              <Calender />
            </div>

            <div className="lg:col-span-1">
              <BookingWidget
                maxGuests={data?.maxNoOfGuests || ''}
                bookingConfig={propertyData.bookingConfig}
                guests={2}
                packageInfo={{
                  perHourCost: data?.perHourCost,
                  perNightCost: data?.perNightCost,
                  weekendCost: data?.weekendCost,
                  weekDaysCost: data?.weekDaysCost,
                  fullWeekCost: data?.fullWeekCost,
                  fullMonthCost: data?.fullMonthCost,
                }}
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
