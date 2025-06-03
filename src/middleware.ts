import { authMiddleware } from '@/lib/middlewares/authMiddleware'
import { NextRequest, NextResponse } from 'next/server'
import { getLocaleMiddleware } from './lib/middlewares/getLocale'

export async function middleware(request: NextRequest) {
  const localeResponse = getLocaleMiddleware(request)
  if (!localeResponse || localeResponse.status !== 200) return localeResponse
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
