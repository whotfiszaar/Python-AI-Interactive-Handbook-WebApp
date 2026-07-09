import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

/** GET /api/admin/days - list all days */
export async function GET(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    const days = await db.day.findMany({ orderBy: { dayNumber: "asc" } });
    return NextResponse.json(days);
  } catch (e) {
    console.error("GET /api/admin/days error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

/** POST /api/admin/days - create a new day */
export async function POST(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    const body = await req.json();
    const created = await db.day.create({
      data: {
        dayNumber: body.dayNumber,
        title: body.title ?? "",
        phase: body.phase ?? "python",
        objectives: JSON.stringify(body.objectives ?? []),
        content: JSON.stringify(body.content ?? []),
        exercises: JSON.stringify(body.exercises ?? []),
        quiz: JSON.stringify(body.quiz ?? []),
        teacherNotes: body.teacherNotes ?? "",
        explainToFriend: body.explainToFriend ?? "",
        realWorldExamples: JSON.stringify(body.realWorldExamples ?? []),
        thingsToGoogle: JSON.stringify(body.thingsToGoogle ?? []),
        setupInstructions: body.setupInstructions ?? "",
        expectedOutput: body.expectedOutput ?? "",
        debugging: JSON.stringify(body.debugging ?? []),
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error("POST /api/admin/days error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
