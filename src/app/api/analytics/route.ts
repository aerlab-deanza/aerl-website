import { NextRequest, NextResponse } from "next/server";
import { getAnalytics, getDailyStats } from "@/lib/analytics";
import { isAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    summary: getAnalytics(),
    daily: getDailyStats(14),
  });
}
