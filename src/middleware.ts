/**
 * Middleware — protects all /admin/* routes except /admin (login page).
 * Unauthenticated requests are redirected to /admin.
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin",
    },
  }
);

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/contacts/:path*", "/admin/quotes/:path*"],
};
