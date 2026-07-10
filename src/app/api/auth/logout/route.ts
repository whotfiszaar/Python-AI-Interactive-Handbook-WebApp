import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, getSessionUser } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser(req);
    
    const response = NextResponse.json({ success: true });
    clearSessionCookie(response);

    if (user) {
      // Log logout to Qdrant
      await logQdrantInteraction(
        user.userId,
        user.username,
        "user_logout",
        `User logged out: ${user.username}`
      );
    }

    return response;
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
