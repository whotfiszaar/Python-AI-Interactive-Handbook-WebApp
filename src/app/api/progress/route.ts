import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";
import type { ProgressPayload } from "@/types";

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

    const records = await db.dayProgress.findMany({
      where: { userId: user.userId },
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
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (user.username === "admin") {
      return NextResponse.json({ error: "Student account required" }, { status: 403 });
    }

    const body = (await req.json()) as ProgressPayload;
    if (typeof body.dayNumber !== "number") {
      return NextResponse.json(
        { error: "dayNumber is required" },
        { status: 400 },
      );
    }
    
    const record = await db.dayProgress.upsert({
      where: {
        dayNumber_userId: {
          dayNumber: body.dayNumber,
          userId: user.userId,
        },
      },
      update: {
        ...(typeof body.completed === "boolean"
          ? { completed: body.completed }
          : {}),
        ...(typeof body.bookmarked === "boolean"
          ? { bookmarked: body.bookmarked }
          : {}),
        ...(typeof body.notes === "string" ? { notes: body.notes } : {}),
        ...(typeof body.quizAnswers === "string"
          ? { quizAnswers: body.quizAnswers }
          : {}),
        lastVisited: new Date(),
      },
      create: {
        dayNumber: body.dayNumber,
        completed: body.completed ?? false,
        bookmarked: body.bookmarked ?? false,
        notes: body.notes ?? "",
        quizAnswers: body.quizAnswers ?? "{}",
        userId: user.userId,
        lastVisited: new Date(),
      },
    });

    // Log to Qdrant
    let changeDesc = `Updated progress for Day ${body.dayNumber}: `;
    if (typeof body.completed === "boolean") changeDesc += `completed=${body.completed} `;
    if (typeof body.bookmarked === "boolean") changeDesc += `bookmarked=${body.bookmarked} `;
    if (typeof body.notes === "string") changeDesc += `notes updated `;
    if (typeof body.quizAnswers === "string") changeDesc += `quiz answers updated `;

    await logQdrantInteraction(
      user.userId,
      user.username,
      "progress_update",
      changeDesc.trim(),
      {
        dayNumber: body.dayNumber,
        completed: body.completed,
        bookmarked: body.bookmarked,
        notesLength: body.notes?.length ?? 0,
        hasQuizAnswers: typeof body.quizAnswers === "string",
      }
    );

    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/progress error", e);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 },
    );
  }
}
