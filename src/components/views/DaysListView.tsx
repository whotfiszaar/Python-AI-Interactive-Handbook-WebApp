"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useProgress } from "@/hooks/useProgress";
import { days, phaseMeta } from "@/data/days";
import type { Phase } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Bookmark, Search, Youtube, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideosForDay } from "@/data/youtube";

type PhaseFilter = "all" | Phase;
type StatusFilter = "all" | "completed" | "incomplete";

export function DaysListView() {
  const navigate = useAppStore((s) => s.navigate);
  const { progress, toggleBookmark } = useProgress();
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return days.filter((d) => {
      if (phaseFilter !== "all" && d.phase !== phaseFilter) return false;
      const p = progress[d.dayNumber];
      if (statusFilter === "completed" && !p?.completed) return false;
      if (statusFilter === "incomplete" && p?.completed) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !d.title.toLowerCase().includes(q) &&
          !`day ${d.dayNumber}`.includes(q) &&
          !d.objectives.some((o) => o.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [phaseFilter, statusFilter, query, progress]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All 48 Days</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Click any day to start the lesson. Filter by phase or status to find what you need.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search days..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={phaseFilter} onValueChange={(v) => setPhaseFilter(v as PhaseFilter)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All phases</SelectItem>
            <SelectItem value="python">Python Fundamentals</SelectItem>
            <SelectItem value="theory">AI Theory</SelectItem>
            <SelectItem value="practical">Practical AI</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="incomplete">Incomplete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Day grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((day) => {
          const p = progress[day.dayNumber];
          const meta = phaseMeta[day.phase];
          const videos = getVideosForDay(day.dayNumber);
          return (
            <Card
              key={day.dayNumber}
              className={cn(
                "p-4 cursor-pointer hover:border-primary/40 transition-colors group relative",
                p?.completed && "border-emerald-200 dark:border-emerald-900",
              )}
              onClick={() => navigate("day", { dayNumber: day.dayNumber })}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(day.dayNumber);
                }}
                className="absolute top-3 right-3 text-muted-foreground hover:text-amber-500"
                aria-label="Bookmark"
              >
                <Bookmark
                  className={cn(
                    "h-4 w-4",
                    p?.bookmarked && "fill-amber-400 text-amber-400",
                  )}
                />
              </button>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    p?.completed
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {p?.completed ? <Check className="h-4 w-4" /> : day.dayNumber}
                </span>
                <Badge variant="outline" className={cn("text-[10px]", meta.color)}>
                  {meta.label}
                </Badge>
                {videos.length > 0 && (
                  <Badge
                    variant="outline"
                    className="text-[10px] gap-1 text-red-600 border-red-300 dark:border-red-900/50"
                    title={`${videos.length} video lesson${videos.length > 1 ? "s" : ""} available`}
                  >
                    <Youtube className="h-2.5 w-2.5" />
                    {videos.length}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm pr-6 group-hover:text-primary transition-colors">
                {day.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {day.objectives[0]}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Annexures card (always shown, after the day grid) */}
      {(phaseFilter === "all" || phaseFilter === "theory") && !query && (
        <Card
          className="p-4 cursor-pointer hover:border-amber-400/50 transition-colors group relative border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-950/10"
          onClick={() => navigate("annexures")}
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white text-xs">
              <Layers className="h-4 w-4" />
            </span>
            <Badge
              variant="outline"
              className="text-[10px] text-amber-600 border-amber-300 dark:border-amber-900/50"
            >
              AI Theory, Bonus
            </Badge>
          </div>
          <h3 className="font-semibold text-sm group-hover:text-amber-600 transition-colors">
            Course Annexures: System Design and Software Concepts
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            Deep-dives into how real AI apps are built at scale. Interactive diagrams, analogies, and code examples for core understanding.
          </p>
        </Card>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No days match your filters.
        </p>
      )}
    </div>
  );
}
