import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, defaultOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-[#19191A] mb-3 cursor-pointer"
      >
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && <div className="space-y-2">{children}</div>}
    </div>
  )
}

export default FilterSection
