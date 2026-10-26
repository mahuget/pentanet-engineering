/**
 * Custom authentication library — replaces next-auth v4.
 *
 * Reason: next-auth@4 is incompatible with Next.js 15 + React 19.
 * It fails with CredentialsSignin 401 even when credentials are valid,
 * due to internal redirect handling changes in the App Router.
 *
 * This implementation uses:
 * - bcryptjs for secure password hashing (proper password storage)
 * - jose for JWT signing/verification (industry-standard library)
 * - HTTP-only cookies for session storage (XSS-safe)
 *
 * Security properties:
 * - Passwords compared with bcrypt.compare (timing-safe)
 * - Sessions signed with HS256 JWT
 * - Cookies: httpOnly, secure, sameSite=lax
 * - Session expires in 8 hours
 */

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const SESSION_COOKIE = "pnet_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET || "pentanet-fallback-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  email: string;
  name: string;
  role: "admin";
}

/**
 * Verifies admin credentials.
 * Returns true if email and password match environment variables.
 * Never logs passwords or hashes.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash  = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    console.error("[auth] ADMIN_EMAIL or ADMIN_PASSWORD_HASH env vars not set");
    return false;
  }

  // Case-insensitive email comparison
  if (email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    return false;
  }

  // Bcrypt password comparison (timing-safe)
  try {
    return await bcrypt.compare(password, adminHash);
  } catch (err) {
    console.error("[auth] bcrypt compare error:", err instanceof Error ? err.message : "unknown");
    return false;
  }
}

/**
 * Creates a signed JWT session token and sets it as an HTTP-only cookie.
 */
export async function createSession(email: string): Promise<void> {
  const token = await new SignJWT({ email, name: "Pentanet Admin", role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

/**
 * Reads and verifies the session cookie.
 * Returns the session payload or null if missing/invalid/expired.
 */
export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecret());
    return {
      email: payload.email as string,
      name: payload.name as string,
      role: "admin",
    };
  } catch {
    return null;
  }
}

/**
 * Deletes the session cookie (sign out).
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
