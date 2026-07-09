import type { ContentBlock, QuizQuestion } from "@/types";

export const systemDesignAnnexure: ContentBlock[] = [
  { type: "heading", level: 2, text: "Annexure A: System Design Theory" },
  {
    type: "paragraph",
    text: "You just spent 48 days learning Python and AI. Now let us zoom out and understand how real AI apps are built at scale. This is called system design: planning how all the pieces fit together before you start building. Think of it like drawing the blueprint of a house before laying a single brick.",
  },
  {
    type: "callout",
    variant: "tip",
    title: "Why does this matter?",
    text: "If you build an app without a plan, it works fine for 10 users. When 10,000 users show up, it crashes. System design is how companies like Google and Netflix handle billions of requests without breaking.",
  },

  { type: "heading", level: 3, text: "1. The Client-Server Model" },
  {
    type: "paragraph",
    text: "Imagine a restaurant. You (the customer) sit at a table and look at the menu. You tell the waiter what you want. The waiter goes to the kitchen, the chef cooks it, and the waiter brings it back to you. In the web world: your browser is the customer, the waiter is the HTTP request, the kitchen is the server, and the dish is the response.",
  },
  {
    type: "mermaid",
    code: "sequenceDiagram\n  participant C as Browser (You)\n  participant S as Next.js Server (Kitchen)\n  participant D as Database (Pantry)\n  C->>S: GET /api/progress (I want my progress)\n  S->>D: SELECT * FROM DayProgress\n  D-->>S: Here are the rows\n  S-->>C: Here is your JSON response\n  Note over C,S: This happens every time you open the app",
    caption: "The client-server model: you ask, the server fetches, you receive",
  },
  {
    type: "callout",
    variant: "teacher",
    title: "Teacher note",
    text: "Every single thing this handbook does, from loading lessons to running Python in the playground, follows this exact pattern. The browser never touches the database directly. It always goes through the server.",
  },

  { type: "heading", level: 3, text: "2. Frontend vs Backend" },
  {
    type: "paragraph",
    text: "Frontend is everything you see and click: buttons, text, colors, animations. It runs in your browser using React. Backend is the hidden engine: databases, API calls, AI inference, file storage. It runs on a server somewhere in a data center.",
  },
  {
    type: "table",
    headers: ["Aspect", "Frontend", "Backend"],
    rows: [
      ["Where it runs", "Your browser", "A server in a data center"],
      ["Language", "TypeScript, React, HTML, CSS", "TypeScript, Python, SQL"],
      ["Can see database?", "No, never", "Yes, directly"],
      ["Handles security?", "No (anyone can see code)", "Yes (API keys, passwords)"],
      ["This handbook", "React components, Tailwind", "Next.js API routes, Prisma"],
    ],
  },

  { type: "heading", level: 3, text: "3. APIs (Application Programming Interfaces)" },
  {
    type: "paragraph",
    text: "An API is like a restaurant menu. The menu lists what you can order. You do not need to know how the kitchen cooks the food. You just order by name, and the kitchen brings it. APIs let different programs talk to each other without knowing how the other works internally.",
  },
  {
    type: "code",
    language: "python",
    code: [
      "# This is an API call. You send a request, you get a response.",
      "# You do not need to know how the LLM works inside.",
      "from openai import OpenAI",
      "",
      'client = OpenAI(',
      '    api_key="YOUR_OPENROUTER_API_KEY",',
      '    base_url="https://openrouter.ai/api/v1"',
      ")",
      "",
      "response = client.chat.completions.create(",
      '    model="tencent/hy3:free",',
      '    messages=[{"role": "user", "content": "Tell me a joke about cricket"}]',
      ")",
      "",
      "print(response.choices[0].message.content)",
      "# The API is the menu. You ordered a joke. The kitchen cooked it.",
    ].join("\n"),
    caption: "An API call is like ordering from a menu",
  },

  { type: "heading", level: 3, text: "4. Databases" },
  {
    type: "paragraph",
    text: "A database is like a filing cabinet that stores data permanently. Even if the server restarts, loses power, or crashes, the data is still there. This handbook uses SQLite, a lightweight database stored in a single file. Bigger apps use PostgreSQL or MongoDB which handle millions of records across multiple servers.",
  },
  {
    type: "mermaid",
    code: "graph TD\n  A[Browser] -->|API call| B[Next.js Server]\n  B -->|Prisma query| C[(SQLite Database)]\n  C -->|Rows| B\n  B -->|JSON| A",
    caption: "Data flow: browser to server to database and back",
  },

  { type: "heading", level: 3, text: "5. Caching" },
  {
    type: "paragraph",
    text: "Caching is like keeping your favorite snack in your desk drawer instead of walking to the kitchen every time. The AI news feed caches articles for 20 minutes. When you refresh, it gives you the cached copy instantly instead of fetching from Hacker News again.",
  },
  {
    type: "callout",
    variant: "mistake",
    title: "Common mistake",
    text: "Caching too long means users see stale data. Caching too short means the app is slow. 20 to 30 minutes is a good balance for news. For stock prices, cache 1 second. For a user name, cache forever (until they change it).",
  },

  { type: "heading", level: 3, text: "6. Load Balancing" },
  {
    type: "paragraph",
    text: "Imagine 5 checkout lines at a grocery store. A load balancer is the person who directs you to the shortest line. When millions of users visit a website at the same time, a load balancer spreads them across multiple servers so no single server gets overwhelmed.",
  },
  {
    type: "mermaid",
    code: "graph TD\n  U[1000 Users] --> LB[Load Balancer]\n  LB -->|250 users| S1[Server 1]\n  LB -->|250 users| S2[Server 2]\n  LB -->|250 users| S3[Server 3]\n  LB -->|250 users| S4[Server 4]\n  S1 --> DB[(Shared Database)]\n  S2 --> DB\n  S3 --> DB\n  S4 --> DB",
    caption: "A load balancer spreads traffic across multiple servers",
  },

  { type: "heading", level: 3, text: "7. The Full AI App Architecture" },
  {
    type: "paragraph",
    text: "Here is how ALL the pieces you learned in 48 days connect in a real AI application. This is the blueprint companies like OpenAI, Anthropic, and Google use (with more servers, but the same idea).",
  },
  {
    type: "mermaid",
    code: "graph TD\n  A[Browser / User] -->|HTTP| B[Next.js Backend]\n  B --> C[LangChain Orchestrator]\n  C -->|LLM call| D[OpenRouter API]\n  C -->|Tool call| E[MCP Server]\n  C -.->|Log trace| F[Langfuse Dashboard]\n  B --> G[(SQLite / PostgreSQL)]\n  B --> H[Pyodide Runtime]\n  D --> I[AI Model: Claude / GPT / Gemini]\n  E --> J[External Tools: Weather, Calculator]",
    caption: "The complete AI app architecture you built over 48 days",
  },
  {
    type: "callout",
    variant: "tip",
    title: "What each piece does",
    text: "Browser: what the user sees. Next.js: handles requests, talks to the database. LangChain: decides what to do (call LLM, use a tool). OpenRouter: provides the LLM. MCP Server: provides external tools. Langfuse: records everything for debugging. Database: stores user progress and notebooks. Pyodide: runs Python in the browser.",
  },

  { type: "heading", level: 3, text: "8. Latency and Why It Matters" },
  {
    type: "paragraph",
    text: "Latency is the delay between asking and getting an answer. If a webpage takes more than 3 seconds to load, most people leave. AI apps are slow because LLMs generate text one word at a time. A technique called streaming sends each word to the browser as soon as it is generated, so the user sees text appearing live instead of waiting 10 seconds.",
  },
  {
    type: "table",
    headers: ["What users feel", "Latency", "Example"],
    rows: [
      ["Instant", "Under 100ms", "Clicking a button, typing in a text box"],
      ["Fast", "100ms to 1s", "Loading a cached page, saving progress"],
      ["Acceptable", "1s to 3s", "Loading a new lesson, API call"],
      ["Slow", "3s to 10s", "Running Python in Pyodide first time"],
      ["Painful", "Over 10s", "LLM generating a long response (use streaming)"],
    ],
  },
];

