import NextAuth from 'next-auth';

import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth(req => {
  const isAuthenticated = !!req.auth;

  const isAuthPage = req.nextUrl.pathname.startsWith('/login');

  if (req.nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }

  if (isAuthPage) {
    if (isAuthenticated) {
      return Response.redirect(new URL('/dashboard', req.nextUrl));
    }

    return;
  }

  if (!isAuthenticated) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return Response.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.nextUrl)
    );
  }
  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
