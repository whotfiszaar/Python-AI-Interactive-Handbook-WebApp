import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  const section = await db.referenceSection.findUnique({
    where: { id: Number(id) },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
  if (!section)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(section);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await db.referenceSection.update({
      where: { id: Number(id) },
      data: {
        ...(body.sectionId != null ? { sectionId: body.sectionId } : {}),
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.description != null ? { description: body.description } : {}),
        ...(body.kind != null ? { kind: body.kind } : {}),
        ...(body.sortOrder != null ? { sortOrder: body.sortOrder } : {}),
      },
      include: { items: true },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PUT /api/admin/references error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  try {
    await db.referenceSection.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/references error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
