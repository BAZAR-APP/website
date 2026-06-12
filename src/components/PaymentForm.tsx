'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Check, CheckCircle, InfoIcon, Plus } from 'lucide-react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import Button from './Button/Button'
import { Radio } from '@radix-ui/themes'
import { useBookingStore } from '../../stores/useBookingStore'
import { Locale } from '../../i18n.config'
import { calculateSplitPayment } from '@/lib/utils'

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
  lang: Locale
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  onSubmit,
  addNowBooking = true,
  lang
}) => {
  const { register, handleSubmit, watch, setValue } = useFormContext()
  const { packageAmount, discountedTotal, bookingType, isDiscountApplied } = useBookingStore()
  const selectedAddonsTotal = watch('selectedAddonsTotal')
  const romanticWeekend = watch('romanticWeekend')
  const paymentOption = watch('paymentOption')

  // Calculate dynamic totals
  const grandTotal = (selectedAddonsTotal ?? 0) + Number(packageAmount) + (romanticWeekend ? 25 : 0)
  const finalFullAmount = isDiscountApplied ? discountedTotal : grandTotal
  // Calculate split payment correctly to ensure exact total
  const splitPayment = finalFullAmount > 0 ? (() => {
    const first = Math.floor(finalFullAmount / 2)
    return { first, second: finalFullAmount - first }
  })() : { first: 0, second: 0 }
  const splitAmount = splitPayment.first
  const minAmountForSplit = 400

  const paymentOptions = [
  {
    value: 'full' as const,
    title: lang === 'en' ? 'Pay Full Amount Now' : 'ادفع المبلغ كاملاً الآن',
    description:
      lang === 'en'
        ? `${finalFullAmount} KWD — One-time payment to complete your booking.`
        : `${finalFullAmount} د.ك — دفع مرة واحدة لإكمال الحجز.`,
  },
  {
    value: 'split' as const,
    title: lang === 'en' ? 'Pay in Two Parts' : 'ادفع على دفعتين',
    description: lang === 'en' ? (
      <>
        Pay {splitAmount} KWD now (50%)
        <br />
        Pay remaining {splitPayment.second} KWD at least 72 hours before check-in.
      </>
    ) : (
      <>
        ادفع {splitAmount} د.ك الآن (50%)
        <br />
        ادفع الباقي {splitPayment.second} د.ك قبل 72 ساعة على الأقل من تسجيل الوصول.
      </>
    ),
  },
]


  useEffect(() => {
    if (finalFullAmount < minAmountForSplit && paymentOption !== 'full') {
      setValue('paymentOption', 'full')
    } else if (!paymentOption) {
      setValue('paymentOption', 'full')
    }
  }, [finalFullAmount, paymentOption, setValue, minAmountForSplit])

  const onFormSubmit = (data: any) => {
    onSubmit?.(data)
  }

  const handlePaymentOptionChange = (optionValue: 'full' | 'split') => {
    const isSplitOption = optionValue === 'split'
    const isDisabled = isSplitOption && finalFullAmount < minAmountForSplit

    if (!isDisabled) {
      setValue('paymentOption', optionValue)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className="lg:w-[480px] xl:w-[528px] w-full">
        <div className="space-y-7">
          <div className="flex flex-col items-start p-4 gap-4 bg-[#FDFDFE] shadow-[0px_4px_16px_rgba(17,34,17,0.05)] rounded-[12px]">
            <div className="space-y-4 w-full">
              {paymentOptions.map((option) => {
                const isSplitOption = option.value === 'split'
                const isDisabled = isSplitOption && finalFullAmount < minAmountForSplit

                return (
                  <label
                    key={option.value}
                    className={clsx(
                      'flex items-center justify-between p-4 gap-3 rounded-lg transition-all',
                      paymentOption === option.value ? 'bg-[#F3F4F6]' : 'bg-transparent',
                      isDisabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:bg-[#F9FAFB]',
                    )}
                    onClick={(e) => {
                      if (isDisabled) {
                        e.preventDefault()
                        return
                      }
                      handlePaymentOptionChange(option.value)
                    }}
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
                      className={clsx(
                        isDisabled ? '!cursor-not-allowed opacity-50' : '!cursor-pointer',
                      )}
                      checked={paymentOption === option.value}
                      onChange={() => {}} // Handled by label click
                      disabled={isDisabled}
                      onPointerDown={(e) => {
                        if (isDisabled) {
                          e.preventDefault()
                          e.stopPropagation()
                        }
                      }}
                      onClick={(e) => {
                        if (isDisabled) {
                          e.preventDefault()
                          e.stopPropagation()
                        }
                      }}
                    />
                  </label>
                )
              })}

              <p className="text-sm text-[#29397E] flex items-center gap-1">
                <span className=" rounded-full max-w-10">
                  {finalFullAmount >= minAmountForSplit ? (
                    <Check className="text-white w-4 h-4 p-0.5 bg-[#29397E]" />
                  ) : (
                    <InfoIcon fill="#29397E" color="white" />
                  )}
                </span>
                {finalFullAmount >= minAmountForSplit
                  ? lang === 'en'
                    ? `You can split your payment if your total is ${minAmountForSplit} KWD or higher.`
                    : `يمكنك تقسيم الدفع إذا كان المجموع ${minAmountForSplit} د.ك أو أكثر.`
                  : lang === 'en'
                    ? `Split payment isn't available for bookings under ${minAmountForSplit} KWD. Please proceed with full payment.`
                    : `لا يتوفر الدفع المقسّم للحجوزات أقل من ${minAmountForSplit} د.ك. يرجى متابعة الدفع الكامل.`
                }
              </p>
            </div>
          </div>

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
              {
                lang === 'en' 
                ? 'All payments processed securely via KNET' 
                : 'جميع المدفوعات تتم بأمان عبر KNET'
              }
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

      {addNowBooking && bookingType !== 'hourly' && (
        <div
          className="flex flex-col my-5 py-6 items-start md:px-6 px-4 w-full lg:w-132 lg:min-h-48.5 h-auto isolate rounded-xl bg-[url('/images/FlowerImg.jpg')] bg-cover bg-center"
          style={{
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
        <h2 className="text-[#FDFDFE] md:text-xl sm:text-lg text-[16px] font-bold">
          {lang === 'en'
            ? 'Make your weekend unforgettable — Just 25 KWD'
            : 'اجعل عطلة نهاية الأسبوع الخاصة بك لا تُنسى — فقط 25 د.ك'}
        </h2>
        <p className="text-[#FDFDFE] text-sm md:mt-4 mt-2">
          {lang === 'en'
            ? 'Add the Romantic Weekend upgrade for only 25 KWD and enjoy late check-out, welcome gift, and a private Romantic Setup.'
            : 'أضف باقة عطلة نهاية الأسبوع الرومانسية مقابل 25 د.ك فقط واستمتع بتسجيل خروج متأخر، هدية ترحيبية، وترتيب رومانسي خاص.'}
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
              {lang === 'en' ? 'Added' : 'تمت الإضافة'} <CheckCircle className="w-4 h-4" />
            </>
          ) : (
            <>
              {lang === 'en' ? 'Add Now To Your Booking' : 'أضف الآن إلى الحجز'} <Plus className="w-4 h-4" />
            </>
          )}
          </Button>
        </div>
      )}
    </>
  )
}

export default PaymentForm
