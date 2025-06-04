import React from 'react';
import { CheckCircle } from 'lucide-react';

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
        <article className={`content-start flex-wrap flex min-w-60 overflow-hidden w-[400px] bg-gray-50 p-6 rounded-[20px] max-md:px-5 ${className}`}>
            <div className="flex min-w-60 w-full justify-between flex-1 shrink basis-[0%]">
                <div className="flex min-w-60 w-full flex-col items-stretch flex-1 shrink basis-[0%]">
                    <div className="flex w-full flex-col items-stretch mt-[15px]">
                        <div className="flex items-center gap-1 text-base text-[#19191A] font-bold">
                            <span className="self-stretch my-auto">
                                {name}
                            </span>
                            {isVerified && (
                                <CheckCircle
                                    size={24}
                                    className="text-blue-500 self-stretch shrink-0 my-auto"
                                    aria-label="Verified reviewer"
                                />
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