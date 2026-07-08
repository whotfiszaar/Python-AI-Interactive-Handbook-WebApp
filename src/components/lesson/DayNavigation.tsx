"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DayNavigation({ dayNumber }: { dayNumber: number }) {
  const navigate = useAppStore((s) => s.navigate);
  const prev = dayNumber > 1 ? dayNumber - 1 : null;
  const next = dayNumber < 48 ? dayNumber + 1 : null;

  return (
    <div className="flex items-center justify-between gap-3 mt-12 pt-6 border-t border-border">
      <Button
        variant="outline"
        disabled={!prev}
        onClick={() => prev && navigate("day", { dayNumber: prev })}
        className="gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
        {prev && <span className="text-xs text-muted-foreground">Day {prev}</span>}
      </Button>
      <Button
        variant="outline"
        disabled={!next}
        onClick={() => next && navigate("day", { dayNumber: next })}
        className="gap-1"
      >
        {next && <span className="text-xs text-muted-foreground">Day {next}</span>}
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
