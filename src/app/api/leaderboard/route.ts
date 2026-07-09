import { NextResponse } from "next/server";

/**
 * Proxy for the Arena AI Leaderboards API.
 * Free, no auth. Caches for 1 hour.
 * Source: https://api.wulong.dev/arena-ai-leaderboards/v1/
 */

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const BASE = "https://api.wulong.dev/arena-ai-leaderboards/v1";

let cache: { at: number; data: unknown } | null = null;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || "text";

  // Serve from cache if fresh.
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(`${BASE}/leaderboard?name=${encodeURIComponent(name)}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    cache = { at: Date.now(), data };
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/leaderboard error", e);
    // Return stale cache if available.
    if (cache) return NextResponse.json(cache.data);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard", models: [] },
      { status: 502 },
    );
  }
}
