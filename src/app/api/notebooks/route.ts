import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";
import type { NotebookPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const records = await db.notebook.findMany({
      where: { userId: user.userId },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(records);
  } catch (e) {
    console.error("GET /api/notebooks error", e);
    return NextResponse.json(
      { error: "Failed to load notebooks" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureReady();
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as NotebookPayload;
    if (!body.name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const record = await db.notebook.create({
      data: {
        name: body.name,
        cells: JSON.stringify(body.cells ?? []),
        userId: user.userId,
      },
    });

    // Log to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      "notebook_create",
      `Created custom notebook: ${body.name}`,
      {
        notebookId: record.id,
        name: body.name,
        cellsCount: body.cells?.length ?? 0,
      }
    );

    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/notebooks error", e);
    return NextResponse.json(
      { error: "Failed to save notebook" },
      { status: 500 },
    );
  }
}
