import Image from 'next/image';
import React from 'react';

interface CityCardProps {
    imageUrl: string;
    cityName: string;
    altText?: string;
}

const CityCard: React.FC<CityCardProps> = ({
    imageUrl,
    cityName,
    altText = ""
}) => {
    return (
        <article className="flex flex-col items-start overflow-hidden rounded-3xl w-full">
            <Image
                src={imageUrl}
                alt={altText}
                className="h-48 sm:h-56 md:h-64 w-full object-cover"
                width={256}
                height={192}
            />
            <div className="w-full text-white text-sm sm:text-base font-normal leading-6 gap-2 bg-[#29397E] px-4 py-4 sm:py-5 md:py-6">
                {cityName}
            </div>
        </article>
    );
};

export default CityCard;
