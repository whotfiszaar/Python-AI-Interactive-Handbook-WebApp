import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUserAndSync } from "@/lib/auth";
import { backupAssessmentToQdrant } from "@/lib/qdrant";
import type { AssessmentPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const records = await db.assessmentScore.findMany({
      where: { userId: user.userId },
      orderBy: { completedAt: "desc" },
    });
    return NextResponse.json(records);
  } catch (e) {
    console.error("GET /api/assessments error", e);
    return NextResponse.json({ error: "Failed to load assessment scores" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureReady();
    const user = await getSessionUserAndSync(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.username === "admin") return NextResponse.json({ error: "Student account required" }, { status: 403 });

    const body = (await req.json()) as AssessmentPayload;
    if (!body.assessmentId) {
      return NextResponse.json({ error: "assessmentId is required" }, { status: 400 });
    }

    const record = await db.assessmentScore.create({
      data: {
        assessmentId: body.assessmentId,
        score: body.score,
        total: body.total,
        answers: JSON.stringify(body.answers ?? {}),
        userId: user.userId,
      },
    });

    // 🔁 Backup to Qdrant so data survives container restarts
    void backupAssessmentToQdrant(user.userId, user.username, {
      localId: record.id,
      assessmentId: record.assessmentId,
      score: record.score,
      total: record.total,
      answers: record.answers,
      completedAt: record.completedAt.toISOString(),
    });

    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/assessments error", e);
    return NextResponse.json({ error: "Failed to save assessment score" }, { status: 500 });
  }
}
