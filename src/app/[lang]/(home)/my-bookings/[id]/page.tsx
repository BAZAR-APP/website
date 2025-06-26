'use client'

import React, { useMemo, useCallback, useEffect, useState } from 'react'
import { MapPin, ChevronRight } from 'lucide-react'
import { Button } from '@/components'
import ChaletRules from '@/components/ChaletsRules'
import Image from 'next/image'
import Location from '@/components/Location'
import { useParams, useRouter } from 'next/navigation'
import CancelBooking from '@/components/Booking/CancelBooking'
import useToggle from '@/lib/hooks/useToggle'
import ModalDialog from '@/components/ModalDialog/Dialog'

// Define the interfaces for your data structure (these are correct)
interface AddOn {
  name: string
  price: number
}

interface PriceBreakdownItem {
  description: string
  amount: number
}

interface DateRange {
  from: string
  to: string
}

type PaymentStatus = 'fully_paid' | 'partially_paid'

// This interface is for the data that the component will *use*, not for the page props directly.
// You might rename it to something like `BookingData` or `ChaletBookingDetails`
interface BookingData {
  id: string
  title: string
  location: string
  points: number
  guests: string
  propertyType: string
  beds: number
  baths: number
  amenities: string[]
  dateRange: DateRange
  imageUrl: string
  imageAlt: string
  paymentStatus: PaymentStatus
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  securityDeposit: number
  addOns: AddOn[]
  paymentDueDate: string
  priceBreakdown: PriceBreakdownItem[]
}

// Default values as you have them, which are useful for initial state or fallback
const DEFAULT_VALUES: BookingData = {
  id: '', // Add ID here if it's part of your default, or handle its absence
  title: 'Luxury Lakeside Retreat',
  location: 'Al Khiran',
  points: 200,
  guests: '5-7 guests',
  propertyType: 'Entire Home',
  beds: 5,
  baths: 4,
  amenities: ['Wifi', 'Free Parking'],
  dateRange: { from: '20/3/2025', to: '24/3/2025' },
  imageUrl: 'https://picsum.photos/seed/beach/311/190',
  imageAlt: 'Property image',
  paymentStatus: 'partially_paid',
  totalAmount: 440,
  paidAmount: 220,
  remainingAmount: 220,
  securityDeposit: 200,
  addOns: [{ name: 'BBQ setup with private chef', price: 30 }],
  paymentDueDate: '17/3/2025',
  priceBreakdown: [
    { description: 'Base Price x 4 nights', amount: 400 },
    { description: 'Refundable Deposit', amount: 200 },
    { description: 'Flower Arrangement', amount: 30 },
  ],
}

// Helper components (no changes needed for these, just including for completeness)
const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = React.memo(
  function PaymentStatusBadge({ status }) {
    const statusConfig = {
      fully_paid: {
        bgColor: 'bg-[#D1FAE5]',
        textColor: 'text-[#10B981]',
        icon: '/images/paid.svg',
        text: 'Fully Paid',
      },
      partially_paid: {
        bgColor: 'bg-[#FCE7F3]',
        textColor: 'text-[#EC4899]',
        icon: '/images/discount.svg',
        text: '50% Paid',
      },
    }

    const config = statusConfig[status] || statusConfig.fully_paid

    return (
      <div
        className={`flex ${config.bgColor} ${config.textColor} rounded-md px-1.5 py-1 text-sm gap-0.5`}
      >
        <Image src={config.icon} width={20} height={20} alt="Payment status icon" />
        {config.text}
      </div>
    )
  },
)

const PropertyInfo: React.FC<{
  guests: string
  propertyType: string
  beds: number
  baths: number
  amenities: string[]
}> = React.memo(function PropertyInfo({ guests, propertyType, beds, baths, amenities }) {
  const infoItems = useMemo(
    () => [guests, propertyType, `${beds} beds`, `${baths} baths`, ...amenities],
    [guests, propertyType, beds, baths, amenities],
  )

  return (
    <div className="text-sm text-[#8E8E93] leading-5">
      {infoItems.map((item, index) => (
        <span key={item}>
          {item}
          {index < infoItems.length - 1 && (
            <span className="text-[#9EA0A2] text-[9px] px-1">&bull;</span>
          )}
        </span>
      ))}
    </div>
  )
})

const DateSection: React.FC<{ dateRange: DateRange }> = React.memo(function DateSection({
  dateRange,
}) {
  return (
    <div className="border-b border-[#D1D5DB] max-w-[359px]">
      <h2 className="font-semibold text-[25px] leading-[32px] text-[#19191A] mb-4">Dates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="sm:border-r border-[#D1D5DB] px-0.5">
          <label className="font-semibold text-[10px] leading-[16px] text-[#19191A]">
            CHECK-IN
          </label>
          <div className="text-[14px] leading-[17px] text-[#9EA0A2]">
            {dateRange.from || 'Not set'}
          </div>
        </div>
        <div className="px-0.5">
          <label className="font-semibold text-[10px] leading-[16px] text-[#19191A]">
            CHECKOUT
          </label>
          <div className="text-[14px] leading-[17px] text-[#9EA0A2]">
            {dateRange.to || 'Not set'}
          </div>
        </div>
      </div>
    </div>
  )
})

