/**
 * Zero-API-key news aggregator.
 *
 * Pulls AI/Python content from five public sources, merges, dedupes, and
 * returns a single sorted array. No NewsAPI, no GNews, no API keys at all.
 *
 * Sources:
 *  1. Hacker News (Firebase JSON API) - top + new stories, filtered by keywords
 *  2. Reddit (public .rss Atom feeds) - r/artificial, MachineLearning, LocalLLaMA, Python, LangChain
 *  3. RSS feeds - OpenAI, HuggingFace, Google AI, TechCrunch, VentureBeat, RealPython, PyTorch, MarkTechPost, PythonInsider
 *  4. GitHub trending - daily Python repos, parsed with cheerio
 *  5. PyPI - newest packages RSS, filtered to AI/ML/Python packages
 */

import * as cheerio from "cheerio";

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
  category: string;
  tags: string[];
}

// AI/Python keyword set for filtering HN and PyPI.
const AI_KEYWORDS = [
  "ai",
  "artificial intelligence",
  "machine learning",
  "deep learning",
  "neural network",
  "openai",
  "chatgpt",
  "gpt",
  "llm",
  "large language model",
  "claude",
  "anthropic",
  "gemini",
  "mistral",
  "deepseek",
  "glm",
  "kimi",
  "moonshot",
  "qwen",
  "nvidia",
  "gpu",
  "transformer",
  "generative ai",
  "genai",
  "copilot",
  "midjourney",
  "stable diffusion",
  "hugging face",
  "huggingface",
  "langchain",
  "crewai",
  "llama",
  "mcp",
  "model context protocol",
  "cursor",
  "pytorch",
  "tensorflow",
  "python",
  "rag",
  "agent",
  "agentic",
  "diffusion model",
  "diffusion",
  "computer vision",
  "nlp",
  "natural language processing",
  "robotics",
  "fine-tuning",
  "fine tuning",
  "embedding",
  "vector database",
  "tokenizer",
  "attention",
] as const;

const REDDIT_SUBS = [
  "artificial",
  "MachineLearning",
  "LocalLLaMA",
  "Python",
  "LangChain",
] as const;

const RSS_FEEDS = [
  { url: "https://openai.com/news/rss.xml", source: "OpenAI", category: "Company" },
  { url: "https://huggingface.co/blog/feed.xml", source: "Hugging Face", category: "Open Source" },
  { url: "https://blog.google/technology/ai/rss/", source: "Google AI", category: "Company" },
  { url: "https://feeds.feedburner.com/PythonInsider", source: "Python Insider", category: "Python" },
  { url: "https://realpython.com/atom.xml", source: "Real Python", category: "Tutorial" },
  { url: "https://www.marktechpost.com/feed/", source: "MarkTechPost", category: "Research" },
  { url: "https://venturebeat.com/category/ai/feed/", source: "VentureBeat", category: "Company" },
  { url: "https://techcrunch.com/category/artificial-intelligence/feed/", source: "TechCrunch", category: "Company" },
  { url: "https://pytorch.org/feed.xml", source: "PyTorch", category: "Framework" },
  { url: "https://news.google.com/rss/search?q=Artificial+Intelligence&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Research" },
  { url: "https://news.google.com/rss/search?q=Python+Programming&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "Python" },
  { url: "https://news.google.com/rss/search?q=Large+Language+Models&hl=en-US&gl=US&ceid=US:en", source: "Google News", category: "LLMs" },
] as const;

export function matchesAI(text: string): boolean {
  const lower = text.toLowerCase();
  return AI_KEYWORDS.some((kw) => {
    if (kw.length <= 4) {
      return new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lower);
    }
    return lower.includes(kw);
  });
}

export function tagFor(text: string): string[] {
  const lower = text.toLowerCase();
  const tags: string[] = [];
  const tagMap: Record<string, string> = {
    openai: "OpenAI",
    chatgpt: "ChatGPT",
    gpt: "GPT",
    claude: "Claude",
    anthropic: "Anthropic",
    gemini: "Gemini",
    llama: "Llama",
    glm: "GLM",
    kimi: "Kimi",
    moonshot: "Moonshot",
    qwen: "Qwen",
    deepseek: "DeepSeek",
    mistral: "Mistral",
    "langchain": "LangChain",
    "pytorch": "PyTorch",
    "tensorflow": "TensorFlow",
    "hugging face": "Hugging Face",
    huggingface: "Hugging Face",
    nvidia: "NVIDIA",
    gpu: "GPU",
    "machine learning": "ML",
    "deep learning": "Deep Learning",
    "neural network": "Neural Network",
    transformer: "Transformer",
    "large language model": "LLM",
    llm: "LLM",
    python: "Python",
    "fine-tuning": "Fine-tuning",
    rag: "RAG",
    agent: "Agents",
    mcp: "MCP",
    copilot: "Copilot",
    cursor: "Cursor",
    "diffusion": "Diffusion",
  };
  for (const [key, tag] of Object.entries(tagMap)) {
    if (lower.includes(key) && !tags.includes(tag)) tags.push(tag);
  }
  return tags.slice(0, 6);
}

