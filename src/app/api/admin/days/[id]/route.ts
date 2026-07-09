import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

/** GET /api/admin/days/[id] */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  const day = await db.day.findUnique({ where: { id: Number(id) } });
  if (!day) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(day);
}

/** PUT /api/admin/days/[id] - update a day */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await db.day.update({
      where: { id: Number(id) },
      data: {
        ...(body.dayNumber != null ? { dayNumber: body.dayNumber } : {}),
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.phase != null ? { phase: body.phase } : {}),
        ...(body.objectives != null
          ? { objectives: JSON.stringify(body.objectives) }
          : {}),
        ...(body.content != null
          ? { content: JSON.stringify(body.content) }
          : {}),
        ...(body.exercises != null
          ? { exercises: JSON.stringify(body.exercises) }
          : {}),
        ...(body.quiz != null ? { quiz: JSON.stringify(body.quiz) } : {}),
        ...(body.teacherNotes != null
          ? { teacherNotes: body.teacherNotes }
          : {}),
        ...(body.explainToFriend != null
          ? { explainToFriend: body.explainToFriend }
          : {}),
        ...(body.realWorldExamples != null
          ? { realWorldExamples: JSON.stringify(body.realWorldExamples) }
          : {}),
        ...(body.thingsToGoogle != null
          ? { thingsToGoogle: JSON.stringify(body.thingsToGoogle) }
          : {}),
        ...(body.setupInstructions != null
          ? { setupInstructions: body.setupInstructions }
          : {}),
        ...(body.expectedOutput != null
          ? { expectedOutput: body.expectedOutput }
          : {}),
        ...(body.debugging != null
          ? { debugging: JSON.stringify(body.debugging) }
          : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PUT /api/admin/days error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

/** DELETE /api/admin/days/[id] */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  try {
    await db.day.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/days error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
