'use client'
import { Header, SearchHeader } from '@/components'

interface BannerSectionProps {
  lang: string
  messages: {
    banner: {
      banner_title: string
    }
    searchHeader: {
      location: string
      check_in: string
      check_out: string
      guests: string
      placeholder_location: string
      placeholder_check_in: string
      placeholder_check_out: string
      placeholder_guests: string
      locations: {
        al_khobar: string
        brasiler: string
        al_jubail: string
        zour: string
        fahaheel: string
        abu_al_hasaniya: string
        al_mangaf: string
      }
    }
  }
}

const BannerSection = ({ messages, lang }: BannerSectionProps) => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/HomeBanner.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: 'auto',
        paddingBottom: '32px',
      }}
    >
      <Header isLoggedIn={false} className="bg-transparent" />
      <div
        style={{
          backgroundImage: "url('/images/ImageBannerCard.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: 'auto',
          marginBottom: '32px',
        }}
        className="flex flex-col justify-center items-center 2xl:w-[93%] w-[90%] rounded-[20px] md:rounded-[60px] h-auto min-[768px]:h-[440px] min-[1440px]:h-[640px]"
      >
        <div className="max-w-[80%] flex flex-col gap-[80px]">
          <div className="text-2xl min-[1279px]:text-[48px] text-white font-[500] text-center pt-4 md:pt-0 max-w-[800px]">
            {messages.banner.banner_title}
          </div>
        </div>
        <div className="py-[32px] min-[1440px]:py-[64px] max-w-[95%] mx-2 lg:max-w-[848px] w-full">
          <SearchHeader messages={messages.searchHeader} lang={lang} />
        </div>
      </div>
    </div>
  )
}

export default BannerSection
