import { NextRequest, NextResponse } from "next/server";
import { db, ensureReady } from "@/lib/db";
import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin-auth";
import { getAllUsersFromQdrant, deleteUserFromQdrant, backupUserToQdrant } from "@/lib/qdrant";
import { hashPassword } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    await ensureReady();

    // 1. Fetch all users from Qdrant backup
    const qdrantUsers = await getAllUsersFromQdrant();

    // 2. Fetch all local SQLite users
    const localUsers = await db.user.findMany();
    const localUsernames = new Set(localUsers.map((u) => u.username));

    // 3. Sync missing users from Qdrant into local SQLite
    for (const qu of qdrantUsers) {
      if (!localUsernames.has(qu.username)) {
        const { syncUserFromQdrant } = await import("@/lib/qdrant");
        await syncUserFromQdrant(qu.username);
      }
    }

    // 4. Return the full synchronized list from local SQLite
    const syncedUsers = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        name: true,
        securityQuestion: true,
        createdAt: true,
      }
    });

    return NextResponse.json(syncedUsers);
  } catch (error) {
    console.error("GET /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    await ensureReady();
    const { username, newPassword } = await req.json();

    if (!username || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // Find local user
    let user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update password hash locally
    const passwordHash = hashPassword(newPassword);
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Update Qdrant backup
    await backupUserToQdrant({
      id: updatedUser.id,
      username: updatedUser.username,
      passwordHash: updatedUser.passwordHash,
      name: updatedUser.name,
      securityQuestion: updatedUser.securityQuestion,
      securityAnswer: updatedUser.securityAnswer
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("PUT /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAdminAuthorized(req))) return unauthorizedResponse();
  try {
    await ensureReady();
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const normalizedUsername = username.trim().toLowerCase();

    // 1. Delete locally from SQLite (cascades to progress, scores, notebooks, settings)
    const user = await db.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (user) {
      await db.user.delete({
        where: { id: user.id },
      });
    }

    // 2. Delete backup from Qdrant
    await deleteUserFromQdrant(normalizedUsername);

    return NextResponse.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/users error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
