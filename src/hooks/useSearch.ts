"use client";

import { useMemo, useState } from "react";
import { days } from "@/data/days";
import { assessments } from "@/data/assessments";
import { referenceSections } from "@/data/references";
import { useAppStore } from "@/lib/store";
import { substituteName } from "@/lib/utils";

export interface SearchResult {
  type: "day" | "lesson" | "assessment" | "reference";
  label: string;
  description: string;
  dayNumber?: number;
  assessmentId?: string;
  referenceId?: string;
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const studentName = useAppStore((s) => s.studentName);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResult[] = [];

    // Substitute the placeholder name so searching the learner's own name
    // (or any phrase containing it) matches the personalized content.
    const sub = (t: string) => substituteName(t, studentName);

    for (const day of days) {
      if (day.title.toLowerCase().includes(q) || `day ${day.dayNumber}`.includes(q)) {
        out.push({
          type: "day",
          label: `Day ${day.dayNumber}: ${day.title}`,
          description: `Phase: ${day.phase}`,
          dayNumber: day.dayNumber,
        });
      }
      // search lesson content text
      for (const block of day.content) {
        if (block.type === "paragraph" && sub(block.text).toLowerCase().includes(q)) {
          out.push({
            type: "lesson",
            label: `Day ${day.dayNumber} lesson`,
            description: sub(block.text).slice(0, 100),
            dayNumber: day.dayNumber,
          });
          break;
        }
        if (block.type === "heading" && sub(block.text).toLowerCase().includes(q)) {
          out.push({
            type: "lesson",
            label: `Day ${day.dayNumber}: ${sub(block.text)}`,
            description: day.title,
            dayNumber: day.dayNumber,
          });
          break;
        }
      }
      for (const obj of day.objectives) {
        if (sub(obj).toLowerCase().includes(q)) {
          out.push({
            type: "lesson",
            label: `Day ${day.dayNumber} objective`,
            description: sub(obj),
            dayNumber: day.dayNumber,
          });
          break;
        }
      }
    }

    for (const a of assessments) {
      if (
        sub(a.title).toLowerCase().includes(q) ||
        sub(a.description).toLowerCase().includes(q)
      ) {
        out.push({
          type: "assessment",
          label: sub(a.title),
          description: sub(a.description),
          assessmentId: a.id,
        });
      }
    }

    for (const section of referenceSections) {
      const sectionMatch = sub(section.title).toLowerCase().includes(q);
      // Also search within items for a more useful reference search.
      const itemMatch = section.items.some((item) => {
        const haystack = `${item.term ?? ""} ${item.description ?? ""} ${item.syntax ?? ""}`.toLowerCase();
        return haystack.includes(q);
      });
      if (sectionMatch || itemMatch) {
        out.push({
          type: "reference",
          label: sub(section.title),
          description: sectionMatch
            ? `Reference: ${sub(section.title)}`
            : `Found in ${section.items.length} items`,
          referenceId: section.id,
        });
      }
    }

    return out.slice(0, 30);
  }, [query, studentName]);

  return { query, setQuery, results };
}
