import type { Day } from "@/types";

export const days26to35: Day[] = [
  // ============================================================
  // DAY 26: Setting up OpenRouter
  // ============================================================
  {
    dayNumber: 26,
    title: "Setting up OpenRouter",
    phase: "practical",
    objectives: [
      "Create an OpenRouter account and generate an API key",
      "Add the API key to the Settings page of this app",
      "Make your first successful LLM API call from Python",
      "Understand the OpenAI client pattern used throughout the course",
    ],
    content: [
      {
        type: "paragraph",
        text: "For the last 25 days you wrote Python that runs entirely on your computer. From today, your code will talk to real large language models (LLMs) over the internet. The bridge between your Python and those models is a service called OpenRouter. Think of OpenRouter like a Swiggy for AI models: one app, many kitchens, one delivery person.",
      },
      { type: "heading", level: 2, text: "What is OpenRouter?" },
      {
        type: "paragraph",
        text: "OpenRouter is a website that lets you call hundreds of different AI models (like Llama, Gemma, Mistral, and many more) using a single API. Instead of signing up for ten different AI companies, you sign up once with OpenRouter and use one key for everything. Many models are free, which is perfect for learning.",
      },
      { type: "heading", level: 2, text: "Step by step: get your API key" },
      {
        type: "list",
        ordered: true,
        items: [
          "Open your browser and go to https://openrouter.ai",
          "Click Sign In at the top right and create an account (ask a parent before signing up)",
          "Once logged in, look at the left sidebar and click on Keys",
          "Click the button that says Create Key",
          "Give it a name like 'Aarav Python Handbook' so you remember what it is for",
          "Copy the long string that appears. It will look something like sk-or-v1-abc123...",
          "IMPORTANT: you can only see the full key once. Copy it right away to a safe place",
        ],
      },
      { type: "heading", level: 2, text: "Add your key to this app" },
      {
        type: "paragraph",
        text: "This app has a Settings page where you can paste your OpenRouter key. The app stores it in a local database on your computer and uses it when you run AI code in the playground. The key is never sent to anyone except OpenRouter.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Click the Settings tab in the top navigation",
          "Find the field labelled OpenRouter API Key",
          "Paste your key into the box",
          "Click Save",
          "You should see a green confirmation message",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Keep your key secret",
        text: "An API key is like the password to your OpenRouter account. Never paste it into a public website, never share it in a Discord server, and never commit it to GitHub. If someone gets your key they can spend your credits. If that happens, go back to OpenRouter, delete the key, and make a new one.",
      },
      { type: "heading", level: 2, text: "The OpenAI client pattern" },
      {
        type: "paragraph",
        text: "Even though we are using OpenRouter, we use a Python package called openai. This is because OpenRouter copied the openai package's style of talking to models. So the openai package works perfectly with OpenRouter, you just point it at a different website (base_url). This same pattern will be used in every AI lesson from now on, so learn it well.",
      },
      {
        type: "code",
        language: "python",
        caption: "Your very first LLM API call",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=[
        {"role": "user", "content": "Hello! My name is Aarav. I am 13 years old and I am learning Python. Can you say hi back in one sentence?"}
    ]
)

print(response.choices[0].message.content)`,
      },
      { type: "heading", level: 3, text: "What each line does" },
      {
        type: "list",
        ordered: false,
        items: [
          "from openai import OpenAI: brings in the tool we need to talk to LLMs",
          "client = OpenAI(...): creates a connection object. The api_key proves who we are. The base_url tells Python to talk to OpenRouter instead of the OpenAI company directly",
          "client.chat.completions.create(...): sends a chat request to the model",
          "model='tencent/hy3:free': which AI model to use. The :free part means it costs nothing",
          "messages=[...]: a list of chat messages. We will learn more about this tomorrow",
          "response.choices[0].message.content: digs into the response to get the actual text the model wrote",
          "print(...): shows the result on screen",
        ],
      },
      {
        type: "table",
        headers: ["Model name", "Maker", "Good for", "Free?"],
        rows: [
          ["tencent/hy3:free", "Tencent", "Long answers, reasoning", "Yes"],
          ["meta-llama/llama-3-8b-instruct:free", "Meta", "Fast, general chat", "Yes"],
          ["google/gemma-2-9b-it:free", "Google", "Following instructions", "Yes"],
          ["mistralai/mistral-7b-instruct:free", "Mistral", "Short, sharp answers", "Yes"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common mistakes on day one",
        text: "Do NOT put real quotes around your key like api_key='\"sk-or-...\"'. Just api_key=\"sk-or-...\" is enough. Do NOT forget the https:// in the base_url. Do NOT forget the /api/v1 at the end of base_url. Do NOT put a space after the colon in model='tencent/hy3:free'.",
      },
      { type: "heading", level: 2, text: "Test in the playground" },
      {
        type: "paragraph",
        text: "Open the Playground tab. Make sure the mode selector is on 'Python + AI'. Paste the code above. Click Run. The first call might take 5 to 15 seconds because the model is thinking. Then you will see the model's reply appear in the output area.",
      },
      {
        type: "paragraph",
        text: "If you see a friendly greeting that mentions your name or Python, congratulations. You just made your first real AI call. Show it to your family. From tomorrow, we will make the conversation two-way.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode in the playground. Add your OpenRouter API key in Settings first. The playground intercepts the string 'YOUR_OPENROUTER_API_KEY' and replaces it with your real key on the server, so never put your real key in the code box.",
    expectedOutput:
      "A friendly one-sentence reply from the LLM, for example: 'Hi Aarav! It is awesome that you are learning Python at 13. Ready to build something cool?'",
    debugging: [
      "If you get a 401 error, your API key is wrong or missing. Go to Settings and paste it again carefully.",
      "If you get a 404 error, the model name is wrong. Check the exact model string on openrouter.ai/models.",
      "If you get a timeout, the free model might be busy. Try a different free model from the table above.",
      "If you get 'No OpenRouter API key set', you forgot to save the key in Settings. Click Save after pasting.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Change the prompt so the LLM writes a haiku about cricket.",
        hint: "Replace the content string. A haiku has 3 lines with 5, 7, and 5 syllables.",
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Change the model to google/gemma-2-9b-it:free and run again. Compare the reply.",
        hint: "Only the model line needs to change.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Make the LLM greet Aarav by name AND recommend one Python project for a 13-year-old.",
        hint: "Be specific in your prompt. Tell the model Aarav is 13 and likes games.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Print the model name from the response too, using response.model.",
        hint: "Add a second print statement. The response object has a .model attribute.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the base_url field do in the OpenAI client?",
        options: [
          "It sets the temperature of the model",
          "It tells Python which website to send the request to",
          "It stores your API key",
          "It chooses the model",
        ],
        correct: 1,
        explanation:
          "base_url tells the openai package to send the request to OpenRouter instead of the OpenAI company.",
      },
      {
        id: 2,
        type: "true-false",
        question: "OpenRouter lets you call many different AI models using a single API key.",
        correctBool: true,
        explanation:
          "Yes. OpenRouter is a unified gateway. One key, hundreds of models.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The Python package we import to call OpenRouter is called ____. (lowercase)",
        answer: "openai",
        explanation:
          "We use 'from openai import OpenAI'. The openai package works with OpenRouter because OpenRouter mimics the same API.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What gets printed by this code if the model replies 'Hi there!'?",
        code: `response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=[{"role": "user", "content": "say hi"}]
)
print(response.choices[0].message.content)`,
        answer: "Hi there!",
        explanation:
          "response.choices[0].message.content extracts the text the model wrote.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which of these is a valid free model name on OpenRouter?",
        options: [
          "gpt-4-turbo",
          "tencent/hy3:free",
          "claude-3-opus",
          "gemini-pro-1.5",
        ],
        correct: 1,
        explanation:
          "Free models on OpenRouter end with :free. tencent/hy3:free is one of them.",
      },
    ],
    teacherNotes:
      "Day 26 is mostly setup and one small win. Spend most of the time on the account and key creation, then run the first call together. If Aarav gets stuck on the key, double-check that he copied the whole string (it is long). Reinforce that the openai package works with OpenRouter just by changing base_url. Emphasize that the API key never goes in the code box, only in Settings. End the session by celebrating the first successful AI reply, this motivates the rest of the practical phase.",
    explainToFriend:
      "OpenRouter is like Swiggy for AI. One account, one key, but you can order from many AI 'restaurants' (models). We use the openai Python package to talk to it, we just change the address (base_url) to point at OpenRouter.",
    realWorldExamples: [
      "ChatGPT-style apps that need to switch models based on user preference",
      "AI coding assistants like Cursor that try multiple models for the same task",
      "Cheap student projects that use free models for homework help",
    ],
    thingsToGoogle: [
      "OpenRouter free models list",
      "openai python package documentation",
      "what is an API key",
      "difference between OpenAI and OpenRouter",
    ],
  },

  // ============================================================
  // DAY 27: Chat Conversations
  // ============================================================
  {
    dayNumber: 27,
    title: "Chat Conversations",
    phase: "practical",
    objectives: [
      "Understand the messages list and the three roles: system, user, assistant",
      "Send multi-turn conversations by keeping previous messages in a list",
      "Build a chat loop that continues until the user types 'bye'",
      "Print the full conversation at the end",
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday the LLM replied to one message and the chat ended. Real chatbots (like ChatGPT) remember what you said earlier. Today you will learn the secret: the LLM has NO memory. Every single time you call it, you have to send the entire conversation again in the messages list.",
      },
      { type: "heading", level: 2, text: "The three roles" },
      {
        type: "paragraph",
        text: "Every message in the messages list has a role. There are three roles you need to know:",
      },
      {
        type: "table",
        headers: ["Role", "Who is talking", "Example", "Required?"],
        rows: [
          ["system", "The boss. Sets the rules and personality", "You are a helpful cricket coach", "Optional but recommended"],
          ["user", "The human (Aarav)", "How do I play a cover drive?", "Yes, at least one"],
          ["assistant", "The AI's previous replies", "Sure! Here is how to play a cover drive...", "Only for multi-turn chats"],
        ],
      },
      {
        type: "paragraph",
        text: "The system message is special. It is always first in the list, and it tells the model how to behave. The user and assistant messages then alternate, just like a real chat. The model reads all of them, then adds one new assistant message at the end.",
      },
      { type: "heading", level: 2, text: "One turn vs many turns" },
      {
        type: "code",
        language: "python",
        caption: "Single turn: just one user message",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=[
        {"role": "user", "content": "Name one Minecraft mob."}
    ]
)

print(response.choices[0].message.content)`,
      },
      {
        type: "paragraph",
        text: "That works for one question. But if Aarav asks a follow-up like 'what does it eat?', a fresh call would not know what 'it' means. We have to remind the model by sending the whole chat history every time.",
      },
      {
        type: "code",
        language: "python",
        caption: "Multi-turn: send the whole history each call",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

messages = [
    {"role": "system", "content": "You are a friendly Minecraft expert who answers in one short sentence."},
    {"role": "user", "content": "Name one Minecraft mob."},
    {"role": "assistant", "content": "The creeper is a famous Minecraft mob that explodes when it gets close to you."},
    {"role": "user", "content": "What does it eat?"}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

print(response.choices[0].message.content)`,
      },
      {
        type: "paragraph",
        text: "Notice we did not say 'what does the creeper eat'. We just said 'what does it eat'. Because the previous messages are in the list, the model knows 'it' refers to the creeper. That is the whole trick of chat memory.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why this is expensive in real apps",
        text: "Every message you send costs tokens (and sometimes money). If a chat has 100 messages, the 101st call sends all 100 previous messages again. This is why chat apps get slower and more expensive as the conversation grows. Tomorrow and on Day 33 we will see tricks to handle this.",
      },
      { type: "heading", level: 2, text: "Build a real chat loop" },
      {
        type: "paragraph",
        text: "Now we will write a chatbot that keeps going until Aarav types 'bye'. Each time Aarav types something, we add it to the messages list, call the model, add the model's reply to the messages list, and print the reply. This is the core of every chat app.",
      },
      {
        type: "code",
        language: "python",
        caption: "A working chat loop using a messages list",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

messages = [
    {"role": "system", "content": "You are a friendly tutor for a 13-year-old named Aarav. Keep answers short, two sentences max."}
]

print("Chatbot ready. Type 'bye' to quit.")
print("-" * 40)

while True:
    user_input = input("Aarav: ")

    if user_input.lower() == "bye":
        print("Bot: Goodbye Aarav! See you tomorrow.")
        break

    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="tencent/hy3:free",
        messages=messages
    )

    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})

    print("Bot:", reply)
    print("-" * 40)

print("\\nFull conversation history:")
for m in messages:
    print(m["role"].upper() + ":", m["content"])`,
      },
      {
        type: "paragraph",
        text: "Two important things happen in the loop. First, we add the user's message to the messages list BEFORE calling the model, so the model sees it. Second, we add the model's reply to the messages list AFTER calling, so the next call will remember it. This back-and-forth is what creates the feeling of a real conversation.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Run this in a real terminal too",
        text: "The playground is great but input() works best in a real terminal. Try copying this code into a file called chat.py and running it with 'python chat.py' in your computer's terminal. You will get a smooth back-and-forth chat. In the playground, use the input box that pops up.",
      },
      { type: "heading", level: 2, text: "What the loop looks like in memory" },
      {
        type: "list",
        ordered: true,
        items: [
          "Start: messages = [system]",
          "Aarav types 'hi'. messages = [system, user:hi]",
          "Model replies 'Hello!'. messages = [system, user:hi, assistant:Hello!]",
          "Aarav types 'tell me a joke'. messages = [system, user:hi, assistant:Hello!, user:tell me a joke]",
          "Model replies with a joke. messages grows by one more assistant entry",
          "This keeps going until Aarav types 'bye'",
        ],
      },
    ],
    setupInstructions:
      "Run in Python + AI mode in the playground. The playground will pop up an input box each time the code calls input(). Type your message and press Enter. Type 'bye' (without quotes) to end the chat. Make sure your OpenRouter key is set in Settings.",
    expectedOutput:
      "A back-and-forth chat. Each turn prints 'Aarav: <your message>' then 'Bot: <model reply>'. When you type 'bye', the bot says goodbye and the full message history is printed at the bottom.",
    debugging: [
      "If the bot repeats itself, make sure you are appending BOTH the user message and the assistant reply to the messages list each turn.",
      "If you get a KeyError on 'content', check that your message dicts have both 'role' and 'content' keys.",
      "If the loop never ends, make sure you typed 'bye' in lowercase, or use user_input.lower() == 'bye' as shown.",
      "If the model seems to forget, check that you are passing the messages variable (not a fresh empty list) to create().",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Change the system message so the bot talks like a cricket commentator.",
        hint: "Replace the content of the system message with something like 'You are an excited cricket commentator...'.",
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Change the quit word from 'bye' to 'exit'.",
        hint: "Update both the if check and the printed instruction.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Add a turn counter that prints 'Turn 1', 'Turn 2' before each user input.",
        hint: "Use a variable like turn = 1 before the loop and increment it inside.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Save the full conversation to a file called chat_log.txt when the chat ends.",
        hint: "Open a file with open('chat_log.txt', 'w') and loop through messages writing each one.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which role is used to set the AI's personality at the start of a chat?",
        options: ["user", "assistant", "system", "admin"],
        correct: 2,
        explanation:
          "The system role is the boss message that sets rules and personality. It is usually the first message in the list.",
      },
      {
        id: 2,
        type: "true-false",
        question: "The LLM remembers your previous messages automatically, so you only need to send the new message each time.",
        correctBool: false,
        explanation:
          "False. The LLM has no memory between calls. You must send the entire messages list every single time.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In a multi-turn chat, the assistant's previous replies are added to the messages list with role ____. (lowercase)",
        answer: "assistant",
        explanation:
          "Previous AI replies go back in with role 'assistant'. This is what gives the model context.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What is in the messages list after this code runs (assuming the model replies 'Hello!')?",
        code: `messages = [{"role": "system", "content": "be nice"}]
messages.append({"role": "user", "content": "hi"})
messages.append({"role": "assistant", "content": "Hello!"})
print(len(messages))`,
        answer: "3",
        explanation:
          "We start with 1 (system), add 1 (user), add 1 (assistant). Total length is 3.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why does a chat app get slower as the conversation grows?",
        options: [
          "The Python code becomes longer",
          "Each call resends all previous messages, which costs more tokens and time",
          "The model gets tired",
          "The internet connection weakens",
        ],
        correct: 1,
        explanation:
          "Every call sends the full history. More messages means more tokens to process, which takes longer.",
      },
    ],
    teacherNotes:
      "Day 27 is the 'aha' moment for chat. Make sure Aarav understands that the model has zero memory and we are doing all the remembering ourselves using the messages list. Walk through the loop step by step, drawing the messages list on paper after each turn. If the playground input box feels clunky, encourage him to try the same code in a real terminal for a smoother experience. Avoid going deep on token costs yet, just mention it as a real-world concern. Tomorrow's prompt template lesson builds directly on this.",
    explainToFriend:
      "Chatbots do not actually remember you. Every time you send a message, the app quietly sends your entire chat history along with it. The model reads everything fresh each time and writes one new reply.",
    realWorldExamples: [
      "ChatGPT remembering what you said 10 messages ago",
      "Siri keeping context within one request but forgetting after you close it",
      "Customer support bots that lose context when transferred to a human agent",
    ],
    thingsToGoogle: [
      "openai chat completions messages format",
      "what is a system prompt",
      "conversation history in LLMs",
      "token cost of long conversations",
    ],
  },

  // ============================================================
  // DAY 28: Prompt Templates
  // ============================================================
  {
    dayNumber: 28,
    title: "Prompt Templates",
    phase: "practical",
    objectives: [
      "Use a system prompt to give the LLM a fixed personality",
      "Keep the system prompt the same while changing user messages",
      "Add few-shot examples to a prompt to guide the model's answers",
      "Build a reusable prompt pattern for different scenarios",
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday you built a chat loop. The system message was just one line. Today you will learn how to write powerful system prompts that turn the LLM into a specific character, and how to use few-shot examples to teach the model exactly what kind of answer you want.",
      },
      { type: "heading", level: 2, text: "The system prompt is the boss" },
      {
        type: "paragraph",
        text: "The system message tells the model how to behave for the entire conversation. A good system prompt is specific about (1) who the model is, (2) who it is talking to, (3) what style to use, and (4) any rules to follow. A weak system prompt gives weak results.",
      },
      {
        type: "table",
        headers: ["Weak system prompt", "Strong system prompt", "Result difference"],
        rows: [
          ["You are helpful", "You are a friendly cricket coach for a 13-year-old named Aarav. Answer in 2 short sentences. Use cricket terms.", "Specific, on-topic, sized right"],
          ["Be funny", "You are a stand-up comedian who tells clean robot jokes. Each joke is under 30 words. No sarcasm.", "Clean, short, on theme"],
          ["Answer questions", "You are a Minecraft guide. Only answer about Minecraft. If asked about other games, say you only know Minecraft.", "Stays in scope"],
        ],
      },
      { type: "heading", level: 2, text: "Example: cricket commentator bot" },
      {
        type: "paragraph",
        text: "Let us make the LLM talk like a cricket commentator describing Aarav's batting. The system prompt stays the same. Only the user message changes each time.",
      },
      {
        type: "code",
        language: "python",
        caption: "Cricket commentator personality using a system prompt",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

SYSTEM_PROMPT = (
    "You are an excited cricket commentator like Harsha Bhogle. "
    "You are describing the batting of a 13-year-old named Aarav Singh. "
    "Use cricket terms like 'cover drive', 'square cut', and 'yorker'. "
    "Always sound thrilled. Keep each answer to 3 sentences max."
)

user_message = "Aarav just hit a six off the first ball!"

messages = [
    {"role": "system", "content": SYSTEM_PROMPT},
    {"role": "user", "content": user_message}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

print(response.choices[0].message.content)`,
      },
      {
        type: "paragraph",
        text: "Notice we stored the system prompt in a variable called SYSTEM_PROMPT. This is a habit you should keep. If you ever want to change the personality, you only change one place in your code. We also used parentheses to write the string across multiple lines, which is a Python trick for long strings.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Long strings without plus signs",
        text: "In Python, putting two string literals next to each other inside parentheses joins them automatically. ('Hello ' 'world') becomes 'Hello world'. This is cleaner than using + and lets you write long prompts across many lines.",
      },
      { type: "heading", level: 2, text: "Few-shot examples" },
      {
        type: "paragraph",
        text: "Sometimes describing what you want is not enough. You want to SHOW the model examples of good answers. This is called few-shot prompting. You put example user-assistant pairs in the messages list before the real question. The model copies the pattern.",
      },
      {
        type: "code",
        language: "python",
        caption: "Few-shot examples teaching the model to answer in a specific format",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

messages = [
    {"role": "system", "content": "You translate superhero names into funny Hindi-style nicknames. Output format: Original: X -> Nickname: Y"},
    {"role": "user", "content": "Spider-Man"},
    {"role": "assistant", "content": "Original: Spider-Man -> Nickname: Makdi-Man"},
    {"role": "user", "content": "Iron Man"},
    {"role": "assistant", "content": "Original: Iron Man -> Nickname: Loha-Man"},
    {"role": "user", "content": "Batman"}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

print(response.choices[0].message.content)`,
      },
      {
        type: "paragraph",
        text: "The model sees two examples of the pattern, then is asked for 'Batman'. It will likely reply 'Original: Batman -> Nickname: <something>'. Without the examples, the model might have written a long paragraph about Batman. Few-shot examples are like showing a friend two photos before asking them to take a similar one.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Too many examples eat your tokens",
        text: "Each example costs tokens. Three to five examples is usually enough. More than that and your prompt gets slow and expensive. Pick examples that cover different cases (a normal one, an edge case, a tricky one).",
      },
      { type: "heading", level: 2, text: "Reusable prompt template" },
      {
        type: "paragraph",
        text: "When you write the same kind of prompt many times, turn it into a function. This is the simplest form of a 'prompt template'. Tomorrow we build a full chatbot this way.",
      },
      {
        type: "code",
        language: "python",
        caption: "A reusable function that builds messages for a given topic",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

def ask_character(character_name, user_question):
    system_prompt = (
        "You are " + character_name + ". "
        "Stay fully in character. Talk to a 13-year-old named Aarav. "
        "Keep answers under 3 sentences."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_question}
    ]
    response = client.chat.completions.create(
        model="tencent/hy3:free",
        messages=messages
    )
    return response.choices[0].message.content

print("Spider-Man says:")
print(ask_character("Spider-Man", "What is your favorite pizza topping?"))
print()
print("A Minecraft villager says:")
print(ask_character("a Minecraft villager who only says hmm", "What do you think of creepers?"))`,
      },
      {
        type: "paragraph",
        text: "Now you have a function ask_character that works for any character and any question. This is the foundation of all prompt engineering: write the structure once, fill in the variables each time.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode in the playground. Each code block is a complete call. Run them one at a time and read the replies. Make sure your OpenRouter key is set in Settings.",
    expectedOutput:
      "For the cricket commentator code, an excited 3-sentence description like 'Oh what a start! Aarav has launched the first ball into the stands! That is a glorious six to begin the innings!'. For the few-shot code, a single line like 'Original: Batman -> Nickname: Chamgadar-Man'. For the function code, two short in-character replies.",
    debugging: [
      "If the model ignores the personality, your system prompt is too vague. Add more specific instructions and examples.",
      "If few-shot examples do not change the output, check that the example assistant messages are EXACTLY in the format you want.",
      "If you get a SyntaxError on the long string, make sure every line ends with a string and there are no missing commas inside the parentheses.",
      "If the model writes too long, add 'Keep answers under N sentences' to the system prompt.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Change the cricket commentator system prompt so it talks about Aarav's bowling instead of batting.",
        hint: "Swap 'batting' for 'bowling' and use terms like 'yorker', 'bouncer', and 'pace'.",
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Add a third few-shot example to the superhero nickname code (e.g. Superman -> namespace name).",
        hint: "Add one more user/assistant pair before the final user message.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Write a system prompt that turns the LLM into a strict maths teacher who only accepts numeric answers.",
        hint: "Tell the model to reply with just the number, nothing else. Test with 'What is 7 times 8?'.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Extend ask_character to take an extra 'style' argument (e.g. 'funny', 'serious', 'rude') and use it in the system prompt.",
        hint: "def ask_character(character_name, style, user_question): then build the system prompt using all three.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main job of a system prompt?",
        options: [
          "To store the API key",
          "To set the model's personality and rules for the whole chat",
          "To translate languages",
          "To make the model faster",
        ],
        correct: 1,
        explanation:
          "The system prompt is the boss message that defines who the model is and how it should behave.",
      },
      {
        id: 2,
        type: "true-false",
        question: "Few-shot examples are pairs of user and assistant messages placed before the real question to teach the model a pattern.",
        correctBool: true,
        explanation:
          "Yes. Few-shot means 'a few examples'. The model copies the pattern shown in the examples.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In Python, putting string literals next to each other inside parentheses ____ them automatically. (one word, present tense)",
        answer: "joins",
        explanation:
          "Python concatenates adjacent string literals inside parentheses. No plus sign needed.",
      },
      {
        id: 4,
        type: "code-output",
        question: "If the system prompt is 'Reply with only the word BANANA' and the user asks 'What is 2+2?', what will the model likely reply?",
        code: `messages = [
    {"role": "system", "content": "Reply with only the word BANANA"},
    {"role": "user", "content": "What is 2+2?"}
]`,
        answer: "BANANA",
        explanation:
          "A strong system prompt overrides the user question. The model should reply BANANA.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why is it a good idea to store a system prompt in a variable like SYSTEM_PROMPT?",
        options: [
          "It makes the code run faster",
          "It lets you change the personality in one place if needed",
          "It saves API tokens",
          "It is required by Python",
        ],
        correct: 1,
        explanation:
          "Using a variable means one source of truth. Change it once and every call using it gets the new prompt.",
      },
    ],
    teacherNotes:
      "Day 28 is about prompt engineering, which is more art than science. Encourage Aarav to iterate: write a prompt, run it, see what comes back, then tweak the prompt and run again. The cricket commentator example is fun because it ties to his interests. The few-shot example with superhero nicknames is memorable. Make sure he understands that few-shot examples go in the messages list, not in the system prompt. End by showing how the ask_character function wraps a prompt template, this sets up tomorrow's project where we build a full chatbot.",
    explainToFriend:
      "A system prompt is like the instructions you give a friend before they pretend to be someone. 'Act like a cricket commentator for the next 5 minutes.' Few-shot examples are like showing them two short clips of how the commentator talks before they start.",
    realWorldExamples: [
      "Character AI bots that always stay in character",
      "Customer support bots told to be polite and brief",
      "Code review bots given examples of good and bad code",
      "Translation apps shown example translations before doing a new sentence",
    ],
    thingsToGoogle: [
      "prompt engineering few-shot examples",
      "system prompt best practices",
      "openai chat completions system message",
      "what is zero-shot vs few-shot",
    ],
  },

  // ============================================================
  // DAY 29: Project 1 - AI Chatbot
  // ============================================================
  {
    dayNumber: 29,
    title: "Project 1: AI Chatbot",
    phase: "practical",
    objectives: [
      "Build a complete chatbot with a friendly personality that can talk about any topic",
      "Maintain message history across turns using a list",
      "Allow the user to switch topics mid-conversation",
      "Handle edge cases like empty input and very long input",
    ],
    content: [
      {
        type: "paragraph",
        text: "Time for your first real AI project. You will build a chatbot named Bolt (like a cricket bolt, fast and friendly) that can talk to Aarav about anything: cricket, Minecraft, homework, superheroes, food, you name it. Bolt keeps memory of the conversation and can switch topics smoothly.",
      },
      { type: "heading", level: 2, text: "Project plan" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write a friendly system prompt that introduces Bolt",
          "Create an empty messages list with just the system message",
          "Loop forever, asking Aarav for input",
          "Handle edge cases: empty input, very long input, and the quit command",
          "Append user message, call the model, append reply, print reply",
          "When Aarav types 'quit', print a goodbye and the conversation length",
        ],
      },
      { type: "heading", level: 2, text: "The complete chatbot code" },
      {
        type: "code",
        language: "python",
        caption: "Bolt: a complete AI chatbot with edge case handling",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

SYSTEM_PROMPT = (
    "You are Bolt, a friendly AI buddy for a 13-year-old student named Aarav Singh. "
    "Aarav likes cricket, Minecraft, Spider-Man, iPhones, and pizza. "
    "Rules: "
    "1. Always be kind and encouraging. "
    "2. Keep answers under 3 sentences unless Aarav asks for more detail. "
    "3. If Aarav switches topics suddenly, go along with it happily. "
    "4. If Aarav asks something you do not know, say so honestly. "
    "5. Never use rude or adult words."
)

messages = [{"role": "system", "content": SYSTEM_PROMPT}]

MAX_INPUT_LENGTH = 500

print("=" * 50)
print("  Bolt the AI Buddy is ready to chat!")
print("  Type 'quit' to end the chat.")
print("  Type 'topics' to see suggested topics.")
print("=" * 50)

while True:
    user_input = input("\\nAarav: ").strip()

    # Edge case 1: empty input
    if user_input == "":
        print("Bolt: You sent an empty message! Try asking me something.")
        continue

    # Edge case 2: too long input
    if len(user_input) > MAX_INPUT_LENGTH:
        print("Bolt: That is a really long message! Can you shorten it to under 500 characters?")
        continue

    # Quit command
    if user_input.lower() in ("quit", "exit", "bye"):
        print("Bolt: Bye Aarav! It was fun chatting. Catch you on the next session!")
        break

    # Topics command
    if user_input.lower() == "topics":
        print("Bolt: Try asking me about cricket, Minecraft, Spider-Man, iPhone features, or pizza toppings!")
        continue

    # Normal flow
    messages.append({"role": "user", "content": user_input})

    try:
        response = client.chat.completions.create(
            model="tencent/hy3:free",
            messages=messages
        )
        reply = response.choices[0].message.content
    except Exception as e:
        print("Bolt: Oops, my brain hiccuped. Error was:", e)
        # Remove the user message we just added so history stays clean
        messages.pop()
        continue

    messages.append({"role": "assistant", "content": reply})
    print("Bolt:", reply)

print("\\n" + "=" * 50)
print("Chat ended. Total messages exchanged:", len(messages) - 1)
print("=" * 50)`,
      },
      { type: "heading", level: 2, text: "How edge cases are handled" },
      {
        type: "table",
        headers: ["Edge case", "What user does", "What Bolt does", "Why"],
        rows: [
          ["Empty input", "Presses Enter with no text", "Asks for a real message, does NOT call the API", "Saves an API call and avoids confusing the model"],
          ["Too long input", "Sends 1000 characters", "Asks to shorten, does NOT call the API", "Long inputs cost tokens and may be spam"],
          ["API error", "Normal message but API fails", "Prints error, removes the user message, continues", "Keeps chat usable even when network fails"],
          ["Quit commands", "Types quit, exit, or bye", "Says goodbye and breaks the loop", "One clear way to end the chat"],
          ["Topics command", "Types 'topics'", "Shows suggested topics", "Helps Aarav when he is bored"],
        ],
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why we pop() on error",
        text: "If the API call fails, we already added the user message to the list. If we leave it there, the next call would try to send a user message with no matching assistant reply, which can confuse some models. So we use messages.pop() to remove the last item (the user message we just added) and try again next turn.",
      },
      { type: "heading", level: 2, text: "Topic switching works automatically" },
      {
        type: "paragraph",
        text: "Notice we did not write any special code for switching topics. Because we send the full message history each time, the model naturally follows whatever Aarav says. If Aarav was talking about cricket and then suddenly asks 'what is the capital of France', the model just answers France. That is the power of the messages list.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Try these test conversations",
        text: "1. Start with cricket, then switch to Minecraft. 2. Ask Bolt to recommend a pizza topping. 3. Press Enter without typing anything. 4. Type 'topics'. 5. Type 'quit'. Watch how each edge case is handled smoothly.",
      },
      {
        type: "paragraph",
        text: "This project pulls together everything from Days 26, 27, and 28: the OpenAI client pattern, the messages list with system/user/assistant roles, the loop, and a strong system prompt. Tomorrow we move to a new topic: getting JSON out of the LLM instead of plain text.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode in the playground. Use the input popup each turn. Try at least 5 turns including one empty input, one 'topics', and one 'quit'. OpenRouter key must be set in Settings. For a smoother experience, copy this code into a file called bolt.py and run with 'python bolt.py' in a real terminal.",
    expectedOutput:
      "A multi-turn chat with Bolt. Sample: Aarav: Hi / Bolt: Hey Aarav! Ready to chat about cricket, Minecraft, or anything else? / Aarav: Who is your favorite superhero? / Bolt: I have a soft spot for Spider-Man. He is relatable, funny, and saves the city after school! / Aarav: quit / Bolt: Bye Aarav! ... Total messages exchanged: 4",
    debugging: [
      "If empty input still calls the API, make sure you have the 'if user_input == \"\": continue' check BEFORE appending to messages.",
      "If the bot crashes on network errors, wrap the create() call in try/except as shown.",
      "If long messages still go through, check that you used len(user_input) > MAX_INPUT_LENGTH with a sensible limit.",
      "If 'quit' does not end the chat, make sure you lowercased the input before comparing: user_input.lower().",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Add a 'joke' command that makes Bolt tell a clean joke without calling the API.",
        hint: "Add an if branch like the 'topics' one. Use a hardcoded joke or pick from a list.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Change MAX_INPUT_LENGTH to 200 and test with a long message. See how Bolt responds.",
        hint: "Only one number needs to change. Try sending a 300-character message.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Add a 'history' command that prints the last 3 user messages without calling the API.",
        hint: "Loop through messages, filter where role == 'user', and slice the last 3.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Save the full conversation to bolt_chat.json when the chat ends. Use the json module.",
        hint: "import json, then json.dump(messages, open('bolt_chat.json', 'w'), indent=2).",
      },
      {
        id: 5,
        difficulty: "hard",
        description: "Make Bolt refuse to discuss adult topics by adding a banned-words list check on user input.",
        hint: "Make a list of banned words, lower-case the input, check if any banned word is in the input, and refuse politely.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Why does the chatbot check for empty input BEFORE calling the API?",
        options: [
          "Because the API would crash",
          "To save an API call and avoid confusing the model",
          "Because Python requires it",
          "Because the model cannot handle empty strings",
        ],
        correct: 1,
        explanation:
          "Empty input wastes tokens and may give weird replies. Skipping the call is faster and cheaper.",
      },
      {
        id: 2,
        type: "true-false",
        question: "Topic switching requires special code that detects when the user changes subject.",
        correctBool: false,
        explanation:
          "False. Because we send the full message history, the model naturally follows whatever the user says. No special code needed.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "When the API call fails, we use messages.____() to remove the user message we just added. (method name)",
        answer: "pop",
        explanation:
          "pop() removes the last item from a list. This keeps the message history clean after a failed call.",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this print?",
        code: `user_input = "  bye  "
if user_input.strip().lower() in ("quit", "exit", "bye"):
    print("ending")`,
        answer: "ending",
        explanation:
          "strip() removes spaces, lower() makes it lowercase, 'bye' is in the tuple, so 'ending' prints.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the purpose of the try/except block around the API call?",
        options: [
          "To make the code run faster",
          "To catch network or API errors and keep the chat usable",
          "To translate the response",
          "To reduce token cost",
        ],
        correct: 1,
        explanation:
          "try/except catches errors so the chatbot does not crash. The user sees a friendly message instead of a stack trace.",
      },
    ],
    teacherNotes:
      "Day 29 is Aarav's first full AI project, so celebrate it. Walk through the edge cases one at a time so he sees why each one matters. The messages.pop() trick on error is subtle but important, explain it slowly. Encourage him to actually run the chat for at least 10 turns and try to break it with weird inputs. The 'topics' command is a small UX touch that shows how chatbots can offer affordances. This project also makes a great portfolio piece, suggest he save the code on his computer and show it to family.",
    explainToFriend:
      "Bolt is a chatbot that remembers our whole conversation, handles empty messages and errors gracefully, and can switch topics instantly. The trick is keeping a list of every message and sending the whole list each time we ask the model for a reply.",
    realWorldExamples: [
      "ChatGPT keeping memory within a single chat thread",
      "Replika-style companion apps with persistent personality",
      "Discord bots that maintain conversation state per channel",
      "Language learning apps that adapt to what the student says",
    ],
    thingsToGoogle: [
      "python input validation patterns",
      "chatbot error handling best practices",
      "openai api rate limits and errors",
      "how to design a chatbot personality",
    ],
  },

  // ============================================================
  // DAY 30: Working with JSON Responses
  // ============================================================
  {
    dayNumber: 30,
    title: "Working with JSON Responses",
    phase: "practical",
    objectives: [
      "Ask the LLM to return its answer as valid JSON",
      "Parse JSON strings into Python dicts and lists using json.loads()",
      "Handle malformed JSON safely with try/except",
      "Use the parsed data to build something useful",
    ],
    content: [
      {
        type: "paragraph",
        text: "So far the LLM has been giving us plain text. That is fine for chat, but if you want your program to actually USE the answer (say, to fill a table or make a decision), plain text is hard to work with. Today you will learn to ask the LLM for structured JSON, which Python can read like a normal dict.",
      },
      { type: "heading", level: 2, text: "What is JSON?" },
      {
        type: "paragraph",
        text: "JSON (JavaScript Object Notation) is a way to write data as text so that any programming language can read it. A JSON list looks like [\"larva\", \"creeper\", \"enderman\"]. A JSON object looks like {\"name\": \"Aarav\", \"age\": 13}. Python has a built-in module called json that turns JSON text into Python dicts and lists.",
      },
      {
        type: "code",
        language: "python",
        caption: "Parsing a JSON string into a Python list",
        code: `import json

json_text = '["McLaren", "Ferrari", "Lamborghini", "Porsche", "Bugatti"]'

cars = json.loads(json_text)

print(type(cars))
print(cars)
print(cars[0])
print("Number of cars:", len(cars))`,
      },
      {
        type: "paragraph",
        text: "json.loads takes a string and gives back a Python object. If the string was a JSON list, you get a Python list. If it was a JSON object, you get a Python dict. Once it is a Python object, you can use it like any other variable.",
      },
      { type: "heading", level: 2, text: "Asking the LLM for JSON" },
      {
        type: "paragraph",
        text: "The trick is to tell the LLM in the system prompt: 'Reply with valid JSON only. No explanation, no extra text.' Then the model should return clean JSON. Let us ask for 5 car names as a JSON array.",
      },
      {
        type: "code",
        language: "python",
        caption: "Asking the LLM to return a JSON array of car names",
        code: `from openai import OpenAI
import json

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

messages = [
    {"role": "system", "content": "You are a car expert. Reply with valid JSON only. No extra text, no markdown, no code blocks."},
    {"role": "user", "content": 'Give me exactly 5 famous sports car names as a JSON array of strings. Example format: ["car1", "car2", "car3", "car4", "car5"]'}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

raw_text = response.choices[0].message.content
print("Raw LLM reply:")
print(raw_text)
print()

cars = json.loads(raw_text)
print("Parsed Python list:")
print(cars)
print()

for i, car in enumerate(cars, start=1):
    print(f"{i}. {car}")`,
      },
      {
        type: "paragraph",
        text: "Notice we print the raw text first, THEN parse it. This is a good habit. If the parse fails, you can see what the model actually wrote and fix the prompt. Sometimes models add extra text like 'Here is your JSON:' even when told not to. We will handle that next.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Models love to add chatter",
        text: "Even with a strict system prompt, some models wrap JSON in markdown like ```json ... ``` or add 'Here is your answer:' before it. This breaks json.loads. The fix is either (1) a stronger prompt, (2) a different model that follows instructions better, or (3) cleaning the text before parsing.",
      },
      { type: "heading", level: 2, text: "Safe parsing with try/except" },
      {
        type: "code",
        language: "python",
        caption: "Parsing JSON safely and cleaning common markdown wrappers",
        code: `from openai import OpenAI
import json

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

def clean_json_text(text):
    text = text.strip()
    if text.startswith("\`\`\`"):
        lines = text.split("\\n")
        lines = lines[1:]
        if lines and lines[-1].strip() == "\`\`\`":
            lines = lines[:-1]
        text = "\\n".join(lines)
    return text.strip()

def safe_parse_json(text):
    cleaned = clean_json_text(text)
    try:
        return json.loads(cleaned), None
    except json.JSONDecodeError as e:
        return None, str(e)

messages = [
    {"role": "system", "content": "You are a superhero expert. Reply with valid JSON only. No markdown, no extra text."},
    {"role": "user", "content": 'Give me 3 superheroes as a JSON array of objects like [{"name": "...", "power": "..."}, ...]'}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

raw_text = response.choices[0].message.content
print("Raw reply:")
print(raw_text)
print()

data, error = safe_parse_json(raw_text)

if error:
    print("Could not parse JSON. Error:", error)
    print("The model probably added extra text. Try again or use a different model.")
else:
    print("Parsed successfully!")
    for hero in data:
        print(f"- {hero['name']} has the power: {hero['power']}")`,
      },
      {
        type: "paragraph",
        text: "The clean_json_text function strips markdown code fences if the model added them. The safe_parse_json function returns a tuple of (data, error). If parsing works, error is None. If it fails, data is None and error tells you why. This pattern is much safer than calling json.loads directly.",
      },
      {
        type: "table",
        headers: ["json.loads result", "What it means", "Python type"],
        rows: [
          ["'[1, 2, 3]'", "A JSON array", "list"],
          ["'{\"name\": \"Aarav\"}'", "A JSON object", "dict"],
          ["'\"hello\"'", "A JSON string", "str"],
          ["'42'", "A JSON number", "int"],
          ["'true'", "A JSON boolean", "bool"],
        ],
      },
      {
        type: "callout",
        variant: "tip",
        title: "Use a model that follows instructions",
        text: "If your JSON keeps breaking, switch models. google/gemma-2-9b-it:free and meta-llama/llama-3-8b-instruct:free tend to follow JSON instructions better than some other free models. Tomorrow's LangChain lesson will show an even better way: structured output parsers that guarantee JSON shape.",
      },
      { type: "heading", level: 2, text: "Using the parsed data" },
      {
        type: "paragraph",
        text: "Once the JSON is a Python dict or list, you can do anything with it. Save it to a file, build a table, make a decision in your code. Here is a tiny example that uses the parsed superhero list to play a guessing game.",
      },
      {
        type: "code",
        language: "python",
        caption: "Using parsed JSON data in a small guessing game",
        code: `import json

# Pretend this came from the LLM
raw = '[{"name": "Spider-Man", "power": "wall crawling"}, {"name": "Iron Man", "power": "flying suit"}, {"name": "Hulk", "power": "super strength"}]'

heroes = json.loads(raw)

print("Guess the superhero by their power!")
for hero in heroes:
    guess = input(f"Who has the power '{hero['power']}'? ")
    if guess.lower() == hero["name"].lower():
        print("Correct!")
    else:
        print(f"Nope, it was {hero['name']}.")
print("Game over. You played with", len(heroes), "heroes.")`,
      },
      {
        type: "paragraph",
        text: "Now the LLM's answer is not just text on a screen, it is real data your program can use. This is the bridge between AI and real software. Tomorrow we start LangChain, which makes this even easier.",
      },
    ],
    setupInstructions:
      "Run in Python + AI mode in the playground for the LLM calls. The plain Python parsing examples (no OpenAI client) can run in Python Only mode too. OpenRouter key must be set in Settings for the LLM calls.",
    expectedOutput:
      "For the first LLM call: a list of 5 car names printed both raw and parsed, then numbered 1 to 5. For the superhero call: 3 lines like '- Spider-Man has the power: wall crawling'. If the model adds markdown, the cleaner handles it; if not, parsing fails gracefully with a clear error message.",
    debugging: [
      "If you get json.JSONDecodeError, the model added extra text. Use the clean_json_text and safe_parse_json functions shown above.",
      "If the model wraps JSON in ```json ... ``` fences, the clean_json_text function strips them. Make sure your version does too.",
      "If the JSON is valid but missing keys (like no 'power' key), your prompt was not specific enough. Add an example showing the exact shape you want.",
      "If json.loads says 'Expecting value', the string is empty or starts with non-JSON text. Print raw_text first to see what the model actually returned.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Ask the LLM for 5 Minecraft mobs as a JSON array. Print each one with a number.",
        hint: "Copy the car example and change the prompt topic to Minecraft mobs.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Ask the LLM for a single pizza as a JSON object with keys: name, price, vegetarian (true/false). Print each key separately.",
        hint: "Use a prompt like 'Return one pizza as a JSON object with keys name, price, vegetarian'. Then access data['name'], data['price'], data['vegetarian'].",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Improve clean_json_text to also strip lines that start with 'Here is' or 'Sure,'.",
        hint: "Check if the first line contains certain phrases and skip it. Or find the first '[' or '{' and slice from there.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Build a function get_json(prompt) that calls the LLM, cleans the text, parses it, and retries once with a stricter prompt if parsing fails.",
        hint: "Use a for loop with range(2). On the second try, append a user message like 'That was not valid JSON. Reply with ONLY valid JSON this time.'",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does json.loads('[1, 2, 3]') return in Python?",
        options: ["A string", "A tuple", "A list", "A dict"],
        correct: 2,
        explanation:
          "A JSON array becomes a Python list. json.loads('[1,2,3]') returns [1, 2, 3].",
      },
      {
        id: 2,
        type: "true-false",
        question: "LLMs always return perfectly valid JSON if you ask for JSON in the prompt.",
        correctBool: false,
        explanation:
          "False. Models often add extra text or markdown code fences. You must handle malformed JSON with try/except and cleaning.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To convert a JSON string into a Python object, we use json.____(). (method name)",
        answer: "loads",
        explanation:
          "json.loads() parses a JSON string. (json.load() without the 's' is for reading from a file.)",
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this print?",
        code: `import json
data = json.loads('{"name": "Aarav", "age": 13}')
print(data["name"], "is", data["age"])`,
        answer: "Aarav is 13",
        explanation:
          "json.loads turns the JSON object into a Python dict. We access data['name'] and data['age'].",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why is it useful to ask the LLM to return JSON instead of plain text?",
        options: [
          "JSON uses fewer tokens",
          "JSON is faster to generate",
          "JSON can be parsed into Python objects your program can use directly",
          "JSON prevents API errors",
        ],
        correct: 2,
        explanation:
          "JSON turns the model's reply into structured data (dicts, lists) that your code can use, not just display.",
      },
    ],
    teacherNotes:
      "Day 30 unlocks the bridge between AI and real software. Make sure Aarav sees the difference between printing text and actually using parsed data (the guessing game makes this concrete). The cleaning function is important because free models often wrap JSON in markdown, so build it up step by step on the whiteboard. Avoid going too deep into PydanticOutputParser yet, that is Day 34. End by hinting that LangChain has tools that make this much easier, which sets up tomorrow's lesson.",
    explainToFriend:
      "If you ask an AI to reply in JSON, your Python code can read the answer like a normal dict or list. Then you can use the answer to make decisions, build tables, or play games. The catch is models sometimes add extra text, so you wrap json.loads in try/except to handle that safely.",
    realWorldExamples: [
      "Travel apps that ask an LLM for flight info as JSON and then display it in a table",
      "Recipe generators that return ingredients as a JSON list your app can turn into a shopping list",
      "Quiz apps where the LLM returns questions and answers as a JSON object",
      "AI agents that need the model's answer in a format they can act on",
    ],
    thingsToGoogle: [
      "json.loads vs json.load python",
      "openai response format json",
      "how to clean markdown code fences from LLM output",
      "pydantic vs json module python",
    ],
  },

  // ============================================================
  // DAY 31: What is LangChain?
  // ============================================================
  {
    dayNumber: 31,
    title: "What is LangChain?",
    phase: "practical",
    objectives: [
      "Explain why LangChain exists and what problem it solves",
      "List the main components LangChain provides: prompts, chains, memory, agents, output parsers",
      "Install langchain and langchain-openai packages (on a real computer)",
      "Write and run a first LangChain call using OpenRouter",
      "Understand the Prompt -> LLM -> Output Parser flow",
    ],
    content: [
      {
        type: "paragraph",
        text: "For the last 5 days you wrote raw API calls using the openai package. You probably noticed some patterns repeating: build a messages list, call create(), dig out response.choices[0].message.content, clean the text, parse the JSON. LangChain is a Python library that packages these patterns into reusable pieces so you do not repeat yourself.",
      },
      { type: "heading", level: 2, text: "Why LangChain exists" },
      {
        type: "paragraph",
        text: "Imagine you wrote 10 different chatbots this week. Each one builds a messages list, calls the LLM, and parses the reply. If you want to switch from tencent/hy3:free to google/gemma-2-9b-it:free in all 10 apps, you have to change the model name in 10 places. If you want to add memory, you have to write the same memory code 10 times. LangChain gives you building blocks so you write each pattern once and reuse it everywhere.",
      },
      {
        type: "table",
        headers: ["Without LangChain", "With LangChain"],
        rows: [
          ["You write the messages list manually every time", "PromptTemplate or ChatPromptTemplate builds it for you"],
          ["You call client.chat.completions.create() every time", "LLMChain or llm.invoke() does it in one line"],
          ["You manage message history with your own list", "ConversationBufferMemory does it automatically"],
          ["You write your own JSON cleaning and parsing", "StructuredOutputParser guarantees a clean shape"],
          ["You hard-code what the model does next", "Agents decide for themselves which tool to call"],
        ],
      },
      { type: "heading", level: 2, text: "The five main pieces" },
      {
        type: "list",
        ordered: false,
        items: [
          "Prompt templates: variables you fill in, like a Mad Libs story",
          "LLMs and chat models: wrappers around the OpenAI/OpenRouter client",
          "Chains: sequences that connect prompts to models to parsers",
          "Memory: automatic conversation history",
          "Agents: LLMs that can pick tools (like search or calculator) on their own",
          "Output parsers: turn LLM text into clean Python objects",
        ],
      },
      {
        type: "mermaid",
        code: "flowchart LR\nA[Prompt Template<br/>fills variables] --> B[LLM<br/>OpenRouter]\nB --> C[Output Parser<br/>cleans and structures]\nC --> D[Final Python object]",
        caption: "The core LangChain flow: prompt template feeds the LLM, which feeds the output parser, which gives you a clean Python object.",
      },
      { type: "heading", level: 2, text: "Installing LangChain" },
      {
        type: "paragraph",
        text: "On a real computer you would install LangChain with pip. The playground in this app cannot pip install (Pyodide has limits), so today's code is for learning. Read it carefully, run the equivalent OpenAI-client version in the playground, and imagine running this code in a real Python environment.",
      },
      {
        type: "code",
        language: "bash",
        caption: "Install commands to run in a real terminal (NOT in the playground)",
        code: `pip install langchain
pip install langchain-openai
pip install langchain-community`,
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why we cannot pip install in the playground",
        text: "This app runs Python inside your browser using Pyodide (Python compiled to WebAssembly). Pyodide cannot install arbitrary packages like langchain because they need a full Python runtime with C extensions. So we use the openai package (which is supported) for actual runs, and we study the LangChain code for understanding. When Aarav is older and uses a real Python setup, the LangChain code will run perfectly.",
      },
      { type: "heading", level: 2, text: "Your first LangChain call" },
      {
        type: "paragraph",
        text: "Here is the LangChain version of the first API call you made on Day 26. Notice how the model is wrapped in a ChatOpenAI object, the prompt is wrapped in a ChatPromptTemplate, and the call uses llm.invoke() instead of client.chat.completions.create().",
      },
      {
        type: "code",
        language: "python",
        caption: "First LangChain call (runs on a real computer with langchain installed)",
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly AI buddy for a 13-year-old named Aarav."),
    ("user", "{question}")
])

chain = prompt | llm

response = chain.invoke({"question": "Name one cool fact about Spider-Man in one sentence."})

print(response.content)`,
      },
      {
        type: "paragraph",
        text: "Three things to notice. First, the prompt has a placeholder {question} that gets filled in when you call invoke(). Second, the chain is built with the pipe symbol | which means 'feed the output of the left side into the right side'. Third, response.content holds the text, just like response.choices[0].message.content did before.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "The pipe symbol | is magic",
        text: "In LangChain, prompt | llm | parser means 'take the prompt, send its output to the llm, send the llm's output to the parser'. This is called LCEL (LangChain Expression Language). It looks weird at first but it is just a fancy way to chain functions.",
      },
      { type: "heading", level: 2, text: "The equivalent OpenAI-client version" },
      {
        type: "paragraph",
        text: "Here is the same call written with the openai package, which DOES run in this playground. Use this version to actually test today's lesson, and study the LangChain version above to understand what LangChain does for you.",
      },
      {
        type: "code",
        language: "python",
        caption: "Same call using the openai package (runs in the playground)",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=[
        {"role": "system", "content": "You are a friendly AI buddy for a 13-year-old named Aarav."},
        {"role": "user", "content": "Name one cool fact about Spider-Man in one sentence."}
    ]
)

print(response.choices[0].message.content)`,
      },
      {
        type: "paragraph",
        text: "Side by side, the openai version is shorter for a single call. But as we add memory, output parsers, and multi-step chains over the next 4 days, the LangChain version will stay clean while the openai version would balloon with manual code. That is the whole point of LangChain.",
      },
      {
        type: "table",
        headers: ["Concept", "OpenAI client (Days 26-30)", "LangChain (Days 31-35)"],
        rows: [
          ["Make a chat model", "client = OpenAI(...)", "llm = ChatOpenAI(...)"],
          ["Build a prompt", "messages = [{...}, {...}]", "ChatPromptTemplate.from_messages(...)"],
          ["Run the call", "client.chat.completions.create(messages=messages)", "chain.invoke({vars})"],
          ["Get text out", "response.choices[0].message.content", "response.content"],
          ["Add memory", "Manual list management", "ConversationBufferMemory()"],
          ["Parse JSON", "json.loads + cleaning", "StructuredOutputParser"],
        ],
      },
    ],
    setupInstructions:
      "LangChain is NOT available in the Pyodide playground. Read the LangChain code carefully to learn the real API, then run the 'equivalent OpenAI-client version' code block in Python + AI mode to see the actual result. The two versions produce the same output. If you have a real Python installation on your computer, copy the LangChain code into a .py file and run it there after pip installing langchain and langchain-openai.",
    expectedOutput:
      "A one-sentence fact about Spider-Man from the LLM, for example: 'Spider-Man was created by Stan Lee and Steve Ditko in 1962 and originally could not shoot webs from his body, he invented web-shooters instead.'",
    debugging: [
      "If the LangChain code fails with ModuleNotFoundError, that is expected in the playground. Use the openai version instead.",
      "If the openai version returns 401, your OpenRouter key is missing or wrong. Set it in Settings.",
      "If the LangChain code runs on your computer but errors with 'base_url', make sure you set base_url='https://openrouter.ai/api/v1' on the ChatOpenAI object.",
      "If you get 'model not found', double-check the model name on openrouter.ai/models (free models end with :free).",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Change the openai version to ask about Minecraft instead of Spider-Man.",
        hint: "Only the user content string needs to change.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "In the LangChain version, add a second placeholder {name} in the system prompt and pass it in invoke().",
        hint: "Change the system message to 'You are a buddy for {name}.' Then invoke with {'question': '...', 'name': 'Aarav'}.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Draw on paper what the LangChain pipe expression prompt | llm does step by step.",
        hint: "Step 1: fill in template. Step 2: send to LLM. Step 3: return response. Compare to the mermaid diagram.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Write the openai equivalent of a LangChain chain that has TWO prompts back to back (ask a question, then ask the LLM to summarize its own answer).",
        hint: "Make the first call, take its reply, put it as user content in a second call with system 'Summarize this in 5 words:'.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What problem does LangChain mainly solve?",
        options: [
          "It makes the LLM smarter",
          "It removes the need for an API key",
          "It packages common LLM patterns (prompts, memory, parsers) into reusable pieces",
          "It runs Python faster",
        ],
        correct: 2,
        explanation:
          "LangChain is a library of reusable building blocks for LLM apps: prompts, chains, memory, agents, output parsers.",
      },
      {
        id: 2,
        type: "true-false",
        question: "LangChain code can run inside the Pyodide playground used by this app.",
        correctBool: false,
        explanation:
          "False. Pyodide cannot pip install langchain. We study LangChain code for learning and run the equivalent openai-client version in the playground.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In LangChain, the symbol used to chain components together (prompt | llm | parser) is the ____ symbol.",
        answer: "pipe",
        explanation:
          "The pipe symbol | is LCEL (LangChain Expression Language) for chaining components.",
      },
      {
        id: 4,
        type: "code-output",
        question: "In LangChain, after response = chain.invoke({...}), how do you get the text out?",
        code: `response = chain.invoke({"question": "hi"})
print(response.______)`,
        answer: "content",
        explanation:
          "LangChain response objects have a .content attribute that holds the text, unlike the openai package's response.choices[0].message.content.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which LangChain component automatically manages chat history?",
        options: ["ChatPromptTemplate", "ConversationBufferMemory", "StructuredOutputParser", "ChatOpenAI"],
        correct: 1,
        explanation:
          "ConversationBufferMemory stores the conversation and feeds it back automatically. We use it on Day 33.",
      },
    ],
    teacherNotes:
      "Day 31 is a conceptual shift. Aarav has been writing raw openai calls for 5 days, so the question 'why bother with LangChain?' is fair. The 10-chatbots argument (changing the model in 10 places) usually sells it. Make sure he understands that the LangChain code is for learning and the openai version is what actually runs in the playground. Walk through the mermaid diagram on paper, it will reappear in many future lessons. Tomorrow we go deeper into prompts and chains with a Spider-Man story generator.",
    explainToFriend:
      "LangChain is like a toolkit for AI apps. Instead of writing the same messages list and parsing code every time, you snap together reusable pieces: a prompt template, an LLM, a memory, an output parser. You connect them with the pipe symbol | like Lego blocks.",
    realWorldExamples: [
      "Startups building AI features quickly without rewriting boilerplate",
      "Chatbot platforms that want to swap models without rewriting code",
      "Internal tools that combine LLMs with company databases",
      "AI agents that decide which tools (search, calculator, code) to use",
    ],
    thingsToGoogle: [
      "LangChain LCEL tutorial",
      "langchain-openai ChatOpenAI",
      "LangChain vs LlamaIndex",
      "LangChain Expression Language pipe operator",
    ],
  },

  // ============================================================
  // DAY 32: LangChain Prompts and Chains
  // ============================================================
  {
    dayNumber: 32,
    title: "LangChain Prompts and Chains",
    phase: "practical",
    objectives: [
      "Use ChatPromptTemplate to build prompts with variables",
      "Combine a prompt and an LLM into an LLMChain using the pipe operator",
      "Generate a short story about Spider-Man using a chain",
      "Reuse the same chain with different inputs",
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday you saw a tiny LangChain example. Today we go deeper into the two most important pieces: ChatPromptTemplate (which builds prompts with variables) and chains (which connect prompts to LLMs). By the end you will generate a short story about Spider-Man saving a city, using one reusable chain.",
      },
      { type: "heading", level: 2, text: "ChatPromptTemplate basics" },
      {
        type: "paragraph",
        text: "A ChatPromptTemplate is a prompt with placeholders (variables) that get filled in later. Think of it like a Mad Libs story: 'One day {hero} was eating {food} when suddenly {problem} happened.' You fill in the variables when you invoke the chain.",
      },
      {
        type: "code",
        language: "python",
        caption: "A ChatPromptTemplate with three variables",
        code: `from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a creative storyteller for a 13-year-old named Aarav."),
    ("user", "Write a 2-sentence story where {hero} eats {food} and then {problem}.")
])

# Fill in the variables
filled = prompt.format_messages(
    hero="Spider-Man",
    food="a slice of pizza",
    problem="the Green Goblin attacks New York"
)

for msg in filled:
    print(msg.role.upper() + ":", msg.content)`,
      },
      {
        type: "paragraph",
        text: "Notice the curly braces {hero}, {food}, {problem}. These are placeholders. When you call format_messages(), you pass values for each one and LangChain fills them in. The result is a list of message objects ready to send to an LLM.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Variable names matter",
        text: "Use clear, descriptive variable names like {hero}, {food}, {problem}. Avoid single letters like {x}. If you forget to pass a variable, LangChain will throw an error telling you which one is missing.",
      },
      { type: "heading", level: 2, text: "Building a chain with the pipe operator" },
      {
        type: "paragraph",
        text: "Now we connect the prompt to an LLM. In LangChain this is done with the pipe symbol |. The expression prompt | llm creates a chain that takes variables, fills the prompt, sends it to the LLM, and returns the response. One line, all the work.",
      },
      {
        type: "code",
        language: "python",
        caption: "A LangChain chain that generates a Spider-Man story",
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a creative storyteller for a 13-year-old named Aarav. Keep stories short, 3 to 4 sentences. Use vivid action verbs."),
    ("user", "Write a short story where {hero} saves {city} from {villain}. Include one surprising twist.")
])

