"use client";

import { useAppStore } from "@/lib/store";
import { assessments } from "@/data/assessments";
import { useAppStore as useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Trophy, Clock, RotateCcw, ArrowRight } from "lucide-react";
import { cn, percentage, formatDateTime } from "@/lib/utils";

export function AssessmentsListView() {
  const navigate = useAppStore((s) => s.navigate);
  const scores = useStore((s) => s.scores);

  const bestScore = (id: string) => {
    const matching = scores.filter((s) => s.assessmentId === id);
    if (matching.length === 0) return null;
    return matching.reduce((best, s) => {
      const pct = percentage(s.score, s.total);
      const bestPct = percentage(best.score, best.total);
      return pct > bestPct ? s : best;
    });
  };

  const passedCount = assessments.filter((a) => {
    const best = bestScore(a.id);
    return best && percentage(best.score, best.total) >= a.passingScore;
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Test what you have learned. Each assessment can be retried as many times as you like.
        </p>
      </div>

      {/* Summary */}
      <Card className="p-5 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40">
            <Trophy className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {passedCount}
              <span className="text-muted-foreground text-base font-normal">
                {" "}/ {assessments.length}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">assessments passed</p>
          </div>
        </div>
      </Card>

      {/* Assessment cards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {assessments.map((a) => {
          const best = bestScore(a.id);
          const passed = best && percentage(best.score, best.total) >= a.passingScore;
          return (
            <Card
              key={a.id}
              className={cn(
                "p-5 cursor-pointer hover:border-primary/40 transition-colors group",
                passed && "border-emerald-200 dark:border-emerald-900",
              )}
              onClick={() => navigate("assessment", { assessmentId: a.id })}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                </div>
                {passed && (
                  <Badge className="bg-emerald-500 text-white text-[10px] gap-1">
                    <Trophy className="h-3 w-3" />
                    Passed
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {a.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                <span>{a.questions.length} questions</span>
                {a.timerMinutes && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {a.timerMinutes} min
                  </span>
                )}
                <span>Pass: {a.passingScore}%</span>
              </div>
              {best ? (
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Best score</p>
                    <p className={cn(
                      "text-sm font-semibold",
                      passed ? "text-emerald-600" : "text-amber-600",
                    )}>
                      {best.score}/{best.total} ({percentage(best.score, best.total)}%)
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {formatDateTime(best.completedAt)}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs">
                    <RotateCcw className="h-3 w-3" />
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Not attempted</p>
                  <Button size="sm" variant="ghost" className="gap-1 text-xs">
                    Start
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
