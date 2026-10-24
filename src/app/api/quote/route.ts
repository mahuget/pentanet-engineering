/**
 * POST /api/quote
 *
 * Same security pattern as /api/contact.
 * Persists to quote_requests table via Prisma.
 * Sends detailed project enquiry notification via Resend.
 */

import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations/quote";
import { checkRateLimit } from "@/lib/ratelimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { hashIp } from "@/lib/utils";
import { isDatabaseConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // ── 1. Rate limiting ───────────────────────────────────────
  const rawIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const ipHash = hashIp(rawIp);

  const { allowed } = await checkRateLimit(`quote:${ipHash}`);
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait before trying again." },
      { status: 429 }
    );
  }

  // ── 2. Parse body ──────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  // ── 3. Zod validation ──────────────────────────────────────
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check your input and try again.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const {
    name, email, phone, company,
    projectType, projectLocation, budgetRange, timeline,
    description, services, turnstileToken,
  } = parsed.data;

  // ── 4. Turnstile verification ──────────────────────────────
  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json(
      { success: false, message: "Verification failed. Please refresh and try again." },
      { status: 400 }
    );
  }

  let dbSaved = true;

  // ── 5. Persist to database ─────────────────────────────────
  if (isDatabaseConfigured()) {
    try {
      const { prisma } = await import("@/lib/db");
      await prisma.quoteRequest.create({
        data: {
          name,
          email,
          phone: phone || null,
          company: company || null,
          projectType,
          projectLocation: projectLocation || null,
          budgetRange: budgetRange || null,
          timeline: timeline || null,
          description,
          services: services ?? [],
          ipHash,
        },
      });
    } catch (err) {
      console.error(
        "[quote] DB write failed:",
        err instanceof Error ? err.message : "unknown"
      );
      dbSaved = false;
    }
  } else {
    console.info("[quote] DB not configured — submission not persisted");
  }

  if (!dbSaved) {
    return NextResponse.json(
      { success: false, message: "We could not save your request. Please try again." },
      { status: 500 }
    );
  }

  // ── 6. Send email notification ─────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey && resendKey.startsWith("re_") && !resendKey.startsWith("re_your")) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const servicesList = services && services.length > 0
        ? services.map((s) => `• ${s}`).join("\n")
        : "Not specified";

      await resend.emails.send({
        from: process.env.RESEND_FROM_ADDRESS ?? "noreply@pentanet.com",
        to: process.env.RESEND_NOTIFY_ADDRESS ?? "info@pentanet.com",
        subject: `New Quote Request: ${projectType}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#102A43,#0a1e30);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:#38BDF8;margin:0;font-size:20px">New Quote Request</h2>
              <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px">Pentanet Engineering PLC website</p>
            </div>
            <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <h3 style="color:#102A43;margin:0 0 16px;font-size:15px">Contact Details</h3>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:130px">Name</td><td style="padding:6px 0;font-weight:600;color:#102A43">${name}</td></tr>
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px">Email</td><td style="padding:6px 0;font-weight:600;color:#102A43">${email}</td></tr>
                ${phone ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:6px 0;color:#102A43">${phone}</td></tr>` : ""}
                ${company ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Company</td><td style="padding:6px 0;color:#102A43">${company}</td></tr>` : ""}
              </table>

              <h3 style="color:#102A43;margin:20px 0 12px;font-size:15px">Project Details</h3>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:6px 0;color:#64748b;font-size:13px;width:130px">Project Type</td><td style="padding:6px 0;font-weight:600;color:#102A43">${projectType}</td></tr>
                ${projectLocation ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Location</td><td style="padding:6px 0;color:#102A43">${projectLocation}</td></tr>` : ""}
                ${budgetRange ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Budget</td><td style="padding:6px 0;color:#102A43">${budgetRange}</td></tr>` : ""}
                ${timeline ? `<tr><td style="padding:6px 0;color:#64748b;font-size:13px">Timeline</td><td style="padding:6px 0;color:#102A43">${timeline}</td></tr>` : ""}
              </table>

              <div style="margin-top:12px">
                <p style="color:#64748b;font-size:13px;margin:0 0 4px">Services Required:</p>
                <pre style="color:#102A43;font-family:inherit;white-space:pre-wrap;margin:0;font-size:13px">${servicesList}</pre>
              </div>

              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0">
                <p style="color:#64748b;font-size:13px;margin:0 0 8px">Project Description:</p>
                <p style="color:#102A43;white-space:pre-wrap;margin:0;font-size:13px">${description.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>

              <p style="color:#94a3b8;font-size:11px;margin-top:20px">Submitted via pentanet.com quote request form</p>
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error(
        "[quote] Email failed:",
        err instanceof Error ? err.message : "unknown"
      );
    }
  } else {
    console.info("[quote] Email not configured — notification skipped");
  }

  console.info(
    `[quote] ok — type:${projectType} domain:${email.split("@")[1]}`
  );

  return NextResponse.json(
    {
      success: true,
      message:
        "Your quote request has been received. Our engineering team will be in touch soon.",
    },
    { status: 200 }
  );
}
