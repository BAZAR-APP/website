'use client'
import LikeStar from '../../../public/images/Like.svg'
import Image from 'next/image'
import SocialShareWrapper from '../SocialShareWrapper'
import { MapPin } from 'lucide-react'
import Location from '../Location'
import { useState } from 'react'
import ModalDialog from '../ModalDialog/Dialog'

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
  const [showAllImages, setShowAllImages] = useState(false)
  const renderImageLayout = () => {
    if (images.length === 0) return null

    if (images.length === 1) {
      return (
        <div className="rounded-xl overflow-hidden">
          <Image
            src={images[0]}
            width={800}
            height={400}
            alt={`${title} main view`}
            className="w-full h-60 sm:h-74 xl:h-[450px] object-cover"
          />
        </div>
      )
    }

    if (images.length === 2) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl overflow-hidden">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              width={400}
              height={400}
              alt={`${title} view ${i + 1}`}
              className="w-full h-60 sm:h-74 xl:h-[450px] object-cover"
            />
          ))}
        </div>
      )
    }

    if (images.length === 3) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 rounded-xl overflow-hidden">
          <div>
            <Image
              src={images[0]}
              width={400}
              height={400}
              alt={`${title} main view`}
              className="w-full h-60 sm:h-74 xl:h-[450px] object-cover"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {images.slice(1, 3).map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${title} view ${i + 2}`}
                className="w-full h-28 sm:h-36 xl:h-[220px] object-cover"
                width={400}
                height={220}
              />
            ))}
          </div>
        </div>
      )
    }

    if (images.length === 4) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 rounded-xl overflow-hidden">
          <div className="lg:col-span-2">
            <Image
              src={images[0]}
              width={400}
              height={400}
              alt={`${title} main view`}
              className="w-full h-60 sm:h-74 xl:h-[450px] object-cover"
            />
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {images.slice(1, 4).map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${title} view ${i + 2}`}
                className="w-full h-28 sm:h-36 xl:h-[145px] object-cover"
                width={400}
                height={145}
              />
            ))}
          </div>
        </div>
      )
    }

    return (
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
            {group.map((img, i) => {
              const isLastImage = groupIndex === 1 && i === 1 && images.length > 5
              return (
                <div key={i} className="relative">
                  <Image
                    src={img}
                    alt={`${title} view ${groupIndex * 2 + i + 2}`}
                    className="w-full h-28 sm:h-36 xl:h-[220px] object-cover"
                    width={650}
                    height={400}
                  />
                  {isLastImage && (
                    <div
                      className="absolute inset-0 bg-opacity-10 flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-all"
                      onClick={() => setShowAllImages(true)}
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(1px)' }}
                    >
                      <div className="text-white text-center">
                        {/* <Plus className="w-8 h-8 mx-auto mb-1" /> */}
                        <span className="text-4xl font-semibold">+{images.length - 5}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

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

        {renderImageLayout()}
      </section>

      {/* Image Gallery Modal */}
      {showAllImages && (
        <ModalDialog
          isOpen={showAllImages}
          setIsOpen={setShowAllImages}
          className="max-w-2xl lg:max-w-[70%] xl:max-w-[90%] 2xl:max-w-[75%] max-h-[90vh]"
        >
          <div className=" overflow-y-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {images?.map((img, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${title} view ${i + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 lg:h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalDialog>
      )}
    </>
  )
}

export default PropertyDetailsCard
