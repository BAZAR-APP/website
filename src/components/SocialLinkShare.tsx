'use client'
import React, { useEffect, useState } from 'react'
import TwitterX from '../../public/images/twitterX.svg'
import WatsapIcon from '../../public/images/whatsapp.svg'
import Image from 'next/image'
import { Instagram, Send, AtSign, Copy } from 'lucide-react'
import ModalDialog from '@/components/ModalDialog/Dialog'
import { Button, CommonInput } from '@/components'
import { Separator } from 'radix-ui'
import { copyToClipboard } from '@/lib/utils'
import clsx from 'clsx'
import { toast } from '@/lib/toast'
import { useParams } from 'next/navigation'

interface ShareModalProps {
  onClose: () => void
  open: boolean
  title?: string
  children?: React.ReactNode
  colRevers?: boolean
}

const SocialLinkShare: React.FC<ShareModalProps> = ({
  onClose,
  open,
  title = 'Share With...',
  children,
  colRevers = false,
}) => {
  const [shareUrl, setShareUrl] = useState('')
  const params = useParams() as unknown as { id: string; lang: Locale }
  const { id, lang } = params

  // Set the URL only after component mounts (client-side)
  useEffect(() => {
    setShareUrl(`${window.location?.origin}/${lang}/chalet/${id}/`)
  }, [])

  const shareOptions = [
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
      isImage: false,
    },
    {
      name: 'Twitter',
      icon: TwitterX,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
      isImage: true,
    },
    {
      name: 'WhatsApp',
      icon: WatsapIcon,
      url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      isImage: true,
    },
    {
      name: 'E-mail',
      icon: AtSign,
      url: `mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`,
      isImage: false,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: '', // Instagram doesn't support direct URL sharing
      isImage: false,
    },
  ]

  const handleCopy = async () => {
    await copyToClipboard(shareUrl)
    onClose()
  }

  const handleShareClick = async (option: (typeof shareOptions)[0]) => {
    if (option.url && option.name !== 'Instagram') {
      window.open(option.url, '_blank', 'width=600,height=400')
    } else if (option.name === 'Instagram') {
      // Instagram doesn't support direct URL sharing, so copy to clipboard
      copyToClipboard(shareUrl)

      toast.success('Link copied! You can paste it in Instagram.')
    }
  }

  return (
    <ModalDialog
      isOpen={open}
      setIsOpen={onClose}
      title={title}
      titleClassName="!text-[16px] !font-[700]"
    >
      {children && children}
      <div
        className={clsx('flex flex-col', {
          'flex-col-reverse': colRevers,
        })}
      >
        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {shareOptions.map((option) => (
            <div
              key={option.name}
              className="flex flex-col items-center space-y-4"
              onClick={() => handleShareClick(option)}
            >
              <div className="w-[72px] h-[72px] my-3 cursor-pointer rounded-[37.33px] bg-[#F9FAFB] flex items-center justify-center p-6 hover:bg-gray-100 transition-colors">
                {option.isImage ? (
                  <Image src={option.icon} alt={option.name} width={24} height={24} />
                ) : (
                  <option.icon className="text-[#29397E]" />
                )}
              </div>
              <span className="text-[10px] text-[#29397E]">{option.name}</span>
            </div>
          ))}
        </div>
        <div className="relative my-5">
          <CommonInput
            type="text"
            value={shareUrl}
            readonly
            placeholder="Loading URL..."
            className="w-full relative !px-4 !pr-10 bg-gray-50 border !border-[#D0D5DD] !rounded-md !text-[#9EA0A2] !text-sm !h-[42px]"
          />
          <span className="absolute top-0 right-4 flex">
            <Separator.Root
              orientation="vertical"
              className="h-10.5 w-[1.5px] bg-gray-300 inline-block mx-3"
            />
            <Copy
              className="w-5 h-5 mt-3 text-[#29397E] cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleCopy}
            />
          </span>
        </div>
      </div>
      <Button
        size="responsive"
        intent="ghost"
        onClick={onClose}
        className="mt-4 w-full text-[#1F2A37]"
      >
        Cancel
      </Button>
    </ModalDialog>
  )
}

export default SocialLinkShare
