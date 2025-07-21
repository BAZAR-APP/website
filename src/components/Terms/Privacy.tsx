import { useCmsContentQuery } from '@/lib/hooks/useCmsContentQuery'

const Privacy = () => {
  const { data } = useCmsContentQuery('privacyPolicy')
  return (
    <div className="flex flex-col gap-10 items-start bg-white relative overflow-hidden mx-auto px-6 py-12 md:px-16 md:py-16 sm:gap-8 sm:px-4 sm:py-6">
      <div className="flex flex-col gap-4 items-start w-full max-w-full sm:max-w-[921px]">
        <div
          className="text-base md:text-[20px] text-[#484a4c] leading-[100%] text-justify max-w-2xl prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data?.content || '' }}
        />
      </div>
    </div>
  )
}

export default Privacy
