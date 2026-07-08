import type { Assessment } from "@/types";

export const assessments: Assessment[] = [
  // ---------------------------------------------------------------------------
  // 1. WEEK 1 QUIZ: Python Basics (Days 1-7)
  // ---------------------------------------------------------------------------
  {
    id: "week-1-quiz",
    title: "Week 1 Quiz: Python Basics",
    description:
      "Covers Days 1 to 7: variables, data types, operators, if/else, and while loops. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the correct way to create a variable that stores Aarav's age?",
        options: ["age = 13", "var age = 13", "13 = age", "age: 13"],
        correct: 0,
        explanation:
          "In Python, you create a variable by writing the name, an equals sign, and the value. No need for 'var' or colons.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "In Python, the value \"13\" (with quotes) and the value 13 (without quotes) are the same data type.",
        correctBool: false,
        explanation:
          "\"13\" with quotes is a string (text), while 13 without quotes is an integer (number). They are different data types even though they look similar.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "The symbol used to check if two values are equal in Python is ____. (Type the two-character comparison operator.)",
        answer: "==",
        explanation:
          "A single = assigns a value, but == compares two values. For example, if score == 100, then Aarav wins the cricket match.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `runs = 50
if runs >= 50:
    print("Half century!")
else:
    print("Keep going")`,
        answer: "Half century!",
        explanation:
          "Since runs is 50 and the condition is >= (greater than or equal to), the condition is True, so 'Half century!' prints.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which loop keeps running as long as its condition is True?",
        options: ["for loop", "while loop", "if loop", "do loop"],
        correct: 1,
        explanation:
          "A while loop checks a condition and keeps running the code inside it as long as the condition stays True.",
      },
      {
        id: 6,
        type: "true-false",
        question: "The variable name '1stPlace' is a valid Python variable name.",
        correctBool: false,
        explanation:
          "Python variable names cannot start with a digit. They must begin with a letter or underscore, so 'first_place' or 'place1' would be valid.",
      },
      {
        id: 7,
        type: "fill-blank",
        question:
          "The data type for whole numbers like the number of cricket balls in an over (6) is called ____. (Three letters.)",
        answer: "int",
        explanation:
          "Whole numbers in Python are called 'int' (short for integer). Numbers with decimal points are called 'float'.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `cookies = 5
chips = 3
print(cookies + chips * 2)`,
        answer: "11",
        explanation:
          "Multiplication happens before addition, so chips * 2 is 6, then 5 + 6 = 11. This is the order of operations in Python.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What does this code print?\nweather = \"rainy\"\nif weather == \"sunny\":\n    print(\"Play cricket\")\nelif weather == \"rainy\":\n    print(\"Play Minecraft\")\nelse:\n    print(\"Read a book\")",
        options: ["Play cricket", "Play Minecraft", "Read a book", "Nothing"],
        correct: 1,
        explanation:
          "The weather is 'rainy', so the first condition fails, the elif condition matches, and 'Play Minecraft' prints.",
      },
      {
        id: 10,
        type: "true-false",
        question: "An infinite while loop happens when the condition never becomes False.",
        correctBool: true,
        explanation:
          "If the condition is always True (for example 'while True:') the loop never stops. You usually need to update a variable inside the loop so the condition can become False.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. WEEK 2 QUIZ: Loops and Functions (Days 8-14)
  // ---------------------------------------------------------------------------
  {
    id: "week-2-quiz",
    title: "Week 2 Quiz: Loops and Functions",
    description:
      "Covers Days 8 to 14: for loops, nested loops, functions, lists, dictionaries, tuples, sets, and strings. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does range(3) produce in a for loop?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "1, 2"],
        correct: 1,
        explanation:
          "range(3) starts at 0 and stops before 3, so it gives the values 0, 1, 2. Python counts from zero.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A list in Python can hold values of different types, like numbers and strings together.",
        correctBool: true,
        explanation:
          "Python lists can hold any mix of types. For example ['Aarav', 13, True] is a valid list with a string, an integer, and a boolean.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To get the number of items in a list called cars, you write len(____).",
        answer: "cars",
        explanation:
          "The len() function returns the count of items. len(cars) tells you how many car names are in the list.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `heroes = ["Iron Man", "Spider-Man", "Hulk"]
print(heroes[1])`,
        answer: "Spider-Man",
        explanation:
          "Python lists are zero-indexed, so heroes[0] is 'Iron Man', heroes[1] is 'Spider-Man', and heroes[2] is 'Hulk'.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What keyword defines a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
        explanation:
          "The 'def' keyword starts a function definition. For example: 'def greet(name):' creates a function called greet.",
      },
      {
        id: 6,
        type: "true-false",
        question: "A tuple is similar to a list, but you cannot change its values after it is created.",
        correctBool: true,
        explanation:
          "Tuples use parentheses and are immutable, meaning once created, the values cannot be changed. Lists use square brackets and are mutable.",
      },
      {
        id: 7,
        type: "fill-blank",
        question:
          "A dictionary stores data in ____-value pairs. (Fill in the word for the first part of each pair, like 'name' or 'age'.)",
        answer: "key",
        explanation:
          "Dictionaries use key-value pairs. For example {'name': 'Aarav', 'age': 13} has keys 'name' and 'age' with their values.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `def add_runs(a, b):
    return a + b
print(add_runs(25, 18))`,
        answer: "43",
        explanation:
          "The function takes a and b, then returns their sum. Calling add_runs(25, 18) returns 25 + 18 = 43.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What does this code print?\nfor i in range(2):\n    for j in range(2):\n        print(i, j)",
        options: ["0 0 then 0 1", "0 0 then 1 1", "0 0, 0 1, 1 0, 1 1", "0 1 then 2 3"],
        correct: 2,
        explanation:
          "The outer loop runs i = 0, then 1. For each i, the inner loop runs j = 0, then 1. So all four combinations print: (0,0), (0,1), (1,0), (1,1).",
      },
      {
        id: 10,
        type: "true-false",
        question: "A set in Python automatically removes duplicate values.",
        correctBool: true,
        explanation:
          "Sets only keep unique items. If you create {1, 2, 2, 3}, it becomes {1, 2, 3} because duplicates are dropped.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. WEEK 3 QUIZ: Files, Exceptions and AI Intro (Days 15-21)
  // ---------------------------------------------------------------------------
  {
    id: "week-3-quiz",
    title: "Week 3 Quiz: Files, Exceptions and AI Intro",
    description:
      "Covers Days 15 to 21: file handling, exceptions, AI intro, ML vs DL, neural networks, transformers, LLMs, and tokens. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which Python function opens a file for reading?",
        options: [
          "read('file.txt')",
          "open('file.txt', 'r')",
          "load('file.txt')",
          "file('file.txt')",
        ],
        correct: 1,
        explanation:
          "open() takes the file name and a mode. The 'r' mode means read. For example: open('cricket_scores.txt', 'r').",
      },
      {
        id: 2,
        type: "true-false",
        question: "A try/except block lets your program keep running even when an error happens.",
        correctBool: true,
        explanation:
          "Code in the try block runs first. If it raises an error, the except block runs instead of crashing the program. This is how you handle exceptions safely.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "AI stands for Artificial ____.",
        answer: "intelligence",
        explanation:
          "AI is short for Artificial Intelligence, which means building computer systems that can do things normally requiring human intelligence.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `try:
    number = int("hello")
except ValueError:
    print("Not a number")`,
        answer: "Not a number",
        explanation:
          "int('hello') fails because 'hello' cannot be turned into an integer, so a ValueError is raised and the except block runs.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the main difference between machine learning and deep learning?",
        options: [
          "ML uses math, DL uses code",
          "ML uses neural networks with many layers, DL uses simple rules",
          "DL uses neural networks with many layers, ML uses simpler algorithms",
          "They are exactly the same",
        ],
        correct: 2,
        explanation:
          "Deep learning is a type of ML that uses neural networks with many layers. Regular ML uses simpler algorithms like decision trees or linear regression.",
      },
      {
        id: 6,
        type: "true-false",
        question: "A neural network is loosely inspired by how the human brain works.",
        correctBool: true,
        explanation:
          "Neural networks use artificial 'neurons' connected together, similar in idea to neurons in the brain, though they are much simpler.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "GPT models are based on an architecture called the ____. (Singular noun.)",
        answer: "transformer",
        explanation:
          "The Transformer architecture, introduced in 2017, is the foundation of modern language models like GPT, Claude, and Gemini.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `text = "Aarav loves cricket"
print(len(text.split()))`,
        answer: "3",
        explanation:
          "split() breaks the string into a list of words: ['Aarav', 'loves', 'cricket']. len() counts 3 words.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What is a 'token' in the context of large language models?",
        options: [
          "A coin you pay per question",
          "A small piece of text, like a word or part of a word",
          "A type of password",
          "A type of computer chip",
        ],
        correct: 1,
        explanation:
          "LLMs break text into tokens before processing. A token can be a whole word, a part of a word, or even a single character, depending on the model.",
      },
      {
        id: 10,
        type: "true-false",
        question: "An LLM can sometimes generate text that sounds true but is actually false.",
        correctBool: true,
        explanation:
          "This is called a hallucination. LLMs predict likely next words based on patterns, but they do not actually know what is true, so they can invent facts.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. WEEK 4 QUIZ: Prompting and Concepts (Days 22-25)
  // ---------------------------------------------------------------------------
  {
    id: "week-4-quiz",
    title: "Week 4 Quiz: Prompting and Concepts",
    description:
      "Covers Days 22 to 25: prompt engineering, hallucinations, RAG, fine-tuning, agents, tool calling, REST APIs, and JSON. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is 'prompt engineering'?",
        options: [
          "Building prompts out of metal",
          "Writing clear instructions to get better answers from an LLM",
          "Engineering computer chips",
          "A type of programming language",
        ],
        correct: 1,
        explanation:
          "Prompt engineering is the skill of writing clear, specific instructions so an LLM gives useful answers. Better prompts usually give better results.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A hallucination in AI means the model gives an answer that is true but unexpected.",
        correctBool: false,
        explanation:
          "A hallucination is when the model produces text that sounds confident but is actually false or made up. It is not just an unexpected answer, it is a wrong one.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "RAG stands for Retrieval-Augmented ____.",
        answer: "generation",
        explanation:
          "RAG combines retrieval (finding relevant information) with generation (writing an answer). It helps LLMs use fresh or private data.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `import json
data = {"hero": "Spider-Man", "city": "NYC"}
print(json.dumps(data))`,
        answer: '{"hero": "Spider-Man", "city": "NYC"}',
        explanation:
          "json.dumps() converts a Python dictionary into a JSON string. The output is the JSON representation with double quotes.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is 'fine-tuning'?",
        options: [
          "Making a model smaller",
          "Training a pre-trained model on extra data for a specific task",
          "Deleting part of a model",
          "Tuning a guitar with AI",
        ],
        correct: 1,
        explanation:
          "Fine-tuning takes an already trained model and trains it a bit more on specific data so it gets better at a particular task, like answering medical questions.",
      },
      {
        id: 6,
        type: "true-false",
        question: "An AI agent can decide to call a tool (like a calculator) on its own.",
        correctBool: true,
        explanation:
          "Agents are LLMs given the ability to use tools. They can decide when to call a calculator, search the web, or run code based on the user's request.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "REST APIs usually communicate using data in a format called ____. (Four-letter abbreviation.)",
        answer: "JSON",
        explanation:
          "REST APIs send and receive data as JSON (JavaScript Object Notation), which is lightweight and easy for both humans and machines to read.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `prompt = "Translate to French: hello"
print(len(prompt))`,
        answer: "26",
        explanation:
          "The string 'Translate to French: hello' has 26 characters, including spaces and the colon. len() counts every character.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What does 'tool calling' let an LLM do?",
        options: [
          "Type on a keyboard",
          "Use external functions like searching or calculating",
          "Cook food",
          "Charge your iPhone",
        ],
        correct: 1,
        explanation:
          "Tool calling lets the LLM request that a specific function be run, like a web search or calculator, then use the result to answer better.",
      },
      {
        id: 10,
        type: "true-false",
        question: "JSON keys must be wrapped in double quotes.",
        correctBool: true,
        explanation:
          "In JSON, keys and string values must use double quotes. Single quotes are not valid JSON, even though Python dictionaries allow both.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. WEEK 5 QUIZ: OpenRouter and LangChain (Days 26-35)
  // ---------------------------------------------------------------------------
  {
    id: "week-5-quiz",
    title: "Week 5 Quiz: OpenRouter and LangChain",
    description:
      "Covers Days 26 to 30 (OpenRouter setup, chat, prompts, JSON responses) and Days 31 to 35 (LangChain intro, chains, memory, output parsing). 12 questions.",
    passingScore: 70,
    timerMinutes: 20,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is OpenRouter?",
        options: [
          "A router for Wi-Fi",
          "A service that gives one API key for many LLMs",
          "A type of Python library only",
          "A router made of metal",
        ],
        correct: 1,
        explanation:
          "OpenRouter is an API service that lets you call many different LLMs (like GPT, Claude, Gemini, Llama) using a single API key and one consistent format.",
      },
      {
        id: 2,
        type: "true-false",
        question: "You need an API key from OpenRouter before you can call their API.",
        correctBool: true,
        explanation:
          "API keys authenticate your requests. Without a key, OpenRouter will reject your calls with an error.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "In OpenRouter chat, messages have a 'role' (like 'user' or '____') that tells the model who is speaking. (Fill in the role for the model's replies.)",
        answer: "assistant",
        explanation:
          "Messages use roles like 'system', 'user', and 'assistant'. The 'assistant' role is for the model's replies.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `messages = [
    {"role": "user", "content": "Hi"},
    {"role": "user", "content": "Bye"}
]
print(len(messages))`,
        answer: "2",
        explanation:
          "The list has two dictionaries inside it, so len() returns 2, one for each message.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What library do we use in Python to make HTTP requests to OpenRouter?",
        options: ["requests", "torch", "numpy", "pandas"],
        correct: 0,
        explanation:
          "The requests library is the standard way to send HTTP requests in Python. You can also use httpx or the openai SDK with OpenRouter's base URL.",
      },
      {
        id: 6,
        type: "true-false",
        question: "LangChain is a framework that helps you build apps powered by LLMs.",
        correctBool: true,
        explanation:
          "LangChain provides tools for chains, memory, document loaders, agents, and more, making it easier to build LLM apps without writing everything from scratch.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "A LangChain ____ links multiple steps together, like prompt then model then output parser.",
        answer: "chain",
        explanation:
          "A chain combines components in a sequence. For example: prompt | model | parser forms a chain that takes input and returns a final answer.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `from langchain_core.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a cricket coach."),
    ("user", "{question}")
])
print(len(prompt.input_variables))`,
        answer: "1",
        explanation:
          "The template has one variable, {question}, so input_variables has one item and len() returns 1.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What is LangChain memory used for?",
        options: [
          "Remembering your password",
          "Storing past conversation turns so the LLM has context",
          "Saving files to disk",
          "Charging your phone",
        ],
        correct: 1,
        explanation:
          "Memory stores previous messages so the LLM can reference earlier parts of the conversation, making chats feel natural and continuous.",
      },
      {
        id: 10,
        type: "true-false",
        question:
          "An output parser takes the raw text from an LLM and turns it into a structured format, like a Python dictionary.",
        correctBool: true,
        explanation:
          "Output parsers convert LLM responses into structured data. For example, JsonOutputParser can turn an LLM reply into a Python dict.",
      },
      {
        id: 11,
        type: "fill-blank",
        question:
          "To ask the LLM to reply in a strict machine-readable format, you ask for a ____ response. (Four-letter abbreviation.)",
        answer: "JSON",
        explanation:
          "JSON responses let your code read the LLM output easily. You can ask the model: 'Reply only in JSON with keys name and age.'",
      },
      {
        id: 12,
        type: "code-output",
        question: "What does this code print?",
        code: `response = {"choices": [{"message": {"content": "Hello Aarav"}}]}
