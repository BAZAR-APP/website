'use client'

import { Button } from '@/components'
import BookingCard from '@/components/Booking/BookingCard'
import { bookingCardsData } from '@/lib/constant'
import { useRouter } from 'next/navigation'
import React from 'react'

const Booking = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<'current' | 'completed'>('current')

  const handleSeeDetails = (id: string) => {
    console.log('See details for property:', id)
  }

  const handleViewInvoice = (id: string) => {
    console.log('View invoice for property:', id)
  }

  return (
    <div className="xl:px-39 lg:px-20 md:px-14 sm:px-10 px-8 mx-auto min-h-screen py-3">
      <h2 className="md:text-[39px] text-[24px] md:leading-[47px] leading-8 font-semibold text-[#19191A]">
        My Bookings
      </h2>
      <p className="md:text-[20px] text-sm leading-[24px] text-[#484A4C] py-4">
        Track your stays, check-in details, and booking status here.
      </p>

      <div className="flex gap-4 flex-wrap my-5">
        <Button
          onClick={() => setActiveTab('current')}
          intent="transperent"
          className={`!rounded-[12px] border border-[#D0D5DD] text-sm transition-colors text-[#344054] ${
            activeTab === 'current' ? '!bg-[#29397E] text-white' : ''
          }`}
        >
          Current
        </Button>

        <Button
          onClick={() => setActiveTab('completed')}
          intent="transperent"
          className={`!rounded-[12px] border border-[#D0D5DD] text-sm transition-colors text-[#344054] ${
            activeTab === 'completed' ? '!bg-[#29397E] text-white' : ''
          }`}
        >
          Completed
        </Button>
      </div>

      {bookingCardsData.map((property) => (
        <BookingCard
          key={property.id}
          {...property}
          onClick={() => router.push(`/explore/booking/${property.id}`)}
          onSeeDetails={handleSeeDetails}
          onViewInvoice={handleViewInvoice}
          showRating={activeTab === 'completed'}
        />
      ))}
    </div>
  )
}

export default Booking
