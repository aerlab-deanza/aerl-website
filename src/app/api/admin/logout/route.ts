import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_auth")?.value;
  if (token) await getRedis().del(`admin:session:${token}`);
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("admin_auth");
  return response;
}