print(response["choices"][0]["message"]["content"])`,
        answer: "Hello Aarav",
        explanation:
          "You walk down the nested dictionaries: choices is a list, take index 0, then message, then content. This gives the text 'Hello Aarav'.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. WEEK 6 QUIZ: MCP (Days 36-39)
  // ---------------------------------------------------------------------------
  {
    id: "week-6-quiz",
    title: "Week 6 Quiz: MCP",
    description:
      "Covers Days 36 to 39: MCP concepts, basics, building a server, and connecting to LangChain. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does MCP stand for?",
        options: [
          "Model Context Protocol",
          "Multi Chat Program",
          "Modern Computer Python",
          "Master Control Program",
        ],
        correct: 0,
        explanation:
          "MCP stands for Model Context Protocol. It is a standard way for LLMs to connect to external tools and data sources.",
      },
      {
        id: 2,
        type: "true-false",
        question: "MCP was introduced to give LLMs a standard way to access tools and data.",
        correctBool: true,
        explanation:
          "Before MCP, every integration was custom. MCP provides a single protocol so any LLM can talk to any tool that supports it.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In MCP, a function the model can call is called a ____. (Starts with 't'.)",
        answer: "tool",
        explanation:
          "Tools are functions the model can invoke, like 'search_crickets' or 'get_weather'. The MCP server exposes them to clients.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `def get_car_info(name):
    return f"Car: {name}"
