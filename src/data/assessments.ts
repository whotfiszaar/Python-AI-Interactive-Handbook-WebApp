import type { Assessment } from "@/types";

export const assessments: Assessment[] = [
  // ---------------------------------------------------------------------------
  // 1. WEEK 1 QUIZ: Python Basics (Days 1-7)
  // ---------------------------------------------------------------------------
  {
    id: "week-1-quiz",
    title: "Week 1 Quiz: Python Basics",
    description:
      "Covers Days 1 to 7: variables, data types, operators, if/else, and while loops. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        type: "multiple-choice",
        question: "Which loop keeps running as long as its condition is True?",
        options: ["for loop", "while loop", "if loop", "do loop"],
        correct: 1,
        explanation:
          "A while loop checks a condition and keeps running the code inside it as long as the condition stays True.",
      },
      {
        id: 5,
        type: "true-false",
        question: "The variable name '1stPlace' is a valid Python variable name.",
        correctBool: false,
        explanation:
          "Python variable names cannot start with a digit. They must begin with a letter or underscore, so 'first_place' or 'place1' would be valid.",
      },
      {
        id: 6,
        type: "fill-blank",
        question:
          "The data type for whole numbers like the number of cricket balls in an over (6) is called ____. (Three letters.)",
        answer: "int",
        explanation:
          "Whole numbers in Python are called 'int' (short for integer). Numbers with decimal points are called 'float'.",
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What does the print() function do?",
        options: [
          "Saves a file to disk",
          "Displays output on the screen",
          "Pauses the program forever",
          "Imports a module",
        ],
        correct: 1,
        explanation:
          "print() shows text (or other values) on the screen so the user can see it. It is the most common way to display output.",
      },
      {
        id: 8,
        type: "true-false",
        question: "Python is case-sensitive, so 'score' and 'Score' are different variables.",
        correctBool: true,
        explanation:
          "Python treats uppercase and lowercase letters as different. So 'score', 'Score', and 'SCORE' would be three different variables.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "In Python, a comment starts with the symbol ____. (One character.)",
        answer: "#",
        explanation:
          "Anything after a # on a line is a comment and is ignored by Python. Comments are notes for humans reading the code.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What data type is the value 3.14 (the price of a cricket ball)?",
        options: ["int", "float", "str", "bool"],
        correct: 1,
        explanation:
          "Numbers with a decimal point are floats. Whole numbers without decimals are ints. So 3.14 is a float, but 6 (balls in an over) is an int.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question:
          "What does this code print?\nweather = \"rainy\"\nif weather == \"sunny\":\n    print(\"Play cricket\")\nelif weather == \"rainy\":\n    print(\"Play Minecraft\")\nelse:\n    print(\"Read a book\")",
        options: ["Play cricket", "Play Minecraft", "Read a book", "Nothing"],
        correct: 1,
        explanation:
          "The weather is 'rainy', so the first condition fails, the elif condition matches, and 'Play Minecraft' prints.",
      },
      {
        id: 12,
        type: "true-false",
        question: "An infinite while loop happens when the condition never becomes False.",
        correctBool: true,
        explanation:
          "If the condition is always True (for example 'while True:') the loop never stops. You usually need to update a variable inside the loop so the condition can become False.",
      },
      {
        id: 13,
        type: "fill-blank",
        question:
          "The operator used to get the remainder (like 7 % 2 gives 1) is called the ____ operator.",
        answer: "modulus",
        explanation:
          "The % operator is called the modulus (or modulo) operator. It gives the remainder after dividing. For example, 7 % 2 is 1 because 2 goes into 7 three times with 1 left over.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "Which of these is NOT a valid comparison operator in Python?",
        options: ["==", "!=", "<=", "><"],
        correct: 3,
        explanation:
          "Python uses == (equal), != (not equal), <= (less than or equal), and >= (greater than or equal). There is no '><' operator.",
      },
      {
        id: 16,
        type: "true-false",
        question:
          "The line `age = input(\"Your age? \")` returns a string, even if the user types a number.",
        correctBool: true,
        explanation:
          "input() always returns a string. To use the value as a number, you must convert it with int() or float() first, like int(input(\"Your age? \")).",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "To combine two conditions where BOTH must be true, you use the keyword ____. (Three letters.)",
        answer: "and",
        explanation:
          "The 'and' keyword combines two conditions and is True only when both are True. For example, if age >= 13 and age <= 19, the person is a teenager.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "What does 7 // 2 evaluate to?",
        options: ["3.5", "3", "4", "3.0"],
        correct: 1,
        explanation:
          "The // operator is integer (floor) division. It divides and rounds down, so 7 // 2 is 3 (a whole number, not 3.5).",
      },
      {
        id: 20,
        type: "true-false",
        question: "The == operator checks equality, while = assigns a value.",
        correctBool: true,
        explanation:
          "This is a common beginner mix-up. Use = to store a value in a variable, and use == inside an if statement to compare two values.",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "In an if/elif/else chain, the keyword ____ runs only when no other condition was true.",
        answer: "else",
        explanation:
          "The else block is the fallback. If none of the if or elif conditions match, the else block runs. You can only have one else per chain.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `x = 7
print(x % 2 == 0)`,
        answer: "False",
        explanation:
          "7 % 2 is 1 (the remainder), which is not equal to 0, so the expression x % 2 == 0 is False. Python prints False with a capital F.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "Which of these correctly uses an f-string to greet Aarav?",
        options: [
          'f"Hello, {name}!"',
          '"Hello, {name}!"',
          '"Hello, " + {name}',
          "fHello, {name}!",
        ],
        correct: 0,
        explanation:
          "An f-string starts with the letter f right before the opening quote. The {name} placeholder gets replaced with the value of the name variable.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `a = 5
b = 10
c = 5
print(a < b and a == c)`,
        answer: "True",
        explanation:
          "a < b is True (5 is less than 10), and a == c is True (5 equals 5). Both are True, so the 'and' result is True.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question:
          "What is the output?\nx = 5\nif x > 3:\n    if x < 10:\n        print(\"A\")\n    else:\n        print(\"B\")\nelse:\n    print(\"C\")",
        options: ["A", "B", "C", "Nothing"],
        correct: 0,
        explanation:
          "x is 5, which is greater than 3, so we enter the outer if. Then 5 is less than 10, so the inner if is True and 'A' prints.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "When Python evaluates `not (5 > 3)`, the result is ____. (True or False, with a capital first letter.)",
        answer: "False",
        explanation:
          "5 > 3 is True, and 'not True' is False. The 'not' keyword flips the boolean value.",
      },
      {
        id: 27,
        type: "true-false",
        question: "In Python, you can chain comparisons like 5 < x < 10 and it works as expected.",
        correctBool: true,
        explanation:
          "Python allows chained comparisons. '5 < x < 10' is shorthand for '5 < x and x < 10'. For x = 7, the result is True.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `count = 3
while count > 0:
    print(count)
    count -= 1`,
        answer: "3\n2\n1",
        explanation:
          "The loop prints count, then subtracts 1. It prints 3, then 2, then 1, then count becomes 0 and the loop ends. Each print is on a new line.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question:
          "What gets printed?\ntotal = 0\ni = 1\nwhile i <= 3:\n    total += i\n    i += 1\nprint(total)",
        options: ["3", "5", "6", "10"],
        correct: 2,
        explanation:
          "This is the accumulator pattern. i takes the values 1, 2, 3 and total adds them: 1 + 2 + 3 = 6. So total is 6 when the loop ends.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "In Python, an empty string \"\" is treated as ____ in a boolean context (like inside an if). (True or False, with a capital first letter.)",
        answer: "False",
        explanation:
          "Empty strings, empty lists, 0, and None are all 'falsy' in Python. So if \"\": would not run. Non-empty values are 'truthy'.",
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
      "Covers Days 8 to 14: for loops, nested loops, functions, lists, dictionaries, tuples, sets, and strings. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        type: "multiple-choice",
        question: "What keyword defines a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
        explanation:
          "The 'def' keyword starts a function definition. For example: 'def greet(name):' creates a function called greet.",
      },
      {
        id: 5,
        type: "true-false",
        question: "A tuple is similar to a list, but you cannot change its values after it is created.",
        correctBool: true,
        explanation:
          "Tuples use parentheses and are immutable, meaning once created, the values cannot be changed. Lists use square brackets and are mutable.",
      },
      {
        id: 6,
        type: "fill-blank",
        question:
          "A dictionary stores data in ____-value pairs. (Fill in the word for the first part of each pair, like 'name' or 'age'.)",
        answer: "key",
        explanation:
          "Dictionaries use key-value pairs. For example {'name': 'Aarav', 'age': 13} has keys 'name' and 'age' with their values.",
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What does this code print?\nheroes = [\"Iron Man\", \"Spider-Man\", \"Hulk\"]\nprint(heroes[1])",
        options: ["Iron Man", "Spider-Man", "Hulk", "Error"],
        correct: 1,
        explanation:
          "Python lists are zero-indexed, so heroes[0] is 'Iron Man', heroes[1] is 'Spider-Man', and heroes[2] is 'Hulk'.",
      },
      {
        id: 8,
        type: "true-false",
        question: "A set in Python automatically removes duplicate values.",
        correctBool: true,
        explanation:
          "Sets only keep unique items. If you create {1, 2, 2, 3}, it becomes {1, 2, 3} because duplicates are dropped.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "To add a new item to the end of a list called scores, you write scores.____(99).",
        answer: "append",
        explanation:
          "The .append() method adds one item to the end of a list. After scores.append(99), the value 99 is the last item in scores.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What does len(\"Minecraft\") return?",
        options: ["8", "9", "10", "Error"],
        correct: 1,
        explanation:
          "'Minecraft' has 9 characters: M, i, n, e, c, r, a, f, t. len() counts each character, including letters but not the surrounding quotes.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question:
          "What does this code print?\nfor i in range(2):\n    for j in range(2):\n        print(i, j)",
        options: ["0 0 then 0 1", "0 0 then 1 1", "0 0, 0 1, 1 0, 1 1", "0 1 then 2 3"],
        correct: 2,
        explanation:
          "The outer loop runs i = 0, then 1. For each i, the inner loop runs j = 0, then 1. So all four combinations print: (0,0), (0,1), (1,0), (1,1).",
      },
      {
        id: 12,
        type: "true-false",
        question: "Strings in Python are immutable, meaning you cannot change them in place after creation.",
        correctBool: true,
        explanation:
          "You cannot change characters in a string directly. Operations like .upper() return a new string instead of changing the original.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "The keyword used in a function to send a value back to the caller is ____.",
        answer: "return",
        explanation:
          "The return keyword sends a value back to whoever called the function. Without return, a function returns None by default.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "What does the .get() method on a dictionary do?",
        options: [
          "Adds a new key",
          "Returns the value for a key, or None if the key is missing",
          "Deletes a key",
          "Sorts the dictionary",
        ],
        correct: 1,
        explanation:
          "scores.get('Aarav') returns Aarav's score, or None if 'Aarav' is not a key. This avoids a KeyError when the key is missing.",
      },
      {
        id: 16,
        type: "true-false",
        question: "A for loop can iterate over the characters of a string.",
        correctBool: true,
        explanation:
          "Strings are sequences, so you can loop over them. For example: 'for ch in \"Aarav\":' loops through A, a, r, a, v one at a time.",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "To loop over both the index and the value of a list at the same time, you use the ____() function.",
        answer: "enumerate",
        explanation:
          "enumerate(cars) gives you pairs like (0, 'Tesla'), (1, 'BMW'), and so on. It is handy when you need both the position and the value.",
      },
      {
        id: 18,
        type: "code-output",
        question: "What does this code print?",
        code: `cars = ["Tesla", "BMW", "Audi"]
print(cars[-1])`,
        answer: "Audi",
        explanation:
          "Negative indices count from the end. cars[-1] is the last item, 'Audi'. cars[-2] would be 'BMW'.",
      },
      {
        id: 19,
        type: "multiple-choice",
        question: "Which list method removes the last item and returns it?",
        options: [".remove()", ".pop()", ".delete()", ".drop()"],
        correct: 1,
        explanation:
          ".pop() removes and returns the last item (or the item at a given index). .remove() deletes by value instead.",
      },
      {
        id: 20,
        type: "true-false",
        question: "You can use a for loop to iterate over the keys of a dictionary.",
        correctBool: true,
        explanation:
          "For example: 'for key in scores:' loops over each key in the dictionary. You can also use .keys(), .values(), or .items().",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "To split the string \"Aarav loves cricket\" into a list of words, you call the ____() method.",
        answer: "split",
        explanation:
          "split() breaks a string into a list of words using spaces (by default). 'Aarav loves cricket'.split() gives ['Aarav', 'loves', 'cricket'].",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `scores = {"Aarav": 99, "Riya": 87}
print(scores["Riya"])`,
        answer: "87",
        explanation:
          "You access a dictionary value by its key in square brackets. scores['Riya'] returns the value 87.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What does \"minecraft\".upper() return?",
        options: ["Minecraft", "MINECRAFT", "minecraft", "Minecraft."],
        correct: 1,
        explanation:
          ".upper() returns a new string with all letters in uppercase. So 'minecraft'.upper() is 'MINECRAFT'. The original string is not changed.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `def f(n):
    return n * n
print(f(6))`,
        answer: "36",
        explanation:
          "f(6) returns 6 * 6, which is 36. This is a simple squaring function.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question:
          "What is the output?\nnums = [1, 2, 3, 4]\nnums.append(5)\nprint(len(nums))",
        options: ["4", "5", "6", "Error"],
        correct: 1,
        explanation:
          "The list starts with 4 items. After append(5), it has 5 items, so len(nums) is 5.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "When you call a function with too few arguments, Python raises a ____Error. (Fill in the type name.)",
        answer: "Type",
        explanation:
          "Missing arguments cause a TypeError like 'missing 1 required positional argument'. You can fix it by adding default values to parameters.",
      },
      {
        id: 27,
        type: "true-false",
        question: "The .sort() method sorts the list in place and returns None.",
        correctBool: true,
        explanation:
          ".sort() changes the original list and returns None. If you want a new sorted list without changing the original, use sorted(list) instead.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `words = ["apple", "banana", "cherry"]
print(words[0][0])`,
        answer: "a",
        explanation:
          "words[0] is 'apple', and 'apple'[0] is 'a'. You can index into a string just like a list, since strings are sequences.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question:
          "What does this print?\ndef greet(name=\"Friend\"):\n    return f\"Hi, {name}\"\nprint(greet())",
        options: ["Hi, ", "Hi, Friend", "Hi, name", "Error"],
        correct: 1,
        explanation:
          "When you call greet() with no argument, the default value 'Friend' is used. So the function returns 'Hi, Friend'.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "In a nested loop with outer range(3) and inner range(4), the inner body runs a total of ____ times.",
        answer: "12",
        explanation:
          "The total number of inner runs is the product: 3 times 4 = 12. Each outer iteration runs the inner loop fully.",
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
      "Covers Days 15 to 21: file handling, exceptions, AI intro, ML vs DL, neural networks, transformers, LLMs, and tokens. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        type: "multiple-choice",
        question: "What does the open() function return?",
        options: ["A string", "A file object", "A number", "A list"],
        correct: 1,
        explanation:
          "open() returns a file object that you can read from or write to. Always close it, or use a 'with' block to close it automatically.",
      },
      {
        id: 5,
        type: "true-false",
        question: "A neural network is loosely inspired by how the human brain works.",
        correctBool: true,
        explanation:
          "Neural networks use artificial 'neurons' connected together, similar in idea to neurons in the brain, though they are much simpler.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "GPT models are based on an architecture called the ____. (Singular noun.)",
        answer: "transformer",
        explanation:
          "The Transformer architecture, introduced in 2017, is the foundation of modern language models like GPT, Claude, and Gemini.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "An LLM can sometimes generate text that sounds true but is actually false.",
        correctBool: true,
        explanation:
          "This is called a hallucination. LLMs predict likely next words based on patterns, but they do not actually know what is true, so they can invent facts.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "The keyword used to catch an error in a try/except block is ____.",
        answer: "except",
        explanation:
          "Code in the try block runs first. If it raises an error, the except block runs. You can catch specific errors like except ValueError.",
      },
      {
        id: 10,
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
          "The 'with' statement automatically closes the file when the block ends, even if an error happens. This is the safest way to open files.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
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
        id: 12,
        type: "true-false",
        question: "The 'with' statement automatically closes the file when the block ends.",
        correctBool: true,
        explanation:
          "The 'with' block calls __exit__ for you, which closes the file. You do not need to call f.close() yourself when using 'with'.",
      },
      {
        id: 13,
        type: "fill-blank",
        question:
          "When a program tries to open a file that does not exist, Python raises a ____Error. (Fill in the type name.)",
        answer: "FileNotFound",
        explanation:
          "FileNotFoundError is raised when open() cannot find the file. You can catch it with except FileNotFoundError.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "What is the full form of LLM?",
        options: [
          "Long Language Memory",
          "Large Language Model",
          "Logical Language Method",
          "Learning Loop Machine",
        ],
        correct: 1,
        explanation:
          "LLM stands for Large Language Model. GPT, Claude, and Gemini are all examples of LLMs.",
      },
      {
        id: 16,
        type: "true-false",
        question: "A syntax error happens when your code does not follow Python's grammar rules.",
        correctBool: true,
        explanation:
          "A syntax error (like a missing colon or parenthesis) means Python cannot even start running your code. It is different from a runtime error.",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "The part of an LLM that splits text into pieces and maps them to numbers is the ____.",
        answer: "tokenizer",
        explanation:
          "A tokenizer splits text into tokens and maps each one to a number, because neural networks work with numbers, not text.",
      },
      {
        id: 18,
        type: "code-output",
        question: "What does this code print?",
        code: `text = "Aarav loves cricket"
print(len(text.split()))`,
        answer: "3",
        explanation:
          "split() breaks the string into a list of words: ['Aarav', 'loves', 'cricket']. len() counts 3 words.",
      },
      {
        id: 19,
        type: "multiple-choice",
        question: "What is a 'hallucination' in the context of LLMs?",
        options: [
          "The model sees images",
          "The model gives a confident answer that is actually false",
          "The model falls asleep",
          "The model repeats words forever",
        ],
        correct: 1,
        explanation:
          "A hallucination is when an LLM produces text that sounds confident but is wrong or made up. It is a major challenge when using LLMs.",
      },
      {
        id: 20,
        type: "true-false",
        question: "A 'with' block keeps the file open until the program ends.",
        correctBool: false,
        explanation:
          "The 'with' block closes the file as soon as the block ends, not when the program ends. That is the whole point of using 'with'.",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "In a neural network, each artificial ____ receives inputs and produces an output.",
        answer: "neuron",
        explanation:
          "An artificial neuron (or node) takes inputs, multiplies them by weights, adds a bias, and applies an activation function to produce an output.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `with open("scores.txt", "w") as f:
    f.write("50")
print("done")`,
        answer: "done",
        explanation:
          "The 'with' block opens the file, writes '50' to it, and closes it. Then print('done') runs, so the output is 'done'.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What does file.read() do?",
        options: [
          "Reads one line",
          "Reads the whole file as a single string",
          "Writes to the file",
          "Lists files in a folder",
        ],
        correct: 1,
        explanation:
          "file.read() returns the entire file contents as one string. To read one line at a time, use file.readline() or loop with 'for line in file:'.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `def safe_div(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "nope"
print(safe_div(10, 0))`,
        answer: "nope",
        explanation:
          "10 / 0 raises ZeroDivisionError, which is caught by the except block. The function returns 'nope', and that is what prints.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question:
          "What gets printed?\ntry:\n    x = 10 / 0\n    print(\"A\")\nexcept ZeroDivisionError:\n    print(\"B\")",
        options: ["A", "B", "A then B", "Nothing"],
        correct: 1,
        explanation:
          "The division by zero raises an error before 'print(\"A\")' runs. The except block catches it and prints 'B'.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "The type of error raised when you try to convert \"abc\" to int using int(\"abc\") is ____Error.",
        answer: "Value",
        explanation:
          "int('abc') raises ValueError because 'abc' is not a valid number. You can catch it with except ValueError.",
      },
      {
        id: 27,
        type: "true-false",
        question: "A larger neural network with more layers is always better than a smaller one.",
        correctBool: false,
        explanation:
          "Bigger is not always better. Larger models need more data and compute, can overfit, and may be slower and more expensive. The right size depends on the task.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `words = ["cricket", "car", "ai"]
print(max(words, key=len))`,
        answer: "cricket",
        explanation:
          "max() with key=len returns the item with the longest length. 'cricket' has 7 letters, 'car' has 3, 'ai' has 2. So 'cricket' wins.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "Why might an LLM give different answers to the same question?",
        options: [
          "It forgets the question",
          "It samples tokens with some randomness, controlled by temperature",
          "It cannot read the question",
          "It always gives the same answer",
        ],
        correct: 1,
        explanation:
          "LLMs sample the next token from a probability distribution. Higher temperature means more randomness, so the same prompt can give different answers.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "A chatbot that admits 'I don't know' instead of inventing facts shows fewer ____. (Plural noun.)",
        answer: "hallucinations",
        explanation:
          "Teaching the model to admit uncertainty, and grounding it with real context (like RAG), reduces hallucinations. There is no way to remove them completely though.",
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
      "Covers Days 22 to 25: prompt engineering, hallucinations, RAG, fine-tuning, agents, tool calling, REST APIs, and JSON. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        question: "A hallucination in AI means the model gives a confident answer that is actually false.",
        correctBool: true,
        explanation:
          "A hallucination is when the model produces text that sounds confident but is wrong or made up. It is not just an unexpected answer, it is a wrong one.",
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
        type: "multiple-choice",
        question: "What does 'fine-tuning' mean?",
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
        id: 5,
        type: "true-false",
        question: "An AI agent can decide to call a tool (like a calculator) on its own.",
        correctBool: true,
        explanation:
          "Agents are LLMs given the ability to use tools. They can decide when to call a calculator, search the web, or run code based on the user's request.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "REST APIs usually communicate using data in a format called ____. (Four-letter abbreviation.)",
        answer: "JSON",
        explanation:
          "REST APIs send and receive data as JSON (JavaScript Object Notation), which is lightweight and easy for both humans and machines to read.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "JSON keys must be wrapped in double quotes.",
        correctBool: true,
        explanation:
          "In JSON, keys and string values must use double quotes. Single quotes are not valid JSON, even though Python dictionaries allow both.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "The system ____ sets the model's role and behavior for the whole chat.",
        answer: "prompt",
        explanation:
          "A system prompt tells the LLM how to behave, like 'You are a friendly cricket coach for a 13-year-old.' It shapes tone and focus for the whole conversation.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is a 'context window' in an LLM?",
        options: [
          "A glass window",
          "The amount of text the model can consider at once",
          "A type of error",
          "A type of model",
        ],
        correct: 1,
        explanation:
          "The context window is the maximum number of tokens the model can take in (input plus output). If your text is too long, the model cannot read it all.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does json.dumps() do?",
        options: [
          "Converts a JSON string to a Python object",
          "Converts a Python object to a JSON string",
          "Deletes a file",
          "Runs a function",
        ],
        correct: 1,
        explanation:
          "json.dumps() (dump string) takes a Python dict or list and returns a JSON-formatted string. json.loads() does the opposite.",
      },
      {
        id: 12,
        type: "true-false",
        question: "Lower temperature in an LLM call usually gives more predictable answers.",
        correctBool: true,
        explanation:
          "Temperature controls randomness. Low temperature (like 0) makes the model pick the most likely tokens, so answers are more deterministic.",
      },
      {
        id: 13,
        type: "fill-blank",
        question:
          "The 'few-shot' prompting technique shows the model ____ in the prompt to guide it.",
        answer: "examples",
        explanation:
          "Few-shot prompting gives the model a few example input-output pairs in the prompt, so it learns the pattern before answering the real question.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "What is the main purpose of RAG?",
        options: [
          "Compress the model",
          "Let the LLM use information it was not trained on, like private documents",
          "Train the model from scratch",
          "Speed up the API",
        ],
        correct: 1,
        explanation:
          "RAG retrieves relevant documents and gives them to the LLM as context, so the model can answer questions about new or private data.",
      },
      {
        id: 16,
        type: "true-false",
        question: "Fine-tuning changes the weights of the existing model.",
        correctBool: true,
        explanation:
          "Fine-tuning continues training, so the model's weights are updated to perform better on a specific task. This is different from prompting, which does not change weights.",
      },
      {
        id: 17,
        type: "fill-blank",
        question: "An LLM that can search the web or run code on its own is called an ____.",
        answer: "agent",
        explanation:
          "An agent is an LLM with the ability to use tools and decide on its next step. Agents can plan, call tools, and use the results to keep going.",
      },
      {
        id: 18,
        type: "code-output",
        question: "What does this code print?",
        code: `prompt = "Translate to French: hello"
print(len(prompt))`,
        answer: "26",
        explanation:
          "The string 'Translate to French: hello' has 26 characters, including spaces and the colon. len() counts every character.",
      },
      {
        id: 19,
        type: "multiple-choice",
        question: "What HTTP method is most often used to send a request that fetches data?",
        options: ["POST", "GET", "DELETE", "PATCH"],
        correct: 1,
        explanation:
          "GET is used to retrieve data. POST is used to send new data, PATCH to update, and DELETE to remove. REST APIs follow these conventions.",
      },
      {
        id: 20,
        type: "true-false",
        question: "A system prompt shapes the model's tone and behavior.",
        correctBool: true,
        explanation:
          "The system prompt is the highest-level instruction, like 'Be concise and friendly.' It affects every answer in the conversation.",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "In JSON, the boolean values true and false are written in all ____ letters.",
        answer: "lower",
        explanation:
          "JSON uses lowercase 'true' and 'false'. Python uses 'True' and 'False' with capital first letters, so json.dumps() converts them automatically.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `import json
s = '{"a": 1, "b": 2}'
d = json.loads(s)
print(d["a"] + d["b"])`,
        answer: "3",
        explanation:
          "json.loads() turns the JSON string into a Python dict. d['a'] is 1 and d['b'] is 2, so 1 + 2 = 3.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "Which of these is valid JSON for an object?",
        options: [
          "{name: 'Aarav'}",
          '{"name": "Aarav"}',
          "[name: 'Aarav']",
          "<name>Aarav</name>",
        ],
        correct: 1,
        explanation:
          "JSON objects use curly braces, double-quoted keys, and double-quoted strings. The other options are not valid JSON.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `import json
data = {"cars": ["Tesla", "BMW"]}
print(data["cars"][1])`,
        answer: "BMW",
        explanation:
          "data['cars'] is the list ['Tesla', 'BMW']. Index 1 is 'BMW'. JSON values can be arrays, which become Python lists after json.loads().",
      },
      {
        id: 25,
        type: "multiple-choice",
        question: "Which scenario best matches 'fine-tuning' instead of 'prompt engineering'?",
        options: [
          "Rewording your prompt to be clearer",
          "Training the model on 500 medical Q&A pairs so it answers better",
          "Adding examples to the prompt",
          "Switching to a different model",
        ],
        correct: 1,
        explanation:
          "Fine-tuning updates model weights by training on extra data. Prompt engineering only changes the input text and does not touch the weights.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "In a RAG pipeline, the step that finds the most relevant chunks of text is called ____.",
        answer: "retrieval",
        explanation:
          "Retrieval searches a knowledge store (often a vector database) for the most relevant chunks, then passes them to the LLM as context for generation.",
      },
      {
        id: 27,
        type: "true-false",
        question: "A high temperature (like 1.5) makes an LLM's answers more random and creative.",
        correctBool: true,
        explanation:
          "Higher temperature flattens the probability distribution, so less likely tokens get picked more often. This makes answers more varied and creative.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `roles = ["system", "user", "assistant"]
print(roles[-1])`,
        answer: "assistant",
        explanation:
          "Negative indices count from the end. roles[-1] is the last item, 'assistant'.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "What is a common risk of letting an agent call tools automatically?",
        options: [
          "The agent charges rent",
          "The agent may call the wrong tool or run harmful commands if not restricted",
          "The agent stops responding",
          "Nothing, it is always safe",
        ],
        correct: 1,
        explanation:
          "Agents can act on the world, so they need guardrails. Without limits on which tools they can call and how, they might do something unsafe.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "The standard data format that uses curly braces and quoted keys, common in REST APIs, is ____.",
        answer: "JSON",
        explanation:
          "JSON (JavaScript Object Notation) is the most common data format for REST APIs. It uses curly braces for objects and square brackets for arrays.",
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
      "Covers Days 26 to 30 (OpenRouter setup, chat, prompts, JSON responses) and Days 31 to 35 (LangChain intro, chains, memory, output parsing). 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 20,
    questions: [
      // --- EASY (1-10) ---
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
        type: "multiple-choice",
        question: "What library do we use in Python to make HTTP requests to OpenRouter?",
        options: ["requests", "torch", "numpy", "pandas"],
        correct: 0,
        explanation:
          "The requests library is the standard way to send HTTP requests in Python. You can also use httpx or the openai SDK with OpenRouter's base URL.",
      },
      {
        id: 5,
        type: "true-false",
        question: "LangChain is a framework that helps you build apps powered by LLMs.",
        correctBool: true,
        explanation:
          "LangChain provides tools for chains, memory, document loaders, agents, and more, making it easier to build LLM apps without writing everything from scratch.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "A LangChain ____ links multiple steps together, like prompt then model then output parser.",
        answer: "chain",
        explanation:
          "A chain combines components in a sequence. For example: prompt | model | parser forms a chain that takes input and returns a final answer.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "An output parser takes the raw text from an LLM and turns it into a structured format.",
        correctBool: true,
        explanation:
          "Output parsers convert LLM responses into structured data. For example, JsonOutputParser can turn an LLM reply into a Python dict.",
      },
      {
        id: 9,
        type: "fill-blank",
        question:
          "To ask the LLM to reply in a strict machine-readable format, you ask for a ____ response. (Four-letter abbreviation.)",
        answer: "JSON",
        explanation:
          "JSON responses let your code read the LLM output easily. You can ask the model: 'Reply only in JSON with keys name and age.'",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "In a LangChain chat template, the {question} part is called a ____.",
        options: ["constant", "variable", "loop", "class"],
        correct: 1,
        explanation:
          "The curly braces mark a variable that gets filled in at runtime. LangChain looks at the template and lists each variable in input_variables.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does the | (pipe) operator do in LangChain?",
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
        id: 12,
        type: "true-false",
        question: "A 'system' message in a chat sets the model's behavior for the whole conversation.",
        correctBool: true,
        explanation:
          "The system message is sent first and shapes the model's tone and focus. For example: 'You are a friendly cricket coach for a 13-year-old.'",
      },
      {
        id: 13,
        type: "fill-blank",
        question:
          "The Python library 'requests' uses a function called ____() to send an HTTP GET request.",
        answer: "get",
        explanation:
          "requests.get('https://example.com') sends a GET request and returns a Response object. You can then read response.json() or response.text.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "Which LangChain component formats the user's input before sending to the model?",
        options: ["Memory", "Prompt template", "Parser", "Vector store"],
        correct: 1,
        explanation:
          "The prompt template takes variables like {question} and fills them into a ready-to-send prompt. It is usually the first step in a chain.",
      },
      {
        id: 16,
        type: "true-false",
        question: "In OpenRouter, you can switch models by changing the model name in the request body.",
        correctBool: true,
        explanation:
          "OpenRouter uses a 'model' field in the request body. Change it from 'openai/gpt-4o-mini' to 'anthropic/claude-3-haiku' and you call a different model with the same code.",
      },
      {
        id: 17,
        type: "fill-blank",
        question: "The HTTP status code that means 'success' for a request is ____.",
        answer: "200",
        explanation:
          "200 OK means the request succeeded. 400 means a bad request, 401 means unauthorized (check your API key), and 500 means a server error.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "What is the role of an output parser in a LangChain chain?",
        options: [
          "Sends the prompt to the API",
          "Turns LLM output into a structured Python object",
          "Stores memory between turns",
          "Lists available models",
        ],
        correct: 1,
        explanation:
          "The parser takes the raw text the model returns and converts it. For example, JsonOutputParser turns JSON text into a Python dict.",
      },
      {
        id: 20,
        type: "true-false",
        question: "ConversationBufferMemory stores all past messages in the conversation.",
        correctBool: true,
        explanation:
          "Buffer memory keeps every message. For long chats, you might use ConversationSummaryMemory instead, which summarizes older turns to save tokens.",
      },
      {
        id: 21,
        type: "fill-blank",
        question: "In a chat, the '____' role is used for messages from the human user.",
        answer: "user",
        explanation:
          "The three common roles are 'system' (behavior), 'user' (human input), and 'assistant' (model replies).",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `response = {"choices": [{"message": {"content": "Hello Aarav"}}]}
print(response["choices"][0]["message"]["content"])`,
        answer: "Hello Aarav",
        explanation:
          "You walk down the nested dictionaries: choices is a list, take index 0, then message, then content. This gives the text 'Hello Aarav'.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "Which of these is a valid way to ask the model to reply in JSON?",
        options: [
          "Tell the model to 'reply only in JSON with these keys'",
          "Just hope for it",
          "Send an empty prompt",
          "Use a bigger model",
        ],
        correct: 0,
        explanation:
          "Being explicit works best. Say 'Reply only in valid JSON with keys name and age, no extra text.' You can also use response_format if the model supports it.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `def clean_json(text):
    if text.startswith("{"):
        return "object"
    return "other"
print(clean_json('{"a": 1}'))`,
        answer: "object",
        explanation:
          "The string starts with '{', so startswith('{') is True and the function returns 'object'. This is a simple way to guess if a response is a JSON object.",
      },
      {
        id: 25,
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
        id: 26,
        type: "fill-blank",
        question: "The unit that API providers use to bill you for an LLM call is the ____.",
        answer: "token",
        explanation:
          "Pricing is per token (often per 1,000 or 1,000,000 tokens). Both input and output tokens are counted, with output usually costing more.",
      },
      {
        id: 27,
        type: "true-false",
        question:
          "If you forget to add the output parser at the end of the chain, you get raw model text instead of a structured object.",
        correctBool: true,
        explanation:
          "Without the parser, the chain ends at the model step and returns a raw message object. The parser is what turns that text into a clean dict or list.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `history = [("user", "hi"), ("assistant", "hello"), ("user", "bye")]
print(sum(1 for r, _ in history if r == "user"))`,
        answer: "2",
        explanation:
          "The generator counts items where the role is 'user'. There are two such items ('hi' and 'bye'), so sum() returns 2.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "Why is it risky to hard-code your API key in your script?",
        options: [
          "It is faster",
          "If you share the code, anyone can use your key and rack up your bill",
          "It uses more memory",
          "It is illegal",
        ],
        correct: 1,
        explanation:
          "Hard-coded keys leak when you share or commit code. Use environment variables instead, and never push keys to GitHub.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "A common pattern is to keep the API key in an environment variable named OPENROUTER_API_KEY, and read it with os.____().",
        answer: "getenv",
        explanation:
          "os.getenv('OPENROUTER_API_KEY') reads the value from your environment. If it is not set, it returns None, so you can check and warn the user.",
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
      "Covers Days 36 to 39: MCP concepts, basics, building a server, and connecting to LangChain. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        id: 5,
        type: "true-false",
        question: "LangChain can connect to an MCP server and use its tools.",
        correctBool: true,
        explanation:
          "LangChain has MCP adapters that turn an MCP server's tools into LangChain Tools, so your chains and agents can call them.",
      },
      {
        id: 6,
        type: "fill-blank",
        question:
          "The component that connects to an MCP server and uses its tools is called the MCP ____. (Starts with 'c'.)",
        answer: "client",
        explanation:
          "The client initiates the connection to the server, lists the available tools, and calls them when the LLM asks.",
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "Which decorator turns a Python function into an MCP tool?",
        options: ["@tool", "@mcp.tool()", "@function", "@toolify"],
        correct: 1,
        explanation:
          "The @mcp.tool() decorator registers a Python function as an MCP tool. The function's name, docstring, and type hints become the tool's schema.",
      },
      {
        id: 8,
        type: "true-false",
        question: "An MCP tool needs a name, a description, and a way to define its inputs.",
        correctBool: true,
        explanation:
          "Tools are defined with a name (what to call), a description (when to use it), and an input schema (what arguments it accepts). The LLM uses these to decide whether to call the tool.",
      },
      {
        id: 9,
        type: "fill-blank",
        question:
          "In MCP, a ____ is a piece of data the server shares, like a file or a database row. (Starts with 'r'.)",
        answer: "resource",
        explanation:
          "Resources are read-only data the server exposes, like a config file or a database table. Tools are functions; resources are data.",
      },
      {
        id: 10,
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
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does the MCP client do when it connects to a server?",
        options: [
          "Compiles the server",
          "Lists the available tools and can call them",
          "Deletes files",
          "Sends training data",
        ],
        correct: 1,
        explanation:
          "After connecting, the client asks the server what tools, resources, and prompts are available. Then it can call them when the LLM requests.",
      },
      {
        id: 12,
        type: "true-false",
        question: "MCP standardizes tool access so you write a tool once and any compatible client can use it.",
        correctBool: true,
        explanation:
          "This is the main value of MCP. Instead of writing one integration for OpenAI, another for Claude, and so on, you write one MCP server and they can all use it.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "The Python type hint for a parameter that should be a string is ____. (Three letters.)",
        answer: "str",
        explanation:
          "Use 'name: str' to mark a parameter as a string. MCP reads these type hints and turns them into the tool's input schema.",
      },
      {
        id: 14,
        type: "code-output",
        question: "What does this code print?",
        code: `tools = ["search", "calculator", "weather"]
print(tools[2])`,
        answer: "weather",
        explanation:
          "Lists are zero-indexed, so tools[0] is 'search', tools[1] is 'calculator', and tools[2] is 'weather'.",
      },
      {
        id: 15,
        type: "multiple-choice",
        question: "What is the purpose of a tool's description in MCP?",
        options: [
          "To make the code look pretty",
          "To tell the LLM when to use the tool",
          "To compile the code faster",
          "To set the tool's price",
        ],
        correct: 1,
        explanation:
          "The description is what the LLM reads to decide if the tool is the right one to call. A clear description helps the model pick correctly.",
      },
      {
        id: 16,
        type: "true-false",
        question: "MCP can expose both tools (functions you call) and resources (data you read).",
        correctBool: true,
        explanation:
          "Tools are actions the model can take, like searching. Resources are data the model can read, like a file or a database row.",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "When the LLM decides to call a tool, the client runs the function and sends the ____ back to the model.",
        answer: "result",
        explanation:
          "The client takes the tool's return value and feeds it back to the LLM as a new message, so the model can use that data to answer.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "Which of these best describes the relationship between client and server in MCP?",
        options: [
          "Server calls the client",
          "Client connects to the server to discover and use tools",
          "They are unrelated",
          "Server trains the client",
        ],
        correct: 1,
        explanation:
          "The client initiates the connection, lists what is available, and calls tools on request. The server just exposes tools, resources, and prompts.",
      },
      {
        id: 20,
        type: "true-false",
        question: "A single MCP server can expose many tools.",
        correctBool: true,
        explanation:
          "One server can register many tools. For example, a cricket server could expose get_score, get_players, and get_schedule all from one process.",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "A common way to start an MCP server in Python is to call mcp.____(). (Three letters.)",
        answer: "run",
        explanation:
          "mcp.run() starts the server's event loop so it can listen for incoming client connections. It blocks until you stop the server.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `server_tools = {"search": "find web pages", "calc": "do math"}
print(len(server_tools))`,
        answer: "2",
        explanation:
          "The dictionary has two keys ('search' and 'calc'), so len() returns 2. Each key maps to a description of what the tool does.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What does an MCP input schema describe?",
        options: [
          "The server's price",
          "The arguments a tool accepts, including their types",
          "The server's IP address",
          "The model's name",
        ],
        correct: 1,
        explanation:
          "The schema is a JSON description of the tool's arguments: their names, types, and whether they are required. The LLM reads it to know how to call the tool.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `def add(a: int, b: int) -> int:
    return a + b
print(add(2, 3))`,
        answer: "5",
        explanation:
          "The type hints (int) are not enforced at runtime, but they document the function and let MCP build a proper input schema. The result is 2 + 3 = 5.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question: "What happens if the LLM sends the wrong type of argument to a tool?",
        options: [
          "The tool always works",
          "The tool may raise a TypeError or fail validation",
          "The LLM crashes",
          "Nothing happens",
        ],
        correct: 1,
        explanation:
          "Python's type hints are not strict by default, but MCP servers often validate inputs. Bad types can cause TypeErrors or validation failures, which the client catches and reports back to the LLM.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "To define a tool that takes a list of strings, you would use the type hint List[____]. (Three letters.)",
        answer: "str",
        explanation:
          "List[str] means a list of strings, like ['Aarav', 'Riya']. You import List from the typing module: 'from typing import List'.",
      },
      {
        id: 27,
        type: "true-false",
        question: "MCP tools can be used by agents to do things like search the web, read files, or query databases.",
        correctBool: true,
        explanation:
          "MCP tools are how agents take action in the world. A single agent can have many tools for different tasks, all exposed through one MCP server.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `import json
schema = {"name": "str", "age": "int"}
print(json.dumps(schema, sort_keys=True))`,
        answer: '{"age": "int", "name": "str"}',
        explanation:
          "sort_keys=True sorts the keys alphabetically, so 'age' comes before 'name'. The output is the JSON string with double quotes.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "Why might you wrap a tool call in a try/except?",
        options: [
          "To save tokens",
          "To handle errors like missing files or bad inputs gracefully",
          "To make it faster",
          "It is required by MCP",
        ],
        correct: 1,
        explanation:
          "Tools can fail for many reasons (missing file, bad input, network error). Wrapping in try/except lets you return a friendly error message to the LLM instead of crashing the server.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "The MCP protocol is built on top of JSON-____, a lightweight remote procedure call format.",
        answer: "RPC",
        explanation:
          "JSON-RPC (Remote Procedure Call) is the message format MCP uses to send requests and responses between client and server. It is text-based and easy to debug.",
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
      "Covers Days 40 to 43: Langfuse, integrating with LangChain, the assistant project, and model comparison. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
          "Langfuse is used to ____ LLM applications, so you can see what is happening inside them.",
        answer: "trace",
        explanation:
          "Tracing records each step of an LLM call (prompt, model, parser, tool) as a span inside a trace. You can then view the trace in the Langfuse dashboard.",
      },
      {
        id: 4,
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
        id: 5,
        type: "true-false",
        question: "Comparing models side by side helps you pick the best one for your task.",
        correctBool: true,
        explanation:
          "Different models have different strengths. By testing the same prompt on multiple models, you can see which gives better answers, costs less, or runs faster.",
      },
      {
        id: 6,
        type: "fill-blank",
        question:
          "The ____ project in week 7 is a Python program that answers questions using LLMs. (Starts with 'a'.)",
        answer: "assistant",
        explanation:
          "The assistant project brings together prompting, memory, parsing, and tracing to build a helpful chat assistant that Aarav can run from his terminal.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "Model comparison can save money by showing you which cheaper model performs well enough.",
        correctBool: true,
        explanation:
          "Sometimes a smaller, cheaper model gives answers just as good as a bigger one. Comparing them helps you balance quality and cost.",
      },
      {
        id: 9,
        type: "fill-blank",
        question:
          "The @____ decorator from Langfuse marks a function so each call is recorded as a trace.",
        answer: "observe",
        explanation:
          "@observe (from langfuse) wraps your function so each call is traced and visible in the Langfuse dashboard, including inputs, outputs, and timing.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is the main benefit of tracing an LLM app?",
        options: [
          "It runs faster",
          "You can see what is happening and find bugs",
          "It uses fewer tokens",
          "It changes the model",
        ],
        correct: 1,
        explanation:
          "Tracing shows you exactly what each step did. When something goes wrong (slow answer, bad response, error), you can find the step that caused it.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does a 'trace' in Langfuse typically contain?",
        options: [
          "Just the user's name",
          "One or more steps (spans) showing inputs, outputs, and timing",
          "Only the API key",
          "A list of files",
        ],
        correct: 1,
        explanation:
          "A trace is a tree of spans. Each span is one step (prompt, model call, tool call). Together they show the full path of one user request.",
      },
      {
        id: 12,
        type: "true-false",
        question: "Langfuse can record token usage and latency for each LLM call.",
        correctBool: true,
        explanation:
          "Each generation span can store input tokens, output tokens, total tokens, and how long the call took. This lets you track cost and speed over time.",
      },
      {
        id: 13,
        type: "fill-blank",
        question:
          "The dashboard where you view Langfuse traces is the Langfuse ____. (Two letters, the short form for user interface.)",
        answer: "UI",
        explanation:
          "The Langfuse UI shows your traces, generations, scores, and sessions. You can filter by user, by time, or by model to find what you need.",
      },
      {
        id: 14,
        type: "code-output",
        question: "What does this code print?",
        code: `trace = {"name": "spider-man-facts", "user": "aarav"}
print(trace.get("user"))`,
        answer: "aarav",
        explanation:
          "The .get() method on a dictionary returns the value for that key. trace.get('user') returns 'aarav'.",
      },
      {
        id: 15,
        type: "multiple-choice",
        question: "Why might a developer tag a trace with a user_id?",
        options: [
          "To make the trace longer",
          "To filter traces per user and debug issues for specific people",
          "To change the model",
          "To save tokens",
        ],
        correct: 1,
        explanation:
          "Tagging traces with a user_id lets you search for all activity by one user. If a user reports a bug, you can find their traces fast.",
      },
      {
        id: 16,
        type: "true-false",
        question: "A 'span' in Langfuse is a single step inside a larger trace.",
        correctBool: true,
        explanation:
          "A trace is the whole request, and spans are the steps inside it. Each prompt, model call, or tool call can be its own span.",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "To compare two models, you give them the same ____ and look at the answers side by side.",
        answer: "prompt",
        explanation:
          "Same prompt, same temperature, same settings: that is the fair way to compare. Otherwise you cannot tell if the difference is the model or the input.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "Which of these is a typical metric tracked by Langfuse?",
        options: [
          "Number of cars parked",
          "Token count and latency",
          "Screen brightness",
          "Disk size",
        ],
        correct: 1,
        explanation:
          "Token count (for cost) and latency (for speed) are core LLM metrics. Langfuse tracks them per call and aggregates them over time.",
      },
      {
        id: 20,
        type: "true-false",
        question: "Adding Langfuse tracing usually requires only small changes to existing LangChain code.",
        correctBool: true,
        explanation:
          "You typically add a callback handler or a decorator. The LLM calls themselves stay the same, so integration is low-effort.",
      },
      {
        id: 21,
        type: "fill-blank",
        question: "A 'generation' in Langfuse refers to a single call to an ____.",
        answer: "LLM",
        explanation:
          "A generation span is a single LLM call: the prompt sent, the response received, the tokens used, and the latency. Multiple generations can live in one trace.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `usage = {"prompt_tokens": 10, "completion_tokens": 5}
print(usage["prompt_tokens"] + usage["completion_tokens"])`,
        answer: "15",
        explanation:
          "Total tokens is prompt tokens plus completion tokens. Here, 10 + 5 = 15. This is the number Langfuse uses to estimate cost.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What is a good reason to compare models before picking one for production?",
        options: [
          "To use all the tokens",
          "Some models are faster, cheaper, or better for a specific task",
          "Because the API requires it",
          "There is no good reason",
        ],
        correct: 1,
        explanation:
          "Models vary in quality, speed, cost, and features. A 10-minute comparison test can save you money and improve your app.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `traces = [{"name": "a", "ms": 100}, {"name": "b", "ms": 250}]
slowest = max(traces, key=lambda t: t["ms"])
print(slowest["name"])`,
        answer: "b",
        explanation:
          "max() with a key function finds the trace with the largest ms value. Trace 'b' has 250 ms, which is more than 100, so 'b' prints.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question: "If a trace shows that step 3 of 5 took 80% of the total time, what is the best next step?",
        options: [
          "Delete step 3",
          "Investigate step 3 to see if it can be sped up or skipped",
          "Ignore it",
          "Add more steps",
        ],
        correct: 1,
        explanation:
          "This is exactly what tracing is for. Find the slow step, look at why it is slow (large prompt, slow tool, etc.), and decide if it can be sped up or removed.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "The total cost of an LLM call can be estimated by multiplying token count by price per ____.",
        answer: "token",
        explanation:
          "Most providers publish per-token prices. Langfuse can multiply your token counts by these prices to show cost per call and per day.",
      },
      {
        id: 27,
        type: "true-false",
        question:
          "A spike in error rate shown in Langfuse might mean a recent prompt or model change broke something.",
        correctBool: true,
        explanation:
          "Spikes usually follow a change. If you changed a prompt, swapped a model, or updated a tool, the error spike probably started right after. Check the timeline.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `results = {"gpt": 5, "claude": 5, "gemini": 4}
print(sum(results.values()))`,
        answer: "14",
        explanation:
          "results.values() gives [5, 5, 4]. sum() adds them up: 5 + 5 + 4 = 14.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "What is the main risk of comparing models on a single test prompt only?",
        options: [
          "It costs too much",
          "One prompt is not enough to judge; models vary by topic and style",
          "Models refuse single prompts",
          "Nothing, one prompt is fine",
        ],
        correct: 1,
        explanation:
          "A model might be great on one prompt and bad on the next. Use a set of diverse test prompts that cover your real use cases to get a fair comparison.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "In the assistant project, ____ stores recent chat history so the LLM can keep context.",
        answer: "memory",
        explanation:
          "Memory (like ConversationBufferMemory) keeps recent turns. Without it, the LLM would forget what the user just said two messages ago.",
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
      "Covers Days 44 to 48: system design, the capstone project, and the mock interview. 30 questions (10 easy, 13 medium, 7 hard).",
    passingScore: 70,
    timerMinutes: 15,
    questions: [
      // --- EASY (1-10) ---
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
        id: 5,
        type: "true-false",
        question: "It is okay if your first capstone prototype is simple; you can improve it later.",
        correctBool: true,
        explanation:
          "Prototypes are about learning. Start simple, get it working, then add features. This is how real software is built.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "In an interview, you should be able to explain ____ your code works, not just that it works.",
        answer: "why",
        explanation:
          "Interviewers want to understand your thinking. Explaining why you chose a certain approach shows you understand the trade-offs and ideas.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "Documenting your project (with a README) helps others understand and use it.",
        correctBool: true,
        explanation:
          "A README explains what your project does, how to install and run it, and any important notes. Good documentation is a sign of a real developer.",
      },
      {
        id: 9,
        type: "fill-blank",
        question:
          "The file in your project that explains what it does and how to run it is usually called ____.",
        answer: "README",
        explanation:
          "A README (often README.md) is the front page of a project. It should describe the project, list dependencies, and show how to run it.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is a 'prototype'?",
        options: [
          "The final shipped product",
          "An early, simple version you build to learn from",
          "A type of computer",
          "A type of model",
        ],
        correct: 1,
        explanation:
          "A prototype is a quick, simple version of your idea. It helps you learn what works before you spend time on the polished version.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "Which of these is a typical component of an AI assistant system?",
        options: [
          "A steering wheel",
          "A prompt template, an LLM, and memory",
          "A type of paint",
          "A guitar pick",
        ],
        correct: 1,
        explanation:
          "Most AI assistants have a prompt template (to format input), an LLM (to generate answers), and memory (to remember the conversation). Some also have tools.",
      },
      {
        id: 12,
        type: "true-false",
        question: "When designing a system, you should think about how data flows between components.",
        correctBool: true,
        explanation:
          "Data flow is a key design question. What does the user send in? What gets stored? What goes to the LLM? Drawing arrows between components helps.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "A common way to plan a system before coding is to draw a simple ____.",
        answer: "diagram",
        explanation:
          "A diagram shows the main components (UI, API, LLM, database) and how they connect. It is faster and clearer than writing pages of text.",
      },
      {
        id: 14,
        type: "code-output",
        question: "What does this code print?",
        code: `components = ["ui", "api", "llm", "database"]
print(" -> ".join(components))`,
        answer: "ui -> api -> llm -> database",
        explanation:
          "join() combines list items into one string with the separator between them. The separator here is ' -> '.",
      },
      {
        id: 15,
        type: "multiple-choice",
        question: "What is a 'user story'?",
        options: [
          "A novel about coding",
          "A short description of a feature from the user's point of view",
          "A type of error",
          "A type of variable",
        ],
        correct: 1,
        explanation:
          "A user story looks like 'As a student, I want to ask a question and get an answer.' It keeps your design focused on real user needs.",
      },
      {
        id: 16,
        type: "true-false",
        question: "Before adding a new feature, it helps to write down what problem it solves.",
        correctBool: true,
        explanation:
          "Writing down the problem first keeps you from adding features nobody needs. If you cannot state the problem clearly, the feature probably is not worth building.",
      },
      {
        id: 17,
        type: "fill-blank",
        question:
          "In an interview, if you do not know an answer, the best move is to be ____ about it.",
        answer: "honest",
        explanation:
          "Admitting 'I don't know, but here is how I would find out' beats making something up. Interviewers value honesty and a learning mindset.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "What should a good README include?",
        options: [
          "Just the title",
          "What the project does, how to install it, and how to run it",
          "The author's phone number",
          "Only code, no text",
        ],
        correct: 1,
        explanation:
          "A good README has a project description, setup steps, usage examples, and any notes. Think of it as a quick-start guide for new users.",
      },
      {
        id: 20,
        type: "true-false",
        question: "Practicing out loud helps you explain your project more clearly in an interview.",
        correctBool: true,
        explanation:
          "Explaining out loud (even to a mirror or a friend) forces you to put ideas into words. The first time is always awkward; the tenth time is smooth.",
      },
      {
        id: 21,
        type: "fill-blank",
        question:
          "When something breaks in your code, the first thing to do is read the ____ message carefully.",
        answer: "error",
        explanation:
          "Error messages tell you what went wrong and where. Read the last line first (the actual error), then look at the file and line number above it.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `features = ["chat", "memory", "tools"]
print(len(features))`,
        answer: "3",
        explanation:
          "The list has three items, so len() returns 3. Each item is a feature of the AI assistant.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What is 'trade-off' thinking in system design?",
        options: [
          "Picking one benefit and giving up another",
          "Always choosing the cheapest option",
          "Always choosing the fastest option",
          "Ignoring the user",
        ],
        correct: 0,
        explanation:
          "A trade-off is when you give up one thing to get another. For example, a bigger model gives better answers but costs more and is slower.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `def is_ready(score):
    return score >= 70
print(is_ready(85))`,
        answer: "True",
        explanation:
          "85 is greater than or equal to 70, so the comparison is True. The function returns True, and Python prints it with a capital T.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question:
          "You have two designs: one is fast but expensive, one is slower but cheap. What is this called?",
        options: ["A bug", "A trade-off", "A syntax error", "A hallucination"],
        correct: 1,
        explanation:
          "Trade-offs are everywhere in design. You pick the option that best fits your priorities (speed vs cost, quality vs latency, etc.).",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "In a mock interview, you should be able to explain the ____ behind each design decision you made.",
        answer: "reason",
        explanation:
          "Interviewers ask 'why did you choose this?' to see if your decision was deliberate. Saying 'because it works' is not enough; explain the alternatives you considered.",
      },
      {
        id: 27,
        type: "true-false",
        question:
          "Releasing a small version early and getting feedback is usually better than building everything in secret for months.",
        correctBool: true,
        explanation:
          "Early feedback catches bad assumptions. Real users will surprise you, and a small early version is much cheaper to change than a giant finished one.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `stack = ["langchain", "mcp", "langfuse"]
print(" -> ".join(stack).upper())`,
        answer: "LANGCHAIN -> MCP -> LANGFUSE",
        explanation:
          "join() makes the string 'langchain -> mcp -> langfuse', then .upper() converts all letters to capitals. The arrows stay the same.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question:
          "An interviewer asks 'How would you improve your project?'. Best answer?",
        options: [
          "It is perfect already",
          "List specific things you would add or fix, and why",
          "Refuse to answer",
          "Say 'I don't know' and stop",
        ],
        correct: 1,
        explanation:
          "Every project can be improved. Listing specific next steps (more tools, better memory, faster responses) shows you can reflect on your work.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "The set of steps you take to fix a bug, like reproduce, isolate, fix, and test, is called the ____ process.",
        answer: "debugging",
        explanation:
          "Debugging is a skill. First reproduce the bug reliably, then narrow down where it happens, then fix it, then test to make sure it is really gone.",
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
      "Comprehensive test covering Days 1 to 25: Python basics, loops, functions, data structures, files, exceptions, and AI fundamentals. 30 questions, 30 minutes.",
    passingScore: 70,
    timerMinutes: 30,
    questions: [
      // --- EASY (1-10) ---
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
        type: "multiple-choice",
        question: "What does the function len(\"Minecraft\") return?",
        options: ["8", "9", "10", "Error"],
        correct: 1,
        explanation:
          "'Minecraft' has 9 characters: M, i, n, e, c, r, a, f, t. len() counts each character.",
      },
      {
        id: 5,
        type: "true-false",
        question: "Strings in Python are immutable, meaning you cannot change them after creation.",
        correctBool: true,
        explanation:
          "You cannot change characters in a string directly. You can only create a new string. Operations like .upper() return a new string.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "The built-in function used to get input from the user is ____().",
        answer: "input",
        explanation:
          "input() prompts the user and returns what they type as a string. You can convert it with int() or float() if needed.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "The 'break' keyword stops a loop immediately.",
        correctBool: true,
        explanation:
          "break exits the current loop right away, skipping any remaining iterations. It is often used with an if statement.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "A function that returns a value uses the keyword ____.",
        answer: "return",
        explanation:
          "The return keyword sends a value back to the caller. Without return, a function returns None by default.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "Which data structure would you use to store unique superhero names?",
        options: ["list", "set", "tuple", "string"],
        correct: 1,
        explanation:
          "A set automatically removes duplicates, so it is perfect for keeping only unique items, like distinct superhero names.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "23"],
        correct: 1,
        explanation:
          "** is the exponent operator. 2 ** 3 means 2 to the power of 3, which is 8.",
      },
      {
        id: 12,
        type: "true-false",
        question: "A list can hold values of different types, like numbers and strings together.",
        correctBool: true,
        explanation:
          "Python lists can hold any mix of types. For example ['Aarav', 13, True] is a valid list with a string, an integer, and a boolean.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "The operator that gives the remainder of a division is ____. (One character.)",
        answer: "%",
        explanation:
          "The % operator (modulus) gives the remainder. For example, 7 % 2 is 1, and 10 % 3 is 1.",
      },
      {
        id: 14,
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
        id: 15,
        type: "multiple-choice",
        question: "What does type(3.14) return?",
        options: ["int", "float", "str", "bool"],
        correct: 1,
        explanation:
          "Numbers with a decimal point are floats. type(3.14) returns <class 'float'>. Whole numbers without a decimal are ints.",
      },
      {
        id: 16,
        type: "true-false",
        question: "A tuple is immutable, but a list is mutable.",
        correctBool: true,
        explanation:
          "Once you create a tuple, you cannot change its items. Lists let you add, remove, and change items. This is the key difference between them.",
      },
      {
        id: 17,
        type: "fill-blank",
        question: "The keyword used to handle an exception in Python is ____.",
        answer: "except",
        explanation:
          "try runs code that might fail. except catches the error so your program can keep going. You can catch specific types like except ValueError.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "What does open('file.txt', 'r') do?",
        options: [
          "Writes to the file",
          "Opens the file for reading",
          "Deletes the file",
          "Renames the file",
        ],
        correct: 1,
        explanation:
          "The 'r' mode means read. You get a file object you can call .read() or .readline() on. Other modes include 'w' (write) and 'a' (append).",
      },
      {
        id: 20,
        type: "true-false",
        question: "Deep learning is a subset of machine learning.",
        correctBool: true,
        explanation:
          "Deep learning is a specialized type of ML that uses neural networks with many layers. All deep learning is ML, but not all ML is deep learning.",
      },
      {
        id: 21,
        type: "fill-blank",
        question: "The part of an LLM that takes text and turns it into numbers is called the ____.",
        answer: "tokenizer",
        explanation:
          "A tokenizer splits text into tokens and maps each one to a number, because neural networks work with numbers, not text.",
      },
      {
        id: 22,
        type: "code-output",
        question: "What does this code print?",
        code: `scores = {"Aarav": 99, "Riya": 87}
print(scores.get("Riya"))`,
        answer: "87",
        explanation:
          "The .get() method returns the value for the key. scores.get('Riya') returns 87.",
      },
      {
        id: 23,
        type: "multiple-choice",
        question: "What does 'range(1, 4)' produce?",
        options: ["1, 2, 3, 4", "1, 2, 3", "0, 1, 2, 3", "2, 3, 4"],
        correct: 1,
        explanation:
          "range(1, 4) starts at 1 and stops before 4, so it gives 1, 2, 3. The first argument is the start, the second is the stop (exclusive).",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
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
        id: 25,
        type: "multiple-choice",
        question:
          "What is the output?\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print(\"oops\")",
        options: ["0", "oops", "10", "Error"],
        correct: 1,
        explanation:
          "10 / 0 raises ZeroDivisionError. The except block catches it and prints 'oops'. The print(10 / 0) line never finishes.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "When you index past the end of a list, Python raises an ____Error. (Fill in the type name.)",
        answer: "Index",
        explanation:
          "IndexError happens when the index is out of range, like list[5] on a 3-item list. You can catch it or check len() before indexing.",
      },
      {
        id: 27,
        type: "true-false",
        question: "The expression bool(\"\") evaluates to False.",
        correctBool: true,
        explanation:
          "An empty string is 'falsy' in Python. bool('') is False. So 'if not name:' is True when name is an empty string.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `words = ["apple", "banana", "cherry"]
print(words[0][0])`,
        answer: "a",
        explanation:
          "words[0] is 'apple', and 'apple'[0] is 'a'. You can index into a string just like a list.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "Which correctly reads a whole number from user input?",
        options: [
          "num = input()",
          "num = int(input())",
          "num = input(int)",
          "num = int.print()",
        ],
        correct: 1,
        explanation:
          "input() returns a string. To use it as a number, wrap it in int(): int(input()). Otherwise '13' + '13' would be '1313', not 26.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "A loop that runs forever because its condition never becomes False is called an ____ loop.",
        answer: "infinite",
        explanation:
          "An infinite loop never ends on its own. You usually stop it by pressing Ctrl+C in the terminal or updating a variable inside the loop so the condition becomes False.",
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
      "Practical coding questions covering Days 26 to 48: OpenRouter, LangChain, MCP, Langfuse, and capstone. A mix of code-output and multiple-choice questions about what code does. 30 questions, 40 minutes.",
    passingScore: 70,
    timerMinutes: 40,
    questions: [
      // --- EASY (1-10) ---
      {
        id: 1,
        type: "multiple-choice",
        question: "What does OpenRouter provide?",
        options: [
          "A free Wi-Fi router",
          "A single API for many LLMs",
          "A Python library only",
          "A type of GPU",
        ],
        correct: 1,
        explanation:
          "OpenRouter gives you one API key and one consistent request format to call many LLMs (GPT, Claude, Gemini, Llama, and more).",
      },
      {
        id: 2,
        type: "true-false",
        question: "LangChain lets you build chains that connect prompts, models, and parsers.",
        correctBool: true,
        explanation:
          "A LangChain chain links components with the | operator: prompt | model | parser. Each step feeds its output to the next.",
      },
      {
        id: 3,
        type: "fill-blank",
        question: "In MCP, a function the model can call is called a ____. (Starts with 't'.)",
        answer: "tool",
        explanation:
          "Tools are functions exposed by an MCP server. The LLM reads their descriptions and decides when to call them.",
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "What does Langfuse help you do?",
        options: [
          "Make coffee",
          "Trace and observe LLM calls",
          "Train models from scratch",
          "Replace Python",
        ],
        correct: 1,
        explanation:
          "Langfuse records each LLM call as a trace. You can see prompts, responses, token counts, and latency in its dashboard.",
      },
      {
        id: 5,
        type: "true-false",
        question: "The 'with' statement automatically closes a file when the block ends.",
        correctBool: true,
        explanation:
          "The 'with' block calls __exit__ for you, which closes the file. You do not need to call f.close() yourself.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "To convert a Python dict to a JSON string, you use json.____().",
        answer: "dumps",
        explanation:
          "json.dumps() (dump string) takes a Python object and returns a JSON-formatted string. json.loads() does the opposite.",
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "What does the | operator do in LangChain?",
        options: [
          "Adds numbers",
          "Connects components in a chain",
          "Imports a module",
          "Prints output",
        ],
        correct: 1,
        explanation:
          "The pipe operator links components. For example: prompt | model | parser creates a chain where the output of each step feeds into the next.",
      },
      {
        id: 8,
        type: "true-false",
        question: "An MCP server can expose many tools.",
        correctBool: true,
        explanation:
          "One server can register many tools with @mcp.tool(). A single cricket server could expose get_score, get_players, and get_schedule.",
      },
      {
        id: 9,
        type: "fill-blank",
        question:
          "A 'trace' in Langfuse shows each ____ of an LLM call, including inputs and outputs.",
        answer: "step",
        explanation:
          "A trace is made of steps (spans). Each span is one piece of work: a prompt, a model call, a tool call, or a parser step.",
      },
      {
        id: 10,
        type: "multiple-choice",
        question: "What is a capstone project?",
        options: [
          "A small quiz",
          "A final project that brings together everything you learned",
          "A type of variable",
          "A type of file",
        ],
        correct: 1,
        explanation:
          "A capstone combines skills from the whole course into one bigger project. For Aarav, it might be an AI assistant with prompting, tools, memory, and tracing.",
      },
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does json.loads() do?",
        options: [
          "Converts a JSON string to a Python object",
          "Converts a Python object to a JSON string",
          "Loads a file from disk",
          "Lists files in a folder",
        ],
        correct: 0,
        explanation:
          "json.loads() (load string) takes a JSON string and returns a Python object like a dict or list. json.dumps() does the opposite.",
      },
      {
        id: 12,
        type: "true-false",
        question: "ConversationBufferMemory stores past messages so the LLM has context.",
        correctBool: true,
        explanation:
          "Buffer memory keeps every message. The LLM sees the recent chat history, so it can answer follow-up questions naturally.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "The role used for the model's replies in a chat is ____.",
        answer: "assistant",
        explanation:
          "The three common roles are 'system' (behavior), 'user' (human input), and 'assistant' (model replies).",
      },
      {
        id: 14,
        type: "code-output",
        question: "What does this code print?",
        code: `roles = ["system", "user", "assistant"]
print(roles[-1])`,
        answer: "assistant",
        explanation:
          "Negative indices count from the end. roles[-1] is the last item, 'assistant'.",
      },
      {
        id: 15,
        type: "multiple-choice",
        question:
          "What does the @mcp.tool() decorator do?\n@mcp.tool()\ndef get_score(player: str) -> int:\n    return 99",
        options: [
          "Runs the function once",
          "Registers the function as an MCP tool the LLM can call",
          "Imports a module",
          "Sends an email",
        ],
        correct: 1,
        explanation:
          "The @mcp.tool() decorator registers the function as an MCP tool. The LLM can call get_score with a player name and gets an int back.",
      },
      {
        id: 16,
        type: "true-false",
        question: "The @observe decorator from Langfuse wraps a function so its calls are traced.",
        correctBool: true,
        explanation:
          "@observe tells Langfuse to record each call to the function. You can see the inputs, outputs, and timing in the Langfuse dashboard.",
      },
      {
        id: 17,
        type: "fill-blank",
        question: "In OpenRouter, each chat message has a 'role' and '____'.",
        answer: "content",
        explanation:
          "Each message is a dict with 'role' (system, user, or assistant) and 'content' (the text). The model uses both to understand the conversation.",
      },
      {
        id: 18,
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
        id: 19,
        type: "multiple-choice",
        question: "What does the .invoke() method do on a LangChain chain?",
        options: [
          "Saves a file",
          "Runs the chain with given input and returns the result",
          "Imports a module",
          "Stops the program",
        ],
        correct: 1,
        explanation:
          "chain.invoke({'question': 'hi'}) runs the chain from start to end and returns the final output. It is the simplest way to use a chain.",
      },
      {
        id: 20,
        type: "true-false",
        question: "A good system prompt can change how the LLM behaves for the whole conversation.",
        correctBool: true,
        explanation:
          "The system prompt is sent once at the start, but the model applies it to every answer. 'You are a friendly cricket coach' makes the tone consistent.",
      },
      {
        id: 21,
        type: "fill-blank",
        question: "The unit that API providers use to bill an LLM call is the ____.",
        answer: "token",
        explanation:
          "Pricing is per token (often per 1,000 or 1,000,000 tokens). Both input and output tokens are counted, with output usually costing more.",
      },
      {
        id: 22,
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
        id: 23,
        type: "multiple-choice",
        question: "What does a LangChain output parser do?",
        options: [
          "Sends the request to the API",
          "Turns the LLM's raw text into a structured Python object",
          "Charges your card",
          "Downloads a model",
        ],
        correct: 1,
        explanation:
          "The parser takes the model's text reply and converts it. For example, JsonOutputParser turns JSON text into a Python dict.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `chain_steps = ["prompt", "model", "parser"]
print(len(chain_steps))`,
        answer: "3",
        explanation:
          "The list has 3 items, so len() returns 3. Each item is one step in a typical LangChain chain.",
      },
      {
        id: 25,
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
        id: 26,
        type: "fill-blank",
        question: "To handle a tool call failure gracefully, wrap it in a ____ block.",
        answer: "try",
        explanation:
          "Use try/except around tool calls so a failing tool returns an error message to the LLM instead of crashing the whole app.",
      },
      {
        id: 27,
        type: "true-false",
        question:
          "A trace in Langfuse that shows a tool call step proves the LLM actually used that tool.",
        correctBool: true,
        explanation:
          "Tracing records each step, including tool calls. If you see a tool span in the trace, the LLM really did call that tool with the recorded inputs.",
      },
      {
        id: 28,
        type: "code-output",
        question: "What does this code print?",
        code: `results = {"gpt": 5, "claude": 5, "gemini": 4}
print(sum(results.values()))`,
        answer: "14",
        explanation:
          "results.values() gives [5, 5, 4]. sum() adds them up: 5 + 5 + 4 = 14.",
      },
      {
        id: 29,
        type: "multiple-choice",
        question: "What is the safest way to store an API key?",
        options: [
          "Hard-code it in your script",
          "In an environment variable, not in the code",
          "Print it on screen",
          "Email it to yourself",
        ],
        correct: 1,
        explanation:
          "Environment variables keep keys out of your code and out of git. Use os.getenv('OPENROUTER_API_KEY') to read the key at runtime.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "In a capstone, the part of the project plan that lists what users can do is the ____ list.",
        answer: "feature",
        explanation:
          "A feature list describes what the app can do, like 'ask a question', 'remember context', 'search the web'. It keeps the build focused and measurable.",
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
      "Comprehensive theory covering all 48 days of the course: Python fundamentals, AI concepts, LangChain, MCP, Langfuse, and capstone. 30 questions, 40 minutes.",
    passingScore: 70,
    timerMinutes: 40,
    questions: [
      // --- EASY (1-10) ---
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
        id: 5,
        type: "true-false",
        question: "A smaller temperature value in an LLM call usually gives more predictable answers.",
        correctBool: true,
        explanation:
          "Temperature controls randomness. Low temperature (like 0) makes the model pick the most likely tokens, so answers are more deterministic. Higher temperature is more creative.",
      },
      {
        id: 6,
        type: "fill-blank",
        question: "The number of layers in a deep neural network is sometimes called its ____.",
        answer: "depth",
        explanation:
          "Deep networks have many layers, and 'depth' refers to the number of layers. This is why it is called 'deep' learning.",
      },
      {
        id: 7,
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
        id: 8,
        type: "true-false",
        question: "Fine-tuning changes the weights of an existing model.",
        correctBool: true,
        explanation:
          "Fine-tuning continues training, so the model's weights are updated to perform better on a specific task. This is different from prompting, which does not change weights.",
      },
      {
        id: 9,
        type: "fill-blank",
        question: "The protocol that standardizes how LLMs connect to tools and data is called ____. (Three-letter abbreviation.)",
        answer: "MCP",
        explanation:
          "MCP (Model Context Protocol) gives LLMs a standard way to access tools and data. It avoids writing custom integrations for every model and tool.",
      },
      {
        id: 10,
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
      // --- MEDIUM (11-23) ---
      {
        id: 11,
        type: "multiple-choice",
        question: "What does the ** operator do in Python?",
        options: ["Multiply", "Exponent (power)", "Divide", "Comment"],
        correct: 1,
        explanation:
          "** is the exponent operator. 2 ** 3 means 2 to the power of 3, which is 8. * is multiplication, / is division.",
      },
      {
        id: 12,
        type: "true-false",
        question: "Hallucinations can be reduced by giving the model clear context and asking it to cite sources.",
        correctBool: true,
        explanation:
          "Providing relevant context (like in RAG) and instructions to admit uncertainty can reduce hallucinations. However, no method removes them completely.",
      },
      {
        id: 13,
        type: "fill-blank",
        question: "The platform used to trace and observe LLM calls in this course is ____.",
        answer: "Langfuse",
        explanation:
          "Langfuse is the observability tool used in week 7. It records traces, prompts, responses, and metrics so you can debug and improve your LLM app.",
      },
      {
        id: 14,
        type: "code-output",
        question: "What does this code print?",
        code: `print(2 ** 3)`,
        answer: "8",
        explanation:
          "** is the exponent operator. 2 ** 3 means 2 to the power of 3, which is 8.",
      },
      {
        id: 15,
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
        id: 16,
        type: "true-false",
        question: "In a mock interview, you should be honest about what you do not know.",
        correctBool: true,
        explanation:
          "Admitting what you do not know is better than making things up. Interviewers value honesty and the ability to learn. You can explain how you would find the answer.",
      },
      {
        id: 17,
        type: "fill-blank",
        question: "The framework used in this course to build chains, memory, and agents is ____.",
        answer: "LangChain",
        explanation:
          "LangChain is the framework taught in weeks 5 through 7. It provides chains, memory, output parsers, document loaders, and agent tools.",
      },
      {
        id: 18,
        type: "code-output",
        question: "What does this code print?",
        code: `for i in range(1, 4):
    print(i)`,
        answer: "1\n2\n3",
        explanation:
          "range(1, 4) starts at 1 and stops before 4, so i takes the values 1, 2, and 3, each printed on a new line.",
      },
      {
        id: 19,
        type: "multiple-choice",
        question: "What does 'temperature' control in an LLM?",
        options: [
          "The room temperature",
          "The randomness of the output",
          "The price",
          "The model size",
        ],
        correct: 1,
        explanation:
          "Temperature controls how random the next-token choice is. Low temperature (like 0) is deterministic; high temperature (like 1.5) is creative and varied.",
      },
      {
        id: 20,
        type: "true-false",
        question: "An AI agent can decide to call tools on its own based on the user's request.",
        correctBool: true,
        explanation:
          "Agents are LLMs that can choose to call tools (search, calculator, custom functions) as part of answering. This is what makes them more powerful than plain LLMs.",
      },
      {
        id: 21,
        type: "fill-blank",
        question: "A 'token' in an LLM is a small piece of ____, like a word or part of a word.",
        answer: "text",
        explanation:
          "Tokens are chunks of text. A long word might be split into two tokens, and a short common word might be one token. The model reads text as a stream of tokens.",
      },
      {
        id: 22,
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
        id: 23,
        type: "multiple-choice",
        question: "Which of these is a benefit of using LangChain?",
        options: [
          "It is the only language you can use",
          "It provides reusable tools for chains, memory, and parsing",
          "It removes the need for an API key",
          "It trains models for you",
        ],
        correct: 1,
        explanation:
          "LangChain saves you from writing boilerplate. You get prompt templates, memory, output parsers, document loaders, and agent abstractions out of the box.",
      },
      // --- HARD (24-30) ---
      {
        id: 24,
        type: "code-output",
        question: "What does this code print?",
        code: `text = "Spider-Man"
print(text.lower())`,
        answer: "spider-man",
        explanation:
          "lower() returns the string in all lowercase letters. The hyphen stays the same; only letters are converted.",
      },
      {
        id: 25,
        type: "multiple-choice",
        question: "Which best describes the relationship between ML, DL, and AI?",
        options: [
          "DL is bigger than AI",
          "AI is the biggest field, ML is a part of AI, DL is a part of ML",
          "They are unrelated",
          "ML and AI are the same, DL is different",
        ],
        correct: 1,
        explanation:
          "AI is the broad field of smart machines. ML is a subset of AI that learns from data. DL is a subset of ML that uses deep neural networks.",
      },
      {
        id: 26,
        type: "fill-blank",
        question:
          "A model trained to predict the next token is sometimes called an autoregressive ____.",
        answer: "model",
        explanation:
          "Autoregressive models predict the next token based on all previous tokens, then feed it back in. GPT-style LLMs are autoregressive.",
      },
      {
        id: 27,
        type: "true-false",
        question:
          "An LLM with no context window limit would be impossible to build today because memory and compute scale with the window size.",
        correctBool: true,
        explanation:
          "Attention (the core of transformers) uses memory and compute proportional to the square of the sequence length. Infinite context would need infinite resources.",
      },
      {
        id: 28,
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
      {
        id: 29,
        type: "multiple-choice",
        question: "Why is a system design plan useful before coding?",
        options: [
          "It makes code run faster",
          "It helps you decide what to build and avoid costly rewrites later",
          "It is required by Python",
          "It trains the model",
        ],
        correct: 1,
        explanation:
          "Planning first helps you spot problems early, when they are cheap to fix. A few hours of design can save weeks of rewriting.",
      },
      {
        id: 30,
        type: "fill-blank",
        question:
          "The type of prompt technique where you give the model a few examples in the prompt is called ____-shot prompting.",
        answer: "few",
        explanation:
          "Few-shot prompting gives the model a few example input-output pairs in the prompt so it learns the pattern. Zero-shot gives no examples, one-shot gives one.",
      },
    ],
  },
];
