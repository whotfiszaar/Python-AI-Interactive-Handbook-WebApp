import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync } from "@/lib/auth";
import { backupNotebookToQdrant } from "@/lib/qdrant";
import type { NotebookPayload } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const { id } = await params;
    const record = await db.notebook.findUnique({ where: { id: Number(id) } });
    if (!record || record.userId !== user.userId) {
      return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch (e) {
    console.error("GET /api/notebooks/[id] error", e);
    return NextResponse.json({ error: "Failed to load notebook" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const { id } = await params;
    const body = (await req.json()) as NotebookPayload;
    const existing = await db.notebook.findUnique({ where: { id: Number(id) } });
    if (!existing || existing.userId !== user.userId) {
      return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
    }

    const record = await db.notebook.update({
      where: { id: Number(id) },
      data: {
        ...(typeof body.name === "string" ? { name: body.name } : {}),
        ...(body.cells !== undefined ? { cells: JSON.stringify(body.cells) } : {}),
      },
    });

    // 🔁 Backup updated state to Qdrant
    void backupNotebookToQdrant(user.userId, user.username, {
      localId: record.id,
      name: record.name,
      cells: record.cells,
      createdAt: record.createdAt.toISOString(),
      updatedAt: record.updatedAt.toISOString(),
    });

    return NextResponse.json(record);
  } catch (e) {
    console.error("PUT /api/notebooks/[id] error", e);
    return NextResponse.json({ error: "Failed to update notebook" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const { id } = await params;
    const existing = await db.notebook.findUnique({ where: { id: Number(id) } });
    if (!existing || existing.userId !== user.userId) {
      return NextResponse.json({ error: "Notebook not found" }, { status: 404 });
    }

    await db.notebook.delete({ where: { id: Number(id) } });

    // 🔁 Mark notebook as deleted in Qdrant so it won't be restored
    void backupNotebookToQdrant(user.userId, user.username, {
      localId: existing.id,
      name: existing.name,
      cells: existing.cells,
      createdAt: existing.createdAt.toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: true,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/notebooks/[id] error", e);
    return NextResponse.json({ error: "Failed to delete notebook" }, { status: 500 });
  }
}
