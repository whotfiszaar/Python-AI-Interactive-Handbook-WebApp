import type { Exercise } from "@/types";

// Additional exercises for Days 25 to 48.
// Existing day content files already ship 0 to 5 exercises per day with IDs 1-5.
// These extra exercises use IDs starting at 10 so they never collide.
// Each day gets at least 7 new exercises so the combined total reaches 10+.

export const extraExercises25to48: Record<number, Exercise[]> = {
  // ============================================================
  // DAY 25: Software Concepts for AI (REST APIs, JSON, GET/POST, API keys)
  // ============================================================
  25: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Write a Python dictionary for a cricket player with keys name, team, and runs. Print it. Then print its type to confirm it is a dict.",
      hint: "Use player = {'name': 'Virat Kohli', 'team': 'RCB', 'runs': 82}. Then print(type(player)).",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Convert that cricket dictionary to a JSON string using json.dumps and print it. Notice how it looks almost identical to the dict.",
      hint: "import json first, then print(json.dumps(player)).",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "List the 4 parts of the restaurant analogy (customer, menu, order, food) and write what each one maps to in software.",
      hint: "Customer is the client, menu is the endpoints, order is the HTTP request, food is the response.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Write a small JSON object (as a Python string) for a Minecraft block with keys name, hardness, and tool_required. Parse it with json.loads and print each key.",
      hint: "Use a string like '{\"name\": \"dirt\", \"hardness\": 0.5, \"tool_required\": \"shovel\"}' and json.loads.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Using the restaurant analogy, explain in 2 sentences when you would use POST instead of GET. Use a Minecraft example.",
      hint: "GET is for reading the menu, POST is for placing a new order. For example, POST to add a new block to a Minecraft world.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Write pseudocode (plain English steps) showing how to load an OpenRouter API key from an environment variable called OPENROUTER_API_KEY instead of hardcoding it.",
      hint: "import os, then key = os.environ.get('OPENROUTER_API_KEY'), then check if key is None.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Write a function print_players(json_string) that takes a JSON array of cricket players (each with name and role) and prints only the names of batsmen.",
      hint: "Parse with json.loads, loop over the list, and check if player['role'] == 'batsman' before printing player['name'].",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Two JSON strings describe the same cricket match but differ in one field. Write code to load both, compare them key by key, and print which key is different.",
      hint: "Loop over the keys of the first dict and compare with the second. Print the key where values do not match.",
    },
  ],

  // ============================================================
  // DAY 26: Setting up OpenRouter
  // ============================================================
  26: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "List 3 free models available on OpenRouter that you could use. Write down their full model IDs (for example google/gemma-2-9b-it:free).",
      hint: "Visit the OpenRouter models page and filter by free models.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the example model to a different free one and ask the same cricket question. Write down one difference you notice in the reply.",
      hint: "Only the model= line needs to change. Keep the prompt the same so you can compare.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Make the LLM answer a question about Aarav's favorite Minecraft mob. Print the full reply.",
      hint: "Change the messages content to ask 'Which Minecraft mob is the most useful and why?'",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Print how many tokens the call used by accessing response.usage. Print input tokens and output tokens separately.",
      hint: "response.usage.prompt_tokens is input, response.usage.completion_tokens is output.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Wrap the API call in a try/except block. If the call fails, print 'Could not reach OpenRouter' instead of crashing.",
      hint: "Use try: ... except Exception as e: print('Could not reach OpenRouter') and also print the error.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Measure how long the API call takes using time.time() before and after. Print the time in seconds.",
      hint: "import time, record start = time.time() before the call, then print(time.time() - start) after.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a function ask_llm(question, model) that takes both the question and the model name as arguments and returns the reply text.",
      hint: "def ask_llm(question, model): then build the messages list using the question argument and call client.chat.completions.create with model=model.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Call the same prompt with 3 different free models in a loop. Print each model name and its reply. Note which reply you like best.",
      hint: "Make a list of 3 model strings. Loop over it and call ask_llm inside the loop.",
    },
  ],

  // ============================================================
  // DAY 27: Chat Conversations (messages list, roles, multi-turn)
  // ============================================================
  27: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Add a third user message to the messages list asking the bot about Aarav's cricket practice schedule. Print the assistant's reply.",
      hint: "Append another {'role': 'user', 'content': '...'} dict and call the API again.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the system message so the assistant speaks like a Minecraft villager saying 'hmm' and 'hrmm' between sentences.",
      hint: "Replace the system content with 'You are a Minecraft villager. Add hmm and hrmm to your sentences.'",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "After the conversation ends, loop through messages and print only the ones with role 'assistant'.",
      hint: "for m in messages: if m['role'] == 'assistant': print(m['content']).",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Add a 'help' command to the chat loop. When the user types 'help', print a list of supported commands (like 'bye' to quit) without calling the API.",
      hint: "Check if user_input == 'help' before appending to messages. Print the help text and use continue.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Count how many turns the conversation had and print the number when the chat ends.",
      hint: "Keep a turn_count variable. Increment it each time the user sends a message.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Change the loop so it also stops if the user types 'quit' (in addition to 'bye'). Print a goodbye message either way.",
      hint: "Change the if check to: if user_input in ('bye', 'quit'): break.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a function add_message(role, content) that validates role is one of system, user, or assistant before appending to messages. If invalid, raise a ValueError.",
      hint: "Check if role not in ('system', 'user', 'assistant') and raise ValueError with a helpful message.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a 'save' command that writes the current messages list to chat.json mid-conversation using the json module.",
      hint: "import json. On 'save', use json.dump(messages, open('chat.json', 'w'), indent=2) and print 'Saved'.",
    },
  ],

  // ============================================================
  // DAY 28: Prompt Templates (system prompt, few-shot, reusable patterns)
  // ============================================================
  28: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Add a third few-shot example to the superhero nickname code. Use a cricket player like 'Virat Kohli' and a nickname like 'King Kohli'.",
      hint: "Append one more user/assistant pair before the final user message.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the system prompt so the LLM speaks like a car mechanic explaining things in simple words.",
      hint: "Replace the system content with 'You are a friendly car mechanic who explains things simply.'",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Test the same question with zero few-shot examples vs three examples. Write down which gives a better answer.",
      hint: "Make two versions of the messages list. Compare the replies side by side.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Build a function system_prompt_for(personality) that returns a system prompt string for a given personality. Try it with 'cricket commentator' and 'pirate'.",
      hint: "return f'You are a {personality}. Answer all questions in character.'",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add few-shot examples that teach the LLM to convert a Minecraft block name to its hardness rating (for example dirt -> 0.5, stone -> 1.5).",
      hint: "Add 3 user/assistant pairs mapping block names to numbers, then ask about obsidian.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Build a few-shot classifier that labels cricket shots as 'aggressive' or 'defensive'. Examples: 'pull shot' -> aggressive, 'forward defence' -> defensive.",
      hint: "Add at least 4 example pairs, then ask the model to classify 'cover drive'.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Create a reusable prompt template function ask_character(character, style, question) that builds the messages list and calls the LLM.",
      hint: "def ask_character(character, style, question): build system message using character and style, append user question, call API.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Compare two system prompts on the same question. One says 'You are a helpful assistant.' The other says 'You are a strict maths teacher.' Ask 'What is 7 times 8?'. Note the difference in tone.",
      hint: "Run the same question twice with different system messages. Print both replies.",
    },
  ],

  // ============================================================
  // DAY 29: Project 1 - AI Chatbot (Bolt)
  // ============================================================
  29: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Add a 'help' command to Bolt that lists all supported commands (joke, topics, history, bye) without calling the API.",
      hint: "Add an if user_input == 'help' branch. Print a list of commands and use continue.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change MAX_INPUT_LENGTH to 500 and test with a long message about a cricket match. See how Bolt responds.",
      hint: "Only one number needs to change. Send a message longer than 500 characters to test the limit.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Add a 'weather' command that prints a hardcoded weather string for Mumbai without calling the API.",
      hint: "Add an if branch that prints 'It is sunny in Mumbai, 32 degrees.' and uses continue.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Make Bolt remember Aarav's name. On the first turn, ask for his name. On later turns, greet him by name.",
      hint: "Keep a name variable that starts as None. If it is None, ask for the name and store it.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a 'translate' command that uses the LLM to translate Aarav's next message into Hindi.",
      hint: "Add an if branch. On 'translate', set a flag. On the next turn, send the message to the LLM with system 'Translate this to Hindi.'",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a 'quiz' command that asks Aarav a cricket trivia question and checks his answer on the next turn.",
      hint: "On 'quiz', pick a question from a list and store the answer. On the next turn, compare and print correct or wrong.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add a token counter that estimates how many tokens the conversation is using (count words as a rough estimate). Warn when it goes above 500 words.",
      hint: "Count words in all messages with sum(len(m['content'].split()) for m in messages).",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a 'mood' command that asks the LLM to respond in a happy, sad, or excited style. The user types 'mood happy' to switch.",
      hint: "Parse the second word after 'mood'. Store it in a mood variable. Include the mood in the system prompt.",
    },
  ],

  // ============================================================
  // DAY 30: Working with JSON Responses
  // ============================================================
  30: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Ask the LLM for 3 cricket terms as a JSON array. Print each term with a number using a loop.",
      hint: "Use a prompt like 'Return a JSON array of 3 cricket terms.' Then loop over data with enumerate.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "After json.loads, print type(data) to confirm whether the result is a list or a dict.",
      hint: "Add print(type(data)) right after parsing.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change the car example to ask for a single cricket player as a JSON object with keys name, team, and role. Print each key separately.",
      hint: "Update the prompt and the print statements to use data['name'], data['team'], data['role'].",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Improve clean_json_text to also strip markdown code fences like ```json and ```.",
      hint: "Check if the text contains triple backticks. Slice from the first newline after ```json to the last ```.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Ask for a Minecraft crafting recipe as JSON with keys name, ingredients (a list), and result. Print the recipe nicely.",
      hint: "Use a prompt like 'Return a JSON object for a Minecraft crafting recipe with keys name, ingredients, result.'",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Handle the case where the LLM returns an empty string. Print 'Empty response, please try again.' instead of crashing.",
      hint: "After cleaning, check if not text. If so, print the message and return early.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a retry loop that asks the LLM up to 3 times for valid JSON. If it fails all 3 times, print an error.",
      hint: "Use a for loop with range(3). Try to parse, and break on success. Append a stricter user message each retry.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Parse a JSON array of cricket players (each with name and role) and print only the names of batsmen. Handle the case where the role key is missing.",
      hint: "Loop over the list, use player.get('role') to avoid KeyError, and only print if the role is 'batsman'.",
    },
  ],

  // ============================================================
  // DAY 31: What is LangChain?
  // ============================================================
  31: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "List the 5 main LangChain components mentioned in the lesson: prompts, chains, memory, agents, and output parsers.",
      hint: "Re-read the lesson's components section. Write one sentence for each.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Run the openai version and the LangChain version on the same Spider-Man question. Confirm both return an answer.",
      hint: "Run both scripts. The answers may differ in wording but both should respond.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change the LangChain example to ask about Aarav's favorite cricket shot. Print the response.",
      hint: "Only the user content string needs to change in the invoke call.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "In 3 sentences, explain why LangChain is useful even though you can call openai directly.",
      hint: "Mention reusable prompts, memory, and chaining multiple steps.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Draw on paper the Prompt -> LLM -> Output Parser flow. Label each arrow with what passes between them.",
      hint: "Between prompt and LLM passes a filled message list. Between LLM and parser passes the raw reply.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Write the openai equivalent of a single LangChain chain call. Compare how many lines each one takes.",
      hint: "Build the messages list, call client.chat.completions.create, and extract the reply. Count the lines.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Write a 5-sentence paragraph comparing raw openai calls vs LangChain chains. Mention one advantage and one disadvantage of each.",
      hint: "Talk about simplicity vs reusability, and the extra package dependency LangChain adds.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a tiny chain using prompt | llm and run it twice with two different cricket questions. Print both replies.",
      hint: "Define a ChatPromptTemplate with one variable. Call chain.invoke twice with different inputs.",
    },
  ],

  // ============================================================
  // DAY 32: LangChain Prompts and Chains
  // ============================================================
  32: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Change the story topic from Spider-Man to a cricket match hero who hits the winning six. Print the story.",
      hint: "Change the user content string in the invoke call.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a second variable {hero} to the LangChain template. Pass a hero name when calling invoke.",
      hint: "Add {hero} to the user message string. Pass hero='Aarav' in the invoke dict.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Run the same chain 3 times with the same input. Print each story numbered. Notice how the story changes each time.",
      hint: "Use a for loop with range(3). Print the story number before each response.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Build a chain that takes a {movie} and returns a one-line review. Test it with 3 movie names.",
      hint: "Define a ChatPromptTemplate with a {movie} variable and a system message asking for a one-line review.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a third variable {mood} to the story template. Mood can be happy, sad, or exciting. Pass each one and compare.",
      hint: "Add {mood} to the user message. Run the chain 3 times with different moods.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Build a chain that takes a {car} brand and returns a one-line marketing slogan. Test with McLaren, Ferrari, and Porsche.",
      hint: "System message: 'You write car slogans.' User message: 'Write a one-line slogan for {car}.'",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Chain two prompts together. First generate a short Minecraft story, then ask the LLM to give it a one-word title.",
      hint: "Call the first chain, take its reply, then call a second chain with a {story} variable asking for a title.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a chain that takes a {topic} and a {audience} (for example 'cricket' and 'a 10-year-old'). Test with 2 different audiences and note the difference.",
      hint: "Use both variables in the system prompt. The audience should change the complexity of the answer.",
    },
  ],

  // ============================================================
  // DAY 33: LangChain Memory
  // ============================================================
  33: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the example and verify the LLM remembers the cricket player from turn 1 when you ask a follow-up in turn 2.",
      hint: "Ask 'Who is Virat Kohli?' then 'What is his role?' The LLM should know 'his' refers to Virat Kohli.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a third turn asking about a different cricket player. Confirm the LLM keeps both players straight.",
      hint: "Ask 'Who is Jasprit Bumrah?' after the first two turns. The LLM should answer about Bumrah, not Kohli.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Print the memory contents after each turn so you can see what the LLM is remembering.",
      hint: "Access memory.chat_memory.messages and print it after each invoke.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Change the memory to keep only the last 2 messages instead of all. Confirm older messages are forgotten.",
      hint: "Look at the lesson's limiting memory section. Use a window memory or manually trim the messages list.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a 'forget' command that clears the memory mid-conversation. Test that the LLM no longer remembers the previous topic.",
      hint: "On 'forget', call memory.clear(). On the next turn, ask a follow-up that requires old context.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a 'show memory' command that prints how many messages are currently stored in memory.",
      hint: "Print len(memory.chat_memory.messages) when the user types 'show memory'.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a function that estimates the token count of the memory by counting words. Warn when it goes above 200 words.",
      hint: "Sum len(m.content.split()) over all messages in memory. Print a warning if above 200.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Switch from ConversationBufferMemory to ConversationSummaryMemory (or read about it). Write 3 sentences about how it differs.",
      hint: "Summary memory compresses old turns into a summary instead of keeping them verbatim. It saves tokens for long chats.",
    },
  ],

  // ============================================================
  // DAY 34: LangChain Output Parsing
  // ============================================================
  34: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the example and confirm the parser returns a dict with all 4 keys (name, top_speed, horsepower, price).",
      hint: "Just run the code as-is and read the printed dict.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a 5th field 'country' to both the openai prompt and the LangChain ResponseSchema. Print the new field.",
      hint: "Add ResponseSchema(name='country', description='Country where the car is made'). Update the print statement.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Print the format_instructions string so you can see what the LLM actually receives.",
      hint: "Call parser.get_format_instructions() and print the result before running the chain.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Change the topic from car to a cricket player with fields name, role, country, and best_score. Print each field.",
      hint: "Update the system message, the user question, and the ResponseSchema names and descriptions.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Build schemas for a Minecraft mob with fields name, health (number), hostile (true or false), and drops (a list). Test with a creeper.",
      hint: "Define 4 ResponseSchema objects. In the prompt, be clear that hostile is boolean and drops is a list.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add error handling so if parsing fails, the LLM is asked to retry with a stricter prompt.",
      hint: "Wrap the chain call in try/except. On except, append a user message asking for strict JSON and retry once.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Loop over a list of 3 car brands and produce a structured dict for each. Print all 3 results in a nice format.",
      hint: "Make a function get_car(brand) that returns the parsed dict. Loop over ['McLaren', 'Ferrari', 'Porsche'] and print.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a parser for a list of 3 Minecraft mobs instead of a single mob. Print each mob with its fields.",
      hint: "Ask the LLM for a JSON array. You may need to parse the raw text first, then run the parser on each item.",
    },
  ],

  // ============================================================
  // DAY 35: Project 2 - AI Story Generator
  // ============================================================
  35: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the generator and read Chapter 1 and Chapter 2. Confirm Chapter 2 references something from Chapter 1.",
      hint: "Look for character names or events that carry over between chapters.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the genre to 'mystery' and the setting to 'a cricket stadium at night'. Run again and compare the tone.",
      hint: "Only the genre and setting variables need to change.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change the character name to 'Aarav the cricket captain'. Run again to see Aarav as the hero.",
      hint: "Update the character variable before calling generate_chapter.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Add a 5th chapter that brings the story to a happy ending. Use the instruction 'Write Chapter 5. Bring the story to a happy ending.'",
      hint: "Call generate_chapter with a new instruction string.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a 'summary' command that asks the LLM to summarize the story so far in 3 sentences.",
      hint: "Add a new command in the interactive loop. Use the memory contents as context for the summary.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a 'twist' command that asks the LLM to add a surprise twist to the latest chapter.",
      hint: "On 'twist', call generate_chapter with instruction 'Rewrite the last chapter with a surprising twist.'",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Save each chapter to a separate file: chapter_1.txt, chapter_2.txt, chapter_3.txt. Confirm the files appear on disk.",
      hint: "Inside generate_chapter, use open(f'chapter_{chapter_number}.txt', 'w') and write the reply.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a 'rewrite' command that asks the LLM to rewrite the latest chapter in a funnier tone. Keep the original chapter too.",
      hint: "Save the new chapter to chapter_X_funny.txt so the original is not overwritten.",
    },
  ],

  // ============================================================
  // DAY 36: What is MCP (Model Context Protocol)?
  // ============================================================
  36: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "In one sentence, explain what MCP stands for and what it does.",
      hint: "MCP stands for Model Context Protocol. It is a universal plug between LLMs and tools.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "List 2 problems developers had before MCP existed.",
      hint: "Custom glue code per tool, and rewriting glue when switching LLMs.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "List 3 example tools a cricket MCP server might expose (for example get_live_score).",
      hint: "Think about what a cricket fan wants: scores, player stats, match schedule.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Explain the USB analogy for MCP in your own words in 3 sentences.",
      hint: "Mention custom cables before USB and custom glue code before MCP. Both standards made life easier.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Draw on paper the MCP client-server flow for a Spider-Man fan app that uses a Marvel API tool.",
      hint: "LLM App -> MCP Client -> MCP Server -> Marvel API. Label each arrow.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "In 2 sentences, explain why a standard protocol like MCP is better than writing custom code for every tool.",
      hint: "Mention reusability across LLMs and not having to rewrite glue code.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Research online: list two real MCP servers (for example filesystem, slack, github) and what tools they expose.",
      hint: "Search the official MCP servers GitHub repo. Write the server name and 2 tools each exposes.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Write a paragraph (5 sentences) comparing custom integrations vs the MCP standard. Mention one tradeoff of MCP.",
      hint: "Tradeoff could be: MCP adds a layer of abstraction that you have to learn, but it pays off in the long run.",
    },
  ],

  // ============================================================
  // DAY 37: MCP Basics (Tools, Resources, Client)
  // ============================================================
  37: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Modify FakeMCPServer to add a third tool get_minecraft_tip() that returns a Roblox or Minecraft building tip.",
      hint: "Add a new key to self.tools and a new branch in call_tool.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "List one tool and one resource an MCP server for a cricket app might expose.",
      hint: "Tool: get_live_score. Resource: rules_of_cricket.txt.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Add a new resource 'cricket_rules.txt' to FakeMCPServer that returns a short summary of cricket rules.",
      hint: "Add a new key to self.resources with a string of cricket rules.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "In the conceptual example, add a parameter schema for get_time that takes a timezone string.",
      hint: "Change parameters from {} to {'timezone': 'string'}.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Write 3 sentences explaining the difference between an MCP tool and an MCP resource.",
      hint: "Tools are functions you call (they do something). Resources are data you read (they provide information).",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a tool list_ipl_teams() to FakeMCPServer that returns a list of IPL team names.",
      hint: "Return a list like ['MI', 'CSK', 'RCB', 'KKR', 'DC', 'SRH', 'RR', 'PBKS'].",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add a tool get_car_info(brand) to FakeMCPServer that returns a dict with name, country, and top_speed for the given brand.",
      hint: "Use a dictionary mapping brand names to info dicts. Return the matching one.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a tool list_all_tools() that returns the names and descriptions of all tools the server exposes.",
      hint: "Loop over self.tools and return a list of dicts with name and description keys.",
    },
  ],

  // ============================================================
  // DAY 38: Building a Simple MCP Server
  // ============================================================
  38: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Add a fourth city to the fake_weather dictionary, for example 'Kolkata' with a temperature.",
      hint: "Add a new key-value pair like 'Kolkata': 33.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a fifth operation 'power' to the calculator that computes a to the power of b.",
      hint: "Use a ** b in Python and add an elif branch for operation == 'power'.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Add a 6th city 'Chennai' to fake_weather and test get_weather with it.",
      hint: "Just add the key-value pair and call the tool with 'Chennai'.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Write a new tool get_cricket_fact() that returns a random fun fact about cricket from a list of at least 3 facts.",
      hint: "Use the random module and random.choice(list_of_facts).",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a tool get_minecraft_block(name) that returns the hardness and required tool for a block. Include dirt, stone, and obsidian.",
      hint: "Use a dictionary mapping block names to {'hardness': X, 'tool': 'pickaxe'} dicts.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Modify get_weather to take an optional parameter unit ('C' or 'F') and convert the temperature accordingly.",
      hint: "Default unit to 'C'. If 'F', convert using F = C * 9/5 + 32.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add a tool get_car_spec(brand, model) that returns fake specs as a dict with top_speed, horsepower, and price.",
      hint: "Use a nested dictionary mapping brand -> model -> specs. Return the matching specs.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a tool list_ipl_teams() that returns a list of IPL teams. Then add get_ipl_team_info(team) that returns captain and home stadium for a team.",
      hint: "Use a dictionary mapping team codes to {'captain': ..., 'stadium': ...} dicts.",
    },
  ],

  // ============================================================
  // DAY 39: Connecting MCP to LangChain
  // ============================================================
  39: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the example and ask 'What is the weather in Mumbai?'. Confirm the assistant uses the get_weather tool.",
      hint: "With verbose=True you should see the tool call in the output.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the model from tencent/hy3:free to google/gemma-2-9b-it:free and compare the answers.",
      hint: "Just change the model= line in the ChatOpenAI constructor.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Ask the assistant 'What is 15 plus 27?'. Confirm it uses the calculator tool.",
      hint: "The LLM should pick the calculate tool automatically.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Add a new tool to server.py: get_spiderman_fact() that returns a fact about Spider-Man. Restart and ask the assistant about Spider-Man.",
      hint: "Use the @mcp.tool() decorator and a list of facts.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Modify the system prompt to make the assistant speak like a cricket commentator. Test it with a weather question.",
      hint: "Change the system message in the ChatPromptTemplate.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a get_minecraft_tip tool to server.py. Restart the server and ask the assistant for a building tip.",
      hint: "Use the @mcp.tool() decorator and return a string tip.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add verbose logging that prints every tool call the LLM makes, including the tool name and arguments.",
      hint: "Use a callback handler or wrap the tool execution with print statements.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a function that asks the assistant the same question 3 times and prints each answer. Note any differences.",
      hint: "Use a for loop. The LLM may pick different tools or phrase answers differently each time.",
    },
  ],

  // ============================================================
  // DAY 40: What is Langfuse?
  // ============================================================
  40: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Create a free Langfuse Cloud account and a project named 'aarav-ai-handbook'.",
      hint: "Go to https://cloud.langfuse.com and sign up. Create a new project after logging in.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Run the smoke test script and confirm the trace appears in your dashboard.",
      hint: "Make sure to call langfuse.flush() at the end so traces are sent before the script exits.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "List 3 metrics Langfuse tracks for an LLM call (for example tokens, latency, cost).",
      hint: "Re-read the metrics section of the lesson.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Modify the smoke test to add a second span named 'final-answer' inside the same trace.",
      hint: "Call trace.span(name='final-answer') a second time.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "In 3 sentences, explain why observability matters for AI apps.",
      hint: "Mention debugging, cost tracking, and finding which prompt or model is slow.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a name to your trace (for example 'cricket-test') so you can find it easily in the dashboard.",
      hint: "Pass name='cricket-test' when creating the trace with langfuse.trace().",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add usage data (input and output token counts) to the generation. Look up how Langfuse calculates cost from usage.",
      hint: "Pass usage={'input': N, 'output': M} to .generation().",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a trace with 2 generations (one for each LLM call) and compare their token counts in the dashboard.",
      hint: "Call trace.generation() twice. Use different names so you can tell them apart.",
    },
  ],

  // ============================================================
  // DAY 41: Integrating Langfuse with LangChain
  // ============================================================
  41: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the script and confirm three traces appear in your Langfuse dashboard.",
      hint: "Make sure flush() is called at the end.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Change the system prompt so the assistant speaks like a Minecraft villager. Run it and check the trace shows the new prompt.",
      hint: "Edit the system message in ChatPromptTemplate.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change one of the questions to be about Aarav's favorite cricket shot. Confirm the trace updates.",
      hint: "Edit the questions list. Run the script and check the dashboard.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Add a fourth question about Spider-Man and run the script. Confirm four traces appear.",
      hint: "Append a Spider-Man question to the questions list.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Compare token usage between tencent/hy3:free and google/gemma-2-9b-it:free for the same three questions. Which uses fewer tokens?",
      hint: "Run the script twice with different model= values and read the token counts in Langfuse.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add metadata to each trace (for example {'topic': 'cricket'}) and filter by topic in the dashboard.",
      hint: "Pass metadata={'topic': 'cricket'} when creating the trace or via the callback handler.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a script that runs the same prompt 5 times and prints the average token count across all runs.",
      hint: "Use a for loop. Sum the token counts and divide by 5 at the end.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a name to each trace based on the question being asked (for example 'cricket-q1', 'spiderman-q2'). Confirm they appear with these names in the dashboard.",
      hint: "Generate the name from the question text. Truncate long questions to keep names readable.",
    },
  ],

  // ============================================================
  // DAY 42: Project 3 - AI Assistant with Tools
  // ============================================================
  42: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the assistant and ask three questions: one about weather, one about math, one about time. Confirm all three traces appear in Langfuse.",
      hint: "Use verbose=True to see tool calls in the terminal.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a fourth tool to server.py: get_spiderman_villain() that returns a random Spider-Man villain name. Restart and ask about villains.",
      hint: "Use the @mcp.tool() decorator and random.choice on a list of villains.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Ask the assistant a follow-up question that depends on the previous answer. Confirm memory is working.",
      hint: "Ask 'What is the weather in Delhi?' then 'And in Mumbai?'. The LLM should understand 'And' refers to weather.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Modify the system prompt so the assistant always answers like a cricket commentator. Test with a weather question.",
      hint: "Edit the system message in ChatPromptTemplate.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Change the model to google/gemma-2-9b-it:free and compare the quality of answers and tool calls.",
      hint: "Run the same three questions with each model and read the Langfuse traces.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a get_minecraft_recipe tool to server.py. Restart and ask the assistant for a crafting recipe.",
      hint: "Use the @mcp.tool() decorator and return a string with the recipe.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a 'help' command that lists all available tools the assistant can use. Test it.",
      hint: "On 'help', call list_tools on the MCP client and print each tool name and description.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add error handling so the assistant does not crash if a tool returns an error. Print a friendly message instead.",
      hint: "Wrap the agent call in try/except. On except, print 'Sorry, I could not handle that.' and continue.",
    },
  ],

  // ============================================================
  // DAY 43: LLM Model Comparison
  // ============================================================
  43: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the script and record which model is fastest and which produces the best answer (in your opinion).",
      hint: "Use the comparison table at the end of the output.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add mistralai/mistral-7b-instruct:free as a fourth model. Rerun and compare its latency and answer quality.",
      hint: "Add the model name to the models list.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change the prompt to ask a Minecraft question, like 'In one short sentence, what does a creeper do in Minecraft?'",
      hint: "Edit the PROMPT constant.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Change the prompt to ask a cricket question, like 'In one short sentence, explain what a yorker is in cricket.' Rerun and compare.",
      hint: "Edit the PROMPT constant.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Modify the script to also count words in each answer and add a 'Words' column to the comparison table. Which model is most concise?",
      hint: "Use len(answer.split()) to count words.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a 'Quality (1-5)' column to the table. Manually rate each answer and record your scores.",
      hint: "After each model answers, prompt yourself for a score and store it in the results list.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Run the comparison 3 times with the same prompt and check if results are consistent. Write a short paragraph about what you observed.",
      hint: "Wrap the comparison in a for loop with range(3). Note that latency can vary between runs.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Build a function that picks the best model based on a scoring rule you invent (for example 0.5 * speed_score + 0.5 * quality_score).",
      hint: "Define a scoring function. Loop over results, compute each score, and return the model with the highest.",
    },
  ],

  // ============================================================
  // DAY 44: AI System Design (Simple Level)
  // ============================================================
  44: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Draw the full-stack architecture diagram on paper from memory. Label every box and every arrow.",
      hint: "Browser, Next.js, LangChain, OpenRouter, MCP Server, Tools, Langfuse (dotted).",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "In one sentence each, describe what each of the 6 components does.",
      hint: "Use the table in the lesson as a reference.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "List the 6 components in the order a request flows through them, from browser to LLM and back.",
      hint: "Start with Browser, end with Browser (the response comes back the same way).",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Explain why the line to Langfuse is dotted (asynchronous) and why this matters for speed.",
      hint: "Async logging does not block the user's response.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a 'Database' box to the diagram. Explain in 2 sentences where it fits and why.",
      hint: "The database sits next to Next.js to store user accounts and chat history.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Walk through what happens when a user clicks Send in the browser. List 5 steps in order.",
      hint: "Browser sends request -> Next.js receives -> LangChain builds prompt -> OpenRouter calls LLM -> response flows back.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Suppose the OpenRouter API goes down for 5 minutes. Walk through which components fail and which still work. Write a short paragraph.",
      hint: "Browser still works, Next.js still works, MCP still works, but no LLM answers.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Design (on paper) an AI app for Aarav that recommends cricket drills based on his skill level. Label every component and what data flows between them.",
      hint: "Browser -> Next.js -> LangChain -> OpenRouter. MCP server exposes get_drills(skill_level). Langfuse logs traces.",
    },
  ],

  // ============================================================
  // DAY 45: Project 4 - Final Capstone (Part 1)
  // ============================================================
  45: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run test_mcp.py and confirm all four tools work. Run the assistant and ask at least three questions, including one follow-up.",
      hint: "Ask 'What is the weather in Delhi?' then 'What about Mumbai?' to test memory.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a fifth fun fact to the facts list in mcp_server.py. Restart the assistant and call get_fun_fact until your new fact appears.",
      hint: "Add a string to the facts list inside get_fun_fact.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Change the system prompt so the assistant always ends its answer with a friendly question like 'What else can I help with?'",
      hint: "Edit the system message in ChatPromptTemplate.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Add a new tool get_cricket_score(team) that returns a fake live score for an IPL team. Test it through the assistant.",
      hint: "Use a dictionary mapping team names to fake scores.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a get_minecraft_tip tool to mcp_server.py. Restart the assistant and ask for a building tip.",
      hint: "Use the @mcp.tool() decorator and return a string tip.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Run the assistant and ask 5 questions in a row. Confirm all 5 traces appear in Langfuse with the correct tool calls.",
      hint: "Check the Langfuse dashboard after each run.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Build a test script that calls each tool 5 times and prints the results in a table. Confirm all tools work reliably.",
      hint: "Use a for loop. Call each tool inside the loop and print the result with formatting.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a 'history' command to the assistant that prints the last 5 user messages without calling the LLM.",
      hint: "Access the chat history from memory. Slice the last 5 user messages and print them.",
    },
  ],

  // ============================================================
  // DAY 46: Project 4 - Final Capstone (Part 2)
  // ============================================================
  46: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Run the improved assistant and test all four menu options. Confirm each works and creates a Langfuse trace.",
      hint: "Try 2 (weather), 3 (calculator), 1 (chat), and 4 (quit) in order.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Add a fifth menu option: 5. Get a fun fact. Wire it to the get_fun_fact tool.",
      hint: "Add an elif choice == '5' branch that asks for a fun fact.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Add a 'help' menu option (option 6) that lists all available menu options. Test it.",
      hint: "Add elif choice == 'help' or '6' that prints the menu.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Test the error handling by temporarily breaking your OpenRouter API key (change one character). Confirm the app shows 'Sorry, something went wrong' instead of crashing.",
      hint: "Edit the api_key value, run, observe the error, then fix it back.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Add a 'clear memory' menu option (7) that resets chat_history to an empty list. Test that follow-up questions no longer remember previous context.",
      hint: "Add elif choice == '7' that sets chat_history = [].",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a 'show memory' menu option (8) that prints how many messages are currently in chat_history.",
      hint: "Add elif choice == '8' that prints len(chat_history).",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Add retry logic: if the LLM call fails, retry up to 2 times before showing the error message.",
      hint: "Use a for loop with range(3). Try the call. On success, break. On failure, retry. After all retries fail, show the error.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Add a 'save chat' menu option (9) that writes the conversation to a JSON file called saved_chat.json.",
      hint: "import json. On 'save chat', use json.dump(chat_history, open('saved_chat.json', 'w'), indent=2).",
    },
  ],

  // ============================================================
  // DAY 47: Mock Interview Preparation
  // ============================================================
  47: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Pick 3 questions from the big Q&A table. Cover the answers and try to recite them out loud.",
      hint: "Practice with a parent or sibling asking the questions.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Time yourself explaining your final project. Aim for under 2 minutes.",
      hint: "Use a phone timer. Speak at a normal pace, not too fast.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Write down 5 Python keywords (for example def, if, while, return, import) and say what each one does in one sentence.",
      hint: "Re-read Day 1 to 15 if you get stuck.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Write your own 3-sentence answer to 'Explain your final project' without looking at the model answer.",
      hint: "Mention LangChain, MCP, Langfuse, and the four tools.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Explain the line-by-line code snippet out loud to a parent or friend. Time yourself: aim for under 2 minutes.",
      hint: "Focus on what each line does and why.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Write a 5-sentence answer to 'What is MCP and why is it useful?'",
      hint: "Mention the USB analogy, the client-server model, and tools vs resources.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Practice 5 viva questions with a parent. Note which ones you struggled with and re-read those lessons.",
      hint: "Use the viva questions from the lesson. Ask your parent to grade your answers from 1 to 5.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Write a 100-word pitch for your capstone project that you could give in a real interview. Mention the problem it solves and the tech you used.",
      hint: "Open with the problem, explain the solution, list the tech (LangChain, MCP, Langfuse), end with what you learned.",
    },
  ],

  // ============================================================
  // DAY 48: Final Assessment and Course Completion
  // ============================================================
  48: [
    {
      id: 10,
      difficulty: "easy",
      description:
        "Add the get_random_joke tool to mcp_server.py and a new menu option to assistant.py. Test it end to end.",
      hint: "Use the code snippets from the lesson. Run test_mcp.py first to confirm the tool works.",
    },
    {
      id: 11,
      difficulty: "easy",
      description:
        "Run test_mcp.py to confirm all 5 tools work (the original 4 plus the new joke tool).",
      hint: "Each tool should return a value without errors.",
    },
    {
      id: 12,
      difficulty: "easy",
      description:
        "Generate the course completion certificate on the Progress page. Save it or print it.",
      hint: "Open the Progress page and click the certificate button.",
    },
    {
      id: 13,
      difficulty: "medium",
      description:
        "Write one sentence in your own words for each of 5 theory checklist topics. Re-read any day where you get stuck.",
      hint: "Use the checklist table from the lesson. Mark off each topic as you write.",
    },
    {
      id: 14,
      difficulty: "medium",
      description:
        "Practice the 7 viva questions out loud with a parent or friend. Time yourself: aim for under 2 minutes per answer.",
      hint: "Focus on the Day 44 architecture diagram and the Day 46 error handling.",
    },
    {
      id: 15,
      difficulty: "medium",
      description:
        "Add a new MCP tool of your choice (for example get_random_quote or get_minecraft_tip). Test it through the assistant.",
      hint: "Use the @mcp.tool() decorator. Add a menu option to call it.",
    },
    {
      id: 16,
      difficulty: "hard",
      description:
        "Write a 200-word reflection on what you learned in this 48-day course and what you want to build next.",
      hint: "Mention Python, AI, MCP, LangChain, Langfuse, and your capstone project.",
    },
    {
      id: 17,
      difficulty: "hard",
      description:
        "Document your capstone project in a short README file. Include what it does, how to run it, and a list of tools it exposes.",
      hint: "Use markdown headings. Add a section for setup, a section for tools, and a section for credits.",
    },
  ],
};
