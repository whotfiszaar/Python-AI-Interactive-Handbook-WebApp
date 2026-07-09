"use client";

import { useState } from "react";
import type { Exercise } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Code2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

const difficultyColor: Record<Exercise["difficulty"], string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

interface ExerciseBlockProps {
  exercises: Exercise[];
  dayNumber: number;
  dayTitle: string;
}

export function ExerciseBlock({ exercises, dayNumber, dayTitle }: ExerciseBlockProps) {
  if (!exercises || exercises.length === 0) return null;
  return (
    <div className="space-y-3">
      {exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          dayNumber={dayNumber}
          dayTitle={dayTitle}
          allExercises={exercises}
        />
      ))}
    </div>
  );
}

function ExerciseCard({
  exercise,
  dayNumber,
  dayTitle,
  allExercises,
}: {
  exercise: Exercise;
  dayNumber: number;
  dayTitle: string;
  allExercises: Exercise[];
}) {
  const [showHint, setShowHint] = useState(false);
  const [creating, setCreating] = useState(false);
  const navigate = useAppStore((s) => s.navigate);

  const goToPlayground = async () => {
    setCreating(true);
    try {
      // Build cells: one cell per exercise, with the question as a comment
      // at the top and empty space below for the learner to write code.
      const cells = allExercises.map((ex) => ({
        code: `# Exercise ${ex.id} (${ex.difficulty})\n# ${ex.description}\n# Hint: ${ex.hint}\n\n# Write your code below:\n`,
      }));

      // Try to find an existing "Day X Exercises" notebook. If not found,
      // create a new one.
      const notebookName = `Day ${dayNumber} Exercises`;
      const listRes = await fetch("/api/notebooks");
      const notebooks = listRes.ok ? await listRes.json() : [];
      const existing = notebooks.find(
        (nb: { name: string }) => nb.name === notebookName,
      );

      let notebookId: number;
      if (existing) {
        // Update the existing notebook with the latest exercise questions.
        notebookId = existing.id;
        await fetch(`/api/notebooks/${notebookId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cells }),
        });
      } else {
        // Create a new notebook.
        const createRes = await fetch("/api/notebooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: notebookName, cells }),
        });
        const created = createRes.ok ? await createRes.json() : null;
        if (!created) throw new Error("Failed to create notebook");
        notebookId = created.id;
      }

      // Navigate to the playground. The playground will load this notebook
      // because we store the notebookId in sessionStorage (the playground
      // checks for it on mount).
      sessionStorage.setItem("__loadNotebookId", String(notebookId));
      // Also store which exercise cell to focus (0-indexed).
      sessionStorage.setItem("__focusCellIndex", String(exercise.id - 1));
      navigate("playground");
      toast.success(`Opened "${notebookName}" in Playground`);
    } catch (e) {
      toast.error("Could not open playground");
      console.error(e);
    } finally {
      setCreating(false);
    }
  };

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
          <div className="flex items-center gap-2 mt-2">
            {!showHint ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-muted-foreground"
                onClick={() => setShowHint(true)}
              >
                <Lightbulb className="h-3 w-3 mr-1" />
                Show hint
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-muted-foreground"
                onClick={() => setShowHint(false)}
              >
                Hide hint
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1.5"
              onClick={goToPlayground}
              disabled={creating}
            >
              {creating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Code2 className="h-3 w-3" />
              )}
              {creating ? "Creating..." : "Go to Playground"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
