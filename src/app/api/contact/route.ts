/**
 * POST /api/contact
 *
 * Security flow (all steps active — services degrade gracefully when unconfigured):
 * 1. Rate limiting (Upstash Redis → in-memory fallback)
 * 2. Cloudflare Turnstile token verification
 * 3. Zod strict validation
 * 4. PostgreSQL persistence via Prisma
 * 5. Email notification via Resend
 *
 * Rules:
 * - Never report success if the DB write fails (when DB is configured)
 * - Never log names, emails, or message content
 * - Never expose stack traces in responses
 */

import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
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

  const { allowed } = await checkRateLimit(`contact:${ipHash}`);
  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please wait a moment before trying again." },
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
  const parsed = contactSchema.safeParse(body);
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

  const { name, email, phone, subject, message, turnstileToken } = parsed.data;

  // ── 4. Turnstile verification ──────────────────────────────
  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return NextResponse.json(
      { success: false, message: "Verification failed. Please refresh the page and try again." },
      { status: 400 }
    );
  }

  let dbSaved = true; // Optimistic — will be set false only on DB failure when DB IS configured

  // ── 5. Persist to database ─────────────────────────────────
  if (isDatabaseConfigured()) {
    try {
      const { prisma } = await import("@/lib/db");
      await prisma.contactSubmission.create({
        data: {
          name,
          email,
          phone: phone || null,
          subject,
          message,
          ipHash,
        },
      });
    } catch (err) {
      console.error(
        "[contact] DB write failed:",
        err instanceof Error ? err.message : "unknown"
      );
      dbSaved = false;
    }
  } else {
    // DB not configured — log safely, skip persistence
    console.info("[contact] DB not configured — submission not persisted");
  }

  // If DB was configured but save failed, do not claim success
  if (!dbSaved) {
    return NextResponse.json(
      { success: false, message: "We could not save your message. Please try again." },
      { status: 500 }
    );
  }

  // ── 6. Send email notification ─────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (
    resendKey &&
    !resendKey.includes("your_") &&
    !resendKey.startsWith("re_your") &&
    resendKey.startsWith("re_")
  ) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: process.env.RESEND_FROM_ADDRESS ?? "noreply@pentanet.com",
        to: process.env.RESEND_NOTIFY_ADDRESS ?? "info@pentanet.com",
        subject: `New Contact Enquiry: ${subject}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:linear-gradient(135deg,#102A43,#0a1e30);padding:24px;border-radius:12px 12px 0 0">
              <h2 style="color:#38BDF8;margin:0;font-size:20px">New Contact Form Submission</h2>
              <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px">Pentanet Engineering PLC website</p>
            </div>
            <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:100px">Name</td><td style="padding:8px 0;font-weight:600;color:#102A43">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Email</td><td style="padding:8px 0;font-weight:600;color:#102A43">${email}</td></tr>
                ${phone ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px">Phone</td><td style="padding:8px 0;color:#102A43">${phone}</td></tr>` : ""}
                <tr><td style="padding:8px 0;color:#64748b;font-size:13px">Subject</td><td style="padding:8px 0;font-weight:600;color:#102A43">${subject}</td></tr>
              </table>
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e2e8f0">
                <p style="color:#64748b;font-size:13px;margin:0 0 8px">Message:</p>
                <p style="color:#102A43;white-space:pre-wrap;margin:0">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>
              <p style="color:#94a3b8;font-size:11px;margin-top:20px">Submitted via pentanet.com contact form</p>
            </div>
          </div>
        `,
      });
    } catch (err) {
      // Email failure is non-fatal — submission is already saved to DB
      console.error(
        "[contact] Email notification failed:",
        err instanceof Error ? err.message : "unknown"
      );
    }
  } else {
    console.info("[contact] Email not configured — notification skipped");
  }

  // Log safely — no PII
  console.info(
    `[contact] ok — domain:${email.split("@")[1]} subjectLen:${subject.length}`
  );

  return NextResponse.json(
    {
      success: true,
      message: "Thank you for your message. We will be in touch shortly.",
    },
    { status: 200 }
  );
}
