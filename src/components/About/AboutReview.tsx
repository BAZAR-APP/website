'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { TestimonialCard } from '@/components'
import { ArrowLeft, ArrowLeftIcon, ArrowRight, ArrowRightIcon } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Testimonial {
  id: number
  name: string
  rating: number
  review: string
  isVerified?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Omar Al-otaibi',
    rating: 5,
    review:
      'Peaceful stay with stunning sea views, clean rooms, and perfect vibes for a weekend escape.',
    isVerified: false,
  },
  {
    id: 2,
    name: 'Omar Al-otaibi',
    rating: 5,
    review:
      'Peaceful stay with stunning sea views, clean rooms, and perfect vibes for a weekend escape.',
    isVerified: true,
  },
  {
    id: 3,
    name: 'Ahmed Hashim',
    rating: 5,
    review:
      'Loved the private beach access, cozy setup, and relaxing atmosphere. Perfect for a romantic getaway.',
    isVerified: true,
  },
  {
    id: 4,
    name: 'Fahd Al-Kasem',
    rating: 5,
    review:
      'Ideal location, smooth check-in, and stunning sea view from every corner. Totally worth it!',
    isVerified: true,
  },
  {
    id: 5,
    name: 'Omar Al-otaibi',
    rating: 3,
    review:
      'Peaceful stay with stunning sea views, clean rooms, and perfect vibes for a weekend escape.',
    isVerified: false,
  },
]

const TestimonialsSection: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  const handlePrevious = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  return (
    <section className="flex flex-col">
      <div className="items-center flex w-full flex-col overflow-hidden bg-white pt-16 max-md:max-w-full">
        <div className="w-full max-w-screen-xl px-16 max-md:max-w-full max-md:px-5">
          <header className="flex w-full gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
            <div className="min-w-60 flex-1 shrink basis-[0%] max-w-screen-md max-md:max-w-full">
              <h2 className="text-[#19191A] w-full text-[39px] font-semibold max-md:text-[32px]">
                What Our Guests Say
              </h2>
              <p className="text-[#484A4C] text-xl font-normal leading-7 mt-5 max-md:max-w-full">
                Real experiences from guests who've stayed and loved it. Here's what they had to
                say.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="aspect-[1] w-6 h-6 flex items-center justify-center !cursor-pointer rounded transition-colors"
                aria-label="Previous testimonials"
              >
                <ArrowLeftIcon size={30} className="text-primary-blue !cursor-pointer" />
              </button>
              <button
                onClick={handleNext}
                className="aspect-[1] w-6 h-6 flex items-center justify-center !cursor-pointer rounded transition-colors"
                aria-label="Next testimonials"
              >
                <ArrowRightIcon size={30} className="text-primary-blue !cursor-pointer" />
              </button>
            </div>
          </header>
        </div>
      </div>
      <div className="">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 1000, // time in ms
            disableOnInteraction: false, // continues autoplay after user interaction
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial) => (
            <SwiperSlide key={testimonial.id + Math.random()} className="mb-16 mt-10 px-4 md:px-0">
              <TestimonialCard
                name={testimonial.name}
                rating={testimonial.rating}
                review={testimonial.review}
                isVerified={testimonial.isVerified}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
export default TestimonialsSection
