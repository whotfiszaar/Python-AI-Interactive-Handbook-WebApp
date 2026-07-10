"use client";

import { create } from "zustand";
import type {
  DayProgressRow,
  AssessmentScoreRow,
  SettingsRow,
  ViewName,
} from "@/types";
import { DEFAULT_STUDENT_NAME, logInteraction } from "@/lib/utils";

const studentNameKey = (username: string) => `__studentName:${username}`;

interface AppStore {
  // view routing
  view: ViewName;
  dayNumber: number | null;
  assessmentId: string | null;
  playgroundCode: string | null;
  referenceTabId: string | null;

  navigate: (
    view: ViewName,
    opts?: {
      dayNumber?: number;
      assessmentId?: string;
      playgroundCode?: string;
      referenceTabId?: string;
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

  /** Admin mode: password + auth state */
  isAdmin: boolean;
  adminPassword: string;
  setAdminAuth: (password: string) => void;
  setAdminLogout: () => void;

  /** OpenRouter API key dialog (global, triggered from anywhere) */
  apiKeyDialogOpen: boolean;
  setAPIKeyDialogOpen: (open: boolean) => void;

  // persisted locally for instant load + offline
  hydrated: boolean;
  setHydrated: (v: boolean) => void;

  // Logged in user state
  user: { id: number; username: string; name: string } | null;
  isLoggedIn: boolean;
  loginUser: (user: { id: number; username: string; name: string }) => void;
  logoutUser: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  view: "home",
  dayNumber: null,
  assessmentId: null,
  playgroundCode: null,
  referenceTabId: null,

  navigate: (view, opts) => {
    // Log navigation client-side
    void logInteraction("view_navigate", `Navigated to ${view}`, { opts });
    set((s) => ({
      view,
      dayNumber: opts?.dayNumber ?? null,
      assessmentId: opts?.assessmentId ?? null,
      playgroundCode: opts?.playgroundCode ?? null,
      referenceTabId: opts?.referenceTabId ?? null,
      // Auto-collapse the desktop lessons sidebar when entering the
      // playground so the editor gets maximum width.
      ...(view === "playground" ? { desktopSidebarOpen: false } : {}),
    }));
  },

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
    set((s) => {
      if (row.studentName && s.user?.username) {
        try {
          localStorage.setItem(studentNameKey(s.user.username), row.studentName);
        } catch {}
      }
      return {
      settings: row,
      studentName: row.studentName ?? "",
      displayName: row.studentName?.trim() || "",
      };
    }),
  studentName: "",
  displayName: "",
  setStudentName: (name) => {
    set((s) => ({
      studentName: name,
      displayName: name.trim() || "",
      settings: s.settings
        ? { ...s.settings, studentName: name }
        : s.settings,
    }));
  },
  namePromptDismissed: false,
  setNamePromptDismissed: (v) => set({ namePromptDismissed: v }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  desktopSidebarOpen: false,
  setDesktopSidebarOpen: (open) => set({ desktopSidebarOpen: open }),
  toggleDesktopSidebar: () =>
    set((s) => ({ desktopSidebarOpen: !s.desktopSidebarOpen })),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  isAdmin: false,
  adminPassword: "",
  setAdminAuth: (password) =>
    set({ isAdmin: true, adminPassword: password }),
  setAdminLogout: () => set({ isAdmin: false, adminPassword: "" }),

  apiKeyDialogOpen: false,
  setAPIKeyDialogOpen: (open) => set({ apiKeyDialogOpen: open }),

  hydrated: false,
  setHydrated: (v) => set({ hydrated: v }),

  user: null,
  isLoggedIn: false,
  loginUser: (user) =>
    set({
      user,
      isLoggedIn: true,
      settings: null,
      progress: {},
      scores: [],
      studentName: user.name ?? "",
      displayName: user.name?.trim() || "",
    }),
  logoutUser: () =>
    set({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      adminPassword: "",
      settings: null,
      progress: {},
      scores: [],
      studentName: "",
      displayName: "",
    }),
}));
