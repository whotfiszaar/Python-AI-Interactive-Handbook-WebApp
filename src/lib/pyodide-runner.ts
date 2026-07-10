/**
 * Module-level Python runner that uses the shared (preloaded) Pyodide instance.
 *
 * This lets components like the lesson CodeBlock run Python inline without
 * using the usePyodide hook (which can only be called inside React components
 * with the proper rules-of-hooks context).
 */

import { logInteraction } from "@/lib/utils";

export interface RunResult {
  stdout: string;
  stderr: string;
  error: string | null;
  durationMs: number;
  images: string[]; // base64-encoded PNG images (from matplotlib)
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
  return extractInputPrompts(code).length;
}

/**
 * Extract the prompt strings from each `input("...")` call in the code.
 * Returns an array of { prompt, index } objects. If the input() call has
 * no prompt string, the prompt is empty.
 *
 * Example: input("What is your name? ") -> { prompt: "What is your name? " }
 * Example: input() -> { prompt: "" }
 */
export function extractInputPrompts(code: string): { prompt: string }[] {
  // We need to find input() calls and extract their string argument.
  // This is a best-effort regex that handles:
  // - input("prompt")
  // - input('prompt')
  // - input() with no argument
  // - input(variable) (can't extract, returns empty prompt)
  const results: { prompt: string }[] = [];
  // Match input( followed by an optional string argument
  const inputRegex = /\binput\s*\(\s*/g;
  let match: RegExpExecArray | null;
  while ((match = inputRegex.exec(code)) !== null) {
    const afterInput = code.slice(match.index + match[0].length);
    // Check if the next character is a string quote
    let prompt = "";
    if (afterInput[0] === '"' || afterInput[0] === "'") {
      const quote = afterInput[0];
      // Find the closing quote (handle escaped quotes)
      let end = 1;
      while (end < afterInput.length) {
        if (afterInput[end] === "\\") {
          end += 2;
          continue;
        }
        if (afterInput[end] === quote) break;
        end++;
      }
      if (end < afterInput.length) {
        // Extract the string content and unescape
        prompt = afterInput
          .slice(1, end)
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'");
      }
    }
    results.push({ prompt });
  }
  return results;
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

  py.setStdout({ batched: (s: string) => { stdout += s + "\n"; } });
  py.setStderr({ batched: (s: string) => { stderr += s + "\n"; } });

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
    // Auto-install packages: first try Pyodide's built-in package loader
    // (handles numpy, pandas, matplotlib, etc.), then use micropip for
    // pure-Python packages not bundled with Pyodide.
    try {
      await py.loadPackagesFromImports(code);
    } catch {
      // ignore package load errors
    }

    // Detect imports and try to install any missing packages via micropip.
    // This handles packages like 'requests', 'pyyaml', etc. that are not
    // bundled with Pyodide but are pure Python.
    const importRegex = /^\s*(?:from\s+(\S+)\s+import|import\s+(\S+))/gm;
    const packagesToInstall: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = importRegex.exec(code)) !== null) {
      const pkg = (match[1] || match[2] || "").split(".")[0];
      if (
        pkg &&
        !packagesToInstall.includes(pkg) &&
        !["builtins", "os", "sys", "math", "random", "json", "re",
          "datetime", "time", "io", "collections", "itertools",
          "functools", "pathlib", "typing", "abc", "copy",
          "string", "textwrap", "unicodedata", "struct",
        ].includes(pkg)
      ) {
        packagesToInstall.push(pkg);
      }
    }

    // Try to install missing packages via micropip (pure Python only).
    if (packagesToInstall.length > 0) {
      try {
        await py.runPythonAsync(
          `import micropip\nawait micropip.install(${JSON.stringify(packagesToInstall)})`,
        );
      } catch {
        // Some packages are not installable (C extensions, non-pure-Python).
        // The error will surface naturally when the code runs.
      }
    }
    // For matplotlib: set Agg backend before running so figures are created
    // in non-interactive mode (no GUI needed).
    if (code.includes("matplotlib") || code.includes("pyplot") || code.includes("plt.")) {
      try {
        await py.runPythonAsync(
          `import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as _plt\n_plt.show = lambda *a, **k: None`,
        );
      } catch {
        // ignore
      }
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

    // Capture matplotlib figures as base64 PNG images.
    const images: string[] = [];
    if (code.includes("matplotlib") || code.includes("pyplot") || code.includes("plt.")) {
      try {
        const imgProxy = await py.runPythonAsync(
          `import base64, io\ntry:\n    import matplotlib.pyplot as _plt\n    _imgs = []\n    _nums = _plt.get_fignums()\n    for _fig_num in _nums:\n        _fig = _plt.figure(_fig_num)\n        _buf = io.BytesIO()\n        _fig.savefig(_buf, format='png', dpi=100, bbox_inches='tight')\n        _buf.seek(0)\n        _imgs.append(base64.b64encode(_buf.read()).decode('utf-8'))\n        _plt.close(_fig)\n    _imgs\nexcept Exception as _e:\n    []`,
        );
        // Convert PyProxy to JS array
        let imgData: string[] = [];
        if (imgProxy && typeof imgProxy === "object" && "toJs" in imgProxy) {
          imgData = (imgProxy as { toJs: () => string[] }).toJs();
        } else if (Array.isArray(imgProxy)) {
          imgData = imgProxy as string[];
        }
        if (Array.isArray(imgData) && imgData.length > 0) {
          images.push(...imgData);
        }
      } catch (e) {
        console.warn("Matplotlib image capture failed:", e);
      }
    }

    const result = { stdout, stderr, error: null, durationMs, images };
    void logInteraction("python_run_local", `Ran local Python code using Pyodide`, {
      codeLength: code.length,
      durationMs,
      hasError: false,
    });
    return result;
  } catch (e) {
    const durationMs = Math.round(performance.now() - start);
    const msg = e instanceof Error ? e.message : String(e);
    const errText = stderr || msg;
    void logInteraction("python_run_local", `Ran local Python code using Pyodide`, {
      codeLength: code.length,
      durationMs,
      hasError: true,
      errorText: errText,
    });
    return { stdout, stderr, error: errText, durationMs, images: [] };
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
