import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  const video = await db.video.findUnique({ where: { id: Number(id) } });
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(video);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const { id } = await params;
  try {
    const body = await req.json();
    const updated = await db.video.update({
      where: { id: Number(id) },
      data: {
        ...(body.videoId != null ? { videoId: body.videoId } : {}),
        ...(body.playlistId != null ? { playlistId: body.playlistId } : {}),
        ...(body.title != null ? { title: body.title } : {}),
        ...(body.channel != null ? { channel: body.channel } : {}),
        ...(body.durationLabel != null
          ? { durationLabel: body.durationLabel }
          : {}),
        ...(body.topicRange != null ? { topicRange: body.topicRange } : {}),
        ...(body.dayRange != null ? { dayRange: body.dayRange } : {}),
        ...(body.days != null ? { days: JSON.stringify(body.days) } : {}),
        ...(body.why != null ? { why: body.why } : {}),
        ...(body.topics != null ? { topics: JSON.stringify(body.topics) } : {}),
        ...(body.sortOrder != null ? { sortOrder: body.sortOrder } : {}),
      },
    });
    return NextResponse.json(updated);
  } catch (e) {
    console.error("PUT /api/admin/videos error", e);
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
    await db.video.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/admin/videos error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
