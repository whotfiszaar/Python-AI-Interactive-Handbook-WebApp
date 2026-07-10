"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function useAppInit() {
  const setProgress = useAppStore((s) => s.setProgress);
  const setScores = useAppStore((s) => s.setScores);
  const setSettings = useAppStore((s) => s.setSettings);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const setStudentName = useAppStore((s) => s.setStudentName);
  const loginUser = useAppStore((s) => s.loginUser);
  const logoutUser = useAppStore((s) => s.logoutUser);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        // Step 1: Check session status first
        const sessionRes = await fetch("/api/auth/session", { cache: "no-store" });
        if (!sessionRes.ok) {
          logoutUser();
          if (active) setHydrated(true);
          return;
        }

        const sessionData = (await sessionRes.json()) as {
          authenticated: boolean;
          user?: { id: number; username: string; name: string };
        };

        if (!sessionData.authenticated || !sessionData.user) {
          logoutUser();
          if (active) setHydrated(true);
          return;
        }

        // Set logged-in state
        if (active) {
          if (sessionData.user.username === "admin") {
            useAppStore.getState().setAdminAuth("session");
            useAppStore.getState().navigate("admin");
            loginUser(sessionData.user);
            setHydrated(true);
            return;
          }
          loginUser(sessionData.user);
          try {
            const cachedName = localStorage.getItem(`__studentName:${sessionData.user.username}`);
            if (cachedName) {
              setStudentName(cachedName);
            }
          } catch {
            /* ignore */
          }
        }

        // Step 2: Fetch user-specific progress, scores, and settings
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
                localStorage.setItem(`__studentName:${sessionData.user.username}`, data.studentName);
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
        logoutUser();
      } finally {
        if (active) setHydrated(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [setProgress, setScores, setSettings, setHydrated, setStudentName, loginUser, logoutUser]);
}
