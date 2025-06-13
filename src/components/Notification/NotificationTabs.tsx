import React from 'react'

export type NotificationTab = 'all' | 'bookings' | 'payments' | 'profile'

interface NotificationTabsProps {
  activeTab: NotificationTab
  onTabChange: (tab: NotificationTab) => void
}

const tabs: { id: NotificationTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'payments', label: 'Payments' },
  { id: 'profile', label: 'Profile' },
]

export const NotificationTabs: React.FC<NotificationTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      className="flex gap-4 text-sm text-[#344054] font-medium whitespace-nowrap flex-wrap mt-10 py-3"
      role="tablist"
      aria-label="Notification categories"
    >
      <div className="flex min-w-60 items-center gap-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            onClick={() => onTabChange(tab.id)}
            className={`justify-center cursor-pointer items-center flex min-h-[38px] gap-1.5 overflow-hidden px-[18px] py-[11px] rounded-xl transition-colors ${
              activeTab === tab.id
                ? 'text-white bg-[#29397E] border border-[#29397E]'
                : 'text-[#344054] border border-[#D0D5DD] bg-white hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
