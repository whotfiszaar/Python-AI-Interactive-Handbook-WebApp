import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// The placeholder name baked into the lesson content. When the learner sets
// their own name in Settings, every occurrence of this token is swapped for
// their name at render time.
export const DEFAULT_STUDENT_NAME = "Aarav";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Replace the placeholder student name ("Aarav") with the learner's actual
 * name. If the learner has not set a name yet, the text is returned unchanged
 * so the default placeholder continues to show.
 *
 * Replaces "Aarav Singh" first (so a full-name context maps to the learner's
 * full name), then any remaining standalone "Aarav".
 */
export function substituteName(text: string, name: string): string {
  if (!text) return text;
  const trimmed = name?.trim();
  if (!trimmed) return text;
  // "Aarav Singh" appears in some lessons (string methods on a full name).
  // Map the entire phrase to the learner's name so it stays natural.
  let out = text.split("Aarav Singh").join(trimmed);
  out = out.split(DEFAULT_STUDENT_NAME).join(trimmed);
  return out;
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function daysAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`;
  return formatDate(d);
}

export function percentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normalize a text answer for comparison.
 *
 * Pyodide's `setStdout({ batched })` callback fires once per `print()` call
 * WITHOUT the trailing newline, so the runner re-adds `"\n"` after each batch.
 * That means a program with two `print()` statements produces output like
 * `"Hello\nWorld\n"` while the stored expected answer is `"Hello\nWorld"`.
 *
 * To make grading robust regardless of trailing-newline quirks, line-ending
 * differences (\r\n vs \n), or accidental trailing spaces on individual lines,
 * this helper:
 *   1. Normalizes all line breaks to `\n`
 *   2. Removes trailing whitespace from every line
 *   3. Collapses trailing blank lines
 *   4. Trims the overall string
 *   5. Lowercases it (keeps the existing case-insensitive grading behavior)
 */
export function normalizeAnswer(text: string): string {
  if (!text) return "";
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Compare a user's answer to the expected answer using the normalized form.
 * Used by fill-blank and code-output quiz questions.
 */
export function answersMatch(user: string, expected: string): boolean {
  return normalizeAnswer(user) === normalizeAnswer(expected);
}

export function genId(): string {
  return Math.random().toString(36).slice(2, 11);
}

// Check whether code uses the OpenAI/OpenRouter client pattern
export function isAICode(code: string): boolean {
  return (
    code.includes("from openai import OpenAI") ||
    code.includes("import openai") ||
    code.includes("base_url") ||
    code.includes("openrouter")
  );
}

// Stable streak calculation: consecutive days (calendar) with at least one day visited
export function computeStreak(visitedDates: string[]): number {
  if (visitedDates.length === 0) return 0;
  const days = new Set(
    visitedDates.map((d) => new Date(d).toISOString().slice(0, 10)),
  );
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  // If today not visited, start from yesterday so streak doesn't reset until a day is missed
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Log client-side user interaction to the server which upserts to Qdrant.
 */
export async function logInteraction(
  eventType: string,
  description: string,
  details: any = {}
) {
  try {
    await fetch("/api/log-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        description,
        details,
      }),
    });
  } catch (error) {
    console.error("Failed to log interaction client-side:", error);
  }
}
