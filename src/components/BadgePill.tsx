import React from 'react'

export interface Badge {
  type: 'members' | 'promo' | 'exclusive'
  text: string
  icon?: React.ReactNode
}

const getBadgeClasses = (type: Badge['type']) => {
  switch (type) {
    case 'members':
      return 'bg-[#29397E] text-white'
    case 'exclusive':
      return 'bg-[#FCE7F3] text-[#EC4899]'
    default:
      return ''
  }
}

const BadgePill: React.FC<Badge> = ({ type, text, icon }) => {
  if (type === 'promo') return null 
  return (
    <span
      className={`flex items-center px-1.5 py-1 rounded-md text-xs whitespace-nowrap ${getBadgeClasses(type)}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  )
}

export default BadgePill
