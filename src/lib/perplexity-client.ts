/**
 * Client-side Perplexity Discover feed fetcher.
 *
 * This runs entirely in the browser, leveraging the user's local machine IP
 * and network stack. Cloudflare trusts residential IPs, so this bypasses the
 * bot protection that blocks server-side requests.
 *
 * The Perplexity API returns a JSON feed of trending news cards, each with
 * web results (actual article links, snippets, images, dates).
 */

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
  category: string;
  tags: string[];
}

interface PerplexityWebResult {
  name: string;
  snippet: string;
  url: string;
  timestamp: string;
  meta_data?: {
    images?: string[];
    published_date?: string;
    domain_name?: string;
    authors?: string[];
    description?: string;
  };
}

interface PerplexityItem {
  card_variant?: string;
  title?: string;
  summary?: string;
  bullet_summary_web_results_preload?: PerplexityWebResult[];
  web_results_preview?: { first_urls?: string[] };
}

// AI/Python keyword set (mirrors the server-side aggregator).
const AI_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "deep learning",
  "neural network", "openai", "chatgpt", "gpt", "llm", "large language model",
  "claude", "anthropic", "gemini", "mistral", "deepseek", "glm", "kimi",
  "moonshot", "qwen", "nvidia", "gpu", "transformer", "generative ai", "genai",
  "copilot", "midjourney", "stable diffusion", "hugging face", "huggingface",
  "langchain", "crewai", "llama", "mcp", "model context protocol", "cursor",
  "pytorch", "tensorflow", "python", "rag", "agent", "agentic", "diffusion",
  "computer vision", "nlp", "natural language processing", "robotics",
  "fine-tuning", "embedding", "vector database", "tokenizer", "attention",
] as const;

function matchesAI(text: string): boolean {
  const lower = text.toLowerCase();
  return AI_KEYWORDS.some((kw) => {
    if (kw.length <= 4) {
      return new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lower);
    }
    return lower.includes(kw);
  });
}

function tagFor(text: string): string[] {
  const lower = text.toLowerCase();
  const tags: string[] = [];
  const tagMap: Record<string, string> = {
    openai: "OpenAI", chatgpt: "ChatGPT", gpt: "GPT", claude: "Claude",
    anthropic: "Anthropic", gemini: "Gemini", llama: "Llama", glm: "GLM",
    kimi: "Kimi", moonshot: "Moonshot", qwen: "Qwen", deepseek: "DeepSeek",
    mistral: "Mistral", langchain: "LangChain", pytorch: "PyTorch",
    tensorflow: "TensorFlow", "hugging face": "Hugging Face",
    huggingface: "Hugging Face", nvidia: "NVIDIA", gpu: "GPU",
    "machine learning": "ML", "deep learning": "Deep Learning",
    "neural network": "Neural Network", transformer: "Transformer",
    "large language model": "LLM", llm: "LLM", python: "Python",
    "fine-tuning": "Fine-tuning", rag: "RAG", agent: "Agents", mcp: "MCP",
    copilot: "Copilot", cursor: "Cursor", diffusion: "Diffusion",
  };
  for (const [key, tag] of Object.entries(tagMap)) {
    if (lower.includes(key) && !tags.includes(tag)) tags.push(tag);
  }
  return tags.slice(0, 6);
}

function categoryFor(source: string, title: string): string {
  const lower = (source + " " + title).toLowerCase();
  if (lower.includes("pytorch") || lower.includes("tensorflow") || lower.includes("langchain"))
    return "Framework";
  if (lower.includes("pypi")) return "PyPI";
  if (lower.includes("github")) return "GitHub";
  if (lower.includes("tutorial") || lower.includes("real python")) return "Tutorial";
  if (lower.includes("research") || lower.includes("paper")) return "Research";
  if (lower.includes("python")) return "Python";
  if (lower.includes("llm") || lower.includes("language model")) return "LLMs";
  if (lower.includes("nvidia") || lower.includes("gpu") || lower.includes("chip")) return "Hardware";
  if (lower.includes("openai") || lower.includes("google") || lower.includes("anthropic")) return "Company";
  if (lower.includes("open source") || lower.includes("hugging")) return "Open Source";
  return "AI";
}

/**
 * Fetch the Perplexity Discover feed via our same-origin proxy.
 *
 * The browser calls /api/perplexity (same-origin, no CORS issues). Our server
 * then forwards the request to Perplexity. If Cloudflare blocks the server,
 * the proxy returns empty and we fall back to the other news sources.
 *
 * Returns an array of AI-filtered NewsArticle objects, or [] on failure.
 */
export async function fetchPerplexityClientSide(): Promise<NewsArticle[]> {
  try {
    const res = await fetch("/api/perplexity", { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      status?: string;
      items?: PerplexityItem[];
    };
    if (!data.items || !Array.isArray(data.items)) return [];

    const articles: NewsArticle[] = [];
    for (const item of data.items) {
      const title = item.title || "";
      const summary = item.summary || "";
      const webResults = item.bullet_summary_web_results_preload || [];
      if (webResults.length === 0) continue;

      // Take the first web result as the primary article link.
      const primary = webResults[0];
      const haystack = `${title} ${summary} ${primary.name} ${primary.snippet}`;
      if (!matchesAI(haystack)) continue;

      const image = primary.meta_data?.images?.[0] || null;
      articles.push({
        title: primary.name || title,
        description: primary.snippet || summary || null,
        url: primary.url,
        image,
        publishedAt:
          primary.meta_data?.published_date ||
          primary.timestamp ||
          new Date().toISOString(),
        source: primary.meta_data?.domain_name || "Perplexity",
        category: categoryFor(
          primary.meta_data?.domain_name || "",
          primary.name || title,
        ),
        tags: tagFor(haystack),
      });
    }
    return articles;
  } catch {
    return [];
  }
}
