import Image from 'next/image'
import Points from '../../../public/images/Points.svg'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import DetailItem from './DetailItem'
import { Badge, ViewType } from '../../../types/chalets'
import { capitalizeWords } from '@/lib/utils'

interface PropertyDetailsProps {
  description: string
  title: string
  maxGuests: string
  bedrooms: string
  beds: string
  bathrooms: string
  points: number
  trustedByPlatform: boolean
  badge: Badge | undefined
  isFamilyFriendlyOnly: boolean | undefined
  viewTypes: ViewType[] | undefined
}

const PropertyDetails = ({
  title = '',
  description = '',
  bedrooms,
  beds,
  bathrooms,
  points,
  trustedByPlatform = false,
  badge,
  isFamilyFriendlyOnly = false,
  viewTypes = [],
}: PropertyDetailsProps) => {
  return (
    <section className="border-b border-[#E5E7EB] pb-8">
      <div className="flex items-center flex-wrap pb-3 gap-3">
        <h1 className="text-xl sm:text-[22px] md:text-[25px] font-semibold text-[#19191A]">
          {title}
        </h1>
        <div className="flex bg-[#E1F3FF] items-center justify-between gap-1 rounded py-1 px-1.5 max-w-[110px]">
          <Image src={Points} width={16} height={16} alt="Points Icon" />
          <span className="text-[#29397E] text-sm">{points} Points</span>
        </div>
      </div>

      <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-2 border-b border-[#E5E7EB] pb-6 pt-1">
        {trustedByPlatform && (
          <p className="flex items-center gap-1.5">
            <Image src="/images/Trust.svg" width={24} height={24} alt="Trust icon" />
            <span className="sm:text-[16px] text-sm sm:leading-5 leading-3.5 text-[#19191A]">
              This Chalet is trusted by our platform
            </span>
          </p>
        )}
        <Flex align="center" gap="2" className="cursor-pointer sm:mt-0 mt-1">
          <Text className="text-sm leading-4 text-[#484A4C]">Hosted By</Text>
          <Avatar size="2" radius="full" fallback="FA" src="/images/Image.svg" />
          <Text className="text-[16px] leading-6 font-medium text-[#19191A]">Omar Fayed</Text>
        </Flex>
      </div>

      {badge?.id && (
        <div className="flex flex-row items-center px-4 py-3 gap-2 md:mt-8 mt-6 bg-[#FDFDFE] border border-[#E5E5EA] rounded-[20px]">
          <Image src="/images/Host.svg" width={47} height={47} alt="Host icon" />
          <div className="flex flex-col gap-2">
            <h4 className="text-sm leading-4 font-medium text-[#19191A]">{badge?.title}</h4>
            <p className="text-[12px] leading-[15px] font-normal text-[#19191A]">
              {badge?.description}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-6 text-[#19191A] md:text-[16px] text-sm leading-[20px] pt-3">
        {viewTypes?.map((viewType: ViewType) => (
          <DetailItem
            icon={viewType?.iconPhotoId}
            text={capitalizeWords(viewType?.title)}
            key={viewType?.id}
            alt={viewType?.title}
          />
        ))}
        <DetailItem icon="/images/Icon.svg" text={`${beds} Beds Max`} />
        <DetailItem icon="/images/squreicon.svg" text="500 sqm²" />
        <DetailItem icon="/images/self-icon.svg" text="Self Check-in" />
        <DetailItem icon="/images/beds-svg.svg" text={`${bedrooms} Bedrooms`} />
        <DetailItem icon="/images/bath.svg" text={`${bathrooms} Bathrooms`} />
        {isFamilyFriendlyOnly && (
          <DetailItem icon="/images/family.svg" text="Family Friendly only (No Men Groups)" />
        )}
      </div>

      <p className="mt-6 text-[#484A4C] md:text-[16px] text-sm leading-[22px] xl:max-w-full max-w-full md:max-w-[630px]">
        {description}
      </p>
    </section>
  )
}

export default PropertyDetails
