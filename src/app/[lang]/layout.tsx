import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google'
import '@/app/globals.css'
import { getDictionary } from '@/lib/dictionary'
import { i18n, Locale } from '../../../i18n.config'
import { Navigation } from '@/components/Navigtion'

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
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const isRtl = lang === 'ar'

  return (
    <div
      lang={lang}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${plex.variable} ${plexArabic.variable}`}
    >
      <header className="border-b border-border">
        <Navigation dictionary={dictionary} lang={lang} />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
