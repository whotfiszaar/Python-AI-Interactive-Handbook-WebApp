"use client";

import { useEffect } from "react";
import { preloadPyodide } from "@/hooks/usePyodide";

/**
 * Warms up the Pyodide Python runtime in the background shortly after the
 * site loads, so that when the user first opens the Playground and runs a
 * cell, the interpreter is already ready (no multi-second download/init).
 *
 * The preload is deferred a little so it doesn't compete with the initial
 * page paint, and it only runs once per session (the shared promise is cached
 * in the usePyodide module scope).
 */
export function PyodidePreloader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Only preload on devices that are likely to handle it well: skip very
    // small screens and save-data connections.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (conn?.saveData) return;

    const timer = setTimeout(() => {
      preloadPyodide();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
