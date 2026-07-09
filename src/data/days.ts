import type { Day } from "@/types";
import { days1to15 } from "@/data/days-1-15";
import { days16to25 } from "@/data/days-16-25";
import { days26to35 } from "@/data/days-26-35";
import { days36to48 } from "@/data/days-36-48";
import { extraExercises1to24 } from "@/data/exercises-extra-1-24";
import { extraExercises25to48 } from "@/data/exercises-extra-25-48";
import { extraQuizzes1to24 } from "@/data/quizzes-extra-1-24";
import { extraQuizzes25to48 } from "@/data/quizzes-extra-25-48";

// Merge the base days with extra exercises and quizzes so every day has
// at least 10 exercises and 10 quiz questions.
const baseDays: Day[] = [
  ...days1to15,
  ...days16to25,
  ...days26to35,
  ...days36to48,
];

const extraExercises: Record<number, typeof extraExercises1to24[number]> = {
  ...extraExercises1to24,
  ...extraExercises25to48,
};

const extraQuizzes: Record<number, typeof extraQuizzes1to24[number]> = {
  ...extraQuizzes1to24,
  ...extraQuizzes25to48,
};

export const days: Day[] = baseDays.map((day) => ({
  ...day,
  exercises: [...(day.exercises ?? []), ...(extraExercises[day.dayNumber] ?? [])],
  quiz: [...day.quiz, ...(extraQuizzes[day.dayNumber] ?? [])],
}));

export function getDay(dayNumber: number): Day | undefined {
  return days.find((d) => d.dayNumber === dayNumber);
}

export const phaseMeta: Record<
  "python" | "theory" | "practical",
  { label: string; dayRange: string; color: string }
> = {
  python: {
    label: "Python Fundamentals",
    dayRange: "Days 1-15",
    color: "text-emerald-600",
  },
  theory: {
    label: "AI Theory",
    dayRange: "Days 16-25",
    color: "text-amber-600",
  },
  practical: {
    label: "Practical AI",
    dayRange: "Days 26-48",
    color: "text-violet-600",
  },
};
