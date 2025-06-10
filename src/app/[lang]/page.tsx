import { getDictionary } from '@/lib/dictionary'
import { Locale } from '../../../i18n.config'
import { BannerSection, ChaletsCard, ChatHero, DestinationSection, DownloadApp, Footer, LuxuryExperience, RewardsSection, WhyBookSection } from '@/components'



export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const { page } = await getDictionary(lang)



  return (
    <>
      <BannerSection />
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
        buttonLink={'/about'}
      />
      <WhyBookSection />
      <DestinationSection />
      <div className='flex flex-col gap-[100px]'>
        <ChaletsCard title={'Most Booked'} />
        <ChaletsCard title={'Close to the Beach'} />
      </div>
      <RewardsSection />
      <ChatHero />
      <DownloadApp />
      <Footer />
    </>
  )
}
