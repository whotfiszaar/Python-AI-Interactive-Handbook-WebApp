import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync, setSessionCookie } from "@/lib/auth";
import { backupSettingsToQdrant } from "@/lib/qdrant";
import type { SettingsPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    let settings = await db.settings.findUnique({ where: { userId: user.userId } });

    if (!settings) {
      settings = await db.settings.create({
        data: {
          darkMode: false,
          fontSize: 16,
          apiKeys: "{}",
          studentName: user.name,
          userId: user.userId,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (e) {
    console.error("GET /api/settings error", e);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const body = (await req.json()) as SettingsPayload;

    // Ensure settings row exists
    let settings = await db.settings.findUnique({ where: { userId: user.userId } });
    if (!settings) {
      settings = await db.settings.create({
        data: {
          darkMode: false,
          fontSize: 16,
          apiKeys: "{}",
          studentName: user.name,
          userId: user.userId,
        },
      });
    }

    const updated = await db.settings.update({
      where: { userId: user.userId },
      data: {
        ...(typeof body.darkMode === "boolean" ? { darkMode: body.darkMode } : {}),
        ...(typeof body.fontSize === "number" ? { fontSize: body.fontSize } : {}),
        ...(body.apiKeys !== undefined ? { apiKeys: JSON.stringify(body.apiKeys) } : {}),
        ...(typeof body.studentName === "string" ? { studentName: body.studentName } : {}),
      },
    });

    const response = NextResponse.json(updated);

    // If student name changed, sync back to User model and re-issue session cookie
    if (typeof body.studentName === "string" && body.studentName.trim() !== user.name) {
      const finalName = body.studentName.trim();
      await db.user.update({
        where: { id: user.userId },
        data: { name: finalName },
      });
      setSessionCookie(response, {
        userId: user.userId,
        username: user.username,
        name: finalName,
      });
      // Also update credential backup in Qdrant
      const dbUser = await db.user.findUnique({ where: { id: user.userId } });
      if (dbUser) {
        const { backupUserToQdrant } = await import("@/lib/qdrant");
        void backupUserToQdrant(dbUser);
      }
    }

    // 🔁 Backup settings to Qdrant so they survive container restarts
    void backupSettingsToQdrant(user.userId, user.username, {
      darkMode: updated.darkMode,
      fontSize: updated.fontSize,
      apiKeys: updated.apiKeys,
      studentName: updated.studentName,
    });

    return response;
  } catch (e) {
    console.error("PUT /api/settings error", e);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
