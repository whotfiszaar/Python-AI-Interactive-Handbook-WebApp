import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { verifyPassword, setSessionCookie } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";

export async function POST(req: NextRequest) {
  try {
    await ensureReady();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Query user
    const user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Log login to Qdrant
    await logQdrantInteraction(
      user.id,
      user.username,
      "user_login",
      `User logged in: ${user.username}`
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });

    setSessionCookie(response, {
      userId: user.id,
      username: user.username,
      name: user.name,
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
