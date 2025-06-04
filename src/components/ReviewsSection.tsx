'use client'
import { Avatar, Text } from '@radix-ui/themes'
import { ChevronRight, User } from 'lucide-react'
import LikeStar from '../../public/images/Like.svg'
import UnlikeStar from '../../public/images/Unlike.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button/Button'
import { reviews } from '@/lib/constant'

interface ReviewsSectionProps {
  rating: number
  reviewCount: number
}

const ReviewsSection = ({ rating, reviewCount }: ReviewsSectionProps) => {
  return (
    <section className="border-b border-t border-[#E5E7EB] pb-8 md:pt-8 pt-6 lg:mt-0 mt-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl font-semibold">{rating}</span>
        <Image src={LikeStar} width={20} height={20} alt="Like Star" />
        <span className="text-xl font-semibold">·</span>
        <span className="text-xl font-semibold">{reviewCount} reviews</span>
      </div>

      <div className="flex flex-col gap-5">
        {reviews.map((review, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <Avatar
                src="/images/Image.svg"
                fallback={<User className="w-4 h-4 text-gray-500" />}
                size="4"
                radius="full"
                className="bg-gray-200"
              />

              <div>
                <div className="mb-1">
                  <Text as="p" size="3" weight="medium">
                    {review.name}
                  </Text>
                  <Text as="p" size="2" className='text-[#9EA0A2] text-sm'>
                    {review.date}
                  </Text>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Image
                      key={`like-${i}`}
                      src={LikeStar}
                      width={18}
                      height={18}
                      alt="Like Star"
                    />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Image
                      key={`unlike-${i}`}
                      src={UnlikeStar}
                      width={18}
                      height={18}
                      alt="Unlike Star"
                    />
                  ))}
                </div>
              </div>
            </div>
            <Text
              as="p"
              size="2"
              className="leading-relaxed text-[#19191A] pt-4 md:max-w-[70%] w-[100%]"
            >
              {review.comment}
            </Text>
          </div>
        ))}
        <Link className="flex text-[14px] items-center gap-1" href="">
          <span className="border-b-1 border-[#19191A]">Show more</span>{' '}
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
        </Link>
        <Button
          intent="transperent"
          className="cursor-pointer border border-[#19191A] text-sm font-medium sm:w-[200px] w-full "
        >
          Show all 200 reviews
        </Button>
      </div>
    </section>
  )
}

export default ReviewsSection
