'use client'
import { useQueryBase } from '@/lib/axios'
import { useParams } from 'next/navigation'
import React, { FC, useState } from 'react'
import DiscountCard, { renderIcons } from './Card'
import RedeemDiscountDailog from '@/components/RedeemDiscountDailog'
import clsx from 'clsx'
import ModalDialog from '@/components/ModalDialog/Dialog'
import { Discount } from '../../../../types/user'
import { Skeleton } from '@/components/Skeletons/Skeleton'

const AvailableDiscounts: FC<{
  onClose?: (open: boolean) => void
  showUserDisocunts?: boolean
}> = ({ showUserDisocunts, onClose }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [isRedeemOpen, setIsRedeemOpen] = React.useState(false)
  const [selectedDiscount, setSelectedDiscount] = React.useState<any>(null)
  const [redeemStep, setRedeemStep] = React.useState<'select' | 'confirm' | 'copy'>('select')
  const params = useParams()
  const { data, isPending: isLoadingPoints } = useQueryBase({
    queryKey: ['loyaltyPoints'],
    url: `/loyaltyPoints/redeemable`,
    cacheTime: 0,
    staleTime: 0,
  })
  const userloyaltyPoints = data?.data as Discount[]

  const { data: loyaltyRewards, isPending: isLoadingRewards } = useQueryBase({
    queryKey: ['loyaltyRewards'],
    url: `/loyaltyRewards?language=${params?.lang}`,
    cacheTime: 0,
    staleTime: 0,
  })
  const availbleDiscounts = loyaltyRewards?.data?.data as Discount[]
  const isLoading = isLoadingPoints || isLoadingRewards

  const content = (
    <div
      className={clsx({
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 md:mt-8 mt-4 pb-4':
          !showUserDisocunts,
        'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:mt-8 mt-4 pb-4': showUserDisocunts,
      })}
    >
      {isLoading ? (
        <>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[200px] rounded-xl" />
          ))}
        </>
      ) : (
        availbleDiscounts?.map((discount, index) => {
        const iconKey: 'discount' | 'free' =
          discount?.rewardType?.toLowerCase() === 'discount'
            ? 'discount'
            : 'free'
        return (
          <DiscountCard
            key={discount?.name + index}
            title={discount?.name}
            points={discount?.pointsRequired}
            onRedeemClick={() => {
              setSelectedDiscount({
                label: discount?.name,
                points: discount.pointsRequired,
                icon: renderIcons[iconKey],
                couponCode: discount?.couponCode,
                discountPercent: discount?.discountPercent,
                id: discount?.id,
              })
              setRedeemStep('confirm')
              setIsRedeemOpen(true)
              setIsOpen(false)
            }}
            value={iconKey}
            disabled={!userloyaltyPoints?.some(
              (userDiscount: Discount) => userDiscount.id === discount.id,
            )}
          />
        )
        })
      )}
    </div>
  )

  return (
    <>
      {showUserDisocunts ? (
        <ModalDialog
          isOpen={isOpen}
          setIsOpen={() => {
            setIsOpen(false)
            onClose?.(false)
          }}
          title={'Discounts You Can Redeem'}
          className={'max-h-[90%] max-w-2xl'}
        >
          {content}
        </ModalDialog>
      ) : (
        content
      )}
      <RedeemDiscountDailog
        isOpen={isRedeemOpen}
        onClose={() => {
          setIsRedeemOpen(false)
          setRedeemStep('select')
          setSelectedDiscount(null)
          onClose?.(false)
        }}
        selectedDiscount={selectedDiscount}
        step={redeemStep}
        setStep={setRedeemStep}
      />
    </>
  )
}

export default AvailableDiscounts

// import { useQueryBase } from '@/lib/axios'
// import { getDictionary } from '@/lib/dictionary'
// import { useParams } from 'next/navigation'
// import React, { FC } from 'react'
// import { Locale } from '../../../../i18n.config'
// import DiscountCard from './Card'
// import RedeemDiscountDailog from '@/components/RedeemDiscountDailog'
// import clsx from 'clsx'
// export interface Discount {
//   id: string
//   name: string
//   pointsRequired: number
//   rewardType: 'DISCOUNT' | string // you can replace `string` with other possible types
//   discountPercent: number
//   iconUrl: string
// }

// const AvailableDiscounts: FC<{
//   showUserDisocunts?: boolean
// }> = ({ showUserDisocunts }) => {
//   const [isRedeemOpen, setIsRedeemOpen] = React.useState(false)
//   const [selectedDiscount, setSelectedDiscount] = React.useState<any>(null)
//   const [redeemStep, setRedeemStep] = React.useState<'select' | 'confirm' | 'copy'>('select')
//   const params = useParams()
//   const { data } = useQueryBase({
//     queryKey: ['loyaltyPoints'],
//     url: `/loyaltyPoints/redeemable`,
//     cacheTime: 0,
//     staleTime: 0,
//   })
//   const userloyaltyPoints = data?.data as Discount[]
//   const { data: loyaltyRewards } = useQueryBase({
//     queryKey: ['loyaltyRewards'],
//     url: `/loyaltyRewards?language=${params?.lang}`,
//     cacheTime: 0,
//     staleTime: 0,
//   })
//   const availbleDiscounts = loyaltyRewards?.data?.data as Discount[]
//   const { page } = getDictionary(params?.lang as unknown as Locale)

//   return (
//     <div
//       className={clsx({
//         'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 md:mt-8 mt-4 pb-4':
//           !showUserDisocunts,
//         'grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:mt-8 mt-4 pb-4': showUserDisocunts,
//       })}
//     >
//       {availbleDiscounts?.map((discount, index) => (
//         <DiscountCard
//           key={discount?.name + index}
//           title={discount?.name}
//           points={discount?.pointsRequired}
//           onRedeemClick={() => {
//             setSelectedDiscount({
//               label: discount?.name,
//               points: discount.pointsRequired,
//               icon: discount.iconUrl,
//             })
//             setRedeemStep('confirm')
//             setIsRedeemOpen(true)
//           }}
//           value={discount?.name?.includes('Discount') ? 'discount' : 'free'}
//           disabled={
//             showUserDisocunts
//               ? false
//               : !userloyaltyPoints?.some(
//                   (userDiscount: Discount) => userDiscount.id === discount.id,
//                 )
//           }
//         />
//       ))}
//       <RedeemDiscountDailog
//         isOpen={isRedeemOpen}
//         onClose={() => {
//           setIsRedeemOpen(false)
//           setRedeemStep('select')
//           setSelectedDiscount(null)
//         }}
//         selectedDiscount={selectedDiscount}
//         step={redeemStep}
//         setStep={setRedeemStep}
//       />
//     </div>
//   )
// }

// export default AvailableDiscounts
