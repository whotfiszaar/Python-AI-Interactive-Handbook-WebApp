import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { logQdrantInteraction, backupUserToQdrant } from "@/lib/qdrant";

export async function POST(req: NextRequest) {
  try {
    await ensureReady();
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

    const { syncUserFromQdrant } = await import("@/lib/qdrant");
    const qdrantUser = await syncUserFromQdrant(normalizedUsername);
    if (qdrantUser) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
    }

    // Create user and associated settings in a transaction
    const passwordHash = hashPassword(password);
    const securityAnswerHash = hashPassword(securityAnswer.trim().toLowerCase());

    const user = await db.$transaction(async (tx) => {
      const randomUserId = Math.floor(Math.random() * 1000000000) + 10000;
      const newUser = await tx.user.create({
        data: {
          id: randomUserId,
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

    // Backup credentials to Qdrant
    await backupUserToQdrant({
      id: user.id,
      username: user.username,
      passwordHash: user.passwordHash,
      name: user.name,
      securityQuestion: user.securityQuestion,
      securityAnswer: user.securityAnswer
    });

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
