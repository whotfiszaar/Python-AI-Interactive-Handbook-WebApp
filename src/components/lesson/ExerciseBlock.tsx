"use client";

import { useState } from "react";
import type { Exercise } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyColor: Record<Exercise["difficulty"], string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

export function ExerciseBlock({ exercises }: { exercises: Exercise[] }) {
  if (!exercises || exercises.length === 0) return null;
  return (
    <div className="space-y-3">
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
          {exercise.id}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="secondary"
              className={cn(
                "text-[10px] uppercase tracking-wide",
                difficultyColor[exercise.difficulty],
              )}
            >
              {exercise.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {exercise.description}
          </p>
          {showHint && (
            <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-2">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-foreground/70">{exercise.hint}</p>
            </div>
          )}
          {!showHint ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 mt-2 text-xs text-muted-foreground"
              onClick={() => setShowHint(true)}
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              Show hint
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 mt-2 text-xs text-muted-foreground"
              onClick={() => setShowHint(false)}
            >
              Hide hint
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
