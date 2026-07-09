import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  const videos = await db.video.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    const body = await req.json();
    const created = await db.video.create({
      data: {
        videoId: body.videoId ?? "",
        playlistId: body.playlistId ?? "",
        title: body.title ?? "",
        channel: body.channel ?? "",
        durationLabel: body.durationLabel ?? "",
        topicRange: body.topicRange ?? "",
        dayRange: body.dayRange ?? "",
        days: JSON.stringify(body.days ?? []),
        why: body.why ?? "",
        topics: JSON.stringify(body.topics ?? []),
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return NextResponse.json(created);
  } catch (e) {
    console.error("POST /api/admin/videos error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
