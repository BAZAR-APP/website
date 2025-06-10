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
      <div className="flex items-center gap-2 mb-6 text-xl sm:text-[22px] md:text-[25px]">
        <span className="font-semibold text-[#19191A]">{rating}</span>
        <Image src={LikeStar} width={23} height={23} alt="Like Star" />
        <span className="font-semibold">·</span>
        <span className="font-semibold">{reviewCount} reviews</span>
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
                  <Text as="p" size="3" className='text-[#19191A]' weight="medium">
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
                      width={14}
                      height={14}
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
              className="lg:!text-[16px] text-sm leading-relaxed text-[#19191A] pt-4 md:max-w-[70%] w-[100%]"
            >
              {review.comment}
            </Text>
          </div>
        ))}
        <Link className="flex text-[14px] items-center gap-1" href="">
          <span className="border-b-1 border-[#19191A] text-[#19191A] font-semibold">Show more</span>{' '}
          <ChevronRight className="w-4 h-4" strokeWidth={3} />
        </Link>
        <Button
          intent="transperent"
          size='sm'
          className="cursor-pointer border border-[#19191A] text-sm font-medium sm:max-w-[170px] w-full "
        >
          Show all 200 reviews
        </Button>
      </div>
    </section>
  )
}

export default ReviewsSection
