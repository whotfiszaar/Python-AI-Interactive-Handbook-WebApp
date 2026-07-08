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

// Parse model + messages from Python code that uses the OpenAI client pattern.
function parseAICall(code: string): {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
} | null {
  const modelMatch = code.match(/model\s*=\s*["']([^"']+)["']/);
  if (!modelMatch) return null;
  const model = modelMatch[1];

  // Find messages=[ ... ] block (multiline)
  const messagesBlockMatch = code.match(
    /messages\s*=\s*\[([\s\S]*?)\]\s*\)/,
  );
  if (!messagesBlockMatch) return null;
  const block = messagesBlockMatch[1];

  // Each dict like {"role": "user", "content": "..."}
  const msgRegex =
    /\{\s*["']role["']\s*:\s*["']([^"']+)["']\s*,\s*["']content["']\s*:\s*["']([\s\S]*?)["']\s*\}/g;
  const messages: { role: string; content: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = msgRegex.exec(block)) !== null) {
    // unescape common escapes
    const content = m[2]
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    messages.push({ role: m[1], content });
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
