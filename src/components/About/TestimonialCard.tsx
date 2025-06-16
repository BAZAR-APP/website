import React from 'react';
import { StarRating } from "@/components"
import Image from 'next/image';

interface TestimonialCardProps {
    name: string;
    rating: number;
    review: string;
    isVerified?: boolean;
    className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    name,
    rating,
    review,
    isVerified = false,
    className = ""
}) => {
    return (
        <article className={`bg-gray-50 rounded-3xl p-6 w-full mx-auto`}>
            <div className="flex min-w-60 w-full justify-between flex-1 shrink basis-[0%]">
                <div className="flex min-w-60 w-full flex-col items-stretch flex-1 shrink basis-[0%]">
                    <div className="flex w-full flex-col items-stretch mt-[15px]">
                        <StarRating rating={rating} />
                        <div className="flex items-center gap-1 text-base text-[#19191A] font-bold">
                            <span className="self-stretch my-auto">
                                {name}
                            </span>
                            {isVerified && (
                                <Image src="/images/greenTick.svg" alt="" width={20} height={20} />
                            )}
                        </div>
                        <p className="text-[#484A4C] text-sm font-normal mt-2">
                            {review}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default TestimonialCard