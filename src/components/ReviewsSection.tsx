'use client'
import { Avatar, Text } from '@radix-ui/themes'
import { ChevronRight, User } from 'lucide-react'
import LikeStar from '../../public/images/Like.svg'
import UnlikeStar from '../../public/images/Unlike.svg'
import Image from 'next/image'
import Button from './Button/Button'
import { useQueryBase } from '@/lib/axios'
import { useParams } from 'next/navigation'
import { Review, ReviewsResponse } from '../../types/chalets'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

interface ReviewsSectionProps {
  rating: number
}

const ReviewsSection = ({ rating }: ReviewsSectionProps) => {
  const { id } = useParams() as { id: string }
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)

  const { data: reviewsList } = useQueryBase({
    queryKey: ['reviewsList', page],
    url: `/chalets/review/readByChaletId/${id}?page=${page}`,
    cacheTime: 0,
    staleTime: 0,
  })

  const reviewsResponse = reviewsList?.data as ReviewsResponse
  const total = reviewsResponse?.total || 0
  const totalPages = Math.ceil(total / reviewsResponse?.limit || 1)

  // Append reviews on each page fetch
  useEffect(() => {
    if (reviewsResponse?.data?.length) {
      setAllReviews((prev) => [...prev, ...reviewsResponse.data])
    }
  }, [reviewsResponse])

  const handleShowMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <section className="border-b border-t border-[#E5E7EB] pb-8 md:pt-8 pt-6 lg:mt-0 mt-10">
      <div className="flex items-center gap-2 mb-6 text-xl sm:text-[22px] md:text-[25px]">
        <span className="font-semibold text-[#19191A]">{rating}</span>
        <Image src={LikeStar} width={23} height={23} alt="Like Star" />
        <span className="font-semibold">·</span>
        <span className="font-semibold">{total} reviews</span>
      </div>

      <div className="flex flex-col gap-5">
        {allReviews.length > 0 ? (
          allReviews.map((review, index) => (
            <div key={index}>
              <div className="flex items-center gap-4">
                <Avatar
                  src={review?.user?.photoURL ?? '/images/Image.svg'}
                  fallback={<User className="w-4 h-4 text-gray-500" />}
                  size="4"
                  radius="full"
                  className="bg-gray-200"
                />
                <div>
                  <div className="mb-1">
                    <Text as="p" size="3" className="text-[#19191A]" weight="medium">
                      {review?.user?.fullName}
                    </Text>
                    <Text as="p" size="2" className="text-[#9EA0A2] text-sm">
                      {format(new Date(review.createdAt), 'MMMM yyyy')}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Number(review.rating) }).map((_, i) => (
                      <Image
                        key={`like-${i}`}
                        src={LikeStar}
                        width={14}
                        height={14}
                        alt="Like Star"
                      />
                    ))}
                    {Array.from({ length: 5 - Number(review.rating) }).map((_, i) => (
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
                {review?.reviewText}
              </Text>
            </div>
          ))
        ) : (
          <Text className="text-gray-500 italic">No reviews found.</Text>
        )}

        {page < totalPages && (
          <Button
            onClick={handleShowMore}
            intent="transperent"
            size="sm"
            className="cursor-pointer border border-[#19191A] text-sm font-medium sm:max-w-[170px] w-full"
          >
            Show more
          </Button>
        )}

        {total > 0 && (
          <Text className="text-xs text-gray-500 text-right">
            Showing {allReviews.length} of {total} reviews
          </Text>
        )}
      </div>
    </section>
  )
}

export default ReviewsSection