print(get_car_info("Tesla"))`,
        answer: "Car: Tesla",
        explanation:
          "The function uses an f-string to format the output. Calling it with 'Tesla' returns 'Car: Tesla'. In a real MCP server, the @mcp.tool() decorator would wrap this function so the LLM can call it.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is an MCP server?",
        options: [
          "A computer running Windows",
          "A program that exposes tools and resources to MCP clients",
          "A type of router",
          "A type of GPU",
        ],
        correct: 1,
        explanation:
          "An MCP server is a program that offers tools, resources, or prompts. Clients (like Claude Desktop or LangChain) connect to it to use those tools.",
      },
      {
        id: 6,
        type: "true-false",
        question: "LangChain can connect to an MCP server and use its tools.",
        correctBool: true,
        explanation:
          "LangChain has MCP adapters that turn an MCP server's tools into LangChain Tools, so your chains and agents can call them.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "The component that connects to an MCP server and uses its tools is called the MCP ____. (Starts with 'c'.)",
        answer: "client",
        explanation:
          "The client initiates the connection to the server, lists the available tools, and calls them when the LLM asks.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `tools = ["search", "calculator", "weather"]
print(tools[2])`,
        answer: "weather",
        explanation:
          "Lists are zero-indexed, so tools[0] is 'search', tools[1] is 'calculator', and tools[2] is 'weather'.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "Why is MCP useful?",
        options: [
          "It makes your phone charge faster",
          "It lets any MCP-compatible LLM use the same tools without custom integration each time",
          "It is faster than Python",
          "It makes the LLM smarter",
        ],
        correct: 1,
        explanation:
          "MCP standardizes tool access, so you write a tool once and any compatible client can use it. This avoids repeating integration work.",
      },
      {
        id: 10,
        type: "true-false",
        question: "An MCP tool needs a name, a description, and a way to define its inputs.",
        correctBool: true,
        explanation:
          "Tools are defined with a name (what to call), a description (when to use it), and an input schema (what arguments it accepts). The LLM uses these to decide whether to call the tool.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. WEEK 7 QUIZ: Langfuse and Projects (Days 40-43)
  // ---------------------------------------------------------------------------
  {
    id: "week-7-quiz",
    title: "Week 7 Quiz: Langfuse and Projects",
    description:
      "Covers Days 40 to 43: Langfuse, integrating with LangChain, the assistant project, and model comparison. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is Langfuse?",
        options: [
          "A type of light bulb",
          "An observability platform for LLM apps",
          "A programming language",
          "A type of fuse for circuits",
        ],
        correct: 1,
        explanation:
          "Langfuse is an open-source platform for tracing, evaluating, and monitoring LLM applications. It helps you see what your LLM is doing.",
      },
      {
        id: 2,
        type: "true-false",
        question: "Langfuse traces show you each step of an LLM call, including prompts and responses.",
        correctBool: true,
        explanation:
          "Tracing records the inputs, outputs, and timing of each step. You can see which prompts were sent, what the model replied, and how long each step took.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "Langfuse can be integrated with LangChain using a decorator on your chains. The decorator starts with 'o' and is called @____.",
        answer: "observable",
        explanation:
          "The @observe decorator (from langfuse) wraps your function so each call is traced and visible in the Langfuse dashboard. (Note: the decorator name is 'observe', but the concept is 'observable' tracing.)",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `trace = {"name": "spider-man-facts", "user": "aarav"}
