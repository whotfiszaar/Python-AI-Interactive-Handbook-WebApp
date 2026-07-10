import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync } from "@/lib/auth";
import { backupNotebookToQdrant } from "@/lib/qdrant";
import type { NotebookPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const records = await db.notebook.findMany({
      where: { userId: user.userId },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(records);
  } catch (e) {
    console.error("GET /api/notebooks error", e);
    return NextResponse.json({ error: "Failed to load notebooks" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const body = (await req.json()) as NotebookPayload;
    if (!body.name) return NextResponse.json({ error: "name is required" }, { status: 400 });

    const record = await db.notebook.create({
      data: {
        name: body.name,
        cells: JSON.stringify(body.cells ?? []),
        userId: user.userId,
      },
    });

    // 🔁 Backup to Qdrant so data survives container restarts
    void backupNotebookToQdrant(user.userId, user.username, {
      localId: record.id,
      name: record.name,
      cells: record.cells,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });

    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/notebooks error", e);
    return NextResponse.json({ error: "Failed to save notebook" }, { status: 500 });
  }
}
