/**
 * POST /api/admin/logout
 * Deletes the session cookie and returns 200.
 */

import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  await deleteSession();
  return NextResponse.json({ success: true }, { status: 200 });
}