print(trace.get("user"))`,
        answer: "aarav",
        explanation:
          "The .get() method on a dictionary returns the value for that key. trace.get('user') returns 'aarav'.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why integrate Langfuse with LangChain?",
        options: [
          "To make your code longer",
          "To see traces of each LLM call and debug problems",
          "To replace Python",
          "To skip writing code",
        ],
        correct: 1,
        explanation:
          "Langfuse shows you what is happening inside your chains, so you can find slow steps, bad prompts, or unexpected outputs. It is great for debugging.",
      },
      {
        id: 6,
        type: "true-false",
        question: "Comparing models side by side helps you pick the best one for your task.",
        correctBool: true,
        explanation:
          "Different models have different strengths. By testing the same prompt on multiple models, you can see which gives better answers, costs less, or runs faster.",
      },
      {
        id: 7,
        type: "fill-blank",
        question:
          "The ____ project in week 7 is a Python program that answers questions using LLMs. (Starts with 'a'.)",
        answer: "assistant",
        explanation:
          "The assistant project brings together prompting, memory, parsing, and tracing to build a helpful chat assistant that Aarav can run from his terminal.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `scores = {"gpt": 8, "claude": 9, "gemini": 7}
best = max(scores, key=scores.get)
print(best)`,
        answer: "claude",
        explanation:
          "max() with key=scores.get returns the key with the highest value. Claude has 9, the highest, so it prints 'claude'.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What can you track in Langfuse?",
        options: [
          "Only the final answer",
          "Prompts, responses, tokens, errors, and timing",
          "Only the user's name",
          "Only the model name",
        ],
        correct: 1,
        explanation:
          "Langfuse records many details: prompts sent, responses received, token counts, errors, latency, and more. This gives a full picture of your app.",
      },
      {
        id: 10,
        type: "true-false",
        question: "Model comparison can save money by showing you which cheaper model performs well enough.",
        correctBool: true,
        explanation:
          "Sometimes a smaller, cheaper model gives answers just as good as a bigger one. Comparing them helps you balance quality and cost.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. WEEK 8 QUIZ: Capstone and Interview (Days 44-48)
  // ---------------------------------------------------------------------------
  {
    id: "week-8-quiz",
    title: "Week 8 Quiz: Capstone and Interview",
    description:
      "Covers Days 44 to 48: system design, the capstone project, and the mock interview. 10 questions.",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is 'system design'?",
        options: [
          "Designing computer cases",
          "Planning the structure and parts of a software system before building it",
          "Designing operating systems",
          "Drawing logos",
        ],
        correct: 1,
        explanation:
          "System design is the process of deciding what components your app needs, how they connect, and how data flows. Good planning makes the build smoother.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A capstone project is a final project that brings together everything you learned.",
        correctBool: true,
        explanation:
          "A capstone combines skills from the whole course into one bigger project. For Aarav, this might be a Python AI assistant with memory, tools, and tracing.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The final mock ____ helps Aarav practice explaining his project and answering questions.",
        answer: "interview",
        explanation:
          "A mock interview simulates a real job or admission interview. Aarav practices describing his code, design choices, and what he learned.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `components = ["ui", "api", "llm", "database"]