chain = prompt | llm

response = chain.invoke({
    "hero": "Spider-Man",
    "city": "New York",
    "villain": "the Green Goblin"
})

print(response.content)`,
      },
      {
        type: "paragraph",
        text: "Read the chain line carefully: chain = prompt | llm. The pipe means 'data flows from left to right'. So variables go into the prompt, the filled prompt goes into the LLM, and the LLM's response comes out the right side. You then access response.content to get the text.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why this is powerful",
        text: "Look at how clean this is. The chain definition is one line. The call is one line. To make a different story, you just change the variables you pass to invoke(). You never rewrite the prompt or the API call. This is the LangChain promise: write the pattern once, reuse it forever.",
      },
      { type: "heading", level: 2, text: "Reuse the chain with different inputs" },
      {
        type: "code",
        language: "python",
        caption: "The same chain, three different stories",
        code: `# Using the same chain from above

stories = [
    {"hero": "Spider-Man", "city": "New York", "villain": "the Green Goblin"},
    {"hero": "Iron Man", "city": "Los Angeles", "villain": "a rogue robot army"},
    {"hero": "Aarav Singh", "city": "Mumbai", "villain": "a giant cricket ball monster"}
]

for s in stories:
    print("=" * 50)
    print(f"Story: {s['hero']} vs {s['villain']} in {s['city']}")
    print("=" * 50)
    response = chain.invoke(s)
    print(response.content)
    print()`,
      },
      {
        type: "paragraph",
        text: "Same chain, three completely different stories. This is the magic of templates. You can imagine building a whole story app where users pick hero, city, and villain from dropdowns, and the chain does the rest.",
      },
      {
        type: "table",
        headers: ["LangChain piece", "What it does", "Day we use it"],
        rows: [
          ["ChatPromptTemplate", "Holds a prompt with {variables} to fill in", "Day 32 (today)"],
          ["ChatOpenAI", "Wraps the OpenAI/OpenRouter client as a chain component", "Days 31-35"],
          ["Pipe operator |", "Connects components into a chain", "Days 31-35"],
          ["ConversationBufferMemory", "Stores chat history automatically", "Day 33"],
          ["StructuredOutputParser", "Turns LLM text into a clean Python dict", "Day 34"],
        ],
      },
      { type: "heading", level: 2, text: "The openai equivalent" },
      {
        type: "paragraph",
        text: "As on Day 31, the LangChain code above does NOT run in the playground. Here is the equivalent using the openai package. Notice how the template logic becomes manual string formatting.",
      },
      {
        type: "code",
        language: "python",
        caption: "Same Spider-Man story using the openai package (runs in the playground)",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

def make_story(hero, city, villain):
    system_msg = "You are a creative storyteller for a 13-year-old named Aarav. Keep stories short, 3 to 4 sentences. Use vivid action verbs."
    user_msg = f"Write a short story where {hero} saves {city} from {villain}. Include one surprising twist."

    response = client.chat.completions.create(
        model="tencent/hy3:free",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg}
        ]
    )
    return response.choices[0].message.content

print(make_story("Spider-Man", "New York", "the Green Goblin"))`,
      },
      {
        type: "paragraph",
        text: "The openai version uses an f-string to fill in variables. It works, but if we wanted to add memory, parsing, or a second LLM step, the function would grow. The LangChain chain stays clean because each piece is a separate component.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Forget a variable, get an error",
        text: "If your template has {hero}, {city}, {villain} but you only pass hero and city to invoke(), LangChain throws a KeyError. Always pass every variable the template expects. The error message tells you which one is missing.",
      },
    ],
    setupInstructions:
      "LangChain is NOT available in the Pyodide playground. Read the LangChain code to learn the real API, then run the openai-equivalent code block in Python + AI mode to see actual output. The two versions produce the same kind of story. If you have a real Python setup, copy the LangChain code into a .py file and run it after pip installing langchain and langchain-openai.",
    expectedOutput:
      "A 3-4 sentence Spider-Man story with a twist. Sample: 'Spider-Man swung between skyscrapers, his spider-sense buzzing as the Green Goblin swooped down on his glider. With a quick web-shot, Spidey trapped the glider's wheel, sending the Goblin spinning into a giant Spider-Man billboard. The twist? The Goblin removed his mask to reveal he was actually a fan who just wanted an autograph.'",
    debugging: [
      "If the LangChain code raises ModuleNotFoundError, use the openai equivalent instead. LangChain is not in the playground.",
      "If you get KeyError on a variable name, you forgot to pass it in invoke(). Match every {variable} in the template.",
      "If the story is too long, edit the system message to say 'Keep stories to 2 sentences max.'",
      "If stories look the same each time, add 'Be creative and different every time.' to the system message.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Change the openai version to generate a story about a Minecraft hero saving a village.",
        hint: "Change the function arguments and the system message topic.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Add a fourth variable {weather} to the LangChain template and use it in the story.",
        hint: "Add {weather} to the user message string. Pass weather when calling invoke().",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Run the same chain 3 times with different inputs and print each story numbered.",
        hint: "Use a for loop over a list of dicts. Print the story number before each response.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Add a second step to the chain: after generating the story, ask the LLM to give it a one-word title.",
        hint: "Build a second prompt template that takes {story} and asks for a title. Chain them by calling the first chain, then the second.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the pipe operator | do in LangChain (prompt | llm)?",
        options: [
          "It compares two objects",
          "It sends the output of the left side as input to the right side",
          "It divides numbers",
          "It creates a backup",
        ],
        correct: 1,
        explanation:
          "The pipe is LCEL syntax for chaining: data flows from left to right through the components.",
      },
      {
        id: 2,
        type: "true-false",
        question: "ChatPromptTemplate lets you define a prompt once and fill in different variables each time you use it.",
        correctBool: true,
        explanation:
          "Yes. That is the whole point of a template: variables in curly braces get filled in at invoke() time.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "Variables in a ChatPromptTemplate are written inside ____ braces in the template string.",
        answer: "curly",
        explanation:
          "Variables go inside curly braces like {hero} and {city}. LangChain fills them when you call invoke().",
      },
      {
        id: 4,
        type: "code-output",
        question: "What is printed?",
        code: `prompt = ChatPromptTemplate.from_messages([
    ("user", "Hello {name}, you are {age}")
])
filled = prompt.format_messages(name="Aarav", age="13")
print(filled[0].content)`,
        answer: "Hello Aarav, you are 13",
        explanation:
          "format_messages fills in the variables. The first (and only) message's content is the filled user message.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What happens if your template has {hero} but you call invoke() without passing hero?",
        options: [
          "LangChain uses an empty string",
          "LangChain skips that variable",
          "LangChain raises a KeyError",
          "LangChain prompts the user to type it",
        ],
        correct: 2,
        explanation:
          "LangChain throws a KeyError telling you which variable is missing. Always pass every variable the template expects.",
      },
    ],
    teacherNotes:
      "Day 32 is where LangChain starts to feel useful. The Mad Libs analogy for ChatPromptTemplate usually clicks instantly. Make sure Aarav runs the openai equivalent in the playground so he sees actual story output, not just code on a page. The 'reuse the chain with different inputs' example is the killer demo: show him how three different stories come from one chain. Tomorrow we add memory, which makes the chain remember previous turns.",
    explainToFriend:
      "A ChatPromptTemplate is like Mad Libs for AI. You write a story with blanks, then fill in the blanks each time. A chain connects your template to the LLM with a pipe symbol, so one line of code generates a story from any set of inputs.",
    realWorldExamples: [
      "Marketing tools that generate ad copy from a product name and audience",
      "Story apps where users pick hero, setting, and genre",
      "Email draft generators that fill in recipient and topic",
      "Quiz generators that fill in subject and difficulty",
    ],
    thingsToGoogle: [
      "LangChain ChatPromptTemplate from_messages",
      "LangChain LCEL pipe operator",
      "LangChain LLMChain vs prompt | llm",
      "LangChain invoke vs stream",
    ],
  },

  // ============================================================
  // DAY 33: LangChain Memory
  // ============================================================
  {
    dayNumber: 33,
    title: "LangChain Memory",
    phase: "practical",
    objectives: [
      "Use ConversationBufferMemory to manage chat history automatically",
      "Build a LangChain chatbot that remembers previous turns",
      "Limit memory to the last N messages to save tokens",
      "Mention ConversationSummaryMemory for long chats",
    ],
    content: [
      {
        type: "paragraph",
        text: "On Day 27 you managed chat memory by hand: a messages list, append user, append assistant, repeat. It worked, but it was a lot of bookkeeping. Today LangChain does the bookkeeping for you with ConversationBufferMemory. You just call the chain, and it remembers.",
      },
      { type: "heading", level: 2, text: "What ConversationBufferMemory does" },
      {
        type: "paragraph",
        text: "ConversationBufferMemory is a box that stores every user and assistant message. Before each call, it dumps the whole history into the prompt automatically. After each call, it stores the new user input and the new assistant reply. You do not touch the messages list yourself.",
      },
      {
        type: "table",
        headers: ["Memory type", "How it stores history", "Best for"],
        rows: [
          ["ConversationBufferMemory", "Stores every message as-is", "Short chats, full detail"],
          ["ConversationBufferWindowMemory", "Stores only last N messages", "Longer chats, token saving"],
          ["ConversationSummaryMemory", "Stores a running summary of the chat", "Very long chats"],
          ["ConversationSummaryBufferMemory", "Summary of old + full recent messages", "Hybrid long chats"],
        ],
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why so many memory types?",
        text: "Recall from Day 27: every call resends the whole history. A 100-message chat gets slow and expensive. Window memory keeps only the last few messages. Summary memory uses the LLM itself to compress old messages into a summary. You pick the memory type based on how long your chat will be and how much detail you need.",
      },
      { type: "heading", level: 2, text: "Build a memory chatbot with LangChain" },
      {
        type: "code",
        language: "python",
        caption: "A LangChain chatbot with ConversationBufferMemory",
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are Bolt, a friendly AI buddy for a 13-year-old named Aarav. Aarav likes cricket, Minecraft, and Spider-Man. Keep answers short."),
    MessagesPlaceholder(variable_name="history"),
    ("user", "{input}")
])

memory = ConversationBufferMemory(memory_key="history", return_messages=True)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

def chat(user_input):
    response = chain.run(input=user_input)
    return response

# Simulate a 3-turn conversation
print("Aarav: My favorite cricket player is Virat Kohli.")
print("Bolt:", chat("My favorite cricket player is Virat Kohli."))
print()

print("Aarav: What position does he play?")
print("Bolt:", chat("What position does he play?"))
print()

print("Aarav: How many centuries has he scored?")
print("Bolt:", chat("How many centuries has he scored?"))
print()

print("---- Memory contents after 3 turns ----")
for msg in memory.chat_memory.messages:
    print(msg.type.upper() + ":", msg.content)`,
      },
      {
        type: "paragraph",
        text: "Notice the second turn 'What position does he play?' uses the word 'he'. Bolt knows 'he' is Virat Kohli because memory automatically injected the first turn into the prompt. You did not have to write that yourself. The MessagesPlaceholder is where the history gets inserted each time.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "MessagesPlaceholder is the secret",
        text: "The line MessagesPlaceholder(variable_name='history') tells the template: 'insert whatever is in memory at this spot'. LangChain fills it with all the previous user and assistant messages before sending to the LLM. Without this placeholder, memory would have nowhere to go.",
      },
      { type: "heading", level: 2, text: "Limit memory to last 10 messages" },
      {
        type: "paragraph",
        text: "For longer chats, you can switch to ConversationBufferWindowMemory and set k=10 to keep only the last 10 messages. Older messages are dropped automatically. This keeps token cost under control.",
      },
      {
        type: "code",
        language: "python",
        caption: "Using window memory to keep only the last 10 messages",
        code: `from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=10, memory_key="history", return_messages=True)

