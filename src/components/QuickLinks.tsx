import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Arrow from '../../public/images/Arrow.svg'
import { quickLinks } from '@/lib/utils'

interface QuickLinksProps {
  className?: string
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ className = '' }) => {
  return (
    <nav className={`flex flex-col ${className}`} aria-label="Quick links">
      <h3 className="text-base font-medium text-neutral-600 mb-2">Quick Links</h3>

      <ul className="flex flex-col gap-2">
        {quickLinks.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="flex items-center gap-2 py-1.5">
              <span className="text-sm font-medium text-[#29397E] whitespace-nowrap">
                {item.label}
              </span>
              <Image src={Arrow} alt="Arrow icon" width={12} height={11} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
