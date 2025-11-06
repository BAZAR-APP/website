import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { StickyChatBot } from '@/components/ChatBot/StickyChatBot'
import { getMessages } from '@/lib/i18n'

const NotificationLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}) => {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const messages = getMessages(lang)

  return (
    <div className="max-w-xxl mx-auto">
      <Header dictionary={dictionary} lang={lang} className="bg-[#FDFDFE]" />
      {children}
      <Footer messages={messages.footer} />
      <StickyChatBot />
    </div>
  )
}

export default NotificationLayout
