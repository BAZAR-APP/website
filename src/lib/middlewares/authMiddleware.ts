import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function authMiddleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('sessionToken')

  if (request.nextUrl.pathname === '/' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/explore/chalets', request.url))
  }

  if (
    isAuthenticated &&
    (request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
