import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GooglePlay from '../../public/images/GooglePlay.svg'
import Appstore from '../../public/images/AppStore.svg'
import Instagram from '../../public/images/Instagram.svg'
import Twitter from '../../public/images/Twitter.svg'
import { MapPin } from 'lucide-react'

interface ContactInfoProps {
  messages: {
    contact_title: string;
    address: string;
  };
  className?: string;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ messages, className = '' }) => {
  return (
    <section className={`flex flex-col w-[230px] ${className}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-neutral-600 mb-1">{messages?.contact_title}</h3>
        <div className="flex gap-4">
          <Link
            href="https://www.instagram.com/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Instagram} alt="Instagram icon" />
          </Link>
          <Link
            href="https://twitter.com/"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Twitter} alt="Twitter icon" />
          </Link>
        </div>
      </div>

      <address className="flex items-start gap-2 mt-3 text-sm font-medium text-indigo-900 not-italic">
        <MapPin className="w-[24px] mt-0.5 shrink-0" />
        <p>{messages?.address}</p>
      </address>

      <div className='flex sm:flex-col flex-row sm:items-start items-center sm:pb-0 pb-6'>
        <Link
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download from App Store"
          className="max-h-[35px]"
        >
          <Image
            src={Appstore}
            alt="App Store badge"
            width={107}
            height={90}
            className="h-[100px]"
          />
        </Link>
        <Link
          href="https://play.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download from Google Play"
          className="max-h-[35px] sm:mt-2"
        >
          <Image
            src={GooglePlay}
            alt="Google Play badge"
            width={107}
            height={90}
            className="h-[100px]"
          />
        </Link>
      </div>
    </section>
  )
}
