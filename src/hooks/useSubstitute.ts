"use client";

import { useCallback, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { substituteName } from "@/lib/utils";
import type {
  Day,
  Assessment,
  AssessmentQuestion,
  QuizQuestion,
  Exercise,
  ContentBlock,
  ReferenceSection,
  ReferenceItem,
} from "@/types";

/**
 * Returns a memoized `sub` function that swaps the placeholder student name
 * for the learner's saved name. Components call `sub(string)` on any text
 * before rendering. When no name is set, text is returned unchanged.
 */
export function useSubstitute() {
  const studentName = useAppStore((s) => s.studentName);

  const sub = useCallback(
    (text: string): string => substituteName(text, studentName),
    [studentName],
  );

  // Stable reference when studentName is unchanged.
  return useMemo(() => ({ sub, studentName }), [sub, studentName]);
}

/** Substitute every text field of a Day (returns a new object). */
export function personalizeDay(day: Day, name: string): Day {
  if (!name?.trim()) return day;
  const sub = (t: string) => substituteName(t, name);
  return {
    ...day,
    objectives: day.objectives.map(sub),
    content: day.content.map((block) => personalizeBlock(block, name)),
    exercises: day.exercises?.map((ex) => personalizeExercise(ex, name)),
    quiz: day.quiz.map((q) => personalizeQuizQuestion(q, name)),
    teacherNotes: sub(day.teacherNotes),
    explainToFriend: day.explainToFriend ? sub(day.explainToFriend) : undefined,
    realWorldExamples: day.realWorldExamples?.map(sub),
    thingsToGoogle: day.thingsToGoogle?.map(sub),
    setupInstructions: day.setupInstructions
      ? sub(day.setupInstructions)
      : undefined,
    expectedOutput: day.expectedOutput
      ? sub(day.expectedOutput)
      : undefined,
    debugging: day.debugging?.map(sub),
  };
}

function personalizeBlock(block: ContentBlock, name: string): ContentBlock {
  const sub = (t: string) => substituteName(t, name);
  switch (block.type) {
    case "heading":
      return { ...block, text: sub(block.text) };
    case "paragraph":
      return { ...block, text: sub(block.text) };
    case "code":
      return {
        ...block,
        code: sub(block.code),
        caption: block.caption ? sub(block.caption) : undefined,
      };
    case "list":
      return { ...block, items: block.items.map(sub) };
    case "table":
      return {
        ...block,
        headers: block.headers.map(sub),
        rows: block.rows.map((row) => row.map(sub)),
      };
    case "callout":
      return { ...block, title: sub(block.title), text: sub(block.text) };
    case "mermaid":
      return {
        ...block,
        code: sub(block.code),
        caption: block.caption ? sub(block.caption) : undefined,
      };
    default:
      return block;
  }
}

function personalizeExercise(ex: Exercise, name: string): Exercise {
  const sub = (t: string) => substituteName(t, name);
  return {
    ...ex,
    description: sub(ex.description),
    hint: sub(ex.hint),
  };
}

function personalizeQuizQuestion(
  q: QuizQuestion,
  name: string,
): QuizQuestion {
  const sub = (t: string) => substituteName(t, name);
  return {
    ...q,
    question: sub(q.question),
    options: q.options?.map(sub),
    answer: q.answer ? sub(q.answer) : undefined,
    code: q.code ? sub(q.code) : undefined,
    explanation: sub(q.explanation),
  };
}

/** Substitute every text field of an Assessment (returns a new object). */
export function personalizeAssessment(
  assessment: Assessment,
  name: string,
): Assessment {
  if (!name?.trim()) return assessment;
  return {
    ...assessment,
    title: substituteName(assessment.title, name),
    description: substituteName(assessment.description, name),
    questions: assessment.questions.map((q) =>
      personalizeAssessmentQuestion(q, name),
    ),
  };
}

function personalizeAssessmentQuestion(
  q: AssessmentQuestion,
  name: string,
): AssessmentQuestion {
  const sub = (t: string) => substituteName(t, name);
  return {
    ...q,
    question: sub(q.question),
    options: q.options?.map(sub),
    answer: q.answer ? sub(q.answer) : undefined,
    code: q.code ? sub(q.code) : undefined,
    explanation: sub(q.explanation),
  };
}

/** Substitute every text field of a ReferenceSection (returns a new object). */
export function personalizeReference(
  section: ReferenceSection,
  name: string,
): ReferenceSection {
  if (!name?.trim()) return section;
  const sub = (t: string) => substituteName(t, name);
  return {
    ...section,
    title: sub(section.title),
    description: sub(section.description),
    items: section.items.map((item) => personalizeReferenceItem(item, name)),
  };
}

function personalizeReferenceItem(
  item: ReferenceItem,
  name: string,
): ReferenceItem {
  const sub = (t: string) => substituteName(t, name);
  const out: ReferenceItem = { ...item };
  if (item.term) out.term = sub(item.term);
  if (item.syntax) out.syntax = sub(item.syntax);
  if (item.example) out.example = sub(item.example);
  if (item.description) out.description = sub(item.description);
  if (item.code) out.code = sub(item.code);
  if (item.model) out.model = sub(item.model);
  if (item.provider) out.provider = sub(item.provider);
  if (item.contextWindow) out.contextWindow = sub(item.contextWindow);
  if (item.bestFor) out.bestFor = sub(item.bestFor);
  if (item.error) out.error = sub(item.error);
  if (item.meaning) out.meaning = sub(item.meaning);
  if (item.fix) out.fix = sub(item.fix);
  return out;
}