export const softwareConceptsAnnexure: ContentBlock[] = [
  { type: "heading", level: 2, text: "Annexure B: Common Software Concepts" },
  {
    type: "paragraph",
    text: "These are the vocabulary words every software engineer uses daily. You have seen all of them during this 48-day course. Here they are collected in one place, explained with everyday analogies so you never forget them.",
  },

  { type: "heading", level: 3, text: "1. Code" },
  {
    type: "paragraph",
    text: "Code is a list of instructions for a computer. The computer follows each line one by one, from top to bottom. Think of it like a recipe: step 1, step 2, step 3. If you skip a step or do them in the wrong order, the result is wrong.",
  },

  { type: "heading", level: 3, text: "2. Variables" },
  {
    type: "paragraph",
    text: "A variable is a labeled box that holds a value. You put something in the box, label it, and later you can look inside. In Python: name = 'Aarav' puts the text Aarav in a box labeled name. You can change what is inside anytime, like swapping the contents of a labeled Tupperware container.",
  },

  { type: "heading", level: 3, text: "3. Functions" },
  {
    type: "paragraph",
    text: "A function is a named recipe. Instead of writing the same steps over and over, you write them once, give them a name, and call the name whenever you need them. Like how McDonald's has a procedure for making a burger: they do not reinvent it every time, they just follow the procedure.",
  },
  {
    type: "code",
    language: "python",
    code: [
      "# Define the function once (write the recipe)",
      "def make_greeting(name):",
      '    return f"Hello, {name}! Welcome to the course."',
      "",
      "# Call it many times (follow the recipe)",
      'print(make_greeting("Aarav"))',
      'print(make_greeting("Riya"))',
      'print(make_greeting("Kabir"))',
    ].join("\n"),
    caption: "A function is a reusable recipe",
  },

  { type: "heading", level: 3, text: "4. Loops" },
  {
    type: "paragraph",
    text: "A loop is repeat. Instead of writing print('Hello') 100 times, you write a for loop that repeats 100 times automatically. Like a washing machine that spins the drum 50 times without you turning it by hand.",
  },

  { type: "heading", level: 3, text: "5. Conditionals (If/Else)" },
  {
    type: "paragraph",
    text: "A conditional is a fork in the road. IF it is raining, take an umbrella. ELSE, wear sunglasses. The computer checks a condition and decides which path to take. This is how apps make decisions: if the password is correct, log in. Else, show an error.",
  },

  { type: "heading", level: 3, text: "6. Data Types" },
  {
    type: "paragraph",
    text: "Different kinds of data: text (string), whole numbers (int), decimals (float), true/false (bool). Like how a kitchen has different containers for liquids, solids, and powders. You would not put soup in a paper bag. Python picks the right type automatically.",
  },
  {
    type: "table",
    headers: ["Type", "Python name", "Example", "Analogy"],
    rows: [
      ["Text", "str", "name = 'Aarav'", "A label on a jar"],
      ["Whole number", "int", "age = 13", "Counting fingers"],
      ["Decimal", "float", "height = 5.4", "Measuring with a ruler"],
      ["True/False", "bool", "likes_cricket = True", "A light switch"],
      ["List", "list", "cars = ['McLaren']", "A row of boxes"],
      ["Dictionary", "dict", "{'McLaren': 403}", "A phone contact list"],
    ],
  },

  { type: "heading", level: 3, text: "7. JSON" },
  {
    type: "paragraph",
    text: "JSON (JavaScript Object Notation) is a text format for sending data between programs. It looks like Python dictionaries. Every API in the world returns JSON. It is the universal language that lets Python, JavaScript, Java, and any other language understand each other.",
  },
  {
    type: "code",
    language: "json",
    code: [
      "{",
      '  "name": "Aarav",',
      '  "age": 13,',
      '  "favorite_cars": ["McLaren", "Ferrari", "Bugatti"],',
      '  "likes_cricket": true,',
      '  "height": 5.4',
      "}",
    ].join("\n"),
    caption: "JSON: the universal data format for APIs",
  },

  { type: "heading", level: 3, text: "8. HTTP Methods" },
  {
    type: "paragraph",
    text: "HTTP methods are verbs that tell the server what to do. GET = read data. POST = send new data. PUT = update existing data. DELETE = remove data. Every API call uses one of these verbs.",
  },
  {
    type: "table",
    headers: ["Method", "What it does", "This handbook example"],
    rows: [
      ["GET", "Read data", "Load all 48 days from the database"],
      ["POST", "Create new data", "Save a new notebook"],
      ["PUT", "Update existing data", "Mark a day as complete"],
      ["DELETE", "Remove data", "Delete a saved notebook"],
    ],
  },

  { type: "heading", level: 3, text: "9. Status Codes" },
  {
    type: "paragraph",
    text: "Every HTTP response includes a 3-digit status code. 200 means success. 4xx means you made a mistake. 5xx means the server broke.",
  },
  {
    type: "code",
    language: "bash",
    code: [
      "200 OK              # Everything worked perfectly",
      "201 Created         # New resource was created",
      "400 Bad Request     # You sent invalid data",
      "401 Unauthorized    # Missing or wrong API key",
      "404 Not Found       # The URL does not exist",
      "429 Too Many        # You hit the rate limit",
      "500 Server Error    # Something broke server-side",
    ].join("\n"),
    caption: "HTTP status codes cheat sheet",
  },

  { type: "heading", level: 3, text: "10. Environment Variables" },
  {
    type: "paragraph",
    text: "Environment variables are settings stored outside the code, in a file called .env. Like how a restaurant keeps its secret recipe in a safe, not printed on the menu. API keys go in .env so they are never visible in the code or on GitHub.",
  },
  {
    type: "callout",
    variant: "mistake",
    title: "Common mistake",
    text: "Never put API keys directly in your code. If you push code with a key to GitHub, bots will find it within minutes and use your key. Always use environment variables.",
  },

  { type: "heading", level: 3, text: "11. Debugging" },
  {
    type: "paragraph",
    text: "Debugging is finding and fixing mistakes in code. The word comes from an actual moth that got stuck in a computer relay at Harvard in 1947. Grace Hopper taped the moth into her logbook and wrote: First actual case of bug being found. Use print() statements to see what your variables contain at each step.",
  },

  { type: "heading", level: 3, text: "12. Testing" },
  {
    type: "paragraph",
    text: "Testing is checking that your code works correctly before showing it to users. Like a chef tasting food before serving it. Unit tests check individual functions. Integration tests check that different parts work together. The handbook quiz system is a form of testing.",
  },

  { type: "heading", level: 3, text: "13. Deployment" },
  {
    type: "paragraph",
    text: "Deployment is putting your app on a server so anyone in the world can use it. Like opening a restaurant: you built the kitchen (wrote the code), now you open the doors (deploy). Vercel is a popular deployment platform. You push to GitHub, Vercel automatically builds and deploys.",
  },
  {
    type: "mermaid",
    code: "graph LR\n  A[Write code locally] --> B[git push to GitHub]\n  B --> C[Vercel detects push]\n  C --> D[Build the app automatically]\n  D --> E[Deploy to global CDN]\n  E --> F[Your app is live worldwide!]",
    caption: "The deployment pipeline: from code to live in seconds",
  },
];

