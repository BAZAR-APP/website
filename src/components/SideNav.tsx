import React from 'react'
import Logo from './Logo'
import Navigation from './Navigation'
import NotificationIcon from './NotificationIcon'
import UserProfile from './Header/UserProfile'

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
  userName?: string
  avatarSrc?: string
  onLogout?: () => void
}

const SideNav: React.FC<SideNavProps> = ({
  isOpen,
  onClose,
  userName = 'Fahd Al-Mutiri',
  avatarSrc = '',
  onLogout = () => console.log('User logged out'),
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(71,69,69,0.5)] bg-opacity-20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 px-4 py-4">
            <div className="flex flex-col space-y-6">
              <Navigation />
            </div>
            <div className="flex gap-3 py-3 mt-3 px-3">
              <UserProfile userName={userName} avatarSrc={avatarSrc} onLogout={onLogout} />
              <NotificationIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideNav
