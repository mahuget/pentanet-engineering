/**
 * NextAuth v4 route handler for Next.js 15 App Router.
 * next-auth v4 requires this specific pattern.
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// next-auth v4 with Next.js 15 — must use this exact pattern
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
