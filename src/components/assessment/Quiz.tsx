"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { Assessment, AssessmentQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/lesson/CodeBlock";
import { Input } from "@/components/ui/input";
import { Check, X, Clock, RotateCcw, Trophy, ArrowRight, ArrowLeft, ShieldOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn, percentage, answersMatch } from "@/lib/utils";
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

  // Calculate timer based on question types: each question type gets a
  // different time allowance, and the total is the sum.
  // - multiple-choice: 45 seconds each
  // - true-false: 20 seconds each
  // - fill-blank: 60 seconds each
  // - code-output: 90 seconds each
  // This gives learners enough time per question type without being excessive.
  const computedTimerSeconds = useMemo(() => {
    return assessment.questions.reduce((total, q) => {
      switch (q.type) {
        case "multiple-choice":
          return total + 45;
        case "true-false":
          return total + 20;
        case "fill-blank":
          return total + 60;
        case "code-output":
          return total + 90;
        default:
          return total + 45;
      }
    }, 0);
  }, [assessment.questions]);

  // Use the computed timer (converted to minutes, rounded up) if the
  // assessment doesn't have an explicit timerMinutes, or if the computed
  // value is more generous. This ensures the timer scales with question
  // difficulty.
  const effectiveTimerSeconds = useMemo(() => {
    const explicitSeconds = assessment.timerMinutes
      ? assessment.timerMinutes * 60
      : 0;
    // Use the larger of explicit or computed (so we never shortchange).
    return Math.max(explicitSeconds, computedTimerSeconds);
  }, [assessment.timerMinutes, computedTimerSeconds]);

  const [timeLeft, setTimeLeft] = useState<number | null>(effectiveTimerSeconds);

  useEffect(() => {
    setQuestions(shuffle(assessment.questions));
  }, [assessment]);

  // --- Anti-cheat: screenshot blocker + copy/paste prevention ---
  // State for the focus-loss overlay (covers entire page when window loses focus)
  const [showScreenShield, setShowScreenShield] = useState(false);

  useEffect(() => {
    if (submitted) {
      setShowScreenShield(false);
      return;
    }

    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning("Right-click is disabled during tests");
    };

    // Block copy, cut, paste
    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      toast.warning("Copy/paste is disabled during tests");
    };

    // Block ALL screenshot key combinations:
    // - PrtSc (PrintScreen)
    // - Win+PrtSc (Meta + PrintScreen)
    // - Alt+PrtSc
    // - Ctrl+PrtSc
    // - Ctrl+Shift+S (some browsers)
    // - Ctrl+P (print)
    // - Ctrl+S (save page)
    // - F12 / Ctrl+Shift+I (devtools)
    // - Win+Shift+S (Snipping Tool) - shows as Meta+Shift+KeyS
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const code = e.code;

      // PrintScreen in ALL combinations (PrtSc, Win+PrtSc, Alt+PrtSc, Ctrl+PrtSc)
      if (
        code === "PrintScreen" ||
        key === "printscreen" ||
        key === "snapshot"
      ) {
        e.preventDefault();
        // Aggressively clear clipboard multiple times
        navigator.clipboard.writeText("").catch(() => {});
        navigator.clipboard.writeText(" ").catch(() => {});
        toast.warning("Screenshots are disabled during tests");
        return;
      }

      // Win+Shift+S (Snipping Tool on Windows) = Meta + Shift + S
      if (e.metaKey && e.shiftKey && key === "s") {
        e.preventDefault();
        navigator.clipboard.writeText("").catch(() => {});
        toast.warning("Snipping Tool is disabled during tests");
        setShowScreenShield(true);
        setTimeout(() => setShowScreenShield(false), 2000);
        return;
      }

      // Ctrl+P (print), Ctrl+S (save)
      if (
        (e.ctrlKey && key === "p") ||
        (e.ctrlKey && key === "s") ||
        (e.ctrlKey && e.shiftKey && key === "s")
      ) {
        e.preventDefault();
        toast.warning("This action is disabled during tests");
        return;
      }

      // F12 or Ctrl+Shift+I/J/C (devtools)
      if (
        key === "f12" ||
        (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c"))
      ) {
        e.preventDefault();
        toast.warning("Developer tools are disabled during tests");
        return;
      }

      // Ctrl+C, Ctrl+V, Ctrl+X (copy/paste/cut)
      if (e.ctrlKey && (key === "c" || key === "v" || key === "x")) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" ||
          target.closest("[data-question-card]")
        ) {
          e.preventDefault();
          toast.warning("Copy/paste is disabled during tests");
        }
      }
    };

    // KEY: When the window loses focus (Snipping Tool, Win+PrtSc, alt-tab
    // to another app), immediately show an opaque overlay that covers all
    // content. This makes screenshots useless because only the overlay is
    // visible.
    const handleBlur = () => {
      if (!submitted) {
        setShowScreenShield(true);
        // Clear clipboard to destroy any screenshot that was captured
        navigator.clipboard.writeText("").catch(() => {});
      }
    };

    const handleFocus = () => {
      setShowScreenShield(false);
      // Clear clipboard again when returning (in case a screenshot was taken)
      navigator.clipboard.writeText("").catch(() => {});
    };

    // Detect tab visibility change
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        setShowScreenShield(true);
        toast.warning("Tab switching detected. Your test is still running.");
      } else if (!document.hidden) {
        setShowScreenShield(false);
      }
    };

    // Periodically clear clipboard during the test to destroy any screenshots
    // that were captured via OS-level shortcuts (Win+PrtSc saves to file,
    // but PrtSc to clipboard is destroyed here)
    // NOTE: navigator.clipboard.writeText throws NotAllowedError if the
    // document is not focused (e.g. when the user alt-tabbed to another app).
    // We catch that and silently ignore it.
    const clipboardClearInterval = setInterval(() => {
      if (!submitted && document.hasFocus()) {
        navigator.clipboard.writeText("").catch(() => {
          /* NotAllowedError when document not focused, ignore */
        });
      }
    }, 1000);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("keydown", handleKeyDown, true); // capture phase
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      clearInterval(clipboardClearInterval);
    };
  }, [submitted]);

  // --- CSS: disable text selection on question cards during the test ---
  const testActiveStyle = submitted
    ? {}
    : {
        userSelect: "none" as const,
        WebkitUserSelect: "none" as const,
      };

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
        correct = answersMatch(String(a ?? ""), q.answer ?? "");
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
        correct = answersMatch(String(a ?? ""), q.answer ?? "");
      return acc + (correct ? 1 : 0);
    }, 0);
    onComplete(sc, questions.length, answers);
  };

  // Keep a ref to the latest submit handler so the timer can call it
  // without resetting when answers change.
  const submitRef = useRef(handleSubmit);
  submitRef.current = handleSubmit;

  useEffect(() => {
    if (timeLeft === null || submitted) return;
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
  }, [submitted, timeLeft === null]);

  const retry = () => {
    setQuestions(shuffle(assessment.questions));
    setAnswers({});
    setCurrent(0);
    setSubmitted(false);
    setTimeLeft(effectiveTimerSeconds);
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
    <div className="space-y-4 relative">
      {/* Screen shield overlay: covers all content when window loses focus
          during the test. Makes screenshots useless because only this
          opaque overlay is visible. */}
      {showScreenShield && !submitted && (
        <div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          style={{ pointerEvents: "all" }}
        >
          <div className="text-center">
            <ShieldOff className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-semibold">Test content hidden</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click here to return to your test. Screenshotting is not allowed.
            </p>
          </div>
        </div>
      )}
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
          {/* Question navigator grid: clickable squares showing answered (green) vs skipped (gray) */}
          {!submitted && (
            <div className="flex items-center gap-1 flex-wrap p-2 rounded-lg border border-border bg-card">
              {questions.map((qq, i) => {
                const isAnswered = (() => {
                  const a = answers[qq.id];
                  return a !== undefined && a !== "";
                })();
                const isCurrent = i === current;
                return (
                  <button
                    key={qq.id}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "flex items-center justify-center h-7 w-7 rounded text-[11px] font-bold transition-all",
                      isCurrent
                        ? "ring-2 ring-primary ring-offset-1"
                        : "",
                      isAnswered
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-muted text-muted-foreground hover:bg-accent",
                    )}
                    title={`Question ${i + 1}${isAnswered ? " (answered)" : " (skipped)"}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <div className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-emerald-500" />
                  Answered
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-muted" />
                  Skipped
                </span>
                <span className="font-medium">
                  {Object.values(answers).filter((v) => v !== undefined && v !== "").length}
                  /{questions.length}
                </span>
              </div>
            </div>
          )}

          <QuestionCard question={q} answer={answers[q.id]} onAnswer={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} testActiveStyle={testActiveStyle} />
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
                testActiveStyle={testActiveStyle}
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
  testActiveStyle,
}: {
  question: AssessmentQuestion;
  answer: unknown;
  onAnswer: (v: unknown) => void;
  testActiveStyle: React.CSSProperties;
}) {
  return (
    <Card className="p-5" data-question-card style={testActiveStyle}>
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
        {q.type === "fill-blank" && (
          <Input
            value={String(answer ?? "")}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Type your answer"
            className="font-mono text-sm"
          />
        )}
        {q.type === "code-output" && (
          <div className="space-y-1.5">
            <Textarea
              value={String(answer ?? "")}
              onChange={(e) => onAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                // Ctrl/Cmd+Enter guarantees a literal newline is inserted
                // (some setups swallow it). Plain Enter inserts a newline
                // too (default textarea behavior) since assessments are
                // submitted via the Next/Submit buttons, not per-question.
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  const el = e.currentTarget;
                  const start = el.selectionStart;
                  const end = el.selectionEnd;
                  const cur = String(answer ?? "");
                  const next = cur.slice(0, start) + "\n" + cur.slice(end);
                  onAnswer(next);
                  requestAnimationFrame(() => {
                    el.selectionStart = el.selectionEnd = start + 1;
                  });
                }
              }}
              placeholder="Type the exact output (Ctrl+Enter for a new line)"
              rows={3}
              className="font-mono text-sm min-h-[80px] resize-y"
            />
            <p className="text-[10px] text-muted-foreground">
              Tip: press <kbd className="px-1 py-0.5 rounded bg-muted border text-[9px] font-mono">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-muted border text-[9px] font-mono">Enter</kbd> for a new line.
            </p>
          </div>
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
    correct = answersMatch(String(answer ?? ""), q.answer ?? "");

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
            <span className={cn(correct ? "text-emerald-600" : "text-red-600", "whitespace-pre-wrap break-words font-mono text-[11px]")}>
              {String(answer ?? "Not answered")}
            </span>
          </p>
        )}
        <p>
          <span className="text-muted-foreground">Correct:</span>{" "}
          <span className="text-emerald-600 font-medium whitespace-pre-wrap break-words font-mono text-[11px]">
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
