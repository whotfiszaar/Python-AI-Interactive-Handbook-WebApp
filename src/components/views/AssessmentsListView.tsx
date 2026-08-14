"use client";

import { useAppStore } from "@/lib/store";
import { assessments } from "@/data/assessments";
import { useAppStore as useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Trophy, Clock, RotateCcw, ArrowRight } from "lucide-react";
import { cn, percentage, formatDateTime } from "@/lib/utils";

import { useState } from "react";

export function AssessmentsListView() {
  const navigate = useAppStore((s) => s.navigate);
  const scores = useStore((s) => s.scores);
  const [activeTab, setActiveTab] = useState<"quizzes" | "coding">("quizzes");

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

  const solvedChallengesCount = scores.filter(
    (s) => s.assessmentId.startsWith("code-") && s.score > 0
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Test what you have learned and improve your coding skills.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("quizzes")}
          className={cn(
            "px-4 py-2 text-sm font-semibold border-b-2 transition-colors",
            activeTab === "quizzes"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Quizzes
        </button>
        <button
          onClick={() => setActiveTab("coding")}
          className={cn(
            "px-4 py-2 text-sm font-semibold border-b-2 transition-colors",
            activeTab === "coding"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Code Challenges (300)
        </button>
      </div>

      {activeTab === "quizzes" && (
        <div className="space-y-6">
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
                <p className="text-sm text-muted-foreground">quizzes passed</p>
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
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.ceil(
                        a.questions.reduce((total, q) => {
                          switch (q.type) {
                            case "multiple-choice": return total + 45;
                            case "true-false": return total + 20;
                            case "fill-blank": return total + 60;
                            case "code-output": return total + 90;
                            default: return total + 45;
                          }
                        }, 0) / 60,
                      )} min
                    </span>
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
      )}

      {activeTab === "coding" && (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20">
            <div className="max-w-xl space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                HackerRank Coding Arena
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Step into the arena! Solve 300 hand-crafted Python coding challenges designed to build your problem-solving skills from scratch.
              </p>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-foreground">
                    {solvedChallengesCount} / 300
                  </div>
                  <div className="text-xs text-muted-foreground">Challenges Solved</div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border">
                  <div className="text-2xl font-bold text-foreground">
                    {Math.round((solvedChallengesCount / 300) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Completion Rate</div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => navigate("coding-challenges")}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Enter Coding Arena
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3">Topic Progression</h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
              <div className="p-3 bg-muted/40 rounded border space-y-1">
                <div className="font-semibold text-foreground">1. Basics &amp; Math</div>
                <div>Challenges 1 to 100</div>
                <div className="text-[10px] text-emerald-600 font-medium">Difficulty: Easy</div>
              </div>
              <div className="p-3 bg-muted/40 rounded border space-y-1">
                <div className="font-semibold text-foreground">2. Conditionals, Loops &amp; Strings</div>
                <div>Challenges 101 to 200</div>
                <div className="text-[10px] text-amber-600 font-medium">Difficulty: Medium</div>
              </div>
              <div className="p-3 bg-muted/40 rounded border space-y-1">
                <div className="font-semibold text-foreground">3. Structures, OOP &amp; Algos</div>
                <div>Challenges 201 to 300</div>
                <div className="text-[10px] text-rose-600 font-medium">Difficulty: Hard</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

