import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ProgressPayload } from "@/types";

export async function GET() {
  try {
    const records = await db.dayProgress.findMany({
      orderBy: { dayNumber: "asc" },
    });
    return NextResponse.json(records);
  } catch (e) {
    console.error("GET /api/progress error", e);
    return NextResponse.json(
      { error: "Failed to load progress" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ProgressPayload;
    if (typeof body.dayNumber !== "number") {
      return NextResponse.json(
        { error: "dayNumber is required" },
        { status: 400 },
      );
    }
    const record = await db.dayProgress.upsert({
      where: { dayNumber: body.dayNumber },
      update: {
        ...(typeof body.completed === "boolean"
          ? { completed: body.completed }
          : {}),
        ...(typeof body.bookmarked === "boolean"
          ? { bookmarked: body.bookmarked }
          : {}),
        ...(typeof body.notes === "string" ? { notes: body.notes } : {}),
        lastVisited: new Date(),
      },
      create: {
        dayNumber: body.dayNumber,
        completed: body.completed ?? false,
        bookmarked: body.bookmarked ?? false,
        notes: body.notes ?? "",
        lastVisited: new Date(),
      },
    });
    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/progress error", e);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 },
    );
  }
}
