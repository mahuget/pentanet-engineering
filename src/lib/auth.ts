/**
 * NextAuth configuration — credentials provider.
 * Uses SHA-256 password hashing to avoid bcrypt $ encoding issues in Vercel env vars.
 * Password is stored as a SHA-256 hex hash in ADMIN_PASSWORD_HASH env var.
 */

import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash } from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || "pentanet-fallback-secret-2026";

function sha256(str: string): string {
  return createHash("sha256").update(str).digest("hex");
}

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

        const adminEmail    = process.env.ADMIN_EMAIL;
        const adminPassHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPassHash) {
          console.error("[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH not configured");
          return null;
        }

        // Email check (case-insensitive)
        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) {
          return null;
        }

        // SHA-256 comparison — no special characters in the hash
        const inputHash = sha256(credentials.password);
        if (inputHash !== adminPassHash) {
          return null;
        }

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
    maxAge: 8 * 60 * 60,
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