# Use this memory in the same chain as before
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

# The chain behaves the same way, but only the last 10 messages are kept
print("Aarav: Hi Bolt!")
print("Bolt:", chain.run(input="Hi Bolt!"))`,
      },
      {
        type: "paragraph",
        text: "Change k to any number. k=5 keeps the last 5 messages. k=20 keeps the last 20. The choice depends on how much context the model needs to be helpful without wasting tokens.",
      },
      { type: "heading", level: 2, text: "ConversationSummaryMemory (mention)" },
      {
        type: "paragraph",
        text: "For very long chats (say, 100+ messages), even keeping the last 10 might lose important early context. ConversationSummaryMemory uses the LLM to compress older messages into a single summary paragraph. So instead of 100 messages, the model sees one summary plus the last few messages. This costs a few extra LLM calls to maintain the summary, but saves many tokens on each user turn.",
      },
      {
        type: "code",
        language: "python",
        caption: "Summary memory (advanced, for very long chats)",
        code: `from langchain.memory import ConversationSummaryMemory

# Slower but token-efficient for very long chats
memory = ConversationSummaryMemory(llm=llm, memory_key="history")

# Note: summary memory needs the llm itself to write the summaries`,
      },
      { type: "heading", level: 2, text: "The openai equivalent" },
      {
        type: "paragraph",
        text: "The LangChain memory code does NOT run in the playground. Here is the openai equivalent that DOES run. This is exactly the manual memory pattern you wrote on Day 27, just packaged in a function. Compare it to the LangChain version above to see how much boilerplate LangChain saves you.",
      },
      {
        type: "code",
        language: "python",
        caption: "Memory chatbot using the openai package (runs in the playground)",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

messages = [
    {"role": "system", "content": "You are Bolt, a friendly AI buddy for a 13-year-old named Aarav. Aarav likes cricket, Minecraft, and Spider-Man. Keep answers short."}
]

def chat(user_input):
    messages.append({"role": "user", "content": user_input})
    response = client.chat.completions.create(
        model="tencent/hy3:free",
        messages=messages
    )
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return reply

print("Aarav: My favorite cricket player is Virat Kohli.")
print("Bolt:", chat("My favorite cricket player is Virat Kohli."))
print()
print("Aarav: What position does he play?")
print("Bolt:", chat("What position does he play?"))
print()
print("Aarav: How many centuries has he scored?")
print("Bolt:", chat("How many centuries has he scored?"))
print()
print("---- Memory contents after 3 turns ----")
for m in messages:
    print(m["role"].upper() + ":", m["content"])`,
      },
      {
        type: "paragraph",
        text: "Side by side, the openai version manages the messages list manually (append user, append assistant) while LangChain hides all of that behind memory.run(). The output is the same. The LangChain version is just shorter once you have memory, parsing, and chains together.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Forgetting the MessagesPlaceholder",
        text: "If your chatbot seems to have no memory, check that your prompt has a MessagesPlaceholder(variable_name='history'). Without it, the memory has nowhere to inject the history and the model sees only the current user message.",
      },
    ],
    setupInstructions:
      "LangChain is NOT available in the Pyodide playground. Read the LangChain code to learn the memory API, then run the openai equivalent code in Python + AI mode to see actual memory in action. The two versions behave the same way. On a real Python setup with langchain installed, the LangChain version runs perfectly.",
    expectedOutput:
      "A 3-turn conversation where the second turn ('What position does he play?') correctly refers to Virat Kohli because memory injected the first turn. After the conversation, the full memory contents are printed showing 6 messages (3 user + 3 assistant) plus the system message.",
    debugging: [
      "If the LangChain code raises ModuleNotFoundError, use the openai equivalent instead.",
      "If the model seems to forget, check that your prompt has MessagesPlaceholder(variable_name='history').",
      "If memory grows too big, switch to ConversationBufferWindowMemory(k=10) to keep only the last 10 messages.",
      "If chain.run() is deprecated in newer LangChain, use chain.invoke({'input': ...}) instead.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Run the openai equivalent and verify the second turn correctly says Virat Kohli is a batsman.",
        hint: "Just run the code as-is and read the output carefully.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Change the openai version to limit memory to the last 4 messages (drop older ones).",
        hint: "Before appending the new user message, slice messages to keep only system + last 4. Like: messages = [messages[0]] + messages[-4:].",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Add a 'memory' command that prints how many messages are currently stored.",
        hint: "Add an if branch checking for the word 'memory'. Print len(messages).",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Turn the openai version into a real loop using input() so Aarav can chat interactively.",
        hint: "Wrap the chat() function in a while True loop with input(). Break on 'quit'.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does ConversationBufferMemory do?",
        options: [
          "Deletes old messages automatically",
          "Stores every chat message and injects the history into the prompt automatically",
          "Translates messages to other languages",
          "Compresses messages into a single sentence",
        ],
        correct: 1,
        explanation:
          "ConversationBufferMemory keeps all messages and inserts them into the prompt so the model has context.",
      },
      {
        id: 2,
        type: "true-false",
        question: "ConversationBufferWindowMemory with k=10 keeps only the last 10 messages and drops older ones.",
        correctBool: true,
        explanation:
          "Yes. Window memory keeps a sliding window of the last k messages, which saves tokens on long chats.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The LangChain component that tells the template where to insert chat history is called ____ Placeholder. (one word)",
        answer: "Messages",
        explanation:
          "MessagesPlaceholder(variable_name='history') marks the spot where memory injects previous messages.",
      },
      {
        id: 4,
        type: "code-output",
        question: "After 3 user-assistant turns plus the system message, how many items are in the messages list?",
        code: `messages = [{"role": "system", "content": "be nice"}]
for i in range(3):
    messages.append({"role": "user", "content": f"q{i}"})
    messages.append({"role": "assistant", "content": f"a{i}"})
print(len(messages))`,
        answer: "7",
        explanation:
          "1 system + 3 user + 3 assistant = 7 messages total.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why would you choose ConversationSummaryMemory over ConversationBufferMemory?",
        options: [
          "It is faster",
          "It gives better answers",
          "For very long chats, it compresses old messages into a summary to save tokens",
          "It does not need an API key",
        ],
        correct: 2,
        explanation:
          "Summary memory uses the LLM to compress old messages. Useful for very long chats where buffer memory would be too expensive.",
      },
    ],
    teacherNotes:
      "Day 33 is the 'oh that is nice' moment for LangChain. After 5 days of manually managing messages lists, automatic memory feels like magic. Run the openai equivalent in the playground so Aarav sees actual memory working. Then point out that the LangChain version hides all that manual bookkeeping. Mention ConversationSummaryMemory but do not dwell on it, it is advanced and we will not implement it. The Day 27 chatbot pattern is the comparison point: same behavior, less code. Tomorrow we tackle output parsing, the other big LangChain win.",
    explainToFriend:
      "LangChain memory is a box that stores your chat history and quietly injects it into every prompt for you. You just call the chain with the new message, and it remembers everything said before. You can also limit it to the last N messages to save tokens.",
    realWorldExamples: [
      "ChatGPT remembering what you said earlier in the same thread",
      "Customer support bots that remember your issue through a long conversation",
      "AI tutors that remember what a student already learned",
      "Role-play chatbots that stay in character across many turns",
    ],
    thingsToGoogle: [
      "LangChain ConversationBufferMemory",
      "LangChain ConversationBufferWindowMemory k parameter",
      "LangChain MessagesPlaceholder",
      "LangChain ConversationSummaryMemory use cases",
    ],
  },

  // ============================================================
  // DAY 34: LangChain Output Parsing
  // ============================================================
  {
    dayNumber: 34,
    title: "LangChain Output Parsing",
    phase: "practical",
    objectives: [
      "Use ResponseSchema to define the shape of LLM output",
      "Build a StructuredOutputParser that asks the LLM for specific JSON fields",
      "Parse LLM replies into clean Python dicts automatically",
      "Mention PydanticOutputParser as a more powerful alternative",
    ],
    content: [
      {
        type: "paragraph",
        text: "On Day 30 you asked the LLM for JSON and cleaned it up with try/except. It worked, but you had to write the cleaning code yourself and the model could still surprise you. Today LangChain does it for you with StructuredOutputParser. You define the shape you want, LangChain tells the LLM exactly what to produce, then parses it into a clean Python dict.",
      },
      { type: "heading", level: 2, text: "The problem StructuredOutputParser solves" },
      {
        type: "paragraph",
        text: "Without a parser, you write a prompt like 'Return JSON with name, top_speed, price, color'. The model might return {\"name\": \"McLaren\", \"top_speed\": \"350\", \"price\": \"$2M\", \"color\": \"orange\"} or it might wrap it in markdown or add explanation. A StructuredOutputParser (1) writes the format instructions for you, (2) injects them into the prompt, and (3) parses the model's reply into a clean dict.",
      },
      {
        type: "table",
        headers: ["Step", "What you do", "What LangChain does"],
        rows: [
          ["1. Define schemas", "Create ResponseSchema objects for each field", "Stores them"],
          ["2. Build parser", "Wrap schemas in StructuredOutputParser", "Generates format instructions"],
          ["3. Add to prompt", "Insert format instructions into template", "Injects them at invoke time"],
          ["4. Run chain", "Call invoke()", "Calls LLM and parses reply"],
          ["5. Use result", "Access result['name'], result['price']", "Returns a clean Python dict"],
        ],
      },
      { type: "heading", level: 2, text: "Define the schemas" },
      {
        type: "paragraph",
        text: "A ResponseSchema has three parts: a name, a description (tells the LLM what to put in that field), and whether it is required. Let us define schemas for a car.",
      },
      {
        type: "code",
        language: "python",
        caption: "Defining ResponseSchema objects for a car",
        code: `from langchain_core.output_parsers import StructuredOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import ResponseSchema

name_schema = ResponseSchema(name="name", description="The name of the car, e.g. McLaren 720S")
top_speed_schema = ResponseSchema(name="top_speed", description="Top speed in km/h as a number, e.g. 341")
price_schema = ResponseSchema(name="price", description="Price in US dollars as a number, e.g. 300000")
color_schema = ResponseSchema(name="color", description="A famous color for this car, e.g. orange")

schemas = [name_schema, top_speed_schema, price_schema, color_schema]

parser = StructuredOutputParser.from_response_schemas(schemas)
format_instructions = parser.get_format_instructions()
print("LangChain generated these format instructions for the LLM:")
print(format_instructions)`,
      },
      {
        type: "paragraph",
        text: "When you call parser.get_format_instructions(), LangChain writes a paragraph telling the LLM exactly what JSON shape to produce. You do not have to write this yourself. The instructions also include a reminder to return only JSON, no markdown, no extra text.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Descriptions are the secret sauce",
        text: "The description field is what really tells the LLM what to put in each field. Be specific: 'Top speed in km/h as a number' is much better than 'top speed'. If the model returns the wrong type (e.g. a string instead of a number), improve the description.",
      },
      { type: "heading", level: 2, text: "Build the chain and run it" },
      {
        type: "code",
        language: "python",
        caption: "Full LangChain chain with StructuredOutputParser",
        code: `from langchain_core.output_parsers import StructuredOutputParser, ResponseSchema
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

name_schema = ResponseSchema(name="name", description="The name of the car")
top_speed_schema = ResponseSchema(name="top_speed", description="Top speed in km/h as a number")
price_schema = ResponseSchema(name="price", description="Price in US dollars as a number")
color_schema = ResponseSchema(name="color", description="A famous color for this car")

parser = StructuredOutputParser.from_response_schemas([name_schema, top_speed_schema, price_schema, color_schema])

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a car expert for a 13-year-old named Aarav. Always return JSON matching the format instructions exactly."),
    ("user", "Tell me about a famous sports car.\\n\\n{format_instructions}")
])

