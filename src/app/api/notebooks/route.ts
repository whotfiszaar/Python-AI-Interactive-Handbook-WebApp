import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { NotebookPayload } from "@/types";

export async function GET() {
  try {
    const records = await db.notebook.findMany({
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
    const body = (await req.json()) as NotebookPayload;
    if (!body.name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const record = await db.notebook.create({
      data: {
        name: body.name,
        cells: JSON.stringify(body.cells ?? []),
      },
    });
    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/notebooks error", e);
    return NextResponse.json(
      { error: "Failed to save notebook" },
      { status: 500 },
    );
  }
}
