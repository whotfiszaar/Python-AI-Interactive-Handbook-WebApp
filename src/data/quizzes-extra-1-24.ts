import type { QuizQuestion } from "@/types";

// Extra quiz questions for Days 1 through 24.
// Each day adds 5 more questions (IDs 10 to 14) so that, combined with the
// 5 existing questions (IDs 1 to 5) inside the day files, every day has 10
// total quiz questions. All topics are tied directly to the lesson content,
// use child friendly themes (Aarav, cars, cricket, Minecraft, Spider-Man,
// pizza), and avoid em dashes.

export const extraQuizzes1to24: Record<number, QuizQuestion[]> = {
  // ============================================================
  // DAY 1: What is Python? Your First Program
  // ============================================================
  1: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Which company or organisation uses Python, as mentioned in Day 1?",
      options: ["NASA", "Only small startups", "No real companies", "Just schools"],
      correct: 0,
      explanation:
        "Day 1 says Google, Netflix, NASA, and Instagram all use Python every day.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Python reads your code from top to bottom, one line at a time.",
      correctBool: true,
      explanation:
        "Python uses sequential execution. The first line runs completely, then the second, and so on. Swapping two lines also swaps the output order.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "In Python, text inside a print statement must be wrapped in ____ marks so Python knows it is a string.",
      answer: "quotation",
      explanation:
        'Text must be wrapped in quotation marks, like "Hello, Aarav!", otherwise Python tries to look up the word as code and gives an error.',
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'print("Step 1: I wake up")\nprint("Step 3: I eat breakfast")\nprint("Step 2: I brush my teeth")',
      answer: "Step 1: I wake up\nStep 3: I eat breakfast\nStep 2: I brush my teeth",
      explanation:
        "Python runs lines in the order they appear in the file, so the printed numbers stay in the order the lines were written, not the order they describe.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "What happens if Aarav writes print Hello, Aarav without quotes and parentheses?",
      options: [
        "It prints Hello, Aarav",
        "It prints nothing",
        "Python gives a SyntaxError",
        "It saves the text to a file",
      ],
      correct: 2,
      explanation:
        'Without quotes and parentheses, Python cannot understand the command. The correct form is print("Hello, Aarav!").',
    },
  ],

  // ============================================================
  // DAY 2: Variables and Data Types
  // ============================================================
  2: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Aarav writes height = 5.4. Which data type is height?",
      options: ["string", "integer", "float", "boolean"],
      correct: 2,
      explanation:
        "5.4 has a decimal point, so it is a float. Whole numbers are integers, text is a string, and True/False are booleans.",
    },
    {
      id: 11,
      type: "true-false",
      question: "In Python, the variables age and Age are the same variable.",
      correctBool: false,
      explanation:
        "Python variable names are case sensitive. age and Age are two different variables, so be consistent with your capitalisation.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Use the ____() function to check what type a value is, for example type(name).",
      answer: "type",
      explanation:
        "type() returns the type of a value, like <class 'str'>, <class 'int'>, <class 'float'>, or <class 'bool'>.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'name = "Aarav"\nage = 13\nprint("My name is", name)\nprint("I am", age, "years old")',
      answer: "My name is Aarav\nI am 13 years old",
      explanation:
        "Commas inside print() insert spaces between the values, so the text and variable values combine into friendly sentences.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which of these is a VALID variable name in Python?",
      options: ["1name", "favorite car", "favorite_car", "for"],
      correct: 2,
      explanation:
        "Names cannot start with a number, cannot contain spaces, and cannot be Python keywords like for. favorite_car uses underscores and is valid.",
    },
  ],

  // ============================================================
  // DAY 3: Input and Output with f-strings
  // ============================================================
  3: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "What does the input() function return by default, even if the user types a number?",
      options: ["an integer", "a float", "a string", "a boolean"],
      correct: 2,
      explanation:
        "input() always returns a string. If Aarav needs to do math with the value, he must convert it with int() or float() first.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Writing f before a string lets you put variables inside curly braces directly.",
      correctBool: true,
      explanation:
        'An f-string like f"My name is {name}" inserts the variable value into the text automatically, without using plus signs or commas.',
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "If Aarav wants to convert input into a whole number, he wraps it like ____(input(\"Enter age: \")).",
      answer: "int",
      explanation:
        "int() converts a string of digits into an integer. float() converts it into a decimal number.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'name = "Aarav"\nsport = "cricket"\nprint(f"{name} loves to play {sport}")',
      answer: "Aarav loves to play cricket",
      explanation:
        "The f-string replaces {name} with Aarav and {sport} with cricket, producing one clean sentence.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "What error do you get if you forget int() and try to add two inputs?",
      options: ["SyntaxError", "TypeError", "NameError", "No error, it works fine"],
      correct: 1,
      explanation:
        "input() returns strings. Adding two strings joins them, but adding a string and a number raises a TypeError.",
    },
  ],

  // ============================================================
  // DAY 4: Operators: Arithmetic, Comparison, Logical
  // ============================================================
  4: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What does 7 // 2 return in Python?",
      options: ["3.5", "3", "4", "1"],
      correct: 1,
      explanation:
        "Floor division // chops off the decimal part. 7 // 2 returns 3, the whole number of times 2 fits into 7.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The expression 8 / 4 returns 2, an integer.",
      correctBool: false,
      explanation:
        "Regular division / always returns a float, even when the answer is a whole number. 8 / 4 returns 2.0.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The operator ____ gives the remainder after division, for example 7 % 2 returns 1.",
      answer: "modulo",
      explanation:
        "The modulo operator % returns the remainder. It is great for checking even or odd numbers.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'marks = 78\nattendance = 88\nprint(marks >= 40 and attendance >= 75)',
      answer: "True",
      explanation:
        "Both conditions are True (78 >= 40 and 88 >= 75). With and, both sides must be True for the result to be True.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Which symbol compares two values for equality, instead of assigning?",
      options: ["=", "==", "!=", ">="],
      correct: 1,
      explanation:
        "A single = assigns a value. A double == compares two values. Mixing them up is the most common beginner mistake.",
    },
  ],

  // ============================================================
  // DAY 5: Making Decisions: if, elif, else
  // ============================================================
  5: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "In Python, what marks the block of code that belongs to an if statement?",
      options: ["curly braces { }", "indentation", "parentheses ( )", "square brackets [ ]"],
      correct: 1,
      explanation:
        "Python uses indentation, usually 4 spaces, to mark code blocks. Jupyter auto-indents for you after a colon.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "In an elif chain, once one condition is True, Python skips the rest of the elif branches.",
      correctBool: true,
      explanation:
        "elif stops checking after the first True branch. That is why you should order conditions from most specific to most general.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "To combine two conditions so both must be True, use the keyword ____ between them.",
      answer: "and",
      explanation:
        "The and operator requires both sides to be True. Use or when at least one must be True, and not to flip a value.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'marks = 95\nif marks >= 90:\n    print("A grade")\nelif marks >= 40:\n    print("Pass")\nelse:\n    print("Fail")',
      answer: "A grade",
      explanation:
        "95 is greater than 90, so the first branch runs and the rest are skipped. Ordering from highest to lowest is correct.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "If Aarav checks marks >= 40 first and a student has 95 marks, what happens?",
      options: [
        "The student gets an A grade",
        "The student hits the first True branch and never reaches the A grade check",
        "Python runs every branch",
        "Python crashes",
      ],
      correct: 1,
      explanation:
        "95 is also >= 40, so the first True branch runs and stops. This is why you must order elif conditions from highest to lowest.",
    },
  ],

  // ============================================================
  // DAY 6: If/Else Practice: Real-Life Decisions
  // ============================================================
  6: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Which Python expression is the shorter, chained version of temp >= 15 and temp < 25?",
      options: ["15 >= temp < 25", "15 <= temp < 25", "15 < temp <= 25", "15 <= temp > 25"],
      correct: 1,
      explanation:
        "Python lets you chain comparisons like 15 <= temp < 25. It reads like math and means the same as the and version.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "When you want to print every subject a student failed, use elif so only the first failure shows.",
      correctBool: false,
      explanation:
        "elif stops after the first match. To check and print every failed subject independently, use separate if statements, not elif.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Writing if age = 13 inside a condition gives a SyntaxError because = assigns. Use ____ to compare.",
      answer: "==",
      explanation:
        "A single = assigns a value. Inside an if condition, you must use == to compare two values.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'temp = 20\nif 15 <= temp < 25:\n    print("Pleasant weather")\nelse:\n    print("Too hot or too cold")',
      answer: "Pleasant weather",
      explanation:
        "20 is between 15 and 25, so the chained comparison 15 <= temp < 25 is True and the first branch runs.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Aarav wants to flag every failed subject on a report card. Which structure should he use?",
      options: [
        "One if statement per subject, not elif",
        "A single elif chain",
        "A while loop with break",
        "No conditions at all",
      ],
      correct: 0,
      explanation:
        "Each subject needs its own check, so use separate if statements. elif would stop after the first failure and hide the others.",
    },
  ],

  // ============================================================
  // DAY 7: While Loops: Repeating with Conditions
  // ============================================================
  7: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What causes an infinite while loop?",
      options: [
        "The condition becomes False too quickly",
        "The condition never becomes False because the loop variable is not updated",
        "The loop uses break correctly",
        "The loop runs only once",
      ],
      correct: 1,
      explanation:
        "If you forget to update the variable inside the loop, the condition stays True forever and Python keeps running until you force it to stop.",
    },
    {
      id: 11,
      type: "true-false",
      question: "The break keyword exits a loop immediately, even if the condition is still True.",
      correctBool: true,
      explanation:
        "break is the standard way to leave a while True loop. It jumps out of the loop as soon as break runs.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "To stop a runaway infinite loop in Jupyter, click the ____ button (square icon) in the toolbar.",
      answer: "Stop",
      explanation:
        "The Stop button or the interrupt kernel option stops the running cell so you can fix the loop condition.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'count = 1\nwhile count <= 3:\n    print("Ball", count)\n    count = count + 1',
      answer: "Ball 1\nBall 2\nBall 3",
      explanation:
        "count starts at 1 and goes up by 1 each loop. When count becomes 4, the condition count <= 3 is False and the loop ends.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Which pattern is common when you do not know in advance how many times to repeat?",
      options: [
        'while True with a break inside an if',
        "for i in range(10)",
        "An if statement only",
        "print() inside a string",
      ],
      correct: 0,
      explanation:
        "while True creates a loop that would run forever, but break exits it when a condition is met. This is great when the number of repeats is not known.",
    },
  ],

  // ============================================================
  // DAY 8: For Loops and the range() Function
  // ============================================================
  8: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What list of numbers does range(1, 6) produce?",
      options: ["1, 2, 3, 4, 5, 6", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "2, 3, 4, 5"],
      correct: 1,
      explanation:
        "range() stops BEFORE the end number. range(1, 6) gives 1 through 5, not 6.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "The accumulator pattern means starting with an empty bucket like total = 0 and adding to it inside the loop.",
      correctBool: true,
      explanation:
        "You start with a bucket variable, add something each iteration, and by the end the bucket holds the answer. Aarav will use this pattern hundreds of times.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "If you want 1 to N inclusive, write range(1, ____) where the second number is N plus one.",
      answer: "N + 1",
      explanation:
        "range() stops before the end number, so to include N you must pass N + 1 as the second argument.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)',
      answer: "10",
      explanation:
        "total adds 1, 2, 3, and 4. 1 + 2 + 3 + 4 = 10. range(1, 5) stops before 5.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Inside a for loop, what happens if you reassign the loop variable, for example movie = \"new\"?",
      options: [
        "The original list is changed",
        "Only the local variable changes, the original list is not affected",
        "Python crashes",
        "All items become \"new\"",
      ],
      correct: 1,
      explanation:
        "Reassigning the loop variable only changes the local name. The next iteration overwrites it, and the original list is untouched.",
    },
  ],

  // ============================================================
  // DAY 9: Loop Practice: Nested Loops and Patterns
  // ============================================================
  9: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "If the outer loop runs 4 times and the inner loop runs 5 times each, how many times does the inner body run in total?",
      options: ["9", "20", "1", "45"],
      correct: 1,
      explanation:
        "Total iterations multiply. 4 times 5 equals 20. Nested loops can grow quickly, so watch out for very large combinations.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        'print("*", end="") prints the star without moving to a new line.',
      correctBool: true,
      explanation:
        'By default print() adds a newline at the end. Using end="" stops that, which is essential for printing patterns on one line.',
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "When summing scores per player with nested loops, the ____ variable must be reset inside the outer loop so each player starts fresh.",
      answer: "total",
      explanation:
        "If total = 0 is outside the outer loop, all players' scores add to the same total. Move the reset inside the outer loop.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'for i in range(2):\n    for j in range(3):\n        print("*", end="")\n    print()',
      answer: "***\n***",
      explanation:
        'The inner loop prints three stars without newlines, then print() moves to the next line. That happens twice, so two rows of three stars appear.',
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "A loop of 100 by 100 iterations is fine, but 1000 by 1000 might be slow because it is...",
      options: ["100 iterations", "1,000 iterations", "1,000,000 iterations", "10 iterations"],
      correct: 2,
      explanation:
        "1000 times 1000 is one million. Nested loops multiply, so the inner body runs a million times, which can be slow.",
    },
  ],

  // ============================================================
  // DAY 10: Functions: Reusable Blocks of Code
  // ============================================================
  10: [
    {
      id: 10,
      type: "multiple-choice",
      question: "What keyword do you use to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correct: 1,
      explanation:
        "def starts a function definition, followed by the function name, parentheses, a colon, and an indented body.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "The parameter is the variable in the def line, and the argument is the actual value you pass when calling the function.",
      correctBool: true,
      explanation:
        'In def greet(name), name is the parameter. When you call greet("Aarav"), "Aarav" is the argument that fills the slot.',
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Use the ____ keyword inside a function to send a value back to the caller, so it can be stored or used.",
      answer: "return",
      explanation:
        "return gives the value back to the caller. print only shows it on the screen, the caller gets None.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'def double(x):\n    return x * 2\n\nresult = double(5)\nprint(result)',
      answer: "10",
      explanation:
        "double(5) returns 5 * 2, which is 10. The returned value is stored in result and then printed.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        'What does a function give back if it only prints and has no return statement?',
      options: ["The printed text", "0", "None", "An empty string"],
      correct: 2,
      explanation:
        "print shows a value on screen but does not return it. Without a return, the caller gets None and cannot use the result.",
    },
  ],

  // ============================================================
  // DAY 11: Functions Practice: Defaults and Multiple Returns
  // ============================================================
  11: [
    {
      id: 10,
      type: "multiple-choice",
      question: "Which function definition is VALID?",
      options: ["def f(a=5, b):", "def f(a, b=5):", "def f(a=5, b=3, c):", "def f(b=2, a):"],
      correct: 1,
      explanation:
        "Parameters with default values must come after parameters without defaults. def f(a, b=5) is valid because a comes first.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Python has built-in functions min(), max(), and sum() that work on lists, so Aarav does not need to write his own loops for these.",
      correctBool: true,
      explanation:
        "min(list), max(list), and sum(list) are built in. They are fast and clear, so use them freely.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "If you call a function before its def line, Python gives a ____Error because it does not know the function exists yet.",
      answer: "Name",
      explanation:
        "Python reads files top to bottom. Always define helper functions first, then the functions that call them, then the main code last.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Aarav"))\nprint(greet("Aarav", "Hi"))',
      answer: "Hello, Aarav!\nHi, Aarav!",
      explanation:
        "The first call uses the default greeting \"Hello\". The second call passes \"Hi\", which overrides the default.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Aarav writes def strike_rate(runs, balls=1) and calls strike_rate(87). What is balls inside the function?",
      options: ["0", "1", "87", "An error"],
      correct: 1,
      explanation:
        "balls uses its default value of 1 because Aarav did not pass a second argument. Default parameters fill in the missing values.",
    },
  ],

  // ============================================================
  // DAY 12: Lists: Storing Many Values in Order
  // ============================================================
  12: [
    {
      id: 10,
      type: "multiple-choice",
      question: "A list has 5 items. What is the index of the FIRST item?",
      options: ["1", "0", "5", "4"],
      correct: 1,
      explanation:
        "Indices start at 0, not 1. A list of 5 items has indices 0 through 4. Asking for index 5 gives an IndexError.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "list.sort() sorts the list in place and changes the original list forever.",
      correctBool: true,
      explanation:
        "sort() modifies the original list. If you want to keep the original order, use sorted(list) instead, which returns a new list.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Use the ____ method to add a new item to the end of a list, for example cars.append(\"Tesla\").",
      answer: "append",
      explanation:
        "append adds to the end. It is faster than insert, so prefer it unless you need to put the item at a specific position.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'cars = ["Maruti", "Honda", "BMW"]\ncars.append("Tesla")\nprint(cars[3])\nprint(len(cars))',
      answer: "Tesla\n4",
      explanation:
        "append adds Tesla to the end. The list now has 4 items, and index 3 is the fourth item, Tesla.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Which method should Aarav use to add a new item at a specific position, not the end?",
      options: ["append", "insert", "sort", "len"],
      correct: 1,
      explanation:
        "insert(index, item) places the new item at a chosen position. append only adds to the end.",
    },
  ],

  // ============================================================
  // DAY 13: Dictionaries: Key-Value Pairs
  // ============================================================
  13: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        'What error does Python raise if you ask for car_speeds["Tesla"] and Tesla is not a key?',
      options: ["IndexError", "KeyError", "ValueError", "TypeError"],
      correct: 1,
      explanation:
        "Asking for a missing key raises a KeyError. Use .get(key) or .get(key, default) to avoid the crash.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Since Python 3.7, dictionaries remember the order in which keys were added.",
      correctBool: true,
      explanation:
        "Dictionaries preserve insertion order, so when you loop through, you get keys in the order they were added. This makes them useful even when order matters.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        'To safely look up a key that might be missing, use the ____ method like car_speeds.get("Tesla", 0).',
      answer: "get",
      explanation:
        ".get(key) returns None if the key is missing. .get(key, default) returns your chosen default instead.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'scores = {"Aarav": 78, "Riya": 82}\nscores["Aarav"] = 90\nprint(scores["Aarav"])\nprint(len(scores))',
      answer: "90\n2",
      explanation:
        "Assigning to an existing key updates its value, so Aarav becomes 90. The dictionary still has 2 keys, Aarav and Riya.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "What happens if you assign to the same dictionary key twice, like marks[\"Math\"] = 80 then marks[\"Math\"] = 95?",
      options: [
        "Two Math entries are stored",
        "The second value replaces the first",
        "Python raises an error",
        "Both values are added together",
      ],
      correct: 1,
      explanation:
        "Keys must be unique. The second value replaces the first, so marks[\"Math\"] becomes 95. You cannot have duplicate keys.",
    },
  ],

  // ============================================================
  // DAY 14: Tuples, Sets, and String Methods
  // ============================================================
  14: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Which collection should you use for coordinates (x, y) that should never change after creation?",
      options: ["list", "dictionary", "tuple", "set"],
      correct: 2,
      explanation:
        "Tuples are unchangeable after creation. That protects data from accidental modification, which is ideal for coordinates, dates, and RGB colors.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        'Strings are immutable, so name.upper() changes the original string in place.',
      correctBool: false,
      explanation:
        "Strings cannot be changed in place. Methods like upper() and replace() return a NEW string. To keep the change, assign it back like name = name.upper().",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "A ____ is an unordered collection with no duplicates, written with curly braces like {1, 2, 3}.",
      answer: "set",
      explanation:
        "Sets are unordered, changeable, and do not allow duplicates. The in keyword is much faster on sets than on lists.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'name = "aarav"\nprint(name.upper())\nprint(name)',
      answer: "AARAV\naarav",
      explanation:
        "upper() returns a new uppercase string, but the original name stays lowercase because strings are immutable.",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "The in keyword works on lists, tuples, sets, and dictionaries. On a dictionary, what does in check?",
      options: ["The values", "The keys", "Both keys and values", "Nothing, it raises an error"],
      correct: 1,
      explanation:
        "For dictionaries, in checks the keys. It is much faster on sets than on lists, especially for large collections.",
    },
  ],

  // ============================================================
  // DAY 15: File Handling and Exceptions
  // ============================================================
  15: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Why does this handbook use io.StringIO instead of real files like open(\"friends.txt\")?",
      options: [
        "StringIO is faster than real files",
        "Pyodide runs in the browser and cannot freely write to disk, so StringIO is an in-memory substitute",
        "Real files do not work in Python",
        "StringIO is the only way to read text",
      ],
      correct: 1,
      explanation:
        "Pyodide is sandboxed in the browser. StringIO behaves like a file in memory, so the same code patterns work. On a real computer, just swap StringIO for open().",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Writing just except: with no exception type is a good habit because it catches every possible error.",
      correctBool: false,
      explanation:
        "A bare except catches every error, including bugs you did not anticipate. This hides problems and makes debugging hard. Always catch a specific exception type.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "After writing to a StringIO object, call ____(0) to rewind the read position back to the start.",
      answer: "seek",
      explanation:
        "seek(0) moves the read position to the beginning so read() and for loops start from the top of the file-like object.",
    },
    {
      id: 13,
      type: "code-output",
      question: "What does this code print?",
      code: 'try:\n    x = int("abc")\n    print(x)\nexcept ValueError:\n    print("not a number")\nprint("done")',
      answer: "not a number\ndone",
      explanation:
        'int("abc") raises a ValueError. The except block catches it and prints "not a number". Then the program continues and prints "done".',
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Which exception is raised when you try to open a file that does not exist?",
      options: [
        "ValueError",
        "TypeError",
        "FileNotFoundError",
        "ZeroDivisionError",
      ],
      correct: 2,
      explanation:
        "Opening a missing file raises FileNotFoundError. Catch it with except FileNotFoundError to show a friendly message instead of crashing.",
    },
  ],

  // ============================================================
  // DAY 16: What is Artificial Intelligence?
  // ============================================================
  16: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "According to Day 16, which of these is an example of AI in Aarav's daily life?",
      options: [
        "A printed school textbook",
        "Siri understanding his voice on the iPhone",
        "A wooden pencil",
        "A paper notebook",
      ],
      correct: 1,
      explanation:
        "Day 16 lists Siri, YouTube recommendations, Google Maps routing, face unlock, and Spotify suggestions as everyday AI tools.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "AI learns patterns from examples instead of being given a fixed list of steps for every case.",
      correctBool: true,
      explanation:
        "AI is a smart guesser. Instead of being told every step, it looks at lots of examples and finds patterns on its own.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Day 16 says AI can translate between languages, like Hindi to ____, by finding patterns in paired sentences.",
      answer: "English",
      explanation:
        "AI translation tools learn from millions of paired sentences across languages, like Hindi and English.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Which of these is something Day 16 says AI CANNOT do?",
      options: [
        "Translate languages",
        "Feel emotions or truly understand what it is saying",
        "Recognise patterns in huge data",
        "Play chess at world champion level",
      ],
      correct: 1,
      explanation:
        "AI has no feelings and no real understanding. It is just maths and code that predicts answers based on patterns.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "AI can discover a brand new fact that was never written anywhere before.",
      correctBool: false,
      explanation:
        "AI can only recombine what it was trained on. It cannot invent brand new facts that were never in its training data.",
    },
  ],

  // ============================================================
  // DAY 17: Machine Learning vs Deep Learning
  // ============================================================
  17: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 17 says: in traditional programming you give rules and data and the computer gives answers. In machine learning, you give...",
      options: [
        "Only rules",
        "Data and answers, and the computer finds the rules",
        "Only money",
        "Nothing, the computer guesses randomly",
      ],
      correct: 1,
      explanation:
        "ML flips the script. You give the computer examples with answers, and it figures out the rules on its own.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "All deep learning is machine learning, but not all machine learning is deep learning.",
      correctBool: true,
      explanation:
        "Deep learning is a special kind of ML that uses neural networks with many layers. Day 17 compares it to how all cricket is a sport, but not all sports are cricket.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The word ____ in deep learning refers to the many layers in the neural network.",
      answer: "deep",
      explanation:
        "Deep means the network has many layers stacked deep. The first layer looks at tiny edges, the next at shapes, and so on.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Which example did Day 17 give for deep learning?",
      options: [
        "Gmail detecting spam using keywords",
        "Predicting cricket scores from past matches",
        "iPhone Face ID recognising Aarav's face",
        "Sorting a list of numbers",
      ],
      correct: 2,
      explanation:
        "Face ID uses deep learning because faces are too complex for hand-picked rules. Spam filtering with keywords is a classic ML example.",
    },
    {
      id: 14,
      type: "true-false",
      question: "Deep learning usually needs MORE data and more computer power than simple machine learning.",
      correctBool: true,
      explanation:
        "DL needs lots of data to train its many layers and often needs powerful GPUs, while simple ML can run on a normal laptop.",
    },
  ],

  // ============================================================
  // DAY 18: Neural Networks
  // ============================================================
  18: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "In a neural network, which layer receives the raw data like pixels of a photo?",
      options: ["Output layer", "Input layer", "Hidden layer only", "Final layer"],
      correct: 1,
      explanation:
        "The input layer takes in raw data. Hidden layers do the thinking, and the output layer gives the final answer.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "In the friends voting analogy from Day 18, each friend represents one neuron checking one feature.",
      correctBool: true,
      explanation:
        "Each friend is like one neuron. Riya checks ears, Kabir checks tail, Samar checks face shape. Their votes combine to decide cat or dog.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "A single neuron takes inputs, multiplies each by a ____ (how important that input is), adds them up, and passes the result forward.",
      answer: "weight",
      explanation:
        "A high weight means this input matters a lot. A low weight means ignore it. Weights are tweaked during training.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "According to Day 18, how does a neural network learn?",
      options: [
        "It starts with perfect weights and gets worse over time",
        "It compares its guess to the correct answer and tweaks the weights to be less wrong, over thousands of tries",
        "It memorises one example and never changes",
        "It reads a textbook",
      ],
      correct: 1,
      explanation:
        "Weights start random, so the first guess is usually wrong. After each try, the network tweaks the weights to be less wrong next time.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "A single neuron on its own can decide whether a photo is a car or a bike.",
      correctBool: false,
      explanation:
        "A single neuron is too simple. The magic happens when many simple neurons work together in layers.",
    },
  ],

  // ============================================================
  // DAY 19: Transformers and Attention
  // ============================================================
  19: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 19 says older language models called RNNs had a big problem. What was it?",
      options: [
        "They were too fast",
        "They read one word at a time and often forgot the first words by the end of a long sentence",
        "They could not read at all",
        "They used too much attention",
      ],
      correct: 1,
      explanation:
        "RNN stands for Recurrent Neural Network. It reads left to right, so by the end of a long sentence it often forgets the early words.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "Transformers process all words in a sentence at once, instead of one at a time.",
      correctBool: true,
      explanation:
        "Unlike RNNs, transformers look at the whole sentence at the same time. This makes them faster to train and better at long sentences.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "The 2017 paper that introduced transformers is called \"____ Is All You Need\".",
      answer: "Attention",
      explanation:
        "Google researchers published \"Attention Is All You Need\" in 2017, introducing the Transformer architecture.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "In the sentence 'the cat sat on the mat because it was tired', what does attention help the model understand?",
      options: [
        "That 'it' refers to the cat, not the mat",
        "That the sentence is too long",
        "That 'sat' means tired",
        "That 'mat' is a type of cat",
      ],
      correct: 0,
      explanation:
        "Attention lets the model connect 'it' to 'cat' because a cat can be tired but a mat cannot.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "ChatGPT, Gemini, and Claude are all built on the transformer architecture.",
      correctBool: true,
      explanation:
        "Almost every modern AI text tool is built on transformers. The T in GPT stands for Transformer.",
    },
  ],

  // ============================================================
  // DAY 20: Large Language Models (LLMs)
  // ============================================================
  20: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 20 says an LLM is NOT a search engine. What does it actually do?",
      options: [
        "Looks up answers in a database",
        "Generates text by predicting the next word based on patterns it learned",
        "Stores huge files",
        "Translates videos into text",
      ],
      correct: 1,
      explanation:
        "An LLM predicts the next word over and over. It does not look up facts, it generates text from patterns.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "In GPT, the G stands for Generative, which means it generates new text instead of just classifying existing data.",
      correctBool: true,
      explanation:
        "GPT stands for Generative Pre-trained Transformer. Generative means it produces new text, Pre-trained means trained once on huge data, Transformer is the architecture.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "GPT stands for Generative ____-trained Transformer.",
      answer: "Pre",
      explanation:
        "Pre-trained means the model was trained once on a huge pile of text before you ever use it, so you can use it right away.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Which company makes Claude, known for being careful and safe in its answers?",
      options: ["OpenAI", "Google", "Anthropic", "Meta"],
      correct: 2,
      explanation:
        "Claude is made by Anthropic. Day 20 lists ChatGPT by OpenAI, Gemini by Google, Llama by Meta, and Mistral by Mistral AI.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "All LLMs are exactly the same and you should pick whichever is cheapest.",
      correctBool: false,
      explanation:
        "Day 20 says this is a common mistake. Some LLMs are better at math, some at coding, some at creative writing. Choosing the right one for the task matters.",
    },
  ],

  // ============================================================
  // DAY 21: Tokens, Context Window, and Embeddings
  // ============================================================
  21: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "According to Day 21, how is the word 'Spider-Man' usually split into tokens?",
      options: [
        "1 token",
        "2 tokens: Spider, Man",
        "3 tokens: Spider, -, Man",
        "5 tokens",
      ],
      correct: 2,
      explanation:
        "Day 21's table shows Spider-Man as 3 tokens: Spider, the hyphen, and Man. Common words like 'cat' fit in one token.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "The context window is the maximum number of tokens an LLM can look at in one go, including both input and output.",
      correctBool: true,
      explanation:
        "A bigger context window lets you give the model longer documents. Day 21 says it is like Aarav's short-term memory.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Before an LLM can work with tokens, it turns each one into a list of numbers called an ____.",
      answer: "embedding",
      explanation:
        "Embeddings are learned numbers where words with similar meanings get similar values, so the model can understand meaning, not just spellings.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Which context window from Day 21 can hold about 300 pages, roughly a whole book?",
      options: ["Old GPT-3 with 2K tokens", "GPT-4 Turbo with 128K tokens", "A printed notebook", "A 1-token window"],
      correct: 1,
      explanation:
        "GPT-4 Turbo has a 128K token window, about 300 pages. Gemini 1.5 Pro can reach up to 2M tokens.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "Embeddings are random numbers assigned to each word.",
      correctBool: false,
      explanation:
        "Embeddings are carefully learned so that the distance between any two embeddings reflects how related the meanings are. They are not random.",
    },
  ],

  // ============================================================
  // DAY 22: Prompt Engineering
  // ============================================================
  22: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 22 gives an easy rule for writing good prompts. What are the four parts?",
      options: [
        "Role, Task, Format, Audience",
        "Read, Type, Find, Answer",
        "Run, Test, Fix, Apply",
        "Reason, Time, Fun, Always",
      ],
      correct: 0,
      explanation:
        "Tell the model who to be (role), what to do (task), how to format it (format), and who it is for (audience).",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "A system prompt is a hidden instruction that sets the model's behaviour for the whole conversation.",
      correctBool: true,
      explanation:
        "System prompts are not shown to the user. For example, 'You are a friendly cricket coach for kids' shapes every answer the model gives.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "Giving the model no examples and trusting it to figure out the task is called ____-shot prompting.",
      answer: "zero",
      explanation:
        "Zero-shot means no examples. Few-shot means giving 2 to 5 examples first so the model can copy the style.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "According to Day 22, which temperature is best for creative stories and poems?",
      options: ["0", "0.3", "0.7", "1.0"],
      correct: 3,
      explanation:
        "Temperature 1.0 is very creative and gives different answers each time. Temperature 0 is precise and repeatable, best for maths and facts.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "Using high temperature for factual questions like 'what is the capital of India' is a good idea.",
      correctBool: false,
      explanation:
        "Day 22 calls this a common mistake. High temperature can give creative but wrong answers. Use low temperature for facts.",
    },
  ],

  // ============================================================
  // DAY 23: Hallucinations, RAG, and Fine-tuning
  // ============================================================
  23: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 23 says an AI hallucination is when...",
      options: [
        "The AI refuses to answer",
        "The AI confidently says something that is wrong",
        "The AI crashes",
        "The AI runs too slowly",
      ],
      correct: 1,
      explanation:
        "A hallucination is when the model confidently gives wrong information. It does not know it is wrong, it just predicts words that sound plausible.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "RAG stands for Retrieval-Augmented Generation, and it searches real documents first before answering.",
      correctBool: true,
      explanation:
        "RAG is like an open-book exam. Instead of guessing, the model looks at the right pages from a database of real documents, then answers.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "____ means taking a pre-trained model and training it a bit more on specific data, like a cricket academy's coaching chats.",
      answer: "Fine-tuning",
      explanation:
        "Fine-tuning changes the model itself by updating its weights ahead of time. RAG instead adds documents at the moment you ask the question.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Which technique is best for facts that change often, like today's cricket score?",
      options: ["Fine-tuning", "RAG", "Temperature 1", "Zero-shot"],
      correct: 1,
      explanation:
        "RAG looks up fresh documents each time, so it suits changing facts. Fine-tuning is better for stable style or domain knowledge.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "Fine-tuning changes the model's weights, while RAG does not.",
      correctBool: true,
      explanation:
        "Fine-tuning updates the model's internal weights during extra training. RAG just gives the model documents to read at question time, without changing it.",
    },
  ],

  // ============================================================
  // DAY 24: AI Agents and Tool Calling
  // ============================================================
  24: [
    {
      id: 10,
      type: "multiple-choice",
      question:
        "Day 24 says a regular LLM can talk, but an AI agent can also...",
      options: [
        "Take actions and use tools like web search or a calculator",
        "Run faster than a normal computer",
        "Replace a human teacher",
        "Store huge files forever",
      ],
      correct: 0,
      explanation:
        "An agent is an LLM that can take actions. Think of a friend who can chat, but also pick up the phone, use a calculator, and open apps for you.",
    },
    {
      id: 11,
      type: "true-false",
      question:
        "The LLM itself runs the weather API to fetch live data.",
      correctBool: false,
      explanation:
        "The LLM only outputs the instruction to call the tool. A separate program reads that instruction, runs the tool, and feeds the result back to the LLM.",
    },
    {
      id: 12,
      type: "fill-blank",
      question:
        "When the LLM outputs an instruction like 'call weather_tool(city=Delhi)', this is called ____ calling.",
      answer: "tool",
      explanation:
        "Tool calling (also called function calling) lets the LLM ask an external program to do something it cannot do itself, like check live weather.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Day 24 lists common tools agents use. Which of these is one of them?",
      options: [
        "A dictionary book",
        "A web search tool to look up fresh information",
        "A wooden pencil",
        "A printer only",
      ],
      correct: 1,
      explanation:
        "Agents often use web search, calculators, code interpreters, weather APIs, calendar tools, and email tools to take real actions.",
    },
    {
      id: 14,
      type: "true-false",
      question:
        "Day 24 warns that agents can be risky, so always check what actions the agent is allowed to take, especially for things like sending emails or spending money.",
      correctBool: true,
      explanation:
        "Agents are useful but also risky. Always check the permissions for actions like sending emails or spending money before letting an agent run.",
    },
  ],
};
