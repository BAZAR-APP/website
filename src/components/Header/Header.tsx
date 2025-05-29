import React, { useState } from 'react'
import Navigation from '../Navigation'
import UserProfile from './UserProfile'
import './css/Header.css'
import Logo from '../Logo'
import NotificationIcon from '../NotificationIcon'
import SideNav from '../SideNav'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  const closeSideNav = () => {
    setIsSideNavOpen(false)
  }

  return (
    <>
      <header className={`flex relative flex-col items-center self-stretch ${className}`}>
        <div className="flex relative flex-col gap-16 justify-center items-center self-stretch lg:px-16 px-12 py-8 max-md:px-8 max-md:py-6 max-sm:px-5 max-sm:py-4">
          <div className="bg-[#F9FAFB] backdrop-blur-[12px] rounded-full flex-none order-0 self-stretch">
            <div className="max-w-screen-xl mx-auto px-8 max-md:px-4 max-sm:px-2">
              <div className="flex items-center justify-between gap-4 lg:p-6 p-3">
                <div className="flex items-center justify-between w-full lg:hidden">
                  <Logo />
                  <button
                    onClick={toggleSideNav}
                    className="p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                    aria-label="Open navigation menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
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
                      avatarSrc=""
                      onLogout={() => console.log('User logged out')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <SideNav
        isOpen={isSideNavOpen}
        onClose={closeSideNav}
        userName="Fahd Al-Mutiri"
        avatarSrc=""
        onLogout={() => console.log('User logged out')}
      />
    </>
  )
}

export default Header
