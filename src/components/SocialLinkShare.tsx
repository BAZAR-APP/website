'use client'
import React, { useEffect, useState } from 'react'
import {
  Twitter,
  Mail,
  Instagram,
  ClipboardCopy,
  Telescope,
  Wheat,
  Send,
  AtSign,
  X,
  Copy,
} from 'lucide-react'
import ModalDialog from '@/components/ModalDialog/Dialog'
import { Button, CommonInput } from '@/components'
import { Separator } from 'radix-ui'

interface ShareModalProps {
  onClose: () => void
  open: boolean
}

const SocialLinkShare: React.FC<ShareModalProps> = ({ onClose, open }) => {
  const [shareUrl, setShareUrl] = useState('')

  // Set the URL only after component mounts (client-side)
  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const shareOptions = [
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: X,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: AtSign,
      url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'E-mail',
      icon: Mail,
      url: `mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: '', // Instagram doesn't support direct URL sharing
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Link copied to clipboard!')
    }
  }

  const handleShareClick = (option: (typeof shareOptions)[0]) => {
    if (option.url && option.name !== 'Instagram') {
      window.open(option.url, '_blank', 'width=600,height=400')
    } else if (option.name === 'Instagram') {
      // Instagram doesn't support direct URL sharing, so copy to clipboard
      copyToClipboard()
      alert('Link copied! You can paste it in Instagram.')
    }
  }

  return (
    <ModalDialog isOpen={open} setIsOpen={onClose} title="Share With...">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {shareOptions.map((option) => (
          <div
            key={option.name}
            className="flex flex-col items-center space-y-4"
            onClick={() => handleShareClick(option)}
          >
            <div className="w-[72px] h-[72px] my-3 cursor-pointer rounded-[37.33px] bg-[#F9FAFB] flex items-center justify-center p-6 hover:bg-gray-100 transition-colors">
              <span className="text-xl">
                <option.icon className="text-[#29397E]" />
              </span>
            </div>
            <span className="text-xs text-[#29397E]">{option.name}</span>
          </div>
        ))}
      </div>
      <div className="relative my-5">
        <CommonInput
          type="text"
          value={shareUrl}
          readonly
          placeholder="Loading URL..."
          className="w-full relative !px-4 !pr-10 bg-gray-50 border border-gray-200 !rounded-md !text-sm !border-none !h-[42px]"
        />
        <span className="absolute top-0 right-3 flex">
          <Separator.Root
            orientation="vertical"
            className="h-10.5 w-[1.5px] bg-gray-300 inline-block mx-2"
          />
          <Copy
            className="w-4 h-4 mt-3 text-[#29397E] cursor-pointer hover:text-blue-600 transition-colors"
            onClick={copyToClipboard}
          />
        </span>
      </div>
      <Button size="responsive" intent="ghost" onClick={onClose} className="mt-4">
        Cancel
      </Button>
    </ModalDialog>
  )
}

export default SocialLinkShare
