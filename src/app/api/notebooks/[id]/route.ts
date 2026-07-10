import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";
import type { NotebookPayload } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    const { id } = await params;
    const record = await db.notebook.findUnique({ where: { id: Number(id) } });
    if (!record || record.userId !== user.userId) {
      return NextResponse.json(
        { error: "Notebook not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(record);
  } catch (e) {
    console.error("GET /api/notebooks/[id] error", e);
    return NextResponse.json(
      { error: "Failed to load notebook" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    const { id } = await params;
    const body = (await req.json()) as NotebookPayload;
    const existing = await db.notebook.findUnique({
      where: { id: Number(id) },
    });
    if (!existing || existing.userId !== user.userId) {
      return NextResponse.json(
        { error: "Notebook not found" },
        { status: 404 },
      );
    }
    const record = await db.notebook.update({
      where: { id: Number(id) },
      data: {
        ...(typeof body.name === "string" ? { name: body.name } : {}),
        ...(body.cells !== undefined
          ? { cells: JSON.stringify(body.cells) }
          : {}),
      },
    });

    // Log to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      "notebook_update",
      `Updated custom notebook: ${record.name}`,
      {
        notebookId: record.id,
        name: record.name,
        cellsCount: Array.isArray(body.cells) ? body.cells.length : 0,
      }
    );

    return NextResponse.json(record);
  } catch (e) {
    console.error("PUT /api/notebooks/[id] error", e);
    return NextResponse.json(
      { error: "Failed to update notebook" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    const { id } = await params;
    const existing = await db.notebook.findUnique({
      where: { id: Number(id) },
    });
    if (!existing || existing.userId !== user.userId) {
      return NextResponse.json(
        { error: "Notebook not found" },
        { status: 404 },
      );
    }

    await db.notebook.delete({ where: { id: Number(id) } });

    // Log to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      "notebook_delete",
      `Deleted custom notebook: ${existing.name}`,
      {
        notebookId: existing.id,
        name: existing.name,
      }
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/notebooks/[id] error", e);
    return NextResponse.json(
      { error: "Failed to delete notebook" },
      { status: 500 },
    );
  }
}
