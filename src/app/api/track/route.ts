import { NextRequest, NextResponse } from "next/server";
import { trackVisit } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  let sessionId = request.cookies.get("session_id")?.value;
  const isNew = !sessionId;
  if (!sessionId) sessionId = crypto.randomUUID();

  const { pathname } = await request.json().catch(() => ({ pathname: "/" }));
  await trackVisit(sessionId, typeof pathname === "string" ? pathname : "/");

  const res = NextResponse.json({ ok: true });
  if (isNew) {
    res.cookies.set("session_id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}
