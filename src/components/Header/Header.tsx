'use client'
import React, { useState } from 'react'
import Navigation from '../Navigation'
import UserProfile from './UserProfile'
import './css/Header.css'
import Logo from '../Logo'
import NotificationIcon from '../NotificationIcon'
import SideNav from '../SideNav'
import Link from 'next/link'
import Button from '../Button/Button'

interface HeaderProps {
  className?: string
  isAuthHeader?: boolean
}

const Header: React.FC<HeaderProps> = ({ className = '', isAuthHeader = false }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const toggleSideNav = () => setIsSideNavOpen((open) => !open)
  const closeSideNav = () => setIsSideNavOpen(false)

  const baseContainerClasses =
    'flex relative flex-col gap-16 justify-center items-center self-stretch lg:px-16 px-12 py-8 max-md:px-8 max-md:py-6 max-sm:px-5 max-sm:py-4'

  const baseInnerClasses =
    'bg-[#F9FAFB] backdrop-blur-[12px] rounded-full flex-none order-0 self-stretch'

  const maxWidthContainer = 'max-w-screen-xl mx-auto px-8 max-md:px-4 max-sm:px-2'

  const SignInHeader = () => (
    <div className="flex items-center justify-between w-full">
      <Logo />
      <nav className="flex items-center space-x-8">
        <Link href="/home" className="text-primary-blue hover:text-black font-medium">
          Home
        </Link>
        <a href="/explore" className="text-primary-blue hover:text-black font-medium">
          Explore
        </a>
      </nav>
      <div className="flex items-center space-x-4">
        <Button
          type="button"
          className="px-4 py-2 text- border-none rounded-[8px] font-medium bg-gray-100 text-secondary hover:bg-gray-100"
        >
          Sign In
        </Button>

        <Button
          type="button"
          className="px-4 py-2 rounded-[8px] font-medium text-primary-foreground bg-primary-blue hover:bg-primary-blue"
        >
          Sign Up
        </Button>
      </div>
    </div>
  )

  const AuthenticatedHeader = () => (
    <>
      <div className="flex items-center justify-between w-full lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={toggleSideNav}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-between w-full">
        <Logo />
        <Navigation />
        <div className="flex items-center space-x-4 gap-5">
          <NotificationIcon />
          <UserProfile
            userName="Fahd Al-Mutiri"
            avatarSrc="/images/Image.svg"
            onLogout={() => console.log('User logged out')}
          />
        </div>
      </div>
    </>
  )

  return (
    <>
      <header className={`flex relative flex-col items-center self-stretch ${className}`}>
        <div className={baseContainerClasses}>
          <div className={baseInnerClasses}>
            <div className={maxWidthContainer}>
              <div className="flex items-center justify-between gap-4 lg:p-6 p-3">
                {isAuthHeader ? <SignInHeader /> : <AuthenticatedHeader />}
              </div>
            </div>
          </div>
        </div>
      </header>

      {!isAuthHeader && (
        <SideNav
          isOpen={isSideNavOpen}
          onClose={closeSideNav}
          userName="Fahd Al-Mutiri"
          avatarSrc=""
          onLogout={() => console.log('User logged out')}
        />
      )}
    </>
  )
}

export default Header
