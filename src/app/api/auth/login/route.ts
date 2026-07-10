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

    // Standalone Admin Login Check
    if (normalizedUsername === "admin") {
      const settings = await db.settings.findFirst();
      const adminPassword = settings?.adminPassword ?? "admin123";

      if (password !== adminPassword) {
        return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
      }

      const response = NextResponse.json({
        success: true,
        user: {
          id: 99999,
          username: "admin",
          name: "Admin User",
          isAdmin: true,
        },
      });

      setSessionCookie(response, {
        userId: 99999,
        username: "admin",
        name: "Admin User",
      });

      return response;
    }

    // Query user
    let user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (!user) {
      const { syncUserFromQdrant } = await import("@/lib/qdrant");
      user = await syncUserFromQdrant(normalizedUsername);
    }

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
