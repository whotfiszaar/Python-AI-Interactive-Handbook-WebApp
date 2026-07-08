"use client";

import { useAppStore } from "@/lib/store";
import { useProgress } from "@/hooks/useProgress";
import { days, phaseMeta } from "@/data/days";
import { assessments } from "@/data/assessments";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  BookOpen,
  Code2,
  ClipboardCheck,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Circle,
  Newspaper,
} from "lucide-react";
import { cn, computeStreak, daysAgo, percentage } from "@/lib/utils";

const phases: Array<"python" | "theory" | "practical"> = [
  "python",
  "theory",
  "practical",
];

export function HomeView() {
  const navigate = useAppStore((s) => s.navigate);
  const displayName = useAppStore((s) => s.displayName);
  const scores = useAppStore((s) => s.scores);
  const { progress } = useProgress();

  const completedCount = days.filter(
    (d) => progress[d.dayNumber]?.completed,
  ).length;
  const pct = percentage(completedCount, days.length);
  const streak = computeStreak(
    Object.values(progress).map((p) => p.lastVisited),
  );

  // Continue where you left off: last visited incomplete day, else next incomplete, else day 1
  const visited = Object.values(progress)
    .filter((p) => p.lastVisited)
    .sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime());
  const lastVisitedDay = visited[0]?.dayNumber;
  const firstIncomplete = days.find((d) => !progress[d.dayNumber]?.completed);
  const continueDay = lastVisitedDay && !progress[lastVisitedDay]?.completed
    ? lastVisitedDay
    : firstIncomplete?.dayNumber ?? 1;
  const continueDayObj = days.find((d) => d.dayNumber === continueDay);

  const recentActivity = visited.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              Welcome back,
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Hi {displayName}! Ready to learn Python &amp; AI?
            </h1>
            <p className="text-muted-foreground mt-2">
              You are on a 48-day journey from Python basics to building AI
              assistants with LangChain, MCP, and Langfuse.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-card rounded-xl border p-4 min-w-[120px]">
            <span className="text-3xl font-bold text-primary">{pct}%</span>
            <span className="text-xs text-muted-foreground">
              {completedCount} of {days.length} days
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Flame className="h-5 w-5" />
            <span className="text-2xl font-bold text-foreground">{streak}</span>
          </div>
          <p className="text-xs text-muted-foreground">day streak</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-2xl font-bold text-foreground">
              {completedCount}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">days complete</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <ClipboardCheck className="h-5 w-5" />
            <span className="text-2xl font-bold text-foreground">
              {scores.filter((s) => {
                const a = assessments.find((x) => x.id === s.assessmentId);
                return a && percentage(s.score, s.total) >= a.passingScore;
              }).length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">tests passed</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-violet-600 mb-1">
            <Bookmark className="h-5 w-5" />
            <span className="text-2xl font-bold text-foreground">
              {Object.values(progress).filter((p) => p.bookmarked).length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">bookmarked</p>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {continueDayObj && (
          <Card
            className="p-5 cursor-pointer hover:border-primary/40 transition-colors group"
            onClick={() => navigate("day", { dayNumber: continueDayObj.dayNumber })}
          >
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">
              Continue where you left off
            </p>
            <p className="font-semibold text-sm">
              Day {continueDayObj.dayNumber}: {continueDayObj.title}
            </p>
          </Card>
        )}
        <Card
          className="p-5 cursor-pointer hover:border-primary/40 transition-colors group"
          onClick={() => navigate("playground")}
        >
          <div className="flex items-center justify-between mb-2">
            <Code2 className="h-5 w-5 text-primary" />
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Practice coding</p>
          <p className="font-semibold text-sm">Open Playground</p>
        </Card>
        <Card
          className="p-5 cursor-pointer hover:border-primary/40 transition-colors group"
          onClick={() => navigate("assessments")}
        >
          <div className="flex items-center justify-between mb-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Test your knowledge</p>
          <p className="font-semibold text-sm">View Assessments</p>
        </Card>
        <Card
          className="p-5 cursor-pointer hover:border-primary/40 transition-colors group"
          onClick={() => navigate("ai-news")}
        >
          <div className="flex items-center justify-between mb-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">Stay updated</p>
          <p className="font-semibold text-sm">Latest AI News</p>
        </Card>
      </div>

      {/* Phase breakdown */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Course phases</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {phases.map((phase) => {
            const phaseDays = days.filter((d) => d.phase === phase);
            const done = phaseDays.filter(
              (d) => progress[d.dayNumber]?.completed,
            ).length;
            const meta = phaseMeta[phase];
            return (
              <Card
                key={phase}
                className="p-4 cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() => navigate("days")}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {meta.dayRange}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {done}/{phaseDays.length}
                  </span>
                </div>
                <p className={cn("font-semibold text-sm", meta.color)}>
                  {meta.label}
                </p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${percentage(done, phaseDays.length)}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      {recentActivity.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent activity</h2>
          <Card className="divide-y divide-border">
            {recentActivity.map((p) => {
              const day = days.find((d) => d.dayNumber === p.dayNumber);
              if (!day) return null;
              return (
                <button
                  key={p.id}
                  onClick={() => navigate("day", { dayNumber: p.dayNumber })}
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors text-left"
                >
                  {p.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Day {day.dayNumber}: {day.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {daysAgo(p.lastVisited)}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              );
            })}
          </Card>
        </div>
      )}
    </div>
  );
}
