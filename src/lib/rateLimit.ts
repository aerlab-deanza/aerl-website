const store = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3;

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Always write the pruned list back so expired entries don't accumulate
  const timestamps = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  store.set(ip, timestamps);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  return { allowed: true, retryAfterSeconds: 0 };
}
