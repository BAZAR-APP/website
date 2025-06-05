import { Heart, MapPin } from 'lucide-react';
import Image from 'next/image';
import Star from '../../public/images/Like.svg';
import React from 'react';

interface PropertyCardProps {
  title: string;
  location: string;
  guests: string;
  beds: string;
  baths: string;
  amenities: string[];
  rating: number;
  reviews: number;
  price: number;
  priceUnit: 'night' | 'hour';
  imageUrl: string;
  onClick?: () => void;
  member?: boolean;
  newPrice?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  guests,
  beds,
  baths,
  amenities,
  rating,
  reviews,
  price,
  priceUnit,
  imageUrl,
  onClick,
  member = false,
  newPrice,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col w-full max-w-[350px] p-4 gap-4 bg-[#F9FAFB] cursor-pointer rounded-[16px] mx-auto"
    >
      <div className="w-full h-[184px]">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[12px]"
          width={400}
          height={300}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="sm:text-xl text-lg font-normal text-[#484A4C]">{title}</h3>
          <button aria-label="Add to favorites">
            <Heart className="w-5 h-5 text-[#29397E]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center text-sm text-[#8E8E93] gap-x-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
          {member && (
            <div className="flex gap-1 items-center text-sm text-gray-700 ml-auto">
              <span className="ml-2">{rating}</span>
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          )}
        </div>

        <div className="text-sm text-[#8E8E93] leading-5">
          {guests} • Home • {beds} • {baths}
          <br />
          {amenities.join(' • ')}
        </div>

        <div className="flex items-center justify-between">
          {!member && (
            <div className="flex items-center text-sm text-gray-700">
              <Image src={Star} alt="Star" width={16} height={16} />
              <span className="ml-1">{rating}</span>
              <span className="text-gray-500 ml-1">({reviews} reviews)</span>
            </div>
          )}

          <div className="flex items-center font-medium text-[16px] leading-7 text-[#484A4C]">
            {newPrice ? (
              <>
                <span className="md:text-[14px] text-[12px] font-bold text-primary">
                  {newPrice} KD
                </span>
                <span className="md:text-[12px] text-[10px] leading-4 font-normal text-primary">
                  /{priceUnit}
                </span>
                <span className="pl-2 md:text-[12px] text-[10px] font-overline leading-4 font-bold line-through text-primary">
                  {price} KD
                </span>
              </>
            ) : (
              <>
                <span className="sm:text-[18px] text-sm">{price} KD</span>
                <span className="text-sm leading-4 font-normal text-[#484A4C]">
                  /{priceUnit}
                </span>
              </>
            )}
          </div>
        </div>

        {member && (
          <div className="flex w-[113px] py-[4px] px-[6px] gap-[4px] justify-center items-center bg-[#29397e] rounded-[6px] relative z-[29]">
            <div className="w-[12px] h-[12px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-06-04/7tnhNOS6C5.png)] bg-cover bg-no-repeat relative z-30" />
            <span className="text-[12px] font-normal text-[#fdfdfe] text-center whitespace-nowrap z-31">
              Members Only
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
