import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSessionUser, getSessionUserAndSync, setSessionCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const tokenUser = getSessionUser(req);
    if (!tokenUser) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const user = await getSessionUserAndSync(req);
    if (!user) {
      const response = NextResponse.json({ authenticated: false }, { status: 200 });
      clearSessionCookie(response);
      return response;
    }

    const response = NextResponse.json({
      authenticated: true,
      user,
    });

    if (
      tokenUser.userId !== user.userId ||
      tokenUser.username !== user.username ||
      tokenUser.name !== user.name
    ) {
      setSessionCookie(response, user);
    }

    return response;
  } catch (error: any) {
    console.error("Session verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
