import type { Metadata } from 'next'
import { Inter, Geist_Mono, Tenor_Sans } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import './globals.css'
import AuthSessionProvider from '@/components/Providers/SessionProvider'
import { ToastProvider } from '@/components/Providers/ToastProvider'
import { QueryProvider } from '@/components/Providers/QueryProvider'

// Font configurations
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const tenorSans = Tenor_Sans({
  variable: '--font-tenor-sans',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BAZAAR',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${tenorSans.variable}`}>
      <body
        cz-shortcut-listen="true"
        style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
      >
        <ToastProvider />
        <Theme>
          <AuthSessionProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthSessionProvider>
        </Theme>
      </body>
    </html>
  )
}
