import { NextResponse } from "next/server";
import { aggregateNews, type NewsArticle } from "@/lib/news-aggregator";

/**
 * AI News endpoint (zero API keys).
 *
 * Aggregates AI/Python content from five public sources:
 *   1. Hacker News (Firebase JSON)
 *   2. Reddit (public .rss Atom feeds)
 *   3. RSS feeds (OpenAI, HuggingFace, Google AI, TechCrunch, VentureBeat, etc.)
 *   4. GitHub trending Python repos (cheerio-parsed HTML)
 *   5. PyPI newest packages (RSS, AI/ML filtered)
 *
 * Results are cached in memory for 20 minutes.
 */

const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

interface NewsResponse {
  status: string;
  count: number;
  cachedAt?: string;
  error?: string;
  articles: NewsArticle[];
}

let cache: { at: number; articles: NewsArticle[] } | null = null;

// Background refresh: start a fresh fetch when the cache is stale, without
// blocking the current request (serves stale data, refreshes behind).
let refreshing: Promise<NewsArticle[]> | null = null;

async function refresh(): Promise<NewsArticle[]> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    try {
      const articles = await aggregateNews();
      cache = { at: Date.now(), articles };
      return articles;
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

export async function GET() {
  // Serve from cache if fresh.
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    // Trigger a background refresh if we're past 80% of TTL (stale-while-revalidate).
    if (Date.now() - cache.at > CACHE_TTL_MS * 0.8) {
      void refresh().catch(() => {});
    }
    return NextResponse.json({
      status: "ok",
      count: cache.articles.length,
      cachedAt: new Date(cache.at).toISOString(),
      articles: cache.articles,
    } satisfies NewsResponse);
  }

  // No cache or stale: fetch fresh.
  try {
    const articles = await refresh();
    return NextResponse.json({
      status: "ok",
      count: articles.length,
      cachedAt: new Date(cache!.at).toISOString(),
      articles,
    } satisfies NewsResponse);
  } catch (e) {
    console.error("GET /api/news error", e);
    // Fall back to stale cache if available.
    if (cache) {
      return NextResponse.json({
        status: "ok",
        count: cache.articles.length,
        cachedAt: new Date(cache.at).toISOString(),
        articles: cache.articles,
      } satisfies NewsResponse);
    }
    return NextResponse.json(
      {
        status: "error",
        error: "Failed to fetch news",
        articles: [],
      } satisfies NewsResponse,
      { status: 502 },
    );
  }
}
