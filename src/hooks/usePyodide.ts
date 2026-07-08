"use client";

import { useCallback, useRef, useState } from "react";
import {
  runPythonInline,
  preloadPyodide,
  type RunResult,
} from "@/lib/pyodide-runner";

// Re-export for backward compatibility.
export type { RunResult };
export { preloadPyodide };

/** Read the current global Pyodide load status without subscribing to it. */
export function getPyodideStatus(): "idle" | "loading" | "ready" | "error" {
  if (typeof window === "undefined") return "idle";
  if (window.__pyodideInstance) return "ready";
  // We can't read the runner's private loadingPromise, so infer from the
  // presence of the pyodide script tag.
  if (document.querySelector('script[src*="pyodide"]')) return "loading";
  return "idle";
}

export function usePyodide() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [loadPct, setLoadPct] = useState(0);
  const [loadLabel, setLoadLabel] = useState("");
  const [running, setRunning] = useState(false);
  const errorRef = useRef<string | null>(null);

  const ensure = useCallback(async () => {
    if (typeof window !== "undefined" && window.__pyodideInstance) {
      setStatus("ready");
      return window.__pyodideInstance;
    }
    setStatus("loading");
    setLoadLabel("Loading Python runtime...");
    try {
      // Trigger the load via the runner (shares the global instance).
      await runPythonInline("1"); // trivial eval to force load
      setStatus("ready");
      return window.__pyodideInstance;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errorRef.current = msg;
      setStatus("error");
      throw e;
    }
  }, []);

  const run = useCallback(
    async (
      code: string,
      options?: { timeoutMs?: number; inputs?: string[] },
    ): Promise<RunResult> => {
      setRunning(true);
      try {
        const result = await runPythonInline(code, options ?? {});
        if (status !== "ready") setStatus("ready");
        return result;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        errorRef.current = msg;
        setStatus("error");
        throw e;
      } finally {
        setRunning(false);
      }
    },
    [status],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setLoadPct(0);
  }, []);

  return { status, loadPct, loadLabel, running, ensure, run, reset };
}
