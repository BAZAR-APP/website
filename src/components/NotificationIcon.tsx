import React from 'react'
import { IconButton } from '@radix-ui/themes'
import Image from 'next/image'
import NotifiIcon from '../../public/images/Notification.svg'

const NotificationIcon = () => {
  return (
    <IconButton variant="ghost" size="3">
      <div className="relative">
        <Image src={NotifiIcon} alt="Logo" width={28} height={28} />
        <span className="absolute top-0.5 right-0.5 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          2
        </span>
      </div>
    </IconButton>
  )
}

export default NotificationIcon
