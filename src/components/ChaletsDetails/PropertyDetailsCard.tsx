'use client'
import LikeStar from '../../../public/images/Like.svg'
import Image from 'next/image'
import SocialShareWrapper from '../SocialShareWrapper'
import { MapPin } from 'lucide-react'
import Location from '../Location'
import ImageGallery from './ImageGallery'

interface PropertyDetailsCardProps {
  title: string
  location: string
  rating: number
  reviewCount: number
  images: string[]
}

const PropertyDetailsCard = ({
  title,
  location,
  rating,
  reviewCount,
  images = [],
}: PropertyDetailsCardProps) => {
  return (
    <>
      <section className="py-6 xl:px-22 lg:px-18 md:px-14 px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between md:mb-9 mb-6">
          <div>
            <h1 className="lg:text-[39px] md:text-3xl sm:text-2xl text-xl font-semibold text-gray-900 mb-2">
              {title}
            </h1>
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center flex-wrap sm:gap-1 gap-2.5 text-gray-800">
                <span className="text-[#484A4C]">{rating}</span>
                <Image src={LikeStar} alt="Rating star" width={18} height={18} />
                <span className="text-[#9EA0A2] font-normal text-[9px]">&bull;</span>
                <span className="text-[#484A4C] font-normal underline">{reviewCount} reviews</span>
                <span className="text-[#9EA0A2] font-normal text-[9px]">&bull;</span>
                <Location
                  icon={<MapPin className="w-4 h-4 text-[#9EA0A2]" />}
                  text={location}
                  className="text-[#9EA0A2]"
                />
                <span className="text-[#9EA0A2] font-normal text-[9px]">&bull;</span>
                <SocialShareWrapper />
              </div>
            </div>
          </div>
        </div>

        <ImageGallery images={images} title={title} />
      </section>
    </>
  )
}

export default PropertyDetailsCard
