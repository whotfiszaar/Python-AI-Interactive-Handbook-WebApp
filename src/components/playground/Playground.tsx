"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePyodide } from "@/hooks/usePyodide";
import { useNotebooks } from "@/hooks/useNotebook";
import { useAppStore } from "@/lib/store";
import { CodeCell } from "./CodeCell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Play,
  Eraser,
  Save,
  FileText,
  Trash2,
  Loader2,
  FlaskConical,
  Code2,
  KeyRound,
  X,
} from "lucide-react";
import type { NotebookCell } from "@/types";
import { genId, isAICode, cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Mode = "python" | "ai";

const DEFAULT_CODE = `# Welcome to the Playground, Aarav!
# Press Run to execute Python right in your browser.

name = "Aarav"
age = 13
print(f"Hello, {name}! You are {age} years old.")

favorite_cars = ["McLaren", "Ferrari", "Bugatti"]
for car in favorite_cars:
    print(f"- {car}")
`;

export function Playground() {
  const pyodide = usePyodide();
  const { notebooks, loading: nbLoading, create, update, remove } = useNotebooks();
  const settings = useAppStore((s) => s.settings);
  const playgroundCode = useAppStore((s) => s.playgroundCode);
  const navigate = useAppStore((s) => s.navigate);

  const [cells, setCells] = useState<NotebookCell[]>([
    { id: genId(), code: DEFAULT_CODE, output: "", running: false, error: false, hasRun: false, executionMs: null },
  ]);
  const [mode, setMode] = useState<Mode>("python");
  const [runningCellId, setRunningCellId] = useState<string | null>(null);
  const [currentNotebookId, setCurrentNotebookId] = useState<number | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const stopRef = useRef(false);

  // Load code from lesson "Run in playground" action
  useEffect(() => {
    if (playgroundCode) {
      setCells([
        {
          id: genId(),
          code: playgroundCode,
          output: "",
          running: false,
          error: false,
          hasRun: false,
          executionMs: null,
        },
      ]);
      // clear the pending code so it doesn't reload on re-render
      useAppStore.setState({ playgroundCode: null });
      toast.success("Code loaded from lesson");
    }
  }, [playgroundCode]);

  const apiKeySet = (() => {
    try {
      const keys = JSON.parse(settings?.apiKeys ?? "{}");
      return Boolean(keys.openrouter);
    } catch {
      return false;
    }
  })();

  const updateCell = (id: string, code: string) =>
    setCells((prev) => prev.map((c) => (c.id === id ? { ...c, code } : c)));

  const setCellOutput = (
    id: string,
    output: string,
    error: boolean,
    executionMs: number | null = null,
  ) =>
    setCells((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, output, error, running: false, hasRun: true, executionMs }
          : c,
      ),
    );

  const addCell = () =>
    setCells((prev) => [
      ...prev,
      { id: genId(), code: "", output: "", running: false, error: false, hasRun: false, executionMs: null },
    ]);

  const addCellBelow = (id: string) => {
    const newCell: NotebookCell = {
      id: genId(),
      code: "",
      output: "",
      running: false,
      error: false,
      hasRun: false,
      executionMs: null,
    };
    setCells((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx < 0) return [...prev, newCell];
      const next = [...prev];
      next.splice(idx + 1, 0, newCell);
      return next;
    });
  };

  const addCellAbove = (id: string) => {
    const newCell: NotebookCell = {
      id: genId(),
      code: "",
      output: "",
      running: false,
      error: false,
      hasRun: false,
      executionMs: null,
    };
    setCells((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx < 0) return [newCell, ...prev];
      const next = [...prev];
      next.splice(idx, 0, newCell);
      return next;
    });
  };

  const moveCell = (id: string, dir: -1 | 1) =>
    setCells((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });

  const deleteCell = (id: string) =>
    setCells((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));

  const clearOutputs = () =>
    setCells((prev) =>
      prev.map((c) => ({
        ...c,
        output: "",
        error: false,
        hasRun: false,
        executionMs: null,
      })),
    );

  const runCell = useCallback(
    async (cell: NotebookCell) => {
      if (!cell.code.trim()) return;
      stopRef.current = false;
      setRunningCellId(cell.id);
      const startedAt = performance.now();
      setCells((prev) =>
        prev.map((c) =>
          c.id === cell.id ? { ...c, running: true, output: "" } : c,
        ),
      );

      const useAIMode = mode === "ai" && isAICode(cell.code);

      try {
        if (useAIMode) {
          const res = await fetch("/api/playground", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: cell.code }),
          });
          const data = (await res.json()) as {
            ok?: boolean;
            output?: string;
            error?: string;
          };
          const ms = Math.round(performance.now() - startedAt);
          if (data.ok) {
            setCellOutput(cell.id, data.output ?? "", false, ms);
          } else {
            setCellOutput(
              cell.id,
              `Error: ${data.error ?? "Unknown error"}`,
              true,
              ms,
            );
          }
        } else {
          const result = await pyodide.run(cell.code, { timeoutMs: 10000 });
          let out = result.stdout;
          if (result.stderr) {
            out += (out ? "\n" : "") + result.stderr;
          }
          if (result.error && !out) {
            out = result.error;
          }
          setCellOutput(cell.id, out, Boolean(result.error), result.durationMs);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const ms = Math.round(performance.now() - startedAt);
        setCellOutput(cell.id, `Error: ${msg}`, true, ms);
      } finally {
        setRunningCellId(null);
        stopRef.current = false;
      }
    },
    [mode, pyodide],
  );

  const stopCell = () => {
    stopRef.current = true;
    setRunningCellId(null);
    setCells((prev) => prev.map((c) => ({ ...c, running: false })));
    toast.info("Execution interrupted");
  };

  const runAll = async () => {
    for (const cell of cells) {
      if (stopRef.current) break;
      await runCell(cell);
    }
  };

  const openSaveDialog = () => {
    setNotebookName(
      currentNotebookId
        ? notebooks.find((n) => n.id === currentNotebookId)?.name ?? ""
        : "",
    );
    setSaveDialogOpen(true);
  };

  const handleSave = async () => {
    const name = notebookName.trim() || `Notebook ${new Date().toLocaleDateString()}`;
    const payload = cells.map((c) => ({ code: c.code }));
    if (currentNotebookId) {
      const row = await update(currentNotebookId, { name, cells: payload });
      if (row) toast.success("Notebook saved");
    } else {
      const row = await create({ name, cells: payload });
      if (row) {
        setCurrentNotebookId(row.id);
        toast.success("Notebook created");
      }
    }
    setSaveDialogOpen(false);
  };

  const handleSaveAsNew = async () => {
    const name =
      notebookName.trim() ||
      `Notebook ${new Date().toLocaleDateString()} (copy)`;
    const payload = cells.map((c) => ({ code: c.code }));
    // Always create a brand new notebook, regardless of currentNotebookId.
    const row = await create({ name, cells: payload });
    if (row) {
      setCurrentNotebookId(row.id);
      toast.success(`Saved as new notebook: ${name}`);
    }
    setSaveDialogOpen(false);
  };

  const loadNotebook = async (id: number) => {
    const nb = notebooks.find((n) => n.id === id);
    if (!nb) return;
    try {
      const parsed = JSON.parse(nb.cells) as { code: string }[];
      const makeCell = (code: string): NotebookCell => ({
        id: genId(),
        code,
        output: "",
        running: false,
        error: false,
        hasRun: false,
        executionMs: null,
      });
      setCells(
        parsed.length > 0
          ? parsed.map((c) => makeCell(c.code))
          : [makeCell("")],
      );
      setCurrentNotebookId(nb.id);
      toast.success(`Loaded "${nb.name}"`);
    } catch {
      toast.error("Could not load notebook");
    }
  };

  const handleDeleteNotebook = async (id: number) => {
    const ok = await remove(id);
    if (ok && currentNotebookId === id) {
      setCurrentNotebookId(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 border-b border-border bg-card">
        <Button size="sm" className="h-8 gap-1" onClick={addCell}>
          <Plus className="h-4 w-4" />
          New Cell
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 gap-1"
          onClick={runAll}
          disabled={runningCellId !== null || pyodide.running}
        >
          {pyodide.running ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
          Run All
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-1"
          onClick={clearOutputs}
        >
          <Eraser className="h-3.5 w-3.5" />
          Clear
        </Button>
        <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={openSaveDialog}>
          <Save className="h-3.5 w-3.5" />
          Save
        </Button>

        {/* Notebooks panel toggle */}
        <Button
          size="sm"
          variant={panelOpen ? "secondary" : "ghost"}
          className="h-8 gap-1"
          onClick={() => setPanelOpen((v) => !v)}
          title="View saved notebooks"
        >
          <FileText className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Notebooks</span>
          {notebooks.length > 0 && (
            <Badge variant="outline" className="ml-1 h-4 px-1 text-[9px]">
              {notebooks.length}
            </Badge>
          )}
        </Button>

        <div className="flex-1" />

        {/* Mode toggle */}
        <div className="flex items-center rounded-lg border border-border overflow-hidden">
          <button
            onClick={() => setMode("python")}
            className={cn(
              "flex items-center gap-1 px-3 h-8 text-xs font-medium transition-colors",
              mode === "python"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Python Only
          </button>
          <button
            onClick={() => setMode("ai")}
            className={cn(
              "flex items-center gap-1 px-3 h-8 text-xs font-medium transition-colors border-l border-border",
              mode === "ai"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            <FlaskConical className="h-3.5 w-3.5" />
            Python + AI
          </button>
        </div>

        {/* API key indicator */}
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-1.5"
          onClick={() => navigate("settings")}
          title={apiKeySet ? "API key is set" : "No API key set, click to add one"}
        >
          <KeyRound
            className={cn("h-3.5 w-3.5", apiKeySet ? "text-emerald-500" : "text-red-500")}
          />
          <span className={cn("text-xs", apiKeySet ? "text-emerald-600" : "text-red-500")}>
            {apiKeySet ? "Key set" : "No key"}
          </span>
        </Button>
      </div>

      {/* Pyodide loading banner */}
      {pyodide.status === "loading" && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border-b border-blue-200 dark:border-blue-900 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
            <span className="text-blue-700 dark:text-blue-400 font-medium">
              {pyodide.loadLabel || "Loading Python runtime..."}
            </span>
          </div>
          <div className="h-1 w-full bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${pyodide.loadPct}%` }}
            />
          </div>
        </div>
      )}
      {pyodide.status === "error" && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400">
          Failed to load Python runtime. You can still run AI cells in Python + AI mode.
        </div>
      )}
      {mode === "ai" && !apiKeySet && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900 text-xs text-amber-700 dark:text-amber-400">
          AI mode is on but no OpenRouter API key is set.{" "}
          <button onClick={() => navigate("settings")} className="underline font-medium">
            Add your key in Settings
          </button>
          .
        </div>
      )}

      {/* Main area: cells + optional notebooks side panel */}
      <div className="flex-1 flex min-h-0">
        {/* Cells - marimo style with left gutter for cell numbers */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-2">
          {cells.map((cell, i) => (
            <CodeCell
              key={cell.id}
              cell={cell}
              index={i}
              running={runningCellId === cell.id}
              executionMs={cell.executionMs}
              hasRun={cell.hasRun}
              onChange={(code) => updateCell(cell.id, code)}
              onRun={() => runCell(cell)}
              onStop={stopCell}
              onDelete={() => deleteCell(cell.id)}
              onAddAbove={() => addCellAbove(cell.id)}
              onAddBelow={() => addCellBelow(cell.id)}
              onMoveUp={() => moveCell(cell.id, -1)}
              onMoveDown={() => moveCell(cell.id, 1)}
              canMoveUp={i > 0}
              canMoveDown={i < cells.length - 1}
            />
          ))}
        </div>

        {/* Notebooks side panel (slide-in from right) */}
        {panelOpen && (
          <div className="w-64 shrink-0 border-l border-border bg-card flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <p className="text-xs font-semibold flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                Notebooks
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setPanelOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {nbLoading ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Loading...
                </p>
              ) : notebooks.length === 0 ? (
                <div className="text-center py-8 px-2">
                  <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    No saved notebooks yet. Click Save to create one.
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {notebooks.map((nb) => (
                    <li
                      key={nb.id}
                      className={cn(
                        "group relative rounded-md border border-transparent hover:border-border transition-colors",
                        currentNotebookId === nb.id && "border-primary/40 bg-primary/5",
                      )}
                    >
                      <button
                        onClick={() => loadNotebook(nb.id)}
                        className="w-full text-left p-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span
                            className={cn(
                              "flex-1 truncate text-xs",
                              currentNotebookId === nb.id
                                ? "font-medium text-primary"
                                : "",
                            )}
                          >
                            {nb.name}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 ml-5">
                          {new Date(nb.updatedAt).toLocaleDateString()}{" "}
                          {new Date(nb.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </button>
                      <button
                        onClick={() => handleDeleteNotebook(nb.id)}
                        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity p-1"
                        title="Delete notebook"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-2 border-t border-border">
              <Button
                size="sm"
                variant="outline"
                className="w-full h-7 text-xs gap-1"
                onClick={() => {
                  setCurrentNotebookId(null);
                  setCells([
                    {
                      id: genId(),
                      code: "",
                      output: "",
                      running: false,
                      error: false,
                      hasRun: false,
                      executionMs: null,
                    },
                  ]);
                }}
              >
                <Plus className="h-3 w-3" />
                New blank notebook
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-card text-[10px] text-muted-foreground font-mono">
        <span>
          Pyodide:{" "}
          {pyodide.status === "ready"
            ? "ready"
            : pyodide.status === "loading"
              ? "loading"
              : pyodide.status === "error"
                ? "error"
                : "idle"}
        </span>
        <span>Cells: {cells.length}</span>
        <span>Mode: {mode === "python" ? "Python Only" : "Python + AI"}</span>
      </div>

      {/* Save dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentNotebookId ? "Save notebook" : "Save new notebook"}
            </DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Notebook name"
            value={notebookName}
            onChange={(e) => setNotebookName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={handleSaveAsNew}>
              Save as new
            </Button>
            <Button onClick={handleSave}>
              {currentNotebookId ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
