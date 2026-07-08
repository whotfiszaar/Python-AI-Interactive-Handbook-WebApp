"use client";

import { useAppStore } from "@/lib/store";
import { days, phaseMeta } from "@/data/days";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";
import { Check, Bookmark } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const phases: Array<"python" | "theory" | "practical"> = [
  "python",
  "theory",
  "practical",
];

export function Sidebar() {
  const view = useAppStore((s) => s.view);
  const dayNumber = useAppStore((s) => s.dayNumber);
  const navigate = useAppStore((s) => s.navigate);
  const desktopSidebarOpen = useAppStore((s) => s.desktopSidebarOpen);
  const { progress } = useProgress();

  // When collapsed on desktop, render nothing (the toggle button lives in the Header).
  if (!desktopSidebarOpen) return null;

  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 border-r border-border bg-card h-[calc(100vh-3.5rem)] sticky top-14 transition-all duration-200">
      <div className="flex-1 overflow-y-auto py-3">
        <Accordion
          type="multiple"
          defaultValue={["python", "theory", "practical"]}
        >
          {phases.map((phase) => {
            const phaseDays = days.filter((d) => d.phase === phase);
            const meta = phaseMeta[phase];
            const completed = phaseDays.filter(
              (d) => progress[d.dayNumber]?.completed,
            ).length;
            return (
              <AccordionItem
                key={phase}
                value={phase}
                className="border-border"
              >
                <AccordionTrigger className="px-4 py-2 text-sm hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-2">
                    <span className="font-medium text-left">
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {completed}/{phaseDays.length}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <ul className="space-y-0.5">
                    {phaseDays.map((day) => {
                      const p = progress[day.dayNumber];
                      const active =
                        view === "day" && dayNumber === day.dayNumber;
                      return (
                        <li key={day.dayNumber}>
                          <button
                            onClick={() =>
                              navigate("day", { dayNumber: day.dayNumber })
                            }
                            className={cn(
                              "w-full flex items-center gap-2 px-4 py-1.5 text-sm rounded-md text-left transition-colors",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent text-foreground/80",
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
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </aside>
  );
}
