import { ChatHero, DestinationSection, LuxuryExperience } from '@/components'


export default function Home() {
  return (
    <>

      <LuxuryExperience
        title="Escape to luxury and comfort at Bazar"
        thumbnails={[
          "/images/LuxuryImage1.jpg",
          "/images/LuxuryImage2.jpg",
          "/images/LuxuryImage3.jpg",
          "/images/LuxuryImage4.jpg",
          "/images/LuxuryImage5.jpg",

        ]} description={`where breathtaking views meet world-class hospitality. Whether you're seeking a relaxing retreat or an adventure by the sea, our chalets offer the perfect getaway.`} buttonText={'More About Us'} buttonLink={''} />

      <DestinationSection />
      <ChatHero />
    </>
  )
}
