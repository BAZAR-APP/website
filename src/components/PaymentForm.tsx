'use client'

import React from 'react'
import Image from 'next/image'
import { Check, CheckCircle, Plus } from 'lucide-react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import Button from './Button/Button'
import { Radio } from '@radix-ui/themes'

export type PaymentFormData = {
  paymentOption: 'full' | 'split'
  cardNumber: string
  expiry: string
  cvv: string
  romanticWeekend: boolean
}

type PaymentFormProps = {
  onSubmit?: (data: PaymentFormData) => void
  paymentDetail?: boolean
  addNowBooking?: boolean
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

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  paymentDetail = true,
  addNowBooking = true,
}) => {
  const { register, handleSubmit, watch, setValue } = useFormContext()
  const romanticWeekend = watch('romanticWeekend')
  const paymentOption = watch('paymentOption')
  const onFormSubmit = (data: any) => {
    onSubmit?.(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className="lg:w-[480px] xl:w-[528px] w-full">
        <div className="space-y-7">
          {paymentDetail && (
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
                    <Radio
                      name="paymentOption"
                      value={option.value}
                      className="!cursor-pointer"
                      checked={paymentOption === option.value}
                      onChange={() => setValue('paymentOption', option.value)}
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
          )}
          <div className="bg-white p-6 rounded-xl shadow-[0px_4px_16px_rgba(17,34,17,0.05)]">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#19191A] mb-1">Card number</label>
              <div className="relative">
                <div className="flex items-center justify-start space-x-2 mb-2 lg:hidden">
                  {['VISA', 'Mastercard', 'ApplePay', 'Gpay'].map((brand) => (
                    <Image
                      key={brand}
                      src={`/images/${brand}.svg`}
                      alt={brand}
                      width={32}
                      height={20}
                      className="h-5 w-auto"
                    />
                  ))}
                </div>

                <input
                  type="text"
                  {...register('cardNumber')}
                  placeholder="1234 1234 1234 1234"
                  className="w-full px-4 py-2 bg-[#F9FAFB] border rounded-md border-[#D1D5DB] placeholder:text-[#6B7280]"
                />

                <div className="absolute right-3 top-3 hidden lg:flex space-x-2">
                  {['VISA', 'Mastercard', 'ApplePay', 'Gpay'].map((brand) => (
                    <Image
                      key={brand}
                      src={`/images/${brand}.svg`}
                      alt={brand}
                      width={32}
                      height={20}
                      className="h-5 w-auto"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#19191A] mb-1">Expiry</label>
                <input
                  type="text"
                  {...register('expiry')}
                  placeholder="MM / YY"
                  className="w-full px-4 py-2 bg-[#F9FAFB] border rounded-md border-[#D1D5DB] placeholder:text-[#6B7280]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#19191A] mb-1">CVV</label>
                <input
                  type="text"
                  {...register('cvv')}
                  placeholder="CVV"
                  className="w-full px-4 py-2 bg-[#F9FAFB] border rounded-md border-[#D1D5DB] placeholder:text-[#6B7280]"
                />
              </div>
            </div>
          </div>
          {addNowBooking && (
            <p className="text-sm text-[#000000] !pb-3.5 flex items-center">
              <span className="mr-2">
                <Image src={'/images/protection.svg'} alt="Secure" width={24} height={24} />
              </span>
              All payments processed securely via KNET
              <Image
                src={'/images/Knet.svg'}
                alt="Secure"
                className="mx-1"
                width={24}
                height={24}
              />
              .
            </p>
          )}
        </div>
      </form>
      {addNowBooking && (
        <div
          className="flex flex-col my-5 py-6 items-start md:px-6 px-4 w-full lg:w-[528px] lg:h-[194px] h-auto isolate rounded-xl bg-[url('/images/FlowerImg.jpg')] bg-cover bg-center"
          style={{
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <h2 className="text-[#FDFDFE] md:text-xl sm:text-lg text-[16px] font-bold">
            Make your weekend unforgettable Just 25 KWD
          </h2>
          <p className="text-[#FDFDFE] text-sm md:mt-4 mt-2">
            Add the Romantic Weekend upgrade for only 25 KWD and enjoy late check-out, welcome gift,
            and a private Romantic Setup.
          </p>
          <Button
            intent="transperent"
            size={romanticWeekend ? 'sm' : 'md'}
            className={clsx(
              'flex sm:gap-3 gap-1 md:text-[16px] text-sm cursor-pointer border md:mt-5 mt-3 text-[#FDFDFE] border-[#FDFDFE] sm:max-w-[270px] max-w-[auto]',
            )}
            onClick={() => setValue('romanticWeekend', !romanticWeekend)}
            type="button"
          >
            {romanticWeekend ? (
              <>
                Added <CheckCircle className="w-4 h-4" />
              </>
            ) : (
              <>
                Add Now To Your Booking <Plus className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  )
}

export default PaymentForm
