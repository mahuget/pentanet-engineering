/**
 * Rate limiting — uses Upstash Redis when configured, falls back to in-memory.
 * In-memory store is per-process (adequate for serverless; resets on cold start).
 *
 * Limits: 5 submissions per IP per 60-second window.
 */

interface MemEntry {
  count: number;
  resetAt: number;
}

const memStore = new Map<string, MemEntry>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export async function checkRateLimit(
  identifier: string
): Promise<{ allowed: boolean; remaining: number }> {
  // Try Upstash Redis if configured
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken && !redisUrl.includes("your-url")) {
    try {
      const now = Date.now();
      const windowKey = `rl:${identifier}:${Math.floor(now / WINDOW_MS)}`;

      const res = await fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", windowKey],
          ["EXPIRE", windowKey, 60],
        ]),
      });

      if (res.ok) {
        const data = (await res.json()) as [[string, number], [string, number]];
        const count = data[0][1];
        return {
          allowed: count <= MAX_REQUESTS,
          remaining: Math.max(0, MAX_REQUESTS - count),
        };
      }
    } catch {
      // Fall through to memory store
    }
  }

  // In-memory fallback
  const now = Date.now();
  const entry = memStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    memStore.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  entry.count++;
  return {
    allowed: entry.count <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - entry.count),
  };
}
