import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/** POST /api/admin/auth - verify admin password */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    let settings = await db.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await db.settings.create({
        data: { id: 1, adminPassword: "admin123" },
      });
    }
    if (settings.adminPassword === password) {
      return NextResponse.json({ authorized: true, password });
    }
    return NextResponse.json(
      { authorized: false, error: "Wrong password" },
      { status: 401 },
    );
  } catch (e) {
    console.error("POST /api/admin/auth error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
