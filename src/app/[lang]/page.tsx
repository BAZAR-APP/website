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

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {

  const { lang } = await params;
  const messages = getMessages(lang);

  return (
    <div className="max-w-xxl mx-auto">
      <BannerSection messages={messages} lang={lang} />
      <LuxuryExperience
        title={messages?.luxuryExperience.title}
        thumbnails={[
          '/images/LuxuryImage1.jpg',
          '/images/LuxuryImage2.jpg',
          '/images/LuxuryImage3.jpg',
          '/images/LuxuryImage4.jpg',
          '/images/LuxuryImage5.jpg',
        ]}
        description={messages?.luxuryExperience.description}
        buttonText={messages?.luxuryExperience.button_text}
        testimonial={messages?.luxuryExperience.testimonial}
        full_testimonial={messages?.luxuryExperience.full_testimonial}
      />
      <WhyBookSection messages={messages?.whyBookSection} />
      <DestinationSection messages={messages?.destinationSection} />
      <div className="flex flex-col gap-[100px] md:px-16 max-md:px-5">
        <ChaletsCard title={messages?.chaletsCard.most_booked} queryKey={'most-booked'} endpoint={'/chalets/mostBooked'} lang={lang} />
        <ChaletsCard title={messages?.chaletsCard.close_to_beach} queryKey={'sea-views'} endpoint={'/chalets/viewType'} lang={lang} />
      </div>
      <RewardsSection
        title={messages?.rewardsSection.title}
        description={messages?.rewardsSection.description}
        buttonText={messages?.rewardsSection.button_text}
      />
      <ChatHero messages={messages?.chatHero} />
      <DownloadApp messages={messages?.downloadApp} />
      <Footer messages={messages?.footer} />
    </div>
  )
}
