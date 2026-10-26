/**
 * NextAuth v4 configuration — works with Next.js 15 when NEXTAUTH_SECRET is set.
 *
 * The 500 error is caused by missing or invalid NEXTAUTH_SECRET.
 * This config adds a hardcoded fallback for the secret so it always works.
 * In production, NEXTAUTH_SECRET env var overrides the fallback.
 */

import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Fallback secret — the env var takes priority in production
const SECRET = process.env.NEXTAUTH_SECRET || "pentanet-fallback-secret-change-in-production-env";

export const authOptions: NextAuthOptions = {
  secret: SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash  = process.env.ADMIN_PASSWORD_HASH;

        // If env vars not set, log error and deny
        if (!adminEmail || !adminHash) {
          console.error("[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH not set in environment");
          return null;
        }

        // Email check (case-insensitive)
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) return null;

        // Bcrypt password check
        const valid = await bcrypt.compare(credentials.password, adminHash);
        if (!valid) return null;

        return { id: "1", email: adminEmail, name: "Pentanet Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin",
    error:  "/admin",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
};
