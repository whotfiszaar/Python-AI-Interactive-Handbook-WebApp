import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

let databaseUrl = process.env.DATABASE_URL;

// Support copying SQLite DB to /tmp in Vercel environments to allow writes
if (process.env.NODE_ENV === "production" || process.env.VERCEL || process.env.SQLITE_WRITABLE_DATABASE_URL) {
  const configuredTarget = process.env.VERCEL
    ? "/tmp/custom.db"
    : (process.env.SQLITE_WRITABLE_DATABASE_URL
        ? process.env.SQLITE_WRITABLE_DATABASE_URL.replace(/^file:/, "")
        : "/tmp/custom.db");
  const targetDbPath = path.isAbsolute(configuredTarget)
    ? configuredTarget
    : path.resolve(process.cwd(), configuredTarget);
  const sourceDbPath = path.resolve(process.cwd(), "db/custom.db");
  
  if (!fs.existsSync(targetDbPath) && fs.existsSync(sourceDbPath)) {
    try {
      const dir = path.dirname(targetDbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(sourceDbPath, targetDbPath);
      fs.chmodSync(targetDbPath, 0o666);
      console.log(`Successfully copied database to ${targetDbPath} with write permissions`);
    } catch (error) {
      console.error("Failed to copy SQLite database to /tmp:", error);
    }
  } else if (fs.existsSync(targetDbPath)) {
    try {
      fs.chmodSync(targetDbPath, 0o666);
    } catch (error) {
      console.error("Failed to set write permissions on existing database:", error);
    }
  }

  // Ensure journal files are writable if they exist
  try {
    const journalFiles = [
      targetDbPath + "-journal",
      targetDbPath + "-wal",
      targetDbPath + "-shm",
    ];
    for (const j of journalFiles) {
      if (fs.existsSync(j)) {
        fs.chmodSync(j, 0o666);
      }
    }
  } catch (err) {
    console.error("Failed to set SQLite journal file permissions:", err);
  }
  
  databaseUrl = `file:${targetDbPath.replace(/\\/g, "/")}`;
  process.env.DATABASE_URL = databaseUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
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
 * Ensure the database schema is up to date.
 * Call this from API routes before any database operations.
 */
export async function ensureReady() {
  if (!migrated) {
    await migrateSchema();
    // Ensure the global admin settings row exists (userId IS NULL)
    try {
      const globalSettings = await db.settings.findFirst({ where: { userId: null } });
      if (!globalSettings) {
        await db.settings.create({
          data: { darkMode: false, fontSize: 16, apiKeys: "{}", studentName: "", adminPassword: "admin123" },
        });
        console.log("Created global admin settings row");
      }
    } catch (err) {
      console.error("Failed to create global admin settings:", err);
    }
    migrated = true;
  }
}

/**
 * Ensure a per-user settings row exists. Called lazily from settings API.
 * Do NOT call this globally — settings must be user-scoped.
 */
export async function ensureUserSettings(userId: number, name: string) {
  try {
    const existing = await db.settings.findUnique({ where: { userId } });
    if (!existing) {
      await db.settings.create({
        data: { userId, darkMode: false, fontSize: 16, apiKeys: "{}", studentName: name },
      });
    }
    return existing;
  } catch {
    return null;
  }
}
