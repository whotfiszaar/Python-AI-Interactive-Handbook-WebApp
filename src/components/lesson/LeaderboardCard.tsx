"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, ChevronDown, ChevronUp, ExternalLink, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardModel {
  rank: number;
  model: string;
  vendor: string | null;
  license: string | null;
  score: number | null;
  ci: number | null;
  votes: number | null;
}

interface LeaderboardData {
  meta?: {
    leaderboard?: string;
    fetched_at?: string;
    model_count?: number;
  };
  models: LeaderboardModel[];
}

const VENDOR_COLORS: Record<string, string> = {
  Anthropic: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
  OpenAI: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  Google: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  Meta: "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
  "x.ai": "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  DeepSeek: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400",
  Mistral: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
};

interface LeaderboardCardProps {
  /** Which leaderboard to show: "text" (LLM), "code", "vision", etc. */
  name?: string;
  /** Title for the card */
  title?: string;
  /** How many models to show initially (default 5) */
  initialCount?: number;
  className?: string;
}

export function LeaderboardCard({
  name = "text",
  title = "Live LLM Leaderboard",
  initialCount = 5,
  className,
}: LeaderboardCardProps) {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/leaderboard?name=${name}`);
        if (!res.ok) return;
        const json = (await res.json()) as LeaderboardData;
        if (active) setData(json);
      } catch {
        /* ignore */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [name]);

  const models = data?.models ?? [];
  const visibleModels = expanded ? models : models.slice(0, initialCount);

  if (loading) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (models.length === 0) {
    return null;
  }

  return (
    <Card className={cn("p-4 overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10">
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-[10px] text-muted-foreground">
              Arena AI ELO scores, updated daily
            </p>
          </div>
        </div>
        <a
          href="https://arena.ai/leaderboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-0.5"
        >
          Source
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>

      {/* Models table */}
      <div className="space-y-1">
        {visibleModels.map((m) => (
          <div
            key={m.rank}
            className={cn(
              "flex items-center gap-2.5 p-2 rounded-md transition-colors",
              m.rank === 1
                ? "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900"
                : "hover:bg-accent/30",
            )}
          >
            {/* Rank */}
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {m.rank === 1 ? (
                <Crown className="h-4 w-4 text-amber-500" />
              ) : (
                <span className={cn(
                  "text-muted-foreground",
                  m.rank <= 3 && "text-amber-600",
                )}>
                  {m.rank}
                </span>
              )}
            </div>

            {/* Model name + vendor */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{m.model}</p>
              {m.vendor && (
                <Badge
                  className={cn(
                    "text-[9px] h-4 px-1.5 mt-0.5",
                    VENDOR_COLORS[m.vendor] || "bg-muted text-muted-foreground",
                  )}
                  variant="secondary"
                >
                  {m.vendor}
                </Badge>
              )}
            </div>

            {/* ELO score */}
            <div className="text-right shrink-0">
              <p className="text-sm font-bold tabular-nums">
                {m.score ?? "-"}
              </p>
              {m.votes != null && (
                <p className="text-[9px] text-muted-foreground tabular-nums">
                  {m.votes >= 1000 ? `${(m.votes / 1000).toFixed(1)}k` : m.votes} votes
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Expand/collapse button */}
      {models.length > initialCount && (
        <Button
          size="sm"
          variant="ghost"
          className="w-full mt-2 h-7 text-xs gap-1"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (
            <>
              Show fewer <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show all {models.length} models <ChevronDown className="h-3 w-3" />
            </>
          )}
        </Button>
      )}

      <p className="text-[10px] text-muted-foreground text-center mt-2">
        ELO scores from human blind A/B tests on arena.ai
      </p>
    </Card>
  );
}
