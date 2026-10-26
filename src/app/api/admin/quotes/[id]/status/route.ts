import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/db";
import { z } from "zod";

export const runtime = "nodejs";

const VALID_STATUSES = ["new", "under_review", "quoted", "closed"] as const;
const schema = z.object({ status: z.enum(VALID_STATUSES) });

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
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
    await prisma.quoteRequest.update({
      where: { id },
      data: { status: parsed.data.status },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/quotes/status]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
