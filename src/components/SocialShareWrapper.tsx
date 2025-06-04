'use client'
import { useState } from 'react'
import { SocialLinkShare } from '@/components'
import Image from 'next/image'
import ShareIcon from '../../public/images/share-icon.svg'
import { Button } from '@radix-ui/themes'

export default function SocialShareWrapper() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" className="flex items-center gap-1" onClick={() => setIsOpen(true)}>
        <Image src={ShareIcon} alt="Share icon" className="cursor-pointer" width={18} height={18} />
        <span className='text-[#19191A] cursor-pointer'>Share</span>
      </Button>
      <SocialLinkShare open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
