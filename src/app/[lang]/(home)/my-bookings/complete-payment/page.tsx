'use client'
import BookingSummary from '@/components/BookingSummary'
import PaymentForm from '@/components/PaymentForm'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Locale } from '../../../../../../i18n.config'
import api, { useQueryBase } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { extractErrorMessage, calculateSplitPayment } from '@/lib/utils'
import { toast } from '@/lib/toast'
import { IBooking } from '@/lib/types/booking'
import { useKnetPayment } from '@/lib/hooks/useKnetPayment'

const CompletePayment: React.FC = () => {
  const params = useParams() as { lang: Locale }
  const { lang } = params
  const router = useRouter()
  const { data: session } = useSession()
  const [isPaying, setIsPaying] = useState(false)
  const methods = useForm()
  const { initiatePayment: initiateKnetPayment } = useKnetPayment()

  // Fetch user's current bookings to find the half-paid booking
  const { data: bookingData, isLoading: isLoadingBookings } = useQueryBase({
    queryKey: ['userBookings', 'current', lang],
    url: `/booking/me?type=current&language=${lang}`,
    staleTime: 0,
    cacheTime: 0,
    enabled: !!session?.user?.accessToken && !!lang,
  })

  const bookings = bookingData?.data?.bookings as IBooking[] | undefined
  const halfPaidBooking = bookings?.find((b) => b.paymentStatus === 'halfPaid')

  const handleCompletePayment = async () => {
    if (!halfPaidBooking) {
      toast.error(lang === 'en' ? 'No pending payment found' : 'لم يتم العثور على دفعة معلقة')
      return
    }

    try {
      setIsPaying(true)
      const split = calculateSplitPayment(halfPaidBooking.grandTotal)
      const remainingAmount = split.secondPayment

      if (remainingAmount <= 0) {
        toast.error(lang === 'en' ? 'Invalid amount to pay' : 'مبلغ غير صالح للدفع')
        return
      }

      // Initiate KNET payment for remaining balance
      await initiateKnetPayment(
        halfPaidBooking.id,
        remainingAmount,
        'split', // This is the second split payment
      )

      // Note: User will be redirected to KNET payment page
      // After payment, KNET will redirect to success/failed page
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(extractErrorMessage(error))
      setIsPaying(false)
    }
  }

  if (isLoadingBookings) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!halfPaidBooking) {
    return (
      <div className="max-w-[1800px] mx-auto lg:px-21 md:px-13 sm:px-10 px-8 py-9">
        <div className="text-center py-12">
          <h2 className="xl:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-4">
            {lang === 'en' ? 'No Pending Payment' : 'لا توجد دفعة معلقة'}
          </h2>
          <p className="text-[#484A4C] md:text-[20px] text-sm mb-8">
            {lang === 'en'
              ? 'You do not have any bookings with pending payments.'
              : 'ليس لديك أي حجوزات مع دفعات معلقة.'}
          </p>
        </div>
      </div>
    )
  }

  const split = calculateSplitPayment(halfPaidBooking.grandTotal)
  const paidAmount = split.firstPayment
  const remainingAmount = split.secondPayment

  return (
    <FormProvider {...methods}>
      <div className="max-w-[1800px] mx-auto lg:px-21 md:px-13 sm:px-10 px-8 py-9">
        <h2 className="xl:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">
          {lang === 'en' ? 'Complete Your Payment' : 'أكمل دفعتك'}
        </h2>
        <p className="text-[#484A4C] md:text-[20px] text-sm mb-8">
          {lang === 'en'
            ? 'Pay the remaining amount to fully confirm your chalet booking.'
            : 'ادفع المبلغ المتبقي لتأكيد حجز الشاليه بالكامل.'}
        </p>
        <div className="flex flex-col lg:flex-row gap-4 border-b border-[#E5E7EB] pb-3">
          <div className="flex-1">
            <PaymentForm paymentDetail={false} lang={lang} />
          </div>

          <div className="w-full xl:w-1/3 pb-7 sm:px-3">
            <div className="sticky top-8">
              <BookingSummary
                showBookButton={true}
                showRedeemeCodeSection={false}
                paidAmount={paidAmount}
                remaingAmount={remainingAmount}
                earnPoints={false}
                finalPayment={true}
                lang={lang}
                onCompletePayment={handleCompletePayment}
                isPaying={isPaying}
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default CompletePayment
