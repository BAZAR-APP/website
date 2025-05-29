import React from 'react'
import { IconButton } from '@radix-ui/themes'

const NotificationIcon = () => {
  return (
    <IconButton variant="ghost" size="3">
      <div className="relative">
        {/* <NotificationIcon /> */}
        <span className="absolute top-0 right-1 translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
          2
        </span>
      </div>
    </IconButton>
  )
}

export default NotificationIcon
