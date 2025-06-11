import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '../../../../../i18n.config'

const DefaultLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  return (
    <div className="max-w-xxl mx-auto">
      <Header className="bg-[#FDFDFE]" dictionary={dictionary} lang={lang} />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
