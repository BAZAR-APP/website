import { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from '../../../i18n.config';

function getLocale(request: NextRequest): string {
  // Negotiator expects a plain object, so we need to convert headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locales: readonly string[] = i18n.locales;
  
  // Check if there's a locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If we find a locale in the pathname, use it
  if (pathnameLocale) {
    return pathnameLocale;
  }

  // Check for cookie with saved locale
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // If no locale in pathname or cookie, use negotiator
  return match(languages, locales, i18n.defaultLocale);
}

export function getLocaleMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip public files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('/.')
  ) {
    return;
  }

  // Check if the pathname already includes a locale
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Get the preferred locale
    const locale = getLocale(request);

    // Create a new URL with the locale
    const newUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
    
    // Preserve the search params
    newUrl.search = request.nextUrl.search;
    
    // Redirect to the new URL
    return Response.redirect(newUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};