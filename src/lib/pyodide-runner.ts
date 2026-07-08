/**
 * Module-level Python runner that uses the shared (preloaded) Pyodide instance.
 *
 * This lets components like the lesson CodeBlock run Python inline without
 * using the usePyodide hook (which can only be called inside React components
 * with the proper rules-of-hooks context).
 */

export interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
  durationMs: number;
}

type PyodideInstance = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: {
    stdin?: () => string | null;
    autoEOF?: boolean;
  }) => void;
  loadPackagesFromImports: (code: string) => Promise<void>;
  globals: { set: (k: string, v: unknown) => void };
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInstance>;
    __pyodideInstance?: PyodideInstance;
  }
}

const PYODIDE_VERSION = "0.26.2";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let loadingPromise: Promise<PyodideInstance> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Pyodide script"));
    document.head.appendChild(s);
  });
}

async function getPyodide(): Promise<PyodideInstance> {
  if (typeof window === "undefined") {
    throw new Error("Pyodide can only be used in the browser");
  }
  if (window.__pyodideInstance) return window.__pyodideInstance;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    await loadScript(`${PYODIDE_BASE}pyodide.js`);
    if (!window.loadPyodide) {
      throw new Error("Pyodide loader not available");
    }
    const py = await window.loadPyodide({ indexURL: PYODIDE_BASE });
    window.__pyodideInstance = py;
    return py;
  })();

  return loadingPromise;
}

/**
 * Detect how many `input()` calls are in the code so the UI can prompt
 * the learner for the right number of values before running.
 */
export function countInputCalls(code: string): number {
  // Match `input(` not inside a string literal or comment (best-effort).
  // Strip strings and comments first, then count `input(` occurrences.
  const stripped = code
    .replace(/#[^\n]*/g, "") // strip comments
    .replace(/"""[\s\S]*?"""/g, "") // strip triple-quoted strings
    .replace(/'''[\s\S]*?'''/g, "")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""') // strip single-quoted strings
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");
  const matches = stripped.match(/\binput\s*\(/g);
  return matches ? matches.length : 0;
}

/**
 * Run Python code using the shared Pyodide instance and return stdout/stderr.
 * If `inputs` is provided, they are fed to `input()` calls in order.
 * If `freshGlobals` is true, the code runs in an isolated namespace so it
 * does not pollute (or read from) the shared global scope. This is used by
 * lesson code blocks so they don't interfere with the Playground's state.
 * If Pyodide is not yet loaded, it will be loaded first (the background
 * preloader usually warms it up ahead of time so this is instant).
 */
export async function runPythonInline(
  code: string,
  options: {
    timeoutMs?: number;
    inputs?: string[];
    freshGlobals?: boolean;
  } = {},
): Promise<RunResult> {
  const { timeoutMs = 10000, inputs = [], freshGlobals = false } = options;
  const py = await getPyodide();
  let stdout = "";
  let stderr = "";

  py.setStdout({ batched: (s) => (stdout += s) });
  py.setStderr({ batched: (s) => (stderr += s) });

  // Set up stdin: return each input value followed by a newline, then null.
  let inputIndex = 0;
  py.setStdin({
    stdin: () => {
      if (inputIndex < inputs.length) {
        const val = inputs[inputIndex];
        inputIndex++;
        return val + "\n";
      }
      // No more inputs: return null to signal EOF (prevents infinite loops).
      return null;
    },
    autoEOF: true,
  });

  const start = performance.now();
  try {
    try {
      await py.loadPackagesFromImports(code);
    } catch {
      // ignore package load errors
    }
    // For freshGlobals (lesson code blocks), run in an isolated namespace
    // so lesson runs don't pollute the Playground's shared global scope.
    if (freshGlobals) {
      // Build a fresh globals dict in Python with builtins available, then
      // exec the user code in it. This keeps the Playground's globals clean.
      const escaped = code.replace(/'''/g, "\\'\\'\\'");
      await Promise.race([
        py.runPythonAsync(
          `import builtins as _b\n_ns = {'__builtins__': _b}\n_ns['__name__'] = '__main__'\nexec('''${escaped}''', _ns)`,
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Execution timed out")), timeoutMs),
        ),
      ]);
    } else {
      // Shared global scope (Playground cells share state across runs).
      await Promise.race([
        py.runPythonAsync(code),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Execution timed out")), timeoutMs),
        ),
      ]);
    }
    const durationMs = Math.round(performance.now() - start);
    return { stdout, stderr, error: null, durationMs };
  } catch (e) {
    const durationMs = Math.round(performance.now() - start);
    const msg = e instanceof Error ? e.message : String(e);
    return { stdout, stderr, error: stderr || msg, durationMs };
  }
}

/** Preload Pyodide in the background (fire and forget). */
export function preloadPyodide(): void {
  if (typeof window === "undefined") return;
  if (window.__pyodideInstance || loadingPromise) return;
  void getPyodide().catch((e) => {
    console.warn("Background Pyodide preload failed:", e);
    loadingPromise = null;
  });
}
