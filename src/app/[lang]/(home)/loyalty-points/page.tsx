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
import BuyPointsDialog from '@/components/BuyPointsDailog'
import { useQueryBase } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import AvailableDiscounts from '@/components/user/Dicounts/AvailableDiscounts'
import { useBuyLoyltyPointsStore } from '../../../../../stores/useBuyLoyltyPoints'

const LoyaltyPoints = () => {
  const { isOpen, toggle } = useToggle(false)
  const params = useParams() as { lang: Locale }
  const { lang } = params
  const { setSelectedPackageLoyaltyPoints } = useBuyLoyltyPointsStore()
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const { data: user } = useSession()
  const { data } = useQueryBase({
    queryKey: ['earnedPoints'],
    url: `/loyaltyPoints?language=${lang}`,
    cacheTime: 0,
    staleTime: 0,
  })

  const { page } = getDictionary(lang)

  const tiercustom =
    data?.data?.totalPoints >= 0 && data?.data?.totalPoints <= 500
      ? 'Platinum'
      : data?.data?.totalPoints > 500 && data?.data?.totalPoints <= 900
        ? 'Gold'
        : data?.data?.totalPoints > 900
          ? 'Diamond'
          : ''
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
            {user?.user?.fullName}
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
            <EarnedPointsCard
              currentPoints={data?.data?.totalPoints || 0}
              maxPoints={30000}
              page={page}
              tier={tiercustom}
              lang={lang}
            />
            <Image
              src={'/images/bazar-card.png'}
              width={630}
              height={250}
              className="2xl:w-[850px] xl:w-[630px] w-full"
              alt="Bazar Img"
            />
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
                      setSelectedPackageLoyaltyPoints(null)

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

            <AvailableDiscounts />
          </div>
        </div>
      </div>
      <ModalDialog
        title={'About Tiers'}
        isOpen={isOpen}
        setIsOpen={toggle}
        className="xl:!max-w-[1050px] w-full max-h-[calc(100vh-101px)] overflow-y-auto m-4"
      >
        <CompareTiers />
      </ModalDialog>

      {isDialogOpen && (
        <BuyPointsDialog
          isOpen={isDialogOpen}
          currentUserTier={tiercustom}
          setIsOpen={() => {
            setSelectedPackageLoyaltyPoints(null)
            setDialogOpen(false)
          }}
        />
      )}
    </>
  )
}

export default LoyaltyPoints
