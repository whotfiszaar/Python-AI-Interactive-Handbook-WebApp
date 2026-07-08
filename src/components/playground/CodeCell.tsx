"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Square,
  Trash2,
  Loader2,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NotebookCell } from "@/types";

interface CodeCellProps {
  cell: NotebookCell;
  index: number;
  running: boolean;
  executionMs?: number | null;
  hasRun: boolean;
  onChange: (code: string) => void;
  onRun: () => void;
  onStop: () => void;
  onDelete: () => void;
  onAddAbove: () => void;
  onAddBelow: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export function CodeCell({
  cell,
  index,
  running,
  executionMs,
  hasRun,
  onChange,
  onRun,
  onStop,
  onDelete,
  onAddAbove,
  onAddBelow,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: CodeCellProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputCollapsed, setOutputCollapsed] = useState(false);

  const showControls = focused || hovered || running;

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(cell.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="group/cell relative pl-8 sm:pl-10">
      {/* Left-edge add cell buttons (hover-revealed, stacked with spacing) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover/cell:opacity-100 transition-opacity z-10">
        <button
          onClick={onAddAbove}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
          title="Add cell above"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={onAddBelow}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
          title="Add cell below"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cell number gutter (marimo-style left margin) */}
      <div className="absolute left-1 top-2 hidden sm:flex flex-col items-center gap-1 opacity-0 group-hover/cell:opacity-0">
        <span
          className={cn(
            "text-[11px] font-mono tabular-nums transition-colors",
            running
              ? "text-blue-500"
              : cell.error
                ? "text-red-500"
                : hasRun
                  ? "text-emerald-500"
                  : "text-muted-foreground/50",
          )}
        >
          [{index + 1}]
        </span>
      </div>

      {/* Cell body */}
      <div
        className={cn(
          "rounded-lg border transition-all duration-150 overflow-hidden",
          focused
            ? "border-primary/60 shadow-sm ring-1 ring-primary/10"
            : cell.error
              ? "border-red-200 dark:border-red-900/60"
              : "border-border hover:border-border/80",
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Cell toolbar - marimo style: minimal, controls on the right */}
        <div
          className={cn(
            "flex items-center justify-between px-2 h-8 border-b transition-opacity",
            showControls ? "opacity-100" : "opacity-0",
            "bg-muted/30",
          )}
        >
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            {running ? (
              <span className="flex items-center gap-1 text-blue-500 font-medium">
                <Loader2 className="h-3 w-3 animate-spin" />
                running
              </span>
            ) : hasRun ? (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                {executionMs != null ? (
                  <span className="tabular-nums">{executionMs}ms</span>
                ) : (
                  "done"
                )}
              </span>
            ) : cell.error ? (
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <AlertCircle className="h-3 w-3" />
                error
              </span>
            ) : (
              <span className="font-mono">python</span>
            )}
          </div>

          <div className="flex items-center gap-0.5">
            {canMoveUp && (
              <IconButton onClick={onMoveUp} title="Move cell up">
                <ChevronUp className="h-3.5 w-3.5" />
              </IconButton>
            )}
            {canMoveDown && (
              <IconButton onClick={onMoveDown} title="Move cell down">
                <ChevronDown className="h-3.5 w-3.5" />
              </IconButton>
            )}
            <IconButton onClick={copyCode} title="Copy code">
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </IconButton>
            <IconButton
              onClick={onDelete}
              title="Delete cell"
              className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </IconButton>
            <div className="w-px h-4 bg-border mx-1" />
            {running ? (
              <button
                onClick={onStop}
                className="flex items-center gap-1 h-6 px-2 rounded text-[11px] font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <Square className="h-2.5 w-2.5 fill-current" />
                Stop
              </button>
            ) : (
              <button
                onClick={onRun}
                className="flex items-center gap-1 h-6 px-2 rounded text-[11px] font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Play className="h-2.5 w-2.5 fill-current" />
                Run
              </button>
            )}
          </div>
        </div>

        {/* Editor area */}
        <div
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="min-h-[60px]"
        >
          <Editor
            height={cell.code.split("\n").length > 8 ? "220px" : "120px"}
            defaultLanguage="python"
            language="python"
            theme="vs-dark"
            value={cell.code}
            onChange={(v) => onChange(v ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "off",
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 4,
              automaticLayout: true,
              padding: { top: 8, bottom: 8 },
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 8,
              lineNumbersMinChars: 0,
              renderLineHighlight: "none",
              fontFamily: "var(--font-geist-mono), monospace",
              scrollbar: { vertical: "auto", horizontal: "hidden" },
            }}
          />
        </div>

        {/* Output area - marimo style: clean, inline, collapsible */}
        {(cell.output || running) && (
          <div className="border-t border-border bg-[#0d1117]">
            <button
              onClick={() => setOutputCollapsed((v) => !v)}
              className="w-full flex items-center gap-2 px-3 h-7 text-[10px] font-mono text-slate-500 uppercase tracking-wide hover:bg-slate-800/50 transition-colors"
            >
              {outputCollapsed ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronUp className="h-3 w-3" />
              )}
              {running ? "running" : cell.error ? "error" : "output"}
              {executionMs != null && !running && (
                <span className="ml-auto flex items-center gap-1 normal-case tracking-normal text-slate-600">
                  <Clock className="h-2.5 w-2.5" />
                  {executionMs}ms
                </span>
              )}
            </button>
            {!outputCollapsed && (
              <pre
                className={cn(
                  "px-3 pb-3 pt-1 text-xs font-mono whitespace-pre-wrap break-words text-slate-100 max-h-80 overflow-y-auto",
                  cell.error && "text-red-400",
                )}
              >
                {cell.output}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  title,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
        className,
      )}
    >
      {children}
    </button>
  );
}