export function categoryFor(source: string, title: string): string {
  const lower = (source + " " + title).toLowerCase();
  if (lower.includes("pytorch") || lower.includes("tensorflow") || lower.includes("langchain"))
    return "Framework";
  if (lower.includes("tutorial") || lower.includes("real python")) return "Tutorial";
  if (lower.includes("research") || lower.includes("paper")) return "Research";
  if (lower.includes("python")) return "Python";
  if (lower.includes("llm") || lower.includes("language model")) return "LLMs";
  if (lower.includes("nvidia") || lower.includes("gpu") || lower.includes("chip")) return "Hardware";
  if (lower.includes("openai") || lower.includes("google") || lower.includes("anthropic")) return "Company";
  if (lower.includes("open source") || lower.includes("hugging")) return "Open Source";
  return "AI";
}

function extractImage(block: string): string | null {
  // RSS enclosure
  let m = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (m) return m[1];
  // media:content
  m = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (m) return m[1];
  // media:thumbnail
  m = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (m) return m[1];
  // og:image in content
  m = block.match(/og:image["'\s:]+content=["']([^"']+)["']/i);
  if (m) return m[1];
  // any <img src="...">
  m = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m) return m[1];
  return null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
}

function textBetween(haystack: string, start: string, end: string): string {
  const s = haystack.indexOf(start);
  if (s < 0) return "";
  const e = haystack.indexOf(end, s + start.length);
  if (e < 0) return "";
  return haystack.slice(s + start.length, e);
}

// ---------------------------------------------------------------------------
// SOURCE 1: Hacker News
// ---------------------------------------------------------------------------

async function fetchHackerNews(): Promise<NewsArticle[]> {
  try {
    const [topRes, newRes] = await Promise.all([
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json"),
      fetch("https://hacker-news.firebaseio.com/v0/newstories.json"),
    ]);
    if (!topRes.ok || !newRes.ok) return [];
    const top = ((await topRes.json()) as number[]).slice(0, 40);
    const newest = ((await newRes.json()) as number[]) as number[];
    const ids = Array.from(new Set([...top, ...newest.slice(0, 60)])).slice(0, 80);
    const articles: NewsArticle[] = [];
    // Fetch items in batches of 10 to be gentle.
    for (let i = 0; i < ids.length; i += 10) {
      const batch = ids.slice(i, i + 10);
      const items = await Promise.all(
        batch.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ),
      );
      for (const item of items) {
        if (!item || item.type !== "story" || !item.title) continue;
        const haystack = `${item.title} ${item.url ?? ""}`;
        if (!matchesAI(haystack)) continue;
        articles.push({
          title: item.title,
          description: null,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
          image: null,
          publishedAt: new Date(item.time * 1000).toISOString(),
          source: "Hacker News",
          category: categoryFor("Hacker News", item.title),
          tags: tagFor(haystack),
        });
      }
    }
    return articles;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// SOURCE 2: Reddit (public .rss Atom feeds)
// ---------------------------------------------------------------------------

async function fetchReddit(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  await Promise.all(
    REDDIT_SUBS.map(async (sub) => {
      try {
        const res = await fetch(`https://www.reddit.com/r/${sub}/.rss?limit=25`, {
          headers: { "User-Agent": "PythonAIHandbook/1.0 (news aggregator)" },
        });
        if (!res.ok) return;
        const xml = await res.text();
        const entries = xml.split("<entry>").slice(1);
        for (const raw of entries) {
          const end = raw.indexOf("</entry>");
          const block = end >= 0 ? raw.slice(0, end) : raw;
          const title = decodeEntities(textBetween(block, "<title>", "</title>"));
          const link = block.match(/<link[^>]*href=["']([^"']+)["']/i);
          const updated = textBetween(block, "<updated>", "</updated>");
          const content = textBetween(block, "<content", "</content>");
          if (!title || !link) continue;
          const url = link[1];
          if (url.includes("/comments/")) {
            // Skip comment links, only keep link posts
          }
          articles.push({
            title,
            description: null,
            url,
            image: extractImage(content),
            publishedAt: updated ? new Date(updated).toISOString() : new Date().toISOString(),
            source: `r/${sub}`,
            category: categoryFor(sub, title),
            tags: tagFor(`${sub} ${title}`),
          });
        }
      } catch {
        // ignore
      }
    }),
  );
  return articles;
}

// ---------------------------------------------------------------------------
// SOURCE 3: RSS feeds
// ---------------------------------------------------------------------------

async function fetchRSS(): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = [];
  await Promise.all(
    RSS_FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          headers: { "User-Agent": "PythonAIHandbook/1.0 (news aggregator)" },
        });
        if (!res.ok) return;
        const xml = await res.text();
        // RSS 2.0 <item> or Atom <entry>
        const items = xml.split(/<item>|<entry>/).slice(1);
        for (const raw of items) {
          const end = raw.search(/<\/item>|<\/entry>/);
          const block = end >= 0 ? raw.slice(0, end) : raw;
          const title = decodeEntities(
            textBetween(block, "<title>", "</title>"),
          );
          // RSS link or Atom link href
          let link =
            textBetween(block, "<link>", "</link>") ||
            block.match(/<link[^>]*href=["']([^"']+)["]/i)?.[1] ||
            "";
          link = decodeEntities(link).trim();
          if (!title || !link) continue;
          const pubDate =
            textBetween(block, "<pubDate>", "</pubDate>") ||
            textBetween(block, "<published>", "</published>") ||
            textBetween(block, "<updated>", "</updated>");
          const desc = decodeEntities(
            textBetween(block, "<description>", "</description>") ||
              textBetween(block, "<summary>", "</summary>"),
          )
            .replace(/<[^>]+>/g, "")
            .trim();
          const haystack = `${title} ${desc}`;
          // For non-AI-specific feeds (PythonInsider, RealPython, PyPI, Google News Python),
          // filter by keywords. For AI-specific feeds, keep all.
          const needsFilter =
            feed.source === "Python Insider" ||
            feed.source === "Real Python" ||
            feed.source === "Google News";
          if (needsFilter && !matchesAI(haystack)) continue;
          articles.push({
            title,
            description: desc ? desc.slice(0, 280) : null,
            url: link,
            image: extractImage(block),
            publishedAt: pubDate
              ? new Date(pubDate).toISOString()
              : new Date().toISOString(),
            source: feed.source,
            category: feed.category,
            tags: tagFor(haystack),
          });
        }
      } catch {
        // ignore
      }
    }),
  );
  return articles;
}

