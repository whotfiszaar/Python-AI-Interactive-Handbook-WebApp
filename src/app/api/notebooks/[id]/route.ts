import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { NotebookPayload } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const record = await db.notebook.findUnique({ where: { id: Number(id) } });
    if (!record) {
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
    const { id } = await params;
    const body = (await req.json()) as NotebookPayload;
    const existing = await db.notebook.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) {
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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await db.notebook.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/notebooks/[id] error", e);
    return NextResponse.json(
      { error: "Failed to delete notebook" },
      { status: 500 },
    );
  }
}
