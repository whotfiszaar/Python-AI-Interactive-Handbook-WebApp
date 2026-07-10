import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync, setSessionCookie } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";
import type { SettingsPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    let settings = await db.settings.findUnique({
      where: { userId: user.userId },
    });
    
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
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    const body = (await req.json()) as SettingsPayload;
    
    let settings = await db.settings.findUnique({
      where: { userId: user.userId },
    });
    
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

    // Update settings table
    const updated = await db.settings.update({
      where: { userId: user.userId },
      data: {
        ...(typeof body.darkMode === "boolean" ? { darkMode: body.darkMode } : {}),
        ...(typeof body.fontSize === "number" ? { fontSize: body.fontSize } : {}),
        ...(body.apiKeys !== undefined
          ? { apiKeys: JSON.stringify(body.apiKeys) }
          : {}),
        ...(typeof body.studentName === "string"
          ? { studentName: body.studentName }
          : {}),
      },
    });

    const response = NextResponse.json(updated);

    // If student name changed, sync back to User model and re-issue session cookie
    let finalName = user.name;
    if (typeof body.studentName === "string" && body.studentName.trim() !== user.name) {
      finalName = body.studentName.trim();
      await db.user.update({
        where: { id: user.userId },
        data: { name: finalName },
      });
      
      setSessionCookie(response, {
        userId: user.userId,
        username: user.username,
        name: finalName,
      });
    }

    // Log to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      "settings_update",
      `Updated settings (darkMode=${body.darkMode}, fontSize=${body.fontSize}, studentName=${body.studentName})`,
      {
        darkMode: body.darkMode,
        fontSize: body.fontSize,
        studentName: body.studentName,
      }
    );

    return response;
  } catch (e) {
    console.error("PUT /api/settings error", e);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
