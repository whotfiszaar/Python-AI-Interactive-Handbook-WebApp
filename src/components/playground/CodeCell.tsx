"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Trash2,
  Loader2,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageSquareText,
  ArrowUp,
  ArrowDown,
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
  onRunWithInputs?: (inputs: string[]) => void;
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
  onRunWithInputs,
  onStop,
  onDelete,
  onAddAbove,
  onAddBelow,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: CodeCellProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputCollapsed, setOutputCollapsed] = useState(false);

  // Detect input() calls
  const inputPrompts: { prompt: string }[] = (() => {
    const results: { prompt: string }[] = [];
    const inputRegex = /\binput\s*\(\s*/g;
    let match: RegExpExecArray | null;
    while ((match = inputRegex.exec(cell.code)) !== null) {
      const afterInput = cell.code.slice(match.index + match[0].length);
      let prompt = "";
      if (afterInput[0] === '"' || afterInput[0] === "'") {
        const quote = afterInput[0];
        let end = 1;
        while (end < afterInput.length) {
          if (afterInput[end] === "\\") { end += 2; continue; }
          if (afterInput[end] === quote) break;
          end++;
        }
        if (end < afterInput.length) {
          prompt = afterInput.slice(1, end)
            .replace(/\\n/g, "\n").replace(/\\t/g, "\t")
            .replace(/\\"/g, '"').replace(/\\'/g, "'");
        }
      }
      results.push({ prompt });
    }
    return results;
  })();
  const needsInput = inputPrompts.length;
  const [inputValues, setInputValues] = useState<string[]>([]);

  useEffect(() => {
    if (needsInput > 0 && inputValues.length !== needsInput) {
      Promise.resolve().then(() => setInputValues(Array(needsInput).fill("")));
    }
  }, [needsInput, inputValues.length]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(cell.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const handleRun = () => {
    if (needsInput > 0 && onRunWithInputs) {
      onRunWithInputs(inputValues.slice(0, needsInput).map((v) => v || ""));
    } else {
      onRun();
    }
  };

  return (
    <div
      className="group/cell relative rounded-lg transition-all duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* === Colab-style hover toolbar (top-right floating) === */}
      <div
        className={cn(
          "absolute -top-3 right-2 z-30 flex items-center gap-0.5 px-1.5 py-1 rounded-lg bg-[#2b2b2b] border border-[#3c4043] shadow-lg transition-all duration-200",
          hovered || focused || running
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none",
        )}
      >
        <ColabIcon onClick={canMoveUp ? onMoveUp : undefined} title="Move cell up" disabled={!canMoveUp}>
          <ArrowUp className="h-3.5 w-3.5" />
        </ColabIcon>
        <ColabIcon onClick={canMoveDown ? onMoveDown : undefined} title="Move cell down" disabled={!canMoveDown}>
          <ArrowDown className="h-3.5 w-3.5" />
        </ColabIcon>
        <ColabIcon onClick={copyCode} title="Copy code">
          {copied ? <Check className="h-3.5 w-3.5 text-[#81c995]" /> : <Copy className="h-3.5 w-3.5" />}
        </ColabIcon>
        <ColabIcon onClick={onDelete} title="Delete cell" danger>
          <Trash2 className="h-3.5 w-3.5" />
        </ColabIcon>
      </div>

      {/* === Cell body with left number gutter === */}
      <div className="flex">
        {/* Left gutter: cell number only */}
        <div className="flex flex-col items-center justify-start pt-2.5 px-1 w-7 shrink-0 bg-[#2b2b2b] rounded-l-lg border-r border-[#3c4043]">
          {running ? (
            <Loader2 className="h-3 w-3 animate-spin text-[#8ab4f8]" />
          ) : (
            <span
              className={cn(
                "text-[9px] font-mono tabular-nums leading-none",
                cell.error
                  ? "text-[#f28b82]"
                  : hasRun
                    ? "text-[#81c995]"
                    : "text-[#5f6368]",
              )}
            >
              [{index + 1}]
            </span>
          )}
        </div>

        {/* Main cell content */}
        <div
          className={cn(
            "flex-1 min-w-0 rounded-r-lg border overflow-hidden transition-all duration-150 bg-[#1e1e1e] relative",
            focused
              ? "border-[#1a73e8]/60"
              : cell.error
                ? "border-[#ea4335]/40"
                : "border-[#3c4043] hover:border-[#5f6368]",
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
        {/* Status bar (slim, shows state) */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 h-6 border-b text-[10px] font-mono transition-colors",
            running
              ? "bg-[#1a73e8]/10 border-[#1a73e8]/20 text-[#8ab4f8]"
              : cell.error
                ? "bg-[#ea4335]/10 border-[#ea4335]/20 text-[#f28b82]"
                : hasRun
                  ? "bg-[#81c995]/5 border-[#3c4043] text-[#81c995]"
                  : "bg-[#2b2b2b]/50 border-[#3c4043] text-[#5f6368]",
          )}
        >
          {running ? (
            <span className="flex items-center gap-1">
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
              Running...
            </span>
          ) : cell.error ? (
            <span className="flex items-center gap-1">
              <AlertCircle className="h-2.5 w-2.5" />
              Error
            </span>
          ) : hasRun ? (
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-2.5 w-2.5" />
              {executionMs != null ? `${executionMs}ms` : "Done"}
            </span>
          ) : (
            <span>python</span>
          )}
        </div>

        {/* Editor area + floating run button on right-center edge of CODE ONLY */}
        <div className="relative">
          {/* Run/Stop button - right-center edge of the CODE area only */}
          {running ? (
            <button
              onClick={onStop}
              title="Stop execution"
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 flex items-center justify-center h-8 w-8 rounded-full bg-[#ea4335]/90 backdrop-blur-sm text-white hover:bg-[#ea4335] transition-all shadow-lg border border-[#ea4335]/50"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </button>
          ) : (
            <button
              onClick={handleRun}
              title="Run cell (Ctrl+Enter)"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 right-2 z-20 flex items-center justify-center h-8 w-8 rounded-full backdrop-blur-sm transition-all shadow-lg border",
                hovered || focused
                  ? "opacity-100 scale-100 bg-[#1a73e8] text-white border-[#1a73e8]/50 hover:bg-[#1557b0]"
                  : "opacity-0 scale-75 pointer-events-none bg-[#1a73e8] text-white border-[#1a73e8]/50",
              )}
            >
              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
            </button>
          )}
          <Editor
            height={cell.code.split("\n").length > 8 ? "220px" : "100px"}
            defaultLanguage="python"
            language="python"
            theme="vs-dark"
            value={cell.code}
            onChange={(v) => onChange(v ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: "on",
              lineNumbersMinChars: 3,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              tabSize: 4,
              automaticLayout: true,
              padding: { top: 8, bottom: 8 },
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 8,
              renderLineHighlight: "line",
              fontFamily: "var(--font-geist-mono), monospace",
              scrollbar: { vertical: "auto", horizontal: "hidden" },
            }}
            onMount={(editor, monaco) => {
              editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => handleRun());
              editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
                handleRun();
                if (canMoveDown && onMoveDown) onMoveDown();
              });
              editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.ArrowUp, () => {
                if (canMoveUp && onMoveUp) onMoveUp();
              });
              editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.ArrowDown, () => {
                if (canMoveDown && onMoveDown) onMoveDown();
              });
            }}
          />
        </div>

        {/* Input fields (Colab-style: below code, with prompt labels) */}
        {needsInput > 0 && !running && (
          <div className="border-t border-[#3c4043] bg-[#2b2b2b]/40 px-3 py-2.5">
            <p className="text-[10px] font-mono text-[#9aa0a6] uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <MessageSquareText className="h-3 w-3" />
              {needsInput} input{needsInput > 1 ? "s" : ""} needed. Fill in, then Run (Ctrl+Enter).
            </p>
            <div className="space-y-2">
              {Array.from({ length: needsInput }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-mono text-[#5f6368] shrink-0 w-4 text-right pt-1.5">{i + 1}.</span>
                  <div className="flex-1 min-w-0">
                    {inputPrompts[i]?.prompt && (
                      <p className="text-[10px] text-[#9aa0a6] font-mono mb-1 truncate italic">{inputPrompts[i].prompt}</p>
                    )}
                    <input
                      value={inputValues[i] ?? ""}
                      onChange={(e) => {
                        const next = [...inputValues];
                        next[i] = e.target.value;
                        setInputValues(next);
                      }}
                      onKeyDown={(e) => { if (e.key === "Enter" && !running) handleRun(); }}
                      placeholder={inputPrompts[i]?.prompt ? "Type your answer..." : `Input ${i + 1}`}
                      className="h-8 w-full px-3 text-xs font-mono bg-[#0d1117] border border-[#3c4043] rounded-md text-[#e8eaed] placeholder:text-[#5f6368] focus:outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8]/30 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Output area (Colab-style: directly below code, clean) */}
        {(cell.output || running || (cell.images && cell.images.length > 0)) && (
          <div className="border-t border-[#3c4043] bg-[#0d1117]">
            {/* Output header */}
            <div className="flex items-center justify-between px-3 h-6 border-b border-[#3c4043]">
              <button
                onClick={() => setOutputCollapsed((v) => !v)}
                className="flex items-center gap-1.5 text-[10px] font-mono text-[#5f6368] hover:text-slate-300 transition-colors"
              >
                {outputCollapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                {running ? "running" : cell.error ? "error" : "output"}
              </button>
              {executionMs != null && !running && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-[#5f6368]">
                  <Clock className="h-2.5 w-2.5" />
                  {executionMs}ms
                </span>
              )}
            </div>
            {/* Output content */}
            {!outputCollapsed && (
              <>
                <pre
                  className={cn(
                    "px-4 py-3 text-xs font-mono whitespace-pre text-[#e8eaed] max-h-80 overflow-auto",
                    cell.error && "text-[#f28b82]",
                  )}
                >
                  {cell.output}
                </pre>
                {cell.images && cell.images.length > 0 && (
                  <div className="px-4 pb-3 space-y-2">
                    {cell.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`data:image/png;base64,${img}`}
                        alt={`Figure ${idx + 1}`}
                        className="max-w-full rounded border border-[#3c4043]"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

/** Colab-style toolbar icon button */
function ColabIcon({
  children,
  onClick,
  title,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded text-[#9aa0a6] transition-colors",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : danger
            ? "hover:text-[#f28b82] hover:bg-[#ea4335]/10"
            : "hover:text-[#8ab4f8] hover:bg-[#3c4043]",
      )}
    >
      {children}
    </button>
  );
}
