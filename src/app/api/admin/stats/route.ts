import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getStats, updateStats, type Stat } from "@/lib/stats";

function isAdmin(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  return request.cookies.get("admin_auth")?.value === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getStats());
}

export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats: Stat[] = await request.json();

  if (
    !Array.isArray(stats) ||
    stats.some((s) => typeof s.label !== "string" || typeof s.value !== "string")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  updateStats(stats);
  revalidatePath("/");
  revalidatePath("/about");

  return NextResponse.json({ ok: true });
}
