import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { Locale } from '../../../../i18n.config'
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
  const messages = getMessages(lang)

  return (
    <div className="max-w-xxl mx-auto">
      <Header lang={lang} messages={messages.navigation}  className="bg-[#FDFDFE]" />
      {children}
      <Footer messages={messages.footer} />
      <StickyChatBot />
    </div>
  )
}

export default NotificationLayout