prompt = prompt.partial(format_instructions=parser.get_format_instructions())

chain = prompt | llm | parser

result = chain.invoke({})

print("Type of result:", type(result))
print()
print("Name:", result["name"])
print("Top speed (km/h):", result["top_speed"])
print("Price (USD):", result["price"])
print("Color:", result["color"])`,
      },
      {
        type: "paragraph",
        text: "Three things to notice. First, prompt.partial(format_instructions=...) pre-fills the format_instructions variable so we do not have to pass it on every invoke. Second, the chain has THREE components now: prompt | llm | parser. The parser is the third stage, it takes the LLM's text reply and turns it into a dict. Third, result is a normal Python dict, so result['name'] works directly. No json.loads, no cleaning, no try/except.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "What the parser does behind the scenes",
        text: "The parser does basically what you did by hand on Day 30: it cleans markdown fences, runs json.loads, and checks the keys match your schemas. If a required key is missing, it raises a clear error telling you which one. If you want even more validation (e.g. 'top_speed must be an integer'), use PydanticOutputParser instead.",
      },
      { type: "heading", level: 2, text: "PydanticOutputParser (mention)" },
      {
        type: "paragraph",
        text: "PydanticOutputParser is the bigger sibling of StructuredOutputParser. Instead of ResponseSchema objects, you define a Pydantic model (a Python class with typed fields). This gives you type validation (e.g. price must be a float, name must be a string), default values, and even custom validators. We will not implement it today, but you should know it exists for when you need strict types.",
      },
      {
        type: "code",
        language: "python",
        caption: "What PydanticOutputParser looks like (for reference)",
        code: `from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser

