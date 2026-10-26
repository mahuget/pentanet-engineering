/**
 * Middleware — protects all /admin/* routes except /admin (login page).
 *
 * Reads the pnet_admin_session JWT cookie and verifies it.
 * Uses jose directly (no next-auth dependency) so it works in the
 * Next.js 15 Edge/Node middleware runtime.
 *
 * Unauthenticated requests to protected routes are redirected to /admin.
 */

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "pnet_admin_session";

const PROTECTED = [
  "/admin/dashboard",
  "/admin/contacts",
  "/admin/quotes",
];

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET || "pentanet-fallback-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes (not /admin itself — that's the login page)
  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const loginUrl = new URL("/admin", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/dashboard/:path*",
    "/admin/contacts",
    "/admin/contacts/:path*",
    "/admin/quotes",
    "/admin/quotes/:path*",
  ],
};
