'use client'
import { Button } from '@/components'
import { NotificationTab, NotificationTabs } from '@/components/Notification/NotificationTabs'
import { NotificationItem, NotificationData } from '@/components/Notification/NotificationItem'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import { dumyNotifications } from '@/lib/constant'
import useToggle from '@/lib/hooks/useToggle'
import NotificationSettingsDialog from '@/components/Notification/NotificationSettingsDialog'

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all')
  const [visibleCount, setVisibleCount] = useState(10)
  const [, setSelectedNotification] = useState<NotificationData | null>(null)

  const handleTabChange = (tab: NotificationTab) => {
    setActiveTab(tab)
    setVisibleCount(10) 
  }

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return dumyNotifications

    const categoryMap: Record<NotificationTab, string[]> = {
      all: [],
      bookings: ['booking'],
      payments: ['payment'],
      profile: ['profile'],
    }

    const categories = categoryMap[activeTab] || []
    return dumyNotifications.filter((n) => categories.includes(n.category))
  }, [activeTab])

  const visibleNotifications = filteredNotifications.slice(0, visibleCount)
  const hasMore = visibleCount < filteredNotifications.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, filteredNotifications.length))
  }

  const handleNotificationClick = (notification: NotificationData) => {
    setSelectedNotification(notification)
    console.log('Notification clicked:', notification)
  }
  const { isOpen, toggle } = useToggle(false)
  return (
    <>
      <main className="items-stretch self-stretch flex flex-col bg-[#FDFDFE] pt-6 pb-16 lg:px-32 md:px-22 sm:px-12 px-8 mx-auto max-md:px-5 min-h-screen">
        <header className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full">
          <div className="flex-1 shrink basis-10 min-w-60 max-md:max-w-full">
            <h1 className="lg:text-[39px] text-xl lg:leading-[47px] leading-7 font-semibold text-[#19191A]">
              Notifications
            </h1>
            <p className="sm:text-[20px] text-sm leading-[24px] font-normal text-[#484A4C] mt-4">
              Stay updated with your bookings, payments, and rewards.
            </p>
          </div>
          <Button
            onClick={toggle}
            intent="transperent"
            className="flex gap-2 justify-center items-center bg-[#F3F4F6] px-5 py-3 rounded-lg cursor-pointer"
          >
            <span className="font-medium text-base leading-[150%] text-[#19191A]">
              Notifications Settings
            </span>
            <Image src="/images/Settings.svg" alt="Settings icon" width={24} height={24} />
          </Button>
        </header>

        <NotificationTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <section
          className="flex w-full gap-10 text-sm font-normal mt-10 max-md:max-w-full"
          role="tabpanel"
          id={`${activeTab}-panel`}
          aria-labelledby={`${activeTab}-tab`}
        >
          <div className="justify-center items-stretch border-[color:var(--Grays-Gray-6,#F2F2F7)] relative flex min-w-60 w-[481px] flex-col bg-[#F9FAFB] pl-4 pr-2.5 py-2 rounded-2xl border-0 border-solid">
            <div className="space-y-2">
              {visibleNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem notification={notification} onClick={handleNotificationClick} />
                  {index < visibleNotifications.length - 1 && (
                    <div className="border-gray-100 border bg-[#F3F4F6] min-h-px w-full border-solid" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {hasMore && (
              <Button
                intent="transperent"
                onClick={handleLoadMore}
                className="flex items-center justify-start !px-0 gap-1 text-base text-[#19191A] font-medium underline mt-2 hover:no-underline transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                aria-label={`Load more notifications. Currently showing ${visibleCount} of ${filteredNotifications.length}`}
              >
                <span className="text-[#19191A] underline decoration-solid decoration-auto underline-offset-auto">
                  Show more Notifications
                </span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <Image
                  src={'/images/NotificationNon.svg'}
                  width={120}
                  height={120}
                  alt="Notification icon"
                  className="text-center mx-auto"
                />
                <h3 className="text-[#19191A] text-[25px] leading-[32px] font-semibold text-center pt-6 pb-2.5">
                  No Notifications Yet
                </h3>
                <p className="font-normal text-[14px] leading-[17px] text-[#484A4C] text-center">
                  Stay tuned — your updates will appear <br /> here.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <NotificationSettingsDialog isOpen={isOpen} setIsOpen={toggle} />
    </>
  )
}

export default Notifications
