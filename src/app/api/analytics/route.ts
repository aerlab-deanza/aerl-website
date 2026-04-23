import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, getDailyStats } from "@/lib/analytics";

export async function GET(request: NextRequest) {
  const adminAuth = request.cookies.get("admin_auth")?.value;
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (adminAuth !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    summary: getAnalytics(),
    daily: getDailyStats(14),
  });
}
