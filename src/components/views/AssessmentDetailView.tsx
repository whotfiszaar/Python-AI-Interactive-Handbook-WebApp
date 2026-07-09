"use client";

import { useAppStore } from "@/lib/store";
import { assessments } from "@/data/assessments";
import { personalizeAssessment } from "@/hooks/useSubstitute";
import { Quiz } from "@/components/assessment/Quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import { useCallback, useMemo } from "react";

export function AssessmentDetailView() {
  const assessmentId = useAppStore((s) => s.assessmentId);
  const navigate = useAppStore((s) => s.navigate);
  const addScore = useAppStore((s) => s.addScore);
  const studentName = useAppStore((s) => s.studentName);

  const raw = assessments.find((a) => a.id === assessmentId);
  const assessment = useMemo(
    () => (raw ? personalizeAssessment(raw, studentName) : undefined),
    [raw, studentName],
  );

  const handleComplete = useCallback(
    (score: number, total: number, answers: unknown) => {
      if (!assessment) return;
      fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessment.id,
          score,
          total,
          answers,
        }),
      })
        .then((r) => r.json())
        .then((row) => {
          addScore(row);
          const pct = Math.round((score / total) * 100);
          if (pct >= assessment.passingScore) {
            toast.success(`Passed with ${pct}%!`);
          } else {
            toast.message(`Scored ${pct}%. Keep practicing!`);
          }
        })
        .catch(() => toast.error("Could not save your score"));
    },
    [assessment, addScore],
  );

  if (!assessment) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Assessment not found.</p>
        <Button onClick={() => navigate("assessments")} className="mt-4">
          Back to assessments
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 mb-3 -ml-2"
          onClick={() => navigate("assessments")}
        >
          <ArrowLeft className="h-4 w-4" />
          All assessments
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{assessment.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {assessment.description}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ClipboardList className="h-3.5 w-3.5" />
            {assessment.questions.length} questions
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.ceil(
              assessment.questions.reduce((total, q) => {
                switch (q.type) {
                  case "multiple-choice": return total + 45;
                  case "true-false": return total + 20;
                  case "fill-blank": return total + 60;
                  case "code-output": return total + 90;
                  default: return total + 45;
                }
              }, 0) / 60,
            )} minute limit
          </span>
          <span>Pass mark: {assessment.passingScore}%</span>
        </div>
      </div>

      <Quiz assessment={assessment} onComplete={handleComplete} />
    </div>
  );
}
