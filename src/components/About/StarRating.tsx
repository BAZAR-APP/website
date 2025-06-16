// components/StarRating.tsx
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
    rating: number;
    totalStars?: number;
    className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5,   className = ""  }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (

        <div className={`flex mb-4 ${className}`}>  
            {Array.from({ length: totalStars }, (_, index) => {
                if (index < fullStars) {
                    return <Star key={index} fill="#FBBF24" strokeWidth={0} />;
                } else if (index === fullStars && hasHalfStar) {
                    return <StarHalf key={index} fill="#FBBF24" strokeWidth={0} />;
                } else {
                    return <Star key={index} fill="#fff" strokeWidth={0} />;
                }
            })}
        </div>

    );
};

export default StarRating;