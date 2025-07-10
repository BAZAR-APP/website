import React from 'react'
import { IconButton } from '@radix-ui/themes'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NotificationIcon = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/notifications/')
  }
  return (
    <IconButton variant="ghost" size="3" onClick={handleClick}>
      <div className="relative cursor-pointer">
        <Image src={'/images/Notification.svg'} alt="Logo" width={36} height={36} />
        {/* <span className="absolute top-1.5 right-[3px] translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-[12px] rounded-full w-5.5 h-5.5 flex items-center justify-center">
          2
        </span> */}
      </div>
    </IconButton>
  )
}

export default NotificationIcon
