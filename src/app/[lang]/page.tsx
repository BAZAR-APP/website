// "use client"
import {
  BannerSection,
  ChaletsCard,
  ChatHero,
  DestinationSection,
  DownloadApp,
  Footer,
  LuxuryExperience,
  RewardsSection,
  WhyBookSection,
} from '@/components'
import { getMessages } from '@/lib/i18n'
import { Locale } from '../../../i18n.config'

export default async function Home({ params }: { params: { lang: string } }) {

  const { lang } = await params;
  const messages = getMessages(lang as Locale);

  return (
    <div className="max-w-xxl mx-auto">
      <BannerSection messages={messages} lang={lang} />
      <LuxuryExperience
        title="Escape to luxury and comfort at Bazar"
        thumbnails={[
          '/images/LuxuryImage1.jpg',
          '/images/LuxuryImage2.jpg',
          '/images/LuxuryImage3.jpg',
          '/images/LuxuryImage4.jpg',
          '/images/LuxuryImage5.jpg',
        ]}
        description={`where breathtaking views meet world-class hospitality. Whether you're seeking a relaxing retreat or an adventure by the sea, our chalets offer the perfect getaway.`}
        buttonText={'More About Us'}
      />
      <WhyBookSection />
      <DestinationSection />
      <div className="flex flex-col gap-[100px] md:px-16 max-md:px-5">
        <ChaletsCard title={'Most Booked'} queryKey={'most-booked'} endpoint={'/chalets/mostBooked'}/>
        <ChaletsCard title={'Close to the Beach'} queryKey={'sea-views'} endpoint={'/chalets/viewType'}/>
      </div>
      <RewardsSection />
      <ChatHero />
      <DownloadApp />
      <Footer />
    </div>
  )
}
