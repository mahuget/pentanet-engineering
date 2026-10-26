import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "reviewed", "responded", "archived"] as const;
const schema = z.object({ status: z.enum(VALID_STATUSES) });

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth check
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 422 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { prisma } = await import("@/lib/db");
    await prisma.contactSubmission.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/contacts/status]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
