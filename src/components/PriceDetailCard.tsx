import React from 'react'
import { ChaletSubscription } from '../../types/chalets'

interface PriceDetailCardProps {
  isSelected: boolean
  onClick: () => void
  isPopular?: boolean
  subscription: ChaletSubscription
}

const PriceDetailCard: React.FC<PriceDetailCardProps> = ({ isSelected, onClick, subscription }) => {
  const containerClasses = `
  relative cursor-pointer transition-all duration-200 
  md:w-[225px] w-full md:min-h-[155px] min-h-[170px] h-full px-1 rounded-[30px] xxl-w
  flex flex-col items-center justify-center border border-[#E5E7EB]
  ${isSelected ? 'bg-white shadow-lg' : 'bg-white hover:border-gray-300 hover:shadow-md'}
`
  const types = {
    full_week: 'Full Week',
    weekend: 'Weekend',
    weekday: 'Weekday',
    full_month: 'Full Month',
  } as const

  type TypeKey = keyof typeof types
  return (
    <div onClick={onClick} className={containerClasses}>
      <div className="absolute -top-10.5 mt-[0.5px] left-1/2 -translate-x-1/2 transform">
        <span
          className={`flex items-center justify-center gap-2 min-w-[121px] max-w-[175px] h-[41px] px-4 py-3
              text-sm font-medium rounded-t-xl rounded-b-none 
              ${isSelected ? 'bg-[#29397E] text-white' : 'bg-[#E1F3FF] text-[#19191A]'}`}
        >
          <span className='truncate'>{subscription?.title}</span>
        </span>
      </div>

      <div className="text-center flex flex-col gap-1.5">
        <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A]">
          {subscription?.durationValue + ' ' + subscription?.durationUnit}
        </h3>
        <p className="text-xs leading-[15px] font-normal text-[#484A4C] text-center">
          {types[subscription?.type as TypeKey]}
        </p>{' '}
        <div className="md:text-[20px] text-lg leading-[24px] font-bold text-[#19191A] text-center">
          {subscription.price + ' ' + subscription?.priceUnit}
        </div>
        {/* <div className="flex items-center justify-center 2xl:gap-3 gap-1 pt-1.5"> */}
        {/* <p className="text-[12px] leading-[15px] font-normal text-[#484A4C]">{description}</p> */}
        {/* {badge && (
            <div className="flex justify-center">
              <BadgePill {...badge} />
            </div>
          )} */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default PriceDetailCard
