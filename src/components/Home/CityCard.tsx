
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
        <article className="flex w-[300px] flex-col items-start overflow-hidden rounded-3xl max-md:w-[calc(50%_-_10px)] max-sm:w-full">
            <img
                src={imageUrl}
                alt={altText}
                className="h-[200px] w-full object-cover"
            />
            <div className="w-full text-white text-base font-normal leading-6 gap-2 box-border bg-[#29397E] px-4 py-6 max-sm:px-4 max-sm:py-5">
                {cityName}
            </div>
        </article>
    );
};

export default CityCard;