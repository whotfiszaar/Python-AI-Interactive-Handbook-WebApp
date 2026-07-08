import type { Day } from "@/types";

export const days1to15: Day[] = [
  // ============================================================
  // DAY 1
  // ============================================================
  {
    dayNumber: 1,
    title: "What is Python? Your First Program",
    phase: "python",
    objectives: [
      "Understand what Python is and why it is popular",
      "Install Jupyter Notebook Desktop on your computer",
      "Write and run your first Python program",
      "Learn how Python runs your code line by line"
    ],
    content: [
      {
        type: "paragraph",
        text: "Welcome to Day 1, Aarav! Today you start your journey as a Python programmer. Python is a programming language, which means it is a way to give instructions to a computer so the computer can do useful things for you. By the end of today you will have written your very first program, the classic greeting line, customized with your name."
      },
      { type: "heading", level: 2, text: "What is Python?" },
      {
        type: "paragraph",
        text: "Python is a high-level programming language created by Guido van Rossum and released in 1991. It is famous for being easy to read because its code looks a lot like plain English. Big companies like Google, Netflix, NASA, and Instagram use Python every day. Game engines, robots, self-driving cars, and even the recommendation systems on YouTube all rely on Python under the hood."
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Easy to read: code looks like English sentences",
          "Beginner friendly: forgiving syntax with fewer symbols than other languages",
          "Huge community: millions of free libraries you can reuse",
          "Used everywhere: web, games, data science, artificial intelligence, robots"
        ]
      },
      { type: "heading", level: 2, text: "Installing Jupyter Notebook Desktop" },
      {
        type: "paragraph",
        text: "Jupyter Notebook is a special editor that lets you write Python in small blocks called cells. You can run one cell at a time and instantly see the result, which makes it perfect for learning. The easiest way to install it is through the Anaconda Distribution, which bundles Python and Jupyter together."
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Go to anaconda.com/download in your web browser",
          "Download the installer for your operating system (Windows, Mac, or Linux)",
          "Run the installer and follow the on-screen instructions, clicking Next through the wizard",
          "Open the Anaconda Navigator app from your start menu or applications folder",
          "Click the Launch button under Jupyter Notebook",
          "A browser tab will open showing your Jupyter workspace",
          "Click New, then Python 3 (ipykernel) to create your first notebook"
        ]
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why Jupyter instead of a plain text editor?",
        text: "Jupyter shows output right under each cell, so Aarav gets instant feedback. This short feedback loop is what makes learning stick. If he gets an error, he sees it immediately and can fix one cell at a time instead of rerunning a whole program."
      },
      { type: "heading", level: 2, text: "Your First Program" },
      {
        type: "paragraph",
        text: "It is a tradition in programming that your first program in any new language prints a greeting. In Python you use the print() function to display text on the screen. The text you want to print goes inside quotation marks inside the parentheses."
      },
      {
        type: "code",
        language: "python",
        code: 'print("Hello, Aarav!")',
        caption: "Your very first Python program"
      },
      {
        type: "paragraph",
        text: "When you run this cell, Jupyter will display Hello, Aarav! right below the cell. Notice the quotation marks. They tell Python that the words inside are text, not code. Without quotes, Python would try to look up something called Hello and get confused."
      },
      {
        type: "code",
        language: "python",
        code: 'print("Hello, Aarav!")\nprint("Welcome to Python.")\nprint("Today is Day 1 of my coding journey.")',
        caption: "Running multiple print statements in a row"
      },
      {
        type: "table",
        headers: ["Part", "What it means", "Example"],
        rows: [
          ["print", "a built-in function that displays output", "print"],
          ["( )", "parentheses that hold what you want to print", "(\"Hello\")"],
          ["\" \"", "quotation marks that mark text (a string)", "\"Aarav\""],
          ["Hello, Aarav!", "the actual text being printed", "Hello, Aarav!"]
        ]
      },
      { type: "heading", level: 2, text: "How Python Runs Your Code" },
      {
        type: "paragraph",
        text: "Python reads your code from top to bottom, one line at a time. The first line runs completely, then the second, then the third. This is called sequential execution. If you swap two lines, the order of the output also swaps."
      },
      {
        type: "code",
        language: "python",
        code: 'print("Step 1: I wake up")\nprint("Step 2: I brush my teeth")\nprint("Step 3: I eat breakfast")\nprint("Step 4: I code in Python")'
      },
      { type: "heading", level: 2, text: "Comments: Notes for Yourself" },
      {
        type: "paragraph",
        text: "Sometimes you want to leave a note in your code that Python should ignore. You do this with a hash symbol (#). Anything after # on that line is a comment and is skipped when the program runs."
      },
      {
        type: "code",
        language: "python",
        code: '# This is a comment. Python ignores it.\nprint("Aarav is learning Python.")  # Comments can also go after code\n# print("This line will NOT run because it is commented out")'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Common beginner mistake",
        text: "Forgetting the quotation marks or the parentheses. Writing print Hello, Aarav without quotes and parentheses gives a SyntaxError. Python needs print(\"Hello, Aarav!\") exactly, with quotes inside parentheses."
      },
      {
        type: "callout",
        variant: "tip",
        title: "Save your work",
        text: "Press Ctrl + S (or Cmd + S on Mac) to save your notebook. Jupyter also auto-saves every couple of minutes. Name your notebook day1_aarav so you can find it again tomorrow."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Print your own full name on the screen using the print() function.",
        hint: "Use quotes around your name, like print(\"Aarav Singh\")."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Print three lines about your favorite things: your favorite sport, your favorite game, and your favorite food.",
        hint: "Use three separate print() statements, one on each line."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Write a program that prints a short story about Aarav meeting Spider-Man. Use at least four print statements.",
        hint: "Each print() statement is one sentence of the story."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Add comments above each print statement in your story explaining what the next line does. Then comment out the last line and run the program to confirm it does not print.",
        hint: "Use # to write comments and to comment out a line."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the print() function do in Python?",
        options: [
          "It sends a document to a physical printer",
          "It displays text or values on the screen",
          "It saves a file to your computer",
          "It deletes a line of code"
        ],
        correct: 1,
        explanation: "In Python, print() displays output on the screen so the user can see it."
      },
      {
        id: 2,
        type: "true-false",
        question: "Python was created by Guido van Rossum and released in 1991.",
        correctBool: true,
        explanation: "Guido van Rossum released the first version of Python in 1991."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To leave a note in your code that Python ignores, you start the line with the ____ symbol.",
        answer: "#",
        explanation: "The hash symbol (#) begins a comment, which Python skips when running the program."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'print("Hello, Aarav!")\nprint("Welcome to Python.")',
        answer: "Hello, Aarav!\nWelcome to Python.",
        explanation: "Each print() statement outputs its text on a new line, in the order they appear."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why is Jupyter Notebook a good tool for a beginner learning Python?",
        options: [
          "It hides all errors so you never see them",
          "It only works for advanced programmers",
          "It runs cells one at a time and shows output instantly",
          "It removes the need to learn syntax"
        ],
        correct: 2,
        explanation: "Jupyter runs each cell separately and shows the result right below it, giving instant feedback for learners."
      }
    ],
    teacherNotes:
      "Start today by showing Aarav what Python looks like before installing anything, so he sees the goal first. Walk through the Anaconda install together, because that step often trips beginners up on Windows with PATH issues. After install, have him type print(\"Hello, Aarav!\") himself instead of copy-pasting. The muscle memory matters. If he gets a SyntaxError, celebrate it as the first real programmer moment and walk through reading the error message together. Emphasize that quotation marks must match (both double or both single). End the session by saving the notebook with a clear name so he can find it tomorrow.",
    explainToFriend:
      "Python is a language that lets you talk to a computer. The print() function is how you tell the computer to show words on the screen. You put your message in quotes inside parentheses, like print(\"Hi\").",
    realWorldExamples: [
      "Netflix uses Python to recommend shows you might like",
      "NASA uses Python to process images from space telescopes",
      "Instagram uses Python to run large parts of its website"
    ],
    thingsToGoogle: [
      "Guido van Rossum Python history",
      "Anaconda Distribution download",
      "Jupyter Notebook beginner tutorial",
      "Python print function documentation"
    ],
    setupInstructions:
      "Install Anaconda from anaconda.com/download. Open Anaconda Navigator and launch Jupyter Notebook. Create a new Python 3 notebook and rename it day1_aarav.",
    expectedOutput:
      "After running the first cell, you should see Hello, Aarav! printed directly below the cell.",
    debugging: [
      "SyntaxError: check that every opening parenthesis has a closing one",
      "NameError: you probably forgot the quotation marks around the text",
      "If nothing happens when you run a cell, make sure you pressed Shift + Enter, not just Enter"
    ]
  },

  // ============================================================
  // DAY 2
  // ============================================================
  {
    dayNumber: 2,
    title: "Variables and Data Types",
    phase: "python",
    objectives: [
      "Create variables to store information",
      "Identify the four basic data types: string, integer, float, boolean",
      "Use the type() function to check a value's type",
      "Understand naming rules for variables"
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday you printed text on the screen. Today you learn how to store information so you can reuse it later. A variable is like a labeled box in the computer's memory. You put a value inside the box and give the box a name, then later you can ask for the value by using the name."
      },
      { type: "heading", level: 2, text: "Creating Variables" },
      {
        type: "paragraph",
        text: "To create a variable, you write the name, an equals sign, and the value. The equals sign in Python means assign, not is-equal-to. Read it as: take the value on the right and store it under the name on the left."
      },
      {
        type: "code",
        language: "python",
        code: 'name = "Aarav"\nage = 13\nheight = 5.4\nlikes_cricket = True\n\nprint(name)\nprint(age)\nprint(height)\nprint(likes_cricket)',
        caption: "Storing four different pieces of information about Aarav"
      },
      { type: "heading", level: 2, text: "The Four Basic Data Types" },
      {
        type: "paragraph",
        text: "Every value in Python has a type. The type tells Python what kind of data it is and what you can do with it. The four most common types you will meet this week are string, integer, float, and boolean."
      },
      {
        type: "table",
        headers: ["Type", "Keyword", "What it stores", "Example"],
        rows: [
          ["String", "str", "text (words, sentences)", "name = \"Aarav\""],
          ["Integer", "int", "whole numbers", "age = 13"],
          ["Float", "float", "numbers with decimals", "height = 5.4"],
          ["Boolean", "bool", "True or False", "likes_cricket = True"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        title: "Strings can use single or double quotes",
        text: "Both 'Aarav' and \"Aarav\" are valid strings. Pick one style and stick with it. Most Python programmers prefer double quotes."
      },
      { type: "heading", level: 2, text: "Checking Types with type()" },
      {
        type: "paragraph",
        text: "If you are ever unsure what type a value is, use the type() function. It tells you exactly what kind of data Python thinks it is dealing with."
      },
      {
        type: "code",
        language: "python",
        code: 'name = "Aarav"\nage = 13\nheight = 5.4\nlikes_cricket = True\n\nprint(type(name))\nprint(type(age))\nprint(type(height))\nprint(type(likes_cricket))'
      },
      {
        type: "paragraph",
        text: "When you run that code, Python prints <class 'str'>, <class 'int'>, <class 'float'>, and <class 'bool'>. The word class here is just Python's way of saying type. You will learn more about classes much later in the course."
      },
      { type: "heading", level: 2, text: "Using Variables Together" },
      {
        type: "paragraph",
        text: "Once you have variables, you can use them like the values they hold. You can print them, do math with them, and even combine them. Here is a friendly way to combine text and variables using a comma inside print()."
      },
      {
        type: "code",
        language: "python",
        code: 'name = "Aarav"\nage = 13\nfavorite_car = "Lamborghini"\n\nprint("My name is", name)\nprint("I am", age, "years old")\nprint("My dream car is a", favorite_car)'
      },
      { type: "heading", level: 2, text: "Variable Naming Rules" },
      {
        type: "list",
        ordered: false,
        items: [
          "Names can contain letters, numbers, and underscores",
          "Names cannot start with a number (1name is invalid, name1 is fine)",
          "Names cannot contain spaces (use underscores: favorite_car)",
          "Names are case sensitive: Age and age are different variables",
          "Use clear names: total_score is much better than ts"
        ]
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Do not use Python keywords as variable names",
        text: "Words like print, type, int, str, for, and if already mean something to Python. If you write print = 5, then you have broken the print() function for the rest of your program and will get very confusing errors."
      },
      {
        type: "code",
        language: "python",
        code: '# Good variable names\nplayer_name = "Virat Kohli"\nruns_scored = 82\nstrike_rate = 145.6\nis_out = False\n\nprint(player_name, "scored", runs_scored, "runs")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "The box analogy",
        text: "Tell Aarav to picture each variable as a labeled lunch box. The name on the outside is the variable name. The food inside is the value. You can swap the food anytime by reassigning, and you can look inside anytime by using the name."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Create variables for Aarav's name, age, favorite sport, and favorite color. Print each one.",
        hint: "Use different data types: str for name, int for age."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Create a variable for the top speed of a Bugatti (261 mph) and print its type using type().",
        hint: "Use a float or int and then print(type(variable_name))."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Create three variables for three cricket players' scores. Print them in one line using commas inside print().",
        hint: "print(player1, score1, player2, score2, ...) combines multiple values with spaces."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Reassign a variable. Start with city = \"Delhi\", print it, then change it to city = \"Mumbai\" and print it again. Notice how the value updates.",
        hint: "Just write city = \"Mumbai\" again on a new line. The old value is replaced."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the data type of the value 13 in Python?",
        options: ["str", "int", "float", "bool"],
        correct: 1,
        explanation: "13 is a whole number, so its type is int (short for integer)."
      },
      {
        id: 2,
        type: "true-false",
        question: "True and False are boolean values in Python.",
        correctBool: true,
        explanation: "Booleans (bool) can only be True or False, with a capital first letter in Python."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To find out what type a value is, you use the ____() function.",
        answer: "type",
        explanation: "type() returns the type (or class) of any value you give it."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'x = 5.5\nprint(type(x))',
        answer: "<class 'float'>",
        explanation: "5.5 has a decimal point, so it is a float. type() returns <class 'float'>."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which of these is NOT a valid variable name in Python?",
        options: ["player_name", "score2", "2nd_place", "isReady"],
        correct: 2,
        explanation: "Variable names cannot start with a number, so 2nd_place is invalid."
      }
    ],
    teacherNotes:
      "The biggest idea today is that variables are labeled boxes for values. Have Aarav physically write variable assignments on paper before typing them, so he sees name equals value in his own handwriting. Watch out for the case-sensitivity trap: he will likely write Age and age interchangeably at first and get a NameError. Show him how to read a NameError (it literally tells you the missing name). Also show that reassigning a variable replaces the old value, which surprises some students who expect the old value to be remembered.",
    explainToFriend:
      "A variable is a labeled box that holds a value. You make one by writing name = value, like age = 13. Python has four main types: strings for text, ints for whole numbers, floats for decimals, and bools for True/False.",
    realWorldExamples: [
      "A cricket scoreboard stores each player's runs in a variable",
      "A phone's battery percentage is a variable that updates over time",
      "A video game stores your character's health and score in variables"
    ],
    thingsToGoogle: [
      "Python variable naming conventions PEP 8",
      "Python data types cheat sheet",
      "Python type() function examples"
    ],
    expectedOutput:
      "Running the first code block prints Aarav, 13, 5.4, and True on separate lines.",
    debugging: [
      "NameError: you misspelled a variable name or forgot the quotes around text",
      "SyntaxError: cannot assign to literal: you tried to start a variable name with a number",
      "TypeError: you tried to mix incompatible types, like adding text and a number"
    ]
  },

  // ============================================================
  // DAY 3
  // ============================================================
  {
    dayNumber: 3,
    title: "Input and Output with f-strings",
    phase: "python",
    objectives: [
      "Use input() to get information from the user",
      "Format output with f-strings",
      "Convert string input into numbers with int() and float()",
      "Build a small program that asks and answers"
    ],
    content: [
      {
        type: "paragraph",
        text: "So far your programs have only talked to the user, never listened. Today Aarav will learn how to ask the user a question, store the answer in a variable, and respond using a powerful formatting tool called an f-string. By the end of today he will build a tiny program that asks about your favorite car and prints a sentence about it."
      },
      { type: "heading", level: 2, text: "The input() Function" },
      {
        type: "paragraph",
        text: "The input() function pauses the program and waits for the user to type something. Whatever the user types (until they press Enter) is returned as a string. You usually store that result in a variable so you can use it later."
      },
      {
        type: "code",
        language: "python",
        code: 'name = input("What is your name? ")\nprint("Hello,", name)'
      },
      {
        type: "paragraph",
        text: "When you run this in Jupyter, a small input box appears under the cell. Type your name and press Enter. The program continues and greets you by the name you typed. The text inside the input() parentheses is the prompt that the user sees."
      },
      {
        type: "callout",
        variant: "tip",
        title: "Always include a helpful prompt",
        text: "If you write input() with no text inside, the program just stops with no message and the user has no idea what to type. Always tell the user what you are asking for."
      },
      { type: "heading", level: 2, text: "Input Always Returns a String" },
      {
        type: "paragraph",
        text: "This is a critical rule: even if the user types a number, input() gives it back as a string. The value \"13\" and the value 13 look the same on screen but are different types in Python. To do math with input, you must convert it first."
      },
      {
        type: "code",
        language: "python",
        code: 'age_text = input("How old are you? ")\nprint(type(age_text))\n\nage_number = int(age_text)\nprint(type(age_number))\nprint("Next year you will be", age_number + 1)'
      },
      {
        type: "table",
        headers: ["Function", "What it converts to", "Example"],
        rows: [
          ["int()", "an integer (whole number)", "int(\"13\") becomes 13"],
          ["float()", "a float (decimal number)", "float(\"5.4\") becomes 5.4"],
          ["str()", "a string (text)", "str(13) becomes \"13\""]
        ]
      },
      { type: "heading", level: 2, text: "f-strings: Fancy Formatting" },
      {
        type: "paragraph",
        text: "An f-string (short for formatted string) lets you drop variables directly into a sentence. To make one, put the letter f before the opening quote, and put variables inside curly braces {}. Python replaces each {variable} with its value when the program runs."
      },
      {
        type: "code",
        language: "python",
        code: 'name = "Aarav"\nage = 13\nfavorite_car = "Lamborghini"\n\nmessage = f"My name is {name}, I am {age} years old, and I love the {favorite_car}."\nprint(message)'
      },
      {
        type: "paragraph",
        text: "Without f-strings you would have to write print(\"My name is\", name, \", I am\", age, ...) which is messy and full of commas. f-strings make code look clean and the sentence reads naturally."
      },
      { type: "heading", level: 2, text: "Putting It Together: Favorite Car Program" },
      {
        type: "code",
        language: "python",
        code: 'favorite_car = input("What is your favorite car? ")\ntop_speed = int(input("What is its top speed in mph? "))\n\nprint(f"Wow, the {favorite_car} can reach {top_speed} mph!")\nprint(f"That is {top_speed * 1.6:.1f} km/h, which is super fast.")\nprint(f"In a 10 mile race at top speed, it would take {10 / top_speed:.2f} hours.")'
      },
      {
        type: "paragraph",
        text: "Notice the :.1f and :.2f inside the curly braces. These are format specifiers. They tell Python to round the number to a fixed number of decimal places, 1 decimal for km/h and 2 decimals for the time."
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Forgetting to convert input",
        text: "If you forget int() or float() and try to do math on the raw input, you get a TypeError. For example int(input(\"...\")) is needed before adding or multiplying."
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why f-strings are worth teaching early",
        text: "Without f-strings, beginners stitch sentences with plus signs, get spaces wrong, and fight with type errors when they try string + number. f-strings handle types automatically and make output readable. Aarav will reach for them constantly from now on."
      },
      {
        type: "code",
        language: "python",
        code: '# Mini program: superhero greeting\nhero = input("Who is your favorite superhero? ")\npower = input("What is their superpower? ")\nprint(f"{hero} uses {power} to save the day!")'
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Ask the user for their name and favorite color, then print a sentence using an f-string.",
        hint: "Use two input() calls and combine them in one f-string sentence."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Ask the user for their age and convert it to an integer. Print how old they will be in 5 years using an f-string.",
        hint: "Use int(input(\"...\")) to get a number you can do math with."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Ask for a cricket player's name and how many runs they scored. Print: \"Virat scored 82 runs at an average of 82.0 per over in a 1 over spell.\" using an f-string.",
        hint: "Divide the runs by the number of overs to get the average."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Ask the user for the price of a phone and the discount percentage. Print the final price after discount, rounded to 2 decimal places, using an f-string with :.2f.",
        hint: "Final price is price - (price * discount / 100)."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What type of value does input() always return?",
        options: ["int", "float", "str", "bool"],
        correct: 2,
        explanation: "Even if the user types a number, input() returns it as a string. You must convert it with int() or float() to do math."
      },
      {
        id: 2,
        type: "true-false",
        question: "An f-string must start with the letter f before the opening quote.",
        correctBool: true,
        explanation: "The f tells Python to treat {variables} inside the string as placeholders to fill in."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To convert the string \"5\" into the integer 5, you use the ____() function.",
        answer: "int",
        explanation: "int(\"5\") converts the string to an integer so you can do math with it."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print when the user types Aarav?",
        code: 'name = input("Name? ")\nprint(f"Hi {name}!")',
        answer: "Hi Aarav!",
        explanation: "input() returns \"Aarav\", and the f-string inserts it in place of {name}."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does :.2f do inside an f-string curly brace?",
        options: [
          "It prints the number twice",
          "It rounds the number to 2 decimal places",
          "It converts the number to a float",
          "It multiplies the number by 2"
        ],
        correct: 1,
        explanation: ":.2f is a format specifier that rounds the number to exactly 2 decimal places."
      }
    ],
    teacherNotes:
      "The single biggest trap today is forgetting that input() returns a string. Make Aarav write a program that tries age + 1 without int() first, see the TypeError, then fix it. The pain of the error teaches the rule better than any explanation. For f-strings, emphasize the letter f in front and the curly braces around the variable. If he forgets the f, the {name} prints literally as the text {name}, which is a great teachable moment.",
    explainToFriend:
      "input() asks the user a question and saves their answer as text. If you need to do math with the answer, convert it with int() or float(). f-strings let you drop variables into sentences easily: f\"Hi {name}!\".",
    realWorldExamples: [
      "Login screens use input() to ask for username and password",
      "Food delivery apps ask for your address with input()",
      "Calculator apps take numbers from the user and compute results"
    ],
    thingsToGoogle: [
      "Python input() function",
      "Python f-string format specifiers",
      "Python int float str conversion"
    ],
    expectedOutput:
      "The favorite car program asks two questions, then prints three lines describing the car's speed in mph and km/h.",
    debugging: [
      "TypeError: cannot concatenate: you are mixing strings and numbers, use an f-string or convert",
      "ValueError: invalid literal for int(): the user typed text where a number was expected",
      "If the f-string prints {name} literally, you forgot the f before the quote"
    ]
  },

  // ============================================================
  // DAY 4
  // ============================================================
  {
    dayNumber: 4,
    title: "Operators: Arithmetic, Comparison, Logical",
    phase: "python",
    objectives: [
      "Use arithmetic operators to do math in Python",
      "Use comparison operators to compare values",
      "Use logical operators (and, or, not) to combine conditions",
      "Understand operator precedence with parentheses"
    ],
    content: [
      {
        type: "paragraph",
        text: "Today Aarav learns how to make Python compute things. Operators are special symbols that do operations on values. There are three families you will use constantly: arithmetic operators for math, comparison operators for testing, and logical operators for combining True/False results."
      },
      { type: "heading", level: 2, text: "Arithmetic Operators" },
      {
        type: "paragraph",
        text: "Python can do all the math you learned in school, plus a few extra tricks. Here is the full set of basic arithmetic operators."
      },
      {
        type: "table",
        headers: ["Operator", "Name", "Example", "Result"],
        rows: [
          ["+", "addition", "7 + 3", "10"],
          ["-", "subtraction", "7 - 3", "4"],
          ["*", "multiplication", "7 * 3", "21"],
          ["/", "division", "7 / 2", "3.5"],
          ["//", "floor division", "7 // 2", "3"],
          ["%", "modulo (remainder)", "7 % 2", "1"],
          ["**", "exponent (power)", "2 ** 3", "8"]
        ]
      },
      {
        type: "code",
        language: "python",
        code: '# Cricket score math: Aarav scored runs in two matches\nmatch1_runs = 45\nmatch2_runs = 62\ntotal_runs = match1_runs + match2_runs\nprint("Total runs:", total_runs)\nprint("Average per match:", total_runs / 2)\nprint("Strike rate if 60 balls faced:", (total_runs / 60) * 100)'
      },
      {
        type: "callout",
        variant: "tip",
        title: "The difference between / and //",
        text: "Regular division / always returns a float, even when the answer is a whole number (8 / 4 gives 2.0). Floor division // chops off the decimal part and returns an integer (7 // 2 gives 3). Use // when you want whole results only."
      },
      { type: "heading", level: 2, text: "The Modulo Operator %" },
      {
        type: "paragraph",
        text: "The modulo operator gives you the remainder after division. It is incredibly useful for checking if a number is even or odd, or for things like figuring out which day of the week a certain number of days falls on."
      },
      {
        type: "code",
        language: "python",
        code: 'runs = 87\nballs = 60\nprint("Runs per over:", runs // 6)  # how many full overs\nprint("Balls left over:", runs % 6)  # remainder balls\n\nnumber = 14\nprint("Is 14 even?", number % 2 == 0)'
      },
      { type: "heading", level: 2, text: "Comparison Operators" },
      {
        type: "paragraph",
        text: "Comparison operators compare two values and always return a boolean, either True or False. You will use these constantly inside if statements, which you learn tomorrow."
      },
      {
        type: "table",
        headers: ["Operator", "Meaning", "Example", "Result"],
        rows: [
          ["==", "equal to", "5 == 5", "True"],
          ["!=", "not equal to", "5 != 3", "True"],
          [">", "greater than", "7 > 3", "True"],
          ["<", "less than", "7 < 3", "False"],
          [">=", "greater than or equal", "5 >= 5", "True"],
          ["<=", "less than or equal", "4 <= 5", "True"]
        ]
      },
      {
        type: "code",
        language: "python",
        code: '# Comparing top speeds of cars\nbugatti_speed = 261\nlamborghini_speed = 217\n\nprint("Bugatti faster than Lamborghini?", bugatti_speed > lamborghini_speed)\nprint("Same top speed?", bugatti_speed == lamborghini_speed)\nprint("Lamborghini slower?", lamborghini_speed < bugatti_speed)'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "== vs =",
        text: "A single = assigns a value (age = 13). A double == compares two values (age == 13). Mixing these up is the most common beginner mistake. = stores, == asks."
      },
      { type: "heading", level: 2, text: "Logical Operators" },
      {
        type: "paragraph",
        text: "Logical operators combine multiple True/False values into one. There are three: and (both must be True), or (at least one must be True), and not (flips True to False and vice versa)."
      },
      {
        type: "table",
        headers: ["Operator", "Meaning", "True when..."],
        rows: [
          ["and", "both must be true", "both sides are True"],
          ["or", "either can be true", "at least one side is True"],
          ["not", "opposite", "the value is False"]
        ]
      },
      {
        type: "code",
        language: "python",
        code: '# Did Aarav pass the test? Needs marks above 40 AND attendance above 75%\nmarks = 78\nattendance = 88\n\npassed = marks >= 40 and attendance >= 75\nprint("Did Aarav pass?", passed)\n\n# Will Aarav go out to play? Either homework done OR it is the weekend\nhomework_done = False\nis_weekend = True\n\ncan_play = homework_done or is_weekend\nprint("Can Aarav play?", can_play)\n\n# not flips the value\nprint("Is it NOT the weekend?", not is_weekend)'
      },
      { type: "heading", level: 2, text: "Combining Operators with Parentheses" },
      {
        type: "paragraph",
        text: "When a line has many operators, Python follows the same order of operations you learned in math: parentheses first, then powers, then multiplication and division, then addition and subtraction. When in doubt, use parentheses to make your meaning clear."
      },
      {
        type: "code",
        language: "python",
        code: '# Total cost of 3 cars with different prices\ncar1 = 50000\ncar2 = 35000\ncar3 = 45000\n\n# Without parentheses, confusing:\nprint("Sum plus tax (no parens):", car1 + car2 + car3 * 1.1)\n\n# With parentheses, clear: tax applies to the whole total\nprint("Sum plus tax (with parens):", (car1 + car2 + car3) * 1.1)'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Use parentheses even when not strictly needed",
        text: "Python has rules for the order of operations, but humans forget them. Adding parentheses for clarity costs nothing and prevents subtle bugs. Tell Aarav: if you have to think about the order, just use parentheses."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Calculate and print the total of two cricket scores: 87 and 95. Also print their average.",
        hint: "Use + to add and / 2 to find the average."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Check whether 17 is even or odd using the modulo operator. Print the result.",
        hint: "Use 17 % 2 == 0, which will be False for odd numbers."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Aarav scored 82 in Math, 76 in Science, and 91 in English. Print his total marks and his percentage out of 300.",
        hint: "Percentage = (total / 300) * 100."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "A Bugatti goes 261 mph and a Lamborghini goes 217 mph. Use comparison and logical operators to print True if the Bugatti is faster AND the Lamborghini is slower than 250 mph.",
        hint: "Use bugatti > lamborghini and lamborghini < 250."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does 7 % 3 evaluate to in Python?",
        options: ["2", "1", "2.33", "3"],
        correct: 1,
        explanation: "% gives the remainder after division. 7 divided by 3 is 2 with remainder 1, so 7 % 3 is 1."
      },
      {
        id: 2,
        type: "true-false",
        question: "The expression 8 / 4 returns the integer 2 in Python.",
        correctBool: false,
        explanation: "Regular division / always returns a float, so 8 / 4 returns 2.0, not 2. Use // for integer results."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To check if two values are equal, you use the ____ operator (two equals signs).",
        answer: "==",
        explanation: "== compares two values. A single = assigns a value to a variable."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'print(2 ** 3)\nprint(17 % 5)\nprint(10 // 3)',
        answer: "8\n2\n3",
        explanation: "2**3 is 8, 17%5 is 2 (remainder), 10//3 is 3 (floor division)."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does True and False evaluate to?",
        options: ["True", "False", "None", "Error"],
        correct: 1,
        explanation: "The and operator needs both sides to be True. Since one is False, the result is False."
      }
    ],
    teacherNotes:
      "Aarav has likely seen + - * / in math class, so spend less time on those and more on //, %, and **. The modulo operator is unfamiliar and is worth several examples. For comparison, drill the difference between = (assign) and == (compare) with a quick typo exercise where he intentionally writes if age = 13 to see the SyntaxError. For logical operators, use real Aarav scenarios: can I play cricket? (homework done AND weather sunny). The and/or truth tables will click faster with personal examples.",
    explainToFriend:
      "Operators are math and comparison symbols. The usual + - * / work like in math. Two new ones: // gives whole-number division, % gives the remainder. Comparison operators like == and > return True or False. Logical operators and, or, not combine True/False values.",
    realWorldExamples: [
      "A cricket app calculates batting average using division",
      "A game checks if (health > 0) and (timer > 0) to know if you are still playing",
      "A phone brightness slider uses modulo to wrap brightness back to 0 after reaching 100"
    ],
    thingsToGoogle: [
      "Python arithmetic operators",
      "Python modulo operator uses",
      "Python operator precedence table",
      "Python and or not truth tables"
    ],
    expectedOutput:
      "The cricket score code prints Total runs: 107, Average per match: 53.5, and Strike rate if 60 balls faced: 178.33...",
    debugging: [
      "TypeError on +: you tried to add a string and a number, convert one with int() or str()",
      "SyntaxError on =: you used = inside a comparison, you meant ==",
      "Wrong answer with mixed operators: add parentheses to force the order you want"
    ]
  },

  // ============================================================
  // DAY 5
  // ============================================================
  {
    dayNumber: 5,
    title: "Making Decisions: if, elif, else",
    phase: "python",
    objectives: [
      "Use if statements to run code only when a condition is True",
      "Use elif to check additional conditions",
      "Use else as a fallback when no condition matches",
      "Understand indentation as Python's block marker"
    ],
    content: [
      {
        type: "paragraph",
        text: "Until now, every line of your programs ran every time. Real programs need to make decisions: if the user is old enough, show the movie; otherwise, block them. Today Aarav learns if, elif, and else, the three keywords that let Python choose what to do based on conditions."
      },
      { type: "heading", level: 2, text: "The if Statement" },
      {
        type: "paragraph",
        text: "An if statement checks a condition. If the condition is True, the indented code below it runs. If the condition is False, Python skips that block. The colon at the end of the if line is required."
      },
      {
        type: "code",
        language: "python",
        code: 'marks = 78\n\nif marks >= 40:\n    print("Congratulations, you passed!")\n    print("Your marks were", marks)\n\nprint("End of program")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Indentation is the law in Python",
        text: "In most languages you use { } to mark code blocks. In Python you use indentation, usually 4 spaces. Every line indented under an if statement belongs to that if. Jupyter auto-indents for you after a colon, but Aarav should still understand why."
      },
      { type: "heading", level: 2, text: "Adding else: The Fallback" },
      {
        type: "paragraph",
        text: "An else block runs when the if condition is False. It is the otherwise branch. You can think of it as: if this happens, do X, otherwise do Y."
      },
      {
        type: "code",
        language: "python",
        code: 'marks = 35\n\nif marks >= 40:\n    print("You passed!")\nelse:\n    print("You did not pass. Keep practicing!")\n    print("You needed", 40 - marks, "more marks to pass.")'
      },
      { type: "heading", level: 2, text: "Adding elif: Multiple Choices" },
      {
        type: "paragraph",
        text: "When you have more than two possible outcomes, use elif (short for else if). Python checks each condition from top to bottom and runs the FIRST one that is True. Once a match is found, the rest are skipped."
      },
      {
        type: "code",
        language: "python",
        code: 'marks = 78\n\nif marks >= 90:\n    grade = "A"\nelif marks >= 80:\n    grade = "B"\nelif marks >= 70:\n    grade = "C"\nelif marks >= 60:\n    grade = "D"\nelif marks >= 40:\n    grade = "E"\nelse:\n    grade = "F"\n\nprint(f"Aarav scored {marks} marks, grade: {grade}")'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Order matters in elif chains",
        text: "If you check marks >= 40 first, then a student with 95 marks will hit the first True branch and never reach the A grade check. Always order conditions from most specific (highest) to most general (lowest), or use ranges like 70 <= marks < 80."
      },
      { type: "heading", level: 2, text: "Example: Traffic Signal Simulator" },
      {
        type: "code",
        language: "python",
        code: 'signal = input("What color is the traffic signal? (red/yellow/green) ")\n\nif signal == "red":\n    print("STOP! Wait for the signal to change.")\nelif signal == "yellow":\n    print("SLOW DOWN. The signal is about to change.")\nelif signal == "green":\n    print("GO! Drive safely.")\nelse:\n    print("I do not recognize that color. Please enter red, yellow, or green.")'
      },
      { type: "heading", level: 2, text: "Nested if Statements" },
      {
        type: "paragraph",
        text: "You can put an if statement inside another if statement. This is called nesting. Use it when a decision depends on a previous decision. Be careful: too many nested levels make code hard to read."
      },
      {
        type: "code",
        language: "python",
        code: 'age = 13\nhas_id = True\n\nif age >= 13:\n    if has_id:\n        print("Welcome! You can watch this PG movie.")\n    else:\n        print("You are old enough, but please bring an ID.")\nelse:\n    print("Sorry, you must be at least 13 years old.")'
      },
      {
        type: "callout",
        variant: "tip",
        title: "Combine conditions instead of nesting when possible",
        text: "Instead of nesting two ifs, you can often use and: if age >= 13 and has_id:. This is shorter and easier to read. Nest only when the actions differ for each branch."
      },
      {
        type: "table",
        headers: ["Keyword", "When it runs", "How many times it can appear"],
        rows: [
          ["if", "when its condition is True", "once per chain"],
          ["elif", "when previous conditions are False and its own is True", "as many as needed"],
          ["else", "when no condition above was True", "once, at the end"]
        ]
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Ask the user for a number. Print \"Even\" if the number is even, \"Odd\" otherwise.",
        hint: "Use number % 2 == 0 to check for even."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Ask the user for the temperature. If it is above 35, print \"Hot day\". Otherwise print \"Not too hot\".",
        hint: "Use if temperature > 35 with an else branch."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Build the grade calculator from the lesson. Ask the user for their marks and print their grade A through F.",
        hint: "Use elif for each grade boundary, ordered from highest to lowest."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Ask Aarav for his favorite cricket team. If he types \"India\", print a special message. If he types \"Australia\" or \"England\", print a different message. Otherwise, print a default message.",
        hint: "Use if, elif with or, and else."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which symbol marks the end of an if statement line in Python?",
        options: ["semicolon ;", "colon :", "comma ,", "period ."],
        correct: 1,
        explanation: "Every if, elif, and else line must end with a colon before the indented block begins."
      },
      {
        id: 2,
        type: "true-false",
        question: "In Python, code blocks inside an if statement are marked with curly braces { }.",
        correctBool: false,
        explanation: "Python uses indentation (usually 4 spaces) to mark blocks, not curly braces."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The keyword ____ is short for \"else if\" and checks another condition if the previous one was False.",
        answer: "elif",
        explanation: "elif chains multiple conditions together so Python can pick the first matching one."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'x = 10\nif x > 5:\n    print("big")\nelif x > 3:\n    print("medium")\nelse:\n    print("small")',
        answer: "big",
        explanation: "x is 10, the first condition x > 5 is True, so it prints big and skips the rest."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What happens if none of the if or elif conditions are True and there is no else?",
        options: [
          "Python throws an error",
          "Python runs the first if again",
          "Nothing in that if chain runs",
          "Python runs all the elif blocks"
        ],
        correct: 2,
        explanation: "If no condition matches and there is no else, Python simply skips the whole chain and continues after it."
      }
    ],
    teacherNotes:
      "The colon and indentation are the two trickiest parts for beginners. Aarav will forget the colon constantly, and Jupyter will complain with a SyntaxError. Show him that the error message literally points to the missing colon. For indentation, show what happens with mismatched indentation (an IndentationError). Walk through the elif ordering carefully using the grade example. Demonstrate why checking marks >= 40 first breaks everything by tracing the program with marks = 95. The traffic signal example is a great place to let him extend with more colors or sounds.",
    explainToFriend:
      "if runs code only when a condition is True. elif checks another condition if the first was False. else runs as a fallback. Python uses indentation (spaces) instead of braces to mark what belongs inside each block.",
    realWorldExamples: [
      "A vending machine uses if/else to check if you inserted enough money",
      "A fitness app uses if statements to decide if you hit your step goal",
      "A car's traction control uses if/else to decide when to apply brakes"
    ],
    thingsToGoogle: [
      "Python if elif else syntax",
      "Python indentation rules",
      "Python nested if statements best practices"
    ],
    expectedOutput:
      "The grade calculator with marks = 78 prints: Aarav scored 78 marks, grade: C",
    debugging: [
      "SyntaxError: expected ':' : you forgot the colon at the end of the if line",
      "IndentationError: your spaces are inconsistent, use exactly 4 spaces per level",
      "Wrong grade printed: your elif conditions are in the wrong order, reorder from highest to lowest"
    ]
  },

  // ============================================================
  // DAY 6
  // ============================================================
  {
    dayNumber: 6,
    title: "If/Else Practice: Real-Life Decisions",
    phase: "python",
    objectives: [
      "Practice if/elif/else with realistic scenarios",
      "Combine multiple conditions using and, or",
      "Use nested if statements for layered decisions",
      "Build small decision-based programs"
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday Aarav learned how if/elif/else works. Today is pure practice with real-life examples: movie ticket categories, clothing choices based on weather, and checking pass/fail in multiple subjects. The goal is to make the syntax second nature before moving to loops."
      },
      { type: "heading", level: 2, text: "Example 1: Movie Ticket Categories" },
      {
        type: "paragraph",
        text: "In India, movies are rated U (Universal, all ages), PG (Parental Guidance, suggested 13+ with adult), and A (Adult, 18+ only). Let us write a program that asks Aarav's age and tells him which categories he can watch."
      },
      {
        type: "code",
        language: "python",
        code: 'age = int(input("How old are you? "))\n\nif age >= 18:\n    print("You can watch U, PG, and A rated movies.")\nelif age >= 13:\n    print("You can watch U and PG rated movies (PG with an adult is best).")\nelse:\n    print("You can watch only U rated movies.")'
      },
      { type: "heading", level: 2, text: "Example 2: Weather Clothing Recommender" },
      {
        type: "paragraph",
        text: "Let us build a program that suggests what Aarav should wear based on the temperature. We will use multiple conditions and the and operator to handle ranges."
      },
      {
        type: "code",
        language: "python",
        code: 'temp = int(input("What is the temperature outside in Celsius? "))\n\nif temp >= 35:\n    print("Very hot! Wear a t-shirt and shorts. Drink lots of water.")\nelif temp >= 25 and temp < 35:\n    print("Warm day. A light t-shirt is perfect.")\nelif temp >= 15 and temp < 25:\n    print("Pleasant weather. Wear a shirt and jeans.")\nelif temp >= 5 and temp < 15:\n    print("Cool day. Wear a jacket or sweater.")\nelse:\n    print("Very cold! Wear a thick coat, scarf, and cap.")'
      },
      {
        type: "callout",
        variant: "tip",
        title: "You can chain comparisons",
        text: "Instead of temp >= 15 and temp < 25, Python lets you write 15 <= temp < 25. This is shorter and reads like math. Both ways work, pick the one that feels clearer to you."
      },
      { type: "heading", level: 2, text: "Example 3: Pass/Fail in Multiple Subjects" },
      {
        type: "paragraph",
        text: "Aarav takes three subjects: Math, Science, and English. To pass the year, he needs at least 40 in every subject. Let us write a program that checks all three and gives a detailed report."
      },
      {
        type: "code",
        language: "python",
        code: 'math = int(input("Math marks? "))\nscience = int(input("Science marks? "))\nenglish = int(input("English marks? "))\n\nif math >= 40 and science >= 40 and english >= 40:\n    average = (math + science + english) / 3\n    print(f"Aarav passed all subjects with an average of {average:.1f}!")\nelse:\n    print("Aarav did not pass all subjects.")\n    if math < 40:\n        print(f"  Math: FAILED ({math}/100)\")\n    if science < 40:\n        print(f"  Science: FAILED ({science}/100)\")\n    if english < 40:\n        print(f"  English: FAILED ({english}/100)\")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Notice the difference between if and elif here",
        text: "In the failure report, we used three separate if statements, not elif. Why? Because we want to print every subject that failed, not just the first one. elif stops after the first match. Use if when you want to check each thing independently."
      },
      { type: "heading", level: 2, text: "Example 4: Cricket Selection" },
      {
        type: "code",
        language: "python",
        code: 'age = int(input("Player age? "))\nruns = int(input("Runs scored in last match? "))\n\nif age < 14 and runs >= 50:\n    print("Selected for the Under-14 team!")\nelif age >= 14 and runs >= 50:\n    print("Selected for the senior team!")\nelif runs >= 30:\n    print("Come to the practice session for selection.")\nelse:\n    print("Needs more practice. Try again next match.")'
      },
      {
        type: "table",
        headers: ["Scenario", "Best structure to use"],
        rows: [
          ["Two opposite outcomes", "if / else"],
          ["Several ranges (grades, ages)", "if / elif / elif / else"],
          ["Check multiple independent things", "multiple if statements"],
          ["Decision inside a decision", "nested if"]
        ]
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Using = instead of == inside if",
        text: "Writing if age = 13 gives a SyntaxError because = assigns. Always use == to compare. Many beginners stare at this error for ages before noticing the missing equals sign."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Ask the user for a number. Print \"Positive\" if it is greater than 0, \"Negative\" if less than 0, and \"Zero\" if it is exactly 0.",
        hint: "Use if n > 0, elif n < 0, else for zero."
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Ask Aarav which game he wants to play: Minecraft or Roblox. If he picks Minecraft, ask if he prefers Creative or Survival mode and print a message. If Roblox, print a Roblox message. Otherwise print \"Unknown game\".",
        hint: "Use nested if statements inside the game choice."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Build a phone brand recommender. Ask the user for their budget (in rupees). Under 10000 suggest Samsung, 10000 to 50000 suggest iPhone SE, above 50000 suggest iPhone 15 Pro.",
        hint: "Use elif with and to handle the middle range."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Ask for the scores of three cricket players and print which player scored the highest. Use only if/elif/else (no lists or max function yet).",
        hint: "Compare p1 with p2 and p3, then p2 with p3, then else for p3."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does this code print when age is 13?  if age >= 18: print(\"A\")  elif age >= 13: print(\"B\")  else: print(\"C\")",
        options: ["A", "B", "C", "Nothing"],
        correct: 1,
        explanation: "age is 13. The first condition (>= 18) is False, the second (>= 13) is True, so it prints B."
      },
      {
        id: 2,
        type: "true-false",
        question: "You should use elif when you want to check every condition independently, even after one matches.",
        correctBool: false,
        explanation: "elif stops after the first True match. Use separate if statements when you want to check each condition independently."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To check if a number is between 10 and 20 (inclusive), you can write 10 ____ number ____ 20 using chained comparison.",
        answer: "<=",
        explanation: "10 <= number <= 20 is a chained comparison. The same symbol goes in both gaps."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print when math=50, science=35, english=80?",
        code: 'math = 50\nscience = 35\nenglish = 80\nif math >= 40 and science >= 40 and english >= 40:\n    print("All passed")\nelse:\n    print("Someone failed")',
        answer: "Someone failed",
        explanation: "science is 35, which is below 40, so the and condition is False and the else branch runs."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why does the failure report use three separate if statements instead of elif?",
        options: [
          "Because elif is slower",
          "Because we want to report every failed subject, not just the first",
          "Because elif cannot check numbers",
          "Because the code would crash with elif"
        ],
        correct: 1,
        explanation: "elif stops at the first match. To report all failed subjects, we need separate if statements that each run independently."
      }
    ],
    teacherNotes:
      "Today is about volume of practice. The four examples progress from a simple age check to a more complex multi-condition report. Walk through the failure report carefully because it shows the subtle difference between if and elif. A common student question is: why not always use elif? Answer: elif is for mutually exclusive choices; multiple ifs are for independent checks. The cricket selection example introduces layered decisions (age and runs together). Encourage Aarav to change the input values and predict the output before running, which builds the mental model of branching.",
    explainToFriend:
      "Today we practiced if/elif/else with real examples like movie ratings and weather clothing. The big idea is that elif is for choosing one option out of many, while multiple if statements let you check several things at once.",
    realWorldExamples: [
      "ATM machines use if/else to check your PIN and balance",
      "Streaming apps use if/else to check your age before showing content",
      "Smart thermostats use if/else to decide when to turn on the heater"
    ],
    thingsToGoogle: [
      "Python chained comparisons",
      "Python nested if best practices",
      "Python if elif else real examples"
    ],
    expectedOutput:
      "The pass/fail program with scores 50, 35, 80 prints: Aarav did not pass all subjects, then Science: FAILED (35/100).",
    debugging: [
      "Wrong branch runs: check your condition signs (>= vs >)",
      "Only one failure printed: you used elif instead of multiple if statements",
      "SyntaxError: you used = instead of == in a condition"
    ]
  },

  // ============================================================
  // DAY 7
  // ============================================================
  {
    dayNumber: 7,
    title: "While Loops: Repeating with Conditions",
    phase: "python",
    objectives: [
      "Use a while loop to repeat code while a condition is True",
      "Avoid infinite loops by updating the loop variable",
      "Use break to exit a loop early",
      "Build a number guessing game"
    ],
    content: [
      {
        type: "paragraph",
        text: "So far every line in your programs has run at most once. Today Aarav learns how to make Python repeat code automatically using a while loop. A while loop keeps running a block of code as long as a condition stays True. This is the key to writing programs that can do something many times without you typing it many times."
      },
      { type: "heading", level: 2, text: "The while Loop Syntax" },
      {
        type: "paragraph",
        text: "A while loop looks a lot like an if statement. You write the word while, a condition, and a colon. The indented block below runs over and over as long as the condition is True. Each run through the block is called an iteration."
      },
      {
        type: "code",
        language: "python",
        code: 'count = 1\nwhile count <= 5:\n    print("Iteration number", count)\n    count = count + 1\nprint("Loop finished!")'
      },
      {
        type: "paragraph",
        text: "Trace this carefully. Start: count is 1. The condition 1 <= 5 is True, so Python prints and then adds 1, making count = 2. The condition 2 <= 5 is still True, so it runs again. This continues until count becomes 6. Then 6 <= 5 is False, and the loop stops. The final print runs once after the loop."
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Beware the infinite loop",
        text: "If you forget to update count inside the loop, the condition stays True forever and Python keeps printing until you force it to stop. Always make sure something inside the loop changes the condition to False eventually."
      },
      { type: "heading", level: 2, text: "Counting Down from 10" },
      {
        type: "code",
        language: "python",
        code: 'countdown = 10\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nprint("Blast off!")'
      },
      {
        type: "paragraph",
        text: "This time we subtract 1 each iteration. The condition checks countdown > 0, so when countdown reaches 0, the loop stops and Blast off! prints once."
      },
      { type: "heading", level: 2, text: "The += and -= Shorthand" },
      {
        type: "paragraph",
        text: "Writing count = count + 1 is common but verbose. Python has a shorter way: count += 1. This means add 1 to count and store it back. There is also -= for subtraction, *= for multiplication, and /= for division."
      },
      {
        type: "code",
        language: "python",
        code: 'score = 0\nprint("Starting score:", score)\nscore += 6  # score becomes 6\nprint("After a six:", score)\nscore += 4  # score becomes 10\nprint("After a four:", score)\nscore -= 1  # score becomes 9 (lost a run somehow)\nprint("After losing a run:", score)'
      },
      { type: "heading", level: 2, text: "Building a Number Guessing Game" },
      {
        type: "paragraph",
        text: "Now let us build something fun. The computer picks a secret number, and the user keeps guessing until they get it right. We need a while loop that runs as long as the guess is wrong, and we use the break keyword to exit the loop early."
      },
      {
        type: "code",
        language: "python",
        code: 'secret = 7\nprint("I am thinking of a number between 1 and 10.")\n\nwhile True:\n    guess = int(input("Your guess: "))\n    if guess == secret:\n        print("Correct! You win!")\n        break\n    elif guess < secret:\n        print("Too low, try again.")\n    else:\n        print("Too high, try again.")\n\nprint("Game over.")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "while True with break",
        text: "while True creates a loop that would run forever, but break exits it. This is a common pattern when you do not know in advance how many times to repeat. The break is usually inside an if statement that checks the exit condition."
      },
      { type: "heading", level: 2, text: "Repeating a Menu Until Quit" },
      {
        type: "paragraph",
        text: "Another common pattern is a menu that keeps asking the user what they want to do until they choose to quit. Let us build a tiny cricket scoreboard menu."
      },
      {
        type: "code",
        language: "python",
        code: 'runs = 0\n\nwhile True:\n    print("\\n--- Cricket Scoreboard ---")\n    print("1. Score a six")\n    print("2. Score a four")\n    print("3. Show total runs")\n    print("4. Quit")\n    choice = input("Choose an option: ")\n    \n    if choice == "1":\n        runs += 6\n        print("SIX! Total runs:", runs)\n    elif choice == "2":\n        runs += 4\n        print("FOUR! Total runs:", runs)\n    elif choice == "3":\n        print("Current total runs:", runs)\n    elif choice == "4":\n        print("Final score:", runs, "runs. Goodbye!")\n        break\n    else:\n        print("Invalid option, try again.")'
      },
      {
        type: "table",
        headers: ["Concept", "What it means", "Example"],
        rows: [
          ["iteration", "one run through the loop body", "each pass of a while loop"],
          ["condition", "the True/False check before each iteration", "count <= 5"],
          ["break", "exits the loop immediately", "break inside an if"],
          ["infinite loop", "a loop whose condition never becomes False", "while True with no break"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        title: "How to stop an infinite loop in Jupyter",
        text: "If your program runs forever, click the Stop button (square icon) in the Jupyter toolbar, or press the interrupt kernel option. Then add a break or fix your loop condition before running again."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Use a while loop to print the numbers from 1 to 10, each on its own line.",
        hint: "Start count = 1, loop while count <= 10, print count, then count += 1."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Use a while loop to count down from 5 to 1, then print \"Go!\".",
        hint: "Start at 5, subtract 1 each time, loop while count >= 1."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Improve the number guessing game to count how many guesses the user took. Print the count at the end.",
        hint: "Add a guesses = 0 variable before the loop and increment it inside the loop with guesses += 1."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Build a simple calculator menu with options: add, subtract, multiply, divide. The user picks two numbers and an operation, the program prints the result, then loops back to the menu. Quit when the user picks option 5.",
        hint: "Use while True with a break on the quit option. Convert inputs with float()."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does a while loop do?",
        options: [
          "Runs a block of code exactly once",
          "Runs a block of code while a condition is True",
          "Runs a block of code a fixed number of times",
          "Skips a block of code if a condition is True"
        ],
        correct: 1,
        explanation: "A while loop repeats its block as long as the condition stays True. When the condition becomes False, the loop stops."
      },
      {
        id: 2,
        type: "true-false",
        question: "If you forget to update the loop variable inside a while loop, the loop may run forever.",
        correctBool: true,
        explanation: "Without an update, the condition never changes, so it stays True and the loop never ends (an infinite loop)."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The keyword ____ exits a loop immediately, even if the condition is still True.",
        answer: "break",
        explanation: "break is used to leave a loop early, often inside an if statement that checks for an exit condition."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\nprint("done")',
        answer: "3\n2\n1\ndone",
        explanation: "The loop prints 3, 2, 1 (subtracting 1 each time), then exits when n reaches 0, and prints done once."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does count += 5 do?",
        options: [
          "Sets count to 5",
          "Adds 5 to count and stores the result back in count",
          "Multiplies count by 5",
          "Compares count to 5"
        ],
        correct: 1,
        explanation: "+= is shorthand for add and assign. count += 5 is the same as count = count + 5."
      }
    ],
    teacherNotes:
      "The infinite loop is the biggest fear of beginners. Run one intentionally on purpose so Aarav sees it happen and learns how to use the Stop button. Then show how adding count += 1 fixes it. Trace the countdown example line by line on paper, writing the value of count at each step, because students often struggle to picture the loop's progress. The guessing game is the first program that feels like a real game, so let him play it a few times and add features (limit guesses, give hints). The menu loop is the foundation of every interactive program he will build later.",
    explainToFriend:
      "A while loop repeats a block of code as long as a condition is True. You must update something inside the loop so the condition eventually becomes False. The break keyword exits a loop early, which is useful when you do not know in advance how many times to repeat.",
    realWorldExamples: [
      "A washing machine runs a spin cycle while the timer is above zero",
      "A video game runs the main loop while the player is still alive",
      "A checkout counter keeps serving customers while the queue is not empty"
    ],
    thingsToGoogle: [
      "Python while loop tutorial",
      "Python infinite loop how to stop",
      "Python break and continue",
      "Python += operator"
    ],
    expectedOutput:
      "The countdown program prints 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, then Blast off!",
    debugging: [
      "Infinite loop: you forgot to update the loop variable, add count += 1 inside the loop",
      "Loop never runs: your starting condition is already False, check the initial value",
      "Loop runs one extra time: use < instead of <= or vice versa to fix the boundary"
    ]
  },

  // ============================================================
  // DAY 8
  // ============================================================
  {
    dayNumber: 8,
    title: "For Loops and the range() Function",
    phase: "python",
    objectives: [
      "Use a for loop to repeat code a known number of times",
      "Use the range() function to generate sequences of numbers",
      "Iterate over a list of items",
      "Choose between while and for loops"
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday Aarav learned while loops, which repeat while a condition is True. Today he learns for loops, which repeat a known number of times or once for each item in a collection. For loops are usually cleaner than while loops when you know how many times you want to repeat."
      },
      { type: "heading", level: 2, text: "The for Loop Syntax" },
      {
        type: "paragraph",
        text: "A for loop iterates over a sequence. The basic pattern is: for variable in sequence: followed by an indented block. Each time through the loop, the variable takes the next value from the sequence."
      },
      {
        type: "code",
        language: "python",
        code: 'for number in [1, 2, 3, 4, 5]:\n    print("Number:", number)\n\nprint("Done!")'
      },
      {
        type: "paragraph",
        text: "Here [1, 2, 3, 4, 5] is a list (you learn lists properly on Day 12). The loop runs five times. The first time, number is 1. The second time, number is 2. And so on. After the last item, the loop ends."
      },
      { type: "heading", level: 2, text: "The range() Function" },
      {
        type: "paragraph",
        text: "Typing out [1, 2, 3, 4, 5] is annoying for long lists. The range() function generates numbers automatically. range(5) gives you 0, 1, 2, 3, 4 (five numbers, starting from 0). Notice it stops BEFORE the number you give it."
      },
      {
        type: "table",
        headers: ["range() call", "Numbers generated", "Count"],
        rows: [
          ["range(5)", "0, 1, 2, 3, 4", "5 numbers"],
          ["range(1, 6)", "1, 2, 3, 4, 5", "5 numbers, starts at 1"],
          ["range(0, 10, 2)", "0, 2, 4, 6, 8", "even numbers, step 2"],
          ["range(10, 0, -1)", "10, 9, 8, 7, 6, 5, 4, 3, 2, 1", "counting down"]
        ]
      },
      {
        type: "code",
        language: "python",
        code: '# Print numbers 1 to 5\nfor n in range(1, 6):\n    print(n)\n\nprint("---")\n\n# Print even numbers from 0 to 10\nfor n in range(0, 11, 2):\n    print(n)'
      },
      {
        type: "callout",
        variant: "tip",
        title: "range() stops BEFORE the end number",
        text: "range(1, 6) gives 1 through 5, NOT 1 through 6. This confuses every beginner at least once. If you want 1 to N, use range(1, N + 1)."
      },
      { type: "heading", level: 2, text: "Sum of the First 10 Numbers" },
      {
        type: "paragraph",
        text: "A classic example: add up all the numbers from 1 to 10. The trick is to use a variable that starts at 0 and grows as the loop runs."
      },
      {
        type: "code",
        language: "python",
        code: 'total = 0\nfor number in range(1, 11):\n    total += number\n    print(f"After adding {number}, total is {total}")\n\nprint("Final sum of 1 to 10 is", total)'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "The accumulator pattern",
        text: "This is called the accumulator pattern. You start with an empty bucket (total = 0), then in each loop iteration you add something to the bucket. By the end, the bucket holds the answer. Aarav will use this pattern hundreds of times."
      },
      { type: "heading", level: 2, text: "Iterating Over a List of Items" },
      {
        type: "paragraph",
        text: "for loops shine when you have a list of items and want to do something with each one. Let us print the names of five superhero movies."
      },
      {
        type: "code",
        language: "python",
        code: 'superhero_movies = [\n    "Spider-Man: No Way Home",\n    "Iron Man",\n    "The Avengers",\n    "Black Panther",\n    "Thor: Ragnarok"\n]\n\nfor movie in superhero_movies:\n    print(f"Aarav wants to watch: {movie}")\n\nprint("Total movies in the list:", len(superhero_movies))'
      },
      {
        type: "paragraph",
        text: "Notice we used len() to count how many items are in the list. The loop variable movie takes each title in turn, and we never had to use numbers or indices. Python handled the iteration for us."
      },
      { type: "heading", level: 2, text: "Iterating Over Aarav's Favorite Foods" },
      {
        type: "code",
        language: "python",
        code: 'favorite_foods = ["pizza", "biryani", "burger", "pasta", "pani puri"]\n\nprint("Aarav\'s favorite foods:")\nfor food in favorite_foods:\n    print(f"  - {food}")\n\nprint(f"He has {len(favorite_foods)} favorites total.")'
      },
      { type: "heading", level: 2, text: "Using the Loop Index" },
      {
        type: "paragraph",
        text: "Sometimes you want both the item and its position. Use enumerate() to get both at once. It gives you pairs of (index, item) on each iteration."
      },
      {
        type: "code",
        language: "python",
        code: 'favorite_foods = ["pizza", "biryani", "burger", "pasta", "pani puri"]\n\nfor index, food in enumerate(favorite_foods):\n    print(f"{index + 1}. {food}")'
      },
      { type: "heading", level: 2, text: "while vs for: When to Use Which" },
      {
        type: "table",
        headers: ["Use a for loop when...", "Use a while loop when..."],
        rows: [
          ["You know how many times to repeat", "You do not know in advance how many times"],
          ["You are iterating over a list or range", "You are waiting for a condition to become False"],
          ["The number of items is fixed", "You are waiting for user input or a game event"]
        ]
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Modifying the loop variable does not change the list",
        text: "Inside for movie in movies, you can reassign movie = \"new\" but it only changes the local variable, not the original list. The next iteration just overwrites movie again. To change the list, you need indices (which you will learn later)."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Use a for loop and range() to print the numbers from 1 to 10.",
        hint: "Use range(1, 11) and a print() inside the loop."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Use a for loop to print each of Aarav's favorite games: Minecraft, Roblox, Among Us, FIFA.",
        hint: "Put the games in a list and loop over it with for game in games."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Calculate and print the sum of the first 100 numbers (1 to 100) using the accumulator pattern.",
        hint: "Start total = 0, loop with range(1, 101), add each number to total."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Print a numbered list of 5 cricket players using enumerate(). Number them 1 to 5 (so add 1 to the index).",
        hint: "for index, player in enumerate(players): then print index + 1 and player."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What numbers does range(5) generate?",
        options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "5, 4, 3, 2, 1"],
        correct: 1,
        explanation: "range(5) generates 5 numbers starting from 0: 0, 1, 2, 3, 4. It stops before the number you give it."
      },
      {
        id: 2,
        type: "true-false",
        question: "A for loop can iterate directly over the items in a list.",
        correctBool: true,
        explanation: "for item in my_list is one of the cleanest features of Python. You do not need indices unless you want them."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The function ____ generates a sequence of numbers automatically, like range(1, 6).",
        answer: "range",
        explanation: "range() produces numbers in a sequence without you having to type them all out."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'total = 0\nfor n in range(1, 4):\n    total += n\nprint(total)',
        answer: "6",
        explanation: "range(1, 4) gives 1, 2, 3. total = 0 + 1 + 2 + 3 = 6."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "When should you use a for loop instead of a while loop?",
        options: [
          "When you do not know how many times to repeat",
          "When you are waiting for a user event",
          "When you know how many times to repeat or are iterating over a list",
          "When you want the loop to run forever"
        ],
        correct: 2,
        explanation: "for loops are best when the number of iterations is known or when iterating over a sequence. while loops are better when the exit condition is dynamic."
      }
    ],
    teacherNotes:
      "The biggest aha moment today is the accumulator pattern. Trace the sum example on paper, writing total = 0, then total = 1, then total = 3, then total = 6, etc. so Aarav sees the bucket filling up. The range() off-by-one trap (range(5) gives 0 to 4) is worth a few minutes. Have him experiment: what does range(0, 10, 3) give? For iterating over lists, emphasize how clean for food in foods reads compared to a while loop with an index. End with the comparison table so he starts building intuition for which loop to reach for.",
    explainToFriend:
      "A for loop repeats a block once for each item in a sequence. The range() function generates numbers for you, like range(1, 6) giving 1 to 5. For loops are best when you know how many times to repeat, while loops are best when you do not.",
    realWorldExamples: [
      "A music app uses a for loop to play each song in a playlist",
      "A shopping app uses a for loop to calculate the total of all items in a cart",
      "A school uses a for loop to print report cards for every student"
    ],
    thingsToGoogle: [
      "Python for loop tutorial",
      "Python range function examples",
      "Python enumerate function",
      "Python accumulator pattern"
    ],
    expectedOutput:
      "The sum of 1 to 10 program prints each step, ending with: Final sum of 1 to 10 is 55",
    debugging: [
      "Loop runs one fewer time than expected: range(N) gives N items starting at 0, use range(1, N+1) for 1 to N",
      "Loop variable does not change the list: that is expected, you need indices to modify a list",
      "TypeError: you tried to loop over a number instead of a sequence, wrap it in range()"
    ]
  },

  // ============================================================
  // DAY 9
  // ============================================================
  {
    dayNumber: 9,
    title: "Loop Practice: Nested Loops and Patterns",
    phase: "python",
    objectives: [
      "Write nested loops (loops inside loops)",
      "Print star patterns like right triangles",
      "Use loops to build a cricket scoreboard",
      "Understand how the inner loop relates to the outer loop"
    ],
    content: [
      {
        type: "paragraph",
        text: "Today Aarav puts loops inside loops. A nested loop is a loop inside the body of another loop. The outer loop runs, and for each of its iterations, the inner loop runs completely. This is powerful for patterns, grids, and tables. It also takes practice to wrap your head around, so we will trace carefully."
      },
      { type: "heading", level: 2, text: "How Nested Loops Work" },
      {
        type: "paragraph",
        text: "Imagine a clock. The minute hand goes around 60 times for every single hour the hour hand moves. That is a nested loop: for each hour, the minutes loop 60 times. In code, the outer loop is hours and the inner loop is minutes."
      },
      {
        type: "code",
        language: "python",
        code: 'for hour in range(1, 4):\n    print(f"Hour {hour}:")\n    for minute in range(1, 4):\n        print(f"  Minute {minute}")\n    print("---")'
      },
      {
        type: "paragraph",
        text: "Trace this: the outer loop picks hour = 1, then the inner loop fully runs (minute = 1, 2, 3), then the outer loop picks hour = 2 and the inner loop runs again from the start, and so on. Total iterations: 3 outer x 3 inner = 9 minute prints."
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Total iterations multiply",
        text: "If the outer loop runs M times and the inner loop runs N times each, the inner body runs M times N times total. This can grow fast. A loop of 100 by 100 is 10,000 iterations, which is fine, but 1000 by 1000 is a million and may be slow."
      },
      { type: "heading", level: 2, text: "Pattern 1: A Right Triangle of Stars" },
      {
        type: "paragraph",
        text: "Printing shapes with stars (or any character) is the classic nested loop exercise. The trick is: the outer loop controls the rows, and the inner loop controls how many stars go on each row."
      },
      {
        type: "code",
        language: "python",
        code: 'for row in range(1, 6):\n    for star in range(row):\n        print("*", end="")\n    print()'
      },
      {
        type: "paragraph",
        text: "Let us trace row by row. Row 1: inner loop runs range(1), so 1 time, prints one star. Row 2: range(2), so 2 stars. Row 3: 3 stars, and so on up to Row 5 with 5 stars. The end=\"\" in print tells Python not to add a newline after each star, and the empty print() at the end of each row moves to the next line."
      },
      {
        type: "code",
        language: "python",
        code: '*\n**\n***\n****\n*****',
        caption: "Output of the right triangle program (5 rows)"
      },
      {
        type: "callout",
        variant: "tip",
        title: "print() with end= controls line endings",
        text: "By default print() adds a newline at the end. Use print(\"*\", end=\"\") to print without a newline. Use print(\"*\", end=\" \") to separate items with spaces. This is essential for printing patterns."
      },
      { type: "heading", level: 2, text: "Pattern 2: A Square of Stars" },
      {
        type: "code",
        language: "python",
        code: 'size = 4\nfor row in range(size):\n    for star in range(size):\n        print("*", end=" ")\n    print()'
      },
      {
        type: "paragraph",
        text: "Here both loops use the same range(size). Each row prints size stars, and there are size rows, giving a perfect square of 4 by 4 stars."
      },
      { type: "heading", level: 2, text: "Pattern 3: Inverted Triangle" },
      {
        type: "code",
        language: "python",
        code: 'for row in range(5, 0, -1):\n    for star in range(row):\n        print("*", end="")\n    print()'
      },
      {
        type: "paragraph",
        text: "By counting the outer loop down from 5 to 1 with range(5, 0, -1), each row has one fewer star than the previous. This gives an upside-down triangle."
      },
      { type: "heading", level: 2, text: "Building a Cricket Scoreboard" },
      {
        type: "paragraph",
        text: "Now let us use nested loops to print a scoreboard for 5 players, showing the runs they scored in 3 matches each. The outer loop iterates players, the inner loop iterates their matches."
      },
      {
        type: "code",
        language: "python",
        code: 'players = ["Rohit", "Virat", "KL Rahul", "Hardik", "Surya"]\nscores = [\n    [45, 62, 38],\n    [82, 71, 95],\n    [33, 48, 60],\n    [55, 29, 41],\n    [67, 73, 50]\n]\n\nprint("Player         Match1  Match2  Match3  Total")\nprint("-" * 50)\n\nfor i in range(len(players)):\n    name = players[i]\n    player_scores = scores[i]\n    total = 0\n    print(f"{name:<14}", end="")\n    for score in player_scores:\n        print(f"{score:<8}", end="")\n        total += score\n    print(total)'
      },
      {
        type: "paragraph",
        text: "This uses a list of lists (scores), which you will learn more about later. The point is: the outer loop walks through players, and the inner loop walks through that player's match scores to print each one and add to their total. The f-string {name:<14} left-aligns the name in a 14-character field for neat columns."
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Forgetting to reset the total",
        text: "If you put total = 0 outside the outer loop, all players' scores add to the same total. The total must be reset inside the outer loop so each player gets a fresh count."
      },
      { type: "heading", level: 2, text: "Pattern 4: A Multiplication Table" },
      {
        type: "code",
        language: "python",
        code: 'for i in range(1, 6):\n    for j in range(1, 6):\n        product = i * j\n        print(f"{product:<4}", end="")\n    print()'
      },
      {
        type: "paragraph",
        text: "This is the cleanest example of nested loops: each cell of the table is the row number times the column number. The outer loop is rows, the inner loop is columns."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Use a nested loop to print a 3x3 square of # symbols.",
        hint: "Outer loop runs 3 times for rows, inner loop runs 3 times for columns, print(\"#\", end=\" \")."
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Print a right triangle of stars with 7 rows.",
        hint: "Outer loop range(1, 8), inner loop range(row), print(\"*\", end=\"\"), then print() at the end of each row."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Print a 5x5 multiplication table from 1 to 5.",
        hint: "Two nested loops with range(1, 6), print i*j with proper spacing."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Modify the cricket scoreboard to also print each player's average across the 3 matches, rounded to 1 decimal place.",
        hint: "After the inner loop, average = total / len(player_scores), then print with f\"{average:.1f}\"."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "If the outer loop runs 4 times and the inner loop runs 5 times, how many times does the inner body run in total?",
        options: ["4", "5", "9", "20"],
        correct: 3,
        explanation: "Nested loop iterations multiply: 4 outer x 5 inner = 20 total runs of the inner body."
      },
      {
        id: 2,
        type: "true-false",
        question: "The inner loop runs completely (from start to finish) for every single iteration of the outer loop.",
        correctBool: true,
        explanation: "Each time the outer loop moves to its next iteration, the inner loop restarts and runs all the way through."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To print without adding a new line, use print(\"text\", ____=\"\").",
        answer: "end",
        explanation: "The end parameter controls what print adds at the end. end=\"\" means no newline, so the next print continues on the same line."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'for i in range(2):\n    for j in range(2):\n        print(i, j)',
        answer: "0 0\n0 1\n1 0\n1 1",
        explanation: "Outer loop gives 0 then 1. For each, inner loop gives 0 then 1. So the pairs are (0,0), (0,1), (1,0), (1,1)."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why must the total variable be reset inside the outer loop in the scoreboard program?",
        options: [
          "Because Python requires it",
          "So each player starts counting from zero instead of stacking on the previous player's total",
          "Because the variable would otherwise be undefined",
          "To make the program faster"
        ],
        correct: 1,
        explanation: "If total is set outside the outer loop, it keeps growing across players. Resetting it inside the outer loop gives each player their own total."
      }
    ],
    teacherNotes:
      "Nested loops are the first concept that really stretches Aarav's brain. Trace the hour/minute example on paper, writing out the value of hour and minute at each step, until he sees the rhythm. Star patterns are the classic exercise for a reason: they make the relationship between outer and inner loops visible. Have him draw the expected output by hand before writing code, then write code to match. The cricket scoreboard is the first realistic use of nested loops with real data. If the f-string alignment syntax {name:<14} is too much, simplify to plain printing. The key idea is the structure, not the formatting.",
    explainToFriend:
      "A nested loop is a loop inside another loop. The outer loop runs once, then the inner loop runs all the way through, then the outer moves on, and so on. Total iterations multiply (M outer times N inner). Nested loops are great for grids, patterns, and tables.",
    realWorldExamples: [
      "A spreadsheet program uses nested loops to draw rows and columns",
      "A photo editor uses nested loops to process every pixel in an image",
      "A school timetable uses nested loops to assign teachers to periods"
    ],
    thingsToGoogle: [
      "Python nested loops tutorial",
      "Python star pattern programs",
      "Python print end parameter",
      "Python f-string alignment"
    ],
    expectedOutput:
      "The right triangle program prints a staircase of stars growing from 1 to 5 stars across 5 rows.",
    debugging: [
      "All stars on one line: you forgot print() at the end of each row",
      "Wrong number of stars per row: check the inner loop range, especially range(row) vs range(row + 1)",
      "Totals stack across players: move total = 0 inside the outer loop"
    ]
  },

  // ============================================================
  // DAY 10
  // ============================================================
  {
    dayNumber: 10,
    title: "Functions: Reusable Blocks of Code",
    phase: "python",
    objectives: [
      "Define a function using def",
      "Pass data into functions using parameters",
      "Return data from functions using return",
      "Call a function and use its result"
    ],
    content: [
      {
        type: "paragraph",
        text: "So far Aarav has written programs top to bottom. As programs grow, this gets messy. Functions let you name a block of code and reuse it many times. Today Aarav learns how to define functions, pass them data, and get answers back. This is one of the most important concepts in all of programming."
      },
      { type: "heading", level: 2, text: "What is a Function?" },
      {
        type: "paragraph",
        text: "A function is a named block of code that does a specific job. You write it once, then call it by name whenever you need it. You have already used functions: print(), input(), and len() are all functions built into Python. Today you learn to write your own."
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Reuse: write once, call many times",
          "Organize: break big programs into named pieces",
          "Simplify: hide complex details behind a simple name",
          "Test: check each function on its own"
        ]
      },
      { type: "heading", level: 2, text: "Defining a Function with def" },
      {
        type: "paragraph",
        text: "To create a function, use the def keyword, then the function name, parentheses, and a colon. The indented block below is the function body. The body only runs when you call the function by name later."
      },
      {
        type: "code",
        language: "python",
        code: 'def greet():\n    print("Hello, Aarav!")\n    print("Welcome to Python functions.")\n\n# Calling the function\ngreet()\ngreet()\ngreet()'
      },
      {
        type: "paragraph",
        text: "Notice we called greet() three times. The body ran three times. This is the power of functions: write once, run as many times as you want, with no copy-pasting."
      },
      { type: "heading", level: 2, text: "Parameters: Passing Data In" },
      {
        type: "paragraph",
        text: "A parameter is a variable that the function expects to receive when called. You list parameters inside the parentheses in the def line. When you call the function, you pass arguments (values) for those parameters."
      },
      {
        type: "code",
        language: "python",
        code: 'def greet(name):\n    print(f"Hello, {name}! Welcome to Python.")\n\ngreet("Aarav")\ngreet("Virat")\ngreet("Spider-Man")'
      },
      {
        type: "paragraph",
        text: "Here name is the parameter. Each time we call greet(), we pass a different value, and the function uses that value inside its body. The same code can greet anyone just by changing the argument."
      },
      { type: "heading", level: 2, text: "Multiple Parameters" },
      {
        type: "code",
        language: "python",
        code: 'def greet_person(name, age):\n    print(f"Hi {name}, you are {age} years old.")\n    if age >= 13:\n        print("You are a teenager!")\n    else:\n        print("You are still a kid.")\n\ngreet_person("Aarav", 13)\ngreet_person("Riya", 10)\ngreet_person("Tony Stark", 48)'
      },
      {
        type: "callout",
        variant: "tip",
        title: "Arguments vs parameters",
        text: "People mix these up. The parameter is the variable in the def line (name). The argument is the actual value you pass when calling (\"Aarav\"). The parameter is the slot, the argument is what fills the slot."
      },
      { type: "heading", level: 2, text: "Returning Values with return" },
      {
        type: "paragraph",
        text: "Sometimes a function should not just print, but give a value back to the caller so the caller can use it. The return keyword sends a value back. Once return runs, the function ends immediately."
      },
      {
        type: "code",
        language: "python",
        code: 'def add(a, b):\n    result = a + b\n    return result\n\n# The returned value can be stored in a variable\nsum1 = add(5, 3)\nprint("5 + 3 =", sum1)\n\n# Or used directly\nprint("10 + 20 =", add(10, 20))'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "print vs return",
        text: "print shows a value on the screen but does not give it back to the program. return gives the value back so the caller can use it. A common mistake: writing a function that prints instead of returning, then trying to use the result and getting None."
      },
      { type: "heading", level: 2, text: "Example: Total Price of 3 Cars" },
      {
        type: "code",
        language: "python",
        code: 'def total_price(car1, car2, car3):\n    total = car1 + car2 + car3\n    return total\n\nlamborghini = 200000\nferrari = 250000\nbugatti = 300000\n\nbill = total_price(lamborghini, ferrari, bugatti)\nprint(f"The total price of the three cars is ${bill:,}")\nprint(f"With 10% tax, the grand total is ${int(bill * 1.1):,}")'
      },
      { type: "heading", level: 2, text: "Example: Greet by Name and Age" },
      {
        type: "code",
        language: "python",
        code: 'def make_greeting(name, age):\n    greeting = f"Hi, my name is {name} and I am {age} years old."\n    return greeting\n\naarav_greeting = make_greeting("Aarav", 13)\nprint(aarav_greeting)\n\n# You can call the function inside a print directly\nprint(make_greeting("Peter Parker", 16))'
      },
      { type: "heading", level: 2, text: "Functions Without return" },
      {
        type: "paragraph",
        text: "Some functions do a job (like printing) and do not need to return anything. If you do not write a return statement, Python automatically returns a special value called None, which means nothing. You usually ignore it."
      },
      {
        type: "code",
        language: "python",
        code: 'def print_scoreboard(player, runs):\n    print(f"Player: {player:<12} Runs: {runs}")\n\nprint_scoreboard("Rohit", 87)\nprint_scoreboard("Virat", 95)\nprint_scoreboard("Hardik", 45)\n\nresult = print_scoreboard("KL Rahul", 60)\nprint("The function returned:", result)'
      },
      {
        type: "table",
        headers: ["Concept", "What it means", "Example"],
        rows: [
          ["def", "keyword that defines a function", "def greet():"],
          ["parameter", "variable listed in the def line", "name in def greet(name)"],
          ["argument", "value passed when calling", "\"Aarav\" in greet(\"Aarav\")"],
          ["return", "sends a value back to the caller", "return total"],
          ["None", "the value returned if no return is written", "automatic default"]
        ]
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why functions matter",
        text: "Functions are the first step toward thinking like a programmer. Instead of one long script, you build small named pieces that work together. Every real Python program is built from many functions. Encourage Aarav to name functions clearly: greet_customer, not g, and calc_total, not t."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Write a function called say_hi() that prints \"Hi there!\" Call it three times.",
        hint: "def say_hi(): then a print inside, then call say_hi() three times."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Write a function called square(n) that takes a number and returns its square (n times n). Test it with 5 and 12.",
        hint: "def square(n): return n * n"
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Write a function greet(name, age) that returns a greeting string. Call it for Aarav age 13 and print the result.",
        hint: "def greet(name, age): return f\"Hi {name}, age {age}\""
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Write a function total_price(car1, car2, car3) that returns the total of three car prices. Then write a second function that takes the total and a tax percentage, and returns the final price with tax.",
        hint: "Define two functions. Call the first, store the result, then call the second with that result and a tax like 10."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
        explanation: "The def keyword starts a function definition, followed by the function name and parentheses."
      },
      {
        id: 2,
        type: "true-false",
        question: "A function with no return statement automatically returns None.",
        correctBool: true,
        explanation: "If you do not write return, Python returns None by default. None means no value."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The keyword ____ sends a value back from a function to the caller.",
        answer: "return",
        explanation: "return exits the function and gives a value back so the caller can store or use it."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'def add(a, b):\n    return a + b\n\nresult = add(3, 4)\nprint(result)',
        answer: "7",
        explanation: "add(3, 4) returns 7, which is stored in result and then printed."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What is the difference between print and return?",
        options: [
          "They are the same thing",
          "print shows a value on screen; return gives a value back to the caller to use",
          "return shows a value on screen; print gives a value back",
          "print is faster than return"
        ],
        correct: 1,
        explanation: "print displays output for the user to see. return hands a value back to the code that called the function so it can be stored or used in further calculations."
      }
    ],
    teacherNotes:
      "The print vs return distinction is the single biggest stumbling block today. Write a function that prints its answer, then try to use the result and watch it be None. Then rewrite it to return the answer and store it. This contrast cements the difference. The car price example is great because it shows a function with multiple parameters doing something useful. Encourage Aarav to think of functions as small machines: you feed them inputs (arguments), they do work, and they give you an output (return value). The machine analogy also explains why a function with no return is like a machine that does its job but hands back nothing.",
    explainToFriend:
      "A function is a named block of code you can call by name. You pass data in through parameters, the function does its job, and it can send a value back with return. Functions let you write code once and reuse it many times.",
    realWorldExamples: [
      "A calculator app has functions for add, subtract, multiply, divide",
      "A weather app has a function that takes a city name and returns the forecast",
      "A game has a function called jump() that runs whenever the player presses the jump button"
    ],
    thingsToGoogle: [
      "Python def function tutorial",
      "Python parameters vs arguments",
      "Python return statement",
      "Python None value"
    ],
    expectedOutput:
      "The total_price program prints: The total price of the three cars is $750,000 and With 10% tax, the grand total is $825,000",
    debugging: [
      "NameError: function not defined: you called the function before the def line, define functions at the top",
      "Result is None: your function prints instead of returning, change print to return",
      "TypeError: missing required argument: you called the function with fewer arguments than parameters"
    ]
  },

  // ============================================================
  // DAY 11
  // ============================================================
  {
    dayNumber: 11,
    title: "Functions Practice: Defaults and Multiple Returns",
    phase: "python",
    objectives: [
      "Use default parameter values",
      "Return multiple values from a function",
      "Call functions from inside other functions",
      "Combine functions to build bigger programs"
    ],
    content: [
      {
        type: "paragraph",
        text: "Yesterday Aarav learned the basics of functions. Today he levels up with three powerful features: default parameters (so a parameter can be optional), multiple return values (a function can give back more than one thing), and functions that call other functions (the building block of every real program)."
      },
      { type: "heading", level: 2, text: "Default Parameter Values" },
      {
        type: "paragraph",
        text: "Sometimes a parameter usually has the same value, and you do not want to type it every time. You can give a parameter a default value in the def line. If the caller does not pass that argument, the default is used. If they do, their value overrides the default."
      },
      {
        type: "code",
        language: "python",
        code: 'def describe_pet(name, animal="dog"):\n    print(f"{name} is a {animal}.")\n\ndescribe_pet("Buddy")            # uses default animal=dog\ndescribe_pet("Mittens", "cat")   # overrides with cat\ndescribe_pet("Rio", "parrot")    # overrides with parrot'
      },
      {
        type: "callout",
        variant: "tip",
        title: "Order matters: defaults go last",
        text: "Parameters with default values must come after parameters without defaults. def f(a, b=5): is valid. def f(a=5, b): is a SyntaxError. Always put required parameters first."
      },
      { type: "heading", level: 2, text: "Example: Favorite Color with Default" },
      {
        type: "code",
        language: "python",
        code: 'def introduce(name, age, favorite_color="blue"):\n    print(f"Hi, I am {name}, {age} years old, and my favorite color is {favorite_color}.")\n\nintroduce("Aarav", 13)\nintroduce("Riya", 14, "pink")\nintroduce("Kabir", 12, "green")'
      },
      {
        type: "paragraph",
        text: "When Aarav does not specify a color, the function uses blue. When Riya and Kabir specify their own colors, those override the default. Defaults are great when most calls use the same value but you want flexibility for the exceptions."
      },
      { type: "heading", level: 2, text: "Returning Multiple Values" },
      {
        type: "paragraph",
        text: "Sometimes a function should give back more than one value. Python makes this easy: just list multiple values after return, separated by commas. The caller receives them as a tuple (you learn tuples on Day 14) and can unpack them into separate variables."
      },
      {
        type: "code",
        language: "python",
        code: 'def min_max(numbers):\n    smallest = min(numbers)\n    largest = max(numbers)\n    return smallest, largest\n\nscores = [45, 82, 67, 91, 38, 73]\nlow, high = min_max(scores)\n\nprint(f"In the scores {scores}:")\nprint(f"  Lowest score: {low}")\nprint(f"  Highest score: {high}")'
      },
      {
        type: "paragraph",
        text: "The line low, high = min_max(scores) is called unpacking. The function returns two values packed together, and Python unpacks them into the two variables on the left. The order matches: the first returned value goes to low, the second to high."
      },
      { type: "heading", level: 2, text: "Example: Speed Stats from a Car List" },
      {
        type: "code",
        language: "python",
        code: 'def speed_stats(car_speeds):\n    slowest = min(car_speeds)\n    fastest = max(car_speeds)\n    average = sum(car_speeds) / len(car_speeds)\n    return slowest, fastest, average\n\ntop_speeds = [217, 261, 211, 248, 230]\nslow, fast, avg = speed_stats(top_speeds)\n\nprint(f"Car top speeds: {top_speeds}")\nprint(f"  Slowest: {slow} mph")\nprint(f"  Fastest: {fast} mph")\nprint(f"  Average: {avg:.1f} mph")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "min, max, and sum are built-in helpers",
        text: "Python has built-in functions for common math on lists: min(list), max(list), and sum(list). You do not need to write your own loops for these. Use them freely, they are fast and clear."
      },
      { type: "heading", level: 2, text: "Functions Calling Other Functions" },
      {
        type: "paragraph",
        text: "The most powerful idea today: a function can call another function. This lets you build big programs by combining small, focused functions. Each function does one job well, and a higher-level function coordinates them."
      },
      {
        type: "code",
        language: "python",
        code: 'def calculate_discount(price, discount_percent):\n    discount_amount = price * discount_percent / 100\n    return price - discount_amount\n\ndef final_price(price, discount_percent=10, tax_percent=8):\n    discounted = calculate_discount(price, discount_percent)\n    total = discounted * (1 + tax_percent / 100)\n    return total\n\n# Buy a phone\nphone_cost = 1200\nprint(f"Phone original price: ${phone_cost}")\nprint(f"Final price (default discount and tax): ${final_price(phone_cost):.2f}")\nprint(f"Final price (20% discount, 5% tax): ${final_price(phone_cost, 20, 5):.2f}")'
      },
      {
        type: "paragraph",
        text: "See how final_price calls calculate_discount inside its body. The work is split: one function knows how to apply a discount, another knows how to combine discount and tax. Each is small and easy to understand, and together they solve a bigger problem."
      },
      { type: "heading", level: 2, text: "Example: Cricket Stats Helper" },
      {
        type: "code",
        language: "python",
        code: 'def strike_rate(runs, balls):\n    return (runs / balls) * 100\n\ndef player_report(name, runs, balls):\n    sr = strike_rate(runs, balls)\n    print(f"Player: {name}")\n    print(f"  Runs: {runs} off {balls} balls")\n    print(f"  Strike rate: {sr:.1f}")\n    if sr >= 150:\n        print("  Performance: Explosive!")\n    elif sr >= 100:\n        print("  Performance: Aggressive")\n    else:\n        print("  Performance: Steady")\n    print()\n\nplayer_report("Hardik", 45, 20)\nplayer_report("Virat", 82, 75)\nplayer_report("Rohit", 60, 90)'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Define functions before you call them",
        text: "Python reads your file top to bottom. If you call strike_rate before its def line, Python does not know it exists yet and gives a NameError. Always define helper functions first, then the functions that call them, then your main code last."
      },
      {
        type: "table",
        headers: ["Feature", "What it does", "Example"],
        rows: [
          ["default parameter", "gives a parameter an optional default value", "def f(a, b=10):"],
          ["multiple returns", "returns several values separated by commas", "return min, max"],
          ["unpacking", "assigns multiple returned values to variables", "low, high = func()"],
          ["function calling function", "one function uses another inside its body", "final_price calls calculate_discount"]
        ]
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Write a function greet(name, greeting=\"Hello\") that uses a default greeting. Call it twice: once with just a name, once with a custom greeting.",
        hint: "def greet(name, greeting=\"Hello\"): print(f\"{greeting}, {name}!\")"
      },
      {
        id: 2,
        difficulty: "medium",
        description: "Write a function that takes a list of cricket scores and returns the lowest and highest scores. Print both in main code.",
        hint: "Use min() and max() and return both with a comma. Unpack into two variables when calling."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Write a function calculate_tax(price, tax_percent=18) and another function final_bill(price) that calls calculate_tax and returns price + tax. Test with a 1000 rupee bill.",
        hint: "Define calculate_tax first, then final_bill which calls it."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Write a function speed_stats(car_speeds) that returns the slowest, fastest, and average speed. Then write a function print_report(car_speeds) that calls speed_stats and prints a nice report. Test with 4 car top speeds.",
        hint: "Unpack three return values. Use f-strings to format the average to 1 decimal place."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the output of: def f(a, b=5): return a + b then f(3)?",
        options: ["3", "5", "8", "Error"],
        correct: 2,
        explanation: "a is 3 (passed), b uses its default value 5, so 3 + 5 = 8."
      },
      {
        id: 2,
        type: "true-false",
        question: "A Python function can return more than one value by separating them with commas.",
        correctBool: true,
        explanation: "return min, max returns two values packed as a tuple, which the caller can unpack into separate variables."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To assign multiple returned values to separate variables, you use ____ on the left side of the equals sign.",
        answer: "unpacking",
        explanation: "Unpacking assigns each returned value to its own variable, like low, high = min_max(scores)."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'def double(x):\n    return x * 2\n\ndef add_one(x):\n    return x + 1\n\nresult = add_one(double(5))\nprint(result)',
        answer: "11",
        explanation: "double(5) returns 10. add_one(10) returns 11. Functions can be nested in calls like this."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why must helper functions be defined before the functions that call them?",
        options: [
          "Because Python is slow otherwise",
          "Because Python reads code top to bottom and needs the def to exist before the call",
          "Because helper functions are more important",
          "It does not matter, Python figures it out"
        ],
        correct: 1,
        explanation: "Python reads your file top to bottom. When a function is called, Python must already have seen its def line. Define helpers first, callers second."
      }
    ],
    teacherNotes:
      "Default parameters are easy to grasp with the favorite_color example. Stress that defaults must come last. Multiple returns are magical for beginners because most languages make this hard. Python's unpacking syntax (low, high = func()) is worth a few minutes of admiration. For functions calling functions, the phone bill example is great because it shows separation of concerns: one function does discount, another does tax, and a third combines them. Encourage Aarav to think of each function as a specialist worker on a team. The cricket report is the most satisfying example because it produces a real, useful report from small pieces. End by having him write his own multi-function program from scratch.",
    explainToFriend:
      "Default parameters let a function have optional arguments with default values. Multiple return values let a function give back more than one thing, which you can unpack into separate variables. Functions can call other functions, letting you build big programs from small focused pieces.",
    realWorldExamples: [
      "A food delivery app has a place_order(user, items, payment=\"cash\") where the default payment is cash",
      "A game engine has update_physics() which calls update_gravity() and update_collisions()",
      "A weather app has get_forecast(city, days=7) where the default is a 7-day forecast"
    ],
    thingsToGoogle: [
      "Python default arguments",
      "Python multiple return values",
      "Python tuple unpacking",
      "Python functions calling functions"
    ],
    expectedOutput:
      "The final_price program prints: Final price (default discount and tax): $1175.04 and Final price (20% discount, 5% tax): $1008.00",
    debugging: [
      "SyntaxError: non-default argument follows default argument: reorder so defaults come last",
      "ValueError: too many values to unpack: the function returns more values than you have variables on the left",
      "NameError: function not defined: define helper functions before the functions that call them"
    ]
  },

  // ============================================================
  // DAY 12
  // ============================================================
  {
    dayNumber: 12,
    title: "Lists: Storing Many Values in Order",
    phase: "python",
    objectives: [
      "Create a list and access items by index",
      "Slice a list to get a sub-list",
      "Add and remove items using append, insert, remove, and pop",
      "Use common list methods like len, sort, and reverse"
    ],
    content: [
      {
        type: "paragraph",
        text: "So far Aarav has stored one value per variable. But what if he wants to keep track of all his favorite games, or all the players on a cricket team? Lists solve this. A list is an ordered collection that can hold many values under a single name."
      },
      { type: "heading", level: 2, text: "Creating a List" },
      {
        type: "paragraph",
        text: "You create a list by putting values inside square brackets, separated by commas. A list can hold any type of value, and you can even mix types (though it is usually cleaner to keep a list of one type)."
      },
      {
        type: "code",
        language: "python",
        code: 'favorite_games = ["Minecraft", "Roblox", "Among Us", "FIFA", "Subway Surfers"]\nscores = [45, 82, 67, 91, 38]\nmixed = ["Aarav", 13, True, 5.4]\n\nprint(favorite_games)\nprint(scores)\nprint(mixed)'
      },
      { type: "heading", level: 2, text: "Accessing Items by Index" },
      {
        type: "paragraph",
        text: "Each item in a list has a position called its index. Python starts counting from zero, so the first item is index 0, the second is index 1, and so on. You use square brackets to access an item by its index."
      },
      {
        type: "code",
        language: "python",
        code: 'favorite_games = ["Minecraft", "Roblox", "Among Us", "FIFA", "Subway Surfers"]\n\nprint(favorite_games[0])  # First game\nprint(favorite_games[1])  # Second game\nprint(favorite_games[4])  # Fifth game\n\n# Negative indices count from the end\nprint(favorite_games[-1])  # Last game\nprint(favorite_games[-2])  # Second-to-last game'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Index starts at 0, not 1",
        text: "Beginners always reach for index 1 to get the first item. Remember: the first item is index 0. A list of 5 items has indices 0 through 4. Asking for index 5 gives an IndexError."
      },
      {
        type: "table",
        headers: ["Expression", "What it gives", "Result for the games list"],
        rows: [
          ["favorite_games[0]", "first item", "Minecraft"],
          ["favorite_games[1]", "second item", "Roblox"],
          ["favorite_games[-1]", "last item", "Subway Surfers"],
          ["favorite_games[-2]", "second-to-last item", "FIFA"]
        ]
      },
      { type: "heading", level: 2, text: "Slicing: Getting a Sub-list" },
      {
        type: "paragraph",
        text: "A slice gives you a piece of a list. Use a colon inside the brackets: list[start:stop] gives items from start up to (but not including) stop. Like range(), slices stop BEFORE the end index."
      },
      {
        type: "code",
        language: "python",
        code: 'favorite_games = ["Minecraft", "Roblox", "Among Us", "FIFA", "Subway Surfers"]\n\nprint(favorite_games[0:3])   # First three games\nprint(favorite_games[1:4])   # Games at index 1, 2, 3\nprint(favorite_games[:2])    # From start up to index 2\nprint(favorite_games[2:])    # From index 2 to the end\nprint(favorite_games[:])     # A copy of the whole list'
      },
      { type: "heading", level: 2, text: "Adding Items: append and insert" },
      {
        type: "paragraph",
        text: "Lists are mutable, which means you can change them. The append() method adds an item to the end of the list. The insert() method adds an item at a specific index, pushing the rest to the right."
      },
      {
        type: "code",
        language: "python",
        code: 'favorite_games = ["Minecraft", "Roblox", "Among Us"]\nprint("Start:", favorite_games)\n\nfavorite_games.append("FIFA")\nprint("After append:", favorite_games)\n\nfavorite_games.insert(1, "Clash Royale")  # Insert at index 1\nprint("After insert at index 1:", favorite_games)'
      },
      { type: "heading", level: 2, text: "Removing Items: remove and pop" },
      {
        type: "code",
        language: "python",
        code: 'favorite_games = ["Minecraft", "Roblox", "Among Us", "FIFA", "Subway Surfers"]\n\n# remove() deletes a specific value\nfavorite_games.remove("Among Us")\nprint("After removing Among Us:", favorite_games)\n\n# pop() removes by index and returns the removed value\nremoved = favorite_games.pop(0)\nprint(f"Removed {removed}, list is now:", favorite_games)\n\n# pop() with no argument removes the last item\nlast = favorite_games.pop()\nprint(f"Removed {last}, list is now:", favorite_games)'
      },
      {
        type: "callout",
        variant: "tip",
        title: "append vs insert",
        text: "Use append when you just want to add to the end (most common). Use insert when you need to put the new item at a specific position. append is faster, so prefer it when you can."
      },
      { type: "heading", level: 2, text: "Common List Methods" },
      {
        type: "table",
        headers: ["Method or function", "What it does", "Example"],
        rows: [
          ["len(list)", "returns the number of items", "len([1, 2, 3]) gives 3"],
          ["list.append(x)", "adds x to the end", "games.append(\"FIFA\")"],
          ["list.insert(i, x)", "inserts x at index i", "games.insert(0, \"Chess\")"],
          ["list.remove(x)", "removes the first x", "games.remove(\"Chess\")"],
          ["list.pop(i)", "removes and returns item at i", "games.pop(2)"],
          ["list.sort()", "sorts the list in place", "scores.sort()"],
          ["list.reverse()", "reverses the list in place", "scores.reverse()"]
        ]
      },
      { type: "heading", level: 2, text: "Finding the Longest Name in a List" },
      {
        type: "code",
        language: "python",
        code: 'friends = ["Aarav", "Riya", "Krishna", "Abhinav", "Kabir", "Ananya"]\n\nlongest_name = friends[0]\nfor name in friends:\n    if len(name) > len(longest_name):\n        longest_name = name\n\nprint(f"Friends: {friends}")\nprint(f"The longest name is {longest_name} with {len(longest_name)} letters.")'
      },
      {
        type: "paragraph",
        text: "This is the accumulator pattern again, but instead of adding numbers, we keep track of the best answer so far. As we walk through the list, we replace longest_name whenever we find a longer one. By the end, we have the longest."
      },
      { type: "heading", level: 2, text: "Sorting and Reversing" },
      {
        type: "code",
        language: "python",
        code: 'scores = [82, 45, 91, 67, 38]\nprint("Original:", scores)\n\nscores.sort()\nprint("Sorted ascending:", scores)\n\nscores.reverse()\nprint("Reversed (descending):", scores)\n\n# sorted() returns a new sorted list without changing the original\noriginal = [82, 45, 91, 67, 38]\nsorted_copy = sorted(original)\nprint("Original unchanged:", original)\nprint("New sorted copy:", sorted_copy)'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "sort() changes the original, sorted() does not",
        text: "list.sort() sorts the list in place (modifies it forever). sorted(list) returns a new sorted list and leaves the original alone. Use sorted() when you want to keep the original order. This distinction trips up many students."
      },
      { type: "heading", level: 2, text: "Lists of Numbers: sum, min, max" },
      {
        type: "code",
        language: "python",
        code: 'runs = [45, 82, 67, 91, 38]\n\nprint(f"Scores: {runs}")\nprint(f"Total runs: {sum(runs)}")\nprint(f"Number of matches: {len(runs)}")\nprint(f"Average: {sum(runs) / len(runs):.1f}")\nprint(f"Highest score: {max(runs)}")\nprint(f"Lowest score: {min(runs)}")'
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Create a list of Aarav's 5 favorite foods. Print the first and last items using indices 0 and -1.",
        hint: "foods = [\"pizza\", ...] then print(foods[0]) and print(foods[-1])."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Start with a list of three favorite games. Add a fourth game with append, then add another at the start with insert. Print the list after each change.",
        hint: "Use games.append(\"...\") and games.insert(0, \"...\")."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Create a list of 6 friends' names. Write a loop to find and print the longest name and its length.",
        hint: "Start with longest = friends[0], loop through, and update when you find a longer name."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Take a list of 5 cricket scores. Print the original, then print it sorted ascending, then print it sorted descending, all without changing the original list.",
        hint: "Use sorted(scores) for ascending and sorted(scores, reverse=True) for descending."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the index of the first item in a Python list?",
        options: ["1", "0", "-1", "It depends on the list"],
        correct: 1,
        explanation: "Python lists are zero-indexed, so the first item is at index 0, the second at index 1, and so on."
      },
      {
        id: 2,
        type: "true-false",
        question: "The append() method adds an item to the end of a list.",
        correctBool: true,
        explanation: "append() is the most common way to add an item. It always goes at the end of the list."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To get the number of items in a list, use the ____() function.",
        answer: "len",
        explanation: "len(list) returns how many items are in the list. It also works on strings and other collections."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'games = ["Minecraft", "Roblox", "FIFA"]\ngames.append("Among Us")\nprint(games[2])\nprint(len(games))',
        answer: "FIFA\n4",
        explanation: "After append, the list has 4 items. games[2] is still FIFA (the third item). len(games) is now 4."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What does list.sort() do compared to sorted(list)?",
        options: [
          "They are exactly the same",
          "sort() modifies the list in place; sorted() returns a new sorted list",
          "sorted() modifies the list; sort() returns a new one",
          "Both return new lists"
        ],
        correct: 1,
        explanation: "sort() sorts the list in place, changing the original. sorted() returns a new sorted list and leaves the original untouched."
      }
    ],
    teacherNotes:
      "Lists are the workhorse data structure in Python. Aarav will use them constantly. The zero-indexing is the first hurdle; practice with negative indices too because they are incredibly useful. For slices, emphasize the stop-before rule (start:stop stops before stop). The append/insert/remove/pop quartet covers 90% of daily list operations. The longest-name example is a great use of the accumulator pattern from Day 8, now applied to strings. The sort vs sorted distinction trips up almost everyone at first. Run a demo where list.sort() is called and the original changes, then show sorted() leaving it alone. This contrast sticks better than words.",
    explainToFriend:
      "A list holds many values in order under one name. You access items by their index, which starts at 0. You can add with append, remove with remove or pop, and slice with start:stop. Lists are mutable, so methods like sort and reverse change the original list.",
    realWorldExamples: [
      "A music app stores your playlist as a list of songs",
      "A cricket scoreboard stores player scores in a list",
      "A to-do list app stores your tasks as a list of strings"
    ],
    thingsToGoogle: [
      "Python list methods cheat sheet",
      "Python list slicing tutorial",
      "Python sort vs sorted",
      "Python negative indexing"
    ],
    expectedOutput:
      "The longest-name program prints: The longest name is Abhinav with 7 letters.",
    debugging: [
      "IndexError: list index out of range: your index is too big, check len() and remember 0-based indexing",
      "ValueError: x not in list: you tried to remove an item that is not in the list",
      "AttributeError: you misspelled a method name, like .apend instead of .append"
    ]
  },

  // ============================================================
  // DAY 13
  // ============================================================
  {
    dayNumber: 13,
    title: "Dictionaries: Key-Value Pairs",
    phase: "python",
    objectives: [
      "Create a dictionary with key-value pairs",
      "Access, add, and update values by key",
      "Loop through a dictionary using keys(), values(), and items()",
      "Choose between a list and a dictionary"
    ],
    content: [
      {
        type: "paragraph",
        text: "Lists are great for ordered collections, but sometimes you want to look things up by name instead of by position. Dictionaries solve this. A dictionary stores pairs of keys and values. You give a key, Python gives you back the matching value. Think of it like a real dictionary: you look up a word (key) to find its meaning (value)."
      },
      { type: "heading", level: 2, text: "Creating a Dictionary" },
      {
        type: "paragraph",
        text: "You create a dictionary with curly braces. Inside, you write key: value pairs separated by commas. Keys are usually strings (like names), and values can be anything: numbers, strings, lists, even other dictionaries."
      },
      {
        type: "code",
        language: "python",
        code: 'car_speeds = {\n    "Bugatti": 261,\n    "Lamborghini": 217,\n    "Ferrari": 211,\n    "McLaren": 250\n}\n\nprint(car_speeds)\nprint(type(car_speeds))'
      },
      { type: "heading", level: 2, text: "Accessing Values by Key" },
      {
        type: "paragraph",
        text: "To get a value, put the key in square brackets after the dictionary name. This is like indexing a list, but with a key instead of a number."
      },
      {
        type: "code",
        language: "python",
        code: 'car_speeds = {"Bugatti": 261, "Lamborghini": 217, "Ferrari": 211}\n\nprint("Bugatti top speed:", car_speeds["Bugatti"])\nprint("Lamborghini top speed:", car_speeds["Lamborghini"])\n\n# .get() returns None (or a default) if the key is missing\nprint("Tesla top speed:", car_speeds.get("Tesla"))\nprint("Tesla top speed:", car_speeds.get("Tesla", "Not in dictionary"))'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "KeyError when the key does not exist",
        text: "If you ask for car_speeds[\"Tesla\"] and Tesla is not in the dictionary, Python throws a KeyError. Use .get(key) instead, which returns None if the key is missing, or .get(key, default) to specify a default value."
      },
      { type: "heading", level: 2, text: "Adding and Updating Values" },
      {
        type: "paragraph",
        text: "To add a new pair, just assign to a new key: dict[new_key] = value. To update an existing value, assign to an existing key. The same syntax works for both."
      },
      {
        type: "code",
        language: "python",
        code: 'car_speeds = {"Bugatti": 261, "Lamborghini": 217}\nprint("Start:", car_speeds)\n\n# Adding a new car\ncar_speeds["Tesla"] = 200\nprint("After adding Tesla:", car_speeds)\n\n# Updating an existing car (maybe a tune-up)\ncar_speeds["Bugatti"] = 270\nprint("After Bugatti tune-up:", car_speeds)'
      },
      { type: "heading", level: 2, text: "Aarav's Report Card" },
      {
        type: "paragraph",
        text: "A dictionary is perfect for a report card. Each subject is a key, and the mark is the value. Let us build one and then improve Aarav's marks over time."
      },
      {
        type: "code",
        language: "python",
        code: 'report_card = {\n    "Math": 78,\n    "Science": 82,\n    "English": 74,\n    "History": 68,\n    "Geography": 71\n}\n\nprint("Aarav\'s report card:")\nprint(f"  Math: {report_card[\'Math\']}")\nprint(f"  Science: {report_card[\'Science\']}")\n\n# Aarav studies harder and improves his History mark\nreport_card["History"] = 85\nprint(f"  History (improved): {report_card[\'History\']}")\n\n# Adding a new subject\nreport_card["Computer Science"] = 91\nprint(f"  Computer Science (new): {report_card[\'Computer Science\']}")'
      },
      { type: "heading", level: 2, text: "Looping Through a Dictionary" },
      {
        type: "paragraph",
        text: "There are three ways to loop through a dictionary: by keys, by values, or by both (items). The .items() method is the most useful because it gives you both at once."
      },
      {
        type: "code",
        language: "python",
        code: 'report_card = {"Math": 78, "Science": 82, "English": 74, "History": 85}\n\nprint("All subjects (keys):")\nfor subject in report_card.keys():\n    print(f"  - {subject}")\n\nprint("\\nAll marks (values):")\nfor mark in report_card.values():\n    print(f"  - {mark}")\n\nprint("\\nSubjects and marks (items):")\nfor subject, mark in report_card.items():\n    print(f"  {subject}: {mark}")'
      },
      {
        type: "table",
        headers: ["Method", "What it gives", "Use it when..."],
        rows: [
          [".keys()", "all the keys", "you only need the keys"],
          [".values()", "all the values", "you only need the values"],
          [".items()", "pairs of (key, value)", "you need both, the most common case"]
        ]
      },
      { type: "heading", level: 2, text: "Calculating the Average from a Dictionary" },
      {
        type: "code",
        language: "python",
        code: 'report_card = {"Math": 78, "Science": 82, "English": 74, "History": 85, "Geography": 71}\n\ntotal = 0\nfor subject, mark in report_card.items():\n    total += mark\n\naverage = total / len(report_card)\nprint(f"Total marks: {total}")\nprint(f"Number of subjects: {len(report_card)}")\nprint(f"Average: {average:.1f}")\n\n# Finding the best subject\nbest_subject = None\nbest_mark = 0\nfor subject, mark in report_card.items():\n    if mark > best_mark:\n        best_mark = mark\n        best_subject = subject\n\nprint(f"Best subject: {best_subject} with {best_mark} marks")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Dictionaries preserve insertion order",
        text: "Since Python 3.7, dictionaries remember the order in which you added keys. When you loop through, you get keys in the order they were inserted. This makes dictionaries useful even when order matters."
      },
      { type: "heading", level: 2, text: "When to Use a List vs a Dictionary" },
      {
        type: "table",
        headers: ["Use a list when...", "Use a dictionary when..."],
        rows: [
          ["Items are in a meaningful order", "You want to look things up by name"],
          ["You access items by position (index)", "You access items by key (name)"],
          ["Items might repeat", "Keys must be unique"],
          ["Examples: top 5 scores, days of the week", "Examples: phone book, settings, report card"]
        ]
      },
      {
        type: "callout",
        variant: "tip",
        title: "Keys must be unique",
        text: "If you assign to the same key twice, the second value replaces the first. You cannot have two Math entries in a report card. If you need duplicates, use a list of dictionaries instead."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Create a dictionary of 4 cars and their top speeds. Print each car's speed by accessing it with its key.",
        hint: "cars = {\"Bugatti\": 261, ...} then print(cars[\"Bugatti\"])."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Start with a report card of 3 subjects. Add a fourth subject, then update one existing subject's mark to be higher. Print the dictionary after each change.",
        hint: "report[\"Art\"] = 88 adds; report[\"Math\"] = 95 updates."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Build a report card with 5 subjects. Use a for loop over .items() to print each subject and mark, then print the average.",
        hint: "Loop with for subject, mark in report.items(): and accumulate the total."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Create a dictionary of 5 friends and their favorite games. Find and print which friend likes which game the most by alphabet (the first friend alphabetically). Then find the longest game name.",
        hint: "Use sorted(report.keys()) to get friends alphabetically. Loop over .items() to find the longest game name."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What symbols are used to create a dictionary in Python?",
        options: ["Square brackets [ ]", "Curly braces { }", "Parentheses ( )", "Angle brackets < >"],
        correct: 1,
        explanation: "Dictionaries are created with curly braces, with key: value pairs separated by commas inside."
      },
      {
        id: 2,
        type: "true-false",
        question: "Dictionary keys must be unique; assigning to an existing key replaces its value.",
        correctBool: true,
        explanation: "Each key can appear only once. If you assign a value to an existing key, the old value is overwritten."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "To loop through both keys and values of a dictionary, use the ____() method.",
        answer: "items",
        explanation: ".items() returns pairs of (key, value), which you can unpack in a for loop: for k, v in d.items()."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'd = {"a": 1, "b": 2}\nd["c"] = 3\nd["a"] = 10\nprint(d["a"])\nprint(len(d))',
        answer: "10\n3",
        explanation: "After adding c, there are 3 keys. Reassigning a changes its value to 10. So d[\"a\"] is 10 and len(d) is 3."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "What happens if you access a key that does not exist using square brackets, like d[\"missing\"]?",
        options: [
          "It returns None",
          "It returns an empty string",
          "It raises a KeyError",
          "It creates the key with value None"
        ],
        correct: 2,
        explanation: "Square bracket access on a missing key raises a KeyError. To avoid this, use .get(key) which returns None, or .get(key, default) for a custom default."
      }
    ],
    teacherNotes:
      "Dictionaries click instantly for students who have used a real dictionary or a phone contacts app. The key-value metaphor is natural. The biggest trap is KeyError from missing keys. Always demonstrate the .get() method as the safer alternative. The report card example is the centerpiece: it shows creating, accessing, updating, and looping all in one realistic program. When you show .items(), emphasize the unpacking syntax (for subject, mark in ...) which connects to Day 11's multiple returns. End with the list-vs-dictionary comparison so Aarav starts building intuition for when to reach for which data structure.",
    explainToFriend:
      "A dictionary stores key-value pairs. You look up a value by its key, like looking up a word in a real dictionary. You create one with curly braces and key: value pairs. You can add and update values, and loop through with .keys(), .values(), or .items().",
    realWorldExamples: [
      "A phone contacts app stores names as keys and phone numbers as values",
      "A settings menu uses keys like \"volume\" and \"brightness\" with numeric values",
      "A video game stores item names as keys with their counts as values"
    ],
    thingsToGoogle: [
      "Python dictionary tutorial",
      "Python dict get method",
      "Python dict items keys values",
      "Python list vs dictionary"
    ],
    expectedOutput:
      "The average program prints: Total marks: 390, Number of subjects: 5, Average: 78.0",
    debugging: [
      "KeyError: the key does not exist; use .get(key) or check if key in dict first",
      "SyntaxError: missing colon between key and value in the dictionary literal",
      "TypeError: unhashable type: you tried to use a list as a key, only immutable types like strings and numbers work as keys"
    ]
  },

  // ============================================================
  // DAY 14
  // ============================================================
  {
    dayNumber: 14,
    title: "Tuples, Sets, and String Methods",
    phase: "python",
    objectives: [
      "Create tuples and understand why they are immutable",
      "Create sets and use them to find unique values",
      "Use common string methods like upper, lower, replace, and split",
      "Choose the right data type for each job"
    ],
    content: [
      {
        type: "paragraph",
        text: "Today Aarav meets three more Python data types: tuples (like lists but unchangeable), sets (collections of unique items), and the powerful methods built into strings. By the end of today he will know the full family of basic collections and be ready for file handling tomorrow."
      },
      { type: "heading", level: 2, text: "Tuples: Immutable Sequences" },
      {
        type: "paragraph",
        text: "A tuple is like a list, but once you create it, you cannot change it. This is called being immutable. You create a tuple with parentheses instead of square brackets."
      },
      {
        type: "code",
        language: "python",
        code: '# Coordinates of Aarav\'s house (latitude, longitude)\nhouse_location = (28.6139, 77.2090)\nprint("House location:", house_location)\nprint("Latitude:", house_location[0])\nprint("Longitude:", house_location[1])\nprint("Type:", type(house_location))'
      },
      {
        type: "paragraph",
        text: "Tuples are useful for values that should never change, like coordinates, dates, or RGB color values. Because they cannot change, Python can store them more efficiently than lists. You can access tuple items by index just like a list, but you cannot append, remove, or assign."
      },
      {
        type: "code",
        language: "python",
        code: 'house_location = (28.6139, 77.2090)\n\n# This works: reading from the tuple\nprint(house_location[0])\n\n# This would raise a TypeError (uncomment to try):\n# house_location[0] = 29.0  # Tuples cannot be changed!\n\n# Tuple unpacking\nlat, lon = house_location\nprint(f"Latitude: {lat}, Longitude: {lon}")'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why use tuples?",
        text: "Use a tuple when the collection should never change after creation. This protects data from accidental modification. Coordinates, dates (year, month, day), and RGB colors (red, green, blue) are classic tuple use cases. If you do not need to modify the collection, prefer a tuple."
      },
      { type: "heading", level: 2, text: "Sets: Collections of Unique Items" },
      {
        type: "paragraph",
        text: "A set is a collection that cannot contain duplicates. If you add the same value twice, the set keeps only one copy. Sets are created with curly braces (like dictionaries) but with no colons. They are perfect for finding unique values."
      },
      {
        type: "code",
        language: "python",
        code: '# All colors in Aarav\'s wardrobe (with some duplicates)\nwardrobe = ["blue", "red", "blue", "green", "red", "black", "blue", "white"]\nprint("All items (with duplicates):", wardrobe)\nprint("Count:", len(wardrobe))\n\nunique_colors = set(wardrobe)\nprint("Unique colors:", unique_colors)\nprint("Unique count:", len(unique_colors))'
      },
      {
        type: "paragraph",
        text: "Notice that converting a list to a set with set() automatically removes duplicates. You can also create a set directly with curly braces. Sets do not have a fixed order, so the items may print in a different order than you added them."
      },
      {
        type: "code",
        language: "python",
        code: '# Creating a set directly\ncricket_teams = {"India", "Australia", "England", "Pakistan"}\nprint("Teams:", cricket_teams)\n\n# Adding to a set\ncricket_teams.add("South Africa")\nprint("After add:", cricket_teams)\n\n# Adding a duplicate does nothing\ncricket_teams.add("India")\nprint("After duplicate add:", cricket_teams)\n\n# Checking membership is fast\nprint("Is India in the set?", "India" in cricket_teams)\nprint("Is Brazil in the set?", "Brazil" in cricket_teams)'
      },
      {
        type: "callout",
        variant: "tip",
        title: "in works on lists, tuples, sets, and dictionaries",
        text: "The in keyword checks whether a value exists in a collection. It is much faster on sets than on lists, especially for large collections. For dictionaries, in checks the keys."
      },
      { type: "heading", level: 2, text: "String Methods" },
      {
        type: "paragraph",
        text: "Strings in Python come with many built-in methods. A method is a function that belongs to a specific type, called with a dot. Let us explore the most useful string methods using Aarav's full name."
      },
      {
        type: "code",
        language: "python",
        code: 'name = "Aarav Singh"\n\nprint("Original:", name)\nprint("Upper:", name.upper())\nprint("Lower:", name.lower())\nprint("Title case:", name.title())\nprint("Length:", len(name))\nprint("Number of \'a\' (case sensitive):", name.count("a"))\nprint("First position of \'Singh\':", name.find("Singh"))\nprint("Replace Singh with Kumar:", name.replace("Singh", "Kumar"))'
      },
      {
        type: "table",
        headers: ["Method", "What it does", "Example result on \"Aarav Singh\""],
        rows: [
          ["upper()", "all uppercase", "AARAV SINGH"],
          ["lower()", "all lowercase", "aarav singh"],
          ["title()", "first letter of each word capital", "Aarav Singh"],
          ["count(sub)", "how many times sub appears", "count(\"a\") gives 2"],
          ["find(sub)", "index of first sub (or -1)", "find(\"Singh\") gives 6"],
          ["replace(old, new)", "replaces all old with new", "replace(\"Singh\", \"Kumar\")"],
          ["split(sep)", "splits into a list at sep", "split(\" \") gives [\"Aarav\", \"Singh\"]"]
        ]
      },
      { type: "heading", level: 2, text: "split() and join()" },
      {
        type: "paragraph",
        text: "split() breaks a string into a list of pieces. join() does the opposite: it glues a list of strings together into one string. These two are incredibly useful for working with text."
      },
      {
        type: "code",
        language: "python",
        code: 'full_name = "Aarav Singh"\n\n# Split into first and last name\nparts = full_name.split(" ")\nprint("Parts:", parts)\nprint("First name:", parts[0])\nprint("Last name:", parts[1])\n\n# Join a list of words back into one string\nwords = ["Hello", "from", "Aarav"]\nsentence = " ".join(words)\nprint("Joined with spaces:", sentence)\n\n# Join with a different separator\ncricketers = ["Virat", "Rohit", "Hardik"]\nline = ", ".join(cricketers)\nprint("Joined with commas:", line)'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Strings are immutable too",
        text: "Like tuples, strings cannot be changed in place. Methods like upper() and replace() return a NEW string; they do not change the original. If you want to keep the change, assign it back: name = name.upper()."
      },
      { type: "heading", level: 2, text: "Putting It All Together" },
      {
        type: "code",
        language: "python",
        code: '# Aarav\'s favorite superhero names (some repeated)\nheroes = ["Spider-Man", "Iron Man", "Spider-Man", "Thor", "Iron Man", "Hulk"]\n\nunique_heroes = set(heroes)\nprint(f"Aarav likes {len(unique_heroes)} unique heroes:")\nfor hero in sorted(unique_heroes):\n    print(f"  - {hero.upper()}")\n\n# Birth date as a tuple (never changes)\nbirth_date = (2011, 5, 14)  # year, month, day\nprint(f"\\nAarav was born in {birth_date[0]}, month {birth_date[1]}, day {birth_date[2]}")\n\n# Splitting and joining names\nfull_name = "Aarav Prakash Singh"\nname_parts = full_name.split(" ")\ninitials = ".".join([p[0] for p in name_parts]) + "."\nprint(f"Initials: {initials}")'
      },
      {
        type: "callout",
        variant: "tip",
        title: "Quick comparison of collections",
        text: "List [ ]: ordered, changeable, duplicates allowed. Tuple ( ): ordered, unchangeable, duplicates allowed. Set { }: unordered, changeable, no duplicates. String: text, immutable, methods like upper and split. Pick the one that fits your need."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Create a tuple with the coordinates of your favorite cricket stadium. Print the latitude and longitude separately using indices.",
        hint: "stadium = (lat, lon) then print(stadium[0]) and print(stadium[1])."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Make a list of colors with at least 3 duplicates. Convert it to a set, print the set, and print how many unique colors there are.",
        hint: "Use set(colors) and len(set(colors))."
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Take the string \"Aarav Singh\". Print it in all uppercase, count how many times the letter 'a' appears (case sensitive), and replace \"Singh\" with \"Kumar\".",
        hint: "Use name.upper(), name.count(\"a\"), and name.replace(\"Singh\", \"Kumar\")."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Take a full name with three parts (like \"Aarav Prakash Singh\"). Split it into a list, then create initials by joining the first letter of each part with dots. Print \"A.P.S.\".",
        hint: "Split with .split(\" \"), then use [part[0] for part in name_parts] inside \".\".join(), and add a final dot."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What is the main difference between a tuple and a list?",
        options: [
          "Tuples can only hold numbers",
          "Tuples are immutable (cannot be changed) after creation",
          "Tuples are slower than lists",
          "Tuples cannot be looped over"
        ],
        correct: 1,
        explanation: "Tuples are immutable. Once created, you cannot add, remove, or change items. Lists are mutable."
      },
      {
        id: 2,
        type: "true-false",
        question: "A set automatically removes duplicate values.",
        correctBool: true,
        explanation: "Sets only store unique values. Adding a duplicate has no effect, which makes sets perfect for finding unique items."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "The string method ____() breaks a string into a list of pieces using a separator.",
        answer: "split",
        explanation: "split(sep) cuts a string at each sep and returns the pieces as a list. The opposite is join()."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'name = "Aarav"\nprint(name.upper())\nprint(name.replace("a", "o"))\nprint(name)',
        answer: "AARAV\nAorov\nAarav",
        explanation: "upper() returns the all-caps version. replace(\"a\", \"o\") swaps each a for an o. The original name is unchanged because strings are immutable."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Why does name.upper() not change the original string?",
        options: [
          "Because upper() is broken",
          "Because strings are immutable; upper() returns a new string",
          "Because you need to import a module first",
          "Because upper() only works on numbers"
        ],
        correct: 1,
        explanation: "Strings are immutable in Python. Methods like upper() and replace() return new strings; they never modify the original. Assign the result back to keep it: name = name.upper()."
      }
    ],
    teacherNotes:
      "Tuples are easy to introduce as lists-that-cannot-change. The immutability benefit is subtle, so use the coordinates example: latitude and longitude should never accidentally change. Sets are immediately satisfying because removing duplicates feels like magic. Show how slow and verbose it would be to deduplicate a list by hand, then show set() do it in one call. For strings, the immutability point is the trickiest. Run name.upper(), print name, and watch it be unchanged. Then assign name = name.upper() and watch it stick. This contrast is essential. The split/join pair is fundamental for text processing; Aarav will use it constantly in real programs. End with the comparison table so he has a mental map of all the basic collections.",
    explainToFriend:
      "Tuples are like lists but cannot be changed (immutable). Sets are collections that automatically remove duplicates. Strings have useful methods like upper(), lower(), replace(), split(), and join(). All of these (tuples, strings) are immutable, so methods return new values rather than changing the original.",
    realWorldExamples: [
      "GPS apps use tuples for coordinates (latitude, longitude)",
      "Tag systems in blogs use sets to store unique tags",
      "Chat apps use split() to break a message into words for processing"
    ],
    thingsToGoogle: [
      "Python tuple vs list",
      "Python set unique values",
      "Python string methods cheat sheet",
      "Python split and join examples"
    ],
    expectedOutput:
      "The full demo prints the unique heroes in uppercase, Aarav's birth date from the tuple, and his initials A.P.S.",
    debugging: [
      "TypeError: tuple object does not support item assignment: tuples are immutable, use a list if you need to modify",
      "AttributeError: you misspelled a method, like .uppr instead of .upper",
      "Original string unchanged after upper/replace: strings are immutable, assign the result back to keep it"
    ]
  },

  // ============================================================
  // DAY 15
  // ============================================================
  {
    dayNumber: 15,
    title: "File Handling and Exceptions",
    phase: "python",
    objectives: [
      "Write data to a file-like object using io.StringIO",
      "Read data back from a file-like object",
      "Handle errors gracefully with try and except",
      "Catch specific exceptions like ZeroDivisionError and ValueError"
    ],
    content: [
      {
        type: "paragraph",
        text: "Today Aarav learns two essential skills: saving data to a file so it persists between runs, and handling errors gracefully so a program does not crash. Because this handbook runs Python in the browser (in Pyodide), we will use io.StringIO, which behaves like a file but lives in memory. The same code works with real files using open(); we just swap StringIO for a real filename."
      },
      { type: "heading", level: 2, text: "Why Files Matter" },
      {
        type: "paragraph",
        text: "Every program you have written so far loses its data when it stops. Variables vanish. If Aarav wants to save his friend list or his game scores between runs, he needs to write them to a file. Files live on disk and stay there until you delete them, even when the program is not running."
      },
      { type: "heading", level: 2, text: "The open() Function (Conceptual)" },
      {
        type: "paragraph",
        text: "In a normal Python environment, you use the open() function to open a file. You give it a filename and a mode (\"r\" for read, \"w\" for write, \"a\" for append). After you are done, you close the file. The best practice is to use a with statement, which closes the file automatically."
      },
      {
        type: "code",
        language: "python",
        code: '# Conceptual example (works on your computer, not in Pyodide):\n# with open("friends.txt", "w") as f:\n#     f.write("Aarav\\n")\n#     f.write("Riya\\n")\n#\n# with open("friends.txt", "r") as f:\n#     contents = f.read()\n#     print(contents)\n#\n# In Pyodide (browser Python), we use io.StringIO instead:\nimport io\n\nfake_file = io.StringIO()\nfake_file.write("Aarav\\n")\nfake_file.write("Riya\\n")\nfake_file.write("Kabir\\n")\n\n# Read what we wrote\nfake_file.seek(0)  # Go back to the start\ncontents = fake_file.read()\nprint(contents)'
      },
      {
        type: "callout",
        variant: "teacher",
        title: "Why io.StringIO in this handbook?",
        text: "Pyodide runs in the browser and cannot freely write to your computer's disk. io.StringIO behaves exactly like a file (it has read, write, seek, close), but it lives in memory. The skills Aarav learns here transfer directly to real files: just replace StringIO() with open(\"filename.txt\", \"w\") on his own computer."
      },
      { type: "heading", level: 2, text: "Writing Aarav's Friend List" },
      {
        type: "code",
        language: "python",
        code: 'import io\n\n# Build a list of Aarav\'s friends\nfriends = ["Aarav", "Riya", "Kabir", "Ananya", "Krishna"]\n\n# Create an in-memory file and write each friend on a new line\nfriend_file = io.StringIO()\nfor friend in friends:\n    friend_file.write(friend + "\\n")\n\n# Read it back to confirm\nfriend_file.seek(0)\nprint("Friends saved to file:")\nfor line in friend_file:\n    name = line.strip()  # remove the newline at the end\n    print(f"  - {name}")\n\nfriend_file.close()'
      },
      {
        type: "callout",
        variant: "tip",
        title: "seek(0) rewinds the file",
        text: "After you write to a file, the read position is at the end. To read what you wrote, call seek(0) to rewind to the start. Then read() or a for loop will give you the contents from the beginning."
      },
      { type: "heading", level: 2, text: "Reading Lines with .readlines()" },
      {
        type: "code",
        language: "python",
        code: 'import io\n\n# Write a small report card to a file-like object\nreport_file = io.StringIO()\nreport_file.write("Math: 78\\n")\nreport_file.write("Science: 82\\n")\nreport_file.write("English: 74\\n")\n\n# Read all lines into a list\nreport_file.seek(0)\nlines = report_file.readlines()\nprint("Lines in the file:", len(lines))\n\nfor line in lines:\n    subject, mark_text = line.strip().split(": ")\n    mark = int(mark_text)\n    status = "PASS" if mark >= 40 else "FAIL"\n    print(f"{subject}: {mark} ({status})")'
      },
      { type: "heading", level: 2, text: "Exceptions: Handling Errors Gracefully" },
      {
        type: "paragraph",
        text: "Errors happen. A user might type a letter where a number is expected, or a program might try to divide by zero. Without handling, these errors crash the program. With try and except, you can catch the error and respond gracefully instead of crashing."
      },
      {
        type: "code",
        language: "python",
        code: '# Division by zero, handled\ntry:\n    runs = 87\n    overs = 0\n    run_rate = runs / overs\n    print(f"Run rate: {run_rate}")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero! The player has not faced any overs yet.")\n\nprint("Program keeps running after the error.")'
      },
      {
        type: "paragraph",
        text: "The try block contains code that might fail. The except block runs only if the specified error occurs. After the except block, the program continues normally. Without try/except, the division by zero would crash the program with a traceback."
      },
      { type: "heading", level: 2, text: "Catching Specific Exceptions" },
      {
        type: "paragraph",
        text: "Python has many built-in exception types. The most common ones you will meet: ZeroDivisionError (dividing by zero), ValueError (bad conversion like int(\"abc\")), TypeError (mixing incompatible types), and FileNotFoundError (opening a missing file). Always catch the specific exception you expect, so other errors still show up."
      },
      {
        type: "code",
        language: "python",
        code: '# Handling invalid number input\nuser_input = "abc"\ntry:\n    number = int(user_input)\n    print(f"You entered: {number}")\nexcept ValueError:\n    print(f"\'{user_input}\' is not a valid number. Please enter digits only.")\n\n# Multiple except blocks for different errors\ntry:\n    value = int("50")\n    result = 100 / value\n    print(f"100 / {value} = {result}")\nexcept ValueError:\n    print("That was not a number.")\nexcept ZeroDivisionError:\n    print("You cannot divide by zero.")'
      },
      { type: "heading", level: 2, text: "File Not Found Handling" },
      {
        type: "paragraph",
        text: "When opening a file that does not exist for reading, Python raises a FileNotFoundError. You can catch this and show a friendly message instead of crashing. In Pyodide we simulate this by catching the error from a deliberate bad open."
      },
      {
        type: "code",
        language: "python",
        code: '# On a real computer, this would try to open a missing file\nfilename = "missing_friends.txt"\ntry:\n    # In Pyodide we cannot open real files, but this is the pattern:\n    # with open(filename, "r") as f:\n    #     contents = f.read()\n    # Simulating the error:\n    raise FileNotFoundError(f"[Errno 2] No such file: \'{filename}\'")\nexcept FileNotFoundError:\n    print(f"Sorry, the file \'{filename}\' does not exist.")\n    print("Would you like to create it?")'
      },
      {
        type: "callout",
        variant: "mistake",
        title: "Do not use bare except",
        text: "Writing just except: catches every error, including bugs you did not anticipate. This hides problems and makes debugging very hard. Always catch a specific exception type, like except ValueError or except ZeroDivisionError."
      },
      { type: "heading", level: 2, text: "The Full Pattern: Read, Handle, Report" },
      {
        type: "code",
        language: "python",
        code: 'import io\n\n# A program that asks the user for a number and divides 100 by it.\n# In Pyodide, we cannot use input(), so we simulate with a list of attempts.\nattempts = ["5", "0", "abc", "4"]\n\nfor attempt in attempts:\n    print(f"\\nTrying with input: \'{attempt}\'")\n    try:\n        number = int(attempt)\n        result = 100 / number\n        print(f"  100 / {number} = {result}")\n    except ValueError:\n        print(f"  Error: \'{attempt}\' is not a valid integer.")\n    except ZeroDivisionError:\n        print("  Error: cannot divide by zero.")\n    finally:\n        print("  (Attempt finished.)")\n\nprint("\\nAll attempts handled. Program did not crash.")'
      },
      {
        type: "paragraph",
        text: "The finally block runs no matter what, whether an error occurred or not. It is useful for cleanup tasks like closing files. It is optional, but you will see it often in real code."
      },
      {
        type: "table",
        headers: ["Exception", "When it happens", "Example"],
        rows: [
          ["ZeroDivisionError", "dividing by zero", "1 / 0"],
          ["ValueError", "bad value for a conversion", "int(\"hello\")"],
          ["TypeError", "wrong type for an operation", "\"text\" + 5"],
          ["IndexError", "list index out of range", "[1, 2, 3][10]"],
          ["KeyError", "dictionary key missing", "d[\"missing\"]"],
          ["FileNotFoundError", "opening a missing file", "open(\"nope.txt\")"]
        ]
      },
      {
        type: "callout",
        variant: "teacher",
        title: "The end of Python Fundamentals!",
        text: "Day 15 marks the end of the Python Fundamentals phase. Aarav now knows variables, types, input/output, operators, conditionals, loops, functions, lists, dictionaries, tuples, sets, strings, files, and exceptions. That is a real, working Python skill set. Tomorrow begins applying these skills to bigger projects."
      }
    ],
    exercises: [
      {
        id: 1,
        difficulty: "easy",
        description: "Use io.StringIO to write three of Aarav's favorite foods, each on a new line. Then seek(0) and read them back, printing each one.",
        hint: "Create StringIO, write with \"\\n\", seek(0), then loop with for line in file: print(line.strip())."
      },
      {
        id: 2,
        difficulty: "easy",
        description: "Write a try/except block that tries to divide 50 by 0. Catch the ZeroDivisionError and print a friendly message.",
        hint: "try: result = 50 / 0 except ZeroDivisionError: print(\"...\")"
      },
      {
        id: 3,
        difficulty: "medium",
        description: "Use a loop to try converting the strings \"7\", \"hello\", \"42\", and \"abc\" to integers. Catch ValueError for each failure and print a message. Print the successful conversions too.",
        hint: "Loop over a list of strings, try int(s) in a try block, except ValueError for failures."
      },
      {
        id: 4,
        difficulty: "hard",
        description: "Build a friend-list saver. Use io.StringIO to write 5 friends to a file-like object. Then read them back into a list. Print the list and the count. Use try/except to handle the case where the file-like object is empty (catch a custom check, not a built-in exception).",
        hint: "Write each friend with write(name + \"\\n\"), seek(0), then for line in file: append line.strip() to a list. Check if the list is empty after reading."
      }
    ],
    quiz: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does the try/except block do?",
        options: [
          "It runs the try block forever",
          "It tries code in try, and if an error occurs, runs the matching except block",
          "It skips code that might crash",
          "It makes code run faster"
        ],
        correct: 1,
        explanation: "try contains code that might fail. If a specified error occurs, the except block runs instead of crashing the program. The program then continues."
      },
      {
        id: 2,
        type: "true-false",
        question: "In Pyodide (browser Python), we use io.StringIO as a substitute for real files because Pyodide cannot freely write to disk.",
        correctBool: true,
        explanation: "Pyodide runs in the browser sandbox. io.StringIO behaves like a file in memory, so the same code patterns work, and on a real computer you just swap StringIO for open()."
      },
      {
        id: 3,
        type: "fill-blank",
        question: "After writing to a StringIO object, you must call ____(0) before reading it back, to rewind to the start.",
        answer: "seek",
        explanation: "seek(0) moves the read position back to the beginning of the file-like object so read() and for loops start from the top."
      },
      {
        id: 4,
        type: "code-output",
        question: "What does this code print?",
        code: 'try:\n    x = int("hello")\n    print(x)\nexcept ValueError:\n    print("not a number")\nprint("done")',
        answer: "not a number\ndone",
        explanation: "int(\"hello\") raises a ValueError. The except block catches it and prints \"not a number\". Then the program continues and prints \"done\"."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "Which exception is raised when you divide a number by zero in Python?",
        options: ["TypeError", "ValueError", "ZeroDivisionError", "MathError"],
        correct: 2,
        explanation: "Dividing by zero raises ZeroDivisionError. Catch it with except ZeroDivisionError to handle the case gracefully."
      }
    ],
    teacherNotes:
      "Files and exceptions are the bridge from beginner to intermediate Python. The Pyodide limitation is a teaching opportunity: explain that real programs use open(\"file.txt\", \"w\"), and that io.StringIO is a stand-in for the browser. Have Aarav try the same code on his own computer with real files for homework. For exceptions, the key insight is graceful failure: a user typing \"abc\" where a number is expected should not crash the program, it should get a friendly message and a chance to try again. Demonstrate the crash first (without try/except), then add try/except and watch the same input handled gracefully. The finally block is optional but worth showing for cleanup. End the day by celebrating: Aarav has finished Python Fundamentals and is ready to build real projects.",
    explainToFriend:
      "Files let you save data between runs of your program. In the browser we use io.StringIO as a file-like object. Exceptions are errors that would crash your program. With try/except, you catch specific errors and respond gracefully instead of crashing.",
    realWorldExamples: [
      "A notes app saves your notes to a file so they are there next time you open it",
      "A game saves your progress to a file so you can resume later",
      "A web form uses try/except to handle users who type letters in a phone number field"
    ],
    thingsToGoogle: [
      "Python open() file modes",
      "Python io.StringIO tutorial",
      "Python try except finally",
      "Python built-in exceptions list"
    ],
    setupInstructions:
      "No special setup needed. The code uses io.StringIO which works in Pyodide. To try with real files at home, replace io.StringIO() with open(\"filename.txt\", \"w\") and use the with statement.",
    expectedOutput:
      "The friend-list program writes 5 friends, reads them back, and prints each one indented. The full pattern program handles all 4 attempts without crashing.",
    debugging: [
      "io.UnsupportedOperation: not readable: you forgot seek(0) before reading, or opened in write-only mode",
      "ValueError: I/O operation on closed file: you closed the StringIO then tried to read it, read before closing",
      "Program crashes on bad input: wrap risky code in try/except for the specific exception type"
    ]
  }
];
