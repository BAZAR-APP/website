'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Text } from '@radix-ui/themes'
// import { navItems } from '@/lib/constant'
import { useSession } from 'next-auth/react'

const authenticatedPages = ['My Bookings', 'Loyalty Points']

interface NavigationMessages {
  home: string;
  explore: string;
  my_bookings: string;
  loyalty_points: string;
}
interface NavigationProps {
  className?: string
  messages: NavigationMessages;
}
interface NavItem {
  label: string; // The localized label (from messages)
  href: string;
  key: string;  // The internal key (e.g., 'home', 'explore')
}

const stripLocale = (path: string) => {
  const parts = path.split('/')
  if (parts.length > 1 && ['en', 'ar'].includes(parts[1])) {
    return '/' + parts.slice(2).join('/')
  }
  return path
}

const Navigation: React.FC<NavigationProps> = ({ className = '', messages }) => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const normalizedPath = stripLocale(pathname)

   const navItems: NavItem[] = [
    { label: messages.home, href: '/', key: 'home' },
    { label: messages.explore, href: '/explore/', key: 'explore' },
    { label: messages.my_bookings, href: '/my-bookings/', key: 'my_bookings' },
    { label: messages.loyalty_points, href: '/loyalty-points/', key: 'loyalty_points' },
  ];

  const filteredNavItems = navItems.filter(({ label }) => {
    if (authenticatedPages.includes(label)) {
      return !!session?.user?.id
    }
    return true
  })

  return (
    <nav className={className}>
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center space-x-6">
        {filteredNavItems.map(({ label, href, key }) => {
          const normalizedHref = stripLocale(href)
          const isActive = normalizedPath === normalizedHref

          return (
            <li key={key}>
              <Link
                href={href}
                className={`transition-all duration-200 px-5 py-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue
                ${
                  isActive
                    ? 'text-white bg-primary-blue font-semibold shadow-md'
                    : 'text-[#29397E] hover:bg-gray-100 '
                }`}
              >
                <Text size="2" weight="medium">
                  {label}
                </Text>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Mobile Navigation */}
      <ul className="lg:hidden flex flex-col space-y-1">
        {filteredNavItems.map(({ label, href, key }) => {
          const normalizedHref = stripLocale(href)
          const isActive = normalizedPath === normalizedHref

          return (
            <li key={key}>
              <Link
                href={href}
                className={`transition-all duration-200 block w-full px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue
                ${
                  isActive
                    ? 'bg-primary-blue text-white font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Text size="2" weight="medium">
                  {label}
                </Text>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
