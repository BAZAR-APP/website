import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '../i18n.config'

const PROTECTED_PATHS = ['/profile', '/notifications', '/loyalty-points', '/my-bookings']

function isValidLocale(locale: string): locale is (typeof i18n.locales)[number] {
  return i18n.locales.includes(locale as (typeof i18n.locales)[number])
}

function getLocale(request: NextRequest): string {
  const locales = i18n.locales
  const pathname = request.nextUrl.pathname
  
  // Check pathname first
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )
  if (pathnameLocale && isValidLocale(pathnameLocale)) return pathnameLocale
  
  // Check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && isValidLocale(cookieLocale)) return cookieLocale
  
  // Try to get locale from Accept-Language header
  try {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
    
    // Filter out invalid language codes (like '*', empty strings, etc.)
    const validLanguages = languages.filter(
      (lang) => lang && lang !== '*' && typeof lang === 'string' && lang.length > 0
    )
    
    if (validLanguages.length > 0) {
      const matchedLocale = match(validLanguages, locales, i18n.defaultLocale)
      // Validate the matched locale is in our allowed locales
      if (isValidLocale(matchedLocale)) {
        return matchedLocale
      }
    }
  } catch (error) {
    // If anything fails, fall back to default locale
    console.error('Error determining locale:', error)
  }
  
  // Always return a valid locale as fallback
  return i18n.defaultLocale
}

function isProtectedPath(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\//, '/')
  if (pathWithoutLocale.match(/^\/chalet\/[^\/]+\/booking/)) {
    return true
  }
  return PROTECTED_PATHS.filter((path) => path !== '/chalet').some((path) => {
    return pathWithoutLocale.startsWith(path)
  })
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Bypass static files and API
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/') || pathname.includes('/.')) {
    return
  }

  // Localized redirect
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    newUrl.search = request.nextUrl.search
    return NextResponse.redirect(newUrl)
  }

  // Auth check only on protected paths
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isProtected = isProtectedPath(pathname)

  if (isProtected && !token?.accessToken) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images/).*)'],
}
