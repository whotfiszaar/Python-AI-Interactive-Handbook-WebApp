"use client";

import { create } from "zustand";
import type {
  DayProgressRow,
  AssessmentScoreRow,
  SettingsRow,
  ViewName,
} from "@/types";
import { DEFAULT_STUDENT_NAME } from "@/lib/utils";

interface AppStore {
  // view routing
  view: ViewName;
  dayNumber: number | null;
  assessmentId: string | null;
  playgroundCode: string | null;

  navigate: (
    view: ViewName,
    opts?: {
      dayNumber?: number;
      assessmentId?: string;
      playgroundCode?: string;
    },
  ) => void;

  // cached data
  progress: Record<number, DayProgressRow>;
  setProgress: (rows: DayProgressRow[]) => void;
  upsertProgress: (row: DayProgressRow) => void;

  scores: AssessmentScoreRow[];
  setScores: (rows: AssessmentScoreRow[]) => void;
  addScore: (row: AssessmentScoreRow) => void;

  settings: SettingsRow | null;
  setSettings: (row: SettingsRow) => void;
  /** The learner's saved name, or empty if not set yet. */
  studentName: string;
  /** Name to display in the UI (falls back to the placeholder). */
  displayName: string;
  setStudentName: (name: string) => void;
  /** Whether the first-visit name prompt has been dismissed this session. */
  namePromptDismissed: boolean;
  setNamePromptDismissed: (v: boolean) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  /** Desktop (lg+) lessons sidebar visibility, toggleable so the playground can use full width. */
  desktopSidebarOpen: boolean;
  setDesktopSidebarOpen: (open: boolean) => void;
  toggleDesktopSidebar: () => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // persisted locally for instant load + offline
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  view: "home",
  dayNumber: null,
  assessmentId: null,
  playgroundCode: null,

  navigate: (view, opts) =>
    set((s) => ({
      view,
      dayNumber: opts?.dayNumber ?? null,
      assessmentId: opts?.assessmentId ?? null,
      playgroundCode: opts?.playgroundCode ?? null,
      // Auto-collapse the desktop lessons sidebar when entering the
      // playground so the editor gets maximum width.
      ...(view === "playground" ? { desktopSidebarOpen: false } : {}),
    })),

  progress: {},
  setProgress: (rows) => {
    const map: Record<number, DayProgressRow> = {};
    for (const r of rows) map[r.dayNumber] = r;
    set({ progress: map });
  },
  upsertProgress: (row) =>
    set((s) => ({ progress: { ...s.progress, [row.dayNumber]: row } })),

  scores: [],
  setScores: (rows) => set({ scores: rows }),
  addScore: (row) => set((s) => ({ scores: [row, ...s.scores] })),

  settings: null,
  setSettings: (row) =>
    set({
      settings: row,
      studentName: row.studentName ?? "",
      displayName: row.studentName?.trim() || DEFAULT_STUDENT_NAME,
    }),
  studentName: "",
  displayName: DEFAULT_STUDENT_NAME,
  setStudentName: (name) =>
    set((s) => ({
      studentName: name,
      displayName: name.trim() || DEFAULT_STUDENT_NAME,
      settings: s.settings
        ? { ...s.settings, studentName: name }
        : s.settings,
    })),
  namePromptDismissed: false,
  setNamePromptDismissed: (v) => set({ namePromptDismissed: v }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  desktopSidebarOpen: true,
  setDesktopSidebarOpen: (open) => set({ desktopSidebarOpen: open }),
  toggleDesktopSidebar: () =>
    set((s) => ({ desktopSidebarOpen: !s.desktopSidebarOpen })),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  hydrated: false,
  setHydrated: (v) => set({ hydrated: v }),
}));
