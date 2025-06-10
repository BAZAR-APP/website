import { Header, SearchHeader } from '@/components'

const BannerSection = () => {
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
      <Header isLoggedIn={false} className='bg-transparent' />
      <div
        style={{
          backgroundImage: "url('/images/ImageBannerCard.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          margin: 'auto',
          width: '90%',
          marginBottom: '32px',
        }}
        className="flex flex-col justify-center items-center rounded-[20px] md:rounded-[60px] h-auto min-[768px]:h-[440px] min-[1440px]:h-[640px]"
      >
        <div className="max-w-[80%] flex flex-col gap-[80px]">
          <div className="text-2xl min-[1279px]:text-[48px] text-white font-[500] text-center pt-4 md: pt-0 max-w-[800px]">
            Where Will Your Next Adventure Take You?
          </div>
        </div>
        <div className='py-[32px] min-[1440px]:py-[64px] max-w-[95%] mx-2 lg:max-w-[848px] w-full'>
          <SearchHeader />
        </div>
      </div>
    </div>
  )
}

export default BannerSection
