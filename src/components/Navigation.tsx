import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Text } from '@radix-ui/themes'
import { navItems } from '@/lib/constant'

interface NavigationProps {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const pathname = usePathname()

  return (
    <nav className={`${className}`}>
      <ul className="hidden lg:flex items-center space-x-8">
        {navItems.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`cursor-pointer ${pathname === href ? 'text-black font-semibold' : 'text-[#29397E]'}`}
            >
              <Text size="2" weight="medium">
                {label}
              </Text>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="lg:hidden flex flex-col space-y-1">
        {navItems.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`cursor-pointer block w-full px-4 py-3 rounded-md ${pathname === href ? 'text-black font-semibold' : 'text-gray-600'}`}
            >
              <Text size="2" weight="medium">
                {label}
              </Text>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
