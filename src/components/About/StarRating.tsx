// components/StarRating.tsx
import React from 'react'
import { Star, StarHalf } from 'lucide-react'

interface StarRatingProps {
  rating: number
  totalStars?: number
  className?: string
  onChange?: (value: number) => void
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, onChange }) => {
  return (
    <div className="flex gap-1 pb-5 pt-2 cursor-pointer">
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1
        const isFull = starValue <= rating
        const isHalf = !isFull && starValue - 0.5 === rating

        return (
          <div key={index} onClick={() => onChange?.(starValue)}>
            {isFull ? (
              <Star fill="#FBBF24" strokeWidth={0} />
            ) : isHalf ? (
              <StarHalf fill="#FBBF24" strokeWidth={0} />
            ) : (
              <Star fill="#fff" stroke="#FBBF24" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StarRating
