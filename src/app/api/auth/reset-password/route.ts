import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";

/**
 * GET: Fetch the security question for a given username.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { username: username.trim().toLowerCase() },
      select: { securityQuestion: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      securityQuestion: user.securityQuestion,
    });
  } catch (error) {
    console.error("Fetch security question error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST: Verify answer and update password.
 */
export async function POST(req: NextRequest) {
  try {
    const { username, answer, newPassword } = await req.json();

    if (!username || !answer || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify security answer
    const answerNormalized = answer.trim().toLowerCase();
    if (!verifyPassword(answerNormalized, user.securityAnswer)) {
      return NextResponse.json({ error: "Incorrect security answer" }, { status: 400 });
    }

    // Hash and update password
    const passwordHash = hashPassword(newPassword);
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Log password reset to Qdrant
    await logQdrantInteraction(
      user.id,
      user.username,
      "user_password_reset",
      `Password reset successful for user: ${user.username}`
    );

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
