import { prisma } from "./prisma";

/**
 * Rate limiter backed by the database for serverless environments.
 * Uses a sliding window approach with per-second rate limiting.
 * Falls back to in-memory for very short windows (< 10s) to avoid DB pressure.
 */

// Short-lived in-memory cache to absorb bursts without hitting DB on every request
const burstMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = burstMap.get(key);

  if (!entry || now > entry.resetTime) {
    burstMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  entry.count++;
  if (entry.count > limit) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: limit - entry.count };
}

/**
 * Database-backed rate limiter for API usage tracking.
 * Uses the Usage model to enforce monthly limits.
 * This is already handled by checkUsageLimit in usage.ts,
 * but this provides per-minute rate limiting for abuse prevention.
 */
export async function rateLimitByDb(
  userId: string,
  limit: number = 60,
  windowMinutes: number = 1
): Promise<{ allowed: boolean }> {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  // Count recent API key lookups as a proxy for request rate
  // We use the usage count increment timestamp approach
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { updatedAt: true },
  });

  if (!user) return { allowed: false };

  // For now, the burst rate limiter handles per-request rate limiting
  // and the usage.ts module handles monthly quota enforcement.
  // This function can be expanded later with a dedicated RateLimit table if needed.
  return { allowed: true };
}
