import { getMessages } from '@/lib/i18n'
import ExploreChaletsClient from './ExploreChaletsClient'
import { Locale } from '../../../../../i18n.config'

export default async function ExploreChalets({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const messages = getMessages(lang)

  return <ExploreChaletsClient lang={lang} messages={messages} />
}