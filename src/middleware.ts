import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = ['/login', '/signup','/'].includes(path);

  const token = request.cookies.get('token')?.value || '';

  if ((isPublicPath && token) || (path === '/' && token)) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  if ((!isPublicPath && !token)|| (path === '/' && !token)) {
    return NextResponse.redirect(new URL('/signup', request.nextUrl));
  }

  return null; // Return null if no redirection is needed
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail'
  ]
};