// ---------------------------------------------------------------------------
// SOURCE 4: GitHub trending
// ---------------------------------------------------------------------------

async function fetchGitHubTrending(): Promise<NewsArticle[]> {
  try {
    const res = await fetch("https://github.com/trending/python?since=daily", {
      headers: { "User-Agent": "PythonAIHandbook/1.0 (news aggregator)" },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    $("article.Box-row").each((_, el) => {
      const $el = $(el);
      const name = $el.find("h2 a").text().trim().replace(/\s+/g, " ");
      if (!name) return;
      const href = $el.find("h2 a").attr("href");
      if (!href) return;
      const desc = $el.find("p").text().trim();
      const stars = $el.find(".Float-sm-right").text().trim();
      const repoUrl = `https://github.com${href}`;
      const haystack = `${name} ${desc}`;
      if (!matchesAI(haystack)) return;
      const image = `https://opengraph.githubassets.com/1${href}`;
      articles.push({
        title: name,
        description: desc || (stars ? `${stars} today` : null),
        url: repoUrl,
        image,
        publishedAt: new Date().toISOString(),
        source: "GitHub Trending",
        category: "GitHub",
        tags: tagFor(haystack),
      });
    });
    return articles;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// SOURCE 5: PyPI newest packages
// ---------------------------------------------------------------------------

async function fetchPyPI(): Promise<NewsArticle[]> {
  try {
    const res = await fetch("https://pypi.org/rss/packages.xml");
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split("<item>").slice(1);
    const articles: NewsArticle[] = [];
    for (const raw of items.slice(0, 100)) {
      const end = raw.indexOf("</item>");
      const block = end >= 0 ? raw.slice(0, end) : raw;
      const title = decodeEntities(textBetween(block, "<title>", "</title>"));
      const link = decodeEntities(textBetween(block, "<link>", "</link>"));
      const pubDate = textBetween(block, "<pubDate>", "</pubDate>");
      if (!title || !link) continue;
      if (!matchesAI(title)) continue;
      articles.push({
        title: title.replace(" added to PyPI", ""),
        description: null,
        url: link,
        image: null,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        source: "PyPI",
        category: "PyPI",
        tags: tagFor(title),
      });
    }
    return articles;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// AGGREGATOR
// ---------------------------------------------------------------------------

/** Official sources preferred for dedup (higher priority keeps its copy). */
const OFFICIAL_SOURCES = new Set([
  "OpenAI",
  "Google AI",
  "Hugging Face",
  "PyTorch",
  "Anthropic",
]);

/**
 * Fetch the og:image (or twitter:image) for an article URL by downloading
 * the HTML head and extracting the meta tag. Used to enrich articles that
 * don't have an image from their RSS feed.
 */
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "PythonAIHandbook/1.0 (news aggregator)" },
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    if (!res.ok) return null;
    // Only read the first 20KB to find meta tags in <head>.
    const reader = res.body?.getReader();
    if (!reader) return null;
    let html = "";
    let done = false;
    while (!done && html.length < 20000) {
      const { value, done: d } = await reader.read();
      done = d;
      if (value) html += new TextDecoder().decode(value);
    }
    reader.cancel().catch(() => {});
    // Try og:image first, then twitter:image.
    let m = html.match(
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    );
    if (m) return m[1];
    m = html.match(
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    );
    if (m) return m[1];
    // Some sites use content before property.
    m = html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    );
    if (m) return m[1];
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// SOURCE 6: Perplexity Discover (public feed, no API key)
// ---------------------------------------------------------------------------

export interface PerplexityItem {
  card_variant?: string;
  title?: string;
  summary?: string;
  bullet_summary_web_results_preload?: Array<{
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
  }>;
  web_results_preview?: {
    first_urls?: string[];
  };
}

export async function fetchPerplexity(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(
      "https://www.perplexity.ai/rest/discover/feed?limit=50&offset=0&topic=top&version=2.18&source=default",
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
        },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { status?: string; items?: PerplexityItem[] };
    if (!data.items || !Array.isArray(data.items)) return [];

    const articles: NewsArticle[] = [];
    for (const item of data.items) {
      // Each Perplexity card has a title + summary, and web_results with actual article links.
      const title = item.title || "";
      const summary = item.summary || "";
      const webResults = item.bullet_summary_web_results_preload || [];
      if (webResults.length === 0) continue;
      // Take the first web result as the primary article link.
      const primary = webResults[0];
      const haystack = `${title} ${summary} ${primary.name} ${primary.snippet}`;
      if (!matchesAI(haystack)) continue;
      const image =
        primary.meta_data?.images?.[0] || null;
      articles.push({
        title: primary.name || title,
        description: primary.snippet || summary || null,
        url: primary.url,
        image,
        publishedAt: primary.meta_data?.published_date || primary.timestamp || new Date().toISOString(),
        source: primary.meta_data?.domain_name || "Perplexity",
        category: categoryFor(primary.meta_data?.domain_name || "", primary.name || title),
        tags: tagFor(haystack),
      });
    }
    return articles;
  } catch {
    // Cloudflare may block server-side requests; fall back to other sources.
    return [];
  }
}

export async function aggregateNews(): Promise<NewsArticle[]> {
  const [hn] = await Promise.all([
    fetchHackerNews(),
  ]);

  const all = [...hn];

  // Dedupe by URL (normalized) and by normalized title.
  const seenUrl = new Set<string>();
  const seenTitle = new Map<string, NewsArticle>();
  for (const a of all) {
    const urlKey = a.url.split("?")[0].replace(/\/$/, "").toLowerCase();
    const titleKey = a.title.toLowerCase().slice(0, 80);
    if (seenUrl.has(urlKey)) continue;
    seenUrl.add(urlKey);
    const existing = seenTitle.get(titleKey);
    if (existing) {
      // Prefer official source.
      if (
        OFFICIAL_SOURCES.has(a.source) &&
        !OFFICIAL_SOURCES.has(existing.source)
      ) {
        seenTitle.set(titleKey, a);
      }
      continue;
    }
    seenTitle.set(titleKey, a);
  }

  const deduped = Array.from(seenTitle.values());

  // Sort newest first.
  deduped.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  // Cap at 80.
  const capped = deduped.slice(0, 80);

  // Enrich: fetch og:image for the top 25 articles that lack an image,
  // in parallel batches of 5 to be gentle on source servers.
  const toEnrich = capped.filter((a) => !a.image).slice(0, 25);
  for (let i = 0; i < toEnrich.length; i += 5) {
    const batch = toEnrich.slice(i, i + 5);
    await Promise.all(
      batch.map(async (a) => {
        const img = await fetchOgImage(a.url);
        if (img) a.image = img;
      }),
    );
  }

  return capped;
}
