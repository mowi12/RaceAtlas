import { NextResponse } from "next/server";
import { createAdminSession, isAdminAuthenticated } from "@/lib/auth/admin";

export async function POST() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
