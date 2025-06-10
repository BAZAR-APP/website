'use client'
import { Button, CompareTiers, LoyaltyTiersCardSection } from '@/components'
import { ArrowUpRight } from 'lucide-react'
import useToggle from '@/lib/hooks/useToggle'
import ModalDialog from '../ModalDialog/Dialog'

export const LoyaltyTiers: React.FC = () => {
  const { isOpen, toggle } = useToggle(false)

  return (
    <>
      <div className="flex flex-col w-full items-center gap-16 px-4 md:px-16 py-16 sm:py-24 bg-white">
        <div className="flex flex-col items-start gap-8 w-full max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-0">
            <div className="flex flex-col gap-2 sm:gap-4 max-w-full md:max-w-lg">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[39px] font-medium text-[#19191A] leading-tight">
                Loyalty Tiers
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-[20px] text-[#484A4C]">
                Earn More, Save More, Enjoy Exclusive Benefits!
              </p>
            </div>

            <div className="flex items-center">
              <Button
                className="!bg-gray-100 !text-primary whitespace-nowrap px-3 py-2 text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2"
                onClick={toggle}
              >
                Compare Between Tiers <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>

          <LoyaltyTiersCardSection />
        </div>
      </div>
      <ModalDialog
        title={'Compare Between Tiers'}
        isOpen={isOpen}
        setIsOpen={toggle}
        className="!max-w-[1050px] w-full max-h-[calc(100vh-80px)] overflow-y-auto m-4 py-2 lg:max-h-none lg:overflow-y-visible"
      >
        <CompareTiers />
      </ModalDialog>
    </>
  )
}

export default LoyaltyTiers