print(" -> ".join(components))`,
        answer: "ui -> api -> llm -> database",
        explanation:
          "join() combines list items into one string with the separator between them. The separator here is ' -> '.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "When designing a system, what should you think about first?",
        options: [
          "The color of the buttons",
          "What the user needs the system to do",
          "The price of electricity",
          "The brand of computer",
        ],
        correct: 1,
        explanation:
          "Always start with the user's needs. Once you know what the system must do, you can choose the right tools, models, and data storage.",
      },
      {
        id: 6,
        type: "true-false",
        question: "It is okay if your first capstone prototype is simple; you can improve it later.",
        correctBool: true,
        explanation:
          "Prototypes are about learning. Start simple, get it working, then add features. This is how real software is built.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "In an interview, you should be able to explain ____ your code works, not just that it works.",
        answer: "why",
        explanation:
          "Interviewers want to understand your thinking. Explaining why you chose a certain approach shows you understand the trade-offs and ideas.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `plan = ["build", "test", "ship"]
for step in plan:
    print(step.upper())`,
        answer: "BUILD\nTEST\nSHIP",
        explanation:
          "The loop prints each step in uppercase on a new line. upper() converts the string to all capital letters.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What is a good way to prepare for a coding interview?",
        options: [
          "Skip practice and hope for the best",
          "Practice explaining your projects and solving small coding problems",
          "Memorize the entire Python manual",
          "Bring snacks only",
        ],
        correct: 1,
        explanation:
          "Practicing explanations and small problems builds confidence. Interviewers care about how you think and communicate, not just your final answer.",
      },
      {
        id: 10,
        type: "true-false",
        question: "Documenting your project (with a README) helps others understand and use it.",
        correctBool: true,
        explanation:
          "A README explains what your project does, how to install and run it, and any important notes. Good documentation is a sign of a real developer.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. MID-TERM ASSESSMENT (Days 1-25)
  // ---------------------------------------------------------------------------
  {
    id: "midterm",
    title: "Mid-term Assessment",
    description:
      "Comprehensive test covering Days 1 to 25: Python basics, loops, functions, data structures, files, exceptions, and AI fundamentals. 20 questions, 30 minutes.",
    passingScore: 70,
    timerMinutes: 30,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the output of print(7 // 2)?",
        options: ["3.5", "3", "4", "3.0"],
        correct: 1,
        explanation:
          "The // operator is integer (floor) division. It divides and rounds down, so 7 // 2 is 3.",
      },
      {
        id: 2,
        type: "true-false",
        question: "In Python, indentation is just for looks and the language does not care about it.",
        correctBool: false,
        explanation:
          "Python uses indentation to define code blocks. Wrong indentation causes an IndentationError. Indentation is part of the syntax.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The keyword used to start a conditional statement in Python is ___.",
        answer: "if",
        explanation:
          "The 'if' keyword starts a conditional. You can chain with elif and else for multiple branches.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `x = 10
if x > 5:
    print("big")
