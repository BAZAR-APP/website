import Image from 'next/image'
import Points from '../../../public/images/Points.svg'
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
          <Image src={Points} width={16} height={16} alt="Points-Icon" />
          <span className="text-[#29397E] text-sm">{points} Points</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center border-b border-[#E5E7EB] pb-7 text-[#19191A] text-sm gap-x-2 gap-y-1 mb-6">
        <span>{maxGuests} guests</span>
        <span>•</span>
        <span>{bedrooms} bedrooms</span>
        <span>•</span>
        <span>{beds} beds</span>
        <span>•</span>
        <span>{bathrooms} bathrooms</span>
      </div>

      <p className="text-[#484A4C] leading-relaxed pt-1">{description}</p>
    </section>
  )
}

export default PropertyDetails
