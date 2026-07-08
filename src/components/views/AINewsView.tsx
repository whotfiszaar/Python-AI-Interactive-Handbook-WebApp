"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Newspaper,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle,
  Search,
  ImageOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchPerplexityClientSide } from "@/lib/perplexity-client";

interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
  category: string;
  tags: string[];
}

interface NewsResponse {
  status: string;
  count: number;
  cachedAt?: string;
  error?: string;
  articles: NewsArticle[];
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

export function AINewsView() {
  const [serverArticles, setServerArticles] = useState<NewsArticle[]>([]);
  const [perplexityArticles, setPerplexityArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const load = useCallback(async (refresh = false) => {
    setLoading(refresh ? false : true);
    setRefreshing(refresh);
    setError(null);
    try {
      // 1. Fetch server-side aggregated news (HN, Reddit, RSS, GitHub, PyPI)
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as NewsResponse;
      if (json.status === "error") {
        throw new Error(json.error ?? "Failed to load news");
      }
      setServerArticles(json.articles);
      setImgErrors(new Set());

      // 2. Fetch Perplexity Discover feed via our same-origin proxy.
      //    The proxy calls Perplexity server-side; if Cloudflare blocks it,
      //    returns empty and we fall back to the other sources.
      void fetchPerplexityClientSide().then((pplArticles) => {
        if (pplArticles.length > 0) {
          setPerplexityArticles(pplArticles);
        }
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load news");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Merge server-side + Perplexity articles, dedupe by URL, sort newest first.
  const articles = (() => {
    const merged = [...perplexityArticles, ...serverArticles];
    const seen = new Set<string>();
    const deduped = merged.filter((a) => {
      const key = a.url.split("?")[0].replace(/\/$/, "").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return deduped.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  })();

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

  const filtered = articles.filter((a) => {
    if (activeCategory !== "All" && a.category !== activeCategory) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Hero = first article with an image, rest go to the grid.
  const hero = filtered.find((a) => a.image && !imgErrors.has(-1));
  const gridArticles = filtered.filter((a) => a !== hero);

  const handleImgError = (id: number) => {
    setImgErrors((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">AI News</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Latest AI, Python, and LLM headlines from Hacker News, Reddit, RSS, GitHub, and PyPI. No API keys.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => load(true)}
          disabled={refreshing}
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Search + category chips */}
      {!loading && !error && articles.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full h-9 pl-9 pr-3 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <Badge variant="secondary" className="ml-auto">
            {filtered.length} stories
          </Badge>
        </div>
      )}

      {/* Error */}
      {error && (
        <Card className="p-6 border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400 text-sm">
                Could not load news
              </p>
              <p className="text-xs text-muted-foreground mt-1">{error}</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={() => load(true)}>
                Try again
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full rounded-none" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Hero + grid (Perplexity-style) */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-5">
          {/* Hero article */}
          {hero && (
            <a
              href={hero.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all hover:border-primary/40">
                <div className="flex flex-col md:flex-row">
                  {hero.image && !imgErrors.has(-1) ? (
                    <div className="md:w-2/5 aspect-video md:aspect-auto bg-muted overflow-hidden">
                      <img
                        src={hero.image}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={() => handleImgError(-1)}
                      />
                    </div>
                  ) : (
                    <div className="md:w-2/5 aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-muted flex items-center justify-center">
                      <Newspaper className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-primary text-primary-foreground text-[10px]">
                        {hero.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(hero.publishedAt)}
                      </span>
                      <span className="text-xs text-muted-foreground">|</span>
                      <span className="text-xs font-medium text-foreground">
                        {hero.source}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-2">
                      {hero.title}
                    </h2>
                    {hero.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {hero.description}
                      </p>
                    )}
                    {hero.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                        {hero.tags.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-xs text-primary mt-3 flex items-center gap-1 font-medium">
                      Read full story
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Card>
            </a>
          )}

          {/* Grid of article cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gridArticles.map((a, i) => (
              <a
                key={a.url + i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-md hover:border-primary/40 transition-all">
                  {a.image && !imgErrors.has(i) ? (
                    <div className="aspect-video bg-muted overflow-hidden relative">
                      <img
                        src={a.image}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={() => handleImgError(i)}
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-black/70 text-white backdrop-blur-sm text-[10px]">
                          {a.category}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                      <div className="text-center">
                        <ImageOff className="h-8 w-8 text-muted-foreground/40 mx-auto mb-1" />
                        <Badge variant="secondary" className="text-[10px]">
                          {a.category}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                      {a.title}
                    </h3>
                    {a.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
                        {a.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-[10px] text-muted-foreground font-medium truncate max-w-[100px]">
                        {a.source}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                        <Clock className="h-2.5 w-2.5" />
                        {timeAgo(a.publishedAt)}
                      </span>
                    </div>
                    {a.tags.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 flex-wrap">
                        {a.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1 py-0.5 rounded bg-muted text-[9px] font-medium text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Newspaper className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">
            {query || activeCategory !== "All"
              ? "No news matches your filter"
              : "No AI news found right now"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {query || activeCategory !== "All"
              ? "Try a different search or category."
              : "The news feed may be updating. Try refreshing in a moment."}
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
          >
            Clear filters
          </Button>
        </Card>
      )}
    </div>
  );
}
