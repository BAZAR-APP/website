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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="lg:text-[39px] md:text-3xl sm:text-2xl text-xl font-semibold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center flex-wrap sm:gap-1 gap-2.5 text-gray-800">
              <span className="text-[#484A4C]">{rating}</span>
              <Image src={LikeStar} alt="Rating star" width={18} height={18} />
              <span className="text-[#9EA0A2]">&bull;</span>
              <span className="text-gray-500 font-normal underline">{reviewCount} reviews</span>
              <span className="text-[#9EA0A2]">&bull;</span>
              <Location
                icon={<MapPin className="w-4 h-4" />}
                text={location}
                className="text-[#9EA0A2]"
              />
              <span className="text-[#9EA0A2]">&bull;</span>
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
              width={200}
              height={200}
              alt={`${title} main view`}
              className="w-full h-64 lg:h-96 object-cover"
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
                className="w-full h-31 lg:h-47 object-cover"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyDetailsCard
