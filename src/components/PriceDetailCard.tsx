import React from 'react'
import BadgePill, { Badge } from './BadgePill'

interface PriceDetailCardProps {
  title: string
  subtitle: string
  price: string
  description: string
  isSelected: boolean
  onClick: () => void
  isPopular?: boolean
  badge?: Badge
}

const PriceDetailCard: React.FC<PriceDetailCardProps> = ({
  title,
  subtitle,
  price,
  description,
  isSelected,
  onClick,
  isPopular = false,
  badge,
}) => {
  const containerClasses = `
  relative cursor-pointer transition-all duration-200 
  md:w-[220px] w-full md:h-[155px] h-[170px] rounded-[30px] 
  flex flex-col items-center justify-center border border-[#E5E7EB]
  ${isSelected ? 'bg-white shadow-lg' : 'bg-white hover:border-gray-300 hover:shadow-md'}
`

  return (
    <div onClick={onClick} className={containerClasses}>
      <div className="absolute -top-10.5 mt-[0.5px] left-1/2 -translate-x-1/2 transform">
        <span
          className={`flex items-center justify-center gap-2 w-[121px] h-[41px] px-4 py-3 
              text-sm font-medium rounded-t-xl rounded-b-none 
              ${isSelected ? 'bg-[#29397E] text-white' : 'bg-[#E1F3FF] text-[#19191A]'}`}
        >
          {isPopular ? 'Most Popular' : 'Less Popular'}
        </span>
      </div>

      <div className="text-center flex flex-col gap-1.5">
        <h3 className="text-[16px] leading-[24px] font-medium text-[#19191A]">{title}</h3>
        <p className="text-xs leading-[15px] font-normal text-[#484A4C] text-center">{subtitle}</p>
        <div className="md:text-[20px] text-lg leading-[24px] font-bold text-[#19191A] text-center">
          {price}
        </div>
        <div className="flex items-center justify-center gap-1 pt-1.5">
          <p className="text-[12px] leading-[15px] font-normal text-[#484A4C]">{description}</p>
          {badge && (
            <div className="flex justify-center">
              <BadgePill {...badge} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PriceDetailCard
