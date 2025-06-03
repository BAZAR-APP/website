'use client'

import React from 'react'
import Image from 'next/image'
import { Check, Plug, Plus } from 'lucide-react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import Button from './Button/Button'

export type PaymentFormData = {
  paymentOption: 'full' | 'split'
  cardNumber: string
  expiry: string
  cvv: string
}

type PaymentFormProps = {
  onSubmit?: (data: PaymentFormData) => void
}

const paymentOptions = [
  {
    value: 'full',
    title: 'Pay Full Amount Now',
    description: '440 KWD — One-time payment to complete your booking.',
  },
  {
    value: 'split',
    title: 'Pay in Two Parts',
    description: (
      <>
        Pay 220 KWD now (50%)
        <br />
        Pay remaining 220 KWD at least 72 hours before check-in.
      </>
    ),
  },
] as const

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext<PaymentFormData>()

  const paymentOption = watch('paymentOption')

  const onFormSubmit = (data: PaymentFormData) => {
    onSubmit?.(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="md:w-[528px] w-full space-y-8">
          <div className="flex flex-col items-start p-4 gap-4 bg-[#FDFDFE] shadow-[0px_4px_16px_rgba(17,34,17,0.05)] rounded-[12px]">
            <div className="space-y-4 w-full">
              {paymentOptions.map((option) => (
                <label
                  key={option.value}
                  className={clsx(
                    'flex items-center justify-between p-4 gap-3 rounded-lg cursor-pointer transition-all',
                    paymentOption === option.value ? 'bg-[#F3F4F6]' : 'bg-transparent',
                  )}
                >
                  <div className="ml-2">
                    <div className="font-medium text-[16px] leading-[150%] text-[#19191A] pb-2">
                      {option.title}
                    </div>
                    <div className="text-sm text-[#484A4C]">{option.description}</div>
                  </div>
                  <input
                    type="radio"
                    value={option.value}
                    {...register('paymentOption')}
                    className="mt-1 h-4 w-4 text-blue-600"
                  />
                </label>
              ))}
              <p className="text-sm text-[#29397E] flex items-center gap-1">
                <span className="bg-[#29397E] rounded-full max-w-10">
                  <Check className="text-white w-4 h-4 p-0.5" />
                </span>
                You can split your payment if your total is 400 KWD or higher.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-[0px_4px_16px_rgba(17,34,17,0.05)]">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card number</label>
              <div className="relative">
                <input
                  type="text"
                  {...register('cardNumber')}
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-2 flex space-x-2">
                  {['VISA', 'Mastercard', 'ApplePay', 'Gpay'].map((brand) => (
                    <img
                      key={brand}
                      src={`/images/${brand}.svg`}
                      alt={brand}
                      className="h-5 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input
                  type="text"
                  {...register('expiry')}
                  placeholder="MM / YY"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  {...register('cvv')}
                  placeholder="CVV"
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4 flex items-center">
            <span className="mr-2">
              <Image src={'/images/protection.svg'} alt="Secure" width={24} height={24} />
            </span>
            All payments processed securely via KNET 💳.
          </p>
        </div>
      </form>

      <div
        className="flex flex-col my-5 py-6 items-start md:px-6 px-4 w-full md:w-[528px] md:h-[194px] h-auto isolate rounded-xl bg-[url('/images/FlowerImg.jpg')] bg-cover bg-center"
        style={{
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <h2 className="text-white md:text-xl sm:text-lg text-[16px] font-semibold">
          Make your weekend unforgettable Just 25 KWD
        </h2>
        <p className="text-white text-sm md:mt-4 mt-2">
          Add the Romantic Weekend upgrade for only 25 KWD and enjoy late check-out, welcome gift,
          and a private Romantic Setup.
        </p>
        <Button
          intent="transperent"
          size="md"
          className="flex sm:gap-3 gap-1 md:text-[16px] text-sm cursor-pointer text-white border border-white md:mt-5 mt-3"
        >
          Add Now To Your Booking <Plus />
        </Button>
      </div>
    </>
  )
}

export default PaymentForm
