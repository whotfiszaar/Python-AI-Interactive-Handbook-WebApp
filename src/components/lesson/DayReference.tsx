"use client";

import { useState, useRef, useEffect } from "react";
import { getDay } from "@/data/days";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { BookOpen, ArrowRight } from "lucide-react";

/**
 * Parses text for day references like "Day 5", "Day 10", "day 3" and
 * renders them as hoverable links that show a preview card and navigate
 * to the day when clicked.
 */
export function DayReferenceText({ text }: { text: string }) {
  // Match "Day N" or "day N" where N is 1-48
  const parts = text.split(/(Day\s+(\d+)|day\s+(\d+))/gi);

  return (
    <>
      {parts.map((part, i) => {
        // Check if this part is a day reference (odd indices from the split)
        const dayMatch = part?.match(/^[Dd]ay\s+(\d+)$/);
        if (dayMatch) {
          const dayNum = parseInt(dayMatch[1], 10);
          if (dayNum >= 1 && dayNum <= 48) {
            return <DayReference key={i} dayNumber={dayNum} text={part} />;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function DayReference({
  dayNumber,
  text,
}: {
  dayNumber: number;
  text: string;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLSpanElement>(null);
  const navigate = useAppStore((s) => s.navigate);
  const day = getDay(dayNumber);

  useEffect(() => {
    if (showPreview && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: Math.min(rect.left, window.innerWidth - 320),
      });
    }
  }, [showPreview]);

  if (!day) return <span>{text}</span>;

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      <button
        onClick={() => navigate("day", { dayNumber })}
        className="text-primary font-medium underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all"
      >
        {text}
      </button>

      {/* Hover preview card */}
      {showPreview && (
        <div
          className="fixed z-50 w-72 rounded-lg border border-border bg-popover shadow-lg p-3 animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ top: position.top, left: position.left }}
        >
          <div className="flex items-start gap-2 mb-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                Day {day.dayNumber}
              </p>
              <p className="text-sm font-semibold truncate">{day.title}</p>
            </div>
          </div>

          {/* Objectives preview */}
          {day.objectives.length > 0 && (
            <div className="space-y-0.5 mb-2">
              {day.objectives.slice(0, 3).map((obj, i) => (
                <p
                  key={i}
                  className="text-[11px] text-muted-foreground line-clamp-1"
                >
                  {obj}
                </p>
              ))}
              {day.objectives.length > 3 && (
                <p className="text-[10px] text-muted-foreground">
                  +{day.objectives.length - 3} more objectives
                </p>
              )}
            </div>
          )}

          {/* Phase badge */}
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-[10px] font-medium px-1.5 py-0.5 rounded",
                day.phase === "python" &&
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
                day.phase === "theory" &&
                  "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
                day.phase === "practical" &&
                  "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400",
              )}
            >
              {day.phase === "python"
                ? "Python"
                : day.phase === "theory"
                  ? "AI Theory"
                  : "Practical AI"}
            </span>
            <button
              onClick={() => navigate("day", { dayNumber })}
              className="text-[10px] text-primary font-medium flex items-center gap-0.5 hover:gap-1 transition-all"
            >
              Go to lesson
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
