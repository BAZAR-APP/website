import { authMiddleware } from '@/lib/middlewares/authMiddleware'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = authMiddleware(request)
  if (response.status !== 200) return response 
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
