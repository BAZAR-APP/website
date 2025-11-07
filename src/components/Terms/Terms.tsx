import { useCmsContentQuery } from '@/lib/hooks/useCmsContentQuery'
import React from 'react' 
import { Locale } from '../../../i18n.config';

interface TermsProps {
  lang: Locale; 
}

const Terms: React.FC<TermsProps> = ({ lang }) => { 
const { data } = useCmsContentQuery('TermsAndConditions', lang); 

  return (
    <main className="flex flex-col justify-center items-start gap-10 bg-white px-6 py-12 md:px-16 md:py-16 sm:gap-8 sm:px-4 sm:py-6">
      <div
        className="text-base md:text-[20px] text-[#484a4c] leading-[100%] text-justify max-w-2xl prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: data?.content || '' }}
      />
    </main>
  )
}

export default Terms