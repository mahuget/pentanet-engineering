/**
 * TEMPORARY DEBUG — shows env var presence and hash comparison result.
 * REMOVE THIS FILE before final production handover.
 * Does NOT log passwords, hashes, or secret values.
 */
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function GET() {
  const adminEmail    = process.env.ADMIN_EMAIL       ?? "NOT_SET";
  const adminHash     = process.env.ADMIN_PASSWORD_HASH;
  const nextauthUrl   = process.env.NEXTAUTH_URL      ?? "NOT_SET";
  const secretSet     = !!process.env.NEXTAUTH_SECRET;

  // Test password against stored hash — never log either value
  const testPassword  = "Penta@Admin2026!";
  let bcryptMatch     = false;
  let bcryptError     = "";

  if (adminHash) {
    try {
      bcryptMatch = await bcrypt.compare(testPassword, adminHash);
    } catch (err) {
      bcryptError = err instanceof Error ? err.message : "unknown error";
    }
  }

  // Show only safe metadata — no raw hash values
  const hashInfo = adminHash
    ? {
        set: true,
        length: adminHash.length,
        startsWithBcrypt: adminHash.startsWith("$2"),
        bcryptMatch,
        bcryptError: bcryptError || undefined,
        // Show only first 4 and last 4 chars — not enough to reconstruct
        preview: adminHash.slice(0, 4) + "..." + adminHash.slice(-4),
      }
    : { set: false };

  return NextResponse.json({
    adminEmailSet: adminEmail !== "NOT_SET",
    adminEmailDomain: adminEmail.includes("@") ? adminEmail.split("@")[1] : "invalid",
    hashInfo,
    nextauthUrl,
    secretSet,
    nodeEnv: process.env.NODE_ENV,
  });
}
