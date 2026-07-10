"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types";
import { CodeBlock } from "./CodeBlock";
import { Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, answersMatch, logInteraction } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function QuizBlock({ questions }: { questions: QuizQuestion[] }) {
  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <QuestionRunner key={q.id} question={q} />
      ))}
    </div>
  );
}

function QuestionRunner({ question: q }: { question: QuizQuestion }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [boolAnswer, setBoolAnswer] = useState<boolean | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = (() => {
    if (!submitted) return null;
    switch (q.type) {
      case "multiple-choice":
        return selected === q.correct;
      case "true-false":
        return boolAnswer === q.correctBool;
      case "fill-blank":
      case "code-output":
        return answersMatch(textAnswer, q.answer ?? "");
      default:
        return null;
    }
  })();

  const submit = () => {
    if (
      q.type === "multiple-choice" && selected === null
    )
      return;
    if (q.type === "true-false" && boolAnswer === null) return;
    if (
      (q.type === "fill-blank" || q.type === "code-output") &&
      !textAnswer.trim()
    )
      return;
    setSubmitted(true);

    // Log the quiz check interaction to Qdrant
    const userAns = q.type === "multiple-choice" ? selected : q.type === "true-false" ? boolAnswer : textAnswer;
    const correctVal = q.type === "multiple-choice" ? q.correct : q.type === "true-false" ? q.correctBool : q.answer;
    const isCorrectVal = q.type === "multiple-choice" ? selected === q.correct : q.type === "true-false" ? boolAnswer === q.correctBool : answersMatch(textAnswer, q.answer ?? "");
    
    void logInteraction("quiz_check", `Submitted answer for quiz question ${q.id}`, {
      questionId: q.id,
      questionText: q.question,
      questionType: q.type,
      userAnswer: userAns,
      correctAnswer: correctVal,
      isCorrect: isCorrectVal
    });
  };

  const reset = () => {
    setSelected(null);
    setBoolAnswer(null);
    setTextAnswer("");
    setSubmitted(false);
  };

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-card p-4">
      <div className="flex items-start gap-2 mb-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
          {q.id}
        </span>
        <p className="text-sm font-medium text-foreground pt-0.5">
          {q.question}
        </p>
      </div>

      {q.type === "code-output" && q.code && (
        <div className="mb-3">
          <CodeBlock code={q.code} language="python" showRunInPlayground={false} />
        </div>
      )}

      <div className="space-y-2 ml-8">
        {q.type === "multiple-choice" && q.options && (
          <>
            {q.options.map((opt, i) => {
              const isSel = selected === i;
              const showCorrect = submitted && i === q.correct;
              const showWrong = submitted && isSel && i !== q.correct;
              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md border text-sm transition-colors flex items-center gap-2",
                    isSel && !submitted && "border-primary bg-primary/5",
                    showCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                    showWrong && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    !isSel && !showCorrect && !showWrong && "border-slate-200 dark:border-slate-700 hover:bg-accent",
                  )}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showCorrect && <Check className="h-4 w-4 text-emerald-500" />}
                  {showWrong && <X className="h-4 w-4 text-red-500" />}
                </button>
              );
            })}
          </>
        )}

        {q.type === "true-false" && (
          <div className="flex gap-2">
            {[true, false].map((val) => {
              const isSel = boolAnswer === val;
              const showCorrect = submitted && val === q.correctBool;
              const showWrong = submitted && isSel && val !== q.correctBool;
              return (
                <button
                  key={String(val)}
                  disabled={submitted}
                  onClick={() => setBoolAnswer(val)}
                  className={cn(
                    "flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors",
                    isSel && !submitted && "border-primary bg-primary/5",
                    showCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
                    showWrong && "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400",
                    !isSel && !showCorrect && !showWrong && "border-slate-200 dark:border-slate-700 hover:bg-accent",
                  )}
                >
                  {val ? "True" : "False"}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "fill-blank" && (
          <Input
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={submitted}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type your answer"
            className={cn(
              "font-mono text-sm",
              submitted && isCorrect && "border-emerald-500",
              submitted && !isCorrect && "border-red-500",
            )}
          />
        )}

        {q.type === "code-output" && (
          <div className="space-y-1.5">
            <Textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={submitted}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                // Ctrl/Cmd+Enter inserts a literal newline so multi-line
                // outputs can be typed. Plain Enter submits the answer.
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  const el = e.currentTarget;
                  const start = el.selectionStart;
                  const end = el.selectionEnd;
                  const next = textAnswer.slice(0, start) + "\n" + textAnswer.slice(end);
                  setTextAnswer(next);
                  requestAnimationFrame(() => {
                    el.selectionStart = el.selectionEnd = start + 1;
                  });
                } else if (!e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder={"Type the exact output (Ctrl+Enter for a new line)"}
              rows={3}
              className={cn(
                "font-mono text-sm min-h-[80px] resize-y",
                submitted && isCorrect && "border-emerald-500",
                submitted && !isCorrect && "border-red-500",
              )}
            />
            <p className="text-[10px] text-muted-foreground">
              Tip: press <kbd className="px-1 py-0.5 rounded bg-muted border text-[9px] font-mono">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-muted border text-[9px] font-mono">Enter</kbd> for a new line, <kbd className="px-1 py-0.5 rounded bg-muted border text-[9px] font-mono">Enter</kbd> to check.
            </p>
          </div>
        )}
      </div>

      {submitted ? (
        <div className="mt-3 ml-8">
          <div
            className={cn(
              "flex items-center gap-2 text-sm font-medium mb-2",
              isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
            )}
          >
            {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            {isCorrect ? "Correct!" : "Not quite."}
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {q.explanation}
          </p>
          {(q.type === "fill-blank" || q.type === "code-output") && !isCorrect && q.answer && (
            <p className="text-xs text-muted-foreground">
              Expected answer:{" "}
              <code className="font-mono bg-muted px-1.5 py-1 rounded whitespace-pre-wrap break-words block">
                {q.answer}
              </code>
            </p>
          )}
          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={reset}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="mt-3 ml-8">
          <Button size="sm" className="h-8 text-xs" onClick={submit}>
            Check answer
          </Button>
        </div>
      )}
    </div>
  );
}
