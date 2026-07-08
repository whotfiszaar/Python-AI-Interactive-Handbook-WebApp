"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { Assessment, AssessmentQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { Input } from "@/components/ui/input";
import { Check, X, Clock, RotateCcw, Trophy, ArrowRight, ArrowLeft } from "lucide-react";
import { cn, percentage } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

interface QuizProps {
  assessment: Assessment;
  onComplete: (score: number, total: number, answers: Record<number, unknown>) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Quiz({ assessment, onComplete }: QuizProps) {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [showOneAtATime, setShowOneAtATime] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(
    assessment.timerMinutes ? assessment.timerMinutes * 60 : null,
  );

  useEffect(() => {
    setQuestions(shuffle(assessment.questions));
  }, [assessment]);

  const allAnswered = questions.every((q) => {
    const a = answers[q.id];
    return a !== undefined && a !== "";
  });

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q) => {
      const a = answers[q.id];
      let correct = false;
      if (q.type === "multiple-choice") correct = a === q.correct;
      else if (q.type === "true-false") correct = a === q.correctBool;
      else if (q.type === "fill-blank" || q.type === "code-output")
        correct =
          String(a ?? "").trim().toLowerCase() ===
          (q.answer ?? "").trim().toLowerCase();
      return acc + (correct ? 1 : 0);
    }, 0);
  }, [submitted, questions, answers]);

  const handleSubmit = () => {
    setSubmitted(true);
    const sc = questions.reduce((acc, q) => {
      const a = answers[q.id];
      let correct = false;
      if (q.type === "multiple-choice") correct = a === q.correct;
      else if (q.type === "true-false") correct = a === q.correctBool;
      else if (q.type === "fill-blank" || q.type === "code-output")
        correct =
          String(a ?? "").trim().toLowerCase() ===
          (q.answer ?? "").trim().toLowerCase();
      return acc + (correct ? 1 : 0);
    }, 0);
    onComplete(sc, questions.length, answers);
  };

  // Keep a ref to the latest submit handler so the timer can call it
  // without resetting when answers change.
  const submitRef = useRef(handleSubmit);
  submitRef.current = handleSubmit;

  useEffect(() => {
    if (!assessment.timerMinutes || submitted) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t === null) return null;
        if (t <= 1) {
          clearInterval(id);
          submitRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [assessment.timerMinutes, submitted]);

  const retry = () => {
    setQuestions(shuffle(assessment.questions));
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setTimeLeft(assessment.timerMinutes ? assessment.timerMinutes * 60 : null);
    toast.info("Questions reshuffled, good luck!");
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }

  if (submitted) {
    const pct = percentage(score, questions.length);
    const passed = pct >= assessment.passingScore;
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    return (
      <div className="space-y-4">
        <Card className="p-6 text-center">
          <div
            className={cn(
              "mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-3",
              passed ? "bg-emerald-100 dark:bg-emerald-950/40" : "bg-amber-100 dark:bg-amber-950/40",
            )}
          >
            <Trophy className={cn("h-8 w-8", passed ? "text-emerald-500" : "text-amber-500")} />
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {passed ? "You passed!" : "Keep practicing"}
          </h2>
          <p className="text-3xl font-bold text-primary my-2">
            {score} / {questions.length}
          </p>
          <p className="text-muted-foreground">{pct}% (pass mark: {assessment.passingScore}%)</p>
          <p className="text-xs text-muted-foreground mt-2">
            Time taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
          </p>
          <Button className="mt-4 gap-1" onClick={retry}>
            <RotateCcw className="h-4 w-4" />
            Retry (reshuffled)
          </Button>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Review answers</h3>
          {questions.map((q, i) => (
            <ReviewCard key={q.id} question={q} answer={answers[q.id]} index={i} />
          ))}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const fmtTime = timeLeft !== null
    ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
    : null;

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {showOneAtATime ? `Question ${current + 1} of ${questions.length}` : `${questions.length} questions`}
          </Badge>
          {fmtTime !== null && (
            <Badge variant={timeLeft < 60 ? "destructive" : "outline"} className="gap-1">
              <Clock className="h-3 w-3" />
              {fmtTime}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-xs"
            onClick={() => setShowOneAtATime((v) => !v)}
          >
            {showOneAtATime ? "Show all" : "Show one at a time"}
          </Button>
        </div>
      </div>

      {showOneAtATime ? (
        <>
          <QuestionCard question={q} answer={answers[q.id]} onAnswer={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} />
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            {current < questions.length - 1 ? (
              <Button onClick={() => setCurrent((c) => c + 1)} className="gap-1">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="gap-1"
              >
                Submit
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {questions.map((qq, i) => (
            <div key={qq.id}>
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                Q{i + 1}
              </p>
              <QuestionCard
                question={qq}
                answer={answers[qq.id]}
                onAnswer={(v) => setAnswers((a) => ({ ...a, [qq.id]: v }))}
              />
            </div>
          ))}
          <Button onClick={handleSubmit} disabled={!allAnswered} className="w-full gap-1">
            Submit Assessment
            <Check className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function QuestionCard({
  question: q,
  answer,
  onAnswer,
}: {
  question: AssessmentQuestion;
  answer: unknown;
  onAnswer: (v: unknown) => void;
}) {
  return (
    <Card className="p-5">
      <p className="text-base font-medium mb-3">{q.question}</p>
      {q.type === "code-output" && q.code && (
        <div className="mb-3">
          <CodeBlock code={q.code} language="python" showRunInPlayground={false} />
        </div>
      )}
      <div className="space-y-2">
        {q.type === "multiple-choice" && q.options && (
          <>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md border text-sm transition-colors flex items-center gap-2",
                  answer === i
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 dark:border-slate-700 hover:bg-accent",
                )}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </>
        )}
        {q.type === "true-false" && (
          <div className="flex gap-2">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => onAnswer(val)}
                className={cn(
                  "flex-1 px-3 py-2.5 rounded-md border text-sm font-medium transition-colors",
                  answer === val
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 dark:border-slate-700 hover:bg-accent",
                )}
              >
                {val ? "True" : "False"}
              </button>
            ))}
          </div>
        )}
        {(q.type === "fill-blank" || q.type === "code-output") && (
          <Input
            value={String(answer ?? "")}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder={q.type === "code-output" ? "Type the exact output" : "Type your answer"}
            className="font-mono text-sm"
          />
        )}
      </div>
    </Card>
  );
}

function ReviewCard({
  question: q,
  answer,
  index,
}: {
  question: AssessmentQuestion;
  answer: unknown;
  index: number;
}) {
  let correct = false;
  if (q.type === "multiple-choice") correct = answer === q.correct;
  else if (q.type === "true-false") correct = answer === q.correctBool;
  else if (q.type === "fill-blank" || q.type === "code-output")
    correct =
      String(answer ?? "").trim().toLowerCase() ===
      (q.answer ?? "").trim().toLowerCase();

  return (
    <Card className="p-4">
      <div className="flex items-start gap-2 mb-2">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs",
            correct
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40"
              : "bg-red-100 text-red-600 dark:bg-red-950/40",
          )}
        >
          {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </span>
        <p className="text-sm font-medium flex-1">
          <span className="text-muted-foreground mr-1">Q{index + 1}.</span>
          {q.question}
        </p>
      </div>
      {q.type === "code-output" && q.code && (
        <div className="mb-2 ml-8">
          <CodeBlock code={q.code} language="python" showRunInPlayground={false} />
        </div>
      )}
      <div className="ml-8 text-xs space-y-1">
        {q.type === "multiple-choice" && q.options && (
          <p>
            <span className="text-muted-foreground">Your answer:</span>{" "}
            <span className={correct ? "text-emerald-600" : "text-red-600"}>
              {answer !== undefined ? q.options[answer as number] ?? "Not answered" : "Not answered"}
            </span>
          </p>
        )}
        {q.type === "true-false" && (
          <p>
            <span className="text-muted-foreground">Your answer:</span>{" "}
            <span className={correct ? "text-emerald-600" : "text-red-600"}>
              {answer !== undefined ? String(answer) : "Not answered"}
            </span>
          </p>
        )}
        {(q.type === "fill-blank" || q.type === "code-output") && (
          <p>
            <span className="text-muted-foreground">Your answer:</span>{" "}
            <span className={correct ? "text-emerald-600" : "text-red-600"}>
              {String(answer ?? "Not answered")}
            </span>
          </p>
        )}
        <p>
          <span className="text-muted-foreground">Correct:</span>{" "}
          <span className="text-emerald-600 font-medium">
            {q.type === "multiple-choice" && q.options
              ? q.options[q.correct ?? 0]
              : q.type === "true-false"
                ? String(q.correctBool)
                : q.answer}
          </span>
        </p>
        <p className="text-muted-foreground pt-1">{q.explanation}</p>
      </div>
    </Card>
  );
}
