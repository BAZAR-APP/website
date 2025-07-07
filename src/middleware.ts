import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '../i18n.config'

const PROTECTED_PATHS = ['/profile', '/notifications', '/loyalty-points', '/my-bookings']

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const locales = i18n.locales
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )
  if (pathnameLocale) return pathnameLocale
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale as (typeof i18n.locales)[number]))
    return cookieLocale as (typeof i18n.locales)[number]
  return match(languages, locales, i18n.defaultLocale)
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
