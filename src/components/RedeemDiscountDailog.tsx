'use client'

import { Button, CommonInput } from '@/components'
import ModalDialog from '@/components/ModalDialog/Dialog'
import { copyToClipboard, extractErrorMessage } from '@/lib/utils'
import { Text } from '@radix-ui/themes'
import Image from 'next/image'
import React, { useState } from 'react'
import { useUserStore } from '../../stores/useUserStore'
import api from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { toast } from '@/lib/toast'

type Discount = {
  label: string
  points: number
  icon: string
  couponCode: string
  discountPercent: number
  id: string
}

type RedeemDiscountDailogProps = {
  isOpen: boolean
  onClose: () => void
  selectedDiscount: Discount | null
  step: 'select' | 'confirm' | 'copy'
  setStep: (step: 'select' | 'confirm' | 'copy') => void
}

const RedeemDiscountDailog = ({
  isOpen,
  onClose,
  selectedDiscount,
  step,
  setStep,
}: RedeemDiscountDailogProps) => {
  const { setSelectedDiscount } = useUserStore()
  const { data: user } = useSession()
  const [loading, setLoading] = useState(false)
  
  const handleRedeemNow = async () => {
    try {
      setLoading(true)
      await api.post('loyaltyRewardsRedemption', {
        userId: user?.user?.id,
        rewardId: selectedDiscount?.id,
      })
      setStep('copy')
      toast.success('Redeemed successfully')
    } catch (error) {
      toast.error(extractErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (selectedDiscount) {
      setSelectedDiscount({
        couponCode: selectedDiscount?.couponCode,
        discountPercent: selectedDiscount?.discountPercent,
      })
    }
    copyToClipboard(selectedDiscount?.couponCode)
    onClose()
  }

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={onClose}
      title={step === 'confirm' ? '' : 'Redeem Discount'}
      className="max-h-[90%] max-w-2xl"
    >
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
            loading={loading}
            disabled={loading}
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
              placeholder={selectedDiscount?.couponCode}
              type="text"
              readonly
              className="w-full md:w-[300px] !px-4 bg-[#F3F4F6] !rounded-md !text-sm !h-[42px] !border-none shadow-none !focus:ring-0 !focus:outline-none"
            />
            <Button
              size="responsive"
              intent="primary"
              onClick={handleCopy}
              className="w-full md:w-[120px] flex items-center justify-center gap-2"
            >
              Copy
              <Image src="/images/copy.svg" width={16} height={16} alt="copy" />
            </Button>
          </div>
        </div>
      )}
    </ModalDialog>
  )
}

export default RedeemDiscountDailog
