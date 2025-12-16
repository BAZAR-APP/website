// components/HotelMap.tsx
'use client'

import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'
import { Locale } from '../../i18n.config'

type HotelInfo = {
  name: string
  description: string
  reviews: number
}

type HotelMapProps = {
  center: google.maps.LatLngLiteral
  hotelInfo: HotelInfo
  lang: Locale
}

const containerStyle = {
  width: '100%',
  height: '400px',
  border: 'none',
  borderRadius: '10px',
}

const HotelMap: React.FC<HotelMapProps> = ({ center, hotelInfo, lang }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Put your key in .env
  })

  const [showInfo, setShowInfo] = useState(false)

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <div className='border-b border-[#E5E7EB] pb-9'>
      <h2 className="text-xl sm:text-[22px] md:text-[25px] font-semibold mt-7 mb-5">{lang=== 'en' ? 'Location' : 'موقع'}</h2>
      <p className="text-[#484A4C] text-[16px] leading-[19px] mb-4">
        {
          lang==='en' ? 'Al Khiran, Ahmadi, Kuwait' : 'الخيران، الأحمدي، الكويت'
        }
      </p>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} onClick={() => setShowInfo(true)} />

        {showInfo && (
          <InfoWindow position={center} onCloseClick={() => setShowInfo(false)}>
            <div>
              <h3>{hotelInfo.name}</h3>
              <p>{hotelInfo.description}</p>
              <p>⭐ {hotelInfo.reviews} Reviews</p>
              <button
                onClick={() => {
                  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`
                  window.open(googleMapsUrl, '_blank')
                }}
                className="mt-2 px-3 py-1.5 bg-[#29397E] text-white text-sm font-medium rounded hover:bg-[#1e2a5a] transition-colors"
              >
                {lang === 'en' ? 'View Location' : 'عرض الموقع'}
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

export default HotelMap
