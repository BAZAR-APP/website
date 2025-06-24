import { useQueryBase } from '@/lib/axios'
import { getDictionary } from '@/lib/dictionary'
import { useParams } from 'next/navigation'
import React from 'react'
import { Locale } from '../../../../i18n.config'
import DiscountCard from './Card'
import RedeemDiscountDailog from '@/components/RedeemDiscountDailog'
export interface Discount {
  id: string
  name: string
  pointsRequired: number
  rewardType: 'DISCOUNT' | string // you can replace `string` with other possible types
  discountPercent: number
  iconUrl: string
}

const AvailableDiscounts = () => {
  const [isRedeemOpen, setIsRedeemOpen] = React.useState(false)
  const [selectedDiscount, setSelectedDiscount] = React.useState<any>(null)
  const [redeemStep, setRedeemStep] = React.useState<'select' | 'confirm' | 'copy'>('select')
  const params = useParams()
  const { data } = useQueryBase({
    queryKey: ['loyaltyRewards'],
    url: `/loyaltyRewards?language=${params?.lang}`,
    cacheTime: 0,
    staleTime: 0,
  })
  const discounts = data?.data?.data as Discount[]
  const { page } = getDictionary(params?.lang as unknown as Locale)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 md:mt-8 mt-4 pb-4">
      {page.loyaltyPoints.redeemableDiscounts.map(
        (
          discount: {
            title: string
            pointsRequired: number
            icon: string
            cta: string
          },
          index: number,
        ) => (
          <DiscountCard
            key={discount?.title + index}
            title={discount?.title}
            points={discount?.pointsRequired}
            onRedeemClick={() => {
              setSelectedDiscount({
                label: discount.title,
                points: discount.pointsRequired,
                icon: discount.icon,
              })
              setRedeemStep('confirm')
              setIsRedeemOpen(true)
            }}
            value={discount?.title?.includes('Discount') ? 'discount' : 'free'}
            disabled={discounts?.some((singleDiscount:Discount) => singleDiscount?.name !== discount.title)}
          />
        ),
      )}
      <RedeemDiscountDailog
        isOpen={isRedeemOpen}
        onClose={() => {
          setIsRedeemOpen(false)
          setRedeemStep('select')
          setSelectedDiscount(null)
        }}
        selectedDiscount={selectedDiscount}
        step={redeemStep}
        setStep={setRedeemStep}
      />
    </div>
  )
}

export default AvailableDiscounts
