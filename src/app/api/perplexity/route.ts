import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

/**
 * Same-origin proxy for the Perplexity Discover feed.
 *
 * The browser calls this endpoint (same-origin, no CORS issues). This route
 * then fetches from Perplexity's public API. If Cloudflare blocks the
 * server-side request, we return an empty array and the client falls back
 * to the other news sources.
 *
 * Perplexity response format (from Postman capture):
 *   items[].bullet_summary_web_results_preload[] = actual articles with
 *   name, snippet, url, timestamp, meta_data.images, meta_data.domain_name
 */

interface PerplexityWebResult {
  name: string;
  snippet: string;
  url: string;
  timestamp: string;
  meta_data?: {
    images?: string[];
    published_date?: string;
    domain_name?: string;
    authors?: string[];
    description?: string;
  };
}

interface PerplexityItem {
  title?: string;
  summary?: string;
  bullet_summary_web_results_preload?: PerplexityWebResult[];
}

export async function GET(req: NextRequest) {
  try {
    const user = getSessionUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      "https://www.perplexity.ai/rest/discover/feed?limit=100&offset=0&topic=top&version=2.18&source=default",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.perplexity.ai/discover",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "sec-ch-ua":
            '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
        },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ status: "ok", items: [] });
    }

    const data = (await res.json()) as { status?: string; items?: PerplexityItem[] };
    if (!data.items || !Array.isArray(data.items)) {
      return NextResponse.json({ status: "ok", items: [] });
    }

    // Flatten: each Perplexity card has web_results with actual article links.
    // Return the raw items and let the client parse them.
    return NextResponse.json({ status: "ok", items: data.items });
  } catch {
    // Cloudflare challenge or network error — return empty so client falls back.
    return NextResponse.json({ status: "ok", items: [] });
  }
}
