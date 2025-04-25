import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/login', '/register', '/'];

  // Redirect to dashboard if logged in and trying to access auth pages
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if not authenticated and trying to access protected routes
  if (!publicRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};