const AddOnsSection: React.FC<{ addOns: AddOn[] }> = React.memo(function AddOnsSection({ addOns }) {
  if (!addOns?.length) return null

  return (
    <div>
      <h2 className="font-semibold text-[25px] leading-8 text-[#19191A] mb-4">Add-ons</h2>
      {addOns.map((addOn, index) => (
        <div key={`${addOn.name}-${index}`} className="flex items-center flex-wrap gap-2">
          <Image src={'/images/Addon.svg'} width={24} height={24} alt="Add icon" />
          <span className="text-base leading-[19px] text-[#19191A]">{addOn.name}</span>
          <span className="text-base leading-[19px] text-[#19191A]">{addOn.price} KWD</span>
        </div>
      ))}
    </div>
  )
})

const PaymentSection: React.FC<{
  paymentStatus: PaymentStatus
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  securityDeposit: number
  paymentDueDate: string
  priceBreakdown: PriceBreakdownItem[]
  onPayRemaining?: () => void
  onCancelBooking?: () => void
}> = React.memo(function PaymentSection({
  paymentStatus,
  totalAmount,
  paidAmount,
  remainingAmount,
  securityDeposit,
  paymentDueDate,
  priceBreakdown,
  onPayRemaining,
  onCancelBooking,
}) {
  return (
    <div className="w-full lg:max-w-[430px] max-w-full">
      <div className="sm:px-6 px-3 bg-[#F9FAFB] rounded-[16px] py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold md:text-[25px] text-lg md:leading-8 leading-6 text-[#19191A]">
            Total Payments
          </h2>
          <PaymentStatusBadge status={paymentStatus} />
        </div>

        {paymentStatus === 'partially_paid' && (
          <p className="text-sm leading-[17px] text-[#9EA0A2]">
            You&apos;ve paid 50% of the total amount ({paidAmount} KWD). The remaining{' '}
            {remainingAmount} KWD is due at least 72 hours before check-in by [{paymentDueDate}].
          </p>
        )}

        {securityDeposit > 0 && (
          <div className="bg-[#FCE7F3] rounded-lg py-1 px-2 my-4">
            <p className="text-[10px] text-[#EC4899] leading-relaxed">
              A refundable security deposit of {securityDeposit} KWD is required. This amount will
              be held and returned within 72 hours after checkout if no damage is reported.
            </p>
          </div>
        )}

        <div className="space-y-4 mb-6 text-base leading-[19px] text-[#19191A]">
          {priceBreakdown.map((item, index) => (
            <div key={`${item.description}-${index}`} className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                {item.description}
                {item.description === 'Refundable Deposit' && (
                  <Image src="/images/Deposit.svg" width={15} height={15} alt="Deposit icon" />
                )}
              </span>
              <span>{item.amount} KWD</span>
            </div>
          ))}

          <hr />
          <div className="flex justify-between items-center font-medium text-[#19191A] text-[16px]">
            <span>Total</span>
            <span>{totalAmount} KWD</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 min-h-[200px] pt-10">
        {paymentStatus !== 'fully_paid' && (
          <Button
            intent="primary"
            className="w-full !px-0 !text-sm !text-[#FFFFFF]"
            onClick={onPayRemaining}
          >
            Pay Remaining Amount {remainingAmount} KD Now
          </Button>
        )}
        <Button intent="danger" className="w-full !text-sm" onClick={onCancelBooking}>
          Cancel Booking
        </Button>
      </div>
    </div>
  )
})

// Define the props for your Next.js Page Component

