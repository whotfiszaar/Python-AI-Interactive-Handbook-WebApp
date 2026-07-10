import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Support copying SQLite DB to /tmp in Vercel environments to allow writes
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  const targetDbPath = "/tmp/custom.db";
  const sourceDbPath = path.resolve(process.cwd(), "db/custom.db");
  
  if (!fs.existsSync(targetDbPath) && fs.existsSync(sourceDbPath)) {
    try {
      const dir = path.dirname(targetDbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(sourceDbPath, targetDbPath);
      console.log(`Successfully copied database to ${targetDbPath}`);
    } catch (error) {
      console.error("Failed to copy SQLite database to /tmp:", error);
    }
  }
  
  // Set DATABASE_URL to use the writable database in /tmp
  process.env.DATABASE_URL = `file:${targetDbPath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/**
 * Run lightweight schema migrations to add missing columns.
 * Uses Prisma's $executeRawUnsafe with SQLite ALTER TABLE.
 * Each migration is guarded so it's safe to run multiple times.
 */
async function migrateSchema() {
  try {
    // Check if quizAnswers column exists on DayProgress
    const cols = await db.$queryRawUnsafe<{ name: string }[]>(
      `PRAGMA table_info("DayProgress")`
    );
    const hasQuizAnswers = cols.some((c) => c.name === "quizAnswers");
    if (!hasQuizAnswers) {
      await db.$executeRawUnsafe(
        `ALTER TABLE "DayProgress" ADD COLUMN "quizAnswers" TEXT NOT NULL DEFAULT '{}'`
      );
      console.log("Migration: added quizAnswers column to DayProgress");
    }
  } catch (error) {
    console.error("Schema migration error:", error);
  }
}

// Flag to track if migrations have run in this process
let migrated = false;

/**
 * Ensure the database schema is up to date and default settings exist.
 * Call this from API routes before any database operations.
 */
export async function ensureReady() {
  if (!migrated) {
    await migrateSchema();
    migrated = true;
  }
  await ensureDefaultSettings();
}

// Ensure default settings row exists
export async function ensureDefaultSettings() {
  try {
    const existing = await db.settings.findFirst();
    if (!existing) {
      await db.settings.create({
        data: { darkMode: false, fontSize: 16, apiKeys: "{}", studentName: "" },
      });
    }
    return existing;
  } catch {
    return null;
  }
}
