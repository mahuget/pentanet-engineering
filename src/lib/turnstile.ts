/**
 * Cloudflare Turnstile server-side token verification.
 *
 * In development (no real secret key), verification is bypassed.
 * In production, every submission must have a valid token.
 */

export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Development bypass — no real key configured
  if (
    !secret ||
    secret === "your-turnstile-secret-key" ||
    secret.startsWith("your-")
  ) {
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    // In production with no key, fail closed
    console.error("[turnstile] TURNSTILE_SECRET_KEY not configured in production");
    return false;
  }

  // Reject obviously placeholder tokens
  if (
    !token ||
    token === "placeholder-token" ||
    token.length < 10
  ) {
    // Dev bypass for placeholder tokens
    if (process.env.NODE_ENV !== "production") return true;
    return false;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }),
      }
    );

    if (!res.ok) return false;
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] verification error:", err instanceof Error ? err.message : "unknown");
    return false;
  }
}
