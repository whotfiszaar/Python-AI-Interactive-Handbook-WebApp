import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Support copying SQLite DB to /tmp in Vercel environments to allow writes
if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
  const targetDbPath = "/tmp/custom.db";
  const sourceDbPath = path.resolve(process.cwd(), "db/custom.db");
  
  let shouldCopy = false;
  if (!fs.existsSync(targetDbPath)) {
    shouldCopy = true;
  } else if (fs.existsSync(sourceDbPath)) {
    try {
      const sourceStat = fs.statSync(sourceDbPath);
      const targetStat = fs.statSync(targetDbPath);
      // Overwrite if source is newer or size changed (indicating a new deployment or schema change)
      if (sourceStat.mtimeMs > targetStat.mtimeMs || sourceStat.size !== targetStat.size) {
        shouldCopy = true;
      }
    } catch {
      shouldCopy = true;
    }
  }

  if (shouldCopy && fs.existsSync(sourceDbPath)) {
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

// Ensure default settings row exists
export async function ensureDefaultSettings() {
  const existing = await db.settings.findUnique({ where: { id: 1 } });
  if (!existing) {
    await db.settings.create({
      data: { id: 1, darkMode: false, fontSize: 16, apiKeys: "{}", studentName: "" },
    });
  }
  return existing;
}
