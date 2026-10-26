/**
 * TEMPORARY DEBUG ENDPOINT — DELETE BEFORE PRODUCTION
 * Shows what env vars NextAuth can see (values are hashed/masked)
 */
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

export async function GET() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash  = process.env.ADMIN_PASSWORD_HASH;
  const nextauthUrl = process.env.NEXTAUTH_URL;
  const nextauthSecret = process.env.NEXTAUTH_SECRET;

  // Test the hash comparison
  const testPassword = "Penta@Admin2026!";
  const testHash = createHash("sha256").update(testPassword).digest("hex");
  const hashMatch = testHash === adminHash;

  return NextResponse.json({
    adminEmail: adminEmail ? `${adminEmail.substring(0,5)}...` : "NOT SET",
    adminHashSet: !!adminHash,
    adminHashLength: adminHash?.length || 0,
    adminHashPreview: adminHash?.substring(0, 8) + "...",
    expectedHashPreview: testHash.substring(0, 8) + "...",
    hashMatch,
    nextauthUrl: nextauthUrl || "NOT SET",
    nextauthSecretSet: !!nextauthSecret,
  });
}
