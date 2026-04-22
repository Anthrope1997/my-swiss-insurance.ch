import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr']
const defaultLocale = 'fr'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