class Car(BaseModel):
    name: str = Field(description="The name of the car")
    top_speed: int = Field(description="Top speed in km/h")
    price: float = Field(description="Price in US dollars")
    color: str = Field(description="Famous color for this car")

parser = PydanticOutputParser(pydantic_object=Car)
# Use it the same way as StructuredOutputParser`,
      },
      { type: "heading", level: 2, text: "The openai equivalent" },
      {
        type: "paragraph",
        text: "The LangChain code does NOT run in the playground. Here is the openai equivalent that DOES run. It uses the safe JSON parsing pattern from Day 30. Compare it to the LangChain version above to see how much code the parser saves.",
      },
      {
        type: "code",
        language: "python",
        caption: "Structured car data using the openai package (runs in the playground)",
        code: `from openai import OpenAI
import json

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

def clean_json_text(text):
    text = text.strip()
    if text.startswith("\`\`\`"):
        lines = text.split("\\n")
        lines = lines[1:]
        if lines and lines[-1].strip() == "\`\`\`":
            lines = lines[:-1]
        text = "\\n".join(lines)
    return text.strip()

messages = [
    {"role": "system", "content": "You are a car expert. Reply with valid JSON only, no markdown, no extra text. The JSON must have keys: name (string), top_speed (number, km/h), price (number, USD), color (string)."},
    {"role": "user", "content": "Tell me about a famous sports car."}
]

response = client.chat.completions.create(
    model="tencent/hy3:free",
    messages=messages
)

raw = response.choices[0].message.content
print("Raw reply:")
print(raw)
print()

try:
    car = json.loads(clean_json_text(raw))
    print("Name:", car["name"])
    print("Top speed (km/h):", car["top_speed"])
    print("Price (USD):", car["price"])
    print("Color:", car["color"])
except Exception as e:
    print("Could not parse:", e)`,
      },
      {
        type: "paragraph",
        text: "The openai version works but you wrote the format instructions, the cleaning, and the parsing yourself. With LangChain, the parser does all of that. Over many projects, this saves a lot of code and a lot of bugs.",
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Forget the parser in the chain",
        text: "If your chain is prompt | llm (no parser), you get back the raw LLM response object, not a dict. You must include | parser at the end for the parser to do its work. Always check the chain ends with the parser.",
      },
    ],
    setupInstructions:
      "LangChain is NOT available in the Pyodide playground. Read the LangChain code to learn the StructuredOutputParser API, then run the openai equivalent in Python + AI mode to see actual structured output. The two versions produce the same car dict. On a real Python setup, the LangChain version runs perfectly after pip install.",
    expectedOutput:
      "A clean Python dict printed field by field. Sample: Name: McLaren 720S / Top speed (km/h): 341 / Price (USD): 300000 / Color: orange. If parsing fails, a clear error message prints instead of crashing.",
    debugging: [
      "If the LangChain code raises ModuleNotFoundError, use the openai equivalent instead.",
      "If the parser raises OutputParserException, the model did not return valid JSON. Try a different free model or make the descriptions more specific.",
      "If a field is missing from the result, add it to your schemas list and make its description clearer.",
      "If the openai version fails to parse, run clean_json_text on the raw output first. Print raw to see what the model actually returned.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Run the openai equivalent and verify it returns a dict with all 4 keys.",
        hint: "Just run it as-is. The print statements show each field.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Add a 5th field 'country' (where the car is made) to both the openai prompt and the LangChain schemas.",
        hint: "In openai: add 'country (string)' to the system message. In LangChain: add a ResponseSchema for country.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Change the openai version to ask about a superhero instead of a car, with fields name, power, city, weakness.",
        hint: "Update the system message keys and the user question. Update the print statements.",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Loop over a list of 3 car brands and produce a structured dict for each. Print all 3 results.",
        hint: "Make a function get_car(brand) that returns the dict. Loop over ['McLaren', 'Ferrari', 'Porsche'] and print each.",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does StructuredOutputParser do?",
        options: [
          "Translates the LLM reply to other languages",
          "Defines the JSON shape you want and parses the LLM reply into a clean Python dict",
          "Makes the LLM faster",
          "Stores chat history",
        ],
        correct: 1,
        explanation:
          "StructuredOutputParser takes ResponseSchema objects, generates format instructions for the LLM, and parses the reply into a dict.",
      },
      {
        id: 2,
        type: "true-false",
        question: "A ResponseSchema needs a name and a description. The description tells the LLM what to put in that field.",
        correctBool: true,
        explanation:
          "Yes. The description is critical: it is what guides the LLM to fill the field correctly.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In a LangChain chain with a parser, the chain ends with prompt | llm | ____.",
        answer: "parser",
        explanation:
          "The parser is the last stage. It takes the LLM's text reply and turns it into a Python dict.",
      },
      {
        id: 4,
        type: "code-output",
        question: "After result = chain.invoke({}) with a StructuredOutputParser for a car, what does result['name'] return (assuming the model said 'McLaren 720S')?",
        code: `result = chain.invoke({})
print(result["name"])`,
        answer: "McLaren 720S",
        explanation:
          "result is a Python dict. result['name'] gives the value the LLM put in the name field.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the main advantage of PydanticOutputParser over StructuredOutputParser?",
        options: [
          "It does not need an API key",
          "It runs faster",
          "It supports strict type validation (e.g. price must be a float)",
          "It writes the prompt for you",
        ],
        correct: 2,
        explanation:
          "PydanticOutputParser uses Pydantic models which validate types. Use it when you need strict type checking.",
      },
    ],
    teacherNotes:
      "Day 34 closes the loop on structured output that we opened on Day 30. The comparison between the openai version (manual cleaning) and the LangChain version (parser does it all) is the key teaching moment. Run the openai version in the playground so Aarav sees real structured output. Mention PydanticOutputParser but do not implement it, it requires understanding Pydantic models which is a future topic. Tomorrow's project (AI Story Generator) combines memory, chains, and structured thinking into one big build.",
    explainToFriend:
      "LangChain's StructuredOutputParser lets you define the exact shape of JSON you want (field names and what each should contain), then it both writes the instructions for the LLM AND parses the reply into a clean Python dict. No more manual JSON cleaning.",
    realWorldExamples: [
      "Job application parsers that pull name, email, skills from a resume",
      "Recipe apps that extract ingredients, steps, and cooking time from a paragraph",
      "Travel planners that pull destination, dates, budget from a user's free-text request",
      "AI agents that need structured data to make decisions",
    ],
    thingsToGoogle: [
      "LangChain StructuredOutputParser",
      "LangChain ResponseSchema",
      "LangChain PydanticOutputParser",
      "LangChain get_format_instructions",
    ],
  },

  // ============================================================
  // DAY 35: Project 2 - AI Story Generator
  // ============================================================
  {
    dayNumber: 35,
    title: "Project 2: AI Story Generator",
    phase: "practical",
    objectives: [
      "Combine LangChain chains, memory, and prompts into one project",
      "Let the user pick genre, character name, and setting",
      "Generate Chapter 1 of a story, then Chapter 2 when the user types 'continue'",
      "Use memory to keep the story consistent across chapters",
    ],
    content: [
      {
        type: "paragraph",
        text: "Time for your second AI project. You will build a Story Generator that uses LangChain with memory. Aarav picks a genre (adventure, mystery, comedy), a main character name, and a setting. The LLM writes Chapter 1. When Aarav types 'continue', it writes Chapter 2 using the same memory, so the story stays consistent.",
      },
      { type: "heading", level: 2, text: "Project plan" },
      {
        type: "list",
        ordered: true,
        items: [
          "Set up the LangChain LLM (ChatOpenAI with OpenRouter)",
          "Create a ChatPromptTemplate for chapter generation",
          "Add ConversationBufferMemory so chapters remember each other",
          "Build the LLMChain with prompt, llm, and memory",
          "Ask Aarav for genre, character name, and setting",
          "Generate Chapter 1 with the user input",
          "Loop: if Aarav types 'continue', generate the next chapter",
          "If Aarav types 'end', print 'The End' and stop",
        ],
      },
      { type: "heading", level: 2, text: "The complete LangChain code" },
      {
        type: "code",
        language: "python",
        caption: "AI Story Generator with LangChain memory",
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a creative story writer for a 13-year-old named Aarav. "
     "Genre: {genre}. Main character: {character}. Setting: {setting}. "
     "Each chapter is 4 to 6 sentences long and ends on a small cliffhanger. "
     "Keep the story consistent with what has happened in previous chapters."),
    MessagesPlaceholder(variable_name="history"),
    ("user", "{instruction}")
])