else:
    print("small")`,
        answer: "big",
        explanation:
          "x is 10, which is greater than 5, so the if branch runs and 'big' prints.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does the function len(\"Minecraft\") return?",
        options: ["8", "9", "10", "Error"],
        correct: 1,
        explanation:
          "'Minecraft' has 9 characters: M, i, n, e, c, r, a, f, t. len() counts each character.",
      },
      {
        id: 6,
        type: "true-false",
        question: "Strings in Python are immutable, meaning you cannot change them after creation.",
        correctBool: true,
        explanation:
          "You cannot change characters in a string directly. You can only create a new string. Operations like .upper() return a new string.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "The built-in function used to get input from the user is ____().",
        answer: "input",
        explanation:
          "input() prompts the user and returns what they type as a string. You can convert it with int() or float() if needed.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `nums = [1, 2, 3, 4]
nums.append(5)
print(len(nums))`,
        answer: "5",
        explanation:
          "append() adds one item to the end of the list. The list goes from 4 items to 5.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What is a 'syntax error'?",
        options: [
          "An error in your logic",
          "An error caused by breaking Python's grammar rules",
          "An error in the network",
          "An error from the LLM",
        ],
        correct: 1,
        explanation:
          "A syntax error happens when your code does not follow Python's rules, like forgetting a colon or a parenthesis. Python cannot even start running it.",
      },
      {
        id: 10,
        type: "true-false",
        question: "The 'break' keyword stops a loop immediately.",
        correctBool: true,
        explanation:
          "break exits the current loop right away, skipping any remaining iterations. It is often used with an if statement.",
      },
      {
        id: 11,
        type: "fill-blank",
        question: "A function that returns a value uses the keyword ____.",
        answer: "return",
        explanation:
          "The return keyword sends a value back to the caller. Without return, a function returns None by default.",
      },
      {
        id: 12,
        type: "code-output",
        question: "What does this code print?",
        code: `def f(n):
    return n * n
print(f(6))`,
        answer: "36",
        explanation:
          "f(6) returns 6 * 6, which is 36.",
      },
      {
        id: 13,
        type: "multiple-choice",
        question: "Which data structure would you use to store unique superhero names?",
        options: ["list", "set", "tuple", "string"],
        correct: 1,
        explanation:
          "A set automatically removes duplicates, so it is perfect for keeping only unique items, like distinct superhero names.",
      },
      {
        id: 14,
        type: "true-false",
        question: "Deep learning is a subset of machine learning.",
        correctBool: true,
        explanation:
          "Deep learning is a specialized type of ML that uses neural networks with many layers. All deep learning is ML, but not all ML is deep learning.",
      },
      {
        id: 15,
        type: "fill-blank",
        question: "The part of an LLM that takes text and turns it into numbers is called the ____.",
        answer: "tokenizer",
        explanation:
          "A tokenizer splits text into tokens and maps each one to a number, because neural networks work with numbers, not text.",
      },
      {
        id: 16,
        type: "code-output",
        question: "What does this code print?",
        code: `scores = {"Aarav": 99, "Riya": 87}
print(scores.get("Riya"))`,
        answer: "87",
        explanation:
          "The .get() method returns the value for the key. scores.get('Riya') returns 87.",
      },
      {
        id: 17,
        type: "multiple-choice",
        question: "What does the open() function return?",
        options: ["A string", "A file object", "A number", "A list"],
        correct: 1,
        explanation:
          "open() returns a file object that you can read from or write to. Always close it, or use a 'with' block to close it automatically.",
      },
      {
        id: 18,
        type: "true-false",
        question: "You can catch any exception in Python with a bare 'except:' clause, but it is not recommended.",
        correctBool: true,
        explanation:
          "A bare except: catches everything, including bugs you did not expect. It is better to catch specific exceptions like ValueError or FileNotFoundError.",
      },
      {
        id: 19,
        type: "fill-blank",
        question: "A large language model is often abbreviated as ____.",
        answer: "LLM",
        explanation:
          "LLM stands for Large Language Model. GPT, Claude, and Gemini are all examples of LLMs.",
      },
      {
        id: 20,
        type: "code-output",
        question: "What does this code print?",
        code: `words = ["apple", "banana", "cherry"]
print(words[0][0])`,
        answer: "a",
        explanation:
          "words[0] is 'apple', and 'apple'[0] is 'a'. You can index into a string just like a list.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. FINAL PRACTICAL ASSESSMENT (Days 26-48)
  // ---------------------------------------------------------------------------
  {
    id: "final-practical",
    title: "Final Practical Assessment",
    description:
      "Practical coding questions covering Days 26 to 48: OpenRouter, LangChain, MCP, Langfuse, and capstone. A mix of code-output and multiple-choice questions about what code does. 15 questions, 40 minutes.",
    passingScore: 70,
    timerMinutes: 40,
    questions: [
      {
        id: 1,
        type: "code-output",
        question: "What does this code print?",
        code: `roles = ["system", "user", "assistant"]
print(roles[-1])`,
        answer: "assistant",
        explanation:
          "Negative indices count from the end. roles[-1] is the last item, 'assistant'.",
      },
      {
        id: 2,
        type: "multiple-choice",
        question:
          "What does this code do?\nfrom langchain_core.prompts import ChatPromptTemplate\nprompt = ChatPromptTemplate.from_messages([\n    (\"system\", \"You are a helpful cricket coach.\"),\n    (\"user\", \"{question}\")\n])",
        options: [
          "Sends the prompt right now",
          "Creates a reusable prompt template with a placeholder",
          "Saves a file",
          "Trains a model",
        ],
        correct: 1,
        explanation:
          "This builds a template, not a request. The {question} placeholder gets filled in later when you actually use the prompt.",
      },
      {
        id: 3,
        type: "code-output",
        question: "What does this code print?",
        code: `chain_steps = ["prompt", "model", "parser"]
