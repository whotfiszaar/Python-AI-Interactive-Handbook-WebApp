import type { ReferenceSection } from "@/types";

export const referenceSections: ReferenceSection[] = [
  // ============================================================
  // SECTION 1: Python Cheat Sheet (Days 1-15)
  // ============================================================
  {
    id: "python-cheatsheet",
    title: "Python Cheat Sheet",
    description: "All syntax covered in Days 1-15, organized by topic.",
    kind: "cheatsheet",
    items: [
      // Variables
      {
        syntax: "name = value",
        example: 'player = "Aarav"',
        description:
          "Stores a value inside a variable. Python chooses the type for you automatically.",
      },
      {
        syntax: "a, b, c = 1, 2, 3",
        example: 'name, age, city = "Aarav", 13, "Mumbai"',
        description:
          "Assigns several variables in one line. The number of values must match the number of names.",
      },
      {
        syntax: "name: type = value",
        example: "score: int = 250",
        description:
          "Tells readers (and tools) what type a variable should be. Python does not enforce it.",
      },
      // Data types
      {
        syntax: "int(value)",
        example: 'runs = int("100")',
        description:
          "Whole number type. Use int() to convert a string or float into an integer.",
      },
      {
        syntax: "float(value)",
        example: 'price = float("999.99")',
        description:
          "Decimal number type. Use float() to convert a string or int into a decimal.",
      },
      {
        syntax: "str(value)",
        example: "version = str(15)",
        description:
          "Text type. Use str() to convert a number or any object into readable text.",
      },
      {
        syntax: "True / False",
        example: "is_captain = True",
        description:
          "Boolean type that is either True or False. Capital letters matter, lowercase true will not work.",
      },
      {
        syntax: "None",
        example: "winner = None",
        description:
          "Special value that means nothing or no value yet. Often used as a placeholder.",
      },
      // Operators
      {
        syntax: "+ - * / // % **",
        example: "total = 6 * 4 + 2",
        description:
          "Math operators. // is floor division, % is remainder, ** is power (like 2**3 = 8).",
      },
      {
        syntax: "== != < > <= >=",
        example: "won = score >= 200",
        description:
          "Compare two values and return True or False. Use == for equals, not single =.",
      },
      {
        syntax: "and / or / not",
        example: "play = sunny and not homework",
        description:
          "Combine True/False values. and means both must be True, or means either one.",
      },
      {
        syntax: "x += 1",
        example: "runs += 6",
        description:
          "Shortcut for x = x + value. Works with -, *, /, //, %, and ** too.",
      },
      {
        syntax: "x in collection",
        example: '"Aarav" in team',
        description:
          "Returns True if x is inside the collection (list, string, dict, or set).",
      },
      {
        syntax: "a is b",
        example: "winner is None",
        description:
          "Returns True if a and b are the same object in memory. Use is None, not == None.",
      },
      // if / else
      {
        syntax: "if condition:\n    action",
        example: 'if runs > 100: print("Century!")',
        description:
          "Runs code only when the condition is True. Remember the colon and the indented block.",
      },
      {
        syntax: "if c1:\n    a\nelif c2:\n    b\nelse:\n    c",
        example: 'result = "Win" if score >= 200 else "Lose"',
        description:
          "Tests conditions in order. Only the first True branch runs. The example shows the one-line form.",
      },
      {
        syntax: "value = a if condition else b",
        example: 'mood = "happy" if won else "sad"',
        description:
          "One-line if-else that picks a value based on a condition. Also called a ternary expression.",
      },
      // while loops
      {
        syntax: "while condition:\n    action",
        example: "while runs < 200: runs += 6",
        description:
          "Repeats code while the condition stays True. Make sure something changes so it can stop.",
      },
      {
        syntax: "while True:\n    if done: break",
        example: "while True:\n    if runs >= 200: break\n    runs += 6",
        description:
          "Loops forever until break is hit. Useful when you do not know the count ahead of time.",
      },
      // for loops
      {
        syntax: "for item in list:\n    action",
        example: 'for hero in ["Iron Man", "Thor"]: print(hero)',
        description:
          "Goes through each item in a list, string, or any iterable, one at a time.",
      },
      {
        syntax: "for i in range(n):\n    action",
        example: 'for over in range(1, 6): print("Over", over)',
        description:
          "Loops a fixed number of times. range(6) gives 0,1,2,3,4,5. range(1,6) gives 1,2,3,4,5.",
      },
      {
        syntax: "for i, item in enumerate(list):\n    action",
        example: 'for i, ball in enumerate(["a", "b", "c"]): print(i, ball)',
        description:
          "Gives you both the index and the value at the same time. Handy for numbered lists.",
      },
      // functions
      {
        syntax: "def name(params):\n    return value",
        example: "def six_runs():\n    return 6",
        description:
          "Defines a reusable block of code. Functions take inputs (params) and return outputs.",
      },
      {
        syntax: "def f(x=default):\n    ...",
        example: 'def greet(name="Aarav"):\n    print("Hi", name)',
        description:
          "Gives a parameter a default value. Callers can skip it and the default is used.",
      },
      {
        syntax: "lambda x: expression",
        example: "double = lambda x: x * 2",
        description:
          "Tiny one-line function with no name. Handy for short operations like sorting keys.",
      },
      // lists
      {
        syntax: "[item1, item2, item3]",
        example: 'heroes = ["Iron Man", "Thor", "Hulk"]',
        description:
          "Makes an ordered, changeable list. Items can be any type, even mixed.",
      },
      {
        syntax: "list.append(item)",
        example: 'heroes.append("Spider-Man")',
        description:
          "Adds one item to the end of a list. Returns None and changes the list in place.",
      },
      {
        syntax: "list[start:stop:step]",
        example: "top3 = heroes[0:3]",
        description:
          "Returns a piece of a list. start is included, stop is not. step picks every Nth item.",
      },
      {
        syntax: "[expr for x in items if cond]",
        example: "squares = [n * n for n in range(5)]",
        description:
          "Builds a new list in one line. Optional if filters which items are included.",
      },
      // dictionaries
      {
        syntax: "{key: value, ...}",
        example: 'car = {"brand": "Tesla", "speed": 250}',
        description:
          "Stores key-value pairs. Keys must be unique and immutable (strings, numbers, tuples).",
      },
      {
        syntax: "dict[key]",
        example: 'speed = car["speed"]',
        description:
          "Gets the value for a key. Use .get(key) to avoid errors if the key might be missing.",
      },
      {
        syntax: ".keys() / .values() / .items()",
        example: "for k, v in car.items(): print(k, v)",
        description:
          "Returns the keys, values, or key-value pairs of a dictionary so you can loop over them.",
      },
      {
        syntax: "{k: v for k, v in items}",
        example: "doubles = {n: n * 2 for n in range(4)}",
        description:
          "Builds a new dictionary in one line from any iterable of pairs.",
      },
      // tuples
      {
        syntax: "(item1, item2)",
        example: "point = (10, 20)",
        description:
          "Ordered and immutable (cannot change). Good for fixed groups like coordinates.",
      },
      {
        syntax: "a, b = tuple",
        example: "x, y = (10, 20)",
        description:
          "Splits a tuple or list into separate variables in one line. The counts must match.",
      },
      // sets
      {
        syntax: "{item1, item2}",
        example: "unique = {1, 2, 3, 2}",
        description:
          "Unordered collection of unique items. Duplicates disappear automatically.",
      },
      {
        syntax: "a & b / a | b / a - b",
        example: "common = a & b",
        description:
          "& is intersection (in both), | is union (in either), - is difference (in a but not b).",
      },
      // strings
      {
        syntax: 'f"...{var}..."',
        example: 'f"Player {name} scored {runs} runs"',
        description:
          "Inserts variables into a string. Use {expression} for any Python expression, like {runs * 2}.",
      },
      {
        syntax: ".upper() / .lower() / .strip() / .split()",
        example: '"Aarav".upper()',
        description:
          "Built-in string tools. Most return a new string and leave the original alone.",
      },
      {
        syntax: "text[start:stop:step]",
        example: '"Minecraft"[0:4]',
        description:
          "Returns part of a string. Same rules as list slicing. Negatives count from the end.",
      },
      // file handling
      {
        syntax: 'open(path, "r")',
        example: 'text = open("notes.txt").read()',
        description:
          "Opens a file for reading. Always close it, or use a with block to close automatically.",
      },
      {
        syntax: 'open(path, "w")',
        example: 'open("score.txt", "w").write("250")',
        description:
          "Opens a file for writing. Mode 'w' overwrites the whole file, mode 'a' appends to the end.",
      },
      {
        syntax: "with open(path) as f:\n    ...",
        example: 'with open("score.txt") as f:\n    data = f.read()',
        description:
          "Opens a file and closes it automatically when the block ends. The safest way to read or write.",
      },
      // exceptions
      {
        syntax: "try:\n    ...\nexcept Error:\n    ...",
        example: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("Not a number")',
        description:
          "Catches an error so your program does not crash. Match the error type to handle it cleanly.",
      },
      {
        syntax: "try:\n    ...\nexcept:\n    ...\nfinally:\n    ...",
        example: "try:\n    f = open('x.txt')\nfinally:\n    print('Done')",
        description:
          "finally always runs, whether or not an error happened. Good for cleanup like closing files.",
      },
      {
        syntax: 'raise Error("msg")',
        example: 'raise ValueError("runs must be positive")',
        description:
          "Throws an error on purpose. Use it to signal problems in your own functions.",
      },
    ],
  },

  // ============================================================
  // SECTION 2: LLM Glossary (Days 16-25)
  // ============================================================
  {
    id: "llm-glossary",
    title: "LLM Glossary",
    description: "All AI terms from Days 16-25, alphabetically sorted.",
    kind: "glossary",
    items: [
      {
        term: "AI Agent",
        description:
          "An AI program that can plan steps, call tools, and finish a task on its own. Think of it like Spider-Man swinging between rooftops, hopping from one tool to another until the job is done.",
      },
      {
        term: "Attention",
        description:
          "A mechanism that lets a model focus on the most relevant parts of the input when producing each word. It is the secret sauce that made Transformers so powerful.",
      },
      {
        term: "Chat Prompt",
        description:
          "A list of messages (system, user, assistant) sent to a chat model. The model replies to the latest user message using the conversation history as context.",
      },
      {
        term: "Context Window",
        description:
          "The maximum number of tokens a model can read and remember at once. Larger windows let you paste long documents, smaller windows force you to summarize.",
      },
      {
        term: "Deep Learning",
        description:
          "Machine learning that uses many layers of neurons stacked together. The deeper the stack, the more complex patterns (like iPhone camera scenes or cricket shot styles) it can learn.",
      },
      {
        term: "Embedding",
        description:
          "A list of numbers that captures the meaning of a word, sentence, or image. Similar meanings end up close together in this number space.",
      },
      {
        term: "Fine-tuning",
        description:
          "Training a model a little more on your own data so it sounds like you or knows your topic. Cheaper and faster than training from scratch.",
      },
      {
        term: "Hallucination",
        description:
          "When a model confidently states something that is not true. Always check important facts (like iPhone specs or cricket stats) yourself before trusting them.",
      },
      {
        term: "LLM",
        description:
          "Large Language Model. A huge neural network trained on lots of text to predict the next token, which makes it able to chat, write, and reason.",
      },
      {
        term: "Machine Learning",
        description:
          "Teaching computers to learn patterns from examples instead of fixed rules. The more good data you give, the better the model gets.",
      },
      {
        term: "MCP",
        description:
          "Model Context Protocol. An open standard that lets an AI model call external tools and read resources through a common interface.",
      },
      {
        term: "Neural Network",
        description:
          "A model inspired by the brain, made of layers of connected neurons. Each connection has a weight that gets adjusted during training.",
      },
      {
        term: "Parameter",
        description:
          "A number inside the model that gets adjusted during training. The total count of parameters (like 7B or 70B) hints at how powerful the model is.",
      },
      {
        term: "Prompt Engineering",
        description:
          "The skill of writing clear instructions that get good answers from a model. Small wording changes can produce very different results.",
      },
      {
        term: "RAG",
        description:
          "Retrieval-Augmented Generation. The model first searches a knowledge base for relevant text, then answers using that text. Helps reduce hallucinations.",
      },
      {
        term: "REST API",
        description:
          "A way for programs to talk over the web using URLs and HTTP methods like GET and POST. OpenRouter and most LLM providers expose a REST API.",
      },
      {
        term: "System Prompt",
        description:
          "The first message that sets the model's role, tone, and rules. Example: 'You are a friendly cricket coach for a 13-year-old player.'",
      },
      {
        term: "Temperature",
        description:
          "A number (usually 0 to 1) that controls randomness. Low values give steady, repeatable answers, high values give creative, varied answers.",
      },
      {
        term: "Token",
        description:
          "A small chunk of text (a word piece or even a single character). Models read and write tokens, and pricing is usually per 1,000 tokens.",
      },
      {
        term: "Transformer",
        description:
          "The neural network architecture behind almost all modern LLMs. Built on attention, it can process long text in parallel instead of word by word.",
      },
      {
        term: "Vector Database",
        description:
          "A database that stores embeddings and can find the most similar ones fast. Used in RAG to pull the right context for a question.",
      },
    ],
  },

  // ============================================================
  // SECTION 3: OpenRouter Free Models
  // ============================================================
  {
    id: "openrouter-models",
    title: "OpenRouter Free Models",
    description: "Table of free models with name, provider, context window, and strengths.",
    kind: "models",
    items: [
      {
        model: "tencent/hy3:free",
        provider: "Tencent",
        contextWindow: "8K tokens",
        bestFor: "General chat and short answers in English and Chinese.",
        free: true,
      },
      {
        model: "meta-llama/llama-3-8b-instruct:free",
        provider: "Meta",
        contextWindow: "8K tokens",
        bestFor: "General purpose chat, fast and reliable for everyday tasks.",
        free: true,
      },
      {
        model: "google/gemma-2-9b-it:free",
        provider: "Google",
        contextWindow: "8K tokens",
        bestFor: "Reasoning, coding help, and creative writing.",
        free: true,
      },
      {
        model: "mistralai/mistral-7b-instruct:free",
        provider: "Mistral AI",
        contextWindow: "32K tokens",
        bestFor: "Fast chat with a longer context window for bigger prompts.",
        free: true,
      },
      {
        model: "mistralai/mistral-nemo:free",
        provider: "Mistral AI",
        contextWindow: "128K tokens",
        bestFor: "Long documents and big pastes of text, like full Minecraft wiki pages.",
        free: true,
      },
      {
        model: "qwen/qwen-2.5-7b-instruct:free",
        provider: "Qwen (Alibaba)",
        contextWindow: "32K tokens",
        bestFor: "Multilingual chat and code generation in Python and JavaScript.",
        free: true,
      },
      {
        model: "microsoft/phi-3-mini-128k-instruct:free",
        provider: "Microsoft",
        contextWindow: "128K tokens",
        bestFor: "Small and fast model that runs well on low resources.",
        free: true,
      },
      {
        model: "microsoft/phi-3-medium-128k-instruct:free",
        provider: "Microsoft",
        contextWindow: "128K tokens",
        bestFor: "Stronger reasoning than the mini version, still free to use.",
        free: true,
      },
      {
        model: "deepseek/deepseek-r1:free",
        provider: "DeepSeek",
        contextWindow: "64K tokens",
        bestFor: "Math, logic puzzles, and step-by-step reasoning.",
        free: true,
      },
      {
        model: "huggingfaceh4/zephyr-7b-beta:free",
        provider: "Hugging Face",
        contextWindow: "4K tokens",
        bestFor: "Friendly chat tuned for helpful, polite answers.",
        free: true,
      },
    ],
  },

  // ============================================================
  // SECTION 4: LangChain Quick Reference (Days 31-35)
  // ============================================================
  {
    id: "langchain-reference",
    title: "LangChain Quick Reference",
    description: "Main classes and methods used in Days 31-35.",
    kind: "snippets",
    items: [
      {
        term: "ChatPromptTemplate",
        description:
          "Creates a reusable chat prompt with placeholders. You fill the placeholders at runtime with user data like name and question.",
        language: "python",
        code: `from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a cricket coach for {age}-year-old players."),
    ("user", "{question}"),
])

messages = prompt.invoke({"age": 13, "question": "How do I play a cover drive?"})
print(messages)`,
      },
      {
        term: "LLMChain",
        description:
          "Combines a prompt and a model into one runnable step. Older LangChain API, still seen in many tutorials and examples.",
        language: "python",
        code: `from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI

chain = LLMChain(
    llm=ChatOpenAI(model="gpt-4o-mini"),
    prompt=prompt,
)

result = chain.run(age=13, question="What is a googly?")
print(result)`,
      },
      {
        term: "ConversationBufferMemory",
        description:
          "Keeps the full chat history in memory so the model remembers earlier turns. Simple but uses more tokens as the chat grows.",
        language: "python",
        code: `from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory()
memory.save_context({"input": "Hi, I am Aarav"}, {"output": "Hello Aarav!"})
memory.save_context({"input": "I love Minecraft"}, {"output": "Cool, what do you build?"})
print(memory.buffer)`,
      },
      {
        term: "ConversationSummaryMemory",
        description:
          "Summarizes old chat turns into a short paragraph to save tokens. Better than buffer memory for long conversations.",
        language: "python",
        code: `from langchain.memory import ConversationSummaryMemory
from langchain_openai import ChatOpenAI

memory = ConversationSummaryMemory(llm=ChatOpenAI(model="gpt-4o-mini"))
memory.save_context({"input": "I love Minecraft."}, {"output": "Cool, what do you build?"})
print(memory.buffer)`,
      },
      {
        term: "StructuredOutputParser",
        description:
          "Forces the model to return a fixed JSON shape using ResponseSchema rules. Great when you need clean data, not free text.",
        language: "python",
        code: `from langchain_core.output_parsers import StructuredOutputParser, ResponseSchema

schemas = [
    ResponseSchema(name="hero", description="Superhero name"),
    ResponseSchema(name="power", description="Main superpower"),
]

parser = StructuredOutputParser.from_response_schemas(schemas)
print(parser.get_format_instructions())`,
      },
      {
        term: "ResponseSchema",
        description:
          "Defines one field the model must include in its structured answer. You usually pass a list of these to StructuredOutputParser.",
        language: "python",
        code: `from langchain_core.output_parsers import ResponseSchema

schema = ResponseSchema(name="score", description="Cricket score as an integer")
print(schema.name, "-", schema.description)`,
      },
      {
        term: "PydanticOutputParser",
        description:
          "Uses a Pydantic model as the schema for the model's answer. Gives you validation and helpful error messages for free.",
        language: "python",
        code: `from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class Car(BaseModel):
    brand: str
    top_speed: int

parser = PydanticOutputParser(pydantic_object=Car)
print(parser.get_format_instructions())`,
      },
      {
        term: "SimpleSequentialChain",
        description:
          "Runs several chains one after another. The output of chain 1 becomes the input of chain 2, and so on.",
        language: "python",
        code: `from langchain.chains import SimpleSequentialChain

overall = SimpleSequentialChain(chains=[chain1, chain2], verbose=True)
print(overall.run("Tell me a Spider-Man fact"))`,
      },
      {
        term: "LangChain MCP Adapter",
        description:
          "Lets LangChain load tools from any MCP server and use them like normal LangChain tools. Returns a list of Tool objects.",
        language: "python",
        code: `from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient({
    "cricket": {"url": "http://localhost:8000/sse", "transport": "sse"}
})

tools = await client.get_tools()
print([t.name for t in tools])`,
      },
    ],
  },

  // ============================================================
  // SECTION 5: MCP Quick Reference
  // ============================================================
  {
    id: "mcp-reference",
    title: "MCP Quick Reference",
    description: "Concepts, client/server, tools, resources.",
    kind: "snippets",
    items: [
      {
        term: "MCP Server",
        description:
          "A small program that exposes tools and resources to AI clients using the Model Context Protocol over stdio or SSE.",
        language: "python",
        code: `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("cricket-server")

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
      },
      {
        term: "Tool definition",
        description:
          "A function the model can call. Use the @mcp.tool() decorator and add a docstring that explains what the tool does in plain English.",
        language: "python",
        code: `@mcp.tool()
def get_score(team: str) -> str:
    """Return the current score for a cricket team."""
    return f"{team}: 250/4"`,
      },
      {
        term: "Resource definition",
        description:
          "Read-only data the model can fetch, like a file or a URL. Use the @mcp.resource() decorator with a URI template.",
        language: "python",
        code: `@mcp.resource("player://{name}")
def player_info(name: str) -> str:
    """Return info about a cricket player."""
    return f"Player {name}, age 13, right-hand batsman"`,
      },
      {
        term: "Starting a server",
        description:
          "Run the Python file from the terminal. The server listens on stdio (or another transport) for client requests.",
        language: "python",
        code: `# Save as server.py, then run from terminal:
# python server.py

if __name__ == "__main__":
    mcp.run(transport="stdio")`,
      },
      {
        term: "Connecting a client",
        description:
          "Use the MCP client SDK to launch and connect to a server. StdioServerParameters points to the python file to run.",
        language: "python",
        code: `from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

params = StdioServerParameters(command="python", args=["server.py"])

async with stdio_client(params) as (read, write):
    async with ClientSession(read, write) as session:
        await session.initialize()
        print("Connected!")`,
      },
      {
        term: "@mcp.tool() and @mcp.resource() decorators",
        description:
          "Decorators that register a function as an MCP tool or resource. They read the function signature and docstring to build the schema automatically.",
        language: "python",
        code: `@mcp.tool()
def add_runs(a: int, b: int) -> int:
    """Add two cricket run counts together."""
    return a + b`,
      },
      {
        term: "MCPClient (LangChain adapter)",
        description:
          "High-level helper from the LangChain MCP adapter that wraps a session and returns LangChain-compatible Tool objects you can pass to an agent.",
        language: "python",
        code: `from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient({
    "minecraft": {"url": "http://localhost:8000/sse", "transport": "sse"}
})

tools = await client.get_tools()
print(tools)`,
      },
      {
        term: "Listing tools",
        description:
          "Asks the server for all available tools. Returns name, description, and the input schema for each tool.",
        language: "python",
        code: `tools = await session.list_tools()
for tool in tools.tools:
    print(tool.name, "-", tool.description)`,
      },
      {
        term: "Calling a tool",
        description:
          "Invokes a tool by name with arguments. Returns the tool's output, usually as text or JSON content.",
        language: "python",
        code: `result = await session.call_tool("get_score", {"team": "India"})
print(result.content[0].text)`,
      },
    ],
  },

  // ============================================================
  // SECTION 6: Langfuse Quick Reference
  // ============================================================
  {
    id: "langfuse-reference",
    title: "Langfuse Quick Reference",
    description: "Traces, spans, generations, how to read the dashboard.",
    kind: "snippets",
    items: [
      {
        term: "Create a trace",
        description:
          "A trace is the top-level container for one user request. Create one with a name and optional user id so you can find it later.",
        language: "python",
        code: `from langfuse import Langfuse

langfuse = Langfuse()
trace = langfuse.trace(name="cricket-question", user_id="aarav-13")`,
      },
      {
        term: "Add a generation",
        description:
          "A generation is one LLM call inside a trace. Track the model name, prompt, response, and token usage so Langfuse can show stats.",
        language: "python",
        code: `generation = trace.generation(
    name="answer",
    model="gpt-4o-mini",
    input="What is a cover drive?",
    output="A cricket shot played...",
    usage={"input": 5, "output": 20},
)`,
      },
      {
        term: "Add a span",
        description:
          "A span is any step inside a trace that is not an LLM call, like a database lookup or tool call. Use it to time sub-steps.",
        language: "python",
        code: `span = trace.span(name="fetch-player", input={"player": "Virat"})
# ... do work ...
span.end(output={"runs": 80})`,
      },
      {
        term: "CallbackHandler for LangChain",
        description:
          "Drop-in callback that auto-traces LangChain chains and LLM calls. Add it to your chain and Langfuse fills in the dashboard.",
        language: "python",
        code: `from langfuse.callback import CallbackHandler

handler = CallbackHandler(trace_name="minecraft-bot")
result = chain.invoke(
    {"question": "How do I make a pickaxe?"},
    config={"callbacks": [handler]},
)
print(result)`,
      },
      {
        term: "Dashboard contents",
        description:
          "The Langfuse UI shows each trace with its spans and generations, plus latency, token usage, cost, and scores. Drill into a trace to inspect prompts and outputs.",
        language: "python",
        code: `# No code needed. Open https://cloud.langfuse.com or your local
# Langfuse URL and click "Traces" in the sidebar to browse.`,
      },
      {
        term: "Filtering traces",
        description:
          "Filter by name, user id, tags, or time range in the dashboard. Add tags when you create traces to make filtering easy later.",
        language: "python",
        code: `trace = langfuse.trace(
    name="spiderman-quiz",
    user_id="aarav-13",
    tags=["quiz", "marvel"],
)`,
      },
      {
        term: "Token usage tracking",
        description:
          "Pass usage info when you create a generation. Langfuse sums input and output tokens per trace and per model so you can see totals.",
        language: "python",
        code: `trace.generation(
    name="answer",
    model="gpt-4o-mini",
    input="...",
    output="...",
    usage={"input": 120, "output": 45},
)`,
      },
      {
        term: "Latency tracking",
        description:
          "Langfuse times every span and generation automatically. The dashboard shows p50 and p99 latency so you can spot slow steps.",
        language: "python",
        code: `import time

span = trace.span(name="slow-step")
time.sleep(2)
span.end()
# Latency appears in the Langfuse UI next to the span.`,
      },
      {
        term: "Cost tracking",
        description:
          "Langfuse multiplies token usage by model pricing to estimate cost. Set model prices in Settings to enable money totals per trace, user, and day.",
        language: "python",
        code: `# After sending usage on generations, open the Costs tab in the
# Langfuse dashboard to see spend per trace, per user, and per day.`,
      },
    ],
  },

  // ============================================================
  // SECTION 7: Common Errors and Fixes
  // ============================================================
  {
    id: "common-errors",
    title: "Common Errors and Fixes",
    description: "Python errors, API errors, and Pyodide errors with fixes.",
    kind: "errors",
    items: [
      // Python errors
      {
        error: "SyntaxError: invalid syntax",
        meaning:
          "Python could not parse your code. Often a missing colon, quote, or parenthesis.",
        fix: "Check the line Python points at. Add the missing colon after if/for/def, or close the open quote or parenthesis.",
      },
      {
        error: "NameError: name 'spiderman' is not defined",
        meaning: "You used a variable or function name that was never created.",
        fix: "Make sure you spelled the name correctly and defined it above the line that uses it.",
      },
      {
        error: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
        meaning: "You tried to combine two values of incompatible types.",
        fix: 'Convert one side so both match. Example: str(runs) + " runs" or int(score_text).',
      },
      {
        error: "IndexError: list index out of range",
        meaning: "You asked for a list position that does not exist.",
        fix: "Check len(list) first, or loop with for instead of using fixed indexes.",
      },
      {
        error: "KeyError: 'wickets'",
        meaning: "You looked up a dictionary key that is not there.",
        fix: "Use car.get('wickets', 0) so a missing key returns a default instead of crashing.",
      },
      {
        error: "ZeroDivisionError: division by zero",
        meaning: "You divided by zero, which math does not allow.",
        fix: "Check the divisor before dividing. Example: if balls > 0: run_rate = runs / balls.",
      },
      {
        error: "FileNotFoundError: [Errno 2] No such file or directory: 'score.txt'",
        meaning: "You tried to open a file that does not exist at that path.",
        fix: "Check the spelling and the folder. Use a full path or create the file first.",
      },
      {
        error: "ImportError: No module named 'langchain'",
        meaning: "The package you tried to import is not installed in this environment.",
        fix: "Run pip install langchain (or %pip install in a notebook) and try again.",
      },
      {
        error: "ValueError: invalid literal for int() with base 10: 'abc'",
        meaning: "The value has the right type but the wrong content for what you asked.",
        fix: "Validate the input first. Example: if text.isdigit(): n = int(text).",
      },
      {
        error: "IndentationError: expected an indented block",
        meaning:
          "Python expected indented code after a colon line, but found none or found mixed tabs and spaces.",
        fix: "Add four spaces on the next line after a colon. Never mix tabs and spaces in the same file.",
      },
      // API errors
      {
        error: "401 Unauthorized - invalid API key",
        meaning: "Your API key is missing, wrong, or expired.",
        fix: "Check the key in your .env file or settings. Make sure there are no quotes or spaces around it.",
      },
      {
        error: "429 Too Many Requests - rate limit exceeded",
        meaning: "You sent requests too fast and hit the provider's limit.",
        fix: "Slow down, add a delay between calls, or upgrade your plan. Retry with exponential backoff.",
      },
      {
        error: "500 Internal Server Error",
        meaning: "Something broke on the provider's side, not yours.",
        fix: "Wait a minute and try again. If it keeps happening, check the provider's status page.",
      },
      {
        error: "404 Not Found - model not found",
        meaning: "The model name or URL you used does not exist.",
        fix: "Check the model spelling on OpenRouter. Use the exact slug like meta-llama/llama-3-8b-instruct:free.",
      },
      {
        error: "Timeout: request timed out after 30s",
        meaning: "The server did not answer in the time limit.",
        fix: "Increase the timeout setting, send a shorter prompt, or check your internet connection.",
      },
      // Pyodide errors
      {
        error: "Pyodide failed to load: fetch failed",
        meaning: "The browser could not download the Pyodide runtime files.",
        fix: "Check your internet connection and refresh the page. Try a different browser if it keeps failing.",
      },
      {
        error: "ModuleNotFoundError: No module named 'numpy'",
        meaning: "You tried to import a package that is not loaded into Pyodide yet.",
        fix: "Use await pyodide.loadPackagesFromImports(code) or micropip.install('numpy') before importing.",
      },
      {
        error: "ValueError: Can't find a pure Python 3 wheel for 'package'",
        meaning: "The package has no Pyodide-compatible wheel, often because it is a C extension.",
        fix: "Look for a pure-Python alternative, or check the official Pyodide package list for supported packages.",
      },
      {
        error: "Pyodide worker timed out",
        meaning: "Your code ran too long, probably because of an infinite while loop.",
        fix: "Make sure the loop condition can become False. Add a counter or a break statement.",
      },
    ],
  },
  // ============================================================
  // SECTION 8: Git Guide (Getting Started, Commands, Workflows)
  // ============================================================
  {
    id: "git-guide",
    title: "Git Guide",
    description:
      "Complete Git guide: what it is, why we use it, getting started, every essential command, and real-world workflows with examples.",
    kind: "snippets",
    items: [
      {
        term: "What is Git?",
        description:
          "Git is a version control system that tracks changes to your code over time. Think of it as a time machine for your project: you can go back to any previous version, see who changed what, and merge work from multiple people without losing anything. It was created by Linus Torvalds in 2005 (the same person who created Linux).",
      },
      {
        term: "Why use Git?",
        description:
          "Without Git, if you accidentally delete a file or break your code, you lose everything. With Git, every change is saved as a snapshot (called a commit), so you can always recover. Git also lets multiple people work on the same project simultaneously, merging their changes together. Every major tech company (Google, Microsoft, Meta, Amazon) uses Git.",
      },
      {
        term: "Git vs GitHub",
        description:
          "Git is the tool that runs on your computer to track changes. GitHub is a website (github.com) that hosts your Git repositories online so others can see, download, and contribute to your code. Git is local, GitHub is remote. Other alternatives to GitHub include GitLab and Bitbucket.",
      },
      {
        term: "Step 1: Install Git",
        description:
          "Download Git from git-scm.com. On Windows, it comes with Git Bash (a terminal). On Mac, run 'brew install git' or install Xcode Command Line Tools. On Linux, run 'sudo apt install git'. Verify with 'git --version'.",
        code: "git --version",
        language: "bash",
      },
      {
        term: "Step 2: Configure your name and email",
        description:
          "Git needs to know who you are so it can label your commits. Run these once on any new computer. Use the same email as your GitHub account.",
        code: 'git config --global user.name "Your Name"\ngit config --global user.email "your.email@example.com"',
        language: "bash",
      },
      {
        term: "Step 3: Create a new repository",
        description:
          "A repository (or 'repo') is a folder that Git tracks. Navigate to your project folder and run 'git init' to start tracking. This creates a hidden .git folder that stores all the history.",
        code: "mkdir my-project\ncd my-project\ngit init",
        language: "bash",
      },
      {
        term: "git status",
        description:
          "Shows the current state of your repository: which files are modified, which are staged (ready to commit), and which branch you are on. Run this often to understand what is happening.",
        code: "git status",
        language: "bash",
      },
      {
        term: "git add",
        description:
          "Stages changes (prepares them to be committed). Use 'git add filename' for one file, or 'git add .' for all changed files. Staging lets you choose exactly which changes to include in the next commit.",
        code: "git add hello.py\ngit add .",
        language: "bash",
      },
      {
        term: "git commit",
        description:
          "Saves a snapshot of your staged changes with a message describing what you did. Always write clear messages in the imperative mood (like 'Add login feature', not 'Added login feature').",
        code: 'git commit -m "Add hello world program"',
        language: "bash",
      },
      {
        term: "git log",
        description:
          "Shows the history of all commits: who made each one, when, and the message. Use '--oneline' for a compact view. Press 'q' to exit the log viewer.",
        code: "git log\ngit log --oneline",
        language: "bash",
      },
      {
        term: "git diff",
        description:
          "Shows what you changed but have not committed yet. Use 'git diff --staged' to see staged changes. This helps you review your work before committing.",
        code: "git diff\ngit diff --staged",
        language: "bash",
      },
      {
        term: "Connecting to GitHub (git remote)",
        description:
          "To push your local repo to GitHub, first create a new repo on github.com (do not add a README). Then link your local repo to the remote with 'git remote add origin'. 'origin' is the conventional name for the default remote.",
        code: "git remote add origin https://github.com/username/my-project.git",
        language: "bash",
      },
      {
        term: "git push",
        description:
          "Uploads your local commits to the remote repository (GitHub). The '-u' flag sets the upstream, so next time you can just type 'git push'. The first push needs the branch name.",
        code: "git push -u origin main",
        language: "bash",
      },
      {
        term: "git pull",
        description:
          "Downloads changes from the remote and merges them into your local repo. Always run 'git pull' before you start working, so you have the latest changes from your teammates.",
        code: "git pull origin main",
        language: "bash",
      },
      {
        term: "git clone",
        description:
          "Downloads a copy of a remote repository to your computer. Use this when you want to work on someone else's project. You get the full history, not just the latest files.",
        code: "git clone https://github.com/username/project.git",
        language: "bash",
      },
      {
        term: "Branches: git branch and git checkout",
        description:
          "A branch is a parallel version of your repo. You create a branch to work on a feature without affecting the main code. 'git branch feature' creates it, 'git checkout feature' switches to it. The '-b' flag creates and switches in one step.",
        code: "git branch feature-login\ngit checkout feature-login\ngit checkout -b feature-login",
        language: "bash",
      },
      {
        term: "git merge",
        description:
          "Combines changes from one branch into another. First switch to the target branch (usually main), then merge the feature branch. If there are conflicts, Git will pause and ask you to resolve them manually.",
        code: "git checkout main\ngit merge feature-login",
        language: "bash",
      },
      {
        term: "Resolving merge conflicts",
        description:
          "When two branches change the same line, Git cannot auto-merge. It marks the conflict with <<<<<<<, =======, and >>>>>>>. Open the file, choose which version to keep (or combine them), delete the markers, then 'git add' and 'git commit'.",
        code: "<<<<<<< HEAD\nprint(\"Hello from main\")\n=======\nprint(\"Hello from feature\")\n>>>>>>> feature-login",
        language: "bash",
      },
      {
        term: "git stash",
        description:
          "Temporarily saves your uncommitted changes so you can switch branches without losing work. Use 'git stash pop' to bring them back. Think of it as putting your work in a drawer.",
        code: "git stash\ngit checkout main\ngit checkout feature\ngit stash pop",
        language: "bash",
      },
      {
        term: "git reset",
        description:
          "Undoes commits. Use '--soft' to undo the commit but keep your changes staged. Use '--hard' to undo the commit AND delete all changes (be careful, this is permanent). Never use --hard on commits you have already pushed.",
        code: 'git reset --soft HEAD~1\ngit reset --hard HEAD~1',
        language: "bash",
      },
      {
        term: "git revert",
        description:
          "Creates a new commit that undoes a previous commit. Safer than reset because it does not rewrite history. Use this when you have already pushed the commit you want to undo.",
        code: "git revert abc1234",
        language: "bash",
      },
      {
        term: ".gitignore file",
        description:
          "A text file that tells Git which files to ignore (not track). Put sensitive files (like .env with API keys), build outputs (like __pycache__ or node_modules), and OS files (like .DS_Store) in here. Create it in the root of your repo.",
        code: ".env\n__pycache__/\nnode_modules/\n*.pyc\n.DS_Store\nvenv/",
        language: "bash",
      },
      {
        term: "Fork and Pull Request workflow",
        description:
          "The standard way to contribute to open source. 1) Fork the repo on GitHub (creates your copy). 2) Clone your fork. 3) Create a branch, make changes, commit. 4) Push to your fork. 5) Open a Pull Request on the original repo asking them to merge your changes.",
        code: "git clone https://github.com/YOUR-USERNAME/project.git\ncd project\ngit checkout -b fix-typo\n# make changes\ngit add .\ngit commit -m 'Fix typo in README'\ngit push origin fix-typo\n# then open a Pull Request on GitHub",
        language: "bash",
      },
      {
        term: "Common workflow: the daily cycle",
        description:
          "Every time you sit down to code: 1) git pull (get latest). 2) Create a branch for your feature. 3) Code, git add, git commit (repeat). 4) git push. 5) Open a Pull Request. 6) After merge, switch back to main and pull again.",
        code: "git pull origin main\ngit checkout -b my-feature\n# ...code...\ngit add .\ngit commit -m 'Add my feature'\ngit push origin my-feature",
        language: "bash",
      },
      {
        term: "Viewing remote repositories",
        description:
          "Shows all remote repositories linked to your local repo. 'origin' is the default name. Use '-v' for verbose (shows the URL). This helps when you need to check where your code is being pushed.",
        code: "git remote -v",
        language: "bash",
      },
      {
        term: "git tag",
        description:
          "Marks a specific commit as important, usually for version releases. Tags are like bookmarks for specific points in history. Use annotated tags with '-a' for releases.",
        code: 'git tag -a v1.0 -m "First release"\ngit push origin v1.0',
        language: "bash",
      },
      {
        term: "Git cheat sheet summary",
        description:
          "The 10 commands you will use 90 percent of the time: git status, git add, git commit, git push, git pull, git clone, git branch, git checkout, git merge, git log. Master these first.",
        code: "git status      # see what changed\ngit add .       # stage all changes\ngit commit -m   # save a snapshot\ngit push        # upload to GitHub\ngit pull        # download latest",
        language: "bash",
      },
    ],
  },
];
