'use client'
import React from 'react'
import { ChevronRight, Shield } from 'lucide-react'
import Image from 'next/image'
import ClockIcon from '../../public/images/clock.svg'
import AlarmIcon from '../../public/images/alarm.svg'
import SecuitryIcon from '../../public/images/secuirty.svg'
import CleanIcon from '../../public/images/cleanless.svg'
import CautionIcon from '../../public/images/caution.svg'
import PoolIcon from '../../public/images/swimming-pool.svg'
import { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { Locale } from '../../i18n.config'

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
interface ChaletRuleMessages {
  title: string;
  check_in_out: {
    check_in_label: string;
    check_out_label: string;
    check_in_time: string;
    checkout_time: string;
  };
  health_standards: Array<{
    id: string;
    title: string;
  }>;
  chalet_standards: Array<{
    id: string;
    title: string;
  }>;
  cancellation_policy: {
    title: string;
    description: string;
    refund_time_estimate: string;
    show_more_button: string;
  };
}

interface Props {
  data?: ChaletRulesData // If still used
  lang: Locale
  messages: ChaletRuleMessages; // ✅ This is the type of messages.common.chalet_rules
}

const getIcon = (id: string) => {
  const icons: Record<string, StaticImageData> = {
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
  <div className="flex items-center gap-3">
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

const ChaletRules: React.FC<Props> = ({ messages, lang }) => {
  // const { title, checkInOut, healthStandards, chaletStandards, cancellationPolicy } = data
  const router = useRouter()
  return (
    <div>
      <h2 className="text-xl sm:text-[22px] md:text-[25px] md:leading-8 leading-6 font-semibold text-[#19191A] mb-4">
        {messages?.title}
      </h2>

      <section className="mb-6">
        <h3 className="text-base font-medium leading-6 text-[#19191A] mb-3">
         {lang === 'en' ? 'Chalet Check-in and out' : 'تسجيل الدخول والخروج من الشاليه' } 
        </h3>
        <div className="space-y-3">
          <InfoItem label={lang === 'en' ? 'Check-in:' : 'تحقق في' } time={messages.check_in_out.check_in_time} />
          <InfoItem label={lang === 'en' ? 'CheckOut:' : 'الدفع'} time={messages.check_in_out.check_out_label} />
        </div>
      </section>

      {[
        { id: 'health-standards', title: lang === 'en' ? 'Health Standards' : 'المعايير الصحية', items: messages.health_standards },
        { id: 'chalet-standards', title: lang === 'en' ? 'Chalet Standards' : 'معايير الشاليه', items: messages.chalet_standards },
      ].map((section) => (
        <section key={section.id} className="mb-6"> 
          <h3 className="...">{section.title}</h3>
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
            {messages.cancellation_policy.title}
          </h3>
        </div>
        <p className="text-base font-normal leading-[19px] text-[#484A4C] py-3">
          {messages.cancellation_policy.description}
        </p>

        <p className="text-sm bg-[#FCE7F3] text-[#EC4899] font-normal max-w-[277px] rounded-md px-1.5 py-1">
          {messages.cancellation_policy.refund_time_estimate}
        </p>

        <div
          className="pt-3.5 flex gap-2 items-center"
          onClick={() => router.push('/cancellation-policy')}
        >
          <button className="text-base font-medium leading-6 text-[#19191A] underline underline-offset-2 cursor-pointer">
           {lang === 'en' ? 'show more' : 'عرض المزيد'} 
          </button>
          <ChevronRight className="w-3 h-3" strokeWidth={3} />
        </div>
      </section>
    </div>
  )
}

export default ChaletRules