print(len(chain_steps))`,
        answer: "3",
        explanation:
          "The list has 3 items, so len() returns 3.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What does json.loads() do?",
        options: [
          "Converts JSON string to Python object",
          "Converts Python object to JSON string",
          "Loads a file from disk",
          "Lists files in a folder",
        ],
        correct: 0,
        explanation:
          "json.loads() (load string) takes a JSON string and returns a Python object like a dict or list. json.dumps() does the opposite.",
      },
      {
        id: 5,
        type: "code-output",
        question: "What does this code print?",
        code: `import json
text = '{"name": "Aarav", "age": 13}'
data = json.loads(text)
print(data["name"])`,
        answer: "Aarav",
        explanation:
          "json.loads() turns the JSON string into a Python dict. Then data['name'] returns 'Aarav'.",
      },
      {
        id: 6,
        type: "multiple-choice",
        question: "In LangChain, what does the | (pipe) operator do?",
        options: [
          "Adds two numbers",
          "Connects components in a chain",
          "Imports a module",
          "Prints to screen",
        ],
        correct: 1,
        explanation:
          "The pipe operator links components. For example: prompt | model | parser creates a chain where the output of each step feeds into the next.",
      },
      {
        id: 7,
        type: "code-output",
        question: "What does this code print?",
        code: `memory = []
memory.append({"role": "user", "content": "hi"})
memory.append({"role": "assistant", "content": "hello"})
print(len(memory))`,
        answer: "2",
        explanation:
          "Two items are appended to the list, so len(memory) is 2.",
      },
      {
        id: 8,
        type: "multiple-choice",
        question:
          "What does this MCP code define?\n@mcp.tool()\ndef get_score(player: str) -> int:\n    return 99",
        options: [
          "A variable",
          "An MCP tool called get_score",
          "A Python class",
          "An error",
        ],
        correct: 1,
        explanation:
          "The @mcp.tool() decorator registers the function as an MCP tool. The LLM can call get_score with a player name and gets an int back.",
      },
      {
        id: 9,
        type: "code-output",
        question: "What does this code print?",
        code: `def parse_int(text):
    try:
        return int(text)
    except ValueError:
        return None
print(parse_int("42"))
print(parse_int("abc"))`,
        answer: "42\nNone",
        explanation:
          "'42' can be converted to int, so 42 prints. 'abc' cannot, so the except block returns None, which prints as 'None'.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What does Langfuse's @observe decorator do?",
        options: [
          "Sends an email",
          "Wraps a function so its calls are traced in Langfuse",
          "Imports a module",
          "Starts a web server",
        ],
        correct: 1,
        explanation:
          "@observe tells Langfuse to record each call to the function. You can see the inputs, outputs, and timing in the Langfuse dashboard.",
      },
      {
        id: 11,
        type: "code-output",
        question: "What does this code print?",
        code: `results = {"gpt": 5, "claude": 5, "gemini": 4}
print(sum(results.values()))`,
        answer: "14",
        explanation:
          "results.values() gives [5, 5, 4]. sum() adds them up: 5 + 5 + 4 = 14.",
      },
      {
        id: 12,
        type: "multiple-choice",
        question:
          "What is the output type of this chain?\nchain = prompt | model | parser\nresult = chain.invoke({\"question\": \"hi\"})",
        options: [
          "A list of strings",
          "Whatever the parser produces",
          "A file object",
          "A number",
        ],
        correct: 1,
        explanation:
          "The final step in the chain is the parser, so the output type is whatever the parser returns. If it is a JsonOutputParser, the result is a Python dict.",
      },
      {
        id: 13,
        type: "code-output",
        question: "What does this code print?",
        code: `api_response = {
    "choices": [{"message": {"content": "Hi!"}}],
    "usage": {"total_tokens": 10}
}
print(api_response["usage"]["total_tokens"])`,
        answer: "10",
        explanation:
          "You access nested keys step by step. api_response['usage'] gives the usage dict, then ['total_tokens'] gives 10.",
      },
      {
        id: 14,
        type: "multiple-choice",
        question: "What is the safest way to open a file in Python?",
        options: [
          "f = open('x.txt')",
          "with open('x.txt') as f:",
          "open('x.txt', forever=True)",
          "file.read('x.txt')",
        ],
        correct: 1,
        explanation:
          "The 'with' statement automatically closes the file when the block ends, even if an error happens. This is the safest way.",
      },
      {
        id: 15,
        type: "code-output",
        question: "What does this code print?",
        code: `def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    else:
        return "C"
