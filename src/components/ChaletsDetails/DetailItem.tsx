// components/ChaletsDetails/DetailItem.tsx
import Image from 'next/image'

interface DetailItemProps {
  icon: string
  text: string
  alt?: string
}

const DetailItem = ({ icon, text, alt = 'Detail icon' }: DetailItemProps) => (
  <div className="flex items-center gap-2">
    <Image src={icon} width={24} height={24} alt={alt} />
    <span className='whitespace-nowrap'>{text}</span>
  </div>
)

export default DetailItem
