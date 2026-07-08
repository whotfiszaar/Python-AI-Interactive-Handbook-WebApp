import type { Day } from "@/types";
import { days1to15 } from "@/data/days-1-15";
import { days16to25 } from "@/data/days-16-25";
import { days26to35 } from "@/data/days-26-35";
import { days36to48 } from "@/data/days-36-48";

export const days: Day[] = [
  ...days1to15,
  ...days16to25,
  ...days26to35,
  ...days36to48,
];

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
