import { getRedis } from "./redis";
import type { NextRequest } from "next/server";

export function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD environment variable is not set");
  return pw;
}

export async function isAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const exists = await getRedis().exists(`admin:session:${token}`);
  return exists === 1;
}

export async function isAdmin(request: NextRequest): Promise<boolean> {
  return isAdminToken(request.cookies.get("admin_auth")?.value);
}
