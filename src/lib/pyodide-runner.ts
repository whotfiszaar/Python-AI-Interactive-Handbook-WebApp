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

    // Inject fallback Python stubs for local-only libraries (mcp, langfuse, langchain_mcp_adapters, openai)
    try {
      await py.runPythonAsync(`
import sys, types

if 'mcp' not in sys.modules:
    mcp = types.ModuleType('mcp')
    server = types.ModuleType('mcp.server')
    fastmcp = types.ModuleType('mcp.server.fastmcp')

    class FastMCP:
        def __init__(self, name="aarav-tools", *args, **kwargs):
            self.name = name
            self._tools = {}
        def tool(self, *args, **kwargs):
            def decorator(fn):
                self._tools[fn.__name__] = fn
                return fn
            return decorator
        def run(self):
            print(f"Starting MCP server '{self.name}' with {len(self._tools)} tools...")
            for t in self._tools:
                print(f"  - {t}")
            print(f"[MCP Server '{self.name}'] Simulated server running successfully.")

    fastmcp.FastMCP = FastMCP
    server.fastmcp = fastmcp
    mcp.server = server
    sys.modules['mcp'] = mcp
    sys.modules['mcp.server'] = server
    sys.modules['mcp.server.fastmcp'] = fastmcp

if 'langfuse' not in sys.modules:
    langfuse = types.ModuleType('langfuse')
    callback = types.ModuleType('langfuse.callback')

    class Langfuse:
        def __init__(self, *args, **kwargs): pass
        def trace(self, name="trace", **k): return MockTrace(name)
        def flush(self): print("[Langfuse] Traces sent to Langfuse! Open your dashboard to see it.")

    class CallbackHandler:
        def __init__(self, *args, **kwargs): pass
        def flush(self): print("[Langfuse Callback] Traces sent to Langfuse! Open your dashboard to see it.")

    class MockTrace:
        def __init__(self, name="trace"): self.name = name
        def span(self, name="span", **k): return MockSpan(name)
        def generation(self, **k): return MockSpan("generation")
        def end(self): pass

    class MockSpan:
        def __init__(self, name="span"): self.name = name
        def generation(self, **k): return MockSpan("generation")
        def end(self): pass

    langfuse.Langfuse = Langfuse
    callback.CallbackHandler = CallbackHandler
    langfuse.callback = callback
    sys.modules['langfuse'] = langfuse
    sys.modules['langfuse.callback'] = callback

if 'langchain_mcp_adapters' not in sys.modules:
    adapters = types.ModuleType('langchain_mcp_adapters')
    client_mod = types.ModuleType('langchain_mcp_adapters.client')

    class MultiServerMCPClient:
        def __init__(self, servers=None): self.servers = servers or {}
        async def load_tools(self):
            class MockTool:
                def __init__(self, name, desc):
                    self.name = name
                    self.description = desc
            return [
                MockTool("get_weather", "Get current weather for a city"),
                MockTool("calculator", "Do basic math: add, subtract, multiply, divide"),
                MockTool("get_time", "Get current date and time")
            ]

    client_mod.MultiServerMCPClient = MultiServerMCPClient
    adapters.client = client_mod
    sys.modules['langchain_mcp_adapters'] = adapters
    sys.modules['langchain_mcp_adapters.client'] = client_mod

if 'openai' not in sys.modules:
    openai = types.ModuleType('openai')

    class OpenAI:
        def __init__(self, api_key=None, base_url=None, *args, **kwargs):
            self.api_key = api_key
            self.chat = MockChat()

    class MockChat:
        def __init__(self):
            self.completions = MockCompletions()

    class MockCompletions:
        def create(self, model="default", messages=None, **kwargs):
            class Msg:
                def __init__(self, content): self.content = content
            class Choice:
                def __init__(self, content): self.message = Msg(content)
            class Response:
                def __init__(self, content):
                    self.choices = [Choice(content)]
                    self.usage = None
            last_prompt = ""
            if messages:
                last_prompt = messages[-1].get("content", "")
            return Response(f"Hello! Simulation reply for: '{last_prompt}'")

    openai.OpenAI = OpenAI
    sys.modules['openai'] = openai
`);
    } catch (e) {
      console.warn("Could not register Python WASM stubs:", e);
    }

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
    // Package import/name mapping for common PyPI packages
    const PKG_MAP: Record<string, string> = {
      pil: "pillow",
      pillow: "pillow",
      bs4: "beautifulsoup4",
      beautifulsoup: "beautifulsoup4",
      sklearn: "scikit-learn",
      cv2: "opencv-python",
      yaml: "pyyaml",
      pyyaml: "pyyaml",
      fitz: "pymupdf",
      crypto: "pycryptodome",
      dateutil: "python-dateutil",
    };

    const packagesToInstall: string[] = [];

    // 1. Detect explicit pip install / !pip install / %pip install lines in code
    const lines = code.split("\n");
    const cleanedLines: string[] = [];
    const pipRegex = /^\s*!?%?\s*pip\s+install\s+(.+)$/i;

    for (const line of lines) {
      const match = pipRegex.exec(line);
      if (match) {
        // Extract package names (ignoring flags like --quiet, -U, etc.)
        const args = match[1].trim().split(/\s+/);
        for (const arg of args) {
          if (!arg.startsWith("-")) {
            const cleanPkg = arg.split("==")[0].split(">=")[0].split("<=")[0].trim();
            const mapped = PKG_MAP[cleanPkg.toLowerCase()] || cleanPkg;
            if (cleanPkg && !packagesToInstall.includes(mapped)) {
              packagesToInstall.push(mapped);
            }
          }
        }
        // Comment out pip install line so Python execution doesn't crash on invalid syntax
        cleanedLines.push(`# ${line.trim()}`);
      } else {
        cleanedLines.push(line);
      }
    }

    const executableCode = cleanedLines.join("\n");

    // 2. Detect imported packages from executable code
    const importRegex = /^\s*(?:from\s+(\S+)\s+import|import\s+(\S+))/gm;
    let importMatch: RegExpExecArray | null;
    const BUILTIN_MODULES = [
      "builtins", "os", "sys", "math", "random", "json", "re",
      "datetime", "time", "io", "collections", "itertools",
      "functools", "pathlib", "typing", "abc", "copy",
      "string", "textwrap", "unicodedata", "struct", "micropip",
      "asyncio", "hashlib", "base64", "urllib", "zlib", "gzip",
      "csv", "unittest", "logging", "threading", "multiprocessing",
      "mcp", "langfuse", "langchain_mcp_adapters", "langchain", "openai",
    ];

    while ((importMatch = importRegex.exec(executableCode)) !== null) {
      const rawPkg = (importMatch[1] || importMatch[2] || "").split(".")[0];
      if (rawPkg && !BUILTIN_MODULES.includes(rawPkg)) {
        const mapped = PKG_MAP[rawPkg.toLowerCase()] || rawPkg;
        if (!packagesToInstall.includes(mapped)) {
          packagesToInstall.push(mapped);
        }
      }
    }

    // First try Pyodide built-in package loader
    try {
      await py.loadPackagesFromImports(executableCode);
    } catch {
      // ignore
    }

    // Always ensure micropip is loaded in Pyodide before attempting micropip installs
    let micropipReady = false;
    if (packagesToInstall.length > 0 || executableCode.includes("micropip")) {
      try {
        if ("loadPackage" in py && typeof (py as unknown as { loadPackage: (p: string) => Promise<void> }).loadPackage === "function") {
          await (py as unknown as { loadPackage: (p: string) => Promise<void> }).loadPackage("micropip");
          micropipReady = true;
        }
      } catch {
        // ignore if already present or failed
      }
    }

    // Install missing packages via loadPackage (native Pyodide WASM) or micropip
    for (const pkg of packagesToInstall) {
      let installed = false;
      if ("loadPackage" in py && typeof (py as unknown as { loadPackage: (p: string) => Promise<void> }).loadPackage === "function") {
        try {
          await (py as unknown as { loadPackage: (p: string) => Promise<void> }).loadPackage(pkg);
          installed = true;
        } catch {
          installed = false;
        }
      }
      if (!installed && micropipReady) {
        try {
          await py.runPythonAsync(
            `import micropip\nawait micropip.install("${pkg}")`,
          );
        } catch (err) {
          console.warn(`Could not install package ${pkg} via micropip:`, err);
        }
      }
    }

    // Substitute original code variable reference with processed executableCode
    code = executableCode;

    // Prepend WASM fallback stubs if code imports local-only libraries (mcp, langfuse, langchain, openai)
    if (
      code.includes("mcp") ||
      code.includes("langfuse") ||
      code.includes("langchain") ||
      code.includes("openai")
    ) {
      const STUB_HEADER = `import sys, types
if 'mcp' not in sys.modules or 'mcp.server' not in sys.modules:
    mcp = types.ModuleType('mcp')
    server = types.ModuleType('mcp.server')
    fastmcp = types.ModuleType('mcp.server.fastmcp')

    class FastMCP:
        def __init__(self, name="aarav-tools", *args, **kwargs):
            self.name = name
            self._tools = {}
        def tool(self, *args, **kwargs):
            def decorator(fn):
                self._tools[fn.__name__] = fn
                return fn
            return decorator
        def run(self):
            print(f"Starting MCP server '{self.name}' with {len(self._tools)} tools...")
            for t in self._tools:
                print(f"  - {t}")
            print(f"[MCP Server '{self.name}'] Simulated server running successfully.")

    fastmcp.FastMCP = FastMCP
    server.fastmcp = fastmcp
    mcp.server = server
    sys.modules['mcp'] = mcp
    sys.modules['mcp.server'] = server
    sys.modules['mcp.server.fastmcp'] = fastmcp

if 'langfuse' not in sys.modules:
    langfuse = types.ModuleType('langfuse')
    callback = types.ModuleType('langfuse.callback')

    class Langfuse:
        def __init__(self, *args, **kwargs): pass
        def trace(self, name="trace", **k): return MockTrace(name)
        def flush(self): print("[Langfuse] Traces sent to Langfuse! Open your dashboard to see it.")

    class CallbackHandler:
        def __init__(self, *args, **kwargs): pass
        def flush(self): print("[Langfuse Callback] Traces sent to Langfuse! Open your dashboard to see it.")

    class MockTrace:
        def __init__(self, name="trace"): self.name = name
        def span(self, name="span", **k): return MockSpan(name)
        def generation(self, **k): return MockSpan("generation")
        def end(self): pass

    class MockSpan:
        def __init__(self, name="span"): self.name = name
        def generation(self, **k): return MockSpan("generation")
        def end(self): pass

    langfuse.Langfuse = Langfuse
    callback.CallbackHandler = CallbackHandler
    langfuse.callback = callback
    sys.modules['langfuse'] = langfuse
    sys.modules['langfuse.callback'] = callback

if 'langchain_mcp_adapters' not in sys.modules:
    adapters = types.ModuleType('langchain_mcp_adapters')
    client_mod = types.ModuleType('langchain_mcp_adapters.client')

    class MultiServerMCPClient:
        def __init__(self, servers=None): self.servers = servers or {}
        async def load_tools(self):
            class MockTool:
                def __init__(self, name, desc):
                    self.name = name
                    self.description = desc
            return [
                MockTool("get_weather", "Get current weather for a city"),
                MockTool("calculator", "Do basic math: add, subtract, multiply, divide"),
                MockTool("get_time", "Get current date and time")
            ]

    client_mod.MultiServerMCPClient = MultiServerMCPClient
    adapters.client = client_mod
    sys.modules['langchain_mcp_adapters'] = adapters
    sys.modules['langchain_mcp_adapters.client'] = client_mod

if 'openai' not in sys.modules:
    openai = types.ModuleType('openai')

    class OpenAI:
        def __init__(self, api_key=None, base_url=None, *args, **kwargs):
            self.api_key = api_key
            self.chat = MockChat()

    class MockChat:
        def __init__(self):
            self.completions = MockCompletions()

    class MockCompletions:
        def create(self, model="default", messages=None, **kwargs):
            class Msg:
                def __init__(self, content): self.content = content
            class Choice:
                def __init__(self, content): self.message = Msg(content)
            class Response:
                def __init__(self, content):
                    self.choices = [Choice(content)]
                    self.usage = None
            last_prompt = ""
            if messages:
                last_prompt = messages[-1].get("content", "")
            return Response(f"Hello! Simulation reply for: '{last_prompt}'")

    openai.OpenAI = OpenAI
    sys.modules['openai'] = openai
`;
      code = `${STUB_HEADER}\n${code}`;
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