export default function BookingDetailsPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }

  const [bookingData, setBookingData] = useState<BookingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real application, you would fetch the booking details
    // from an API based on the 'id'.
    // For this example, we'll simulate a fetch with DEFAULT_VALUES.
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

        // In a real app:
        // const response = await fetch(`/api/bookings/${id}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch booking details');
        // }
        // const data: BookingData = await response.json();
        // setBookingData(data);

        // For now, use DEFAULT_VALUES and assign the ID
        setBookingData({ ...DEFAULT_VALUES, id: id })
      } catch (err) {
        setError('Failed to load booking details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBookingDetails()
    }
  }, [id])

  const { isOpen: isCancelOpen, toggle: toggleCancel } = useToggle(false)
  const { isOpen: isConfirmCancel, toggle: confirmCancelToggle } = useToggle(false)

  const handleViewDetails = useCallback(() => {
    // Navigate to chalet details page
    router.push(`/chalet/${bookingData?.id || 'some-default-chalet-id'}`)
  }, [router, bookingData])

  const handleViewLocation = useCallback(() => {
    // Implement logic to view location, maybe open a map or navigate to a map page
    console.log('View exact location')
  }, [])

  const handlePayRemaining = () => {
    router.push('/my-bookings/complete-payment/')
  }

  const handleCancelBooking = () => {
    toggleCancel()
  }

  if (loading) {
    return <div className="p-10 text-center">Loading booking details...</div>
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>
  }

  if (!bookingData) {
    return <div className="p-10 text-center">Booking details not found.</div>
  }

  return (
    <div className="2xl:px-22 xl:px-15 md:px-10 sm:px-7 px-3">
      <div className="lg:px-20 md:px-14 sm:px-10 px-8 mx-auto py-9">
        <h1 className="md:text-[39px] text-[24px] md:leading-[47px] leading-8 font-semibold text-[#19191A] sm:mb-2">
          {bookingData.title}
        </h1>
        <p className="mb-6 md:text-[20px] text-sm md:leading-[24px] leading-4 text-[#484A4C] sm:pt-0 pt-1">
          Track your stays, check-in details, and booking status here.
        </p>

        <div className="flex items-start justify-between lg:flex-nowrap flex-wrap gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg">
              <div className="lg:w-[470px] w-full pt-3">
                <Image
                  src={bookingData.imageUrl}
                  alt={bookingData.imageAlt}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center flex-wrap gap-2 pt-3">
                  <h3 className="text-[16px] font-medium text-[#19191A]">{bookingData.title}</h3>
                  {bookingData.points > 0 && (
                    <div className="flex bg-[#E1F3FF] items-center gap-1 rounded py-1 px-1.5 max-w-[110px]">
                      <Image src="/images/Points.svg" width={16} height={16} alt="Points Icon" />
                      <span className="text-[#29397E] text-sm">{bookingData.points} Points</span>
                    </div>
                  )}
                </div>

                <Location
                  icon={<MapPin className="w-4 h-4 text-[#8E8E93]" />}
                  text={bookingData.location}
                  className="text-[#8E8E93] text-sm"
                />

                <PropertyInfo
                  guests={bookingData.guests}
                  propertyType={bookingData.propertyType}
                  beds={bookingData.beds}
                  baths={bookingData.baths}
                  amenities={Array.from(bookingData.amenities)}
                />

                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    onClick={handleViewDetails}
                    intent="transperent"
                    className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex gap-1 items-center"
                  >
                    View Chalet Details Page <ChevronRight className="w-3 h-3" strokeWidth={3} />
                  </Button>
                  <Button
                    onClick={handleViewLocation}
                    intent="transperent"
                    className="text-sm font-medium !px-0 !py-0 text-[#29397E] underline underline-offset-2 flex  gap-1 items-center"
                  >
                    View Exact Location <ChevronRight className="w-3 h-3" strokeWidth={3} />
                  </Button>
                </div>
              </div>
            </div>

            <DateSection dateRange={bookingData.dateRange} />
            <AddOnsSection addOns={bookingData.addOns} />
            <ChaletRules />
          </div>

          <PaymentSection
            paymentStatus={bookingData.paymentStatus}
            totalAmount={bookingData.totalAmount}
            paidAmount={bookingData.paidAmount}
            remainingAmount={bookingData.remainingAmount}
            securityDeposit={bookingData.securityDeposit}
            paymentDueDate={bookingData.paymentDueDate}
            priceBreakdown={Array.from(bookingData.priceBreakdown)}
            onPayRemaining={handlePayRemaining}
            onCancelBooking={handleCancelBooking}
          />
        </div>
      </div>
      <CancelBooking
        isOpen={isCancelOpen}
        setIsOpen={toggleCancel}
        onCancel={() => {
          confirmCancelToggle()
        }}
      />
      <ModalDialog
        isOpen={isConfirmCancel}
        setIsOpen={confirmCancelToggle}
        className="lg:min-w-[524px] min-w-[auto]"
      >
        <div className="text-center">
          <Image
            src="/images/PayConfirm.svg"
            width={120}
            height={120}
            alt="Success"
            className="mx-auto"
          />
          <h3 className="md:text-[25px] text-xl font-semibold mt-4 text-[#19191A] pt-3">
            Booking Cancelled
          </h3>
          <p className=" md:text-xl text-[16px] text-[#484A4C] mt-2">
            Your booking has been successfully cancelled. If applicable, your refund will be
            processed according to the cancellation policy.
          </p>
          <div className="flex md:flex-row flex-col justify-between gap-4 pt-8">
            <Button
              onClick={() => router.push('/explore/booking/')}
              intent="ghost"
              className="cursor-pointer bg-[#F3F4F6] text-[#19191A] rounded-lg text-[16px] font-medium w-full"
            >
              Back to My Bookings
            </Button>
            <Button
              onClick={() => router.push('/explore/')}
              className="cursor-pointer bg-[#29397E] text-[#FDFDFE] rounded-lg text-[16px] font-medium !w-full"
            >
              Browse Chalets
            </Button>
          </div>
        </div>
      </ModalDialog>
    </div>
  )
}
