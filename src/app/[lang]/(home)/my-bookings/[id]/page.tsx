import { getMessages } from '@/lib/i18n'
import { Locale } from '../../../../../../i18n.config'
import { BookingDetailsPageClient } from './BookingDetailsPageClient'

const BookingDetailPage = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params
  const messages = getMessages(lang) 

  return <BookingDetailsPageClient lang={lang} messages={messages} />
}

export default BookingDetailPage