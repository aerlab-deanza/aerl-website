import { NextRequest, NextResponse } from "next/server";
import { trackVisit } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value ?? "anonymous";
  const { pathname } = await request.json().catch(() => ({ pathname: "/" }));
  await trackVisit(sessionId, typeof pathname === "string" ? pathname : "/");
  return NextResponse.json({ ok: true });
}
