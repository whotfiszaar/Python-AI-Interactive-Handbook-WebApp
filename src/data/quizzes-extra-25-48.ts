import type { QuizQuestion } from "@/types";

// Additional quiz questions for Days 25 to 48.
// Each day has 5+ extra questions (IDs starting at 10) so that when
// combined with the existing 5 questions per day (IDs 1-5) the day has
// at least 10 total questions.
//
// Question types used:
//   - multiple-choice: requires options[] + correct (index)
//   - true-false:      requires correctBool
//   - fill-blank:      requires answer
//   - code-output:     requires code + answer
//
// All topics stay inside the curriculum of each day and use child-friendly
// examples (Aarav, cricket, cars, Minecraft, Spider-Man, pizza, etc.).
// No em dashes are used anywhere in this file.

export const extraQuizzes25to48: Record<number, QuizQuestion[]> = {
  // ============================================================
  // DAY 25: Software Concepts for AI
  // ============================================================
  25: [
    {
      id: 10,
      type: "multiple-choice",
      question: "In the restaurant analogy, what plays the role of the menu?",
      options: [
        "The HTTP response",
        "The list of API endpoints",
        "The API key",
        "The Python interpreter",
      ],
      correct: 1,
      explanation:
        "The menu lists what you can order, just like the list of API endpoints lists what your code can ask the server to do.",
    },
    {
      id: 11,
      type: "true-false",
      question: "GET is the HTTP method you use to send brand new data to the server.",
      correctBool: false,
      explanation:
        "False. GET is for reading or fetching data. POST is the method used to send new data to the server.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In Python you read a secret from outside your code using os.environ.____('OPENROUTER_API_KEY').",
      answer: "get",
      explanation:
        "os.environ.get('OPENROUTER_API_KEY') reads the value of the environment variable without crashing if it is missing.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this Python code print?",
      code: 'import json\n\ndata = json.loads(\'{"name": "Aarav", "age": 13}\')\nprint(data["age"] + 2)',
      answer: "15",
      explanation:
        "json.loads turns the JSON text into a Python dict. data['age'] is 13, and 13 + 2 is 15.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which of these is the safest place to store your OpenRouter API key?",
      options: [
        "Printed in a comment at the top of your Python file",
        "Inside a public GitHub repository",
        "In an environment variable on your computer",
        "In a Discord message to your friend",
      ],
      correct: 2,
      explanation:
        "Environment variables live outside your code, so they never get leaked when you share or upload your project.",
    },
    {
      id: 15,
      type: "true-false",
      question: "JSON uses curly braces for objects and square brackets for lists, just like Python.",
      correctBool: true,
      explanation:
        "True. JSON looks almost identical to Python dicts and lists, which makes it easy to read for both humans and machines.",
    },
  ],

  // ============================================================
  // DAY 26: Setting up OpenRouter
  // ============================================================
  26: [
    {
      id: 10,
      type: "multiple-choice",
      question: "The lesson compares OpenRouter to which real-life app?",
      options: ["Swiggy", "WhatsApp", "YouTube", "Minecraft"],
      correct: 0,
      explanation:
        "OpenRouter is like Swiggy for AI models: one app, many kitchens (model providers), one delivery person (one API key).",
    },
    {
      id: 11,
      type: "true-false",
      question: "With OpenRouter you need a separate API key from every AI company you want to use.",
      correctBool: false,
      explanation:
        "False. One OpenRouter API key lets you call hundreds of models from many providers without signing up for each one.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "When creating the OpenAI client for OpenRouter, the base_url is set to https://openrouter.ai/api/____.",
      answer: "v1",
      explanation:
        "The base_url is 'https://openrouter.ai/api/v1'. The /v1 matches the version of the OpenAI-compatible API.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print if the LLM replies 'Hello Aarav!'?",
      code: 'response = client.chat.completions.create(\n    model="tencent/hy3:free",\n    messages=[{"role": "user", "content": "Say hi"}]\n)\nprint(response.choices[0].message.content)',
      answer: "Hello Aarav!",
      explanation:
        "response.choices[0].message.content extracts the text of the LLM reply, which in this case is 'Hello Aarav!'.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which Python package does the course use to talk to OpenRouter?",
      options: ["requests", "openai", "flask", "pandas"],
      correct: 1,
      explanation:
        "OpenRouter speaks the OpenAI-compatible API, so we use the openai package's OpenAI client to call it.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Free models on OpenRouter are good enough for learning and testing your code.",
      correctBool: true,
      explanation:
        "True. Many models ending in ':free' are perfect for practice and let you build real AI apps without spending money.",
    },
  ],

  // ============================================================
  // DAY 27: Chat Conversations
  // ============================================================
  27: [
    {
      id: 10,
      type: "multiple-choice",
      question: "Which three roles appear in the messages list for a chat?",
      options: [
        "system, user, assistant",
        "client, server, waiter",
        "input, output, error",
        "start, middle, end",
      ],
      correct: 0,
      explanation:
        "A chat uses three roles: system (the rules), user (Aarav's question), and assistant (the LLM's reply).",
    },
    {
      id: 11,
      type: "true-false",
      question: "The LLM automatically remembers what you said in previous turns, so you only need to send the latest message.",
      correctBool: false,
      explanation:
        "False. The LLM has NO memory. Every call you must resend the entire conversation in the messages list.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "When you add the LLM's reply back into the messages list, its role is ____.",
      answer: "assistant",
      explanation:
        "The LLM's reply is stored with role 'assistant' so the next call knows it was the AI's previous answer.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What role does the new entry get in this code?",
      code: 'messages = [{"role": "user", "content": "Hi"}]\nreply = "Hello Aarav!"\nmessages.append({"role": "assistant", "content": reply})\nprint(messages[-1]["role"])',
      answer: "assistant",
      explanation:
        "The appended dict has role 'assistant', so messages[-1]['role'] is 'assistant'.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why must you resend the whole conversation every turn?",
      options: [
        "Because the internet is slow",
        "Because the LLM is stateless and has no built-in memory",
        "Because Python lists delete old items",
        "Because OpenRouter charges less that way",
      ],
      correct: 1,
      explanation:
        "LLMs are stateless. They only know what is in the current messages list, so you must include the full history each call.",
    },
    {
      id: 15,
      type: "true-false",
      question: "The system message is usually the first item in the messages list.",
      correctBool: true,
      explanation:
        "True. The system message sets the rules and personality, so it goes first before any user or assistant messages.",
    },
  ],

  // ============================================================
  // DAY 28: Prompt Templates
  // ============================================================
  28: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does 'few-shot' prompting mean?",
      options: [
        "Shooting a few photos with a camera",
        "Giving the LLM a few example input/output pairs to learn from",
        "Sending only a few tokens to save money",
        "Running the prompt a few times until it works",
      ],
      correct: 1,
      explanation:
        "Few-shot means you include several example questions and answers in the prompt so the model learns the pattern you want.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The system prompt should change on every single turn of the chat.",
      correctBool: false,
      explanation:
        "False. The system prompt is fixed and stays the same across turns. Only the user and assistant messages change.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In a system prompt, you give the LLM a fixed ____ so it acts the same way every time.",
      answer: "personality",
      explanation:
        "A system prompt sets a fixed personality (like 'You are Bolt, a friendly buddy for Aarav') that the LLM keeps across the chat.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'system = "You are a cricket coach for Aarav."\nuser = "How do I hold a bat?"\nmessages = [\n    {"role": "system", "content": system},\n    {"role": "user", "content": user}\n]\nprint(len(messages))',
      answer: "2",
      explanation:
        "The messages list has two items: the system message and the user message, so len(messages) is 2.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What is the job of the system prompt in a chat?",
      options: [
        "To store the user's question",
        "To set rules and the personality for the LLM",
        "To save tokens",
        "To replace the API key",
      ],
      correct: 1,
      explanation:
        "The system prompt sets rules and personality so the LLM behaves the same way throughout the chat.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Adding too many few-shot examples can waste tokens and slow down your call.",
      correctBool: true,
      explanation:
        "True. Each example costs tokens. Too many examples eat your context window and make calls slower and pricier.",
    },
  ],

  // ============================================================
  // DAY 29: Project 1 - AI Chatbot (Bolt)
  // ============================================================
  29: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What is the name of the chatbot built in this project?",
      options: ["Rocky", "Bolt", "Flash", "Spider"],
      correct: 1,
      explanation:
        "The project builds Bolt, a fast and friendly chatbot (like a cricket bolt) that can talk to Aarav about any topic.",
    },
    {
      id: 11,
      type: "true-false",
      question: "Bolt keeps a messages list so it can remember the conversation across turns.",
      correctBool: true,
      explanation:
        "True. Bolt appends each user input and each assistant reply to a messages list, then resends the whole list every turn.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "When the user types '____', the chat loop stops and the program ends.",
      answer: "bye",
      explanation:
        "Typing 'bye' breaks the chat loop and ends the Bolt chatbot program.",
    },
    {
      id: 13,
      type: "code-output",
      question: "Why does the code call messages.pop() after an error?",
      code: 'messages.append({"role": "user", "content": user_input})\ntry:\n    reply = call_llm(messages)\nexcept Exception:\n    messages.pop()',
      answer:
        "To remove the user message that failed so the next try does not resend a broken turn",
      explanation:
        "If the LLM call fails, popping the just-added user message keeps the history clean for the next attempt.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What should Bolt do if Aarav sends an empty input?",
      options: [
        "Crash the program",
        "Send the empty input to the LLM anyway",
        "Skip it and ask for the message again",
        "Delete all history",
      ],
      correct: 2,
      explanation:
        "Handling empty input means skipping it and asking again, which keeps the chat friendly and avoids wasted API calls.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Bolt can switch topics mid-conversation, like jumping from cricket to Minecraft.",
      correctBool: true,
      explanation:
        "True. Because Bolt keeps the full history in a list, Aarav can change topics any time and Bolt will follow along.",
    },
  ],

  // ============================================================
  // DAY 30: Working with JSON Responses
  // ============================================================
  30: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does json.loads() do in Python?",
      options: [
        "Turns a Python dict into a JSON string",
        "Turns JSON text into a Python object (dict or list)",
        "Loads a file from disk",
        "Downloads JSON from the internet",
      ],
      correct: 1,
      explanation:
        "json.loads() parses a JSON string and returns the matching Python object: a dict for objects, a list for arrays.",
    },
    {
      id: 11,
      type: "true-false",
      question: "json.loads() always returns a string.",
      correctBool: false,
      explanation:
        "False. It returns a dict if the JSON was an object, a list if it was an array, an int if it was a number, and so on.",
    },
    {
      id: 12,
      type: "fill-blank",
      question: "The Python module used to read and write JSON is called ____.",
      answer: "json",
      explanation:
        "The built-in module 'json' has loads() and dumps() for parsing and creating JSON text.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'import json\n\ncars = json.loads(\'["McLaren", "Ferrari", "Lamborghini"]\')\nprint(cars[1])',
      answer: "Ferrari",
      explanation:
        "json.loads gives a Python list. cars[1] is the second item, 'Ferrari'.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why do we wrap json.loads() in a try/except block?",
      options: [
        "Because the LLM sometimes returns broken or extra text around the JSON",
        "Because Python is slow at parsing",
        "Because the json module crashes on import",
        "Because we want to skip the JSON entirely",
      ],
      correct: 0,
      explanation:
        "Models sometimes add chatter or markdown around the JSON. try/except lets your code recover gracefully instead of crashing.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Telling the LLM 'Reply with valid JSON only, no extra text' helps it return clean JSON.",
      correctBool: true,
      explanation:
        "True. A clear instruction in the system prompt makes the model skip explanations and return only the JSON you can parse.",
    },
  ],

  // ============================================================
  // DAY 31: What is LangChain?
  // ============================================================
  31: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What problem does LangChain mainly solve?",
      options: [
        "It makes Python run faster",
        "It packages repeating LLM patterns into reusable building blocks",
        "It replaces the openai package completely",
        "It draws graphs in the browser",
      ],
      correct: 1,
      explanation:
        "LangChain turns repeating patterns (prompts, calls, parsing, memory) into reusable pieces so you do not write them over and over.",
    },
    {
      id: 11,
      type: "true-false",
      question: "You can pip install langchain and run it inside this app's Pyodide playground.",
      correctBool: false,
      explanation:
        "False. The playground uses Pyodide, which cannot install langchain. You study the LangChain code here and run it on a real computer.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In LangChain, the pipe symbol ____ means 'feed the output of the left side into the right side'.",
      answer: "|",
      explanation:
        "The pipe symbol | is LangChain Expression Language (LCEL). prompt | llm | parser chains the pieces together.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What method does a LangChain chain use to run with an input?",
      code: 'chain = prompt | llm\nresponse = chain.____({"question": "Hi"})',
      answer: "invoke",
      explanation:
        "LangChain chains use .invoke(input) to run. The input is a dict that fills the prompt's placeholders.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which is NOT one of the five main LangChain pieces listed in the lesson?",
      options: ["Prompt templates", "Chains", "Memory", "Database tables"],
      correct: 3,
      explanation:
        "The five pieces are prompt templates, LLMs/chat models, chains, memory, agents, and output parsers. Database tables are not one of them.",
    },
    {
      id: 15,
      type: "true-false",
      question: "In LangChain, the response text is found in response.content, not response.choices[0].message.content.",
      correctBool: true,
      explanation:
        "True. LangChain wraps the reply, so you read response.content directly instead of digging through choices.",
    },
  ],

  // ============================================================
  // DAY 32: LangChain Prompts and Chains
  // ============================================================
  32: [
    {
      id: 10,
      type: "multiple-choice",
      question: "Which class builds a chat prompt with variables in LangChain?",
      options: [
        "ChatPromptTemplate",
        "OpenAI",
        "ConversationBufferMemory",
        "ResponseSchema",
      ],
      correct: 0,
      explanation:
        "ChatPromptTemplate.from_messages([...]) builds a prompt with placeholders like {hero} that you fill in at call time.",
    },
    {
      id: 11,
      type: "true-false",
      question: "In LangChain, the pipe symbol | between prompt and llm means 'logical OR'.",
      correctBool: false,
      explanation:
        "False. In LangChain the pipe means 'feed the left side's output into the right side', building a chain (LCEL).",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "A variable in a ChatPromptTemplate is written inside curly braces, like ____.",
      answer: "{question}",
      explanation:
        "Placeholders like {question} are filled in when you call invoke({'question': '...'}).",
    },
    {
      id: 13,
      type: "code-output",
      question: "What is the value passed to invoke to fill {hero}?",
      code: 'prompt = ChatPromptTemplate.from_messages([\n    ("user", "Tell me one fact about {hero}.")\n])\nchain = prompt | llm\nchain.invoke({"hero": "Spider-Man"})',
      answer: "Spider-Man",
      explanation:
        "The dict {'hero': 'Spider-Man'} fills the {hero} placeholder, so the prompt becomes 'Tell me one fact about Spider-Man.'",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What happens if you forget to pass a variable that the template expects?",
      options: [
        "LangChain silently ignores it",
        "LangChain raises an error because the variable is missing",
        "The LLM fills it in for you",
        "The program prints nothing",
      ],
      correct: 1,
      explanation:
        "If you forget a required variable, LangChain raises an error at invoke time so you fix the missing input.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Once you build a chain with prompt | llm, you can reuse it with many different inputs.",
      correctBool: true,
      explanation:
        "True. The chain is reusable. You call invoke() with different dicts to generate different outputs from the same template.",
    },
  ],

  // ============================================================
  // DAY 33: LangChain Memory
  // ============================================================
  33: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does ConversationBufferMemory do?",
      options: [
        "Stores every user and assistant message and replays them each turn",
        "Deletes all messages after each call",
        "Calls the LLM faster",
        "Translates messages to English",
      ],
      correct: 0,
      explanation:
        "ConversationBufferMemory stores the full history of user and assistant messages and injects them into the prompt automatically.",
    },
    {
      id: 11,
      type: "true-false",
      question: "ConversationBufferWindowMemory keeps every message forever, even in very long chats.",
      correctBool: false,
      explanation:
        "False. Window memory keeps only the last k messages (for example k=10) to save tokens in longer chats.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "To keep only the last 10 messages, you set the parameter ____ to 10 in ConversationBufferWindowMemory.",
      answer: "k",
      explanation:
        "The parameter k controls the window size. k=10 keeps the last 10 messages and drops older ones.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What is the job of MessagesPlaceholder(variable_name='history')?",
      code: 'prompt = ChatPromptTemplate.from_messages([\n    ("system", "You are Bolt."),\n    MessagesPlaceholder(variable_name="history"),\n    ("user", "{input}")\n])',
      answer:
        "It marks the spot where memory injects the previous messages into the prompt",
      explanation:
        "MessagesPlaceholder tells the template where to insert the chat history stored in memory before sending to the LLM.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which memory type is best for very long chats where you want a compressed history?",
      options: [
        "ConversationBufferMemory",
        "ConversationSummaryMemory",
        "No memory at all",
        "A plain Python list",
      ],
      correct: 1,
      explanation:
        "ConversationSummaryMemory uses the LLM to summarize old messages, which keeps token cost low in very long chats.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Without MessagesPlaceholder in the prompt, memory has nowhere to inject the history.",
      correctBool: true,
      explanation:
        "True. The placeholder is the slot where LangChain inserts past messages. Without it, memory would have no place to go.",
    },
  ],

  // ============================================================
  // DAY 34: LangChain Output Parsing
  // ============================================================
  34: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does a ResponseSchema describe?",
      options: [
        "The color of the response",
        "One field the LLM must include in its JSON, with a name and description",
        "The price of the API call",
        "The model's name",
      ],
      correct: 1,
      explanation:
        "A ResponseSchema defines one expected field: its name, type, and a description that tells the LLM what to put there.",
    },
    {
      id: 11,
      type: "true-false",
      question: "StructuredOutputParser asks the LLM to return JSON matching the schemas you defined.",
      correctBool: true,
      explanation:
        "True. The parser tells the model exactly which fields to produce and then parses the reply into a clean Python dict.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "After building a StructuredOutputParser, you add it to the chain with the ____ symbol.",
      answer: "|",
      explanation:
        "You extend the chain as prompt | llm | parser, so the LLM's text flows into the parser for cleaning.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What kind of Python object does parser.parse() return?",
      code: 'parser = StructuredOutputParser.from_response_schemas([name_schema, age_schema])\nchain = prompt | llm | parser\nresult = chain.invoke({"topic": "cricket"})\nprint(type(result))',
      answer: "dict",
      explanation:
        "The parser returns a clean Python dict with keys matching the schema names, like {'name': ..., 'age': ...}.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What happens if you forget to add the parser to the chain?",
      options: [
        "You still get a clean dict",
        "You get the raw LLM text instead of a parsed dict",
        "The LLM refuses to answer",
        "Python crashes on import",
      ],
      correct: 1,
      explanation:
        "Without the parser, the chain returns the raw response object. The parser is what turns text into a clean dict.",
    },
    {
      id: 15,
      type: "true-false",
      question: "PydanticOutputParser is a more powerful alternative to StructuredOutputParser for complex outputs.",
      correctBool: true,
      explanation:
        "True. PydanticOutputParser uses Pydantic models, which support nested fields, validation, and more complex shapes.",
    },
  ],

  // ============================================================
  // DAY 35: Project 2 - AI Story Generator
  // ============================================================
  35: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does the Story Generator project let Aarav pick?",
      options: [
        "Genre, character name, and setting",
        "The price of the book",
        "The font size only",
        "The LLM model name only",
      ],
      correct: 0,
      explanation:
        "Aarav picks a genre (adventure, mystery, comedy), a main character name, and a setting, then the LLM writes Chapter 1.",
    },
    {
      id: 11,
      type: "true-false",
      question: "Memory is used so that Chapter 2 stays consistent with Chapter 1.",
      correctBool: true,
      explanation:
        "True. The same memory carries the story from Chapter 1 into Chapter 2 so names, places, and events match.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "After Chapter 1, Aarav types ____ to make the LLM write Chapter 2.",
      answer: "continue",
      explanation:
        "Typing 'continue' triggers the next chapter using the same memory, so the story keeps going smoothly.",
    },
    {
      id: 13,
      type: "code-output",
      question: "If Aarav picks genre 'mystery', what fills the {genre} placeholder?",
      code: 'prompt = ChatPromptTemplate.from_messages([\n    ("system", "Write a {genre} story about {hero} in {place}.")\n])\nchain.invoke({"genre": "mystery", "hero": "Aarav", "place": "Mumbai"})',
      answer: "mystery",
      explanation:
        "The dict {'genre': 'mystery', ...} fills {genre} with the word 'mystery' before the LLM sees the prompt.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why does memory matter for a story generator across multiple chapters?",
      options: [
        "It makes the LLM faster",
        "It keeps characters and events consistent from chapter to chapter",
        "It lowers the price",
        "It changes the genre automatically",
      ],
      correct: 1,
      explanation:
        "Memory resends earlier chapters, so the LLM remembers who the hero is and what already happened, keeping the story consistent.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Over many chapters, stories can drift because the model forgets early details or adds new ideas.",
      correctBool: true,
      explanation:
        "True. Even with memory, very long stories can drift as the model loses early details or invents new ones. That is a known challenge.",
    },
  ],

  // ============================================================
  // DAY 36: What is MCP (Model Context Protocol)?
  // ============================================================
  36: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does MCP stand for?",
      options: [
        "Model Context Protocol",
        "Multi Code Program",
        "Main Cricket Pitch",
        "Memory Cache Pool",
      ],
      correct: 0,
      explanation:
        "MCP stands for Model Context Protocol, an open standard for connecting LLMs to external tools and data.",
    },
    {
      id: 11,
      type: "true-false",
      question: "MCP is to AI tools what USB is to computer peripherals.",
      correctBool: true,
      explanation:
        "True. Just like USB gave one standard plug for many devices, MCP gives one standard protocol for many AI tools.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The tool provider (for example, a weather service) runs an MCP ____.",
      answer: "server",
      explanation:
        "The tool provider runs an MCP Server that exposes tools and resources. Your LLM app runs an MCP Client.",
    },
    {
      id: 13,
      type: "code-output",
      question: "In the data flow, who talks to the MCP Server?",
      code: 'A["LLM App (your code)"] <--> B["MCP Client"]\nB <--> C["MCP Server"]\nC <--> D["External Tool"]',
      answer: "MCP Client",
      explanation:
        "The LLM App talks to the MCP Client, which talks to the MCP Server, which talks to the external tool.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What problem does MCP solve?",
      options: [
        "Writing custom glue code for every tool and LLM combination",
        "Making Python run in the browser",
        "Choosing the best cricket team",
        "Saving images as PNG",
      ],
      correct: 0,
      explanation:
        "Before MCP, each tool needed its own glue code for each LLM. MCP replaces that with one standard protocol.",
    },
    {
      id: 15,
      type: "true-false",
      question: "MCP lets an LLM app ask a server 'what tools do you have?' in a common format.",
      correctBool: true,
      explanation:
        "True. MCP standardizes listing tools, describing them, calling them, and exposing resources, all in one common format.",
    },
  ],

  // ============================================================
  // DAY 37: MCP Basics
  // ============================================================
  37: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What two main things does an MCP server expose?",
      options: [
        "Tools and resources",
        "Cookies and sessions",
        "HTML and CSS",
        "Printers and keyboards",
      ],
      correct: 0,
      explanation:
        "An MCP server exposes tools (functions the LLM can call) and resources (read-only data the LLM can read).",
    },
    {
      id: 11,
      type: "true-false",
      question: "Resources in MCP are read-only data that the LLM can read.",
      correctBool: true,
      explanation:
        "True. Resources are read-only, like a file or a database row. Tools are the things the LLM can actually call to do work.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The MCP ____ discovers tools, calls them, and returns the results to the LLM.",
      answer: "client",
      explanation:
        "The MCP Client (run by your LLM app) lists tools, calls them on the LLM's behalf, and returns the results.",
    },
    {
      id: 13,
      type: "code-output",
      question: "If a server lists get_weather, calculator, and get_time, how many tools does it expose?",
      code: 'tools = ["get_weather", "calculator", "get_time"]\nprint(len(tools))',
      answer: "3",
      explanation:
        "The list has three items, so the server exposes 3 tools.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why does MCP split the work into a client and a server?",
      options: [
        "So the same tool can be used by many different LLM apps",
        "So Python runs faster",
        "So you do not need an API key",
        "So the LLM never calls any tools",
      ],
      correct: 0,
      explanation:
        "Splitting client and server means one tool server can be reused by many LLM apps without rewriting the tool.",
    },
    {
      id: 15,
      type: "true-false",
      question: "A common beginner mistake is confusing tools (callable) with resources (read-only).",
      correctBool: true,
      explanation:
        "True. Tools do work when called; resources are read-only data. Mixing them up is a common mistake on day one with MCP.",
    },
  ],

  // ============================================================
  // DAY 38: Building a Simple MCP Server
  // ============================================================
  38: [
    {
      id: 10,
      type: "multiple-choice",
      question: "How many tools does the first MCP server in this lesson expose?",
      options: ["One", "Two", "Three", "Ten"],
      correct: 2,
      explanation:
        "The lesson's first real MCP server exposes three tools (for example, get_weather, calculator, and get_time).",
    },
    {
      id: 11,
      type: "true-false",
      question: "Type hints in your MCP tool functions matter because they help describe the parameters.",
      correctBool: true,
      explanation:
        "True. Type hints tell MCP what type each parameter is, so it can build an accurate schema for the LLM.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In the MCP Python package, you mark a function as a tool using the ____ decorator.",
      answer: "@mcp.tool",
      explanation:
        "The @mcp.tool decorator registers the function as an MCP tool that the LLM can discover and call.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does the parameter schema describe for a tool?",
      code: '@mcp.tool()\ndef get_weather(city: str) -> str:\n    """Return the weather for a city."""\n    ...',
      answer:
        "The name, type, and description of each parameter the tool accepts",
      explanation:
        "The schema lists each parameter (like city: str) plus the docstring, so the LLM knows how to call the tool.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why do we test the server standalone before connecting it to an LLM?",
      options: [
        "To make sure each tool works on its own before the LLM uses it",
        "Because LLMs cannot call tools",
        "Because Python refuses to import the server otherwise",
        "To make the server run faster",
      ],
      correct: 0,
      explanation:
        "Testing standalone catches bugs in your tool functions before the LLM tries to use them, which is much easier to debug.",
    },
    {
      id: 15,
      type: "true-false",
      question: "The MCP server can be run on its own machine, separate from your LLM app.",
      correctBool: true,
      explanation:
        "True. The client-server design means the server can run anywhere (even another machine) and the client connects to it.",
    },
  ],

  // ============================================================
  // DAY 39: Connecting MCP to LangChain
  // ============================================================
  39: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does LangChain's MCP adapter do?",
      options: [
        "Loads tools from an MCP server so the LLM can use them",
        "Deletes tools from the server",
        "Turns Python into JavaScript",
        "Replaces the OpenAI client",
      ],
      correct: 0,
      explanation:
        "The MCP adapter loads the server's tools into LangChain so the LLM can decide which tool to call and with what arguments.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The LLM itself decides which MCP tool to call and with what arguments.",
      correctBool: true,
      explanation:
        "True. You give the LLM the list of tools; the LLM reads the user's question and chooses the right tool and arguments.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "You turn MCP tools into LangChain tools by calling load_mcp ____.",
      answer: "tools",
      explanation:
        "The helper load_mcp_tools() loads the server's tools into LangChain so the agent can call them.",
    },
    {
      id: 13,
      type: "code-output",
      question: "When the LLM calls get_weather(city='Mumbai'), what flows back to the LLM?",
      code: 'tools = load_mcp_tools(session)\nagent = create_react_agent(llm, tools)\nresult = agent.invoke({"input": "What is the weather in Mumbai?"})',
      answer: "The result string returned by the get_weather tool",
      explanation:
        "The MCP server runs get_weather('Mumbai') and sends the result text back to the LLM, which uses it to answer the user.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What does verbose=True do when building the agent?",
      options: [
        "Prints extra detail about the LLM's tool calls so you can trace what happens",
        "Makes the LLM answer louder",
        "Skips all tool calls",
        "Turns off the API key check",
      ],
      correct: 0,
      explanation:
        "verbose=True prints the LLM's thoughts and tool calls, which is great for learning and debugging.",
    },
    {
      id: 15,
      type: "true-false",
      question: "A common error is forgetting to start the MCP server before connecting the client.",
      correctBool: true,
      explanation:
        "True. If the server is not running, the client cannot connect and you get a connection error.",
    },
  ],

  // ============================================================
  // DAY 40: What is Langfuse? AI Observability
  // ============================================================
  40: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What is Langfuse?",
      options: [
        "A Python library for drawing graphs",
        "An observability platform for AI apps that tracks traces, spans, and generations",
        "A new LLM model",
        "A cricket scoring app",
      ],
      correct: 1,
      explanation:
        "Langfuse is an observability platform. It records every LLM call so you can see what happened and debug problems.",
    },
    {
      id: 11,
      type: "true-false",
      question: "A trace in Langfuse can contain multiple spans and generations.",
      correctBool: true,
      explanation:
        "True. A trace is the big picture of one user action, and it contains smaller spans and LLM generations inside it.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Being able to see inside your AI app to understand what is happening is called ____.",
      answer: "observability",
      explanation:
        "Observability means you can trace, measure, and debug what your AI app does, which is what Langfuse provides.",
    },
    {
      id: 13,
      type: "code-output",
      question: "Which of these is a metric Langfuse tracks for each generation?",
      code: 'gen = {\n    "model": "gemma-2-9b-it",\n    "tokens": 250,\n    "latency_ms": 1200,\n    "cost_usd": 0.0001\n}',
      answer: "tokens (and latency, cost, model)",
      explanation:
        "Langfuse tracks tokens, latency, cost, and the model name for each generation, plus inputs and outputs.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "In the lesson's analogy, Langfuse is like which real-life thing?",
      options: [
        "A security camera that records what happens in a shop",
        "A microwave that cooks food",
        "A printer that prints paper",
        "A car engine",
      ],
      correct: 0,
      explanation:
        "Langfuse is like a security camera for your AI app: it records what happened so you can replay and debug it later.",
    },
    {
      id: 15,
      type: "true-false",
      question: "A common mistake is adding Langfuse after your app is broken, instead of from the start.",
      correctBool: true,
      explanation:
        "True. If you wait until something breaks, you have no past traces to look at. Adding Langfuse early gives you history.",
    },
  ],

  // ============================================================
  // DAY 41: Integrating Langfuse with LangChain
  // ============================================================
  41: [
    {
      id: 10,
      type: "multiple-choice",
      question: "How do you add Langfuse tracing to a LangChain app?",
      options: [
        "Add a Langfuse callback handler to the chain or LLM",
        "Rewrite your code in JavaScript",
        "Restart your computer",
        "Switch to a different LLM",
      ],
      correct: 0,
      explanation:
        "You pass a Langfuse callback handler to LangChain. Every call then shows up in the Langfuse dashboard automatically.",
    },
    {
      id: 11,
      type: "true-false",
      question: "One callback handler can trace many LLM calls in your app.",
      correctBool: true,
      explanation:
        "True. The same handler attached to your chain or LLM records every call, so you do not need to instrument each one by hand.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In LangChain, Langfuse is plugged in by passing a callback ____ to the chain.",
      answer: "handler",
      explanation:
        "You create a callback handler (like CallbackHandler from langfuse) and pass it via the callbacks parameter.",
    },
    {
      id: 13,
      type: "code-output",
      question: "After running this code, where do you look to see the trace?",
      code: 'handler = CallbackHandler(public_key="pk-...", secret_key="sk-...")\nchain = prompt | llm\nchain.invoke({"question": "Hi"}, config={"callbacks": [handler]})',
      answer: "The Langfuse dashboard",
      explanation:
        "The handler sends the trace data to Langfuse, so you open the Langfuse dashboard to see it.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What is a real debugging use of Langfuse shown in the lesson?",
      options: [
        "Finding a slow LLM call by looking at its latency in a trace",
        "Choosing which cricket team to support",
        "Installing Python on your computer",
        "Designing a new logo",
      ],
      correct: 0,
      explanation:
        "By inspecting a trace you can see which generation took the longest, then optimize that part of your app.",
    },
    {
      id: 15,
      type: "true-false",
      question: "If traces are missing in Langfuse, a common cause is wrong or missing API keys.",
      correctBool: true,
      explanation:
        "True. If the public/secret keys are wrong or missing, the handler cannot send data, so no traces appear.",
    },
  ],

  // ============================================================
  // DAY 42: Project 3 - AI Assistant with Tools
  // ============================================================
  42: [
    {
      id: 10,
      type: "multiple-choice",
      question: "Which three technologies are combined in Project 3?",
      options: [
        "LangChain, MCP, and Langfuse",
        "HTML, CSS, and JavaScript",
        "Word, Excel, and PowerPoint",
        "Photoshop, Illustrator, and InDesign",
      ],
      correct: 0,
      explanation:
        "Project 3 combines LangChain (chat), MCP (tools), and Langfuse (tracing) into one assistant.",
    },
    {
      id: 11,
      type: "true-false",
      question: "Every interaction in the assistant is visible in the Langfuse dashboard.",
      correctBool: true,
      explanation:
        "True. The Langfuse callback records every LLM call and every tool call so you can see the whole interaction.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The project tests three kinds of questions: weather, calculator, and ____.",
      answer: "time",
      explanation:
        "The assistant is tested with weather, calculator, and time questions to confirm each MCP tool works.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does handle_parsing_errors=True do in the agent?",
      code: 'agent = create_react_agent(\n    llm,\n    tools,\n    handle_parsing_errors=True\n)',
      answer:
        "If the LLM's tool call is malformed, the agent recovers instead of crashing",
      explanation:
        "handle_parsing_errors=True tells the agent to send a friendly error back to the LLM and try again, instead of crashing.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why is this project called a 'real AI app' in the lesson?",
      options: [
        "Because it uses a real LLM with real tools and real tracing, like production apps",
        "Because it costs a lot of money",
        "Because it only works offline",
        "Because it has no code",
      ],
      correct: 0,
      explanation:
        "It mixes an LLM, MCP tools, and Langfuse tracing, which is the same shape as real production AI assistants.",
    },
    {
      id: 15,
      type: "true-false",
      question: "If traces are missing tool calls, a common fix is to make sure the tools were loaded before creating the agent.",
      correctBool: true,
      explanation:
        "True. If tools are not loaded into the agent, the LLM never sees them, so no tool calls show up in the traces.",
    },
  ],

  // ============================================================
  // DAY 43: LLM Model Comparison
  // ============================================================
  43: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What three things does the lesson compare across models?",
      options: [
        "Quality, speed, and instruction-following",
        "Color, size, and weight",
        "Price, brand, and warranty",
        "Height, age, and name",
      ],
      correct: 0,
      explanation:
        "For each model the lesson looks at answer quality, response time, and how well the model followed the instructions.",
    },
    {
      id: 11,
      type: "true-false",
      question: "All LLMs respond at the exact same speed, so speed is not a useful comparison.",
      correctBool: false,
      explanation:
        "False. Models differ a lot in speed. Some answer in under a second, others take several seconds for the same prompt.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The lesson measures response time using the function time.____().",
      answer: "time",
      explanation:
        "time.time() returns the current time in seconds. You call it before and after the LLM call and subtract to get the duration.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'import time\nstart = time.time()\n# (imagine an LLM call here that takes 0 seconds)\nend = time.time()\nprint(round(end - start, 2))',
      answer: "0.0",
      explanation:
        "If no time passes between start and end, end - start is 0.0, and round(0.0, 2) is 0.0.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why is it useful to compare models on the same prompt?",
      options: [
        "So you can pick the best model for each task (fast, smart, or cheap)",
        "Because OpenRouter requires it",
        "Because Python only works with one model",
        "So you do not need an API key",
      ],
      correct: 0,
      explanation:
        "Different models shine at different tasks. Comparing them lets you pick the fastest, smartest, or cheapest for each job.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Free models on OpenRouter can change over time, so the comparison results may not stay the same forever.",
      correctBool: true,
      explanation:
        "True. Free models get updated or removed, so a comparison done today might look different in a few months.",
    },
  ],

  // ============================================================
  // DAY 44: AI System Design (Simple Level)
  // ============================================================
  44: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What is system design in this lesson?",
      options: [
        "Drawing the full-stack architecture of an AI app and naming each part",
        "Choosing the color of the UI",
        "Picking a cricket team",
        "Writing a single Python function",
      ],
      correct: 0,
      explanation:
        "System design here means zooming out and drawing the whole AI app: browser, server, LLM, MCP, Langfuse, and how they connect.",
    },
    {
      id: 11,
      type: "true-false",
      question: "Langfuse is the part of the system that provides observability (tracing).",
      correctBool: true,
      explanation:
        "True. Langfuse sits to the side and records traces from your app so you can see what each LLM call did.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In the architecture, the user types into the ____ which sends requests to the server.",
      answer: "browser",
      explanation:
        "The user interacts with the browser. The browser sends HTTP requests to your server, which then calls the LLM.",
    },
    {
      id: 13,
      type: "code-output",
      question: "Order the flow from user input to LLM reply.",
      code: 'flow = [\n    "Browser sends request",\n    "Server calls the LLM",\n    "LLM returns answer",\n    "Server replies to browser"\n]\nprint(len(flow))',
      answer: "4",
      explanation:
        "There are 4 steps: browser sends request, server calls the LLM, LLM returns answer, server replies to browser.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Where does MCP fit in the architecture?",
      options: [
        "Between your server and external tools, letting the LLM call them",
        "Inside the browser only",
        "Between the user and the keyboard",
        "It replaces the LLM",
      ],
      correct: 0,
      explanation:
        "MCP sits between your server and external tools (weather, calculator, time). The LLM calls them through MCP.",
    },
    {
      id: 15,
      type: "true-false",
      question: "A common beginner mistake is forgetting to draw the LLM and just showing the browser and server.",
      correctBool: true,
      explanation:
        "True. The LLM (and where it lives, like OpenRouter) is a key part of the system. Leaving it out makes the diagram incomplete.",
    },
  ],

  // ============================================================
  // DAY 45: Final Capstone (Part 1)
  // ============================================================
  45: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does the Final Capstone build?",
      options: [
        "An AI Personal Assistant with chat, tools, and tracing",
        "A simple calculator with no AI",
        "A static website with no code",
        "A cricket score board only",
      ],
      correct: 0,
      explanation:
        "The capstone builds an AI Personal Assistant that uses LangChain memory, MCP tools, and Langfuse tracing together.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The capstone uses LangChain memory so the assistant remembers earlier turns.",
      correctBool: true,
      explanation:
        "True. LangChain memory (like ConversationBufferMemory) keeps the chat history so the assistant remembers what Aarav said.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The capstone's MCP server exposes ____ tools (the lesson says four).",
      answer: "four",
      explanation:
        "Part 1 of the capstone adds an MCP server with four tools that the assistant can call.",
    },
    {
      id: 13,
      type: "code-output",
      question: "In a chat loop, what stops the loop when Aarav types 'quit'?",
      code: 'while True:\n    user_input = input("You: ")\n    if user_input == "quit":\n        break\n    print(assistant_reply(user_input))',
      answer: "The break statement",
      explanation:
        "When user_input equals 'quit', the break statement exits the while loop and ends the chat.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What role does Langfuse play in the capstone?",
      options: [
        "It traces every LLM and tool call so you can debug the assistant",
        "It stores the user's password",
        "It chooses the cricket team",
        "It replaces the LLM",
      ],
      correct: 0,
      explanation:
        "Langfuse records traces of every call so you can open the dashboard and see exactly what the assistant did.",
    },
    {
      id: 15,
      type: "true-false",
      question: "A common mistake in Part 1 is forgetting to add memory, so the assistant forgets earlier turns.",
      correctBool: true,
      explanation:
        "True. Without memory the assistant only sees the current message, so it forgets what was said before.",
    },
  ],

  // ============================================================
  // DAY 46: Final Capstone (Part 2)
  // ============================================================
  46: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does Part 2 of the capstone improve?",
      options: [
        "The system prompt, error handling, and a simple menu system",
        "The color of the terminal",
        "The price of the LLM",
        "The name of the student",
      ],
      correct: 0,
      explanation:
        "Part 2 polishes the assistant: a better system prompt, graceful error handling, and a menu (1: chat, 2: weather, 3: calculator, 4: quit).",
    },
    {
      id: 11,
      type: "true-false",
      question: "Real apps need error handling because the LLM or an MCP tool can fail at any time.",
      correctBool: true,
      explanation:
        "True. Networks drop, LLMs rate-limit, and tools throw errors. Wrapping calls in try/except keeps the app from crashing.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In the menu, typing ____ quits the program.",
      answer: "4",
      explanation:
        "Option 4 in the menu is 'quit', so typing 4 ends the program.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What gets printed if the LLM call raises an error?",
      code: 'try:\n    reply = llm.invoke({"input": user_input})\nexcept Exception as e:\n    print("Something went wrong:", e)\n    continue',
      answer: "Something went wrong: <the error message>",
      explanation:
        "The except block catches the error and prints 'Something went wrong:' followed by the error message, then continues the loop.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Why is the improved system prompt in Part 2 better?",
      options: [
        "It gives the LLM clearer rules and examples so its answers are more useful",
        "It is shorter so it saves tokens",
        "It removes the API key",
        "It disables memory",
      ],
      correct: 0,
      explanation:
        "A better system prompt tells the LLM exactly how to behave and what to do in different cases, which produces better answers.",
    },
    {
      id: 15,
      type: "true-false",
      question: "An interview tip from the lesson is to be able to explain your error handling out loud.",
      correctBool: true,
      explanation:
        "True. Being able to explain why each try/except is there shows you understand real-world app design, not just happy paths.",
    },
  ],

  // ============================================================
  // DAY 47: Mock Interview Preparation
  // ============================================================
  47: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does the lesson say to practice for interviews?",
      options: [
        "Answering Python and AI questions and explaining your capstone project",
        "Memorizing the whole Python docs",
        "Learning a new programming language",
        "Drawing pictures of animals",
      ],
      correct: 0,
      explanation:
        "The lesson practices common Python and AI interview questions and how to clearly explain the final capstone project.",
    },
    {
      id: 11,
      type: "true-false",
      question: "Practicing explaining your code line by line builds confidence for interviews.",
      correctBool: true,
      explanation:
        "True. If you can explain each line calmly, you can answer follow-up questions from the interviewer without freezing.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "A viva is an oral exam where you explain your project out ____.",
      answer: "loud",
      explanation:
        "A viva (or viva voce) is an oral exam. You explain your project and answer questions out loud, just like an interview.",
    },
    {
      id: 13,
      type: "code-output",
      question: "If asked 'what does this function do?', what is a good first sentence?",
      code: 'def add_runs(a, b):\n    """Return the total runs from two innings."""\n    return a + b',
      answer:
        "This function takes two numbers (runs from two innings) and returns their total",
      explanation:
        "A good answer starts with one clear sentence about what the function does, then you can go into details if asked.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What is a common interview mistake mentioned in the lesson?",
      options: [
        "Saying 'I don't know' and stopping, instead of thinking out loud",
        "Asking the interviewer a question",
        "Wearing comfortable clothes",
        "Bringing a notebook",
      ],
      correct: 0,
      explanation:
        "Giving up with just 'I don't know' is a mistake. Interviewers want to hear you think out loud, even if you are unsure.",
    },
    {
      id: 15,
      type: "true-false",
      question: "The lesson says this practice prepares you for the Day 48 final assessment.",
      correctBool: true,
      explanation:
        "True. The mock interview builds the confidence and explanation skills you need for the final assessment and real interviews.",
    },
  ],

  // ============================================================
  // DAY 48: Final Assessment and Course Completion
  // ============================================================
  48: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What new MCP tool does Aarav add on Day 48?",
      options: [
        "get_random_joke",
        "get_weather",
        "calculator",
        "get_time",
      ],
      correct: 0,
      explanation:
        "On Day 48 Aarav adds a new MCP tool called get_random_joke that returns a random joke to the assistant.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The course completion certificate is generated on the Progress page.",
      correctBool: true,
      explanation:
        "True. After finishing the checklist, Aarav generates the course completion certificate on the Progress page.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The new tool added on Day 48 is named get_random ____.",
      answer: "joke",
      explanation:
        "The new tool is get_random_joke. It returns a random joke when the LLM decides to call it.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What should you do before generating the certificate?",
      code: 'checklist = [\n    "Review Days 1 to 47",\n    "Answer viva questions",\n    "Add get_random_joke tool",\n    "Test the capstone"\n]\nprint(len(checklist))',
      answer:
        "Complete the study checklist (4 items) and test the project",
      explanation:
        "Before generating the certificate, Aarav completes the study checklist (review, viva, new tool, testing) so the certificate is earned.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What does the lesson say to do after finishing the course?",
      options: [
        "Stay curious and keep building new AI projects",
        "Never write Python again",
        "Delete all your code",
        "Stop learning about AI",
      ],
      correct: 0,
      explanation:
        "The closing message is 'Stay curious'. Keep building, keep experimenting, and keep learning new AI tools.",
    },
    {
      id: 15,
      type: "true-false",
      question: "Day 48 includes answering viva questions about the project architecture.",
      correctBool: true,
      explanation:
        "True. The final day reviews the whole course with a study checklist and viva questions about how the capstone is built.",
    },
  ],
};
