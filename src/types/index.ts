// Core type definitions for the Python & AI Handbook

export type Phase = "python" | "theory" | "practical";

export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string; caption?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "mistake" | "teacher" | "tip";
      title: string;
      text: string;
    }
  | { type: "mermaid"; code: string; caption?: string };

export interface Exercise {
  id: number;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  hint: string;
}

export type QuizType =
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "code-output";

export interface QuizQuestion {
  id: number;
  type: QuizType;
  question: string;
  options?: string[];
  correct?: number;
  correctBool?: boolean;
  answer?: string;
  code?: string;
  explanation: string;
}

export interface Day {
  dayNumber: number;
  title: string;
  phase: Phase;
  objectives: string[];
  content: ContentBlock[];
  exercises?: Exercise[];
  quiz: QuizQuestion[];
  teacherNotes: string;
  explainToFriend?: string;
  realWorldExamples?: string[];
  thingsToGoogle?: string[];
  setupInstructions?: string;
  expectedOutput?: string;
  debugging?: string[];
}

export interface AssessmentQuestion {
  id: number;
  type: QuizType;
  question: string;
  options?: string[];
  correct?: number;
  correctBool?: boolean;
  answer?: string;
  code?: string;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  timerMinutes?: number;
}

export interface DayProgressRow {
  id: number;
  dayNumber: number;
  completed: boolean;
  bookmarked: boolean;
  lastVisited: string;
  notes: string;
  quizAnswers: string;
}

export interface AssessmentScoreRow {
  id: number;
  assessmentId: string;
  score: number;
  total: number;
  answers: string;
  completedAt: string;
}

export interface NotebookRow {
  id: number;
  name: string;
  cells: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsRow {
  id: number;
  darkMode: boolean;
  fontSize: number;
  apiKeys: string;
  studentName: string;
}

export interface ProgressPayload {
  dayNumber: number;
  completed?: boolean;
  bookmarked?: boolean;
  notes?: string;
  quizAnswers?: string;
}

export interface AssessmentPayload {
  assessmentId: string;
  score: number;
  total: number;
  answers: unknown;
}

export interface NotebookPayload {
  name: string;
  cells: unknown;
}

export interface SettingsPayload {
  darkMode?: boolean;
  fontSize?: number;
  apiKeys?: unknown;
  studentName?: string;
}

export interface NotebookCell {
  id: string;
  code: string;
  output: string;
  running: boolean;
  error: boolean;
  hasRun: boolean;
  executionMs: number | null;
  images: string[];
}

export interface ReferenceItem {
  term?: string;
  syntax?: string;
  example?: string;
  description?: string;
  code?: string;
  language?: string;
  model?: string;
  provider?: string;
  contextWindow?: string;
  bestFor?: string;
  free?: boolean;
  error?: string;
  meaning?: string;
  fix?: string;
}

export interface ReferenceSection {
  id: string;
  title: string;
  description: string;
  kind: "cheatsheet" | "glossary" | "models" | "snippets" | "errors";
  items: ReferenceItem[];
}

export type ViewName =
  | "home"
  | "days"
  | "day"
  | "playground"
  | "assessments"
  | "assessment"
  | "progress"
  | "references"
  | "ai-news"
  | "settings"
  | "admin"
  | "annexures";

export interface ViewState {
  view: ViewName;
  dayNumber?: number;
  assessmentId?: string;
  playgroundCode?: string;
  /** When navigating to references, which tab to auto-select. */
  referenceTabId?: string;
}
