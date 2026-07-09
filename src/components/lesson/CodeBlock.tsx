"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  Check,
  Copy,
  Play,
  Loader2,
  Terminal,
  RotateCcw,
  Pencil,
  MessageSquareText,
} from "lucide-react";
import { isAICode, cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

// Lazy-load shiki highlighter once and cache it.
let highlighterPromise: Promise<unknown> | null = null;

async function getHighlighter() {
  if (highlighterPromise) return highlighterPromise;
  // @ts-expect-error shiki dynamic import
  const shiki = await import("shiki");
  const hl = await shiki.createHighlighter({
    themes: ["github-dark"],
    langs: ["python", "json", "bash", "typescript", "javascript"],
  });
  highlighterPromise = Promise.resolve(hl);
  return hl;
}

async function highlightCode(code: string, language: string): Promise<string> {
  try {
    const hl = (await getHighlighter()) as {
      codeToHtml: (code: string, opts: { lang: string; theme: string }) => string;
    };
    const lang =
      language === "python" || language === "py"
        ? "python"
        : (language as string);
    return hl.codeToHtml(code, {
      lang: ["python", "json", "bash", "typescript", "javascript"].includes(lang)
        ? lang
        : "python",
      theme: "github-dark",
    });
  } catch {
    return "";
  }
}

interface CodeBlockProps {
  code: string;
  language?: string;
  caption?: string;
  className?: string;
  /** Show the "Run" button (default true). Set false for quiz code-output blocks. */
  showRunInPlayground?: boolean;
}

export function CodeBlock({
  code: originalCode,
  language = "python",
  caption,
  className,
  showRunInPlayground = true,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedCode, setEditedCode] = useState(originalCode);
  const [output, setOutput] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [error, setError] = useState(false);
  const [execMs, setExecMs] = useState<number | null>(null);
  const [needsInput, setNeedsInput] = useState(0);
  const [inputPrompts, setInputPrompts] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const navigate = useAppStore((s) => s.navigate);
  const settings = useAppStore((s) => s.settings);
  const setAPIKeyDialogOpen = useAppStore((s) => s.setAPIKeyDialogOpen);

  const apiKeySet = (() => {
    try {
      const keys = JSON.parse(settings?.apiKeys ?? "{}");
      return Boolean(keys.openrouter);
    } catch {
      return false;
    }
  })();

  const isPython = language === "python" || language === "py";
  const canRunInline = showRunInPlayground && isPython;
  const activeCode = editing ? editedCode : originalCode;
  const isDirty = editing && editedCode !== originalCode;

  // Highlight the original code (read-only view).
  useEffect(() => {
    let active = true;
    (async () => {
      const h = await highlightCode(originalCode, language);
      if (active) setHtml(h);
    })();
    return () => {
      active = false;
    };
  }, [originalCode, language]);

  // Detect input() calls and extract their prompt strings for the UI.
  useEffect(() => {
    let active = true;
    (async () => {
      const { extractInputPrompts } = await import("@/lib/pyodide-runner");
      if (active) {
        const prompts = extractInputPrompts(originalCode);
        const count = prompts.length;
        setNeedsInput(count);
        setInputPrompts(prompts.map((p) => p.prompt));
        setInputValues(count > 0 ? Array(count).fill("") : []);
      }
    })();
    return () => {
      active = false;
    };
  }, [originalCode]);

  // Reset everything when the original code changes (day navigation).
  useEffect(() => {
    setEditedCode(originalCode);
    setEditing(false);
    setOutput("");
    setImages([]);
    setHasRun(false);
    setError(false);
    setExecMs(null);
  }, [originalCode]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const reset = () => {
    setEditedCode(originalCode);
    setEditing(false);
    setOutput("");
    setImages([]);
    setHasRun(false);
    setError(false);
    setExecMs(null);
    if (needsInput > 0) {
      setInputValues(Array(needsInput).fill(""));
    }
    // Re-extract prompts from the active code (in case it was edited)
    if (editing) {
      import("@/lib/pyodide-runner").then(({ extractInputPrompts }) => {
        const prompts = extractInputPrompts(editedCode);
        setNeedsInput(prompts.length);
        setInputPrompts(prompts.map((p) => p.prompt));
        setInputValues(prompts.length > 0 ? Array(prompts.length).fill("") : []);
      });
    }
  };

  const sendToPlayground = () => {
    navigate("playground", { playgroundCode: activeCode });
  };

  const runInline = useCallback(async () => {
    setRunning(true);
    setOutput("");
    setImages([]);
    setError(false);
    const startedAt = performance.now();
    try {
      if (isAICode(activeCode)) {
        // Check if API key is set; if not, trigger the dialog popup.
        if (!apiKeySet) {
          setAPIKeyDialogOpen(true);
          setOutput("OpenRouter API key required. Click the dialog to add your key, then try again.");
          setError(true);
          setHasRun(true);
          return;
        }
        const res = await fetch("/api/playground", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: activeCode }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          output?: string;
          error?: string;
        };
        const ms = Math.round(performance.now() - startedAt);
        if (data.ok) {
          setOutput(data.output ?? "");
          setError(false);
        } else {
          setOutput(`Error: ${data.error ?? "Unknown error"}`);
          setError(true);
        }
        setExecMs(ms);
      } else {
        const { runPythonInline, extractInputPrompts } = await import(
          "@/lib/pyodide-runner"
        );
        // Show "Installing packages..." if the code has imports that may
        // need package installation.
        const hasImports = /^\s*(?:from\s+\S+\s+import|import\s+\S+)/m.test(activeCode);
        if (hasImports) {
          setOutput("Loading packages (if needed)...\n");
        }
        // Recalculate input count from the (possibly edited) code.
        const prompts = extractInputPrompts(activeCode);
        const inputCount = prompts.length;
        const inputs =
          inputCount > 0
            ? inputValues.slice(0, inputCount).map((v) => v || "")
            : [];
        const result = await runPythonInline(activeCode, { inputs, freshGlobals: true });
        setOutput(result.stdout || result.stderr || result.error || (result.images.length > 0 ? "" : "(no output)"));
        setImages(result.images || []);
        setError(Boolean(result.error));
        setExecMs(result.durationMs);
      }
      setHasRun(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setOutput(`Error: ${msg}`);
      setError(true);
      setHasRun(true);
    } finally {
      setRunning(false);
    }
  }, [activeCode, inputValues]);

  return (
    <figure className={cn("my-4", className)}>
      <div className="rounded-lg overflow-hidden border border-slate-700 bg-[#0d1117]">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">
            {language}
            {isDirty && (
              <span className="ml-2 text-amber-400 normal-case">edited</span>
            )}
          </span>
          <div className="flex items-center gap-1">
            {canRunInline && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={running ? undefined : runInline}
                disabled={running || (needsInput > 0 && inputValues.some((v) => !v.trim()))}
                title={
                  needsInput > 0 && inputValues.some((v) => !v.trim())
                    ? "Fill in the input values below first"
                    : "Run this code right here"
                }
              >
                {running ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1 fill-current" />
                    Run
                  </>
                )}
              </Button>
            )}
            {canRunInline && !editing && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setEditing(true)}
                title="Edit the code"
              >
                <Pencil className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            )}
            {canRunInline && editing && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={() => setEditing(false)}
                title="Stop editing (keep changes)"
              >
                <Check className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Done</span>
              </Button>
            )}
            {isDirty && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-amber-400 hover:text-amber-300 hover:bg-slate-700"
                onClick={reset}
                title="Reset to original code"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
              onClick={copy}
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </>
              )}
            </Button>
            {canRunInline && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                onClick={sendToPlayground}
                title="Open in full Playground"
              >
                <Terminal className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Playground</span>
              </Button>
            )}
          </div>
        </div>

        {/* Code area: either highlighted (read-only) or editable textarea */}
        {editing ? (
          <textarea
            value={editedCode}
            onChange={(e) => setEditedCode(e.target.value)}
            spellCheck={false}
            className="w-full p-4 bg-[#0d1117] text-slate-100 text-sm font-mono leading-relaxed border-0 outline-none resize-y min-h-[120px] focus:ring-1 focus:ring-primary/30"
            style={{ tabSize: 4 }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const target = e.currentTarget;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const newVal =
                  editedCode.slice(0, start) + "    " + editedCode.slice(end);
                setEditedCode(newVal);
                requestAnimationFrame(() => {
                  target.selectionStart = target.selectionEnd = start + 4;
                });
              }
            }}
            autoFocus
          />
        ) : html ? (
          <div
            className="shiki-wrapper overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:p-4 [&_code]:!font-mono"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-100">
            <code>{originalCode}</code>
          </pre>
        )}

        {/* Input fields when the code uses input() - shows actual prompt text */}
        {canRunInline && needsInput > 0 && (
          <div className="border-t border-slate-700 bg-slate-800/60 px-3 py-2.5">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <MessageSquareText className="h-3 w-3" />
              This code asks for {needsInput} input{needsInput > 1 ? "s" : ""}. Type {needsInput > 1 ? "them" : "it"} below, then click Run.
            </p>
            <div className="space-y-2">
              {Array.from({ length: needsInput }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 w-5 text-right pt-1.5">
                    {i + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    {inputPrompts[i] && (
                      <p className="text-[10px] text-slate-400 font-mono mb-1 truncate italic">
                        {inputPrompts[i]}
                      </p>
                    )}
                    <input
                      value={inputValues[i] ?? ""}
                      onChange={(e) => {
                        const next = [...inputValues];
                        next[i] = e.target.value;
                        setInputValues(next);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !running) {
                          const allFilled =
                            needsInput === 0 ||
                            inputValues.slice(0, needsInput).every((v) => v.trim());
                          if (allFilled) void runInline();
                        }
                      }}
                      placeholder={inputPrompts[i] ? `Type your answer...` : `Input ${i + 1}`}
                      className="h-8 w-full px-3 text-xs font-mono bg-[#0d1117] border border-slate-600 rounded-md text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inline output panel */}
        {(running || hasRun) && (
          <div className="border-t border-slate-700 bg-[#0d1117]">
            <div className="flex items-center justify-between px-3 py-1 bg-slate-800/50 border-b border-slate-700/50">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide flex items-center gap-1">
                {running ? (
                  <>
                    <Loader2 className="h-2.5 w-2.5 animate-spin" />
                    running
                  </>
                ) : error ? (
                  "error"
                ) : (
                  "output"
                )}
              </span>
              {execMs != null && !running && (
                <span className="text-[10px] font-mono text-slate-500">
                  {execMs}ms
                </span>
              )}
            </div>
            <pre
              className={cn(
                "p-3 text-xs font-mono whitespace-pre text-slate-100 max-h-64 overflow-auto",
                error ? "text-red-400" : "text-slate-100",
              )}
            >
              {output || (running ? "" : images.length > 0 ? "" : "(no output)")}
            </pre>
            {images.length > 0 && (
              <div className="p-3 space-y-2 bg-[#0d1117]">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`data:image/png;base64,${img}`}
                    alt={`Figure ${idx + 1}`}
                    className="max-w-full rounded border border-slate-700"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
