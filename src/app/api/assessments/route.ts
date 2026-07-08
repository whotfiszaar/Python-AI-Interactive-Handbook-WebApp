import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { AssessmentPayload } from "@/types";

export async function GET() {
  try {
    const records = await db.assessmentScore.findMany({
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
      },
    });
    return NextResponse.json(record);
  } catch (e) {
    console.error("POST /api/assessments error", e);
    return NextResponse.json(
      { error: "Failed to save assessment score" },
      { status: 500 },
    );
  }
}
