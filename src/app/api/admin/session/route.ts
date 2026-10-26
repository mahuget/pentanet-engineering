/**
 * GET /api/admin/session
 * Returns the current session payload or 401 if not authenticated.
 * Used by the admin frontend to check auth state.
 */

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, email: session.email, name: session.name });
}
