import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/auth";
import { getRedis } from "@/lib/redis";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 10; // 10 minutes

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const redis = getRedis();
  const rateLimitKey = `admin:ratelimit:${ip}`;

  const attempts = await redis.incr(rateLimitKey);
  if (attempts === 1) await redis.expire(rateLimitKey, RATE_LIMIT_WINDOW);
  if (attempts > RATE_LIMIT_MAX) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const { password } = await request.json();

  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await redis.del(rateLimitKey);

  const token = crypto.randomUUID();
  await redis.set(`admin:session:${token}`, "1", { ex: 86400 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_auth", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
