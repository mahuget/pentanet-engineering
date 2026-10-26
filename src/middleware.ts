/**
 * Middleware — protects all /admin/dashboard, /admin/contacts, /admin/quotes routes.
 * Unauthenticated requests redirect to /admin (login page).
 * Uses next-auth v4 withAuth middleware.
 */

export { default } from "next-auth/middleware";

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
