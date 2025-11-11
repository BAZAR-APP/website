'use client'
import BookingSummary from '@/components/BookingSummary'
import PaymentForm from '@/components/PaymentForm'
import { useParams } from 'next/navigation'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Locale } from '../../../../../../i18n.config'

const CompletePayment: React.FC = () => {
  const params = useParams() as { lang: Locale }
    const { lang } = params
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <div className="max-w-[1800px] mx-auto lg:px-21 md:px-13 sm:px-10 px-8 py-9">
        <h2 className="xl:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">
          Complete Your Payment
        </h2>
        <p className="text-[#484A4C] md:text-[20px] text-sm mb-8">
          Pay the remaining amount to fully confirm your chalet booking.{' '}
        </p>
        <div className="flex flex-col lg:flex-row gap-4 border-b border-[#E5E7EB] pb-3">
          <div className="flex-1">
            <PaymentForm paymentDetail={false} lang={lang} />
          </div>

          <div className="w-full xl:w-1/3 pb-7 sm:px-3">
            <div className="sticky top-8">
              <BookingSummary
                showBookButton={true}
                showRedeemeCodeSection={true}
                paidAmount={true}
                remaingAmount={true}
                earnPoints={false}
                finalPayment={true}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default CompletePayment
