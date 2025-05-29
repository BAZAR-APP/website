import React from 'react'
import Navigation from './Navigation'
import NotificationIcon from './NotificationIcon'
import UserProfile from './UserProfile'
import '../Header/css/Header.css'
import Logo from './Logo'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`flex relative flex-col items-center self-stretch ${className}`}>
      <div className="flex relative flex-col gap-16 justify-center items-center self-stretch px-16 py-8 max-md:px-8 max-md:py-6 max-sm:px-5 max-sm:py-4">
        <div className="w-full backdrop-blur-md rounded-[60px] bg-light-grey">
          <div className="max-w-screen-xl mx-auto px-8 max-md:px-4 max-sm:px-2">
            <div className="flex items-center justify-between h-20">
              <Logo />
              <Navigation />
              <div className="flex items-center space-x-4 gap-4">
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
    </header>
  )
}

export default Header
