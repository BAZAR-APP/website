// 'use client'

// import { Button } from '@/components'
// import BookingCard from '@/components/Booking/BookingCard'
// import { PropertyCardSkeleton } from '@/components/Skeletons/chaletsCardSkeleton'
// import { useQueryBase } from '@/lib/axios'
// import { IBooking } from '@/lib/types/booking'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// const Booking = () => {
//   const router = useRouter()
//   const [activeTab, setActiveTab] = React.useState<'current' | 'completed'>('current')
//   const { data, isLoading } = useQueryBase({
//     queryKey: ['my-bookings', activeTab],
//     url: `/booking/me?type=${activeTab}`,
//     staleTime: 0,
//     cacheTime: 0,
//   })
//   const bookings = data?.data?.bookings as IBooking[]

//   const handleSeeDetails = (id: string) => {
//     console.log('See details for property:', id)
//   }

//   const handleViewInvoice = (id: string) => {
//     console.log('View invoice for property:', id)
//   }

//   return (
//     <div className="xl:px-39 lg:px-20 md:px-14 sm:px-10 px-8 mx-auto min-h-screen py-3">
//       <h2 className="md:text-[39px] text-[24px] md:leading-[47px] leading-8 font-semibold text-[#19191A]">
//         My Bookings
//       </h2>
//       <p className="md:text-[20px] text-sm leading-[24px] text-[#484A4C] py-4">
//         Track your stays, check-in details, and booking status here.
//       </p>

//       <div className="flex gap-4 flex-wrap my-5">
//         <Button
//           onClick={() => setActiveTab('current')}
//           intent="transperent"
//           className={`!rounded-[12px] border border-[#D0D5DD] text-sm transition-colors text-[#344054] ${
//             activeTab === 'current' ? '!bg-[#29397E] text-white' : ''
//           }`}
//         >
//           Current
//         </Button>

//         <Button
//           onClick={() => setActiveTab('completed')}
//           intent="transperent"
//           className={`!rounded-[12px] border border-[#D0D5DD] text-sm transition-colors text-[#344054] ${
//             activeTab === 'completed' ? '!bg-[#29397E] text-white' : ''
//           }`}
//         >
//           Completed
//         </Button>
//       </div>

//       {isLoading ? (
//         <div className="flex flex-col gap-4">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <PropertyCardSkeleton key={index} flexRow={true} />
//           ))}
//         </div>
//       ) : (
//         <>
//           {bookings?.length > 0 ? (
//             bookings?.map((booking: IBooking) => (
//               <BookingCard
//                 key={booking.id}
//                 onClick={() => router.push(`/my-bookings/${booking.id}`)}
//                 onSeeDetails={handleSeeDetails}
//                 onViewInvoice={handleViewInvoice}
//                 showRating={true}
//                 booking={booking}
//               />
//             ))
//           ) : (
//             <div className="text-center py-8">
//               <h3 className="text-[#19191A] text-[25px] leading-[32px] font-semibold text-center pt-6 pb-2.5">
//                 No Bookings Yet
//               </h3>
//               <p className="font-normal text-[14px] leading-[17px] text-[#484A4C] text-center">
//                 You haven’t made any {activeTab === 'completed' ? 'completed' : 'current'} bookings
//                 yet.
//                 <br />
//                 Start exploring and plan your stay today!
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default Booking

// import { getMessages } from '@/lib/i18n'
import { Locale } from '../../../../../i18n.config'
import BookingClient from './BookingClient'

export default async function Booking({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  // const messages = getMessages(lang)

  return <BookingClient lang={lang} />
}
