'use client'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { title } from 'process'

interface ImageGalleryProps {
  images: string[]
  title: string
}

const ImageGallery = ({ images = [], title }: ImageGalleryProps) => {
  const [showCarousel, setShowCarousel] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const openCarousel = useCallback((index: number = 0) => {
    setCurrentImageIndex(index)
    setShowCarousel(true)
  }, [])

  const closeCarousel = useCallback(() => {
    setShowCarousel(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showCarousel) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
        case 'Escape':
          e.preventDefault()
          closeCarousel()
          break
      }
    }

    if (showCarousel) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [showCarousel, nextImage, prevImage, closeCarousel])

  if (images.length === 0) {
    return null
  }

const renderImageLayout = () => {
  const ImageComponent = ({
    src,
    index,
    className = '',
    aspectRatio,
    heightClass = '',
    width = 800,
    height = 600,
  }: {
    src: string
    index: number
    className?: string
    aspectRatio?: string
    heightClass?: string
    width?: number
    height?: number
  }) => (
    <div className={`${aspectRatio || ''} overflow-hidden cursor-pointer group ${className}`}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={`Gallery image ${index + 1}`}
        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${heightClass}`}
        onClick={() => openCarousel(index)}
        priority={index === 0}
      />
    </div>
  )

  if (images.length === 1) {
    return (
      <div className="rounded-xl overflow-hidden">
        <ImageComponent
          src={images[0]}
          index={0}
          heightClass="h-60 sm:h-74 xl:h-[450px]"
          width={800}
          height={400}
        />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-xl overflow-hidden">
        {images.map((img, i) => (
          <ImageComponent
            key={i}
            src={img}
            index={i}
            heightClass="h-60 sm:h-74 xl:h-[450px]"
            width={400}
            height={400}
          />
        ))}
      </div>
    )
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 rounded-xl overflow-hidden">
        <ImageComponent
          src={images[0]}
          index={0}
          heightClass="h-60 sm:h-74 xl:h-[450px]"
          width={400}
          height={400}
        />
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {images.slice(1, 3).map((img, i) => (
            <ImageComponent
              key={i}
              src={img}
              index={i + 1}
              heightClass="h-28 sm:h-36 xl:h-[220px]"
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
          <ImageComponent
            src={images[0]}
            index={0}
            heightClass="h-60 sm:h-74 xl:h-[450px]"
            width={400}
            height={400}
          />
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
          {images.slice(1, 4).map((img, i) => (
            <ImageComponent
              key={i}
              src={img}
              index={i + 1}
              heightClass="h-28 sm:h-36 xl:h-[145px]"
              width={400}
              height={145}
            />
          ))}
        </div>
      </div>
    )
  }

  // 5+ images
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-xl overflow-hidden">
      <div className="lg:col-span-2">
        <ImageComponent
          src={images[0]}
          index={0}
          heightClass="h-60 sm:h-74 xl:h-[450px]"
          width={400}
          height={400}
        />
      </div>

      {[images.slice(1, 3), images.slice(3, 5)].map((group, groupIndex) => (
        <div key={groupIndex} className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          {group.map((img, i) => {
            const imageIndex = groupIndex * 2 + i + 1
            const isLastImage = groupIndex === 1 && i === 1 && images.length > 5
            return (
              <div
                key={i}
                className="relative overflow-hidden cursor-pointer group"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${imageIndex + 1}`}
                  width={650}
                  height={400}
                  className="w-full h-28 sm:h-36 xl:h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => openCarousel(imageIndex)}
                />
                {isLastImage && (
                  <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-black/60 transition-all duration-300"
                    onClick={() => openCarousel(imageIndex)}
                  >
                    <span className="text-white text-4xl font-semibold">
                      +{images.length - 5}
                    </span>
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
      {renderImageLayout()}

      {/* Carousel Modal */}
      {showCarousel && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
              <h3 className="text-white text-xl font-semibold">{title}</h3>
              <button
                onClick={closeCarousel}
                className="p-2 rounded-full cursor-pointer bg-white/20 hover:bg-white/30 transition-all duration-300"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <div
              className="relative w-full max-w-6xl mx-auto"
              style={{ height: 'calc(100vh - 200px)' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={images[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
              {/* Image Counter */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-white font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="flex justify-center">
                  <div className="flex space-x-2 max-w-4xl overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 cursor-pointer w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-white shadow-lg'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Keyboard Navigation Hint */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 text-white/60 text-sm">
                Use ← → keys to navigate • ESC to close
              </div>
            )}

            {/* Click outside to close */}
            <div
              className="absolute inset-0 z-10 "
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeCarousel()
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
