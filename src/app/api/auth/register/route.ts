import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { logQdrantInteraction } from "@/lib/qdrant";

export async function POST(req: NextRequest) {
  try {
    const { username, password, name, securityQuestion, securityAnswer } = await req.json();

    if (!username || !password || !name || !securityQuestion || !securityAnswer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Check if username already exists
    const existingUser = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
    }

    // Create user and associated settings in a transaction
    const passwordHash = hashPassword(password);
    const securityAnswerHash = hashPassword(securityAnswer.trim().toLowerCase());

    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          username: normalizedUsername,
          passwordHash,
          name: name.trim(),
          securityQuestion: securityQuestion.trim(),
          securityAnswer: securityAnswerHash,
        },
      });

      // Initialize default settings for this user
      await tx.settings.create({
        data: {
          userId: newUser.id,
          darkMode: false,
          fontSize: 16,
          apiKeys: "{}",
          studentName: newUser.name,
        },
      });

      return newUser;
    });

    // Log registration to Qdrant
    await logQdrantInteraction(
      user.id,
      user.username,
      "user_register",
      `New user registered: ${user.username}`,
      { name: user.name }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });

    setSessionCookie(response, {
      userId: user.id,
      username: user.username,
      name: user.name,
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
