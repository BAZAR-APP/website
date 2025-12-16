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
  params: Promise<{ lang: string }>
}) => {
  const { lang } = await params
  const locale = lang as Locale
  const messages = getMessages(locale)

  return (
    <div className="max-w-xxl mx-auto">
      <Header lang={locale} messages={messages.navigation}  className="bg-[#FDFDFE]" />
      {children}
      <Footer messages={messages.footer} />
      <StickyChatBot />
    </div>
  )
}

export default NotificationLayout
