import {
  DownloadApp,
  EarningPoints,
  HowItWork,
  JoinUs,
  LoyaltyBannerSection,
  LoyaltyTiers,
  SavingSection,
} from '@/components'
import { getMessages } from '@/lib/i18n'
import { Locale } from '../../../../../../i18n.config'

export default async function LoyaltyProgram({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const messages = getMessages(lang)
  return (
    <div className="max-w-xxl">
      <LoyaltyBannerSection />
      <HowItWork />
      <LoyaltyTiers />
      <JoinUs />
      <EarningPoints />
      <SavingSection />
      <DownloadApp messages={messages.downloadApp} />
    </div>
  )
}
