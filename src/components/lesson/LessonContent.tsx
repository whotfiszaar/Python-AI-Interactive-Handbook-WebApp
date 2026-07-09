"use client";

import type { ContentBlock } from "@/types";
import { CodeBlock } from "./CodeBlock";
import { MermaidBlock } from "./MermaidBlock";
import { DayReferenceText } from "./DayReference";
import { cn } from "@/lib/utils";
import { AlertTriangle, Lightbulb, GraduationCap } from "lucide-react";

// Standard library modules that don't need pip install.
const STDLIB_MODULES = new Set([
  "os", "sys", "math", "random", "json", "re", "datetime", "time", "io",
  "collections", "itertools", "functools", "pathlib", "typing", "abc",
  "copy", "string", "textwrap", "unicodedata", "struct", "csv", "hashlib",
  "base64", "urllib", "http", "xml", "html", "email", "sqlite3", "socket",
  "threading", "multiprocessing", "logging", "warnings", "traceback",
  "inspect", "ast", "operator", "decimal", "fractions", "statistics",
  "bisect", "heapq", "queue", "enum", "dataclasses", "contextlib",
  "unittest", "doctest", "pickle", "shelve", "dbm", "zipfile", "tarfile",
  "gzip", "bz2", "lzma", "tempfile", "shutil", "glob", "fnmatch",
  "argparse", "getopt", "configparser", "netrc", "xmlrpc", "platform",
  "getpass", "secrets", "uuid", "weakref", "types", "numbers",
]);

// Map of import names to pip package names (when they differ).
const IMPORT_TO_PIP: Record<string, string> = {
  yaml: "pyyaml",
  cv2: "opencv-python",
  PIL: "Pillow",
  sklearn: "scikit-learn",
  dateutil: "python-dateutil",
  bs4: "beautifulsoup4",
  dotenv: "python-dotenv",
  jinja2: "jinja2",
  requests: "requests",
  numpy: "numpy",
  pandas: "pandas",
  matplotlib: "matplotlib",
  scipy: "scipy",
  openai: "openai",
  pydantic: "pydantic",
  pytest: "pytest",
};

/**
 * Detect if a code block has imports that need pip install. If so, return
 * the pip install command. Returns null if no install is needed.
 * Only triggers for non-standard-library imports.
 */
function detectInstallCommand(code: string): string | null {
  const importRegex = /^\s*(?:from\s+(\S+)\s+import|import\s+(\S+))/gm;
  const packages: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(code)) !== null) {
    const pkg = (match[1] || match[2] || "").split(".")[0];
    if (
      pkg &&
      !STDLIB_MODULES.has(pkg) &&
      !packages.includes(pkg)
    ) {
      // Map to pip package name
      const pipName = IMPORT_TO_PIP[pkg] || pkg;
      if (!packages.includes(pipName)) {
        packages.push(pipName);
      }
    }
  }
  if (packages.length === 0) return null;
  return `pip install ${packages.join(" ")}`;
}

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
                <DayReferenceText text={block.text} />
              </p>
            );
          case "code": {
            // Detect if this code block has imports that need pip install.
            // If so, render a prerequisite "install" cell before it.
            const installCmd = detectInstallCommand(block.code);
            return (
              <div key={i}>
                {installCmd && (
                  <CodeBlock
                    code={installCmd}
                    language="bash"
                    caption="Prerequisite: run this first to install required packages"
                    showRunInPlayground={false}
                  />
                )}
                <CodeBlock
                  code={block.code}
                  language={block.language}
                  caption={block.caption}
                />
              </div>
            );
          }
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
                    <DayReferenceText text={it} />
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
                    <DayReferenceText text={it} />
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
                    <DayReferenceText text={block.text} />
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
