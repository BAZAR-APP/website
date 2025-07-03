'use client'
import { Button } from '@/components'
import { NotificationTab, NotificationTabs } from '@/components/Notification/NotificationTabs'
import { NotificationItem } from '@/components/Notification/NotificationItem'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import React, { useState, useMemo } from 'react'
import { dumyNotifications } from '@/lib/constant'
import useToggle from '@/lib/hooks/useToggle'
import NotificationSettingsDialog from '@/components/Notification/NotificationSettingsDialog'
import { useQueryBase } from '@/lib/axios'
import { NotificationMessage, NotificationResponse } from '@/lib/types/notification'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/Skeletons/Skeleton'

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all')
  const [visibleCount, setVisibleCount] = useState(10)
  const router = useRouter()
  const { data, isLoading } = useQueryBase({
    queryKey: ['messages'],
    url: `/messages`,
    staleTime: 0,
    cacheTime: 0,
  })
  const notifications = data?.data as NotificationResponse

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

  const handleNotificationClick = (notification: NotificationMessage) => {
    if (notification?.additionalData?.action === 'BOOKING_CONFIRMED') {
      router.push(`/my-bookings/96122adb-031f-4bac-91a4-bc370ca6f3ed/`)
    }
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

        {isLoading ? (
          <div className="flex flex-col space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex min-w-60 w-[481px] flex-col gap-6 bg-gray-50 p-6 rounded-2xl"
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section
            className="flex w-full gap-10 text-sm font-normal mt-10 max-md:max-w-full"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`${activeTab}-tab`}
          >
            <div className="justify-center items-stretch border-[color:var(--Grays-Gray-6,#F2F2F7)] relative flex min-w-60 w-[481px] flex-col bg-[#F9FAFB] pl-4 pr-2.5 py-2 rounded-2xl border-0 border-solid">
              <div className="space-y-2">
                {notifications?.messages.map((notification: NotificationMessage, index) => (
                  <React.Fragment key={notification.id}>
                    <NotificationItem
                      notification={notification}
                      onClick={handleNotificationClick}
                    />
                    {index < notifications?.messages.length - 1 && (
                      <div className="border-gray-100 border bg-[#F3F4F6] min-h-px w-full border-solid" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {hasMore && (
                <Button
                  intent="transperent"
                  onClick={handleLoadMore}
                  className="flex items-center justify-start !px-0 !py-1.5 gap-1 text-base text-[#19191A] font-medium underline underline-offset-2 mt-2"
                  aria-label={`Load more notifications. Currently showing ${visibleCount} of ${filteredNotifications.length}`}
                >
                  <span className="text-[#19191A]">Show more Notifications</span>
                  <ChevronRight className="w-3 h-3" strokeWidth={3} />
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
        )}
      </main>
      {isOpen && <NotificationSettingsDialog isOpen={isOpen} setIsOpen={toggle} />}
    </>
  )
}

export default Notifications
