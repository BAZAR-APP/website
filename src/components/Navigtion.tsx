import Link from 'next/link'
import { Locale } from '../../i18n.config'

interface NavigationProps {
  dictionary: {
    navigation: {
      home: string
      about: string
      contact: string
    }
    footer: {
      language: string
    }
  }
  lang: Locale
}

export function Navigation({ dictionary, lang }: NavigationProps) {
  return (
    <div className="container flex items-center justify-between py-4">
      <Link href={`/${lang}`} className="text-xl font-bold">
        Logo
      </Link>
      <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
        <Link href={`/${lang}`} className="text-sm font-medium hover:underline underline-offset-4">
          {dictionary.navigation.home}
        </Link>
        <Link
          href={`/${lang}/about`}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          {dictionary.navigation.about}
        </Link>
        <Link
          href={`/${lang}/contact`}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          {dictionary.navigation.contact}
        </Link>
      </nav>
    </div>
  )
}
