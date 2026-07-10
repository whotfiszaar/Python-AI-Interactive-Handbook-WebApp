import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";

export async function POST(req: NextRequest) {
  try {
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventType, description, details } = await req.json();

    if (!eventType || !description) {
      return NextResponse.json({ error: "Missing eventType or description" }, { status: 400 });
    }

    // Log the client-side interaction to Qdrant
    await logQdrantInteraction(
      user.userId,
      user.username,
      eventType,
      description,
      details || {}
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Client log-interaction error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
