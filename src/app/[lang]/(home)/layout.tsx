import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'

const NotificationLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  return (
    <div className="max-w-xxl mx-auto">
      <Header dictionary={dictionary} className="bg-[#FDFDFE]" />
      {children}
      <Footer />
    </div>
  )
}

export default NotificationLayout
