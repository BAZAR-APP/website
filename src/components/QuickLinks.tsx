import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Arrow from '../../public/images/Arrow.svg'

type QuickLinkKey = 'home' | 'about' | 'explore' | 'terms' | 'privacy'
interface QuickLinksProps {
  messages: {
    quick_links_title: string
    quick_links: Record<QuickLinkKey, string>
  }
  className?: string
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ messages, className = '' }) => {
  const links: { key: QuickLinkKey; href: string }[] = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'explore', href: '/explore/' },
    { key: 'terms', href: '/terms-conditions/' },
    { key: 'privacy', href: '/privacy-policy/' },
  ]
  return (
    <nav className={`flex flex-col ${className}`} aria-label="Quick links">
      <h3 className="text-base font-medium text-neutral-600 mb-2">{messages?.quick_links_title}</h3>

      <ul className="flex flex-col gap-2">
        {links.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="flex items-center gap-2 py-1.5">
              <span className="text-sm font-medium text-[#29397E] whitespace-nowrap">
                {messages?.quick_links[item.key]}
              </span>
              <Image src={Arrow} alt="Arrow icon" width={12} height={11} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
