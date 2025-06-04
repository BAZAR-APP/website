// components/HotelMap.tsx
'use client'

import React, { useState } from 'react'
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api'

type HotelInfo = {
  name: string
  description: string
  reviews: number
}

type HotelMapProps = {
  center: google.maps.LatLngLiteral
  hotelInfo: HotelInfo
}

const containerStyle = {
  width: '100%',
  height: '400px',
  border: 'none',
  borderRadius: '10px',
}

const HotelMap: React.FC<HotelMapProps> = ({ center, hotelInfo }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Put your key in .env
  })

  const [showInfo, setShowInfo] = useState(false)

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <>
      <h2 className="sm:text-xl text-lg font-semibold my-6">Location</h2>
      <p className="text-[#484A4C] text-[16px] leading-[19px] mb-4">
        Al Khiran, Ahmadi, Kuwait
      </p>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        <Marker position={center} onClick={() => setShowInfo(true)} />

        {showInfo && (
          <InfoWindow position={center} onCloseClick={() => setShowInfo(false)}>
            <div>
              <h3>{hotelInfo.name}</h3>
              <p>{hotelInfo.description}</p>
              <p>⭐ {hotelInfo.reviews} Reviews</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </>
  )
}

export default HotelMap