export const systemDesignQuiz: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "In the client-server model, what is the 'waiter'?",
    options: ["The browser", "The HTTP request", "The database", "The user"],
    correct: 1,
    explanation: "The HTTP request is like the waiter: it carries the order from the customer (browser) to the kitchen (server) and brings back the dish (response).",
  },
  {
    id: 2,
    type: "true-false",
    question: "The frontend can directly access the database without going through the server.",
    correctBool: false,
    explanation: "The browser never touches the database directly. It always goes through the server for security and control.",
  },
  {
    id: 3,
    type: "fill-blank",
    question: "An API is like a restaurant ______ because it lists what you can order.",
    answer: "menu",
    explanation: "The API is the menu: it lists what you can order without showing how the kitchen cooks it.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "What does a load balancer do?",
    options: [
      "Makes servers faster",
      "Spreads users across multiple servers",
      "Stores data permanently",
      "Compiles Python code",
    ],
    correct: 1,
    explanation: "A load balancer directs each user to the least busy server, like a person directing you to the shortest checkout line.",
  },
  {
    id: 5,
    type: "true-false",
    question: "Caching means storing a copy of data so you don't have to fetch it again from the original source.",
    correctBool: true,
    explanation: "Caching is like keeping snacks in your desk so you don't walk to the kitchen every time.",
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Which is an advantage of microservices over a monolith?",
    options: [
      "Easier to build initially",
      "Each service can be updated independently",
      "Uses less memory",
      "Has fewer bugs",
    ],
    correct: 1,
    explanation: "Microservices let you update one part (like search) without redeploying the whole app.",
  },
  {
    id: 7,
    type: "fill-blank",
    question: "The delay between asking for data and getting it back is called ______.",
    answer: "latency",
    explanation: "Latency is the wait time. Lower latency means a faster-feeling app.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "What is streaming in the context of LLMs?",
    options: [
      "Watching videos",
      "Sending each word to the browser as it is generated",
      "Downloading files faster",
      "Caching responses",
    ],
    correct: 1,
    explanation: "Streaming sends words as they are generated so the user sees text appearing live instead of waiting for the full response.",
  },
  {
    id: 9,
    type: "true-false",
    question: "Authentication is what you are allowed to do, and authorization is who you are.",
    correctBool: false,
    explanation: "It is the other way around: authentication is proving who you are (ID card), authorization is what you can do (VIP pass).",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "What does a CDN (Content Delivery Network) do?",
    options: [
      "Compresses images",
      "Copies content to servers around the world for faster loading",
      "Blocks hackers",
      "Manages the database",
    ],
    correct: 1,
    explanation: "A CDN is like having pizza shops in every city so content loads from the nearest server.",
  },
];

