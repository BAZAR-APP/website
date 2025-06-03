import React from 'react'
type PriceRowProps = {
  label: string
  amount: string
  color?: string // e.g., "#000", "#1a73e8"
  icon?: React.ReactNode
  bold?: boolean
  labelFont?: string
}

const PriceRowUI = ({
  label,
  amount,
  color = '#19191A',
  icon,
  labelFont = 'normal',
}: PriceRowProps) => (
  <div className="flex justify-between mb-3 last:mb-0">
    <span
      className={`flex items-center font-${labelFont} text-[16px] leading-[19px] text-${color}`}
      style={{ order: 0, flexShrink: 0 }}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
    <span className={`font-medium text-[16px] leading-[19px] text-${color}`}>{amount}</span>
  </div>
)

export default PriceRowUI
