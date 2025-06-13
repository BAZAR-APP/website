'use client'
import React from 'react'
import { Locale } from '../../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { EarnedPointsCard } from '@/components/EarnedPointsCard'
import { Button, CompareTiers } from '@/components'
import Image from 'next/image'
import ModalDialog from '@/components/ModalDialog/Dialog'
import useToggle from '@/lib/hooks/useToggle'
import { useParams } from 'next/navigation'
import RedeemDiscountDailog from '@/components/RedeemDiscountDailog'
import BuyPointsDialog from '@/components/BuyPointsDailog'

const LoyaltyPoints = () => {
  const { isOpen, toggle } = useToggle(false)
  const params = useParams() as { lang: Locale }
  const { lang } = params
  const [isRedeemOpen, setIsRedeemOpen] = React.useState(false)
  const [selectedDiscount, setSelectedDiscount] = React.useState<any>(null)
  const [redeemStep, setRedeemStep] = React.useState<'select' | 'confirm' | 'copy'>('select')
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const { page } = getDictionary(lang)

  return (
    <>
      <div className="py-10">
        <div
          className="flex flex-col items-start gap-9 px-6 py-8 isolate w-[83%] h-[167px] rounded-[16px] mx-auto text-left"
          style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/loyaltyHero.jpg'), #FDFDFE`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <p className="text-[#FDFDFE] sm:text-[20px] text-[15px] leading-[24px]">
            {page.loyaltyPoints.welcomeMessage}
          </p>
          <h1 className="text-[#FDFDFE] font-semibold sm:text-[39px] text-2xl leading-[47px]">
            {page.loyaltyPoints.name}
          </h1>
        </div>
        <div className="w-full max-w-[83%] mx-auto">
          <h3 className="text-[#19191A] font-semibold lg:text-[39px] text-2xl leading-[47px] pt-5">
            {page.loyaltyPoints.title}
          </h3>
          <p className="text-[#484A4C] sm:text-[20px] text-[15px] leading-[24px] pt-3.5">
            {page.loyaltyPoints.description}
          </p>
          <div className="flex items-center justify-start flex-wrap my-8 gap-5">
            <EarnedPointsCard currentPoints={300} maxPoints={500} page={page} />
            <Image src={'/images/bazar-card.png'} width={630} height={250} alt="Bazar Img" />
          </div>
          <div className="flex items-center gap-10 flex-wrap py-4">
            {page.loyaltyPoints.actions.map((action: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-start p-4 gap-4 w-full lg:w-[370px] xl:w-[490px] bg-[#29397E] rounded-2xl"
              >
                <div className="flex sm:flex-row flex-col sm:items-center items-start gap-2 mb-4">
                  <Image
                    src={idx === 0 ? '/images/aboutTier.svg' : '/images/buyPoints.svg'}
                    width={105}
                    height={105}
                    alt="Tier image"
                  />
                  <div>
                    <h3 className="xl:text-[20px] text-[18px] leading-[32px] font-semibold text-[#FDFDFE]">
                      {action.title}
                    </h3>
                    <p className="text-[14px] leading-[17px] font-normal text-[#FDFDFE] pt-2.5">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    if (action.cta === 'Learn More') {
                      toggle()
                    } else if (action.cta === 'Buy Points') {
                      setDialogOpen(true)
                    }
                  }}
                  intent="ghost"
                  className="w-full"
                >
                  {action.cta}
                </Button>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold text-[25px] leading-[32px] text-[#19191A] py-3">
              {page.loyaltyPoints.discountsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4 md:mt-8 mt-4 pb-4">
              {page.loyaltyPoints.redeemableDiscounts.map((discount: any, index: number) => (
                <div
                  key={index}
                  className="bg-[#F9FAFB] p-4 rounded-xl flex flex-col items-center lg:w-[200px]"
                >
                  <div className="mb-3">
                    <Image
                      src={discount.icon}
                      alt={discount.title}
                      width={160}
                      height={160}
                      className="w-[122px] h-[122px]"
                    />
                  </div>
                  <p className="self-start text-[20px] leading-6 text-[#19191A]">
                    {discount.title}
                  </p>
                  <p className="self-start text-sm leading-[17px] text-[#29397E] opacity-70 mt-2">
                    {discount.pointsRequired} points
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedDiscount({
                        label: discount.title,
                        points: discount.pointsRequired,
                        icon: discount.icon,
                      })
                      setRedeemStep('confirm')
                      setIsRedeemOpen(true)
                    }}
                    intent="transperent"
                    className="mt-2 cursor-pointer self-start text-sm !px-0 !py-0 text-[#29397E] font-medium underline"
                  >
                    {discount.cta} &rsaquo;
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalDialog
        title={'About Tiers'}
        isOpen={isOpen}
        setIsOpen={toggle}
        className="xl:!max-w-[1050px] w-full max-h-[calc(100vh-100px)] overflow-y-auto m-4"
      >
        <CompareTiers />
      </ModalDialog>
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
      <BuyPointsDialog isOpen={isDialogOpen} setIsOpen={() => setDialogOpen(false)} />
    </>
  )
}

export default LoyaltyPoints
