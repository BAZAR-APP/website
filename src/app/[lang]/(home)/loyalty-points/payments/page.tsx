'use client'
import { Button } from '@/components'
import PaymentForm from '@/components/PaymentForm'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const Payment = () => {
  const methods = useForm()
  const router = useRouter()

  const summaryItems = [
    { label: '1000 Points', value: '17 kd' },
    { label: 'Taxes and Fees', value: '0 kd' },
  ]

  const totalAmount = '17 kd'

  return (
    <FormProvider {...methods}>
      <div className="max-w-[1800px] mx-auto lg:px-20 md:px-14 sm:px-10 px-8 py-9">
        <h2 className="xl:text-[39px] md:text-2xl text-xl font-semibold text-[#19191A] mb-2">
          Confirm Your Purchase
        </h2>
        <p className="text-[#484A4C] md:text-lg text-sm mb-8">
          You're just a step away from boosting your points balance and unlocking more rewards.
        </p>

        <div className="flex flex-col lg:flex-row gap-4 border-b border-[#E5E7EB] pb-12">
          <div className="flex-1">
            <PaymentForm paymentDetail={false} addNowBooking={false} />
          </div>

          <div className="w-full xl:w-1/3 pb-7 sm:px-3">
            <div className="flex flex-col items-start gap-5 lg:w-[370px] w-full h-fit bg-[#F9FAFB] p-6 rounded">
              <h3 className="text-[25px] leading-8 font-semibold text-[#19191A]">
                Payment Summary
              </h3>

              <div className="flex gap-2 items-center">
                <Image src="/images/purchase.svg" width={56} height={53} alt="Purchase icon" />
                <p className="text-[16px] leading-[24px] font-medium text-[#29397E]">
                  Purchase 1,000 Points
                </p>
              </div>

              {summaryItems.map((item, index) => (
                <div
                  key={index}
                  className="text-[16px] leading-[19px] text-[#19191A] flex items-center w-full justify-between"
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}

              <div className="border-t w-full pt-4 mt-2 flex justify-between sm:text-[16px] text-sm leading-[24px] font-medium text-[#19191A]">
                <span>Total</span>
                <span>{totalAmount}</span>
              </div>

              <Button
                className="w-full cursor-pointer"
                onClick={() => router.push('/loyalty-points/payment-confirmed/')}
              >
                Pay {totalAmount} Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default Payment
