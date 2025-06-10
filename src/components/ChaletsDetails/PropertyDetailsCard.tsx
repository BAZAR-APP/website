import LikeStar from '../../../public/images/Like.svg'
import Image from 'next/image'
import SocialShareWrapper from '../SocialShareWrapper'
import { MapPin } from 'lucide-react'
import Location from '../Location'

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-xl overflow-hidden">
        <div className="lg:col-span-2">
          {images[0] && (
            <Image
              src={images[0]}
              width={400}
              height={400}
              alt={`${title} main view`}
              className="w-full h-60 sm:h-74 xl:h-[450px] object-cover"
            />
          )}
        </div>

        {[images.slice(1, 3), images.slice(3, 5)].map((group, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {group.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${title} view ${groupIndex * 2 + i + 2}`}
                className="w-full h-28 sm:h-36 xl:h-[220px] object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyDetailsCard
