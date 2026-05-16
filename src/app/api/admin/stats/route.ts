import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getStats, updateStats, type Stat } from "@/lib/stats";
import { isAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await getStats());
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats: Stat[] = await request.json();

  if (
    !Array.isArray(stats) ||
    stats.some((s) => typeof s.label !== "string" || typeof s.value !== "string")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await updateStats(stats);
  revalidatePath("/");
  revalidatePath("/about");

  return NextResponse.json({ ok: true });
}
