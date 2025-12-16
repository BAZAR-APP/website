import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google'
import '@/app/globals.css'
import { i18n, Locale } from '../../../i18n.config'

// Font for English
const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-plex',
  display: 'swap',
})

// Font for Arabic
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const isRtl = locale === 'ar'

  return (
    <div
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${plex.variable} ${plexArabic.variable}`}
    >
      <main className="flex-1">{children}</main>
    </div>
  )
}
