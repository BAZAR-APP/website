'use client'
import React, { useEffect, useState } from 'react'
import ModalDialog from './ModalDialog/Dialog'
import Button from './Button/Button'
import CommonInput from './CommonInput/Input'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useBuyLoyltyPointsStore } from '../../stores/useBuyLoyltyPoints'
import { useQueryBase } from '@/lib/axios'
import { LoyaltyPointsPackages } from '@/lib/types/loylty-points'
import calculateCustomLoyltyPointsPrice from '@/lib/utils'

type BuyPointsDialogProps = {
  isOpen: boolean
  setIsOpen: () => void
  currentUserTier: string
}

const BuyPointsDialog: React.FC<BuyPointsDialogProps> = ({
  isOpen,
  setIsOpen,
  currentUserTier,
}) => {
  const { setSelectedPackageLoyaltyPoints, selectedPackageLoyaltyPoints } =
    useBuyLoyltyPointsStore()
  const [custom, setCustom] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()
  const handleSelect = (index: number) => {
    setSelected(index)
    setCustom(false)
  }

  const handleCustomSelect = () => {
    setSelected(null)
    setCustom(true)
    setSelectedPackageLoyaltyPoints(null)
  }
  const tierLimits = {
    platinum: 800000,
    gold: 2700000,
    diamond: 3600000,
  }
  type TierKey = keyof typeof tierLimits
  const tierKey = currentUserTier?.toLowerCase() as TierKey
  const maxPointsAllowed = tierLimits[tierKey] ?? 100000
  const minPointsAllowed = 1

  const { data } = useQueryBase({
    queryKey: ['loyaltyPointsPackages'],
    url: `/loyaltyPointsPackages`,
  })
  const LoyaltyPointsPackagesList = data?.data?.data as LoyaltyPointsPackages[]

  return (
    <ModalDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="w-full md:!max-w-[600px] max-h-[calc(100vh-100px)] overflow-y-auto"
      title="Get more points to unlock discounts and upgrade your stay."
    >
      <p className="sm:text-[20px] text-[15px] leading-6 text-[#484A4C] md:pr-4">
        Let me know if you want variations based on tone—casual, premium, or playful! 4o
      </p>

      <div className="flex flex-col items-start space-y-3 my-4">
        {LoyaltyPointsPackagesList?.map((option: LoyaltyPointsPackages, index) => (
          <button
            key={option?.id}
            className={`sm:!px-4 !px-3 !py-2 border !rounded-[12px] cursor-pointer transition ${
              selected === index
                ? 'bg-[#29397E] text-white'
                : 'border-[#D0D5DD] transition text-[#344054]'
            }`}
            onClick={() => {
              setSelectedPackageLoyaltyPoints({
                points: option?.points,
                price: Number(option?.price),
                id: option?.id,
              })
              handleSelect(index)
            }}
          >
            <span className="text-[14px] leading-[17px] font-medium">
              {option.points} Points – {option.price} KD
            </span>
            {option.discount && (
              <span className="text-[14px] leading-[17px] font-medium">({option.discount})</span>
            )}
          </button>
        ))}

        <Button
          intent="transperent"
          className={`!px-4 !py-2 border !rounded-[12px] ${
            custom ? 'bg-[#29397E] text-white' : 'border-[#D0D5DD] text-[#344054] transition'
          }`}
          onClick={handleCustomSelect}
        >
          Custom
        </Button>

        {custom && (
          <div className="relative w-full my-2.5">
            <CommonInput
              type="text"
              placeholder={`Enter between ${minPointsAllowed.toLocaleString()} - ${maxPointsAllowed.toLocaleString()} points`}
              min={minPointsAllowed}
              maxLength={maxPointsAllowed.toString().length}
              className="!w-full relative bg-[#F3F4F6] border border-[#D0D5DD] !rounded-md !text-sm !h-[42px]"
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, '') 
                const value = Math.min(+raw, maxPointsAllowed)
                const finalValue = value < minPointsAllowed ? minPointsAllowed : value
                setSelectedPackageLoyaltyPoints({
                  price: calculateCustomLoyltyPointsPrice(
                    finalValue,
                    currentUserTier?.toLowerCase(),
                  ),
                  points: finalValue,
                  isCustom: true,
                })
              }}
            />
            <span className="absolute top-3 right-3 text-[14px] leading-[17px] font-medium text-[#29397E]">
              {calculateCustomLoyltyPointsPrice(
                selectedPackageLoyaltyPoints?.points || 0,
                currentUserTier?.toLocaleLowerCase(),
              )}{' '}
              KD
            </span>
          </div>
        )}
      </div>

      <div className="bg-[#F9FAFB] p-4 rounded-[16px] gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Image src={'/images/Tiers.svg'} width={64} height={64} alt="Image" />
          <h3 className="sm:text-[20px] text-[16px] leading-[32px] font-semibold text-[#19191A]">
            Why Buy Points?
          </h3>
        </div>
        <ul className="list-disc ml-5  text-[14px] leading-[17px] font-normal text-[#484A4C] space-y-1">
          <li>Points can be redeemed for discounts on bookings and add-ons.</li>
          <li>Purchased points do not expire.</li>
          <li>The more you buy, the more you save!</li>
        </ul>
      </div>

      <Button
        className="w-full"
        onClick={() => router.push('/loyalty-points/payments')}
        disabled={!selectedPackageLoyaltyPoints?.points}
      >
        Buy Now
      </Button>
    </ModalDialog>
  )
}

export default BuyPointsDialog