print(grade(85))`,
        answer: "B",
        explanation:
          "85 is not >= 90, but it is >= 80, so the elif branch runs and returns 'B'.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 11. FINAL THEORY ASSESSMENT (All 48 days)
  // ---------------------------------------------------------------------------
  {
    id: "final-theory",
    title: "Final Theory Assessment",
    description:
      "Comprehensive theory covering all 48 days of the course: Python fundamentals, AI concepts, LangChain, MCP, Langfuse, and capstone. 20 questions, 40 minutes.",
    passingScore: 70,
    timerMinutes: 40,
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which of these is a Python data type?",
        options: ["loop", "string", "prompt", "token"],
        correct: 1,
        explanation:
          "'string' is a built-in Python data type used for text. The others are concepts, not data types.",
      },
      {
        id: 2,
        type: "true-false",
        question: "Python is a compiled language only.",
        correctBool: false,
        explanation:
          "Python is usually interpreted, meaning code runs line by line. There is a compilation step to bytecode, but it is not the same as languages like C.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The two main loop types in Python are 'for' and ____.",
        answer: "while",
        explanation:
          "'for' loops iterate over a sequence, while 'while' loops run as long as a condition is True.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: `for i in range(1, 4):
    print(i)`,
        answer: "1\n2\n3",
        explanation:
          "range(1, 4) starts at 1 and stops before 4, so i takes the values 1, 2, and 3, each printed on a new line.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is an LLM trained to do?",
        options: [
          "Predict the next token in text",
          "Solve math equations exactly",
          "Run Python code",
          "Store files",
        ],
        correct: 0,
        explanation:
          "LLMs are trained to predict the next token given the previous ones. This simple goal, at huge scale, leads to impressive language abilities.",
      },
      {
        id: 6,
        type: "true-false",
        question: "A smaller temperature value in an LLM call usually gives more predictable answers.",
        correctBool: true,
        explanation:
          "Temperature controls randomness. Low temperature (like 0) makes the model pick the most likely tokens, so answers are more deterministic. Higher temperature is more creative.",
      },
      {
        id: 7,
        type: "fill-blank",
        question: "The number of layers in a deep neural network is sometimes called its ____.",
        answer: "depth",
        explanation:
          "Deep networks have many layers, and 'depth' refers to the number of layers. This is why it is called 'deep' learning.",
      },
      {
        id: 8,
        type: "code-output",
        question: "What does this code print?",
        code: `print(2 ** 3)`,
        answer: "8",
        explanation:
          "** is the exponent operator. 2 ** 3 means 2 to the power of 3, which is 8.",
      },
      {
        id: 9,
        type: "multiple-choice",
        question: "What is RAG used for?",
        options: [
          "Replacing a model entirely",
          "Letting an LLM use information it was not trained on, like private documents",
          "Compressing a model",
          "Running without electricity",
        ],
        correct: 1,
        explanation:
          "RAG retrieves relevant documents and gives them to the LLM as context, so the model can answer questions about new or private data.",
      },
      {
        id: 10,
        type: "true-false",
        question: "Fine-tuning changes the weights of an existing model.",
        correctBool: true,
        explanation:
          "Fine-tuning continues training, so the model's weights are updated to perform better on a specific task. This is different from prompting, which does not change weights.",
      },
      {
        id: 11,
        type: "fill-blank",
        question: "The protocol that standardizes how LLMs connect to tools and data is called ____. (Three-letter abbreviation.)",
        answer: "MCP",
        explanation:
          "MCP (Model Context Protocol) gives LLMs a standard way to access tools and data. It avoids writing custom integrations for every model and tool.",
      },
      {
        id: 12,
        type: "code-output",
        question: "What does this code print?",
        code: `def is_even(n):
    return n % 2 == 0
print(is_even(7))`,
        answer: "False",
        explanation:
          "7 % 2 is 1 (the remainder), which is not equal to 0, so is_even returns False.",
      },
      {
        id: 13,
        type: "multiple-choice",
        question: "What is the purpose of a system prompt?",
        options: [
          "To install software",
          "To set the model's role and behavior for the conversation",
          "To pay for the API",
          "To close the program",
        ],
        correct: 1,
        explanation:
          "A system prompt tells the LLM how to behave, like 'You are a friendly cricket coach for a 13-year-old.' It shapes the model's tone and focus.",
      },
      {
        id: 14,
        type: "true-false",
        question: "Hallucinations can be reduced by giving the model clear context and asking it to cite sources.",
        correctBool: true,
        explanation:
          "Providing relevant context (like in RAG) and instructions to admit uncertainty can reduce hallucinations. However, no method removes them completely.",
      },
      {
        id: 15,
        type: "fill-blank",
        question: "The platform used to trace and observe LLM calls in this course is ____.",
        answer: "Langfuse",
        explanation:
          "Langfuse is the observability tool used in week 7. It records traces, prompts, responses, and metrics so you can debug and improve your LLM app.",
      },
      {
        id: 16,
        type: "code-output",
        question: "What does this code print?",
        code: `text = "Spider-Man"
print(text.lower())`,
        answer: "spider-man",
        explanation:
          "lower() returns the string in all lowercase letters. The hyphen stays the same; only letters are converted.",
      },
      {
        id: 17,
        type: "multiple-choice",
        question: "What is the main goal of the capstone project?",
        options: [
          "To learn one new trick",
          "To combine everything learned into one real project",
          "To skip ahead",
          "To install software",
        ],
        correct: 1,
        explanation:
          "A capstone is a final project that brings together skills from the whole course. For Aarav, it might be an AI assistant with prompting, tools, memory, and tracing.",
      },
      {
        id: 18,
        type: "true-false",
        question: "In a mock interview, you should be honest about what you do not know.",
        correctBool: true,
        explanation:
          "Admitting what you do not know is better than making things up. Interviewers value honesty and the ability to learn. You can explain how you would find the answer.",
      },
      {
        id: 19,
        type: "fill-blank",
        question: "The framework used in this course to build chains, memory, and agents is ____.",
        answer: "LangChain",
        explanation:
          "LangChain is the framework taught in weeks 5 through 7. It provides chains, memory, output parsers, document loaders, and agent tools.",
      },
      {
        id: 20,
        type: "code-output",
        question: "What does this code print?",
        code: `plan = ["learn", "build", "ship"]
print(plan[1])`,
        answer: "build",
        explanation:
          "Lists are zero-indexed, so plan[0] is 'learn', plan[1] is 'build', and plan[2] is 'ship'.",
      },
    ],
  },
];
