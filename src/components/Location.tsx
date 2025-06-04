import { ReactNode } from 'react'

interface LocationProps {
  icon: ReactNode
  text: string
  className?: string
}

const Location = ({ icon, text, className = '' }: LocationProps) => {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      {icon}
      {text}
    </span>
  )
}

export default Location
