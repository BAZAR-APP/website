'use client'

import { Button, CommonInput } from '@/components'
import ModalDialog from '@/components/ModalDialog/Dialog'
import useToggle from '@/lib/hooks/useToggle'
import { copyToClipboard } from '@/lib/utils'
import { Text } from '@radix-ui/themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const discounts = [
  { label: '10% Discount', points: 600, icon: '/images/discount-shape.svg' },
  { label: '20% Discount', points: 800, icon: '/images/discount-shape.svg' },
  { label: '30% Discount', points: 1000, icon: '/images/discount-shape.svg' },
  { label: '50% Discount', points: 1500, icon: '/images/discount-shape.svg' },
  { label: 'Free Night', points: 1000, icon: '/images/free-icon.svg' },
]

const RedeemRewards = () => {
  const { isOpen, toggle } = useToggle(false)
  const [step, setStep] = useState<'select' | 'confirm' | 'copy'>('select')
  const [selectedDiscount, setSelectedDiscount] = useState<(typeof discounts)[0] | null>(null)

  const handleDiscountClick = (discount: (typeof discounts)[0]) => {
    setSelectedDiscount(discount)
    setStep('confirm')
  }

  const handleRedeemNow = () => {
    setStep('copy')
  }

  const handleClose = () => {
    setStep('select')
    setSelectedDiscount(null)
    toggle()
    copyToClipboard('etxt')
  }

  return (
    <div>
      <Button asChild onClick={toggle} intent="transperent" className="!px-0">
        <span className="text-sm text-[#29397E] font-medium cursor-pointer underline">
          Redeem Gifts & Discounts ›
        </span>
      </Button>

      <ModalDialog
        isOpen={isOpen}
        setIsOpen={handleClose}
        title={step === 'select' ? 'Discounts You Can Redeem' : ''}
      >
        {step === 'select' && (
          <>
            <Text className="text-[#5F6368] md:text-lg text-sm">
              Turn your points into savings for <br /> this stay.
            </Text>

            <div className="grid grid-cols-2 gap-4 md:mt-8 mt-4 pb-4">
              {discounts.map((discount, index) => (
                <div key={index} className="bg-[#F9FAFB] p-4 rounded-xl flex flex-col items-center">
                  <div className="mb-3">
                    <Image src={discount.icon} alt={discount.label} width={160} height={160} className='w-[110px] h-[110px]' />
                  </div>
                  <p className="self-start text-[20px] leading-6 text-[#19191A]">
                    {discount.label}
                  </p>
                  <p className="self-start text-sm leading-[17px] text-[#29397E] opacity-70 mt-2">
                    {discount.points} points
                  </p>
                  <button
                    className="mt-2 cursor-pointer self-start text-sm text-[#29397E] font-medium underline"
                    onClick={() => handleDiscountClick(discount)}
                  >
                    Redeem Now &rsaquo;
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 'confirm' && selectedDiscount && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#F9FAFB] rounded-[20.125px]">
              <Image src={selectedDiscount.icon} width={160} height={160} alt="Discount icon" />
            </div>
            <h3 className="font-semibold md:text-2xl text-xl leading-7 text-center text-[#19191A] md:pt-6 pt-4">
              {selectedDiscount.label}
            </h3>
            <Text className="md:text-xl text-sm leading-6 text-center text-[#484A4C] md:pt-4 pt-2">
              Turn your points into savings for this stay.
            </Text>
            <Button
              size="responsive"
              intent="primary"
              onClick={handleRedeemNow}
              className="md:mt-6 mt-4 w-full"
            >
              Redeem Now
            </Button>
          </div>
        )}

        {step === 'copy' && selectedDiscount && (
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#F9FAFB] rounded-[20.125px]">
              <Image src={selectedDiscount.icon} width={160} height={160} alt="Discount icon" />
            </div>
            <h3 className="font-semibold md:text-2xl text-xl leading-7 text-center text-[#19191A] md:pt-6 pt-4">
              {selectedDiscount.label}
            </h3>
            <Text className="md:text-xl text-sm leading-6 text-center text-[#484A4C] md:pt-4 pt-2">
              Turn your points into savings for this stay.
            </Text>
            <div className="flex flex-col md:flex-row items-center gap-3 !w-full md:mt-6 mt-4 mb-4">
              <CommonInput
                placeholder="SEAVILLA20DIS"
                type="text"
                className="w-full md:w-[300px] !px-4 bg-[#F3F4F6] !rounded-md !text-sm !h-[42px] !border-none shadow-none !focus:ring-0 !focus:outline-none"
              />
              <Button
                size="responsive"
                intent="primary"
                onClick={handleClose}
                className="w-full md:w-[120px] flex items-center justify-center gap-2"
              >
                Copy
                <Image src="/images/copy.svg" width={16} height={16} alt="copy" />
              </Button>
            </div>
          </div>
        )}
      </ModalDialog>
    </div>
  )
}

export default RedeemRewards
