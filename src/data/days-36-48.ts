import type { Day } from "@/types";

export const days36to48: Day[] = [
  // ============================================================
  // DAY 36: What is MCP (Model Context Protocol)?
  // ============================================================
  {
    dayNumber: 36,
    title: "What is MCP (Model Context Protocol)?",
    phase: "practical",
    objectives: [
      "Explain what MCP is and why it was created",
      "Describe the problem MCP solves for AI tools",
      "Understand the client-server model used by MCP",
      "Compare MCP to the USB standard using a simple analogy",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "What is MCP?",
      },
      {
        type: "paragraph",
        text: "MCP stands for Model Context Protocol. It is an open standard that lets Large Language Models (LLMs) talk to external tools and data sources in a consistent way. Think of MCP as a universal plug that any AI app and any tool can use to connect to each other. Aarav can build one tool, plug it into any MCP-aware LLM, and it just works.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Problem Before MCP",
      },
      {
        type: "paragraph",
        text: "Before MCP, every AI app had to write custom code to connect to each tool. If you wanted an LLM to check the weather, read a file, or query a database, you wrote a different adapter for each one. Suppose Aarav built a cricket app that called an LLM to summarize a match and also pulled scores from a live API. Each tool needed its own glue code, and switching from one LLM to another meant rewriting that glue.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Real-world analogy: USB",
        text: "Think about old printers and keyboards. Before USB, every printer came with its own cable and driver. You could not just plug any printer into any computer. MCP fixes the same problem for AI: instead of custom cables for every tool, MCP gives one standard plug.",
      },
      {
        type: "heading",
        level: 3,
        text: "What MCP Standardizes",
      },
      {
        type: "paragraph",
        text: "MCP defines a common protocol so an LLM app and a tool provider can speak the same language. The LLM app can ask: what tools do you have? The server replies: I have get_weather, calculator, and get_time. The LLM can then call any of those tools through a single, predictable format.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "A common way to list tools that a server provides",
          "A common way to describe each tool (its name, description, and parameters)",
          "A common way to call a tool and receive its result",
          "A common way to expose resources (read-only data the LLM can read)",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "The Client-Server Model",
      },
      {
        type: "paragraph",
        text: "MCP follows a client-server model. The LLM app (for example, your Python program using LangChain) runs an MCP Client. The tool provider (for example, a weather service) runs an MCP Server. The client asks the server what tools exist, and calls them on behalf of the LLM.",
      },
      {
        type: "table",
        headers: ["Role", "Who runs it", "Job"],
        rows: [
          ["MCP Client", "Your LLM app", "Discover tools, call them, return results to the LLM"],
          ["MCP Server", "Tool provider", "Expose tools and resources, execute them when called"],
          ["LLM", "OpenRouter model", "Decide which tool to call and with what arguments"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "How the Pieces Connect",
      },
      {
        type: "paragraph",
        text: "The diagram below shows the data flow. Your LLM app talks to the MCP Client. The Client talks to the MCP Server. The Server talks to the real external tool. Results flow back the same way.",
      },
      {
        type: "mermaid",
        code: `graph LR
    A["LLM App (your code)"] <--> B["MCP Client"]
    B <--> C["MCP Server"]
    C <--> D["External Tool (weather, time, calc)"]`,
        caption: "The MCP data flow: LLM App talks to an MCP Client, which talks to an MCP Server, which talks to the real tool.",
      },
      {
        type: "heading",
        level: 3,
        text: "The USB Analogy in Detail",
      },
      {
        type: "paragraph",
        text: "Before USB, a printer used a parallel port, a mouse used a PS/2 port, a keyboard used a different connector, and a joystick used a game port. Each device needed its own driver. USB replaced all of this with one standard plug and one standard protocol. MCP does the same for AI tools: one protocol, any tool, any LLM.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Remember the one-liner",
        text: "MCP is to AI tools what USB is to computer peripherals. One standard plug, many devices.",
      },
      {
        type: "heading",
        level: 3,
        text: "A First Look at MCP in Code",
      },
      {
        type: "paragraph",
        text: "Here is a tiny conceptual example so you can see the shape of MCP code. Real MCP servers use the mcp Python package, which we install on Day 37. For now, just read the code and notice how tools are listed and called.",
      },
      {
        type: "code",
        language: "python",
        caption: "Conceptual MCP shape (not runnable yet, we install mcp on Day 37)",
        code: `# Pseudo-code: shape of an MCP server
# A server exposes TOOLS (functions the LLM can call)
# and RESOURCES (data the LLM can read)

tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "city": {"type": "string", "description": "City name like Delhi"}
        }
    },
    {
        "name": "get_time",
        "description": "Get the current time",
        "parameters": {}
    }
]

# The client (inside the LLM app) does roughly this:
# 1. Ask the server: "list your tools"
# 2. Pass the tool list to the LLM
# 3. The LLM picks one and returns arguments
# 4. The client calls the tool on the server
# 5. The result goes back to the LLM

print("This server exposes", len(tools), "tools")
for t in tools:
    print("-", t["name"], ":", t["description"])`,
      },
      {
        type: "paragraph",
        text: "Run the conceptual snippet and you will see the two tools listed. The real version uses async functions and the mcp SDK, but the idea is the same: expose tools, let the LLM pick one, call it, return the result.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "MCP matters because it lets Aarav swap tools and LLMs without rewriting code. A weather tool written once can be used by any MCP-aware app. This is exactly the kind of standardization that made USB succeed, and it is why companies like Anthropic (the makers of Claude) open-sourced MCP in 2024.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Less glue code: write a tool once, plug it into many apps",
          "Easy swapping: change LLM or change tool without rewriting everything",
          "Open standard: anyone can build an MCP server or client",
        ],
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The MCP Python package is not in Pyodide, so read this code to learn the real API. The conceptual snippet above runs in the playground because it is plain Python with no mcp dependency.",
    expectedOutput:
      "Prints: This server exposes 2 tools, then lists get_weather and get_time with their descriptions.",
    debugging: [
      "If you see ModuleNotFoundError: mcp, that is expected in the browser. The real mcp package runs on your local machine, not in Pyodide.",
      "If the conceptual snippet does not print, check that the tools list is not empty.",
      "Remember: tools are functions the LLM can call. Resources are read-only data. Do not mix them up.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "List 3 tools an MCP server for a cricket app might expose (for example, get_live_score).",
        hint: "Think about what a cricket fan wants: scores, player stats, match schedule.",
      },
      {
        id: 2,
        difficulty: "easy",
        description: "In your own words, explain why MCP is like USB.",
        hint: "Mention custom cables before USB and custom glue code before MCP.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Draw (on paper) the MCP client-server diagram for a Spider-Man fan app that uses a Marvel API tool.",
        hint: "LLM App -> MCP Client -> MCP Server -> Marvel API.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Research online: list two real MCP servers (for example, filesystem, slack, github) and what tools they expose.",
        hint: "Search the official MCP servers GitHub repo.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does MCP stand for?",
        options: [
          "Model Context Protocol",
          "Machine Control Program",
          "Multi-Client Pipeline",
          "Memory Cache Protocol",
        ],
        correct: 0,
        explanation:
          "MCP stands for Model Context Protocol, an open standard for connecting LLMs to tools and data.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "Before MCP, every AI tool needed its own custom connection code.",
        correctBool: true,
        explanation:
          "True. Each tool needed custom glue code, which is the problem MCP solves.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "In the MCP model, your LLM app runs the ______, which talks to MCP servers.",
        answer: "MCP Client",
        explanation:
          "The LLM app runs the MCP Client. The tool provider runs the MCP Server.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which of the following is NOT something MCP standardizes?",
        options: [
          "Listing tools a server provides",
          "Calling a tool and getting a result",
          "Training a new LLM from scratch",
          "Describing tool parameters",
        ],
        correct: 2,
        explanation:
          "MCP standardizes tool discovery, calling, and parameter description. It has nothing to do with training LLMs.",
      },
      {
        id: 5,
        type: "fill-blank",
        question:
          "MCP is to AI tools what ____ is to printers and keyboards.",
        answer: "USB",
        explanation:
          "USB standardized the plug for peripherals. MCP standardizes the plug for AI tools.",
      },
    ],
    teacherNotes:
      "Day 36 is conceptual. The goal is for Aarav to internalize the USB analogy and the client-server shape. Do not run real MCP code yet, that starts on Day 37. Use the cricket and Spider-Man examples to make it stick. Ask Aarav to name three tools he wishes his favorite game (Minecraft or Roblox) exposed as MCP tools.",
    explainToFriend:
      "MCP is a universal plug for AI tools. Before MCP, every AI app needed custom code to talk to every tool. Now, with MCP, any tool can plug into any LLM. It is exactly like how USB replaced a dozen different cables with one standard plug.",
    realWorldExamples: [
      "Anthropic open-sourced MCP in 2024 for Claude and other LLMs.",
      "An MCP server can expose a filesystem, so an LLM can read your files safely.",
      "GitHub, Slack, and Google Drive all have community MCP servers.",
    ],
    thingsToGoogle: [
      "Model Context Protocol Anthropic",
      "MCP vs function calling",
      "USB standard history",
    ],
  },

  // ============================================================
  // DAY 37: MCP Basics
  // ============================================================
  {
    dayNumber: 37,
    title: "MCP Basics: Tools, Resources, and the Client",
    phase: "practical",
    objectives: [
      "Install the MCP Python package",
      "Explain what an MCP server exposes (tools and resources)",
      "Describe what an MCP client does",
      "Read a simple conceptual MCP example end to end",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Installing the MCP Python Package",
      },
      {
        type: "paragraph",
        text: "On your local machine (not in the browser playground), you install the MCP Python SDK with pip. Open a terminal and run the command below. This brings in the mcp package, which gives you the Server and Client classes.",
      },
      {
        type: "code",
        language: "bash",
        caption: "Install the MCP Python SDK (run in your local terminal)",
        code: `pip install mcp`,
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Do not try to install mcp inside the Pyodide playground. It will fail. Run this on your laptop or in a Replit project that supports native Python packages.",
      },
      {
        type: "heading",
        level: 3,
        text: "What an MCP Server Looks Like",
      },
      {
        type: "paragraph",
        text: "An MCP server exposes two main things: tools and resources. A tool is a function the LLM can call (for example, get_weather). A resource is read-only data the LLM can read (for example, a list of cricket players). The server describes each tool with a name, a description, and a parameter schema.",
      },
      {
        type: "table",
        headers: ["Concept", "What it is", "Example"],
        rows: [
          ["Tool", "A function the LLM can call", "get_weather(city)"],
          ["Resource", "Read-only data the LLM can read", "cricket_players.txt"],
          ["Parameter schema", "What arguments a tool needs", "city: string"],
          ["Prompt", "A reusable prompt template", "summarize_match(scorecard)"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "What an MCP Client Does",
      },
      {
        type: "paragraph",
        text: "The MCP Client lives inside your LLM app. It does four jobs: connect to one or more servers, list the tools each server exposes, call a tool when the LLM asks for it, and return the result back to the LLM. The client hides all the wire details so the LLM only sees a flat list of tools.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Connect to one or more MCP servers",
          "List the tools each server exposes",
          "Call a tool when the LLM decides to use it",
          "Return the result to the LLM so it can answer the user",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "A Conceptual End-to-End Example",
      },
      {
        type: "paragraph",
        text: "Below is a complete conceptual example using plain Python. It mimics the shape of MCP without the real SDK, so it runs anywhere (including the playground). Read it carefully, because Day 38 builds a real MCP server using the same shape.",
      },
      {
        type: "code",
        language: "python",
        caption: "Conceptual MCP server and client in plain Python (runs anywhere)",
        code: `# Conceptual MCP shape: a fake server and a fake client
# Real MCP uses the mcp package, but the idea is identical.

class FakeMCPServer:
    """Pretends to be an MCP server. Exposes tools as a dictionary."""
    def __init__(self):
        self.tools = {
            "get_cricket_score": {
                "description": "Get the live score for a cricket match",
                "parameters": {"match_id": "string"}
            },
            "get_time": {
                "description": "Get the current time",
                "parameters": {}
            }
        }

    def list_tools(self):
        return self.tools

    def call_tool(self, name, arguments):
        if name == "get_cricket_score":
            return f"India vs Australia: India 245/4 in 38 overs (match {arguments['match_id']})"
        elif name == "get_time":
            return "Current time: 7:15 PM"
        return "Unknown tool"


class FakeMCPClient:
    """Pretends to be an MCP client inside an LLM app."""
    def __init__(self, server):
        self.server = server

    def discover(self):
        return self.server.list_tools()

    def call(self, name, arguments):
        return self.server.call_tool(name, arguments)


# Wire it up like a real MCP app would
server = FakeMCPServer()
client = FakeMCPClient(server)

# Step 1: discover tools (the LLM app does this at startup)
print("Discovered tools:")
for tool_name, info in client.discover().items():
    print(f"  - {tool_name}: {info['description']}")

# Step 2: pretend the LLM decided to call get_cricket_score
print("\\nCalling get_cricket_score...")
result = client.call("get_cricket_score", {"match_id": "ind-aus-2024"})
print("Tool result:", result)

# Step 3: pretend the LLM also called get_time
print("\\nCalling get_time...")
result = client.call("get_time", {})
print("Tool result:", result)`,
      },
      {
        type: "heading",
        level: 3,
        text: "Reading the Example",
      },
      {
        type: "paragraph",
        text: "Notice the shape. The server knows about its tools and how to run them. The client knows how to discover and call tools. The LLM app (not shown here) would receive the tool list, decide which to call, and pass the result back to the LLM. This is exactly the pattern Day 38 will use with the real mcp package.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why split client and server?",
        text: "Separation lets the server live anywhere (your laptop, a remote machine, even another language). The client just needs to know how to speak MCP. This is how MCP enables the USB-like universal plug.",
      },
      {
        type: "heading",
        level: 3,
        text: "Tools vs Resources vs Prompts",
      },
      {
        type: "paragraph",
        text: "MCP servers can expose three kinds of things. Tools are functions the LLM calls. Resources are read-only data the LLM reads (like a file or a database snapshot). Prompts are reusable prompt templates. Most beginners only need tools, but it helps to know the other two exist.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Tools: get_weather, calculator, get_time (the LLM calls these)",
          "Resources: a list of Minecraft blocks, a Spider-Man character sheet (the LLM reads these)",
          "Prompts: a template like 'summarize this cricket match' (the LLM fills these in)",
        ],
      },
      {
        type: "paragraph",
        text: "On Day 38 we will build a real MCP server with three tools. On Day 39 we will connect it to LangChain so an LLM can call those tools automatically.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The conceptual example uses only plain Python classes, so it runs in the Pyodide playground too. To install the real mcp package, run pip install mcp in a local terminal.",
    expectedOutput:
      "Prints the two discovered tools (get_cricket_score and get_time), then prints the result of calling each tool, including a fake cricket score and a current time.",
    debugging: [
      "If pip install mcp fails in the browser, that is expected. Use a local Python environment.",
      "If your fake client cannot find a tool, check that the tool name matches the key in the tools dictionary.",
      "Remember: tools are called with arguments. Resources are just read. Do not pass arguments to a resource.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Modify the FakeMCPServer to add a third tool: get_roblocks_tips() that returns a Roblox building tip.",
        hint: "Add a new key to self.tools and a new branch in call_tool.",
      },
      {
        id: 2,
        difficulty: "easy",
        description:
          "List one tool and one resource an MCP server for a Minecraft mod might expose.",
        hint: "Tool: get_block_info. Resource: list_of_recipes.txt.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "In the conceptual example, add a parameter schema for get_time that takes a timezone string.",
        hint: "Change parameters from {} to {'timezone': 'string'}.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Write a paragraph (5 sentences) explaining the difference between an MCP tool and an MCP resource.",
        hint: "Tools are functions you call. Resources are data you read.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which command installs the MCP Python SDK?",
        options: ["pip install mcp", "npm install mcp", "pip get mcp", "apt install mcp"],
        correct: 0,
        explanation: "pip install mcp is the correct command for the Python SDK.",
      },
      {
        id: 2,
        type: "true-false",
        question: "An MCP resource is a function the LLM can call.",
        correctBool: false,
        explanation:
          "False. A resource is read-only data. A tool is a function the LLM can call.",
      },
      {
        id: 3,
        type: "code-output",
        question:
          "What does the conceptual example print on the first call to client.call?",
        code: `client.call("get_cricket_score", {"match_id": "ind-aus-2024"})`,
        answer:
          "India vs Australia: India 245/4 in 38 overs (match ind-aus-2024)",
        explanation:
          "The server returns the cricket score string with the match_id interpolated in.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What are the three things an MCP server can expose?",
        options: [
          "Tools, resources, prompts",
          "Functions, classes, objects",
          "Inputs, outputs, errors",
          "Users, sessions, tokens",
        ],
        correct: 0,
        explanation: "MCP servers expose tools, resources, and prompts.",
      },
      {
        id: 5,
        type: "fill-blank",
        question:
          "The MCP ______ lives inside your LLM app and calls tools on the server.",
        answer: "Client",
        explanation:
          "The MCP Client runs inside the LLM app and talks to MCP servers.",
      },
    ],
    teacherNotes:
      "Day 37 is the bridge from concept to code. Make sure Aarav understands the three primitives (tools, resources, prompts) and can describe what the client does. The conceptual example is intentionally plain Python so it runs in the playground. Tell Aarav that Day 38 will use the real mcp package locally, not in the browser.",
    explainToFriend:
      "An MCP server is like a restaurant menu. It lists tools (functions the LLM can order) and resources (dishes the LLM can read about). The MCP client is the waiter: it takes the order from the LLM, walks to the kitchen (server), brings back the dish (result), and serves it to the LLM.",
    realWorldExamples: [
      "A filesystem MCP server exposes files as resources.",
      "A Slack MCP server exposes send_message as a tool.",
      "A GitHub MCP server exposes create_issue as a tool.",
    ],
    thingsToGoogle: [
      "mcp python sdk install",
      "MCP tools vs resources",
      "MCP server examples github",
    ],
  },

  // ============================================================
  // DAY 38: Building a Simple MCP Server
  // ============================================================
  {
    dayNumber: 38,
    title: "Building a Simple MCP Server",
    phase: "practical",
    objectives: [
      "Create an MCP server with three tools",
      "Define a parameter schema for each tool",
      "Explain every line of the server code",
      "Test the server standalone",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Our First Real MCP Server",
      },
      {
        type: "paragraph",
        text: "Today we build a real MCP server with three tools: get_weather(city), calculator(operation, a, b), and get_time(). Each tool has a name, a description, and a parameter schema. The schema tells the LLM what arguments to pass. By the end of this lesson, the server will run and answer tool calls.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Where to run this",
        text: "This code uses the real mcp package, which does not run in the Pyodide playground. Run it on your laptop or in a Replit native Python project. The conceptual examples from Day 37 still work in the playground if you want to review.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Three Tools We Will Build",
      },
      {
        type: "table",
        headers: ["Tool", "Parameters", "Returns"],
        rows: [
          ["get_weather", "city (string)", "Dummy weather for the city"],
          ["calculator", "operation, a, b", "Result of basic math"],
          ["get_time", "(none)", "Current time as a string"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "The Complete Server Code",
      },
      {
        type: "paragraph",
        text: "Below is the full server. We use the FastMCP helper from the mcp SDK, which makes it easy to register tools with decorators. Save this file as server.py and we will run it next.",
      },
      {
        type: "code",
        language: "python",
        caption: "server.py: a complete MCP server with three tools",
        code: `# server.py
# Run on your local machine: python server.py
# Requires: pip install mcp

from mcp.server.fastmcp import FastMCP
from datetime import datetime

# Create the MCP server. FastMCP is a helper that hides boilerplate.
mcp = FastMCP("aarav-tools")


# Tool 1: get_weather(city)
# Returns dummy weather. In real life, you would call a weather API here.
@mcp.tool()
def get_weather(city: str) -> str:
    """Get the current weather for a city.

    Args:
        city: Name of the city, for example 'Delhi' or 'Mumbai'.
    """
    # Fake data for learning. Replace with a real API call later.
    fake_weather = {
        "Delhi": "32C, sunny",
        "Mumbai": "29C, humid",
        "Chennai": "34C, cloudy",
    }
    return fake_weather.get(city, f"Weather data not found for {city}")


# Tool 2: calculator(operation, a, b)
# Supports add, subtract, multiply, divide.
@mcp.tool()
def calculator(operation: str, a: float, b: float) -> str:
    """Do basic math: add, subtract, multiply, divide.

    Args:
        operation: One of 'add', 'subtract', 'multiply', 'divide'.
        a: First number.
        b: Second number.
    """
    if operation == "add":
        result = a + b
    elif operation == "subtract":
        result = a - b
    elif operation == "multiply":
        result = a * b
    elif operation == "divide":
        if b == 0:
            return "Error: cannot divide by zero"
        result = a / b
    else:
        return f"Error: unknown operation '{operation}'"
    return f"{a} {operation} {b} = {result}"


# Tool 3: get_time()
# Returns the current time. No parameters needed.
@mcp.tool()
def get_time() -> str:
    """Get the current date and time."""
    now = datetime.now()
    return now.strftime("Current time: %I:%M %p on %B %d, %Y")


# Start the server. This line blocks, so the server runs until you press Ctrl+C.
if __name__ == "__main__":
    print("Starting MCP server 'aarav-tools' with 3 tools...")
    print("  - get_weather(city)")
    print("  - calculator(operation, a, b)")
    print("  - get_time()")
    mcp.run()`,
      },
      {
        type: "heading",
        level: 3,
        text: "Explaining Every Line",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Line 1 to 3: imports. FastMCP is the helper class. datetime gives us the current time.",
          "mcp = FastMCP('aarav-tools'): creates a server named aarav-tools. The name shows up in logs.",
          "@mcp.tool(): a decorator. It registers the function below as an MCP tool.",
          "def get_weather(city: str) -> str: the function signature. Type hints become the parameter schema automatically.",
          "The docstring (triple quotes) becomes the tool description. The LLM reads this to decide when to call the tool.",
          "fake_weather.get(city, ...): a dictionary lookup with a fallback message.",
          "calculator: uses if/elif to pick the operation. The LLM passes 'add' or 'subtract' etc.",
          "if b == 0: guards against division by zero, a classic bug.",
          "get_time: uses datetime.now() and strftime to format the time nicely.",
          "if __name__ == '__main__': only runs when you execute this file directly.",
          "mcp.run(): starts the server. It blocks forever, listening for tool calls.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why type hints matter",
        text: "FastMCP turns your Python type hints into the parameter schema the LLM sees. If you write city: str, the LLM knows to pass a string. If you write a: float, it knows to pass a number. Always add type hints to MCP tools.",
      },
      {
        type: "heading",
        level: 3,
        text: "Testing the Server Standalone",
      },
      {
        type: "paragraph",
        text: "Before we connect an LLM, we should test the tools work. Below is a small test script that imports the tools and calls them directly. Save it as test_server.py in the same folder as server.py.",
      },
      {
        type: "code",
        language: "python",
        caption: "test_server.py: test the tools without an LLM",
        code: `# test_server.py
# Run with: python test_server.py

# Import the tool functions directly from server.py
# (mcp.run() is only called when server.py is the main file)
from server import get_weather, calculator, get_time

print("Test 1: get_weather('Delhi')")
print("  Result:", get_weather("Delhi"))

print("\\nTest 2: get_weather('Mumbai')")
print("  Result:", get_weather("Mumbai"))

print("\\nTest 3: calculator('add', 7, 5)")
print("  Result:", calculator("add", 7, 5))

print("\\nTest 4: calculator('divide', 20, 4)")
print("  Result:", calculator("divide", 20, 4))

print("\\nTest 5: calculator('divide', 10, 0)")
print("  Result:", calculator("divide", 10, 0))

print("\\nTest 6: get_time()")
print("  Result:", get_time())

print("\\nAll tests passed!")`,
      },
      {
        type: "heading",
        level: 3,
        text: "What You Should See",
      },
      {
        type: "paragraph",
        text: "Run python test_server.py and you should see all six tests print their results. If any test fails, fix the bug before moving on. Day 39 will connect this server to LangChain so an LLM can call these tools automatically.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Watch out for this",
        text: "If you see ImportError: cannot import name 'FastMCP', make sure you ran pip install mcp and you are using Python 3.10 or newer. FastMCP requires modern Python.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "You now have a working MCP server with three real tools. Any MCP-aware LLM app (LangChain, Claude Desktop, Cursor) can discover and call these tools without writing custom glue. That is the USB moment: write the tool once, plug it into anything.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The mcp package is not in Pyodide, so this code does not run in the browser playground. Run it on your laptop: pip install mcp, then python server.py and python test_server.py in a local terminal.",
    expectedOutput:
      "Running test_server.py prints six test results: weather for Delhi and Mumbai, 7 add 5 = 12, 20 divide 4 = 5.0, the divide-by-zero error, and the current time. Ends with 'All tests passed!'.",
    debugging: [
      "ImportError on FastMCP: upgrade pip and reinstall mcp with pip install --upgrade mcp.",
      "If calculator returns 'unknown operation', check the spelling: it must be exactly 'add', 'subtract', 'multiply', or 'divide'.",
      "If get_time shows the wrong time, your system clock is off. The tool uses your local time.",
      "If the server does not start, check that no other program is using the same port.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Add a fourth city to the fake_weather dictionary, for example 'Kolkata'.",
        hint: "Add a new key-value pair to the fake_weather dict.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add a fifth operation to the calculator: 'power' that computes a to the power of b.",
        hint: "Use a ** b in Python and add an elif branch.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Write a new tool get_cricket_fact() that returns a random fun fact about cricket from a list of at least 3 facts.",
        hint: "Use the random module and random.choice(list_of_facts).",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Modify get_weather to take an optional parameter unit ('C' or 'F') and convert the temperature accordingly.",
        hint: "Default unit to 'C'. If 'F', convert using F = C * 9/5 + 32.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the @mcp.tool() decorator do?",
        options: [
          "Runs the function immediately",
          "Registers the function as an MCP tool",
          "Imports the mcp package",
          "Starts the server",
        ],
        correct: 1,
        explanation:
          "The decorator registers the function below it as an MCP tool that the LLM can discover and call.",
      },
      {
        id: 2,
        type: "code-output",
        question: "What does calculator('multiply', 6, 7) return?",
        code: `calculator("multiply", 6, 7)`,
        answer: "6 multiply 7 = 42",
        explanation:
          "The function returns a formatted string with the operation and result. 6 times 7 is 42.",
      },
      {
        id: 3,
        type: "true-false",
        question:
          "FastMCP uses Python type hints to build the parameter schema the LLM sees.",
        correctBool: true,
        explanation:
          "True. Writing city: str tells FastMCP that the city parameter is a string.",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "The function that returns the current date and time is called ______.",
        answer: "get_time",
        explanation: "get_time() takes no arguments and returns the current time as a string.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What happens if you call calculator('divide', 10, 0)?",
        options: [
          "Returns 0",
          "Returns infinity",
          "Returns an error string",
          "Crashes the server",
        ],
        correct: 2,
        explanation:
          "Our code checks for b == 0 and returns 'Error: cannot divide by zero' instead of crashing.",
      },
    ],
    teacherNotes:
      "Day 38 is the first real MCP code. Make sure Aarav runs test_server.py and sees all six tests pass before moving on. The most common mistake is forgetting type hints, which breaks the schema generation. Walk through every line of the server together. Day 39 connects this server to LangChain so an LLM can call the tools automatically.",
    explainToFriend:
      "I built a small server with three tools: get_weather, calculator, and get_time. Each tool has a name, a description (so the LLM knows when to use it), and a parameter schema (so the LLM knows what arguments to pass). Any MCP-aware app can now discover and call these tools, just like any USB device can plug into any computer.",
    realWorldExamples: [
      "A weather MCP server could call the OpenWeatherMap API.",
      "A calculator MCP server could wrap the Python math module.",
      "A time MCP server could return time in multiple timezones.",
    ],
    thingsToGoogle: [
      "FastMCP python example",
      "MCP tool parameter schema",
      "mcp.run() blocking server",
    ],
  },

  // ============================================================
  // DAY 39: Connecting MCP to LangChain
  // ============================================================
  {
    dayNumber: 39,
    title: "Connecting MCP to LangChain",
    phase: "practical",
    objectives: [
      "Use LangChain's MCP adapter to load tools",
      "Let the LLM decide which MCP tool to call",
      "Trace the exact API calls when a tool is used",
      "Build a working chat loop with MCP tools",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "From Server to Smart Assistant",
      },
      {
        type: "paragraph",
        text: "Yesterday we built an MCP server with three tools. Today we connect it to LangChain so an LLM can call those tools automatically. When Aarav asks 'What is the weather in Delhi?', the LLM decides to call get_weather(city='Delhi'), LangChain executes the call, and the LLM turns the result into a natural language answer.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "The magic moment",
        text: "This is the moment AI starts to feel alive. You wrote the tool. The LLM decided when to use it. LangChain wired the two together. No custom glue code. That is the MCP promise.",
      },
      {
        type: "heading",
        level: 3,
        text: "How the Pieces Fit",
      },
      {
        type: "paragraph",
        text: "LangChain has a built-in MCP adapter called load_mcp_tools. It connects to an MCP server, asks for the tool list, and wraps each MCP tool as a LangChain Tool. The LLM then sees those tools and can decide to call them.",
      },
      {
        type: "table",
        headers: ["Component", "Role", "Where it runs"],
        rows: [
          ["OpenRouter LLM", "Decides which tool to call", "OpenRouter cloud"],
          ["LangChain", "Orchestrates the chat and tool calls", "Your Python app"],
          ["MCP Client", "Talks to the MCP server", "Inside your Python app"],
          ["MCP Server", "Runs the actual tools", "Your Python app or a remote machine"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "The Full Sequence of API Calls",
      },
      {
        type: "paragraph",
        text: "Below is the exact sequence of calls that happens when Aarav asks 'What is the weather in Delhi?'. Follow the arrows carefully. The LLM is not calling the tool directly, it tells LangChain what to call, and LangChain asks the MCP Client to actually run it.",
      },
      {
        type: "mermaid",
        code: `sequenceDiagram
    participant U as User
    participant LC as LangChain
    participant LLM as LLM (OpenRouter)
    participant MC as MCP Client
    participant MS as MCP Server
    participant T as Tool
    U->>LC: "What is the weather in Delhi?"
    LC->>LLM: prompt + tool list
    LLM->>LC: call get_weather(city="Delhi")
    LC->>MC: call tool get_weather
    MC->>MS: get_weather(Delhi)
    MS->>T: fetch weather
    T-->>MS: "32C, sunny"
    MS-->>MC: result string
    MC-->>LC: result
    LC->>LLM: result + history
    LLM-->>LC: "It is 32C and sunny in Delhi."
    LC-->>U: final answer`,
        caption:
          "Sequence of calls when the LLM decides to use an MCP tool. Note how LangChain sits between the LLM and the MCP client.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Complete Code",
      },
      {
        type: "paragraph",
        text: "Below is a complete working example. It uses the MultiServerMCPClient from LangChain's MCP adapter, loads the tools from our Day 38 server, and creates a chat loop that runs until you type 'quit'.",
      },
      {
        type: "code",
        language: "python",
        caption: "langchain_mcp.py: connect LangChain to the MCP server",
        code: `# langchain_mcp.py
# Run on your local machine: python langchain_mcp.py
# Requires: pip install mcp langchain langchain-openai langchain-mcp-adapters

import asyncio
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate

# Set up the OpenRouter LLM through the OpenAI client.
llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

# Define how to reach the MCP server.
# In this example we connect over stdio (the server runs as a subprocess).
mcp_servers = {
    "aarav-tools": {
        "command": "python",
        "args": ["server.py"],
        "transport": "stdio",
    }
}


async def main():
    # Create the MCP client and load tools from all servers.
    client = MultiServerMCPClient(mcp_servers)
    tools = await client.load_tools()

    print(f"Loaded {len(tools)} tools from MCP server:")
    for t in tools:
        print(f"  - {t.name}: {t.description[:60]}")

    # Build a prompt that tells the LLM how to behave.
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are Aarav's helpful assistant. Use tools when needed."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # Create the agent that can call tools.
    agent = create_tool_calling_agent(llm, tools, prompt)
    executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

    # Chat loop
    print("\\nAsk me anything! Type 'quit' to exit.")
    while True:
        user_input = input("\\nYou: ")
        if user_input.lower() == "quit":
            print("Goodbye!")
            break
        result = await executor.ainvoke({"input": user_input})
        print(f"Assistant: {result['output']}")


# Run the async main function
if __name__ == "__main__":
    asyncio.run(main())`,
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Code",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Imports: ChatOpenAI talks to OpenRouter. MultiServerMCPClient is the LangChain MCP adapter.",
          "llm = ChatOpenAI(...): creates the LLM with your OpenRouter API key and the free tencent/hy3:free model.",
          "mcp_servers: a dictionary describing how to reach our server. We use stdio, so the server runs as a subprocess.",
          "client = MultiServerMCPClient(mcp_servers): wraps the connection to the MCP server.",
          "tools = await client.load_tools(): asks the server for its tools and wraps each as a LangChain Tool.",
          "prompt: a ChatPromptTemplate with a system message, the user input, and a placeholder for the agent's tool-calling scratchpad.",
          "create_tool_calling_agent: builds an agent that knows how to call tools when the LLM asks.",
          "AgentExecutor: runs the agent loop (LLM decides, tool runs, LLM answers).",
          "while True: a chat loop that reads user input and prints the agent's reply.",
          "asyncio.run(main()): starts the async main function.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "What verbose=True does",
        text: "With verbose=True, the agent prints every step: the LLM's decision, the tool call, the tool result, and the final answer. This is the best way to learn what is happening under the hood.",
      },
      {
        type: "heading",
        level: 3,
        text: "A Sample Run",
      },
      {
        type: "paragraph",
        text: "Here is what a real conversation looks like. Notice how the LLM picks the right tool for each question without being told which to use.",
      },
      {
        type: "code",
        language: "text",
        caption: "Sample conversation output",
        code: `Loaded 3 tools from MCP server:
  - get_weather: Get the current weather for a city.
  - calculator: Do basic math: add, subtract, multiply, divide.
  - get_time: Get the current date and time.

Ask me anything! Type 'quit' to exit.

You: What is the weather in Delhi?
Assistant: The weather in Delhi is currently 32C and sunny.

You: What is 25 times 4?
Assistant: 25 times 4 is 100.

You: What time is it?
Assistant: It is currently 7:42 PM on October 12, 2024.

You: quit
Goodbye!`,
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Is Powerful",
      },
      {
        type: "paragraph",
        text: "Notice that Aarav never told the assistant which tool to use. The LLM read each tool's description, matched it to the question, and called the right one. Add a new tool to the server and the LLM can use it instantly, no client changes needed. That is the USB moment in action.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common error",
        text: "If you see ConnectionError or 'MCP server not found', make sure server.py is in the same folder as langchain_mcp.py and that python server.py works on its own.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The mcp and langchain packages are not in Pyodide, so this code does not run in the browser playground. Run it locally: pip install mcp langchain langchain-openai langchain-mcp-adapters, keep server.py from Day 38 in the same folder, then python langchain_mcp.py. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Prints 'Loaded 3 tools', then starts an interactive chat. Ask 'What is the weather in Delhi?' and the assistant answers using the get_weather tool. Ask 'What is 25 times 4?' and it uses the calculator tool. Type 'quit' to exit.",
    debugging: [
      "If you see an API key error, replace YOUR_OPENROUTER_API_KEY with your real OpenRouter key.",
      "If the LLM does not call a tool, check the tool descriptions are clear. The LLM uses the docstring to decide.",
      "If the server does not start, run python server.py alone first to make sure it works.",
      "If the agent hangs, the free model may be slow. Wait a few seconds, or try google/gemma-2-9b-it:free.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run the example and ask 'What is the weather in Mumbai?'. Confirm the assistant uses the get_weather tool.",
        hint: "With verbose=True you should see the tool call in the output.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add a new tool to server.py: get_spiderman_fact() that returns a fact about Spider-Man. Restart and ask the assistant about Spider-Man.",
        hint: "Use the @mcp.tool() decorator and a list of facts.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Change the model from tencent/hy3:free to google/gemma-2-9b-it:free and compare the answers.",
        hint: "Just change the model= line.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Modify the system prompt to make the assistant speak like a cricket commentator. Test it with a weather question.",
        hint: "Change the system message in the ChatPromptTemplate.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which LangChain class loads tools from an MCP server?",
        options: [
          "MultiServerMCPClient",
          "ChatOpenAI",
          "AgentExecutor",
          "ChatPromptTemplate",
        ],
        correct: 0,
        explanation:
          "MultiServerMCPClient is the LangChain adapter that connects to MCP servers and loads their tools.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "The LLM calls MCP tools directly, without LangChain in the middle.",
        correctBool: false,
        explanation:
          "False. The LLM tells LangChain which tool to call, and LangChain asks the MCP Client to actually run it.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "When the user asks 'What is the weather in Delhi?', the LLM decides to call the tool with argument city=______.",
        answer: "Delhi",
        explanation:
          "The LLM extracts the city name from the question and passes it as the argument.",
      },
      {
        id: 4,
        type: "code-output",
        question:
          "In the sequence diagram, what does the MCP Server return to the MCP Client after the tool runs?",
        code: `MS -->> MC: ?`,
        answer: "result string (for example '32C, sunny')",
        explanation:
          "The server returns the tool result, which then flows back through LangChain to the LLM and finally to the user.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does verbose=True do in AgentExecutor?",
        options: [
          "Hides the tool calls",
          "Prints every step: LLM decision, tool call, result",
          "Speeds up the model",
          "Skips the system prompt",
        ],
        correct: 1,
        explanation:
          "verbose=True prints every step of the agent loop, which is great for learning and debugging.",
      },
    ],
    teacherNotes:
      "Day 39 is the aha moment. Make sure Aarav runs the example and sees the LLM call a tool on its own. Walk through the sequence diagram together so he understands that the LLM does not call tools directly. Day 40 adds observability with Langfuse so we can see exactly what prompts were sent and what tokens were used.",
    explainToFriend:
      "I connected my MCP server to LangChain. Now when I ask 'What is the weather in Delhi?', the LLM reads the tool list, decides to call get_weather with city='Delhi', LangChain runs the tool, and the LLM turns the result into a sentence. I never told it which tool to use, it figured that out from the descriptions.",
    realWorldExamples: [
      "Claude Desktop uses MCP to connect to filesystem, GitHub, and Slack servers.",
      "Cursor (the AI code editor) uses MCP to read your codebase.",
      "Any LangChain app can load MCP tools with one line of code.",
    ],
    thingsToGoogle: [
      "langchain mcp adapters",
      "MultiServerMCPClient example",
      "create_tool_calling_agent langchain",
    ],
  },

  // ============================================================
  // DAY 40: What is Langfuse?
  // ============================================================
  {
    dayNumber: 40,
    title: "What is Langfuse? AI Observability",
    phase: "practical",
    objectives: [
      "Explain what Langfuse is and why observability matters",
      "Define traces, spans, and generations",
      "List the metrics Langfuse tracks",
      "Set up a free Langfuse cloud account",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Why Observability Matters",
      },
      {
        type: "paragraph",
        text: "When Aarav builds an AI app, things will break. The LLM might return a weird answer, a tool call might fail, or the response might be too slow. Without observability, you are guessing. With observability, you can see exactly what happened: the exact prompt sent, the exact response received, the tokens used, and the time each step took.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Real-world analogy",
        text: "Imagine driving a car with no dashboard. You cannot see your speed, fuel, or engine temperature. That is an AI app with no observability. Langfuse is the dashboard: it shows you everything that happens inside your AI app, in real time.",
      },
      {
        type: "heading",
        level: 3,
        text: "What is Langfuse?",
      },
      {
        type: "paragraph",
        text: "Langfuse is an open-source observability platform for LLM apps. It captures every interaction your AI app has with an LLM, stores it, and shows it in a web dashboard. You can self-host it or use the free Langfuse Cloud. We will use the cloud version because it is free and ready in two minutes.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Three Core Concepts",
      },
      {
        type: "paragraph",
        text: "Langfuse organizes data into three nested concepts: traces, spans, and generations. A trace is one full user interaction. A span is a sub-step within a trace. A generation is a specific LLM call. Understanding these three is the key to using Langfuse well.",
      },
      {
        type: "table",
        headers: ["Concept", "What it is", "Example"],
        rows: [
          ["Trace", "One full user interaction", "User asks 'Weather in Delhi?' and gets an answer"],
          ["Span", "A sub-step within a trace", "Calling the get_weather MCP tool"],
          ["Generation", "One LLM call within a span", "OpenRouter call to tencent/hy3:free"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "How a Trace Branches",
      },
      {
        type: "paragraph",
        text: "The diagram below shows how a trace branches into spans and generations. One trace can contain many spans, and each span can contain many generations. This hierarchy lets you drill down from the user's question to the exact LLM call.",
      },
      {
        type: "mermaid",
        code: `graph TD
    T["Trace: user asked about weather"]
    T --> S1["Span: tool call"]
    T --> S2["Span: final response"]
    S1 --> G1["Generation: LLM decides tool"]
    S1 --> G2["Generation: tool result handled"]
    S2 --> G3["Generation: LLM writes answer"]`,
        caption:
          "A Langfuse trace branches into spans, and spans contain generations (LLM calls).",
      },
      {
        type: "heading",
        level: 3,
        text: "What Langfuse Tracks",
      },
      {
        type: "paragraph",
        text: "For every trace, span, and generation, Langfuse records useful metrics. These metrics help you find bugs, optimize cost, and improve quality.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Token usage: how many tokens each LLM call used (input + output)",
          "Latency: how long each step took, in milliseconds",
          "Cost: estimated dollar cost based on the model and token count",
          "Exact prompt sent: the full text the LLM received",
          "Exact response received: the full text the LLM returned",
          "Tool calls: which tools were called and with what arguments",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why this is gold",
        text: "If your AI app gives a weird answer, you can open Langfuse, find the trace, see the exact prompt and response, and figure out why. It turns debugging from guessing into reading.",
      },
      {
        type: "heading",
        level: 3,
        text: "Installing Langfuse",
      },
      {
        type: "paragraph",
        text: "Install the Langfuse Python SDK with pip. The langchain package also has a built-in Langfuse integration we will use on Day 41.",
      },
      {
        type: "code",
        language: "bash",
        caption: "Install the Langfuse SDK",
        code: `pip install langfuse`,
      },
      {
        type: "heading",
        level: 3,
        text: "Getting a Free Langfuse Cloud Account",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to https://cloud.langfuse.com in your browser",
          "Sign up with your email or Google account (free)",
          "Create a new project, name it 'aarav-ai-handbook'",
          "Open Project Settings, then API Keys",
          "Copy your Public Key and Secret Key into a safe place",
          "Set them as environment variables (see code below)",
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Setting Environment Variables",
      },
      {
        type: "paragraph",
        text: "Langfuse reads your keys from environment variables. Set them before running your Python script. Never hard-code keys in your source file, that is a security mistake.",
      },
      {
        type: "code",
        language: "bash",
        caption: "Set Langfuse keys as environment variables (macOS and Linux)",
        code: `export LANGFUSE_PUBLIC_KEY="pk-lf-xxxxxxxx"
export LANGFUSE_SECRET_KEY="sk-lf-xxxxxxxx"
export LANGFUSE_HOST="https://cloud.langfuse.com"`,
      },
      {
        type: "code",
        language: "bash",
        caption: "Set Langfuse keys on Windows (PowerShell)",
        code: `$env:LANGFUSE_PUBLIC_KEY="pk-lf-xxxxxxxx"
$env:LANGFUSE_SECRET_KEY="sk-lf-xxxxxxxx"
$env:LANGFUSE_HOST="https://cloud.langfuse.com"`,
      },
      {
        type: "heading",
        level: 3,
        text: "A Tiny Langfuse Smoke Test",
      },
      {
        type: "paragraph",
        text: "Below is a tiny script that creates one trace, one span, and one generation, then pushes it to Langfuse. Run it, then open your Langfuse dashboard and you will see the trace appear. This proves your setup works.",
      },
      {
        type: "code",
        language: "python",
        caption: "langfuse_smoke.py: prove your Langfuse setup works",
        code: `# langfuse_smoke.py
# Run on your local machine after setting LANGFUSE_* env vars.
# Requires: pip install langfuse

from langfuse import Langfuse

# Langfuse reads keys from environment variables automatically.
langfuse = Langfuse()

# Create a trace (one full user interaction)
trace = langfuse.trace(
    name="weather-question",
    user_id="aarav",
    input="What is the weather in Delhi?",
)

# Create a span (a sub-step inside the trace)
span = trace.span(
    name="tool-call",
    input={"tool": "get_weather", "city": "Delhi"},
)

# Create a generation (an LLM call inside the span)
span.generation(
    name="llm-decision",
    model="tencent/hy3:free",
    input="User wants weather in Delhi",
    output="Calling get_weather(city=Delhi)",
    usage={"input": 12, "output": 8},
)

# End the span and the trace
span.end()
trace.end()

# Flush to make sure data is sent before the script exits
langfuse.flush()

print("Trace sent to Langfuse! Open your dashboard to see it.")`,
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "If your dashboard stays empty, you probably forgot langfuse.flush() at the end. Langfuse batches data and sends it in the background. flush() forces a final send before your script exits.",
      },
      {
        type: "paragraph",
        text: "Tomorrow (Day 41) we will plug Langfuse into LangChain so every LLM call is tracked automatically, no manual trace code needed.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The langfuse package is not in Pyodide, so the smoke test does not run in the browser playground. Run it locally after creating a free Langfuse Cloud account and setting the LANGFUSE_* environment variables. Then open https://cloud.langfuse.com to see your trace.",
    expectedOutput:
      "Prints 'Trace sent to Langfuse! Open your dashboard to see it.' Then in the Langfuse dashboard you see one trace named 'weather-question' with one span ('tool-call') and one generation ('llm-decision') inside it.",
    debugging: [
      "If the dashboard is empty, check that you called langfuse.flush() at the end of your script.",
      "If you see an auth error, double-check your LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY.",
      "If you see a host error, set LANGFUSE_HOST to https://cloud.langfuse.com.",
      "Never commit your secret key to GitHub. Use environment variables.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Create a free Langfuse Cloud account and a project named 'aarav-ai-handbook'.",
        hint: "Go to https://cloud.langfuse.com and sign up.",
      },
      {
        id: 2,
        difficulty: "easy",
        description:
          "Run the smoke test script and confirm the trace appears in your dashboard.",
        hint: "Make sure to call langfuse.flush() at the end.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Modify the smoke test to add a second span named 'final-answer' inside the same trace.",
        hint: "Call trace.span(name='final-answer') a second time.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Add usage data (input and output token counts) to the generation. Look up how Langfuse calculates cost from usage.",
        hint: "Pass usage={'input': N, 'output': M} to .generation().",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is Langfuse used for?",
        options: [
          "Training new LLMs",
          "Observability and tracing for LLM apps",
          "Hosting LLM models",
          "Replacing LangChain",
        ],
        correct: 1,
        explanation:
          "Langfuse is an observability platform. It tracks what happens inside your LLM app so you can debug and optimize.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "A trace contains spans, and a span can contain generations.",
        correctBool: true,
        explanation:
          "True. A trace is the top level, spans are sub-steps, generations are individual LLM calls inside spans.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "One full user interaction in Langfuse is called a ______.",
        answer: "trace",
        explanation:
          "A trace is the top-level concept. It represents one full user interaction.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Which of these does Langfuse NOT track?",
        options: [
          "Token usage",
          "Latency",
          "Cost",
          "Your computer's CPU temperature",
        ],
        correct: 3,
        explanation:
          "Langfuse tracks token usage, latency, cost, prompts, and responses. It does not track hardware metrics.",
      },
      {
        id: 5,
        type: "fill-blank",
        question:
          "You must call ______ at the end of your script to make sure Langfuse sends all data before exit.",
        answer: "langfuse.flush()",
        explanation:
          "flush() forces Langfuse to send any buffered data before the script exits.",
      },
    ],
    teacherNotes:
      "Day 40 is conceptual plus a small smoke test. Make sure Aarav creates a Langfuse Cloud account and sees his first trace appear in the dashboard. The three concepts (trace, span, generation) are the foundation for everything in Day 41 and beyond. Reinforce the car-dashboard analogy.",
    explainToFriend:
      "Langfuse is a dashboard for AI apps. Just like a car dashboard shows speed, fuel, and engine temperature, Langfuse shows the exact prompts, responses, token counts, and latency for every LLM call. When my AI app gives a weird answer, I open Langfuse and see exactly what went wrong.",
    realWorldExamples: [
      "A customer support bot logs every chat as a trace in Langfuse.",
      "A RAG system logs each retrieval step as a span and each LLM call as a generation.",
      "Companies use Langfuse to track how much they spend on LLM APIs each month.",
    ],
    thingsToGoogle: [
      "Langfuse cloud free tier",
      "Langfuse trace span generation",
      "Langfuse token usage tracking",
    ],
  },

  // ============================================================
  // DAY 41: Integrating Langfuse with LangChain
  // ============================================================
  {
    dayNumber: 41,
    title: "Integrating Langfuse with LangChain",
    phase: "practical",
    objectives: [
      "Add the Langfuse callback handler to LangChain",
      "Verify every LLM call appears in the Langfuse dashboard",
      "Walk through the dashboard to find a trace",
      "Use Langfuse to debug a real problem",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Plug and Trace",
      },
      {
        type: "paragraph",
        text: "Yesterday we created traces manually. Today we let LangChain do it automatically. LangChain has a built-in Langfuse callback handler. Add it once, and every LLM call, every tool call, and every chain step gets logged to Langfuse with no extra code.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "The power of callbacks",
        text: "LangChain callbacks are hooks that fire on every event. The Langfuse handler listens to all of them and writes to Langfuse. One line of setup, full observability for the entire app.",
      },
      {
        type: "heading",
        level: 3,
        text: "Installing the Integration",
      },
      {
        type: "paragraph",
        text: "Install the Langfuse LangChain integration package. This gives you the CallbackHandler class.",
      },
      {
        type: "code",
        language: "bash",
        caption: "Install the Langfuse LangChain integration",
        code: `pip install langfuse langchain langchain-openai`,
      },
      {
        type: "heading",
        level: 3,
        text: "The Complete Code",
      },
      {
        type: "paragraph",
        text: "Below is a complete script. It creates a ChatOpenAI LLM (talking to OpenRouter), wraps it in a chain with a system prompt, and adds the Langfuse callback. Run it, then open your Langfuse dashboard to see the trace.",
      },
      {
        type: "code",
        language: "python",
        caption: "langchain_langfuse.py: LangChain with Langfuse callback",
        code: `# langchain_langfuse.py
# Run on your local machine after setting LANGFUSE_* env vars.
# Requires: pip install langfuse langchain langchain-openai

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langfuse.callback import CallbackHandler

# 1. Create the LLM (talks to OpenRouter)
llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

# 2. Create the Langfuse callback handler
# It reads LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY from env.
langfuse_handler = CallbackHandler()

# 3. Build a simple chain: prompt -> LLM -> string output
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are Aarav's cricket expert. Answer in one short sentence."),
    ("human", "{question}"),
])

chain = prompt | llm | StrOutputParser()

# 4. Ask three questions, each one logged to Langfuse
questions = [
    "Who won the 2023 Cricket World Cup?",
    "What is a yorker in cricket?",
    "Name a famous Indian cricketer.",
]

for q in questions:
    print(f"\\nQ: {q}")
    # Pass the Langfuse handler as a callback. This creates a trace.
    answer = chain.invoke(
        {"question": q},
        config={"callbacks": [langfuse_handler]},
    )
    print(f"A: {answer}")

# Flush so all traces are sent before the script exits
langfuse_handler.flush()

print("\\nDone! Open your Langfuse dashboard to see 3 traces.")`,
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Code",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Imports: ChatOpenAI is the LLM. ChatPromptTemplate builds the prompt. CallbackHandler is the Langfuse integration.",
          "llm = ChatOpenAI(...): creates the LLM with your OpenRouter key and the free tencent model.",
          "langfuse_handler = CallbackHandler(): creates the handler. It reads your Langfuse keys from environment variables.",
          "prompt = ChatPromptTemplate.from_messages(...): defines the system and human messages.",
          "chain = prompt | llm | StrOutputParser(): the LangChain Expression Language pipe. Output flows left to right.",
          "chain.invoke(..., config={'callbacks': [langfuse_handler]}): runs the chain and tells LangChain to call the Langfuse handler on every event.",
          "langfuse_handler.flush(): sends all buffered data to Langfuse before exit.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "One handler, many traces",
        text: "You create the handler once, then pass it to every invoke() call. Each invoke creates a new trace in Langfuse. You do not need to create traces manually.",
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Dashboard",
      },
      {
        type: "paragraph",
        text: "After running the script, open https://cloud.langfuse.com and click on your project. You should see three new traces. Click the first one. You will see the following sections.",
      },
      {
        type: "table",
        headers: ["Section", "What it shows"],
        rows: [
          ["Trace overview", "Name, user id, timestamp, total latency, total cost"],
          ["Input", "The exact question you sent to the chain"],
          ["Output", "The exact answer the LLM returned"],
          ["Spans and generations", "Every LLM call with its prompt, response, tokens, and latency"],
          ["Metadata", "Model name, token counts, cost breakdown"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "How This Helps Debug",
      },
      {
        type: "paragraph",
        text: "Suppose Aarav asks the assistant 'Who won the 1983 World Cup?' and it answers wrong. Without Langfuse, he would have to guess why. With Langfuse, he opens the trace and sees the exact prompt sent, the exact response received, and the token count. He can spot if the model misunderstood the question or if his prompt was unclear.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Real debugging example",
        text: "If your assistant keeps calling the wrong tool, open Langfuse, find the trace, look at the 'generation' step. You will see the exact tool list the LLM received. Maybe a tool description is unclear and the LLM is picking the wrong one. Fix the description and try again.",
      },
      {
        type: "heading",
        level: 3,
        text: "Sample Dashboard Output",
      },
      {
        type: "code",
        language: "text",
        caption: "What you see in the Langfuse dashboard after running the script",
        code: `Traces in project 'aarav-ai-handbook':

Trace 1: Who won the 2023 Cricket World Cup?
  - Latency: 1.42 s
  - Tokens: 48 input, 23 output
  - Cost: $0.0001
  - Output: "Australia won the 2023 Cricket World Cup."

Trace 2: What is a yorker in cricket?
  - Latency: 0.98 s
  - Tokens: 41 input, 31 output
  - Cost: $0.0001
  - Output: "A yorker is a delivery bowled to land near the batsman's crease."

Trace 3: Name a famous Indian cricketer.
  - Latency: 0.87 s
  - Tokens: 39 input, 12 output
  - Cost: $0.0001
  - Output: "Sachin Tendulkar is a famous Indian cricketer."`,
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "With one line of setup, your entire LangChain app is now observable. Every LLM call, every prompt, every response, every token, every cost, all in one dashboard. This is the difference between guessing and knowing when something breaks.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The langfuse and langchain packages are not in Pyodide, so this code does not run in the browser playground. Run it locally after pip install langfuse langchain langchain-openai and after setting the LANGFUSE_* environment variables. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Prints three Q&A pairs about cricket, then prints 'Done! Open your Langfuse dashboard to see 3 traces.' In the Langfuse dashboard you see three new traces with full prompt, response, token, and latency details.",
    debugging: [
      "If the dashboard shows no traces, check that langfuse_handler.flush() was called at the end.",
      "If you see an OpenAI auth error, replace YOUR_OPENROUTER_API_KEY with your real key.",
      "If traces appear but have no token counts, you may be using a model that does not report usage. Try google/gemma-2-9b-it:free.",
      "If the script crashes on import, install langfuse and langchain-openai again.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run the script and confirm three traces appear in your Langfuse dashboard.",
        hint: "Make sure flush() is called at the end.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Change the system prompt so the assistant speaks like a Minecraft villager. Run it and check the trace shows the new prompt.",
        hint: "Edit the system message in ChatPromptTemplate.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Add a fourth question about Spider-Man and run the script. Confirm four traces appear.",
        hint: "Append a Spider-Man question to the questions list.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Compare token usage between tencent/hy3:free and google/gemma-2-9b-it:free for the same three questions. Which uses fewer tokens?",
        hint: "Run the script twice with different model= values and read the token counts in Langfuse.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which class adds Langfuse tracing to LangChain?",
        options: [
          "langfuse.callback.CallbackHandler",
          "langchain.Langfuse",
          "openai.Langfuse",
          "mcp.Langfuse",
        ],
        correct: 0,
        explanation:
          "langfuse.callback.CallbackHandler is the LangChain callback handler that ships with the Langfuse SDK.",
      },
      {
        id: 2,
        type: "code-output",
        question:
          "What config key do you pass to chain.invoke to enable the Langfuse handler?",
        code: `chain.invoke(
    {"question": q},
    config={"callbacks": [______]},
)`,
        answer: "langfuse_handler",
        explanation:
          "You pass a list containing the CallbackHandler instance under the 'callbacks' key in the config.",
      },
      {
        id: 3,
        type: "true-false",
        question:
          "You must call langfuse_handler.flush() at the end so traces are sent before exit.",
        correctBool: true,
        explanation:
          "True. Langfuse batches data in the background. flush() forces a final send before the script exits.",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "Each call to chain.invoke creates one new ______ in Langfuse.",
        answer: "trace",
        explanation:
          "Each invoke call creates a new trace that contains spans and generations for each step in the chain.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What can you see in the Langfuse dashboard for a generation?",
        options: [
          "Only the response",
          "Only the prompt",
          "The exact prompt, response, token count, and latency",
          "Only the cost",
        ],
        correct: 2,
        explanation:
          "A generation in Langfuse shows the exact prompt sent, the exact response received, the token count, and the latency.",
      },
    ],
    teacherNotes:
      "Day 41 turns on the lights. Make sure Aarav sees his traces in the dashboard and clicks into one to see the prompt and response. The key insight is that one line of setup gives full observability for the entire app. Day 42 combines MCP, LangChain, and Langfuse into one project.",
    explainToFriend:
      "I added one line to my LangChain code, a Langfuse callback handler, and now every LLM call appears in a web dashboard. I can see the exact prompt sent, the exact response received, the token count, and the latency. When my AI app gives a weird answer, I open the dashboard and see exactly what went wrong.",
    realWorldExamples: [
      "Startups use Langfuse to track how much they spend on OpenAI each month.",
      "AI teams use Langfuse to find prompts that produce bad answers.",
      "Customer support bots log every chat as a Langfuse trace for auditing.",
    ],
    thingsToGoogle: [
      "langfuse callback handler langchain",
      "langfuse dashboard walkthrough",
      "langfuse trace token usage",
    ],
  },

  // ============================================================
  // DAY 42: Project 3 - AI Assistant with Tools
  // ============================================================
  {
    dayNumber: 42,
    title: "Project 3: AI Assistant with Tools",
    phase: "practical",
    objectives: [
      "Combine LangChain, MCP, and Langfuse in one project",
      "Build a chat loop that can call MCP tools",
      "Make every interaction visible in the Langfuse dashboard",
      "Test the assistant with weather, calculator, and time questions",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Putting It All Together",
      },
      {
        type: "paragraph",
        text: "Project 3 combines everything from Days 36 to 41. We use LangChain for orchestration, MCP for tools (weather, calculator, time), and Langfuse for tracing. The result is an AI assistant that can chat, check the weather, do math, and tell the time, all observable in the Langfuse dashboard.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "This is a real AI app",
        text: "By the end of today, Aarav will have built a small but complete AI assistant. Every piece is something he learned in the last week. This is the kind of project real AI engineers build, just smaller in scale.",
      },
      {
        type: "heading",
        level: 3,
        text: "Project Structure",
      },
      {
        type: "table",
        headers: ["File", "Purpose"],
        rows: [
          ["server.py", "The MCP server from Day 38 with get_weather, calculator, get_time"],
          ["assistant.py", "The main assistant script (LangChain + MCP + Langfuse)"],
          ["requirements.txt", "Lists all pip packages needed"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Requirements File",
      },
      {
        type: "code",
        language: "text",
        caption: "requirements.txt",
        code: `mcp
langchain
langchain-openai
langchain-mcp-adapters
langfuse`,
      },
      {
        type: "code",
        language: "bash",
        caption: "Install all dependencies at once",
        code: `pip install -r requirements.txt`,
      },
      {
        type: "heading",
        level: 3,
        text: "The MCP Server (Recap)",
      },
      {
        type: "paragraph",
        text: "Use the exact server.py from Day 38. It has get_weather, calculator, and get_time. If you do not have it, copy it from the Day 38 lesson. Make sure server.py and assistant.py are in the same folder.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Main Assistant Code",
      },
      {
        type: "code",
        language: "python",
        caption: "assistant.py: LangChain + MCP + Langfuse in one file",
        code: `# assistant.py
# Run on your local machine: python assistant.py
# Requires: pip install -r requirements.txt

import asyncio
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langfuse.callback import CallbackHandler

# 1. Set up the LLM (OpenRouter free model)
llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

# 2. Set up the Langfuse callback handler
langfuse_handler = CallbackHandler()

# 3. Define how to reach the MCP server (stdio transport)
mcp_servers = {
    "aarav-tools": {
        "command": "python",
        "args": ["server.py"],
        "transport": "stdio",
    }
}


async def main():
    # Load tools from the MCP server
    client = MultiServerMCPClient(mcp_servers)
    tools = await client.load_tools()

    print(f"Loaded {len(tools)} MCP tools:")
    for t in tools:
        print(f"  - {t.name}")

    # Build the prompt. The system message tells the LLM how to behave.
    prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are Aarav's helpful assistant. "
         "You can check weather, do math, and tell the time. "
         "Use tools when needed. Answer in one or two short sentences."),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # Create the agent (LLM + tools) and the executor (runs the loop)
    agent = create_tool_calling_agent(llm, tools, prompt)
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        handle_parsing_errors=True,
    )

    # Chat loop
    print("\\n=== Aarav's AI Assistant ===")
    print("Ask me about weather, math, or the time. Type 'quit' to exit.\\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ("quit", "exit"):
            break

        # Each invoke creates a trace in Langfuse
        result = await executor.ainvoke(
            {"input": user_input},
            config={"callbacks": [langfuse_handler]},
        )
        print(f"Assistant: {result['output']}\\n")

    # Send all traces to Langfuse before exit
    langfuse_handler.flush()
    print("Goodbye! Check your Langfuse dashboard for all traces.")


if __name__ == "__main__":
    asyncio.run(main())`,
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Code",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Imports: combine LangChain, the MCP adapter, and the Langfuse callback.",
          "llm = ChatOpenAI(...): the LLM via OpenRouter with the free tencent model.",
          "langfuse_handler = CallbackHandler(): the Langfuse callback, reads keys from env.",
          "mcp_servers: describes how to reach our MCP server (stdio transport, runs server.py as a subprocess).",
          "client.load_tools(): asks the MCP server for its tools and wraps them as LangChain Tools.",
          "prompt: a system message describing the assistant, plus the user input and a scratchpad placeholder.",
          "create_tool_calling_agent: builds the agent that can call tools.",
          "AgentExecutor with handle_parsing_errors=True: if the LLM messes up the tool call format, we recover gracefully.",
          "while True: chat loop. Each invoke creates a trace in Langfuse.",
          "langfuse_handler.flush(): sends all traces before exit.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why handle_parsing_errors matters",
        text: "Free LLMs sometimes format tool calls incorrectly. handle_parsing_errors=True catches those errors and asks the LLM to try again, instead of crashing the whole app.",
      },
      {
        type: "heading",
        level: 3,
        text: "A Sample Run",
      },
      {
        type: "code",
        language: "text",
        caption: "Sample conversation with the assistant",
        code: `=== Aarav's AI Assistant ===
Ask me about weather, math, or the time. Type 'quit' to exit.

You: What is the weather in Chennai?
Assistant: The weather in Chennai is currently 34C and cloudy.

You: What is 18 plus 24?
Assistant: 18 plus 24 is 42.

You: What time is it right now?
Assistant: It is currently 8:05 PM on October 14, 2024.

You: If I have 5 cricket balls and buy 7 more, how many do I have?
Assistant: You would have 12 cricket balls.

You: quit
Goodbye! Check your Langfuse dashboard for all traces.`,
      },
      {
        type: "heading",
        level: 3,
        text: "Checking the Dashboard",
      },
      {
        type: "paragraph",
        text: "After running the script, open Langfuse. You should see one trace per question. Click a trace that used a tool (for example, the weather question). You will see spans for the LLM decision, the tool call, and the final answer, all in one place.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "If traces are missing tool calls",
        text: "Make sure verbose=True is set on the AgentExecutor. If the LLM did not call a tool, check the tool description. The LLM uses the description to decide, so make it clear and specific.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Project Matters",
      },
      {
        type: "paragraph",
        text: "You have now built a real AI assistant. It uses an open standard (MCP) for tools, a popular framework (LangChain) for orchestration, and a professional observability tool (Langfuse) for tracing. This is the same architecture used by AI startups, just smaller in scale. Days 45 and 46 will expand this into the final capstone project.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The mcp, langchain, and langfuse packages are not in Pyodide, so this code does not run in the browser playground. Run it locally: pip install -r requirements.txt, make sure server.py from Day 38 is in the same folder, set the LANGFUSE_* env vars, and run python assistant.py. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Loads 3 MCP tools, then starts an interactive chat. Ask about weather in Chennai, math like 18 + 24, or the current time, and the assistant answers using the right MCP tool. Each question creates a trace in Langfuse. Type 'quit' to exit.",
    debugging: [
      "If the agent crashes on tool calls, make sure handle_parsing_errors=True is set on the AgentExecutor.",
      "If traces do not appear in Langfuse, check that langfuse_handler.flush() was called and that env vars are set.",
      "If a tool call returns 'Unknown tool', check that server.py is in the same folder and runs on its own.",
      "If the LLM gives a wrong answer, open the trace in Langfuse and read the exact prompt and response to find the issue.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run the assistant and ask three questions: one about weather, one about math, one about time. Confirm all three traces appear in Langfuse.",
        hint: "Use verbose=True to see tool calls in the terminal.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add a fourth tool to server.py: get_spiderman_villain() that returns a random Spider-Man villain name. Restart and ask the assistant about Spider-Man villains.",
        hint: "Use the @mcp.tool() decorator and random.choice on a list of villains.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Modify the system prompt so the assistant always answers like a cricket commentator. Test with a weather question.",
        hint: "Edit the system message in ChatPromptTemplate.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Change the model to google/gemma-2-9b-it:free and compare the quality of answers and tool calls. Write a short paragraph about which model performed better.",
        hint: "Run the same three questions with each model and read the Langfuse traces.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which three technologies does Project 3 combine?",
        options: [
          "LangChain, MCP, Langfuse",
          "PyTorch, TensorFlow, Keras",
          "Flask, Django, FastAPI",
          "Pandas, NumPy, Matplotlib",
        ],
        correct: 0,
        explanation:
          "Project 3 uses LangChain for orchestration, MCP for tools, and Langfuse for tracing.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "Each call to executor.ainvoke creates a new trace in Langfuse.",
        correctBool: true,
        explanation:
          "True. The Langfuse callback handler creates a new trace for every invoke call.",
      },
      {
        id: 3,
        type: "code-output",
        question:
          "What happens if you set handle_parsing_errors=True on the AgentExecutor?",
        code: `executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    handle_parsing_errors=True,
)`,
        answer:
          "If the LLM formats a tool call incorrectly, the executor recovers and asks the LLM to try again",
        explanation:
          "handle_parsing_errors=True prevents crashes when the LLM makes a formatting mistake in a tool call.",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "After the chat loop ends, you must call ______ to send all traces to Langfuse.",
        answer: "langfuse_handler.flush()",
        explanation:
          "flush() forces Langfuse to send any buffered traces before the script exits.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Where does the LLM get the list of tools it can call?",
        options: [
          "Hard-coded in the LLM",
          "From the MultiServerMCPClient after it loads tools",
          "From the Langfuse dashboard",
          "From the user's input",
        ],
        correct: 1,
        explanation:
          "The MultiServerMCPClient asks the MCP server for its tools, and LangChain passes that list to the LLM.",
      },
    ],
    teacherNotes:
      "Day 42 is the first full integration project. Make sure Aarav runs the assistant and sees traces in Langfuse. The most common issue is free LLMs failing to call tools properly, which is why handle_parsing_errors=True is essential. Day 43 will compare different free models to see which works best for tool calling.",
    explainToFriend:
      "I built an AI assistant that combines three tools. LangChain runs the chat and decides when to call tools. MCP is the standard plug that connects my tools (weather, calculator, time) to the LLM. Langfuse logs every interaction to a dashboard so I can see exactly what the LLM did. When I ask 'What is the weather in Chennai?', the assistant calls the get_weather tool and answers naturally.",
    realWorldExamples: [
      "Customer support bots combine LangChain, tools, and observability the same way.",
      "AI coding assistants like Cursor use a similar architecture with MCP for filesystem access.",
      "Companies log every LLM call to platforms like Langfuse for auditing and cost tracking.",
    ],
    thingsToGoogle: [
      "langchain agent executor handle_parsing_errors",
      "langfuse callback handler example",
      "MCP stdio transport langchain",
    ],
  },

  // ============================================================
  // DAY 43: LLM Model Comparison
  // ============================================================
  {
    dayNumber: 43,
    title: "LLM Model Comparison",
    phase: "practical",
    objectives: [
      "Call multiple OpenRouter free models with the same prompt",
      "Measure response time with time.time()",
      "Compare quality, speed, and instruction-following",
      "Decide which model to use for which task",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Not All Models Are Equal",
      },
      {
        type: "paragraph",
        text: "OpenRouter offers several free LLMs. They are all 'free' but they behave differently. Some are fast, some are smart, some follow instructions well, some do not. Today Aarav will write a script that calls 2 or 3 free models with the same prompt and compares them side by side.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why this matters",
        text: "In real AI projects, you rarely use one model for everything. A fast model is good for quick chats. A smart model is good for hard reasoning. A model that follows instructions is good for tool calling. Today Aarav learns how to pick.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Models We Will Compare",
      },
      {
        type: "table",
        headers: ["Model", "Maker", "Strength"],
        rows: [
          ["tencent/hy3:free", "Tencent", "General chat, decent reasoning"],
          ["meta-llama/llama-3-8b-instruct:free", "Meta", "Fast, good instruction following"],
          ["google/gemma-2-9b-it:free", "Google", "Strong reasoning, larger context"],
          ["mistralai/mistral-7b-instruct:free", "Mistral AI", "Compact, good for simple tasks"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Measuring Speed with time.time()",
      },
      {
        type: "paragraph",
        text: "Python's time.time() returns the current time in seconds. To measure how long an LLM call takes, record the time before and after, then subtract. This is called the latency.",
      },
      {
        type: "code",
        language: "python",
        caption: "How to measure latency with time.time()",
        code: `import time

start = time.time()       # record start
# ... do the LLM call here ...
end = time.time()         # record end

latency_seconds = end - start
print(f"Took {latency_seconds:.2f} seconds")`,
      },
      {
        type: "heading",
        level: 3,
        text: "The Comparison Script",
      },
      {
        type: "code",
        language: "python",
        caption: "model_compare.py: call 3 free models and compare",
        code: `# model_compare.py
# Run on your local machine: python model_compare.py
# Requires: pip install openai

import time
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

# The same prompt sent to every model
PROMPT = "In one short sentence, explain why Spider-Man is a popular superhero."

# The free models we will compare
models = [
    "tencent/hy3:free",
    "meta-llama/llama-3-8b-instruct:free",
    "google/gemma-2-9b-it:free",
]

results = []

for model in models:
    print(f"\\n--- Calling {model} ---")
    start = time.time()
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": PROMPT}],
        )
        end = time.time()
        answer = response.choices[0].message.content
        latency = end - start
        tokens = response.usage.total_tokens if response.usage else 0
        print(f"Answer: {answer}")
        print(f"Latency: {latency:.2f} s | Tokens: {tokens}")
        results.append({
            "model": model,
            "answer": answer,
            "latency": latency,
            "tokens": tokens,
        })
    except Exception as e:
        end = time.time()
        print(f"Error: {e}")
        print(f"Latency: {end - start:.2f} s")
        results.append({
            "model": model,
            "answer": f"ERROR: {e}",
            "latency": end - start,
            "tokens": 0,
        })

# Print the comparison table
print("\\n\\n=== COMPARISON TABLE ===")
print(f"{'Model':<45} {'Latency':>10} {'Tokens':>8}")
print("-" * 65)
for r in results:
    print(f"{r['model']:<45} {r['latency']:>8.2f}s {r['tokens']:>8}")
print("-" * 65)

# Find the fastest model
fastest = min(results, key=lambda r: r["latency"])
print(f"\\nFastest: {fastest['model']} at {fastest['latency']:.2f}s")`,
      },
      {
        type: "heading",
        level: 3,
        text: "What the Output Looks Like",
      },
      {
        type: "code",
        language: "text",
        caption: "Sample output (your numbers will vary)",
        code: `--- Calling tencent/hy3:free ---
Answer: Spider-Man is popular because he balances everyday teenage struggles with relatable heroism, making him accessible and inspiring to readers of all ages.
Latency: 3.21 s | Tokens: 38

--- Calling meta-llama/llama-3-8b-instruct:free ---
Answer: Spider-Man is beloved because he is a relatable teen hero who balances everyday life with saving the world.
Latency: 1.42 s | Tokens: 24

--- Calling google/gemma-2-9b-it:free ---
Answer: Spider-Man is popular because he is a relatable, witty hero whose everyday struggles as Peter Parker mirror our own.
Latency: 2.05 s | Tokens: 27


=== COMPARISON TABLE ===
Model                                         Latency   Tokens
-----------------------------------------------------------------
tencent/hy3:free                                 3.21s       38
meta-llama/llama-3-8b-instruct:free              1.42s       24
google/gemma-2-9b-it:free                        2.05s       27
-----------------------------------------------------------------

Fastest: meta-llama/llama-3-8b-instruct:free at 1.42s`,
      },
      {
        type: "heading",
        level: 3,
        text: "How to Compare Quality",
      },
      {
        type: "paragraph",
        text: "Speed is easy to measure. Quality is harder. Aarav should read each answer and judge: did it follow the instruction (one short sentence)? Did it answer the question? Was it accurate? Was it well written? Below is a simple rubric.",
      },
      {
        type: "table",
        headers: ["Criterion", "Question to ask"],
        rows: [
          ["Instruction following", "Did it obey 'one short sentence'?"],
          ["Accuracy", "Is the answer correct?"],
          ["Clarity", "Is it easy to read?"],
          ["Conciseness", "Are there extra words?"],
          ["Latency", "How many seconds did it take?"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Tool calling comparison",
        text: "To compare tool calling, change the prompt to a question that needs a tool (like 'What is the weather in Delhi?'). Some free models support tool calling well, some do not. Llama-3 and Gemma-2 generally do well; smaller models may struggle.",
      },
      {
        type: "heading",
        level: 3,
        text: "When to Use Which Model",
      },
      {
        type: "paragraph",
        text: "Based on the comparison, here is a rough guide. Use the fastest model (often Llama-3-8B) for quick chats. Use the smartest model (often Gemma-2-9B) for hard reasoning. Use the most instruction-following model for tool calling. Always test, because free models change over time.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Quick chat: meta-llama/llama-3-8b-instruct:free (fast)",
          "Hard reasoning: google/gemma-2-9b-it:free (smart)",
          "General purpose: tencent/hy3:free (balanced)",
          "Compact tasks: mistralai/mistral-7b-instruct:free (small)",
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Free models change",
        text: "OpenRouter updates which models are free. A model that works today might be rate-limited tomorrow. If a model errors out, try another from the list. Always have a backup.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Matters",
      },
      {
        type: "paragraph",
        text: "Real AI engineers compare models all the time. The choice of model affects speed, cost, and quality. By writing this script, Aarav has the tooling to make that choice himself, based on real measurements instead of guesses.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The openai package IS available in Pyodide-compatible mode through the playground's OpenAI client wrapper, so this script can also run in the playground if you set your OpenRouter API key. Run it locally with pip install openai for full results. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Prints each model's answer with latency and token count, then a comparison table showing all three models side by side, then announces the fastest model. Latencies will vary based on network and OpenRouter load.",
    debugging: [
      "If a model returns an error, it may be rate-limited. Try again in a minute or pick another free model.",
      "If response.usage is None, the model did not report token counts. The script handles this by defaulting to 0.",
      "If latency is very high, your network may be slow. Try a different time of day.",
      "If all models fail, check your OpenRouter API key and base_url.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run the script and record which model is fastest and which produces the best answer (in your opinion).",
        hint: "Use the comparison table at the end of the output.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add mistralai/mistral-7b-instruct:free as a fourth model and rerun. Compare its latency and answer quality.",
        hint: "Add the model name to the models list.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Change the prompt to ask a cricket question, like 'In one short sentence, explain what a yorker is in cricket.' Rerun and compare.",
        hint: "Edit the PROMPT constant.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Modify the script to also count words in each answer and add a 'Words' column to the comparison table. Which model is most concise?",
        hint: "Use len(answer.split()) to count words.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which Python function measures time in seconds?",
        options: ["time.time()", "time.measure()", "time.now()", "datetime.clock()"],
        correct: 0,
        explanation:
          "time.time() returns the current time in seconds. Subtract before and after to get latency.",
      },
      {
        id: 2,
        type: "code-output",
        question:
          "What does the script print if response.usage is None?",
        code: `tokens = response.usage.total_tokens if response.usage else 0
print(f"Tokens: {tokens}")`,
        answer: "Tokens: 0",
        explanation:
          "The script defaults to 0 if the model did not report usage, preventing a crash.",
      },
      {
        id: 3,
        type: "true-false",
        question:
          "All OpenRouter free models behave the same way for the same prompt.",
        correctBool: false,
        explanation:
          "False. Free models differ in speed, quality, instruction following, and tool calling support.",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "To find the fastest model in the results list, the script uses min(results, key=______).",
        answer: "lambda r: r['latency']",
        explanation:
          "The lambda extracts the latency value from each result dict, so min picks the one with the smallest latency.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which model is generally best for quick chat responses?",
        options: [
          "meta-llama/llama-3-8b-instruct:free (fast)",
          "A model that takes 10 seconds to respond",
          "The largest possible model",
          "Any model, they are all the same",
        ],
        correct: 0,
        explanation:
          "Llama-3-8B is generally fast and good for quick chat responses. Always measure to confirm.",
      },
    ],
    teacherNotes:
      "Day 43 teaches Aarav to compare models empirically. Run the script together and discuss the differences. Emphasize that free models change over time, so the comparison is a snapshot, not a permanent ranking. Day 44 zooms out to show how all the pieces connect in a full-stack architecture.",
    explainToFriend:
      "I wrote a script that sends the same prompt to three different free LLMs on OpenRouter: tencent/hy3:free, llama-3-8b, and gemma-2-9b. It measures how long each one takes and how many tokens each uses, then prints a comparison table. In my test, llama-3-8b was the fastest. This helps me pick the right model for the right task.",
    realWorldExamples: [
      "AI teams run model comparisons (called benchmarks) before choosing a model for production.",
      "OpenRouter's own website shows latency and pricing for each model.",
      "Companies A/B test models to see which gives better customer satisfaction.",
    ],
    thingsToGoogle: [
      "OpenRouter free models list",
      "LLM benchmark comparison",
      "python time.time latency measurement",
    ],
  },

  // ============================================================
  // DAY 44: AI System Design (Simple Level)
  // ============================================================
  {
    dayNumber: 44,
    title: "AI System Design (Simple Level)",
    phase: "practical",
    objectives: [
      "Draw the full-stack architecture of an AI app",
      "Identify each component and its role",
      "Explain the flow from browser to LLM and back",
      "Understand where MCP and Langfuse fit in",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Zooming Out",
      },
      {
        type: "paragraph",
        text: "So far we have built pieces: a Python script that calls an LLM, an MCP server with tools, a LangChain agent, a Langfuse dashboard. Today we zoom out and see how all these pieces connect in a real full-stack AI application. We keep it simple, no load balancers or microservices, just the parts Aarav has already learned.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why system design matters",
        text: "Real AI engineers spend a lot of time drawing boxes and arrows before writing code. A clear diagram helps you spot problems early, like 'where does the API key live?' or 'what happens if the LLM is slow?'",
      },
      {
        type: "heading",
        level: 3,
        text: "The Components",
      },
      {
        type: "table",
        headers: ["Component", "What it does"],
        rows: [
          ["Browser", "Where the user types their question and reads the answer"],
          ["Next.js Backend", "A web server that receives the question and calls LangChain"],
          ["LangChain", "Orchestrates the LLM call and any tool calls"],
          ["OpenRouter API", "Hosts the actual LLM (tencent/hy3:free, etc.)"],
          ["MCP Server", "Runs tools like get_weather and calculator"],
          ["Langfuse", "Receives logs of every LLM call for observability"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "The Full-Stack Architecture Diagram",
      },
      {
        type: "paragraph",
        text: "The diagram below shows the complete flow. Solid arrows are real API calls or function calls. The dotted line to Langfuse is logging, it happens in the background and does not block the response.",
      },
      {
        type: "mermaid",
        code: `graph LR
    B["Browser (user)"] --> N["Next.js Backend"]
    N --> LC["LangChain"]
    LC --> OR["OpenRouter API (LLM)"]
    LC --> MS["MCP Server"]
    MS --> T["Tools (weather, calc, time)"]
    LC -.-> LF["Langfuse (logging)"]
    OR -.-> LF`,
        caption:
          "Full-stack AI architecture. Browser to Next.js to LangChain, which calls OpenRouter for the LLM and the MCP server for tools. Langfuse receives logs (dotted line) in the background.",
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Flow",
      },
      {
        type: "paragraph",
        text: "Here is the step-by-step flow when Aarav asks the assistant 'What is the weather in Delhi?' in the browser.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Aarav types 'What is the weather in Delhi?' in the browser and clicks Send.",
          "The browser sends the question to the Next.js backend (an HTTP POST request).",
          "Next.js calls LangChain with the user's question.",
          "LangChain calls the OpenRouter API with the prompt and the tool list.",
          "The LLM decides to call get_weather(city='Delhi').",
          "LangChain asks the MCP server to run get_weather.",
          "The MCP server returns '32C, sunny'.",
          "LangChain sends the result back to the LLM, which writes 'It is 32C and sunny in Delhi.'",
          "Next.js sends that answer back to the browser.",
          "Throughout all of this, LangChain logs every step to Langfuse (dotted line).",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why Langfuse is dotted",
        text: "Langfuse logging happens in the background. The user does not wait for logs to finish before seeing the answer. This is called asynchronous logging, and it keeps the app fast.",
      },
      {
        type: "heading",
        level: 3,
        text: "Where Each Piece Lives",
      },
      {
        type: "table",
        headers: ["Piece", "Where it runs"],
        rows: [
          ["Browser", "User's laptop or phone (Chrome, Safari, etc.)"],
          ["Next.js Backend", "A server (Vercel, Render, or your laptop)"],
          ["LangChain", "Inside the Next.js backend (Python or JS)"],
          ["OpenRouter API", "OpenRouter's cloud servers"],
          ["MCP Server", "Same server as Next.js, or a separate small process"],
          ["Langfuse", "Langfuse Cloud (or self-hosted)"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "A Tiny Next.js API Route Example",
      },
      {
        type: "paragraph",
        text: "Below is a tiny Next.js API route (in TypeScript) that receives a question from the browser and calls a Python backend. Aarav does not need to write this yet, but seeing the shape helps him understand the diagram.",
      },
      {
        type: "code",
        language: "typescript",
        caption: "app/api/chat/route.ts: a tiny Next.js API route (for reference)",
        code: `// Next.js API route that receives a chat message from the browser.
// This is TypeScript, not Python. Aarav will learn Next.js later.
// For now, just read the shape.

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 1. Read the user's question from the browser request
  const { message } = await req.json();

  // 2. Call LangChain (which calls OpenRouter + MCP + Langfuse)
  // In real code this would call your Python backend or use LangChain.js.
  const answer = await callLangChain(message);

  // 3. Send the answer back to the browser as JSON
  return NextResponse.json({ answer });
}

async function callLangChain(message: string): Promise<string> {
  // Placeholder: in real code this calls LangChain.
  return "This is where LangChain's answer would go.";
}`,
      },
      {
        type: "heading",
        level: 3,
        text: "Why No Load Balancers or Microservices?",
      },
      {
        type: "paragraph",
        text: "Real production AI apps have load balancers (to spread traffic across many servers), microservices (split into small services), queues (for background jobs), and caches (to avoid repeating expensive LLM calls). Aarav does not need any of that yet. The simple architecture above is enough for a project used by one person. Scaling up is a problem for later.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common beginner mistake",
        text: "Trying to put everything in one giant file. Even at this scale, keep the MCP server, the LangChain code, and the Next.js route in separate files. Smaller files are easier to debug.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Big Picture",
      },
      {
        type: "paragraph",
        text: "Aarav has now seen the full architecture of a real AI application. Browser sends a request, Next.js handles it, LangChain orchestrates, OpenRouter provides the LLM, MCP exposes tools, and Langfuse logs everything. Days 45 and 46 will turn this architecture into Aarav's final capstone project: an AI Personal Assistant.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. Today is mostly conceptual. The Next.js route example is TypeScript and is for reference only, do not try to run it. The diagram is the main deliverable. Read it carefully and trace the flow with your finger.",
    expectedOutput:
      "No runnable output today. The expected result is that Aarav can draw the full-stack architecture diagram from memory and explain each arrow.",
    debugging: [
      "If you cannot remember the flow, re-read the ordered list above. Trace it with your finger.",
      "If you confuse MCP and Langfuse, remember: MCP runs tools, Langfuse logs everything.",
      "If you forget where the LLM lives, it is at OpenRouter (the cloud), not on your machine.",
      "If you forget what is dotted, the Langfuse logging line is dotted because it is asynchronous.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Draw the full-stack architecture diagram on paper from memory. Label every box and every arrow.",
        hint: "Browser, Next.js, LangChain, OpenRouter, MCP Server, Tools, Langfuse (dotted).",
      },
      {
        id: 2,
        difficulty: "easy",
        description:
          "In one sentence each, describe what each of the 6 components does.",
        hint: "Use the table above as a reference.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Explain why the line to Langfuse is dotted (asynchronous) and why this matters for speed.",
        hint: "Async logging does not block the user's response.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Suppose the OpenRouter API goes down for 5 minutes. Walk through which components fail and which still work. Write a short paragraph.",
        hint: "Browser still works, Next.js still works, MCP still works, but no LLM answers.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Where does the user type their question in this architecture?",
        options: ["Browser", "Langfuse", "MCP Server", "OpenRouter"],
        correct: 0,
        explanation: "The user types in the browser, which sends the question to the Next.js backend.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "The line from LangChain to Langfuse is dotted because logging is asynchronous.",
        correctBool: true,
        explanation:
          "True. Dotted means asynchronous. Langfuse logging happens in the background and does not block the user's response.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "The component that hosts the actual LLM (like tencent/hy3:free) is the ______ API.",
        answer: "OpenRouter",
        explanation:
          "OpenRouter hosts the LLMs. LangChain calls OpenRouter, which runs the model.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What does the MCP server do in this architecture?",
        options: [
          "Hosts the LLM",
          "Logs every call",
          "Runs tools like get_weather and calculator",
          "Serves the web page",
        ],
        correct: 2,
        explanation:
          "The MCP server runs tools. LangChain calls the MCP server when the LLM decides to use a tool.",
      },
      {
        id: 5,
        type: "fill-blank",
        question:
          "The component that orchestrates the LLM call and any tool calls is ______.",
        answer: "LangChain",
        explanation:
          "LangChain orchestrates. It calls OpenRouter for the LLM and the MCP server for tools.",
      },
    ],
    teacherNotes:
      "Day 44 is about the big picture. Have Aarav draw the diagram from memory on paper. The most important insight is that all the pieces he learned in Days 36 to 43 fit together into one coherent architecture. Day 45 starts the final capstone project, which implements this architecture in code.",
    explainToFriend:
      "My AI app has six pieces. The browser is where I type my question. Next.js is the web server. LangChain is the brain that decides what to do. OpenRouter hosts the actual LLM. The MCP server runs my tools (weather, calculator, time). Langfuse logs everything in the background. When I ask 'What is the weather in Delhi?', the question flows through all these pieces and comes back as an answer.",
    realWorldExamples: [
      "ChatGPT uses a similar architecture: browser, backend, LLM, tools, logging.",
      "Cursor (the AI code editor) uses MCP for filesystem access and LangChain-like orchestration.",
      "Customer support bots use this exact shape, just at a bigger scale.",
    ],
    thingsToGoogle: [
      "Next.js API routes",
      "full stack AI architecture",
      "Langfuse async logging",
    ],
  },

  // ============================================================
  // DAY 45: Project 4 - Final Capstone (Part 1)
  // ============================================================
  {
    dayNumber: 45,
    title: "Project 4: Final Capstone (Part 1)",
    phase: "practical",
    objectives: [
      "Set up the project structure for the AI Personal Assistant",
      "Implement the chat loop with LangChain memory",
      "Add an MCP server with four tools",
      "Add Langfuse tracing and test each piece",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "The Final Project Begins",
      },
      {
        type: "paragraph",
        text: "Today we start the final capstone: an AI Personal Assistant for Aarav. It combines everything from the course: LangChain for orchestration with memory, an MCP server with four tools (weather, calculator, time, fun fact), and Langfuse for tracing. Day 46 will improve it with better prompts, error handling, and a menu.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "This is the real deal",
        text: "By the end of Day 46, Aarav will have a portfolio-worthy AI assistant. He will present it on Day 47 (mock interview) and Day 48 (final assessment). Take the time to understand every line.",
      },
      {
        type: "heading",
        level: 3,
        text: "Project Structure",
      },
      {
        type: "table",
        headers: ["File", "Purpose"],
        rows: [
          ["requirements.txt", "Lists all pip packages"],
          ["mcp_server.py", "MCP server with 4 tools"],
          ["test_mcp.py", "Standalone tests for the MCP tools"],
          ["assistant.py", "Main assistant with LangChain, MCP, and Langfuse"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Requirements File",
      },
      {
        type: "code",
        language: "text",
        caption: "requirements.txt",
        code: `mcp
langchain
langchain-openai
langchain-mcp-adapters
langfuse`,
      },
      {
        type: "heading",
        level: 3,
        text: "The MCP Server with Four Tools",
      },
      {
        type: "paragraph",
        text: "We extend the Day 38 server with a fourth tool: get_fun_fact() that returns a random fun fact. The other three tools (get_weather, calculator, get_time) are the same as before.",
      },
      {
        type: "code",
        language: "python",
        caption: "mcp_server.py: MCP server with 4 tools",
        code: `# mcp_server.py
# Run on your local machine.
# Requires: pip install mcp

from mcp.server.fastmcp import FastMCP
from datetime import datetime
import random

mcp = FastMCP("aarav-assistant-tools")


@mcp.tool()
def get_weather(city: str) -> str:
    """Get the current weather for a city.

    Args:
        city: Name of the city, for example 'Delhi' or 'Mumbai'.
    """
    fake_weather = {
        "Delhi": "32C, sunny",
        "Mumbai": "29C, humid",
        "Chennai": "34C, cloudy",
        "Kolkata": "30C, light rain",
    }
    return fake_weather.get(city, f"Weather data not found for {city}")


@mcp.tool()
def calculator(operation: str, a: float, b: float) -> str:
    """Do basic math: add, subtract, multiply, divide.

    Args:
        operation: One of 'add', 'subtract', 'multiply', 'divide'.
        a: First number.
        b: Second number.
    """
    if operation == "add":
        result = a + b
    elif operation == "subtract":
        result = a - b
    elif operation == "multiply":
        result = a * b
    elif operation == "divide":
        if b == 0:
            return "Error: cannot divide by zero"
        result = a / b
    else:
        return f"Error: unknown operation '{operation}'"
    return f"{a} {operation} {b} = {result}"


@mcp.tool()
def get_time() -> str:
    """Get the current date and time."""
    now = datetime.now()
    return now.strftime("Current time: %I:%M %p on %B %d, %Y")


@mcp.tool()
def get_fun_fact() -> str:
    """Get a random fun fact."""
    facts = [
        "Aarav's favorite superhero, Spider-Man, first appeared in 1962.",
        "The fastest cricket ball ever bowled was 161.3 km/h by Shoaib Akhtar.",
        "Minecraft has sold over 300 million copies, making it the best-selling game ever.",
        "The iPhone was first announced by Steve Jobs on January 9, 2007.",
        "Roblox was created in 2004 and originally named DynaBlocks.",
        "A group of flamingos is called a 'flamboyance'.",
        "Honey never spoils. Archaeologists have found 3000-year-old honey still edible.",
    ]
    return random.choice(facts)


if __name__ == "__main__":
    print("Starting MCP server 'aarav-assistant-tools' with 4 tools...")
    mcp.run()`,
      },
      {
        type: "heading",
        level: 3,
        text: "Test the Tools Standalone",
      },
      {
        type: "code",
        language: "python",
        caption: "test_mcp.py: test all four tools",
        code: `# test_mcp.py
from mcp_server import get_weather, calculator, get_time, get_fun_fact

print("Test get_weather('Kolkata'):", get_weather("Kolkata"))
print("Test calculator('multiply', 9, 8):", calculator("multiply", 9, 8))
print("Test get_time():", get_time())
print("Test get_fun_fact():", get_fun_fact())
print("Test get_fun_fact() again:", get_fun_fact())
print("All tools work!")`,
      },
      {
        type: "heading",
        level: 3,
        text: "The Main Assistant Code",
      },
      {
        type: "paragraph",
        text: "Below is the main assistant. It uses LangChain's ConversationBufferMemory so the assistant remembers previous messages. It loads the four MCP tools, adds the Langfuse callback, and runs a chat loop.",
      },
      {
        type: "code",
        language: "python",
        caption: "assistant.py: AI Personal Assistant (Part 1)",
        code: `# assistant.py
# Run on your local machine: python assistant.py
# Requires: pip install -r requirements.txt

import asyncio
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langfuse.callback import CallbackHandler

# 1. Set up the LLM
llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

# 2. Set up Langfuse
langfuse_handler = CallbackHandler()

# 3. MCP server config
mcp_servers = {
    "aarav-assistant-tools": {
        "command": "python",
        "args": ["mcp_server.py"],
        "transport": "stdio",
    }
}


async def main():
    # Load the four MCP tools
    client = MultiServerMCPClient(mcp_servers)
    tools = await client.load_tools()

    print(f"Loaded {len(tools)} tools:")
    for t in tools:
        print(f"  - {t.name}")

    # Build the prompt WITH memory placeholder
    # The {chat_history} placeholder lets the agent remember past messages.
    prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are Aarav's personal AI assistant. "
         "You can check weather, do math, tell the time, and share fun facts. "
         "Be friendly and answer in one or two short sentences. "
         "Use tools when needed."),
        ("placeholder", "{chat_history}"),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # Create the agent and executor
    agent = create_tool_calling_agent(llm, tools, prompt)
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        handle_parsing_errors=True,
    )

    # Conversation memory: a list of past messages
    chat_history = []

    print("\\n=== Aarav's AI Personal Assistant ===")
    print("Ask me anything! I can check weather, do math, tell time, and share fun facts.")
    print("Type 'quit' to exit.\\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ("quit", "exit"):
            break

        # Run the agent. Each call creates a Langfuse trace.
        result = await executor.ainvoke(
            {"input": user_input, "chat_history": chat_history},
            config={"callbacks": [langfuse_handler]},
        )
        answer = result["output"]
        print(f"Assistant: {answer}\\n")

        # Save this turn in memory so the assistant remembers next time
        chat_history.append(HumanMessage(content=user_input))
        chat_history.append(AIMessage(content=answer))

    # Flush all traces to Langfuse
    langfuse_handler.flush()
    print("Goodbye! Check your Langfuse dashboard for all traces.")


if __name__ == "__main__":
    asyncio.run(main())`,
      },
      {
        type: "heading",
        level: 3,
        text: "What Is New: Memory",
      },
      {
        type: "paragraph",
        text: "The big new feature is memory. The chat_history list stores every HumanMessage and AIMessage. On each turn, we pass chat_history to the agent, so the LLM sees the full conversation. This is how the assistant can answer follow-up questions like 'What about Mumbai?' after you asked about Delhi.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why memory matters",
        text: "Without memory, every question is treated as brand new. With memory, the assistant can say 'As I mentioned, the weather in Delhi is 32C' or answer 'What about Mumbai?' correctly. Memory is what makes an assistant feel like a real conversation.",
      },
      {
        type: "heading",
        level: 3,
        text: "Testing Each Piece",
      },
      {
        type: "paragraph",
        text: "Before running the full assistant, test each piece on its own.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Run python test_mcp.py to confirm all four tools work.",
          "Run python mcp_server.py to confirm the server starts.",
          "Check your LANGFUSE_* environment variables are set.",
          "Run python assistant.py and ask one question.",
          "Open Langfuse and confirm a trace appears.",
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistake",
        text: "Forgetting to add HumanMessage and AIMessage to chat_history after each turn. If you skip this, the assistant will not remember anything, even with the placeholder in the prompt.",
      },
      {
        type: "heading",
        level: 3,
        text: "A Sample Conversation",
      },
      {
        type: "code",
        language: "text",
        caption: "Sample run showing memory in action",
        code: `=== Aarav's AI Personal Assistant ===

You: What is the weather in Delhi?
Assistant: The weather in Delhi is currently 32C and sunny.

You: What about Mumbai?
Assistant: The weather in Mumbai is 29C and humid.

You: Now tell me a fun fact.
Assistant: Here is a fun fact: Minecraft has sold over 300 million copies, making it the best-selling game ever.

You: quit
Goodbye! Check your Langfuse dashboard for all traces.`,
      },
      {
        type: "paragraph",
        text: "Notice how 'What about Mumbai?' works because the assistant remembers the previous weather question. Day 46 will add error handling, a menu, and a better system prompt.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The mcp, langchain, and langfuse packages are not in Pyodide, so this code does not run in the browser playground. Run it locally: pip install -r requirements.txt, run python test_mcp.py first, then python assistant.py. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Prints 'Loaded 4 tools', then starts an interactive chat. The assistant remembers previous questions thanks to the chat_history list. Ask about weather in Delhi, then 'What about Mumbai?', and the assistant answers correctly. Each turn creates a Langfuse trace. Type 'quit' to exit.",
    debugging: [
      "If the assistant does not remember previous questions, make sure you append HumanMessage and AIMessage to chat_history after each turn.",
      "If the MCP server fails to start, run python mcp_server.py alone to find the error.",
      "If Langfuse shows no traces, check that langfuse_handler.flush() was called and env vars are set.",
      "If the LLM does not call tools, check the system prompt mentions the tools.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run test_mcp.py and confirm all four tools work. Run the assistant and ask at least three questions, including one follow-up.",
        hint: "Ask 'What is the weather in Delhi?' then 'What about Mumbai?' to test memory.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add a fifth fun fact to the facts list in mcp_server.py. Restart the assistant and call get_fun_fact until your new fact appears.",
        hint: "Add a string to the facts list inside get_fun_fact.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Change the system prompt so the assistant always ends its answer with a friendly emoji-free question, like 'What else can I help with?'",
        hint: "Edit the system message in ChatPromptTemplate.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Add a new tool get_cricket_score(team) that returns a fake live score for an IPL team. Test it through the assistant.",
        hint: "Use a dictionary mapping team names to fake scores.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "How many tools does the capstone MCP server expose?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation:
          "Four tools: get_weather, calculator, get_time, and get_fun_fact.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "The chat_history list is what gives the assistant memory of previous turns.",
        correctBool: true,
        explanation:
          "True. Each turn we append the HumanMessage and AIMessage to chat_history, then pass it to the agent.",
      },
      {
        id: 3,
        type: "code-output",
        question:
          "What type of object do we append to chat_history for the user's message?",
        code: `chat_history.append(______(content=user_input))`,
        answer: "HumanMessage",
        explanation:
          "We append a HumanMessage for the user's input and an AIMessage for the assistant's response.",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "The placeholder in the prompt that lets the agent see past messages is called ______.",
        answer: "{chat_history}",
        explanation:
          "The {chat_history} placeholder is filled with the list of past HumanMessage and AIMessage objects.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the purpose of the get_fun_fact tool?",
        options: [
          "To check the weather",
          "To return a random fun fact from a list",
          "To do math",
          "To tell the time",
        ],
        correct: 1,
        explanation:
          "get_fun_fact returns a random fun fact from a list using random.choice.",
      },
    ],
    teacherNotes:
      "Day 45 starts the final capstone. The new concept is memory via chat_history. Make sure Aarav tests memory by asking a follow-up question. Day 46 will improve the assistant with better prompts, error handling, and a menu system. Day 47 will use this project in a mock interview.",
    explainToFriend:
      "I built an AI personal assistant. It has four tools (weather, calculator, time, fun fact) exposed through an MCP server. LangChain runs the chat and remembers previous questions using a chat_history list. Langfuse logs every turn. When I ask 'What is the weather in Delhi?' and then 'What about Mumbai?', the assistant remembers the previous question and answers correctly.",
    realWorldExamples: [
      "ChatGPT uses conversation memory to answer follow-up questions.",
      "Siri and Google Assistant remember context within a conversation.",
      "Customer support bots keep chat history so users do not repeat themselves.",
    ],
    thingsToGoogle: [
      "LangChain conversation memory",
      "HumanMessage AIMessage LangChain",
      "create_tool_calling_agent with memory",
    ],
  },

  // ============================================================
  // DAY 46: Project 4 - Final Capstone (Part 2)
  // ============================================================
  {
    dayNumber: 46,
    title: "Project 4: Final Capstone (Part 2)",
    phase: "practical",
    objectives: [
      "Improve the system prompt for better answers",
      "Handle errors gracefully (OpenRouter down, MCP tool fails)",
      "Add a simple menu system (1: chat, 2: weather, 3: calculator, 4: quit)",
      "Test the complete flow and document the code",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Polishing the Assistant",
      },
      {
        type: "paragraph",
        text: "Yesterday we built a working assistant. Today we polish it. We add a better system prompt, graceful error handling for when OpenRouter is down or an MCP tool fails, and a simple menu system. By the end of today, Aarav has a complete, robust AI Personal Assistant ready for the Day 47 mock interview.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Real apps need error handling",
        text: "A demo that crashes when the API is down is not a real app. Real apps handle errors gracefully: they show a friendly message, log the problem, and keep running. Today Aarav learns how.",
      },
      {
        type: "heading",
        level: 3,
        text: "Improvements Overview",
      },
      {
        type: "table",
        headers: ["Improvement", "What it does"],
        rows: [
          ["Better system prompt", "Tells the LLM exactly how to behave"],
          ["Try/except around LLM call", "Catches OpenRouter errors"],
          ["Try/except around tool call", "Catches MCP tool failures"],
          ["Menu system", "User picks 1, 2, 3, or 4 instead of typing free text"],
          ["Code comments", "Documents every section for the mock interview"],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "The Better System Prompt",
      },
      {
        type: "paragraph",
        text: "A good system prompt is specific. It tells the LLM who it is, what it can do, how to format answers, and how to handle uncertainty. Below is the improved prompt we will use.",
      },
      {
        type: "code",
        language: "python",
        caption: "The improved system prompt",
        code: `SYSTEM_PROMPT = """You are Aarav's personal AI assistant.

Your job:
- Help Aarav with weather, math, time, and fun facts.
- Use tools when the question needs one.
- Answer in one or two short, friendly sentences.
- If you are not sure, say so honestly. Do not make up facts.

Tone: friendly, like a helpful classmate.
Examples:
- "The weather in Delhi is 32C and sunny."
- "25 times 4 is 100."
- "Here is a fun fact: Minecraft has sold over 300 million copies."
"""`,
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why this prompt is better",
        text: "It gives the LLM a clear job, a tone, and examples. Examples are powerful: they show the LLM the exact format you want. This is called few-shot prompting.",
      },
      {
        type: "heading",
        level: 3,
        text: "The Menu System",
      },
      {
        type: "paragraph",
        text: "Instead of typing free text, Aarav picks a number from a menu. This makes the app easier to use and easier to test. The menu loops until the user picks 4 (quit).",
      },
      {
        type: "code",
        language: "text",
        caption: "The menu the user sees",
        code: `=== Aarav's AI Personal Assistant ===

Menu:
  1. Chat with the assistant
  2. Check the weather
  3. Use the calculator
  4. Quit

Choose (1-4): `,
      },
      {
        type: "heading",
        level: 3,
        text: "The Complete Improved Code",
      },
      {
        type: "code",
        language: "python",
        caption: "assistant.py: improved assistant with menu and error handling",
        code: `# assistant.py
# Aarav's AI Personal Assistant (Final version, Day 46)
# Run on your local machine: python assistant.py
# Requires: pip install -r requirements.txt

import asyncio
from langchain_openai import ChatOpenAI
from langchain_mcp_adapters.client import MultiServerMCPClient
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, AIMessage
from langfuse.callback import CallbackHandler

# ----- Configuration -----

# Improved system prompt with clear job, tone, and examples
SYSTEM_PROMPT = """You are Aarav's personal AI assistant.

Your job:
- Help Aarav with weather, math, time, and fun facts.
- Use tools when the question needs one.
- Answer in one or two short, friendly sentences.
- If you are not sure, say so honestly. Do not make up facts.

Tone: friendly, like a helpful classmate.
Examples:
- "The weather in Delhi is 32C and sunny."
- "25 times 4 is 100."
- "Here is a fun fact: Minecraft has sold over 300 million copies."
"""

# Set up the LLM
llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

# Set up Langfuse for tracing
langfuse_handler = CallbackHandler()

# MCP server config (uses mcp_server.py from Day 45)
mcp_servers = {
    "aarav-assistant-tools": {
        "command": "python",
        "args": ["mcp_server.py"],
        "transport": "stdio",
    }
}


# ----- Helpers -----

async def ask_assistant(executor, user_input, chat_history):
    """Ask the assistant one question with error handling.

    Returns the assistant's answer as a string, or an error message.
    """
    try:
        result = await executor.ainvoke(
            {"input": user_input, "chat_history": chat_history},
            config={"callbacks": [langfuse_handler]},
        )
        return result["output"]
    except Exception as e:
        # Catch OpenRouter errors, MCP errors, parsing errors, etc.
        return f"Sorry, something went wrong: {e}"


def print_menu():
    """Print the menu options."""
    print("\\n=== Aarav's AI Personal Assistant ===")
    print("Menu:")
    print("  1. Chat with the assistant")
    print("  2. Check the weather")
    print("  3. Use the calculator")
    print("  4. Quit")


# ----- Main -----

async def main():
    # Load the four MCP tools
    try:
        client = MultiServerMCPClient(mcp_servers)
        tools = await client.load_tools()
        print(f"Loaded {len(tools)} tools from MCP server.")
    except Exception as e:
        print(f"FATAL: Could not load MCP tools: {e}")
        print("Make sure mcp_server.py is in this folder and runs on its own.")
        return

    # Build the prompt with memory placeholder
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("placeholder", "{chat_history}"),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}"),
    ])

    # Create the agent and executor
    agent = create_tool_calling_agent(llm, tools, prompt)
    executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=False,  # turn off verbose for cleaner menu output
        handle_parsing_errors=True,
    )

    # Conversation memory
    chat_history = []

    # Menu loop
    while True:
        print_menu()
        choice = input("Choose (1-4): ").strip()

        if choice == "1":
            # Free chat
            user_input = input("You: ")
            if not user_input:
                continue
            answer = await ask_assistant(executor, user_input, chat_history)
            print(f"Assistant: {answer}")
            chat_history.append(HumanMessage(content=user_input))
            chat_history.append(AIMessage(content=answer))

        elif choice == "2":
            # Weather
            city = input("Which city? ")
            question = f"What is the weather in {city}?"
            answer = await ask_assistant(executor, question, chat_history)
            print(f"Assistant: {answer}")
            chat_history.append(HumanMessage(content=question))
            chat_history.append(AIMessage(content=answer))

        elif choice == "3":
            # Calculator
            print("Operations: add, subtract, multiply, divide")
            op = input("Operation: ").strip()
            try:
                a = float(input("First number: "))
                b = float(input("Second number: "))
            except ValueError:
                print("Please enter valid numbers.")
                continue
            question = f"What is {a} {op} {b}?"
            answer = await ask_assistant(executor, question, chat_history)
            print(f"Assistant: {answer}")
            chat_history.append(HumanMessage(content=question))
            chat_history.append(AIMessage(content=answer))

        elif choice == "4":
            # Quit
            langfuse_handler.flush()
            print("Goodbye! Check your Langfuse dashboard for all traces.")
            break

        else:
            print("Please choose 1, 2, 3, or 4.")


if __name__ == "__main__":
    asyncio.run(main())`,
      },
      {
        type: "heading",
        level: 3,
        text: "Walking Through the Improvements",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "SYSTEM_PROMPT: now includes a clear job, tone, and examples (few-shot prompting).",
          "ask_assistant helper: wraps the executor.ainvoke call in try/except so errors do not crash the app.",
          "print_menu helper: prints the four options cleanly.",
          "Tool loading wrapped in try/except: if MCP fails to start, we print a friendly message and exit instead of crashing.",
          "verbose=False: turns off the noisy agent logs so the menu output is clean.",
          "Menu loop: user picks 1, 2, 3, or 4. Each branch builds the right question and calls ask_assistant.",
          "Calculator branch validates input: catches ValueError if the user types a non-number.",
          "langfuse_handler.flush() only on quit: traces are sent before exit.",
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Real error scenario",
        text: "If OpenRouter is down, the LLM call fails. Without try/except, the app crashes and the user sees an ugly stack trace. With our ask_assistant helper, the user sees 'Sorry, something went wrong' and the app keeps running.",
      },
      {
        type: "heading",
        level: 3,
        text: "A Sample Run",
      },
      {
        type: "code",
        language: "text",
        caption: "Sample menu-driven run",
        code: `Loaded 4 tools from MCP server.

=== Aarav's AI Personal Assistant ===
Menu:
  1. Chat with the assistant
  2. Check the weather
  3. Use the calculator
  4. Quit
Choose (1-4): 2
Which city? Delhi
Assistant: The weather in Delhi is 32C and sunny.

=== Aarav's AI Personal Assistant ===
Menu:
  1. Chat with the assistant
  2. Check the weather
  3. Use the calculator
  4. Quit
Choose (1-4): 3
Operations: add, subtract, multiply, divide
Operation: multiply
First number: 9
Second number: 8
Assistant: 9 multiply 8 = 72.

=== Aarav's AI Personal Assistant ===
Menu:
  1. Chat with the assistant
  2. Check the weather
  3. Use the calculator
  4. Quit
Choose (1-4): 1
You: Tell me a fun fact
Assistant: Here is a fun fact: A group of flamingos is called a 'flamboyance'.

=== Aarav's AI Personal Assistant ===
Menu:
  1. Chat with the assistant
  2. Check the weather
  3. Use the calculator
  4. Quit
Choose (1-4): 4
Goodbye! Check your Langfuse dashboard for all traces.`,
      },
      {
        type: "heading",
        level: 3,
        text: "Documenting the Code",
      },
      {
        type: "paragraph",
        text: "Comments are how you explain your code to others (and to yourself in three months). Notice how every section in the code above starts with a comment like # ----- Configuration ----- or # ----- Helpers -----. This makes the file easy to scan. For the Day 47 mock interview, Aarav should be able to explain every section.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Interview tip",
        text: "If an interviewer asks 'explain your project', do not read the code line by line. Explain the architecture (Day 44), then walk through the main loop, then highlight one cool feature (like memory or error handling). Practice this on Day 47.",
      },
      {
        type: "heading",
        level: 3,
        text: "Why This Project Matters",
      },
      {
        type: "paragraph",
        text: "Aarav has now built a complete, robust AI Personal Assistant. It uses an open standard (MCP) for tools, a popular framework (LangChain) for orchestration with memory, a professional observability tool (Langfuse) for tracing, a clear system prompt for quality, and graceful error handling for robustness. This is a portfolio-worthy project for a 13-year-old.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The mcp, langchain, and langfuse packages are not in Pyodide, so this code does not run in the browser playground. Run it locally: pip install -r requirements.txt, keep mcp_server.py from Day 45 in the same folder, set the LANGFUSE_* env vars, then python assistant.py. Use your real OpenRouter API key in place of YOUR_OPENROUTER_API_KEY.",
    expectedOutput:
      "Loads 4 tools, then shows a menu. Choose 2 to check weather, 3 to use the calculator, 1 to chat freely, or 4 to quit. Each action creates a Langfuse trace. The assistant remembers previous turns thanks to chat_history. Errors are caught and shown as friendly messages instead of crashing the app.",
    debugging: [
      "If the menu keeps reprinting without action, you typed an invalid choice. Pick 1, 2, 3, or 4.",
      "If the calculator branch says 'Please enter valid numbers', you typed text instead of a number.",
      "If the assistant says 'Sorry, something went wrong', open Langfuse to find the trace and see the exact error.",
      "If MCP tools fail to load, run python mcp_server.py alone to find the error.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Run the improved assistant and test all four menu options. Confirm each works and creates a Langfuse trace.",
        hint: "Try 2 (weather), 3 (calculator), 1 (chat), and 4 (quit) in order.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Add a fifth menu option: 5. Get a fun fact. Wire it to the get_fun_fact tool.",
        hint: "Add an elif choice == '5' branch that asks for a fun fact.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Test the error handling by temporarily breaking your OpenRouter API key (change one character). Confirm the app shows 'Sorry, something went wrong' instead of crashing.",
        hint: "Edit the api_key value, run, observe the error, then fix it back.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Add a 'clear memory' menu option (6) that resets chat_history to an empty list. Test that follow-up questions no longer remember previous context.",
        hint: "Add elif choice == '6' that sets chat_history = [].",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main improvement to the system prompt in Day 46?",
        options: [
          "It is shorter",
          "It includes a clear job, tone, and examples",
          "It removes the system message",
          "It is in a different language",
        ],
        correct: 1,
        explanation:
          "The improved prompt adds a clear job description, tone guidance, and examples. This is called few-shot prompting.",
      },
      {
        id: 2,
        type: "code-output",
        question:
          "What does the app print if OpenRouter is down and the LLM call raises an exception?",
        code: `try:
    result = await executor.ainvoke(...)
    return result["output"]
except Exception as e:
    return f"Sorry, something went wrong: {e}"`,
        answer: "Sorry, something went wrong: <error details>",
        explanation:
          "The try/except in ask_assistant catches the error and returns a friendly message instead of crashing.",
      },
      {
        id: 3,
        type: "true-false",
        question:
          "The menu system requires the user to type a number from 1 to 4.",
        correctBool: true,
        explanation:
          "True. The user picks 1 (chat), 2 (weather), 3 (calculator), or 4 (quit).",
      },
      {
        id: 4,
        type: "fill-blank",
        question:
          "To validate that the user typed a number for the calculator, we wrap float(input(...)) in a try/______ block.",
        answer: "except",
        explanation:
          "try/except catches a ValueError if the user typed text instead of a number.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why is verbose set to False in the final assistant?",
        options: [
          "To make the app run faster",
          "To make the menu output cleaner and easier to read",
          "To disable the LLM",
          "To turn off Langfuse",
        ],
        correct: 1,
        explanation:
          "With verbose=False, the agent does not print every step, so the menu output stays clean and readable.",
      },
    ],
    teacherNotes:
      "Day 46 polishes the capstone into a robust, menu-driven app. Make sure Aarav tests the error handling by temporarily breaking his API key. The goal is for him to see that the app stays alive instead of crashing. Day 47 uses this project in a mock interview, so Aarav should practice explaining it out loud.",
    explainToFriend:
      "I improved my AI assistant. It now has a better system prompt with examples, error handling that catches OpenRouter and MCP failures without crashing, and a menu where you pick 1 (chat), 2 (weather), 3 (calculator), or 4 (quit). The code is commented in sections so I can explain it in an interview. Each turn is logged to Langfuse so I can debug problems later.",
    realWorldExamples: [
      "Production AI apps wrap every LLM call in try/except to avoid crashing.",
      "Menu systems are common in CLI tools (like git or npm subcommands).",
      "Few-shot prompting (giving examples in the prompt) is a standard technique for better LLM answers.",
    ],
    thingsToGoogle: [
      "LangChain AgentExecutor error handling",
      "few-shot prompting examples",
      "python try except ValueError",
    ],
  },

  // ============================================================
  // DAY 47: Mock Interview Preparation
  // ============================================================
  {
    dayNumber: 47,
    title: "Mock Interview Preparation",
    phase: "practical",
    objectives: [
      "Answer common Python and AI interview questions",
      "Explain the final capstone project clearly",
      "Practice explaining code line by line",
      "Build confidence for the Day 48 final assessment",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Getting Ready for the Interview",
      },
      {
        type: "paragraph",
        text: "Tomorrow is the final assessment. Today we practice the kind of questions an interviewer might ask about Python, AI, and Aarav's capstone project. For each question, we give a model answer Aarav can use as a starting point. The goal is not to memorize, but to understand and explain in his own words.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "How to use this lesson",
        text: "Read each question, close the lesson, and try to answer out loud. Then read the model answer and compare. Practice with a parent or friend asking the questions. The more you practice out loud, the more confident you will feel.",
      },
      {
        type: "heading",
        level: 3,
        text: "Common Interview Questions and Model Answers",
      },
      {
        type: "table",
        headers: ["Question", "Model Answer (short version)"],
        rows: [
          [
            "What is Python?",
            "Python is a high-level, easy-to-read programming language used for web apps, data science, AI, and automation. It uses indentation instead of braces, which makes the code look clean.",
          ],
          [
            "What is a variable?",
            "A variable is a named box that stores a value. In Python you create one with assignment, like name = 'Aarav'. The name points to the value in memory.",
          ],
          [
            "What is a function?",
            "A function is a reusable block of code that takes inputs (arguments), does work, and returns an output. You define one with def in Python.",
          ],
          [
            "What is a list?",
            "A list is an ordered collection of items. You can add, remove, and access items by index. Example: scores = [10, 20, 30].",
          ],
          [
            "What is a dictionary?",
            "A dictionary stores key-value pairs. You look up a value by its key. Example: weather = {'Delhi': '32C', 'Mumbai': '29C'}.",
          ],
          [
            "What is an LLM?",
            "A Large Language Model is an AI trained on huge amounts of text to predict the next word. It can answer questions, write code, and chat. Examples: GPT-4, Llama 3, Gemma 2.",
          ],
          [
            "What is a Transformer?",
            "A Transformer is the neural network architecture behind modern LLMs. It uses attention to decide which parts of the input to focus on. It was introduced in the 2017 paper 'Attention Is All You Need'.",
          ],
          [
            "What is the difference between ML and Deep Learning?",
            "Machine Learning is a broad field where computers learn patterns from data. Deep Learning is a subset of ML that uses neural networks with many layers. All deep learning is ML, but not all ML is deep learning.",
          ],
          [
            "What is RAG?",
            "RAG stands for Retrieval Augmented Generation. You retrieve relevant documents from a knowledge base, then feed them to the LLM so it can answer using your data. It is like giving the LLM an open-book exam.",
          ],
          [
            "What is MCP and why does it exist?",
            "MCP (Model Context Protocol) is an open standard that lets LLMs call external tools and read external data in a consistent way. It exists because before MCP, every AI app needed custom glue code for every tool. MCP is like USB for AI tools.",
          ],
          [
            "What is LangChain?",
            "LangChain is a framework for building apps with LLMs. It provides abstractions for prompts, chains, agents, tools, and memory. It makes it easier to orchestrate LLM calls and tool calls.",
          ],
          [
            "What is Langfuse?",
            "Langfuse is an observability platform for LLM apps. It tracks every LLM call as a trace, with spans and generations, so you can see prompts, responses, token counts, latency, and cost in a dashboard.",
          ],
          [
            "Explain your final project.",
            "I built an AI Personal Assistant. It uses LangChain for orchestration with conversation memory, an MCP server with four tools (weather, calculator, time, fun fact), Langfuse for tracing, and a menu-driven UI with error handling. The architecture is: Browser -> Next.js -> LangChain -> OpenRouter + MCP, with Langfuse logging in the background.",
          ],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Explaining Code Line by Line",
      },
      {
        type: "paragraph",
        text: "An interviewer might show you a snippet of code and ask 'explain this line by line.' Practice on the snippet below, which is a tiny version of the capstone agent setup.",
      },
      {
        type: "code",
        language: "python",
        caption: "Practice snippet: explain each line out loud",
        code: `from langchain_openai import ChatOpenAI
from langfuse.callback import CallbackHandler

llm = ChatOpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1",
    model="tencent/hy3:free",
)

langfuse_handler = CallbackHandler()

response = llm.invoke(
    "What is the capital of India?",
    config={"callbacks": [langfuse_handler]},
)
print(response.content)`,
      },
      {
        type: "heading",
        level: 3,
        text: "Line-by-Line Explanation",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Line 1: import ChatOpenAI from langchain_openai. This class lets us talk to any OpenAI-compatible API, including OpenRouter.",
          "Line 2: import CallbackHandler from langfuse.callback. This is the Langfuse callback that logs every LLM call.",
          "Line 4 to 8: create the LLM. We pass the OpenRouter API key, the OpenRouter base URL, and the free tencent/hy3:free model.",
          "Line 10: create the Langfuse callback handler. It reads LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY from environment variables.",
          "Line 12 to 15: call llm.invoke with a question. The config tells LangChain to use the Langfuse callback for this call, which creates a trace.",
          "Line 16: print the response content. response is an AIMessage object, and .content is the actual text the LLM returned.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Interview tip",
        text: "When explaining code, do not just read it. Explain what each line DOES and WHY. For example: 'Line 4 creates the LLM. We use OpenRouter because it gives us free access to many models.'",
      },
      {
        type: "heading",
        level: 3,
        text: "Practice Questions",
      },
      {
        type: "paragraph",
        text: "Below are practice questions that mix Python, AI, and project-specific topics. Try to answer each in 2 or 3 sentences out loud before reading the model answers above.",
      },
      {
        type: "table",
        headers: ["Topic", "Practice Question"],
        rows: [
          ["Python", "What is the difference between a list and a tuple?"],
          ["Python", "What does the def keyword do?"],
          ["Python", "How do you handle an exception in Python?"],
          ["AI", "What is tokenization?"],
          ["AI", "Why do LLMs sometimes make up facts (hallucinate)?"],
          ["MCP", "Name two things an MCP server can expose."],
          ["LangChain", "What does an AgentExecutor do?"],
          ["Langfuse", "What is the difference between a trace and a span?"],
          ["Project", "How does your assistant remember previous questions?"],
          ["Project", "What happens if the OpenRouter API is down?"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common interview mistake",
        text: "Trying to sound smarter than you are. If you do not know an answer, say 'I am not sure, but I think it has to do with X.' Interviewers prefer honesty over made-up answers.",
      },
      {
        type: "heading",
        level: 3,
        text: "Explaining the Project Architecture",
      },
      {
        type: "paragraph",
        text: "Be ready to draw the architecture diagram from Day 44 and explain each arrow. Practice this script: 'The user types in the browser. The browser sends the question to a Next.js backend. The backend calls LangChain. LangChain calls the OpenRouter API for the LLM and the MCP server for tools. Langfuse logs everything in the background.'",
      },
      {
        type: "heading",
        level: 3,
        text: "Practice Plan for Today",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Read each Q&A in the big table above. Cover the answer and try to recite it.",
          "Pick 3 questions and write your own answer in your own words.",
          "Explain the line-by-line code snippet out loud to a parent or friend.",
          "Draw the architecture diagram from memory on paper.",
          "Run your capstone project one more time so it is fresh in your mind.",
        ],
      },
      {
        type: "paragraph",
        text: "Tomorrow is the final assessment. It has three parts: a practical test (add a new MCP tool), a theory study checklist (20 topics), and viva questions (explain the architecture). Rest well tonight and come back fresh.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. Today is mostly review and practice. The code snippet above can run in the playground if you replace YOUR_OPENROUTER_API_KEY with your real OpenRouter key, because it uses only the openai-compatible ChatOpenAI client. Practice answering questions out loud, not just in your head.",
    expectedOutput:
      "If you run the practice snippet, it prints the LLM's answer to 'What is the capital of India?' (expected: 'New Delhi'). The main deliverable today is that Aarav can answer the interview questions out loud without reading.",
    debugging: [
      "If you cannot remember an answer, re-read the relevant day's lesson. The worklog lists which day covers which topic.",
      "If your explanation sounds robotic, practice saying it in your own words.",
      "If you forget the architecture, redraw the Day 44 diagram from memory.",
      "If a parent or friend asks a question you do not know, say 'I am not sure' instead of making something up.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Pick 3 questions from the big Q&A table. Cover the answers and try to recite them out loud.",
        hint: "Practice with a parent or sibling asking the questions.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Write your own 3-sentence answer to 'Explain your final project' without looking at the model answer.",
        hint: "Mention LangChain, MCP, Langfuse, and the four tools.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Explain the line-by-line code snippet out loud to a parent or friend. Time yourself: aim for under 2 minutes.",
        hint: "Focus on what each line does and why.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Draw the full-stack architecture diagram from Day 44 on paper from memory. Label every box and every arrow.",
        hint: "Browser, Next.js, LangChain, OpenRouter, MCP Server, Tools, Langfuse (dotted).",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does MCP stand for?",
        options: [
          "Model Context Protocol",
          "Machine Code Pipeline",
          "Multi-Client Program",
          "Memory Cache Protocol",
        ],
        correct: 0,
        explanation:
          "MCP stands for Model Context Protocol, an open standard for connecting LLMs to tools and data.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "Deep Learning is a subset of Machine Learning that uses neural networks with many layers.",
        correctBool: true,
        explanation:
          "True. All deep learning is ML, but not all ML is deep learning. Deep learning specifically uses multi-layer neural networks.",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "RAG stands for Retrieval ______ Generation.",
        answer: "Augmented",
        explanation:
          "RAG is Retrieval Augmented Generation. You retrieve documents, then the LLM generates an answer using them.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What is the best thing to do if you do not know an interview answer?",
        options: [
          "Make up an answer that sounds smart",
          "Say 'I am not sure, but I think it has to do with X'",
          "Stay silent",
          "Change the subject",
        ],
        correct: 1,
        explanation:
          "Honesty is the best policy. Interviewers prefer 'I am not sure' over a made-up answer.",
      },
      {
        id: 5,
        type: "fill-blank",
        question:
          "In the practice snippet, response.content holds the actual ______ the LLM returned.",
        answer: "text",
        explanation:
          "response is an AIMessage object, and .content is the actual text the LLM returned.",
      },
    ],
    teacherNotes:
      "Day 47 is about confidence. Have Aarav practice answering out loud, not just in his head. The most important question is 'Explain your final project' because that is what the Day 48 viva will focus on. Remind Aarav that honesty beats made-up answers every time. Tomorrow is the final assessment.",
    explainToFriend:
      "I practiced answering interview questions about Python and AI. I can explain what Python, variables, functions, LLMs, Transformers, RAG, MCP, LangChain, and Langfuse are. I can also explain my final project: an AI Personal Assistant that uses LangChain with memory, an MCP server with four tools, and Langfuse for tracing. If I do not know an answer, I say 'I am not sure' instead of making something up.",
    realWorldExamples: [
      "Software engineers do mock interviews before real job interviews.",
      "Open-source contributors explain their projects at conferences.",
      "Students defend their projects in front of a panel (a viva).",
    ],
    thingsToGoogle: [
      "Python interview questions for beginners",
      "LLM interview questions",
      "how to explain your project in an interview",
    ],
  },

  // ============================================================
  // DAY 48: Final Assessment
  // ============================================================
  {
    dayNumber: 48,
    title: "Final Assessment and Course Completion",
    phase: "practical",
    objectives: [
      "Add a new MCP tool (get_random_joke) to the capstone project",
      "Review all key topics from Days 1 to 47 using a study checklist",
      "Answer viva questions about the project architecture",
      "Generate the course completion certificate on the Progress page",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "The Final Day",
      },
      {
        type: "paragraph",
        text: "Today is the final assessment. It has three parts: a practical test (add a new MCP tool to your capstone), a theory study checklist (20 topics from the whole course), and viva questions (explain the architecture to the evaluator). At the end, you will generate your course completion certificate on the Progress page.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "How this day works",
        text: "Unlike other days, today is mostly you doing the work. Read each section, complete the practical test, review the theory checklist, practice the viva questions, and then claim your certificate. You have earned it.",
      },
      {
        type: "heading",
        level: 3,
        text: "Part 1: Practical Test (Add get_random_joke Tool)",
      },
      {
        type: "paragraph",
        text: "Add a new MCP tool called get_random_joke() to your mcp_server.py from Day 45. It should return a random joke from a list of at least 5 jokes. Then add a new menu option (5. Get a random joke) to your assistant.py from Day 46. Test that it works end to end.",
      },
      {
        type: "code",
        language: "python",
        caption: "Add this tool to mcp_server.py (inside the file, after get_fun_fact)",
        code: `@mcp.tool()
def get_random_joke() -> str:
    """Get a random kid-friendly joke."""
    jokes = [
        "Why did the cricket player bring a ladder to the match? To reach the high scores!",
        "What is Spider-Man's favorite subject in school? Web design!",
        "Why did the iPhone go to school? To get a little smarter!",
        "What do you call a Minecraft creeper at a party? A blast!",
        "Why do Roblox players make good friends? Because they always build you up!",
        "What is a superhero's favorite meal? Soup-erman!",
        "Why was the cricket bat sad? Because it kept getting hit for six!",
    ]
    return random.choice(jokes)`,
      },
      {
        type: "code",
        language: "python",
        caption: "Add this menu branch to assistant.py (inside the menu loop)",
        code: `elif choice == "5":
    # Get a random joke
    question = "Tell me a random joke."
    answer = await ask_assistant(executor, question, chat_history)
    print(f"Assistant: {answer}")
    chat_history.append(HumanMessage(content=question))
    chat_history.append(AIMessage(content=answer))`,
      },
      {
        type: "code",
        language: "python",
        caption: "Update the print_menu function to show option 5",
        code: `def print_menu():
    """Print the menu options."""
    print("\\n=== Aarav's AI Personal Assistant ===")
    print("Menu:")
    print("  1. Chat with the assistant")
    print("  2. Check the weather")
    print("  3. Use the calculator")
    print("  4. Get a random joke")
    print("  5. Quit")`,
      },
      {
        type: "callout",
        variant: "tip",
        title: "Test it",
        text: "After the changes, run python test_mcp.py to confirm get_random_joke works. Then run python assistant.py, pick option 4 (or 5, depending on your menu), and confirm the assistant tells you a joke. Check Langfuse for the trace.",
      },
      {
        type: "heading",
        level: 3,
        text: "Part 2: Theory Study Checklist (20 Topics)",
      },
      {
        type: "paragraph",
        text: "Below is a study checklist of 20 topics from the whole course. For each topic, write one sentence in your own words. If you cannot, go back and re-read that day. This is your study guide, not the actual assessment.",
      },
      {
        type: "table",
        headers: ["#", "Topic", "Covered on Day"],
        rows: [
          ["1", "What is Python and why is it popular", "Day 1"],
          ["2", "Variables, integers, floats, strings, booleans", "Days 2-3"],
          ["3", "Lists, tuples, dictionaries, sets", "Days 4-6"],
          ["4", "If/else, for loops, while loops", "Days 7-8"],
          ["5", "Functions, arguments, return values", "Day 9"],
          ["6", "Classes, objects, methods", "Days 11-12"],
          ["7", "Reading and writing files", "Day 14"],
          ["8", "List comprehensions and lambda functions", "Day 16"],
          ["9", "What is AI, ML, and Deep Learning", "Days 17-18"],
          ["10", "What is a neural network", "Day 19"],
          ["11", "What is a Transformer and attention", "Day 20"],
          ["12", "What is an LLM and tokenization", "Day 21"],
          ["13", "Prompt engineering basics", "Day 22"],
          ["14", "Calling an LLM with the OpenAI client", "Day 23"],
          ["15", "What is RAG (Retrieval Augmented Generation)", "Day 26"],
          ["16", "What is LangChain and why use it", "Day 28"],
          ["17", "What is MCP (Model Context Protocol)", "Day 36"],
          ["18", "Building an MCP server with FastMCP", "Day 38"],
          ["19", "What is Langfuse and observability", "Day 40"],
          ["20", "Full-stack AI architecture", "Day 44"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Do not skip the checklist",
        text: "Even if you feel confident, write the one-sentence answer for each topic. Writing helps you remember. If you cannot write a sentence for a topic, re-read that day before the viva.",
      },
      {
        type: "heading",
        level: 3,
        text: "Part 3: Viva Questions (Explain the Architecture)",
      },
      {
        type: "paragraph",
        text: "For the viva, the evaluator will ask you to explain your capstone project. Be ready to answer these questions out loud. Practice each one until you can answer in 1 or 2 minutes.",
      },
      {
        type: "table",
        headers: ["Viva Question", "What to Cover in Your Answer"],
        rows: [
          [
            "Explain the architecture of your AI Personal Assistant",
            "Browser -> Next.js -> LangChain -> OpenRouter + MCP, with Langfuse logging in the background. Mention each box and arrow from the Day 44 diagram.",
          ],
          [
            "Why did you use MCP instead of writing custom tool code?",
            "MCP is a standard. Write the tool once, plug it into any MCP-aware LLM. No custom glue. Like USB for AI tools.",
          ],
          [
            "How does your assistant remember previous questions?",
            "Conversation memory. After each turn, I append a HumanMessage and an AIMessage to a chat_history list, then pass it to the agent on the next turn.",
          ],
          [
            "How do you debug when the assistant gives a wrong answer?",
            "Open the Langfuse dashboard, find the trace, read the exact prompt and response, and figure out what went wrong. Maybe the system prompt is unclear or the tool description is bad.",
          ],
          [
            "What happens if OpenRouter is down?",
            "The ask_assistant helper wraps the LLM call in try/except. The user sees 'Sorry, something went wrong' and the app keeps running instead of crashing.",
          ],
          [
            "Why did you choose tencent/hy3:free as your model?",
            "It is free on OpenRouter and works well for general chat and tool calling. I compared it with llama-3-8b and gemma-2-9b on Day 43.",
          ],
          [
            "What is one thing you would improve next?",
            "Answers will vary. Examples: add more tools (news, sports scores), add a web UI with Next.js, save chat history to a database.",
          ],
        ],
      },
      {
        type: "heading",
        level: 3,
        text: "Part 4: Course Completion and Certificate",
      },
      {
        type: "paragraph",
        text: "Once you have completed the practical test, reviewed the theory checklist, and practiced the viva questions, you are ready to claim your certificate. Open the Progress page in the handbook app and follow the steps below.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Open the Progress page from the navigation menu.",
          "Check that all 48 days are marked as completed.",
          "Check that the Day 48 assessment shows a passing score.",
          "Click the 'Generate Certificate' button.",
          "Your certificate will appear with your name (Aarav Singh) and the date.",
          "Download or print the certificate as a PDF.",
        ],
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Congratulations, Aarav",
        text: "You have completed a 48-day journey from Python basics to a full-stack AI Personal Assistant. You learned Python, object-oriented programming, machine learning theory, LLMs, prompt engineering, RAG, LangChain, MCP, Langfuse, system design, and you built two real projects. This is a huge accomplishment for a 13-year-old. Be proud.",
      },
      {
        type: "heading",
        level: 3,
        text: "What Comes Next",
      },
      {
        type: "paragraph",
        text: "This course is the foundation, not the end. Here are some directions to explore next, in order of difficulty.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Add more MCP tools to your assistant (news, sports scores, movie info).",
          "Build a web UI for your assistant with Next.js and Tailwind CSS.",
          "Learn about vector databases (Pinecone, Chroma) for better RAG.",
          "Explore fine-tuning a small model on your own data.",
          "Read the original Transformer paper ('Attention Is All You Need').",
          "Contribute to an open-source AI project on GitHub.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Stay curious",
        text: "The best AI engineers are the ones who keep building. Pick a small project every month. Share it with friends. The skills you learned here will compound over time.",
      },
      {
        type: "heading",
        level: 3,
        text: "Final Words",
      },
      {
        type: "paragraph",
        text: "Aarav, you started 48 days ago not knowing what Python was. Today you can build an AI assistant that talks, checks the weather, does math, tells the time, shares fun facts, and tells jokes, all observable in a professional dashboard. That is real engineering. Keep building, keep learning, and stay curious. The world needs more young engineers like you.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode. The practical test (adding get_random_joke) requires running your local capstone project from Days 45-46. The theory checklist and viva questions are review material you read and practice out loud. The certificate is generated on the Progress page of the handbook app, not in code.",
    expectedOutput:
      "After the practical test, your assistant has 5 tools and a menu with 5 options (chat, weather, calculator, joke, quit). Pick option 4 (or 5) and the assistant tells you a random joke. The theory checklist and viva questions prepare you for the final assessment. On the Progress page, clicking Generate Certificate produces a PDF with your name and date.",
    debugging: [
      "If get_random_joke is not found, make sure you added the @mcp.tool() decorator and restarted the assistant.",
      "If the menu option does nothing, double-check the elif branch matches your menu numbering.",
      "If the certificate button is disabled, make sure all 48 days are marked complete and the Day 48 assessment has a passing score.",
      "If you cannot answer a viva question, re-read the relevant day. The worklog lists which day covers which topic.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description:
          "Add the get_random_joke tool to mcp_server.py and a new menu option to assistant.py. Test it end to end.",
        hint: "Use the code snippets above. Run test_mcp.py first to confirm the tool works.",
      },
      {
        id: 2,
        difficulty: "medium",
        description:
          "Write one sentence in your own words for each of the 20 theory checklist topics. Re-read any day where you get stuck.",
        hint: "Use the table above as your guide. Mark off each topic as you write.",
      },
      {
        id: 3,
        difficulty: "medium",
        description:
          "Practice the 7 viva questions out loud with a parent or friend. Time yourself: aim for under 2 minutes per answer.",
        hint: "Focus on the Day 44 architecture diagram and the Day 46 error handling.",
      },
      {
        id: 4,
        difficulty: "hard",
        description:
          "Write a 200-word reflection on what you learned in this 48-day course and what you want to build next.",
        hint: "Mention Python, AI, MCP, LangChain, Langfuse, and your capstone project.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What new tool do you add to the capstone on Day 48?",
        options: [
          "get_random_joke",
          "get_weather",
          "calculator",
          "get_time",
        ],
        correct: 0,
        explanation:
          "You add get_random_joke(), which returns a random kid-friendly joke from a list.",
      },
      {
        id: 2,
        type: "true-false",
        question:
          "The theory study checklist on Day 48 covers topics from all 48 days of the course.",
        correctBool: true,
        explanation:
          "True. The checklist spans Day 1 (What is Python) through Day 44 (Full-stack architecture).",
      },
      {
        id: 3,
        type: "fill-blank",
        question:
          "The certificate is generated on the ______ page of the handbook app.",
        answer: "Progress",
        explanation:
          "Open the Progress page, make sure all 48 days are complete, then click Generate Certificate.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "In the viva, what should you explain first about your project?",
        options: [
          "Every line of code",
          "The architecture (the Day 44 diagram)",
          "Your favorite color",
          "The exact cost of the API",
        ],
        correct: 1,
        explanation:
          "Start with the architecture (Browser -> Next.js -> LangChain -> OpenRouter + MCP, with Langfuse logging). Then walk through the main loop.",
      },
      {
        id: 5,
        type: "code-output",
        question:
          "What does get_random_joke() return when called?",
        code: `from mcp_server import get_random_joke
print(get_random_joke())`,
        answer: "A random kid-friendly joke string from the jokes list",
        explanation:
          "get_random_joke uses random.choice to return one joke from the list of 7 jokes. The exact joke varies each call.",
      },
    ],
    teacherNotes:
      "Day 48 is the capstone assessment. Make sure Aarav completes all four parts: the practical test (add get_random_joke), the theory checklist, the viva practice, and the certificate generation. Celebrate the completion of a 48-day journey. Encourage Aarav to keep building small projects every month. The certificate is real recognition of real work.",
    explainToFriend:
      "I completed my 48-day Python and AI course. For the final assessment, I added a new tool (get_random_joke) to my AI assistant, reviewed 20 key topics from the whole course, practiced viva questions about my project architecture, and generated my certificate. I can now build an AI assistant that uses LangChain, MCP, Langfuse, and the OpenRouter API. This is the proudest thing I have built.",
    realWorldExamples: [
      "Many coding bootcamps end with a capstone project and a viva.",
      "Open-source projects often require contributors to explain their changes.",
      "Google Summer of Code students present their projects at the end of the program.",
    ],
    thingsToGoogle: [
      "vector databases for RAG",
      "fine-tuning small LLMs",
      "Attention Is All You Need paper",
    ],
  },
];
