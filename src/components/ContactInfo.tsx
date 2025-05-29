import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import GooglePlay from '../../public/images/GooglePlay.svg'
import Appstore from '../../public/images/AppStore.svg'
import Instagram from '../../public/images/Instagram.svg'
import Twitter from '../../public/images/Twitter.svg'
import { MapPin } from 'lucide-react'

interface ContactInfoProps {
  className?: string
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ className = '' }) => {
  return (
    <section className={`flex flex-col gap-6 w-[207px] ${className}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-neutral-600">Contact Us</h3>
        <div className="flex gap-4">
          <Link href="#" aria-label="Instagram">
            <Image src={Instagram} alt="Instagram icon" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Image src={Twitter} alt="Twitter icon" />
          </Link>
        </div>
      </div>

      <address className="flex items-start gap-2 text-sm font-medium text-indigo-900 not-italic">
        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
        <p>Kuwait, Souq Al-Manakh, Ground Floor, Office No. 318.</p>
      </address>

      <div className="flex flex-col gap-3">
        <Link href="#" aria-label="Download from App Store">
          <Image src={Appstore} alt="App Store badge" />
        </Link>
        <Link href="#" aria-label="Download from Google Play">
          <Image src={GooglePlay} alt="Google Play badge" />
        </Link>
      </div>
    </section>
  )
}
