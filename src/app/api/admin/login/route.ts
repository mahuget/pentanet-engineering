/**
 * POST /api/admin/login
 *
 * Accepts { email, password } JSON body.
 * Verifies credentials against environment variables using bcrypt.
 * On success: creates a signed JWT session cookie and returns 200.
 * On failure: returns 401 with a generic message.
 * Never reveals which field was wrong.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyCredentials, createSession } from "@/lib/auth";

export const runtime = "nodejs";

const loginSchema = z.object({
  email:    z.string().email().max(320).trim().toLowerCase(),
  password: z.string().min(1).max(256),
});

export async function POST(request: NextRequest) {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Validate shape
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const { email, password } = parsed.data;

  // Verify credentials — bcrypt comparison
  const valid = await verifyCredentials(email, password);

  if (!valid) {
    // Log safely — no passwords, no hashes
    console.info("[admin/login] failed attempt — email domain:", email.split("@")[1] ?? "unknown");
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  // Create session cookie
  await createSession(email);

  console.info("[admin/login] successful login — email domain:", email.split("@")[1]);

  return NextResponse.json({ success: true }, { status: 200 });
}
