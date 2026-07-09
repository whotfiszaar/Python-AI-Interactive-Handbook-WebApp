"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function useAppInit() {
  const setProgress = useAppStore((s) => s.setProgress);
  const setScores = useAppStore((s) => s.setScores);
  const setSettings = useAppStore((s) => s.setSettings);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const setStudentName = useAppStore((s) => s.setStudentName);

  useEffect(() => {
    let active = true;

    // INSTANT HYDRATION: Read the student name from localStorage so the UI
    // shows the correct name immediately (no "Aarav" flash) before the API
    // round-trip completes.
    try {
      const cachedName = localStorage.getItem("__studentName");
      if (cachedName) {
        setStudentName(cachedName);
      }
    } catch {
      /* ignore */
    }

    (async () => {
      try {
        const [progressRes, scoresRes, settingsRes] = await Promise.all([
          fetch("/api/progress", { cache: "no-store" }),
          fetch("/api/assessments", { cache: "no-store" }),
          fetch("/api/settings", { cache: "no-store" }),
        ]);
        if (active) {
          if (progressRes.ok) {
            const data = (await progressRes.json()) as import("@/types").DayProgressRow[];
            setProgress(data);
          }
          if (scoresRes.ok) {
            const data = (await scoresRes.json()) as import("@/types").AssessmentScoreRow[];
            setScores(data);
          }
          if (settingsRes.ok) {
            const data = (await settingsRes.json()) as import("@/types").SettingsRow;
            setSettings(data);
            // Cache the name in localStorage for instant access on next load.
            if (data.studentName) {
              try {
                localStorage.setItem("__studentName", data.studentName);
              } catch {
                /* ignore */
              }
            }
            // apply font size
            if (data.fontSize) {
              document.documentElement.style.fontSize = `${data.fontSize}px`;
            }
          }
        }
      } catch (e) {
        console.error("App init failed", e);
      } finally {
        if (active) setHydrated(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [setProgress, setScores, setSettings, setHydrated, setStudentName]);
}
