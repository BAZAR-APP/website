import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import clsx from 'clsx'

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
  const [paymentOption, setPaymentOption] = useState<'full' | 'split'>('full')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.({ paymentOption, cardNumber, expiry, cvv })
  }

  return (
    <form onSubmit={handleSubmit}>
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
                  name="payment"
                  value={option.value}
                  checked={paymentOption === option.value}
                  onChange={() => setPaymentOption(option.value)}
                  className="mt-1 h-4 w-4 text-blue-600"
                />
              </label>
            ))}

            <p className="text-sm text-[#29397E] flex items-center gap-1">
              <span className="bg-[#29397E] rounded-full max-w-12">
                <Check className="text-white w-5 h-5 p-0.5" />
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
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
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
            {[
              { label: 'Expiry', value: expiry, setValue: setExpiry, placeholder: 'MM / YY' },
              { label: 'CVV', value: cvv, setValue: setCvv, placeholder: 'CVV' },
            ].map(({ label, value, setValue, placeholder }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
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
  )
}

export default PaymentForm
