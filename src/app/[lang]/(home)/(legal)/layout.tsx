import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { Locale } from '../../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'

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
    <div>
      <Header isLoggedIn={false} dictionary={dictionary} lang={lang} />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout
