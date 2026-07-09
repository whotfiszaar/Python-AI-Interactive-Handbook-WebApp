"use client";

import { useAppStore } from "@/lib/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { days, phaseMeta } from "@/data/days";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { Check, Bookmark, Layers } from "lucide-react";

const phases: Array<"python" | "theory" | "practical"> = [
  "python",
  "theory",
  "practical",
];

export function MobileSidebar() {
  const open = useAppStore((s) => s.sidebarOpen);
  const setOpen = useAppStore((s) => s.setSidebarOpen);
  const navigate = useAppStore((s) => s.navigate);
  const dayNumber = useAppStore((s) => s.dayNumber);
  const view = useAppStore((s) => s.view);
  const { progress } = useProgress();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="text-base">Lessons</SheetTitle>
        </SheetHeader>
        <div className="py-2">
          {phases.map((phase) => {
            const phaseDays = days.filter((d) => d.phase === phase);
            const meta = phaseMeta[phase];
            return (
              <div key={phase} className="mb-3">
                <p className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {meta.label}
                </p>
                <ul>
                  {phaseDays.map((day) => {
                    const p = progress[day.dayNumber];
                    const active =
                      view === "day" && dayNumber === day.dayNumber;
                    return (
                      <li key={day.dayNumber}>
                        <button
                          onClick={() => {
                            navigate("day", { dayNumber: day.dayNumber });
                            setOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2 px-4 py-2 text-sm text-left",
                            active
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px]",
                              p?.completed
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-muted-foreground/40",
                            )}
                          >
                            {p?.completed && <Check className="h-3 w-3" />}
                          </span>
                          <span className="truncate flex-1">
                            <span className="text-muted-foreground text-xs mr-1">
                              {day.dayNumber}.
                            </span>
                            {day.title}
                          </span>
                          {p?.bookmarked && (
                            <Bookmark className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                  {phase === "theory" && (
                    <li>
                      <button
                        onClick={() => {
                          navigate("annexures");
                          setOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2 text-sm text-left mt-1",
                          view === "annexures"
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-amber-600 dark:text-amber-400",
                        )}
                      >
                        <Layers className="h-4 w-4 shrink-0" />
                        <span className="truncate flex-1 font-medium">
                          Course Annexures
                        </span>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
