import Image from 'next/image'
import Points from '../../../public/images/Points.svg'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import DetailItem from './DetailItem'

interface PropertyDetailsProps {
  description: string
  title: string
  maxGuests: number
  bedrooms: number
  beds: number
  bathrooms: number
  points: number
}

const PropertyDetails = ({
  title,
  description,
  maxGuests,
  bedrooms,
  beds,
  bathrooms,
  points,
}: PropertyDetailsProps) => {
  return (
    <section className="border-b border-[#E5E7EB] pb-8">
      <div className="flex items-center pb-3 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#19191A]">{title}</h1>
        <div className="flex bg-[#E1F3FF] items-center justify-between gap-1 rounded py-1 px-1.5 max-w-[101px]">
          <Image src={Points} width={16} height={16} alt="Points Icon" />
          <span className="text-[#29397E] text-sm">{points} Points</span>
        </div>
      </div>

      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-2 border-b border-[#E5E7EB] pb-5">
        <p className="flex items-center gap-1.5">
          <Image src="/images/Trust.svg" width={24} height={24} alt="Trust icon" />
          <span className="text-[16px] leading-5 text-[#19191A]">
            This Chalet is trusted by our platform
          </span>
        </p>
        <Flex align="center" gap="2" className="cursor-pointer">
          <Text className="text-sm leading-4 text-[#484A4C]">Hosted By</Text>
          <Avatar size="2" radius="full" fallback="FA" src="/images/Image.svg" />
          <Text className="text-[16px] leading-6 font-medium text-[#19191A]">Omar Fayed</Text>
        </Flex>
      </div>

      <div className="flex flex-row items-center px-4 py-3 gap-2 md:mt-8 mt-6 bg-[#FDFDFE] border border-[#E5E5EA] rounded-[20px]">
        <Image src="/images/Host.svg" width={47} height={47} alt="Host icon" />
        <div className="flex flex-col gap-2">
          <h4 className="text-sm leading-4 font-medium text-[#19191A]">Top Host</h4>
          <p className="text-[12px] leading-[15px] font-normal text-[#19191A]">
            Consistently rated 5 stars by guests for hospitality and responsiveness.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-6 text-[#19191A] text-[15px] leading-[20px] pt-3">
        <DetailItem icon="/images/cityicon.svg" text="City View" />
        <DetailItem icon="/images/Icon.svg" text={`${beds} Beds Max`} />
        <DetailItem icon="/images/squreicon.svg" text="500 sqm²" />
        <DetailItem icon="/images/self-icon.svg" text="Self Check-in" />
        <DetailItem icon="/images/beds-svg.svg" text={`${bedrooms} Bedrooms`} />
        <DetailItem icon="/images/bath.svg" text={`${bathrooms} Bathrooms`} />
        <DetailItem icon="/images/family.svg" text="Family Friendly only (No Men Groups)" />
      </div>

      <p className="mt-6 text-[#484A4C] text-[15px] leading-[22px] md:max-w-[630px]">{description}</p>
    </section>
  )
}

export default PropertyDetails
