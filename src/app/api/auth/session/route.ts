import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }
    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error: any) {
    console.error("Session verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
