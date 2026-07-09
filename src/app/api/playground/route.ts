import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAICode } from "@/lib/utils";

interface ApiKeysMap {
  openrouter?: string;
}

function extractString(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((c) => extractString(c)).join("");
  }
  if (content && typeof content === "object" && "text" in content) {
    return String((content as { text: unknown }).text);
  }
  return String(content ?? "");
}

/**
 * Parse the model and messages from Python code that uses the OpenAI client
 * pattern. Handles:
 * - Single and double-quoted strings
 * - Multi-line content
 * - Escaped quotes inside strings
 * - f-strings (strips the f prefix)
 * - role/content in any order
 * - Variable references (skips them with a warning)
 */
function parseAICall(code: string): {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
} | null {
  // Extract model
  const modelMatch = code.match(/model\s*=\s*(?:f?)["']([^"']+)["']/);
  if (!modelMatch) return null;
  const model = modelMatch[1];

  // Extract the messages block: messages=[ ... ]
  // The block ends at the closing ] that is followed by ) or end of line
  const messagesStart = code.indexOf("messages");
  if (messagesStart === -1) return null;

  // Find the opening [ after messages=
  const bracketStart = code.indexOf("[", messagesStart);
  if (bracketStart === -1) return null;

  // Find the matching closing ] by counting brackets
  let depth = 0;
  let bracketEnd = -1;
  for (let i = bracketStart; i < code.length; i++) {
    if (code[i] === "[") depth++;
    if (code[i] === "]") {
      depth--;
      if (depth === 0) {
        bracketEnd = i;
        break;
      }
    }
  }
  if (bracketEnd === -1) return null;

  const block = code.slice(bracketStart + 1, bracketEnd);

  // Extract each message dict. A dict starts with { and ends with }.
  // We need to match balanced braces.
  const messages: { role: string; content: string }[] = [];
  let i = 0;
  while (i < block.length) {
    // Find the next opening brace
    const braceStart = block.indexOf("{", i);
    if (braceStart === -1) break;

    // Find the matching closing brace
    let braceDepth = 0;
    let braceEnd = -1;
    for (let j = braceStart; j < block.length; j++) {
      if (block[j] === "{") braceDepth++;
      if (block[j] === "}") {
        braceDepth--;
        if (braceDepth === 0) {
          braceEnd = j;
          break;
        }
      }
    }
    if (braceEnd === -1) break;

    const dictStr = block.slice(braceStart + 1, braceEnd);

    // Extract role
    const roleMatch = dictStr.match(
      /["']role["']\s*:\s*(?:f?)["']([^"']+)["']/,
    );
    // Extract content - handle both single and double quotes, and escaped quotes
    // Try double-quoted content first (with escaped quotes inside)
    let content: string | null = null;
    let role: string | null = null;

    if (roleMatch) {
      role = roleMatch[1];
    }

    // Try to extract content with double quotes (handling escaped \")
    const contentDoubleMatch = dictStr.match(
      /["']content["']\s*:\s*(?:f?)"((?:[^"\\]|\\.)*)"/,
    );
    const contentSingleMatch = dictStr.match(
      /["']content["']\s*:\s*(?:f?)'((?:[^'\\]|\\.)*)'/,
    );

    if (contentDoubleMatch) {
      content = contentDoubleMatch[1]
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
    } else if (contentSingleMatch) {
      content = contentSingleMatch[1]
        .replace(/\\n/g, "\n")
        .replace(/\\t/g, "\t")
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'");
    }

    if (role && content !== null) {
      messages.push({ role, content });
    }

    i = braceEnd + 1;
  }

  if (messages.length === 0) return null;

  const tempMatch = code.match(/temperature\s*=\s*([0-9.]+)/);
  const temperature = tempMatch ? parseFloat(tempMatch[1]) : undefined;

  return { model, messages, temperature };
}

export async function POST(req: NextRequest) {
  try {
    const { code } = (await req.json()) as { code: string };

    if (!isAICode(code)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "This cell does not look like OpenAI/OpenRouter code. Switch to Python Only mode to run it with Pyodide.",
        },
        { status: 400 },
      );
    }

    // Load API key from settings (never from client)
    const settings = await db.settings.findUnique({ where: { id: 1 } });
    let apiKeys: ApiKeysMap = {};
    try {
      apiKeys = JSON.parse(settings?.apiKeys ?? "{}") as ApiKeysMap;
    } catch {
      apiKeys = {};
    }
    const apiKey = apiKeys.openrouter;
    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No OpenRouter API key set. Add one in Settings before running AI code.",
        },
        { status: 400 },
      );
    }

    const parsed = parseAICall(code);
    if (!parsed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Could not parse the OpenAI client call. Make sure you use model='...' and messages=[{\"role\":..., \"content\":...}] format.",
        },
        { status: 400 },
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Python AI Handbook",
      },
      body: JSON.stringify({
        model: parsed.model,
        messages: parsed.messages,
        ...(parsed.temperature !== undefined
          ? { temperature: parsed.temperature }
          : {}),
      }),
    });
    clearTimeout(timeout);

    const data = await resp.json();
    if (!resp.ok) {
      const message =
        (data && (data.error || data.message)) ||
        `OpenRouter request failed with status ${resp.status}`;
      return NextResponse.json(
        { ok: false, error: typeof message === "string" ? message : JSON.stringify(message) },
        { status: 502 },
      );
    }

    const content = extractString(
      data?.choices?.[0]?.message?.content ?? "",
    );
    return NextResponse.json({ ok: true, output: content });
  } catch (e) {
    console.error("POST /api/playground error", e);
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, error: `Playground run failed: ${message}` },
      { status: 500 },
    );
  }
}