memory = ConversationBufferMemory(memory_key="history", return_messages=True)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

# Gather user choices
genre = "adventure"
character = "Aarav"
setting = "an abandoned Minecraft stronghold"

chapter_number = 1

def generate_chapter(instruction):
    global chapter_number
    response = chain.run(
        genre=genre,
        character=character,
        setting=setting,
        instruction=instruction
    )
    print(f"\\n=== Chapter {chapter_number} ===")
    print(response)
    chapter_number += 1
    return response

# Chapter 1
print(f"Starting a {genre} story about {character} in {setting}.")
generate_chapter("Write Chapter 1. Introduce the main character and the problem.")

# Chapter 2 (uses memory automatically)
generate_chapter("Write Chapter 2. Continue the story from where Chapter 1 ended.")

# Chapter 3 (still uses memory)
generate_chapter("Write Chapter 3. Bring the story to an exciting climax.")

print("\\n=== The End ===")
print("Total chapters written:", chapter_number - 1)`,
      },
      {
        type: "paragraph",
        text: "Notice three things. First, the system message has the genre, character, and setting variables that get filled in on each call (they stay the same every chapter, but the LLM sees them fresh each time as part of the system prompt). Second, the MessagesPlaceholder injects the previous chapters as history, so Chapter 2 knows what happened in Chapter 1. Third, the user message is just the instruction ('Write Chapter 2...'), which is short because all the context comes from memory.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Why memory matters for stories",
        text: "Without memory, Chapter 2 would not know the character's name or what happened in Chapter 1. With memory, the LLM reads its own previous chapters before writing the next one. This is what makes the story feel continuous, even though each chapter is a separate API call.",
      },
      { type: "heading", level: 2, text: "Interactive version with continue command" },
      {
        type: "code",
        language: "python",
        caption: "Interactive story generator that waits for 'continue'",
        code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain

llm = ChatOpenAI(
    model="tencent/hy3:free",
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a creative story writer for a 13-year-old named Aarav. "
     "Genre: {genre}. Main character: {character}. Setting: {setting}. "
     "Each chapter is 4 to 6 sentences and ends on a small cliffhanger."),
    MessagesPlaceholder(variable_name="history"),
    ("user", "{instruction}")
])

memory = ConversationBufferMemory(memory_key="history", return_messages=True)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

genre = input("Pick a genre (adventure / mystery / comedy): ").strip()
character = input("Main character name: ").strip()
setting = input("Setting (e.g. abandoned Minecraft stronghold): ").strip()

chapter_number = 1

print(f"\\nStarting a {genre} story about {character} in {setting}...")
print()

# Chapter 1
response = chain.run(
    genre=genre,
    character=character,
    setting=setting,
    instruction="Write Chapter 1. Introduce the main character and the problem."
)
print(f"=== Chapter {chapter_number} ===")
print(response)
chapter_number += 1

# Continue loop
while True:
    cmd = input("\\nType 'continue' for the next chapter or 'end' to finish: ").strip().lower()
    if cmd == "end":
        break
    if cmd != "continue":
        print("Unknown command. Use 'continue' or 'end'.")
        continue

    response = chain.run(
        genre=genre,
        character=character,
        setting=setting,
        instruction=f"Write Chapter {chapter_number}. Continue the story from the previous chapter."
    )
    print(f"\\n=== Chapter {chapter_number} ===")
    print(response)
    chapter_number += 1

print("\\n=== The End ===")
print("Total chapters written:", chapter_number - 1)`,
      },
      {
        type: "paragraph",
        text: "This is the full project. Aarav picks the genre, character, and setting. Chapter 1 is generated automatically. Then Aarav decides chapter by chapter whether to continue or end. Memory handles all the consistency between chapters.",
      },
      {
        type: "table",
        headers: ["User command", "What happens", "Memory state"],
        rows: [
          ["(start)", "Chapter 1 generated", "1 assistant message stored"],
          ["continue", "Chapter 2 generated using Chapter 1 as context", "2 assistant messages stored"],
          ["continue", "Chapter 3 generated using Chapters 1 and 2", "3 assistant messages stored"],
          ["continue", "Chapter 4 generated using all previous chapters", "4 assistant messages stored"],
          ["end", "Story ends, total printed", "Memory unchanged"],
        ],
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Stories drift over many chapters",
        text: "Even with memory, free models can drift: a character's name might change spelling, or a detail from Chapter 1 might be forgotten by Chapter 5. If this happens, (1) use a stronger model, (2) add a system reminder like 'Remember the main character's name is exactly X', or (3) switch to ConversationSummaryMemory to compress old chapters.",
      },
      { type: "heading", level: 2, text: "The openai equivalent" },
      {
        type: "paragraph",
        text: "The LangChain code does NOT run in the playground. Here is the openai equivalent that DOES run. It manages memory manually with a messages list, exactly the pattern from Day 27. Compare it to the LangChain version to see how memory, prompt, and chain fit together.",
      },
      {
        type: "code",
        language: "python",
        caption: "Story generator using the openai package (runs in the playground)",
        code: `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_OPENROUTER_API_KEY",
    base_url="https://openrouter.ai/api/v1"
)

genre = "adventure"
character = "Aarav"
setting = "an abandoned Minecraft stronghold"

system_msg = (
    f"You are a creative story writer for a 13-year-old named Aarav. "
    f"Genre: {genre}. Main character: {character}. Setting: {setting}. "
    f"Each chapter is 4 to 6 sentences and ends on a small cliffhanger. "
    f"Keep the story consistent with previous chapters."
)

messages = [{"role": "system", "content": system_msg}]

def generate_chapter(instruction):
    messages.append({"role": "user", "content": instruction})
    response = client.chat.completions.create(
        model="tencent/hy3:free",
        messages=messages
    )
    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    return reply

print(f"Starting a {genre} story about {character} in {setting}.")
print()

chapter_number = 1
print(f"=== Chapter {chapter_number} ===")
print(generate_chapter("Write Chapter 1. Introduce the main character and the problem."))
chapter_number += 1

print()
print(f"=== Chapter {chapter_number} ===")
print(generate_chapter("Write Chapter 2. Continue the story from where Chapter 1 ended."))
chapter_number += 1

print()
print(f"=== Chapter {chapter_number} ===")
print(generate_chapter("Write Chapter 3. Bring the story to an exciting climax."))

print()
print("=== The End ===")
print("Total chapters written: 3")
print("Total messages in memory:", len(messages))`,
      },
      {
        type: "paragraph",
        text: "This project combines everything from Days 26 to 34: the OpenAI client pattern, the messages list, system prompts, multi-turn memory, and structured thinking. The LangChain version packages all of this into a chain with memory; the openai version does the same thing with manual bookkeeping. Either way, you now have a working AI Story Generator.",
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Save this project",
        text: "This is Aarav's second portfolio project (after the Bolt chatbot on Day 29). Encourage him to save the code in a file called story_generator.py on his computer. He can show it to family, run it in a real terminal, and even extend it with new genres. This is the kind of project that proves he can build real AI apps.",
      },
    ],
    setupInstructions:
      "LangChain is NOT available in the Pyodide playground. Read the LangChain code to see how chains, memory, and prompts combine, then run the openai equivalent in Python + AI mode to actually generate a story. For the interactive version, copy it into a real Python file and run in a terminal so input() works smoothly. OpenRouter key must be set in Settings.",
    expectedOutput:
      "A 3-chapter adventure story about Aarav in an abandoned Minecraft stronghold. Each chapter is 4-6 sentences and ends on a cliffhanger. Chapter 2 references events from Chapter 1 (memory works). Final line prints 'Total messages in memory: 7' (1 system + 3 user + 3 assistant).",
    debugging: [
      "If the LangChain code raises ModuleNotFoundError, use the openai equivalent instead. LangChain is not in the playground.",
      "If Chapter 2 does not reference Chapter 1, check that the assistant reply is being appended to messages (openai version) or that memory is attached to the chain (LangChain version).",
      "If chapters are too long, edit the system message to say 'Each chapter is 2 to 3 sentences max'.",
      "If the interactive loop never ends, make sure you typed 'end' (lowercase) to break.",
      "If you get a 429 error, you hit the free model rate limit. Wait 60 seconds and try again.",
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Run the openai version and verify Chapter 2 mentions something from Chapter 1.",
        hint: "Read both chapters carefully. Look for character names or events that carry over.",
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Change the genre to 'comedy' and the setting to 'a pizza restaurant'. Run again.",
        hint: "Only the genre and setting variables need to change. Compare the tone to the adventure version.",
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Add a 4th chapter that brings the story to a happy ending.",
        hint: "Add one more generate_chapter call with instruction 'Write Chapter 4. Bring the story to a happy ending.'",
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Save each chapter to a separate file: chapter_1.txt, chapter_2.txt, chapter_3.txt.",
        hint: "Use open(f'chapter_{chapter_number}.txt', 'w') and write the reply inside generate_chapter.",
      },
      {
        id: 5,
        difficulty: "hard",
        description: "Add a 'twist' command that asks the LLM to add a surprise twist to the latest chapter.",
        hint: "Add a new command in the interactive loop. When user types 'twist', call generate_chapter with instruction 'Rewrite the last chapter with a surprising twist.'",
      },
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Why does the Story Generator need memory?",
        options: [
          "To make the LLM faster",
          "So Chapter 2 knows what happened in Chapter 1",
          "To translate the story to other languages",
          "To reduce the API cost",
        ],
        correct: 1,
        explanation:
          "Without memory, each chapter is a fresh call that knows nothing about previous chapters. Memory injects previous chapters as context.",
      },
      {
        id: 2,
        type: "true-false",
        question: "In the interactive version, typing 'banana' as a command will generate the next chapter.",
        correctBool: false,
        explanation:
          "False. Only 'continue' generates the next chapter. 'end' stops the story. Any other input prints 'Unknown command'.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In the openai equivalent, we use messages.____() to add the LLM reply to the history. (method name)",
        answer: "append",
        explanation:
          "messages.append({'role': 'assistant', 'content': reply}) adds the LLM's reply to the history so the next call sees it.",
      },
      {
        id: 4,
        type: "code-output",
        question: "After 3 chapters in the openai equivalent, how many messages are in the messages list (including system)?",
        code: `messages = [{"role": "system", "content": "..."}]
for i in range(3):
    messages.append({"role": "user", "content": f"chapter {i+1}"})
    messages.append({"role": "assistant", "content": f"story {i+1}"})
print(len(messages))`,
        answer: "7",
        explanation:
          "1 system + 3 user + 3 assistant = 7 messages.",
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the main benefit of using LangChain for this project instead of raw openai calls?",
        options: [
          "LangChain generates better stories",
          "LangChain is faster",
          "LangChain packages memory, prompt, and LLM into one reusable chain with less boilerplate",
          "LangChain does not need an API key",
        ],
        correct: 2,
        explanation:
          "LangChain hides the manual message list management behind a chain with memory. The story quality is the same; the code is cleaner.",
      },
    ],
    teacherNotes:
      "Day 35 is the capstone of Part 1 of the practical phase. The Story Generator combines every concept from Days 26-34 into one project. Run the openai equivalent in the playground so Aarav sees actual chapters generated. Encourage him to experiment with genres, characters, and settings. The 'stories drift over many chapters' callout is honest about free model limitations, do not skip it. Save this project as a portfolio piece alongside the Bolt chatbot from Day 29. After today, Aarav has built two real AI apps and is ready for the next phase.",
    explainToFriend:
      "The Story Generator uses memory to keep chapters consistent. You pick a genre, character, and setting. The LLM writes Chapter 1. When you say 'continue', it writes Chapter 2 using Chapter 1 as context, and so on. Each chapter is a separate API call, but memory makes them feel like one continuous story.",
    realWorldExamples: [
      "AI dungeon games like AI Dungeon",
      "Interactive fiction apps for kids",
      "Writing assistants that help authors draft chapters",
      "Educational story apps that adapt to a student's reading level",
    ],
    thingsToGoogle: [
      "LangChain LLMChain with memory",
      "LangChain MessagesPlaceholder",
      "AI story generator tutorial",
      "LangChain ConversationBufferMemory for long form generation",
    ],
  },
];
