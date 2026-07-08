# Python & AI Handbook

A complete, production-ready, 48-day Python and AI teaching handbook built as a modern PWA. Designed for a young learner, it covers everything from writing your first `print("Hello!")` to building AI assistants with LangChain, MCP, and Langfuse, all running entirely in the browser.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Customization](#customization)
- [Deployment](#deployment)
- [License](#license)

## Overview

This is a single-page application (using Next.js App Router with client-side view routing) that serves as a complete 48-day curriculum:

- **Days 1-15: Python Fundamentals** (variables, loops, functions, data structures, files)
- **Days 16-25: AI and LLM Theory** (neural networks, transformers, tokens, prompt engineering, RAG, agents)
- **Days 26-48: Practical AI Development** (OpenRouter, LangChain, MCP, Langfuse, capstone projects)

The learner writes their name on first launch and it is dynamically substituted throughout all lesson content, quizzes, assessments, and the completion certificate.

## Tech Stack

### Core Framework
- **Next.js 16** with App Router (Turbopack)
- **TypeScript 5** (strict typing throughout, no `any` except where unavoidable)
- **React 19**

### Styling and UI
- **Tailwind CSS 4** (via `@tailwindcss/postcss`)
- **shadcn/ui** component library (New York style, complete set)
- **Lucide React** for icons
- **next-themes** for dark/light mode
- **tw-animate-css** for animations

### Code Editing and Execution
- **Monaco Editor** (`@monaco-editor/react`) for the playground cells, with Python syntax highlighting, autocomplete, and line numbers
- **Pyodide 0.26.2** (compiled CPython to WebAssembly) loaded from CDN, runs Python entirely in the browser, no server needed
- **Shiki** for syntax highlighting of lesson code blocks (GitHub Dark theme)
- **Mermaid.js** for rendering flowcharts, sequence diagrams, and architecture diagrams inline in lessons

### Database and State
- **Prisma ORM 6** with **SQLite** (file-based, zero-config)
- **Zustand** for client-side state management (view routing, cached progress, settings)
- **TanStack Query** available for server state (installed, not required for current scope)

### PWA (Progressive Web App)
- **Web App Manifest** with standalone display, theme colors, and app shortcuts
- **Service Worker** with three caching strategies:
  - Network-first for navigations (offline fallback to cached shell)
  - Stale-while-revalidate for static assets (JS, CSS, fonts, images)
  - Cache-first with TTL for API responses (news cached 30 min)
- **Custom SVG icon** rendered to PNG icons (192, 512, maskable, apple-touch) using Sharp
- **Install prompt** with dismissible banner and update-ready notifications

### AI Integration
- **OpenRouter API** (keyless from the learner's perspective, stored in the Settings DB table, used only server-side)
- Server-side `/api/playground` route parses OpenAI client code, calls OpenRouter, and returns the response without ever exposing the API key to the client
- Free models: `tencent/hy3:free`, `meta-llama/llama-3-8b-instruct:free`, `google/gemma-2-9b-it:free`, `mistralai/mistral-7b-instruct:free`

### News
- **NewsAPI.org** (API key required, stored in `.env`) queried server-side for AI-only keywords (artificial intelligence, LLMs, models, Python), cached 30 minutes

### Content and Media
- **21 curated YouTube videos** (3Blue1Brown, Andrej Karpathy, Corey Schafer, etc.) embedded and playable in-site via `youtube-nocookie.com` (privacy-friendly, click-to-load)
- **11 assessments** with 137 questions (multiple-choice, true-false, fill-blank, code-output)
- **7 reference sections** (Python cheat sheet, LLM glossary, OpenRouter models, LangChain/MCP/Langfuse snippets, common errors)
- **48 Mermaid diagrams** explaining neural networks, attention, RAG vs fine-tuning, MCP architecture, system design, and more

### Charts and Visualization
- **Recharts** for the progress dashboard (bar chart, line chart, circular progress)
- Custom GitHub-style streak calendar

### Development Tools
- **Bun** as the package manager and runtime
- **ESLint 9** with `eslint-config-next`
- **Prisma CLI** for schema management

## Features

### Learning
- 48 interactive lessons with objectives, content blocks, exercises, quizzes, and teacher notes
- Dynamic name substitution throughout all content
- Collapsible desktop sidebar (auto-collapses in the playground for full editor width)
- Search across all days, lessons, assessments, and references (press `/`)
- Bookmark days, write personal notes (auto-saved), track completion

### Playground (marimo-inspired)
- Notebook-style cells with Monaco editor
- Hover-revealed cell controls (run, stop, copy, move up/down, delete, insert below)
- Execution time badges and status indicators
- Background Pyodide preload (first cell run is instant)
- Python Only mode (Pyodide) and Python + AI mode (server-side OpenRouter)
- Save/load notebooks to the database
- Inline code execution in lessons (run code blocks without leaving the page)

### Assessments
- 11 assessments with shuffled questions, timers, and immediate review
- Question types: multiple-choice, true-false, fill-blank, code-output
- Scores saved to DB, best score tracking, retry with reshuffled order
- Printable completion certificate when all days and assessments are passed

### Progress Tracking
- Circular overall completion gauge
- Phase-wise breakdown (Python, AI Theory, Practical AI)
- Weekly bar chart, streak calendar, assessment score line chart
- Certificate eligibility checklist

### References
- Python cheat sheet (46 syntax entries)
- LLM glossary (21 terms)
- OpenRouter free models table (10 models)
- LangChain, MCP, Langfuse quick reference snippets
- Common errors and fixes (18 entries)
- 21 embedded YouTube video lessons with filter

### AI News
- Live AI headlines from NewsAPI.org, filtered to artificial intelligence, LLMs, AI models, and Python only
- 60+ fresh articles, updated every 30 minutes
- Clean, marimo-style list with source badges and filter

### Settings
- Dynamic student name (prompted on first launch, editable)
- Dark mode toggle, font size slider
- OpenRouter API key management with test connection
- Export/import all data as JSON
- Clear all progress (with confirmation)

## Project Structure

```
python-ai-handbook/
├── prisma/
│   └── schema.prisma              # DayProgress, AssessmentScore, Notebook, Settings
├── public/
│   ├── icon.svg                   # Source SVG (handbook + neural network design)
│   ├── icon-192.png               # PWA icons (generated from SVG)
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   ├── manifest.webmanifest       # PWA manifest
│   └── sw.js                      # Service worker
├── scripts/
│   └── generate-icons.ts          # Sharp script to generate PNG icons
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with PWA meta, theme provider
│   │   ├── page.tsx               # Single route, client-side view router
│   │   ├── globals.css
│   │   └── api/
│   │       ├── progress/route.ts      # GET/POST day progress
│   │       ├── assessments/route.ts   # GET/POST assessment scores
│   │       ├── notebooks/route.ts     # GET/POST notebooks
│   │       ├── notebooks/[id]/route.ts # GET/PUT/DELETE single notebook
│   │       ├── settings/route.ts      # GET/PUT settings (name, theme, API key)
│   │       ├── playground/route.ts    # POST AI code execution (server-side)
│   │       └── news/route.ts          # GET AI news (NewsAPI.org, AI keywords only)
│   ├── components/
│   │   ├── layout/                # Header, Sidebar, MobileNav, BottomTabBar, SearchDialog
│   │   ├── lesson/                # LessonContent, CodeBlock, QuizBlock, ExerciseBlock, MermaidBlock
│   │   ├── playground/            # Playground, CodeCell (marimo-style)
│   │   ├── assessment/            # Quiz, Certificate
│   │   ├── references/            # YouTubeEmbed
│   │   ├── views/                 # HomeView, DaysListView, DayDetailView, etc.
│   │   ├── NamePrompt.tsx         # First-visit name dialog
│   │   ├── PWARegister.tsx        # Service worker registration + install prompt
│   │   ├── PyodidePreloader.tsx   # Background Pyodide warmup
│   │   └── ui/                    # shadcn/ui components (pre-installed)
│   ├── data/
│   │   ├── days.ts                # Barrel: combines 4 day files
│   │   ├── days-1-15.ts           # Python Fundamentals content
│   │   ├── days-16-25.ts          # AI Theory content
│   │   ├── days-26-35.ts          # Practical AI Part 1
│   │   ├── days-36-48.ts          # Practical AI Part 2 + Capstone
│   │   ├── assessments.ts         # 11 assessments, 137 questions
│   │   ├── references.ts          # 7 reference sections
│   │   └── youtube.ts             # 21 curated YouTube videos
│   ├── hooks/
│   │   ├── usePyodide.ts          # Pyodide hook (delegates to runner)
│   │   ├── useProgress.ts         # Day progress CRUD
│   │   ├── useNotebook.ts         # Notebook CRUD
│   │   ├── useSearch.ts           # Cross-content search
│   │   ├── useSubstitute.ts       # Dynamic name substitution
│   │   └── useAppInit.ts          # Load settings/progress/scores on mount
│   ├── lib/
│   │   ├── db.ts                  # Prisma client
│   │   ├── store.ts               # Zustand store (view routing + cached data)
│   │   ├── utils.ts               # cn, substituteName, isAICode, formatters
│   │   └── pyodide-runner.ts      # Module-level Pyodide runner (shared instance)
│   └── types/
│       └── index.ts               # All TypeScript types
├── tailwind.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- **Node.js 18+** or **Bun** (recommended)
- A modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd python-ai-handbook

# Install dependencies
bun install

# Set up the database
bun run db:push

# Start the dev server
bun run dev
```

The app runs on `http://localhost:3000`.

### Environment Variables

Create a `.env` file:

```
DATABASE_URL="file:./dev.db"
NEWS_API_KEY="your-newsapi-org-key"
```

- `DATABASE_URL`: SQLite database file path
- `NEWS_API_KEY`: Your NewsAPI.org API key (get one free at [newsapi.org](https://newsapi.org)). Used only server-side to fetch AI news headlines.

The OpenRouter API key is entered by the learner in the Settings page and stored in the database.

## How It Works

### Single-Page Architecture
The app uses a single `/` route with client-side view routing via Zustand. The `view` state (`home`, `days`, `day`, `playground`, `assessments`, `progress`, `references`, `ai-news`, `settings`) determines which view component renders. This keeps navigation instant and the URL clean.

### Python Execution
1. **Background preload**: When the site loads, `PyodidePreloader` fires `preloadPyodide()` after 2.5 seconds. Pyodide (~10MB) downloads from the jsDelivr CDN and initializes in the background.
2. **Inline execution**: Lesson code blocks use `runPythonInline()` from `@/lib/pyodide-runner`, which shares the preloaded instance. The first run is instant.
3. **Playground**: Uses the `usePyodide` hook (which delegates to the same runner) for cell execution.
4. **AI code**: When a cell contains the OpenAI client pattern, it's sent to `/api/playground`, which parses the code, reads the API key from the DB, calls OpenRouter server-side, and returns the response.

### Dynamic Name Substitution
The placeholder name "Aarav" in all lesson content is replaced at render time with the learner's saved name using `substituteName(text, name)`. The `personalizeDay` / `personalizeAssessment` / `personalizeReference` helpers deep-substitute every text field. When no name is set, the placeholder is used as a fallback.

### PWA Offline Support
The service worker caches the app shell on install, uses network-first for navigations (falling back to the cached shell offline), stale-while-revalidate for static assets, and cache-first with TTL for API responses. This means the handbook, lessons, and even previously-loaded Python execution work offline.

### News
The `/api/news` route uses NewsAPI.org with an API key (stored in `NEWS_API_KEY`) to query for AI-related keywords only: artificial intelligence, LLMs, AI models, and Python programming. It fetches 4 queries in parallel, dedupes by URL, sorts by date, and caches 60 articles for 30 minutes.

## Customization

### Adding or Modifying Lesson Content
Edit the files in `src/data/`:
- `days-1-15.ts`, `days-16-25.ts`, `days-26-35.ts`, `days-36-48.ts` for lessons
- `assessments.ts` for quizzes and tests
- `references.ts` for cheat sheets and glossaries
- `youtube.ts` for video lessons

Each day object follows the `Day` type in `src/types/index.ts`.

### Changing the Color Scheme
Edit `tailwind.config.ts` and the CSS variables in `src/app/globals.css`.

### Adding API Routes
Create new files in `src/app/api/`. All routes use Next.js Route Handlers (`export async function GET/POST/PUT/DELETE`).

## Deployment

### Vercel (Recommended)

The app is fully optimized for Vercel's serverless platform. Since SQLite databases require a writeable filesystem and Vercel functions are read-only (except for `/tmp`), the codebase is configured with an automatic serverless SQLite handler in `src/lib/db.ts`.

On server startup or API invocation:
1. The app detects if it is running in production/Vercel.
2. It copies the template database (`db/custom.db`) to `/tmp/custom.db` if it doesn't exist.
3. It sets `DATABASE_URL` to point to the writeable database file in `/tmp/custom.db`.

**Note on Serverless SQLite**: `/tmp` is ephemeral. While progress, quizzes, and notebooks will save correctly during active sessions, they will reset when the serverless container scales down or is recycled. For persistent production state, you can easily change the Prisma provider in `prisma/schema.prisma` to PostgreSQL (e.g. Neon, Supabase) and set your database connection URL.

To deploy on Vercel:
1. Push the repository to GitHub:
   ```bash
   git remote add origin https://github.com/whotfiszaar/Python-AI-Interactive-Handbook-WebApp.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
2. Link and deploy to Vercel:
   ```bash
   npx vercel --prod --yes
   ```

### Self-Hosted
```bash
bun run build
bun run start
```

The app includes a Caddy gateway configuration for reverse proxying.

## License

MIT License. See the `LICENSE` file for details.