export const softwareConceptsQuiz: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is a variable?",
    options: [
      "A type of loop",
      "A labeled box that holds a value",
      "A function that prints text",
      "A kind of error",
    ],
    correct: 1,
    explanation: "A variable is a labeled box: you put a value in, label it, and look inside later.",
  },
  {
    id: 2,
    type: "true-false",
    question: "A function is a named recipe that you can call many times.",
    correctBool: true,
    explanation: "Like McDonald's burger procedure: write it once, follow it many times.",
  },
  {
    id: 3,
    type: "fill-blank",
    question: "JSON stands for JavaScript Object ______.",
    answer: "Notation",
    explanation: "JSON is the universal data format that lets all programming languages understand each other.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Which HTTP method is used to read data from a server?",
    options: ["POST", "GET", "DELETE", "PUT"],
    correct: 1,
    explanation: "GET reads data, like opening a book to read it.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What does status code 404 mean?",
    options: [
      "Server error",
      "Success",
      "Not found",
      "Rate limited",
    ],
    correct: 2,
    explanation: "404 means the URL or resource was not found on the server.",
  },
  {
    id: 6,
    type: "true-false",
    question: "You should put API keys directly in your code and push to GitHub.",
    correctBool: false,
    explanation: "Never put API keys in code. Use environment variables (.env file) so keys are never exposed.",
  },
  {
    id: 7,
    type: "fill-blank",
    question: "Finding and fixing mistakes in code is called ______.",
    answer: "debugging",
    explanation: "Debugging comes from an actual moth found in a computer relay in 1947.",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "What is deployment?",
    options: [
      "Writing the first line of code",
      "Putting your app on a server so anyone can use it",
      "Fixing a bug",
      "Running tests",
    ],
    correct: 1,
    explanation: "Deployment is like opening a restaurant: you built the kitchen, now you open the doors.",
  },
  {
    id: 9,
    type: "true-false",
    question: "Python is a compiled language.",
    correctBool: false,
    explanation: "Python is an interpreted language: it translates and runs line by line, not all at once.",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "What is a package in Python?",
    options: [
      "A box you ship",
      "A bundle of code someone else wrote that you can use",
      "A type of variable",
      "A way to compress files",
    ],
    correct: 1,
    explanation: "A package is like buying a pre-made toolkit instead of making your own tools. You install it with pip.",
  },
];
