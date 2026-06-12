'use client'
import { Heart, MapPin } from 'lucide-react'
import Image from 'next/image'
import Star from '../../public/images/Like.svg'
import React, { useState, useEffect } from 'react'
import { Chalet } from '../../types/chalets'
import api from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Locale } from '../../i18n.config'

interface PropertyCardProps {
  onClick?: () => void
  chalet: Chalet
  isMember?: boolean
  lang: Locale
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onClick, chalet, isMember = false, lang }) => {
  const queryClient = useQueryClient()
  const [isFavourite, setIsFavourite] = useState(chalet?.isFavourite || false)
  const { data: session } = useSession()
  useEffect(() => {
    setIsFavourite(chalet?.isFavourite || false)
  }, [chalet?.isFavourite])

  const toggleFavourite = async () => {
    if (!session?.user?.accessToken) return
    const prevState = isFavourite
    setIsFavourite(!prevState) // optimistic update

    try {
      await api.post('/favouriteChalets', {
        chaletId: chalet?.id,
        isFavourite: !prevState,
      })
      queryClient.invalidateQueries({ queryKey: ['chalets'] }) // get real data next time
    } catch (error) {
      setIsFavourite(prevState) // rollback on error
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className="flex flex-col w-full min-w-full sm:min-w-[300px] max-w-[350px] p-4 gap-4 bg-[#F9FAFB] cursor-pointer rounded-[16px] mx-auto"
    >
      <div className="w-full h-[184px]">
        <Image
          src={chalet?.photoURL || '/images/AppPlaceHolder.png'}
          alt={chalet?.title || ''}
          className="w-full h-full object-cover rounded-[12px]"
          width={400}
          height={300}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="sm:text-xl text-lg font-normal text-[#484A4C] truncate">
            {chalet?.title}
          </h3>
          {session?.user?.id && (
            <button
              aria-label="Add to favorites"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavourite()
              }}
            >
              {isFavourite ? (
                <Heart className="w-5 h-5 text-[#29397E] fill-[#29397E]" />
              ) : (
                <Heart className="w-5 h-5 text-[#29397E]" />
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center text-sm text-[#8E8E93] gap-0.5">
          <MapPin className="w-4 h-4" />
          <span
            className={
              isMember
                ? 'max-w-[122px] truncate whitespace-nowrap overflow-hidden text-ellipsis'
                : ''
            }
          >
            {chalet?.city}
          </span>
          {isMember && (
            <div className="flex gap-[3px] items-center text-sm text-gray-700 ml-auto">
              <span>{chalet?.rating ?? 0}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-[#484A4C]">({chalet?.noOfReviews ?? 0} reviews)</span>
            </div>
          )}
        </div>

        <div className="text-sm text-[#8E8E93] leading-5 truncate">
          {chalet?.minNoOfGuests ?? 0}-{chalet?.maxNoOfGuests ?? 0} { lang === 'en' ? 'guests' : 'الضيوف' }
          <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {chalet?.isEntireHomeAvailabe && (
            <>
              { lang === 'en' ? 'Entire Home' : 'المنزل بأكمله' } <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
            </>
          )}
          {chalet?.maxNoOfBeds} { lang === 'en' ? 'beds' : 'أسرة' }
          <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
          {chalet?.noOfBaths} { lang === 'en' ? 'baths' : 'الحمامات' }
          <br />
          {chalet?.isFreeWifi && (
            <span className="text-sm text-[#8E8E93] leading-5"> { lang === 'en' ? 'Wifi' : 'واي فاي' } </span>
          )}{' '}
          {chalet?.isFreeParking && (
            <>
              <span className="text-[#9EA0A2] font-normal text-[9px] pr-1">&bull;</span>
              <span className="text-sm text-[#8E8E93] leading-5"> { lang === 'en' ? 'Free Parking' : 'مواقف مجانية للسيارات' } </span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          {!isMember && (
            <div className="flex items-center sm:flex-nowrap flex-wrap text-sm text-gray-700">
              <span className="mr-1">{chalet?.rating ?? 0}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-gray-500 sm:ml-1">({chalet?.noOfReviews ?? 0}  {lang === 'en' ? 'reviews' : 'الحمامات'} )</span>
            </div>
          )}
          <div className="flex items-center justify-between ">
            <div className="flex items-center font-medium text-[16px] leading-7 text-[#484A4C]">
              {isMember ? (
                <>
                  <span className="md:text-[14px] text-[12px] font-bold text-primary">
                    {chalet?.perHourCost && Number(chalet?.perHourCost) > 0 ? chalet?.perHourCost : chalet?.perNightCost} KD
                  </span>
                  <span className="md:text-[12px] text-[10px] leading-4 font-normal text-primary">
                    /{chalet?.perHourCost && Number(chalet?.perHourCost) > 0 ? 'hour' : 'night'}
                  </span>
                  {/* <span className="pl-2 md:text-[12px] text-[10px] font-overline leading-4 font-bold line-through text-primary">
                    {chalet?.perNightCost} KD
                  </span> */}
                </>
              ) : (
                <>
                  <span className="sm:text-[18px] text-sm">{chalet?.perHourCost && Number(chalet?.perHourCost) > 0 ? chalet?.perHourCost : chalet?.perNightCost} {lang === 'en' ? 'KD' : 'دينار كويتي'} </span>
                  <span className="text-sm leading-4 font-normal text-[#484A4C]">/{chalet?.perHourCost && Number(chalet?.perHourCost) > 0 ? (lang === 'en' ? 'hour' : 'ساعة') : (lang === 'en' ? 'night' : 'ليلة')}</span>
                </>
              )}
            </div>
          </div>

          {isMember && (
            <div className="flex w-[113px] py-[4px] px-[6px] gap-[4px] justify-center items-center bg-[#29397e] rounded-[6px] relative z-[29]">
              <div className="w-[12px] h-[12px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7tnhNOS6C5.png)] bg-cover bg-no-repeat relative z-30" />
              <span className="text-[12px] font-normal text-[#fdfdfe] text-center whitespace-nowrap z-31">
                Members Only
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
