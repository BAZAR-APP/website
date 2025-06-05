import React from 'react'
import { ChevronRight, Shield } from 'lucide-react'
import Image from 'next/image'
import ClockIcon from '../../public/images/clock.svg'
import AlarmIcon from '../../public/images/alarm.svg'
import SecuitryIcon from '../../public/images/secuirty.svg'
import CleanIcon from '../../public/images/cleanless.svg'
import CautionIcon from '../../public/images/caution.svg'
import PoolIcon from '../../public/images/swimming-pool.svg'
import { chaletRules } from '@/lib/constant'

interface CheckInOut {
  checkIn: string
  checkout: string
}

interface Standard {
  id: string
  title: string
  description?: string
}

interface CancellationPolicy {
  title: string
  description: string
  refundTimeEstimate: string
  details?: string[]
}

interface ChaletRulesData {
  title: string
  checkInOut: CheckInOut
  healthStandards: Standard[]
  chaletStandards: Standard[]
  cancellationPolicy: CancellationPolicy
}

interface Props {
  data?: ChaletRulesData
}

const getIcon = (id: string) => {
  const icons: Record<string, any> = {
    'smoke-alarm': AlarmIcon,
    'security-deposit': SecuitryIcon,
    cleanliness: CleanIcon,
    'pool-rules': PoolIcon,
  }
  return icons[id] ? (
    <Image src={icons[id]} width={24} height={24} alt={id} />
  ) : (
    <Shield className="w-5 h-5 text-gray-600" />
  )
}

const StandardItem: React.FC<{ item: Standard }> = ({ item }) => (
  <div className="flex items-start gap-3">
    {getIcon(item.id)}
    <span className="text-base font-normal leading-[19px] text-[#19191A]">{item.title}</span>
  </div>
)

const InfoItem: React.FC<{ label: string; time: string }> = ({ label, time }) => (
  <div className="flex items-center gap-3">
    <Image src={ClockIcon} width={24} height={24} alt="Clock" />
    <span className="text-base font-normal leading-5 text-[#19191A]">
      <span>{label}</span> {time}
    </span>
  </div>
)

const ChaletRules: React.FC<Props> = ({ data = chaletRules as ChaletRulesData }) => {
  const { title, checkInOut, healthStandards, chaletStandards, cancellationPolicy } = data

  return (
    <div className="py-8 mt-9 border-t border-[#E5E7EB]">
      <h2 className="lg:text-2xl md:text-xl text-lg md:leading-8 leading-6 font-semibold text-[#19191A] mb-4">{title}</h2>

      <section className="mb-6">
        <h3 className="text-base font-medium leading-6 text-[#19191A] mb-3">
          Chalet Check-in and out
        </h3>
        <div className="space-y-3">
          <InfoItem label="Check-in:" time={checkInOut.checkIn} />
          <InfoItem label="Checkout:" time={checkInOut.checkout} />
        </div>
      </section>

      {[
        { title: 'Health Standards', items: healthStandards },
        { title: 'Chalet Standards', items: chaletStandards },
      ].map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="text-base font-medium leading-6 text-[#19191A] mb-3">{section.title}</h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <StandardItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}

      <section className="bg-[#FFFBEB] rounded-2xl p-4 md:max-w-[520px] max-w-full">
        <div className="flex items-center gap-3">
          <Image src={CautionIcon} width={24} height={24} alt="Caution" />
          <h3 className="text-base font-medium leading-6 text-[#19191A]">
            {cancellationPolicy.title}
          </h3>
        </div>
        <p className="text-base font-normal leading-[19px] text-[#484A4C] py-3">
          {cancellationPolicy.description}
        </p>

        <p className="text-sm bg-[#FCE7F3] text-[#EC4899] font-medium max-w-[277px] rounded-md px-1.5 py-1">
          {cancellationPolicy.refundTimeEstimate}
        </p>

        <div className="pt-3.5 flex gap-2 items-center">
          <button className="text-base font-medium leading-6 text-[#19191A] underline cursor-pointer">
            Show more
          </button>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={3} />
        </div>
      </section>
    </div>
  )
}

export default ChaletRules
