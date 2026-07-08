// Curated YouTube videos mapped to the handbook's topics.
// Each video embeds and plays within the site (no redirect to youtube.com).
//
// Source: the instructor's recommended video index, covering Python
// Fundamentals (Days 1-15), AI Theory (Days 16-25), and Practical AI
// (Days 26-44).

export interface YouTubeVideo {
  id: string;
  /** YouTube video ID (11 chars). If this is a playlist, use playlistId instead. */
  videoId?: string;
  /** YouTube playlist ID (starts with "PL"). If set, embeds as a playlist. */
  playlistId?: string;
  title: string;
  channel: string;
  durationLabel?: string;
  topicRange: string;
  dayRange: string;
  /** Explicit list of day numbers this video covers, for precise matching. */
  days: number[];
  why: string;
  topics: string[];
}

export const youtubeVideos: YouTubeVideo[] = [
  // --- Python Fundamentals (Days 1-15) ---
  {
    id: "python-basics-mosh",
    videoId: "_uQrJ0TkZlc",
    title: "Python Tutorial for Beginners",
    channel: "Programming with Mosh",
    durationLabel: "~1h",
    topicRange: "Topics 1-5: Installation, Variables, f-strings, Operators, If-Statements",
    dayRange: "Days 1-5",
    days: [1, 2, 3, 4, 5],
    why: "He explains the Python interpreter step-by-step. You will see exactly how variables allocate memory and how the conditional execution branch works.",
    topics: ["installation", "variables", "data types", "f-strings", "operators", "if statements"],
  },
  {
    id: "python-loops-corey",
    videoId: "6iF8Xb7Z3wQ",
    title: "Python Loops - For/While Loops",
    channel: "Corey Schafer",
    durationLabel: "~16min",
    topicRange: "Topics 6-9: Loops (While, For, Nested) and Real-Life Practice Logic",
    dayRange: "Days 6-9",
    days: [6, 7, 8, 9],
    why: "Corey does not just show loops, he shows how loop execution states change frame-by-frame. Essential for mastering inner and outer loop counters.",
    topics: ["while loops", "for loops", "nested loops", "range", "break", "continue"],
  },
  {
    id: "python-functions-corey",
    videoId: "9Os0o3wzS_I",
    title: "Python Functions",
    channel: "Corey Schafer",
    durationLabel: "~18min",
    topicRange: "Topics 10-11: Functions, Default Arguments, and Multiple Returns",
    dayRange: "Days 10-11",
    days: [10, 11],
    why: "He breaks down variable scope (global vs local) and how the stack pointer returns multiple values seamlessly.",
    topics: ["functions", "parameters", "default arguments", "return", "scope"],
  },
  {
    id: "python-datastructures-corey",
    videoId: "W8KRzm-HUcc",
    title: "Python Lists, Tuples, and Sets",
    channel: "Corey Schafer",
    durationLabel: "~22min",
    topicRange: "Topics 12-14: Data Structures (Lists, Dictionaries, Tuples, Sets, String Methods)",
    dayRange: "Days 12-14",
    days: [12, 13, 14],
    why: "Crucial for understanding mutability. He shows why Tuples cannot change, how Sets index unique values instantly, and why list slicing works the way it does.",
    topics: ["lists", "tuples", "sets", "dictionaries", "strings", "mutability"],
  },
  {
    id: "python-files-corey",
    videoId: "Uh2ebFW8OYM",
    title: "Python File Objects - Reading and Writing to Files",
    channel: "Corey Schafer",
    durationLabel: "~27min",
    topicRange: "Topic 15: File Handling and Exceptions (io.StringIO)",
    dayRange: "Day 15",
    days: [15],
    why: "He clarifies context managers (with open) so your code never leaks memory or leaves files locked after a crash.",
    topics: ["file handling", "exceptions", "try except", "context managers", "io.StringIO"],
  },

  // --- AI Theory and Core Architecture (Days 16-25) ---
  {
    id: "neural-net-3b1b",
    videoId: "aircAruvnKk",
    title: "But what is a neural network?",
    channel: "3Blue1Brown",
    durationLabel: "~19min",
    topicRange: "Topics 16-17: What is AI? and Machine Learning vs Deep Learning",
    dayRange: "Days 16-17",
    days: [16, 17],
    why: "The most beautiful visual mathematical explanation ever created. It shows how deep layers learn structural features automatically, compared to manual machine learning rules.",
    topics: ["artificial intelligence", "machine learning", "deep learning", "neural networks", "layers"],
  },
  {
    id: "micrograd-karpathy",
    videoId: "VMj-3S1tku0",
    title: "The spelled-out intro to neural networks: building micrograd",
    channel: "Andrej Karpathy",
    durationLabel: "~2h 25min",
    topicRange: "Topic 18: Neural Networks and The Artificial Neuron (w . x + b)",
    dayRange: "Day 18",
    days: [18],
    why: "Karpathy builds an entire automatic differentiation engine from scratch. You will watch weights slide, gradients update, and mathematically understand exactly how a neuron learns.",
    topics: ["neural networks", "neurons", "weights", "gradients", "backpropagation", "micrograd"],
  },
  {
    id: "transformers-3b1b",
    videoId: "wjZofJX0v4M",
    title: "But what is a GPT? Visual intro to Transformers",
    channel: "3Blue1Brown",
    durationLabel: "~27min",
    topicRange: "Topic 19: Transformers and Attention (Why older models failed)",
    dayRange: "Day 19",
    days: [19],
    why: "It maps out exactly why old models (RNNs/LSTMs) forgot words at the beginning of long sentences, and how Self-Attention lets tokens instantly connect across massive blocks of text.",
    topics: ["transformers", "attention", "RNN", "LSTM", "self-attention", "tokens"],
  },
  {
    id: "build-gpt-karpathy",
    videoId: "kCc8FmEb1nY",
    title: "Let's build GPT: from scratch, in code, spelled out",
    channel: "Andrej Karpathy",
    durationLabel: "~1h 56min",
    topicRange: "Topic 19-20: Transformers and Large Language Models (built from scratch)",
    dayRange: "Days 19-20",
    days: [19, 20],
    why: "Karpathy builds a GPT model from scratch in code. You see exactly how self-attention, transformer blocks, and next-word prediction come together to form a language model. The deep companion to the 3Blue1Brown visual explainer.",
    topics: ["GPT", "transformers", "self-attention", "language model", "from scratch", "code"],
  },
  {
    id: "llm-intro-karpathy",
    videoId: "zjkBMFhNj_g",
    title: "Intro to Large Language Models",
    channel: "Andrej Karpathy",
    durationLabel: "~1h 9min",
    topicRange: "Topics 20 and 23: Large Language Models and AI Hallucinations",
    dayRange: "Days 20, 23",
    days: [20, 23],
    why: "Your ultimate anchor video. Karpathy explicitly explains that hallucinations are not bugs, they are what LLMs do 100% of the time. An LLM is simply generating the next most probable word based on math.",
    topics: ["large language models", "LLM", "hallucinations", "next word prediction", "GPT"],
  },
  {
    id: "how-i-use-llms-karpathy",
    videoId: "EWvNQjAaOHw",
    title: "How I use LLMs",
    channel: "Andrej Karpathy",
    durationLabel: "~40min",
    topicRange: "Topic 22: Prompt Engineering (practical LLM usage)",
    dayRange: "Day 22",
    days: [22],
    why: "Karpathy shares his real-world workflow for using LLMs effectively: context-window management, iterative prompting, knowing when to switch models, and how to get the most out of AI tools in daily work.",
    topics: ["LLM", "prompt engineering", "workflow", "practical usage", "context window"],
  },
  {
    id: "gpt-tokenizer-karpathy",
    videoId: "zduSFxRajkE",
    title: "Let's build the GPT Tokenizer",
    channel: "Andrej Karpathy",
    durationLabel: "~2h 13min",
    topicRange: "Topic 21: Tokens, Context Window, and Embeddings",
    dayRange: "Day 21",
    days: [21],
    why: "Karpathy builds a tokenizer from scratch, showing exactly how text is split into tokens before the model sees it. You will understand why 'Unbelievable' becomes 3 tokens and how this affects cost and context windows.",
    topics: ["tokens", "tokenization", "context window", "embeddings", "byte-pair encoding"],
  },
  {
    id: "prompt-eng-andrew-ng",
    videoId: "tRvcAdqsJWo",
    title: "ChatGPT Prompt Engineering for Developers",
    channel: "Andrew Ng (DeepLearning.AI)",
    durationLabel: "~1h 15min",
    topicRange: "Topic 22: Prompt Engineering",
    dayRange: "Day 22",
    days: [22],
    why: "Andrew Ng teaches the practical craft of writing effective prompts: clear instructions, delimiters, few-shot examples, and iterative refinement. Essential for getting reliable LLM output.",
    topics: ["prompt engineering", "system prompts", "few-shot", "zero-shot", "temperature"],
  },
  {
    id: "rag-langchain-playlist",
    playlistId: "PLfaIDFEXuae2LXbO1_PKyVJiQ23ZztA0x",
    title: "RAG From Scratch - Complete Master Playlist",
    channel: "LangChain",
    durationLabel: "Playlist",
    topicRange: "Topic 23 (RAG Specific): Retrieval Augmented Generation",
    dayRange: "Day 23",
    days: [23],
    why: "The complete LangChain RAG walkthrough. Shows how to search a document database, inject the results as context, and reduce hallucinations. Watch the first few videos to grasp the core flow.",
    topics: ["RAG", "retrieval augmented generation", "vector database", "embeddings", "LangChain"],
  },
  {
    id: "ai-agents-ibm",
    videoId: "F8NKVhkZZWI",
    title: "What are AI Agents?",
    channel: "IBM Technology",
    durationLabel: "~10min",
    topicRange: "Topic 24: AI Agents and Tool Calling",
    dayRange: "Day 24",
    days: [24],
    why: "A clear, concise explanation of what makes an agent different from a plain LLM. Covers tool calling, decision-making, and how agents loop between thinking and acting.",
    topics: ["AI agents", "tool calling", "function calling", "autonomous", "agentic"],
  },
  {
    id: "api-fireship",
    videoId: "QV7C_9otMhI",
    title: "RESTful APIs in 100 Seconds",
    channel: "Fireship",
    durationLabel: "~3min",
    topicRange: "Topic 25: Software Concepts - REST API (Restaurant Analogy)",
    dayRange: "Day 25",
    days: [25],
    why: "A fast, memorable explanation of REST APIs using the restaurant menu analogy. Perfect primer before writing your first HTTP request to OpenRouter.",
    topics: ["REST API", "HTTP", "GET", "POST", "JSON", "client server"],
  },

  // --- Practical AI: API Coding, LangChain, and MCP (Days 26-44) ---
  {
    id: "openrouter-python-engineer",
    videoId: "-LDmhAPZmAY",
    title: "OpenRouter API Tutorial - Connect to ANY AI Model",
    channel: "Python Engineer",
    durationLabel: "~20min",
    topicRange: "Topics 26-28: OpenRouter Setup, System Prompts, and Roles",
    dayRange: "Days 26-28",
    days: [26, 27, 28],
    why: "Walks through setting up an OpenRouter API key, making your first call, and understanding the roles (system, user, assistant) in the messages array.",
    topics: ["OpenRouter", "API key", "system prompt", "messages", "chat completions"],
  },
  {
    id: "json-mode-dave-ebbelaar",
    videoId: "jw5DnVLI3Sw",
    title: "OpenAI Structured Output - All You Need to Know",
    channel: "Dave Ebbelaar",
    durationLabel: "~15min",
    topicRange: "Topics 29-30: Project 1 AI Chatbot and Working with JSON Responses",
    dayRange: "Days 29-30",
    days: [29, 30],
    why: "A comprehensive guide on OpenAI Structured Outputs and JSON mode, demonstrating how to use Pydantic models in Python to enforce exact schema adherence in production-grade LLM applications.",
    topics: ["JSON", "Structured Output", "OpenAI", "Pydantic", "data extraction"],
  },
  {
    id: "langchain-cookbook-greg",
    videoId: "2xxziIWmaSA",
    title: "The LangChain Cookbook - 7 Essential Concepts",
    channel: "Greg Kamradt",
    durationLabel: "~1h 7min",
    topicRange: "Topics 31-34: What is LangChain? Prompts, Chains, Memory, and Parsing",
    dayRange: "Days 31-34",
    days: [31, 32, 33, 34],
    why: "A single video that covers the seven core LangChain concepts: models, prompts, chains, memory, agents, tools, and output parsers. The best one-stop LangChain primer.",
    topics: ["LangChain", "ChatPromptTemplate", "chains", "memory", "output parsers", "agents"],
  },
  {
    id: "langchain-rabbitmetrics",
    videoId: "aywZrzNaKjs",
    title: "LangChain Explained in 13 Minutes | QuickStart Tutorial for Beginners",
    channel: "Rabbitmetrics",
    durationLabel: "~13min",
    topicRange: "Topics 31-34: What is LangChain? Prompts, Chains, Memory, and Parsing",
    dayRange: "Days 31-34",
    days: [31, 32, 33, 34],
    why: "A clear and concise conceptual breakdown of LangChain components (LLM wrappers, prompt templates, chains, embeddings, and vector stores) with clean, easy-to-follow code examples.",
    topics: ["LangChain", "ChatPromptTemplate", "chains", "embeddings", "vector stores", "quickstart"],
  },
  {
    id: "langchain-storyteller-onur",
    videoId: "6gDLcTcePhM",
    title: "Build Your Own AI Storyteller with LangChain and Streamlit",
    channel: "Onur Baltaci",
    durationLabel: "~15min",
    topicRange: "Topic 35: Project 2 - AI Story Generator",
    dayRange: "Day 35",
    days: [35],
    why: "A hands-on coding tutorial that guides you through building a complete AI storyteller application with LangChain, memory, prompts, and a Streamlit user interface.",
    topics: ["LangChain", "Streamlit", "story generator", "memory", "app"],
  },
  {
    id: "mcp-anthropic",
    videoId: "yzwmTeA4Dgw",
    title: "Introduction to Model Context Protocol (MCP)",
    channel: "Anthropic and Code_miko",
    durationLabel: "~20min",
    topicRange: "Topics 36-39: MCP Basics, Servers, and Tools",
    dayRange: "Days 36-39",
    days: [36, 37, 38, 39],
    why: "The official Anthropic introduction to MCP. Explains the client-server model, tools, resources, and why MCP standardizes how LLMs connect to external data and functions.",
    topics: ["MCP", "Model Context Protocol", "tools", "resources", "client server", "Anthropic"],
  },
  {
    id: "langfuse-tracing",
    videoId: "vRFSVGaNaG4",
    title: "LLM Production Tracing with Langfuse",
    channel: "Langfuse",
    durationLabel: "~15min",
    topicRange: "Topics 40-41: Langfuse AI Observability and Integration",
    dayRange: "Days 40-41",
    days: [40, 41],
    why: "The official Langfuse walkthrough. Shows how to add tracing to your LLM calls, read the dashboard (traces, spans, generations), and debug token usage and latency.",
    topics: ["Langfuse", "observability", "tracing", "spans", "generations", "debugging"],
  },
  {
    id: "llm-system-design-bytebytego",
    videoId: "2g1G8Jr88xU",
    title: "LLM System Design: Architecture and Patterns",
    channel: "ByteByteGo",
    durationLabel: "~15min",
    topicRange: "Topics 42-44: Project 3 and LLM System Design Architecture",
    dayRange: "Days 42-44",
    days: [42, 43, 44],
    why: "A visual, high-level architecture diagram of how all the pieces fit together in a real AI app: browser, backend, LangChain, OpenRouter, MCP tools, and Langfuse logging.",
    topics: ["system design", "architecture", "LangChain", "MCP", "Langfuse", "full stack"],
  },
];

/** Find videos that cover a specific day number. */
export function getVideosForDay(dayNumber: number): YouTubeVideo[] {
  return youtubeVideos.filter((v) => v.days.includes(dayNumber));
}

/** Build the embed URL for a video (supports both single videos and playlists). */
export function getEmbedUrl(video: YouTubeVideo, autoplay = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    // Use the standard youtube.com domain instead of youtube-nocookie.com
    // because nocookie triggers "Sign in to confirm you're not a bot" on
    // many videos.
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  if (video.playlistId) {
    params.set("list", video.playlistId);
    return `https://www.youtube.com/embed/videoseries?${params.toString()}`;
  }
  return `https://www.youtube.com/embed/${video.videoId}?${params.toString()}`;
}

/** Get the thumbnail URL for a video. */
export function getThumbnailUrl(video: YouTubeVideo): string {
  if (video.videoId) {
    return `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`;
  }
  // Playlists do not have a direct thumbnail URL; use a placeholder gradient.
  return "";
}
