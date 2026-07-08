import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { SettingsPayload } from "@/types";

export async function GET() {
  try {
    let settings = await db.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await db.settings.create({
        data: { id: 1, darkMode: false, fontSize: 16, apiKeys: "{}", studentName: "" },
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
    const body = (await req.json()) as SettingsPayload;
    let settings = await db.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
      settings = await db.settings.create({
        data: { id: 1, darkMode: false, fontSize: 16, apiKeys: "{}", studentName: "" },
      });
    }
    const updated = await db.settings.update({
      where: { id: 1 },
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
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PUT /api/settings error", e);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
