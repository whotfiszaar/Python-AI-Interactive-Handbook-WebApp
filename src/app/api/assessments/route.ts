import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";
import type { AssessmentPayload } from "@/types";

export async function GET(req: NextRequest) {
  try {
    await ensureReady();
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const records = await db.assessmentScore.findMany({
      where: { userId: user.userId },
      orderBy: { completedAt: "desc" },
    });
    return NextResponse.json(records);
  } catch (e) {
    console.error("GET /api/assessments error", e);
    return NextResponse.json(
      { error: "Failed to load assessment scores" },
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

    const body = (await req.json()) as AssessmentPayload;
    if (!body.assessmentId) {
      return NextResponse.json(
        { error: "assessmentId is required" },
        { status: 400 },
      );
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

    // Log to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      "quiz_submit",
      `Completed assessment ${body.assessmentId} with score ${body.score}/${body.total}`,
      {
        assessmentId: body.assessmentId,
        score: body.score,
        total: body.total,
      }
    );

    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/assessments error", e);
    return NextResponse.json(
      { error: "Failed to save assessment score" },
      { status: 500 },
    );
  }
}
