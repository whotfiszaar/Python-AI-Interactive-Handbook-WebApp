"use client";

import { useCallback, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import type { DayProgressRow, ProgressPayload } from "@/types";
import { toast } from "sonner";

export function useProgress() {
  const progress = useAppStore((s) => s.progress);
  const setProgress = useAppStore((s) => s.setProgress);
  const upsertProgress = useAppStore((s) => s.upsertProgress);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load progress");
      const data = (await res.json()) as DayProgressRow[];
      setProgress(data);
    } catch (e) {
      console.error(e);
    }
  }, [setProgress]);

  const save = useCallback(
    async (payload: ProgressPayload) => {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save progress");
        const row = (await res.json()) as import("@/types").DayProgressRow;
        upsertProgress(row);
        return row;
      } catch (e) {
        console.error(e);
        toast.error("Could not save progress");
        return null;
      }
    },
    [upsertProgress],
  );

  const toggleComplete = useCallback(
    (dayNumber: number) => {
      const current = progress[dayNumber]?.completed ?? false;
      return save({ dayNumber, completed: !current });
    },
    [progress, save],
  );

  const toggleBookmark = useCallback(
    (dayNumber: number) => {
      const current = progress[dayNumber]?.bookmarked ?? false;
      return save({ dayNumber, bookmarked: !current });
    },
    [progress, save],
  );

  const saveNotes = useCallback(
    (dayNumber: number, notes: string) => save({ dayNumber, notes }),
    [save],
  );

  useEffect(() => {
    void load();
  }, [load]);

  return {
    progress,
    load,
    save,
    toggleComplete,
    toggleBookmark,
    saveNotes,
  };
}
