"use client"
import React, { useEffect, useState } from 'react'
import Image from "next/image"
import CommonInput from "../CommonInput/Input"
import { Instagram, Send, AtSign, Copy } from 'lucide-react'
import { copyToClipboard } from "@/lib/utils"
import { Separator } from 'radix-ui'


const ReferModal = () => {

    const [shareUrl, setShareUrl] = useState('')

    const shareOptions = [
        {
            name: 'Telegram',
            icon: Send,
            url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`,
            isImage: false,
        },
        {
            name: 'Twitter',
            icon: "/images/twitterX.svg",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
            isImage: true,
        },
        {
            name: 'WhatsApp',
            icon: "/images/whatsapp.svg",
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

    // Set the URL only after component mounts (client-side)
    useEffect(() => {
        setShareUrl(window.location.href)
    }, [])


    const handleCopy = async () => {
        await copyToClipboard(shareUrl)
    }

    const handleShareClick = async (option: (typeof shareOptions)[0]) => {
        if (option.url && option.name !== 'Instagram') {
            window.open(option.url, '_blank', 'width=600,height=400')
        } else if (option.name === 'Instagram') {
            // Instagram doesn't support direct URL sharing, so copy to clipboard
            copyToClipboard(shareUrl)

            alert('Link copied! You can paste it in Instagram.')
        }
    }

    return (
        <>
            <div className='bg-[#F9FAFB] w-[161px] h-[161px] mx-auto rounded-[20px] flex justify-center items-center'>
                <Image src={"/images/gift.svg"} alt='gift' width={119} height={119} />
            </div>
            <div className="relative my-5">
                <CommonInput
                    type="text"
                    value={shareUrl}
                    readonly
                    placeholder="Loading URL..."
                    className="w-full relative !px-4 !pr-10 bg-gray-50 border border-[#D0D5DD] !rounded-md !text-sm !h-[42px]"
                />
                <span className="absolute top-0 right-3 flex">
                    <Separator.Root
                        orientation="vertical"
                        className="h-10.5 w-[1.5px] bg-gray-300 inline-block mx-3"
                    />
                    <Copy
                        className="w-4 h-4 mt-3 text-[#29397E] cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={handleCopy}
                    />
                </span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
                {shareOptions.map((option) => (
                    <div
                        key={option.name}
                        className="flex flex-col items-center space-y-4"
                        onClick={() => handleShareClick(option)}
                    >
                        <div className="w-[72px] h-[72px] my-3 cursor-pointer rounded-[37.33px] bg-[#F9FAFB] flex items-center justify-center p-6 hover:bg-gray-100 transition-colors">
                            {option.isImage && typeof option.icon === 'string' ? (
                                <Image src={option.icon} alt={option.name} width={24} height={24} />
                            ) : (
                                <option.icon className="text-[#29397E]" />
                            )}
                        </div>
                        <span className="text-[10px] text-[#29397E]">{option.name}</span>
                    </div>
                ))}
            </div>

        </>
    )
}

export default ReferModal