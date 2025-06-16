import { Dot } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export interface NotificationData {
  id: string
  message: string
  timestamp: string
  iconUrl: string
  category: 'booking' | 'payment' | 'profile' | 'general'
  isRead?: boolean
  isUnread?: boolean
}

interface NotificationItemProps {
  notification: NotificationData
  onClick?: (notification: NotificationData) => void
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const handleClick = () => {
    onClick?.(notification)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      className="flex items-center relative w-full gap-2 py-2 rounded-2xl cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Notification: ${notification.message}`}
    >
      <div className="flex sm:items-center items-start gap-4 flex-1 shrink basis-0 my-auto max-md:max-w-full">
        <div className="relative w-6 h-6 shrink-0">
          <Image
            src={notification.iconUrl}
            alt="Notification Icon"
            className="w-full h-full object-contain my-auto sm:mt-0 mt-[10px]"
            width={24}
            height={24}
            role="presentation"
          />
          {notification.isUnread && (
            <Dot className="absolute -top-2 -right-2 text-[#E41212] fill-current" />
          )}
        </div>

        <div className="self-stretch flex min-w-60 flex-col items-stretch justify-center flex-1 shrink basis-[0%] my-auto py-3">
          <div className="flex w-full items-center sm:flex-nowrap flex-wrap gap-2">
            <p className="text-[#484A4C] self-stretch min-w-60 overflow-hidden flex-1 shrink basis-[0%] my-auto">
              {notification.message}
            </p>
            <time
              className="text-[#9EA0A2] self-stretch gap-2 overflow-hidden my-auto"
              dateTime={notification.timestamp}
            >
              {notification.timestamp}
            </time>
          </div>
        </div>
      </div>
    </article>
  )
}
