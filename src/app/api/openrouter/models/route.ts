import { NextResponse } from "next/server";

export interface OpenRouterModelItem {
  id: string;
  name: string;
  context_length: number;
  description?: string;
}

const FALLBACK_FREE_MODELS: OpenRouterModelItem[] = [
  {
    id: "deepseek/deepseek-r1:free",
    name: "DeepSeek: R1 (Free)",
    context_length: 16384,
    description: "DeepSeek's first-generation reasoning model",
  },
  {
    id: "google/gemma-2-9b-it:free",
    name: "Google: Gemma 2 9B (Free)",
    context_length: 8192,
    description: "Google high-performing open-weight model",
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Meta: Llama 3.3 70B Instruct (Free)",
    context_length: 131072,
    description: "Meta's flagship open LLM with large context window",
  },
  {
    id: "qwen/qwen-2.5-coder-32b-instruct:free",
    name: "Qwen: Qwen 2.5 Coder 32B (Free)",
    context_length: 32768,
    description: "State of the art coding LLM by Alibaba Qwen team",
  },
  {
    id: "tencent/hy3:free",
    name: "Tencent: Hunyuan 3 (Free)",
    context_length: 32768,
    description: "Tencent Hunyuan 3 open weight model",
  },
  {
    id: "mistralai/mistral-7b-instruct:free",
    name: "Mistral: Mistral 7B Instruct (Free)",
    context_length: 32768,
    description: "Fast, efficient general purpose LLM",
  },
  {
    id: "meta-llama/llama-3.2-1b-instruct:free",
    name: "Meta: Llama 3.2 1B Instruct (Free)",
    context_length: 131072,
    description: "Lightweight, ultrafast Llama model",
  },
  {
    id: "openchat/openchat-7b:free",
    name: "OpenChat: 7B (Free)",
    context_length: 8192,
    description: "Open-source fine-tuned chat model",
  },
];

export async function GET() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch("https://openrouter.ai/api/v1/models", {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ models: FALLBACK_FREE_MODELS });
    }

    const data = await res.json();
    if (!data?.data || !Array.isArray(data.data)) {
      return NextResponse.json({ models: FALLBACK_FREE_MODELS });
    }

    // Filter strictly free models (either ends with :free or is openrouter/free)
    const freeModels: OpenRouterModelItem[] = data.data
      .filter((m: { id?: string; pricing?: { prompt?: string; completion?: string } }) => {
        if (!m.id) return false;
        const idLower = m.id.toLowerCase();
        // Model MUST explicitly end with :free or be the openrouter/free router
        if (!idLower.endsWith(":free") && idLower !== "openrouter/free") {
          return false;
        }
        const promptPrice = parseFloat(m.pricing?.prompt ?? "0");
        const compPrice = parseFloat(m.pricing?.completion ?? "0");
        return promptPrice === 0 && compPrice === 0;
      })
      .map((m: { id: string; name?: string; context_length?: number; description?: string }) => {
        let cleanName = m.name || m.id;
        // Format model name nicely for LOV dropdown display
        if (!cleanName.includes("(free)") && !cleanName.includes("(Free)")) {
          cleanName = `${cleanName} (Free)`;
        }
        return {
          id: m.id,
          name: cleanName,
          context_length: m.context_length || 8192,
          description: m.description || "",
        };
      });

    if (freeModels.length === 0) {
      return NextResponse.json({ models: FALLBACK_FREE_MODELS });
    }

    // Ensure fallback models are included if missing from live list
    for (const fb of FALLBACK_FREE_MODELS) {
      if (!freeModels.some((m) => m.id === fb.id)) {
        freeModels.push(fb);
      }
    }

    return NextResponse.json({ models: freeModels });
  } catch (e) {
    console.warn("Could not fetch OpenRouter models live, using fallback list:", e);
    return NextResponse.json({ models: FALLBACK_FREE_MODELS });
  }
}
