import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRoadmapTracks, updateRoadmapTracks } from "@/lib/roadmap";
import type { Track } from "@/types";

function isAdmin(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";
  return request.cookies.get("admin_auth")?.value === adminPassword;
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getRoadmapTracks());
}

export async function PUT(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tracks: Track[] = await request.json();

  if (!Array.isArray(tracks) || tracks.some((t) => typeof t.id !== "string")) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  updateRoadmapTracks(tracks);
  revalidatePath("/roadmap");

  return NextResponse.json({ ok: true });
}
