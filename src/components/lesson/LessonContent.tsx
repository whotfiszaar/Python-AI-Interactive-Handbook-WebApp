"use client";

import type { ContentBlock } from "@/types";
import { CodeBlock } from "./CodeBlock";
import { MermaidBlock } from "./MermaidBlock";
import { cn } from "@/lib/utils";
import { AlertTriangle, Lightbulb, GraduationCap } from "lucide-react";

const calloutStyles = {
  mistake: {
    wrapper: "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900",
    icon: "text-red-500",
    title: "text-red-700 dark:text-red-400",
  },
  teacher: {
    wrapper:
      "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900",
    icon: "text-blue-500",
    title: "text-blue-700 dark:text-blue-400",
  },
  tip: {
    wrapper:
      "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900",
    icon: "text-amber-500",
    title: "text-amber-700 dark:text-amber-400",
  },
} as const;

const calloutIcons = {
  mistake: AlertTriangle,
  teacher: GraduationCap,
  tip: Lightbulb,
} as const;

export function LessonContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-1">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2
                key={i}
                className="text-2xl font-semibold tracking-tight mt-8 mb-3 text-foreground"
              >
                {block.text}
              </h2>
            ) : (
              <h3
                key={i}
                className="text-xl font-semibold tracking-tight mt-6 mb-2 text-foreground"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/90 my-3"
              >
                {block.text}
              </p>
            );
          case "code":
            return (
              <CodeBlock
                key={i}
                code={block.code}
                language={block.language}
                caption={block.caption}
              />
            );
          case "mermaid":
            return (
              <MermaidBlock
                key={i}
                code={block.code}
                caption={block.caption}
              />
            );
          case "list":
            return block.ordered ? (
              <ol
                key={i}
                className="list-decimal list-inside space-y-1 my-3 text-foreground/90"
              >
                {block.items.map((it, j) => (
                  <li key={j} className="leading-relaxed">
                    {it}
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="list-disc list-inside space-y-1 my-3 text-foreground/90 marker:text-muted-foreground"
              >
                {block.items.map((it, j) => (
                  <li key={j} className="leading-relaxed">
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div
                key={i}
                className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-2 text-left font-semibold text-foreground"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr
                        key={j}
                        className={cn(
                          "border-b border-slate-100 dark:border-slate-800 last:border-0",
                          j % 2 === 1 &&
                            "bg-slate-50 dark:bg-slate-900/40",
                        )}
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="px-4 py-2 text-foreground/80 align-top"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout": {
            const s = calloutStyles[block.variant];
            const Icon = calloutIcons[block.variant];
            return (
              <div
                key={i}
                className={cn(
                  "my-4 rounded-lg border p-4 flex gap-3",
                  s.wrapper,
                )}
              >
                <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", s.icon)} />
                <div className="flex-1 min-w-0">
                  <p className={cn("font-semibold text-sm mb-1", s.title)}>
                    {block.title}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
