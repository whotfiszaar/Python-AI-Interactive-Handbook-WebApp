import type { Exercise } from "@/types";

// Additional exercises for Days 1-24. Each day has 7 extra exercises with
// IDs starting at 10 so they never collide with the existing exercise IDs
// (which run 1-5) inside the day content files. When combined with the
// existing exercises, every day now has at least 10 practice problems.
// Topics stay inside the curriculum of each day and use child-friendly
// themes: Aarav, cars, cricket, Minecraft, Spider-Man, and friends.

export const extraExercises1to24: Record<number, Exercise[]> = {
  // ============================================================
  // DAY 1: What is Python? Your First Program
  // ============================================================
  1: [
    {
      id: 10,
      difficulty: "easy",
      description: "Print the line: Aarav loves cricket on the screen using the print() function.",
      hint: "Wrap the words in quotes inside print(), like print(\"Aarav loves cricket\").",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Print three Minecraft block names (dirt, stone, diamond_ore) each on its own line using three separate print() calls.",
      hint: "Use three print() statements, one per line. Each block name goes in quotes.",
    },
    {
      id: 12,
      difficulty: "easy",
      description: "Print a single line that shows your age like this: I am 13 years old.",
      hint: "You can put the whole sentence inside one pair of quotes.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a comment on the first line saying This is my second program, then print a short cricket scoreboard line like India 186/4.",
      hint: "Start the comment with #. Then write your print() on the next line.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Print a four-line chant for Aarav's favorite cricket team. Then add a # comment above each line explaining what that line says.",
      hint: "Each print() is one line of the chant. Put a # comment line above each print().",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write five print() statements that describe Aarav's day. Then comment out the third line only, and run the program to confirm only four lines print.",
      hint: "Put a # at the start of the third print() line to disable it without deleting it.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Use print() twice. The first call prints a heading: My Spider-Man Story. The second call prints a one-paragraph (3 sentence) story all on one line. Add a # comment above the story explaining what it is.",
      hint: "You can keep three sentences inside one string with spaces between them. The comment goes on the line above.",
    },
  ],

  // ============================================================
  // DAY 2: Variables and Data Types
  // ============================================================
  2: [
    {
      id: 10,
      difficulty: "easy",
      description: "Create a variable called car_name and store the name of your favorite car in it. Then print the variable.",
      hint: "car_name = \"Bugatti\" then print(car_name). Strings use quotes.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a variable aarav_age with the value 13. Print its value and then print its type using type().",
      hint: "Whole numbers are int. Use print(type(aarav_age)).",
    },
    {
      id: 12,
      difficulty: "easy",
      description: "Create a boolean variable called has_homework and set it to True. Print the variable.",
      hint: "Booleans are written with a capital letter: True or False, no quotes.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Create four variables for Aarav: name (str), age (int), height_cm (float), and is_cricketer (bool). Print each variable and its type on the same line.",
      hint: "Use print(name, type(name)) for each one. Notice the different types for different values.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Create a variable runs_today with the value 87. Print it. Then reassign it to 124 to show Aarav scored more runs after the second innings. Print it again.",
      hint: "Just write runs_today = 124 on a new line. The old value is replaced.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Create two variables: a = \"Aarav\" and b = \"Singh\". Swap their values WITHOUT using a third variable, then print both to confirm they swapped.",
      hint: "In Python you can swap in one line: a, b = b, a. Then print(a, b).",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Create a variable price = 4999.99. Print its type. Then convert it to an int using int() and print the new value and its type. Explain in a comment what happened to the decimals.",
      hint: "int(price) chops off the decimals. Add a # comment describing that the .99 was dropped.",
    },
  ],

  // ============================================================
  // DAY 3: Input and Output with f-strings
  // ============================================================
  3: [
    {
      id: 10,
      difficulty: "easy",
      description: "Ask the user for their favorite Minecraft block using input(), then print: Your favorite block is ____ using an f-string.",
      hint: "block = input(\"...\") then print(f\"Your favorite block is {block}\").",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Ask Aarav for his name using input() and print a greeting: Hello, ____! Welcome to Python. using an f-string.",
      hint: "name = input(\"What is your name? \") then use {name} inside the f-string.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Ask the user for two cricket scores (convert each with int()), then print: Total runs: ____ using an f-string with the sum.",
      hint: "Use int(input(\"...\")) twice, add them, and put the result inside { } in the f-string.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Ask the user for a car's top speed in mph (as a float). Print it rounded to 1 decimal place using :.1f inside the f-string.",
      hint: "speed = float(input(\"...\")) then print(f\"Top speed: {speed:.1f} mph\").",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Ask Aarav for his weight on Earth in kg (as a float). His weight on the Moon is about 1/6 of that. Print the Moon weight using :.2f in an f-string.",
      hint: "moon_weight = earth_weight / 6. Use {moon_weight:.2f} to show two decimals.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Ask for a cricket player's name, their runs, and the balls they faced. Print their strike rate (runs / balls * 100) rounded to 2 decimals using an f-string. Example: Virat strike rate: 152.78.",
      hint: "strike_rate = (runs / balls) * 100. Use {strike_rate:.2f} inside the f-string.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Ask for a product price and the discount percent. Print three lines using f-strings: original price, discount amount, and final price. All money values should use :.2f.",
      hint: "discount_amount = price * discount / 100. final = price - discount_amount. Print all three with :.2f.",
    },
  ],

  // ============================================================
  // DAY 4: Operators: Arithmetic, Comparison, Logical
  // ============================================================
  4: [
    {
      id: 10,
      difficulty: "easy",
      description: "Aarav scored 67 runs. Print how many more runs he needs to reach a century (100).",
      hint: "Use 100 - 67. Subtract from 100 to find the gap.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Print 2 raised to the power of 8 using the ** operator. This is how many bytes in 256, useful for Minecraft redstone limits.",
      hint: "Use 2 ** 8. The ** operator does exponents.",
    },
    {
      id: 12,
      difficulty: "easy",
      description: "Use the modulo operator (%) to check if 24 is even or odd. Print True if even, False if odd.",
      hint: "24 % 2 == 0 will be True because 24 is even.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Aarav has 350 rupees. A cricket ball costs 75 rupees. Print how many balls he can buy (use //) and how much money is left (use %).",
      hint: "350 // 75 gives the count. 350 % 75 gives the remainder.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "A Bugatti goes 261 mph and a Ferrari goes 211 mph. Use comparison operators to print True if the Bugatti is at least 50 mph faster than the Ferrari, False otherwise.",
      hint: "Use (bugatti - ferrari) >= 50. The >= means greater than or equal.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Compute and print the result of (8 + 4) * 3 - 18 / 2. Then explain in a comment why parentheses matter by removing them and noting the new result.",
      hint: "First compute the grouped version. Then compute 8 + 4 * 3 - 18 / 2 without parentheses and notice the difference. Add a # comment.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Aarav can play outside only if he has finished homework AND it is not raining. Create has_homework_done = True and is_raining = False. Use a logical operator to print whether he can play outside.",
      hint: "can_play = has_homework_done and not is_raining. Print(can_play).",
    },
  ],

  // ============================================================
  // DAY 5: Making Decisions: if, elif, else
  // ============================================================
  5: [
    {
      id: 10,
      difficulty: "easy",
      description: "Create a variable runs = 102. If runs is 100 or more, print \"Century!\", otherwise print \"Not a century\".",
      hint: "Use if runs >= 100: with an else: branch.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Ask the user for a temperature. If it is below 20, print \"Cold\". Otherwise print \"Warm\".",
      hint: "Use if temperature < 20: and else:. Convert input with float().",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Ask Aarav for his test score (out of 100). Print \"A grade\" for 90 and above, \"B grade\" for 75-89, \"C grade\" for 50-74, and \"Needs work\" below 50. Use elif.",
      hint: "Order matters. Check the highest grade first, then move down with elif, ending with else.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Ask Aarav which Minecraft mode he wants: creative or survival. Print a custom message for each. If he types anything else, print \"Unknown mode\".",
      hint: "Use if mode == \"creative\":, elif mode == \"survival\":, and else: for unknown.",
    },
    {
      id: 14,
      difficulty: "hard",
      description: "Ask for a year and tell Aarav if it is a leap year. Rule: divisible by 4 AND (not divisible by 100 OR divisible by 400).",
      hint: "Use year % 4 == 0 and (year % 100 != 0 or year % 400 == 0). Test with 2024 and 1900.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Ask for the price of a cricket bat and the money Aarav has. Print whether he can buy it, and if he can, print how much change he gets. If not, print how much more money he needs.",
      hint: "Use if money >= price: to compute change. Else compute price - money for the shortfall.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Ask Aarav for his age and whether he has a cricket kit (yes or no). He can join the academy if he is at least 10 AND has a kit, OR he is at least 14. Print \"Eligible\" or \"Not eligible\".",
      hint: "Use a combination: (age >= 10 and has_kit == \"yes\") or age >= 14. Wrap conditions in parentheses.",
    },
  ],

  // ============================================================
  // DAY 6: If/Else Practice: Real-Life Decisions
  // ============================================================
  6: [
    {
      id: 10,
      difficulty: "easy",
      description: "Ask Aarav if it is raining (yes or no). If yes, print \"Take an umbrella\". If no, print \"Enjoy the sun\".",
      hint: "Use if weather == \"yes\": with an else: branch.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Ask for the time in 24-hour format. If it is before 12, print \"Good morning Aarav\". Otherwise print \"Good afternoon Aarav\".",
      hint: "Convert input with int(). Compare time < 12.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "A movie ticket costs 200 rupees for adults, 100 for kids under 13, and 150 for seniors above 60. Ask Aarav his age and print the ticket price.",
      hint: "Use if age < 13: price = 100. elif age > 60: price = 150. else: price = 200.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Ask Aarav for his batting average. If it is above 50, print \"Pro batter\". Between 30 and 50, print \"Good batter\". Below 30, print \"Keep practicing\". Use a chained comparison.",
      hint: "You can write 30 <= average <= 50 directly in Python.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Ask Aarav what he wants to build in Minecraft: house, farm, or castle. For each, print a list of materials he will need. If he types something else, print \"Unknown build\".",
      hint: "Use if/elif/else. Each branch prints different materials as text.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Build a simple cricket selection check. Ask Aarav for his batting average and bowling average. Pick him as \"Batter\" if batting average is above 40 and bowling average is below 35. Pick him as \"Bowler\" if bowling average is below 25. Otherwise print \"All-rounder needed\". Use nested if/else.",
      hint: "Outer if checks batting > 40 and bowling < 35. elif checks bowling < 25. else for all-rounder message.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Ask for the day of the week. On Saturday or Sunday print \"Weekend, time for cricket!\". On Monday, Wednesday, or Friday print \"Cricket practice after school\". On Tuesday or Thursday print \"Homework day\". Any other input prints \"Not a valid day\".",
      hint: "Use if day in (\"Saturday\", \"Sunday\"): and elif day in (\"Monday\", \"Wednesday\", \"Friday\"): for grouping.",
    },
  ],

  // ============================================================
  // DAY 7: While Loops: Repeating with Conditions
  // ============================================================
  7: [
    {
      id: 10,
      difficulty: "easy",
      description: "Use a while loop to print the even numbers from 2 to 20.",
      hint: "Start n = 2. Loop while n <= 20. Print n, then n += 2.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Use a while loop to print a 5-4-3-2-1 countdown and then print \"Lift off!\" at the end.",
      hint: "Start count = 5. Loop while count >= 1. Print count then count -= 1. After the loop print the lift off message.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Ask Aarav for a number. Use a while loop to print that number's multiplication table from 1 to 10.",
      hint: "Start i = 1. Loop while i <= 10. Print n * i. Then i += 1.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Use a while loop to find the sum of all numbers from 1 to 50. Print the total at the end.",
      hint: "total = 0, n = 1. Loop while n <= 50. total += n. n += 1. Print total after the loop.",
    },
    {
      id: 14,
      difficulty: "hard",
      description: "Aarav has 1000 rupees saved. Each week he saves 150 more. Use a while loop to find how many weeks it takes to have at least 5000 rupees. Print the number of weeks.",
      hint: "saved = 1000, weeks = 0. Loop while saved < 5000. Add 150 and weeks += 1 each time.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Build a number guessing game. Pick a secret number like 7. Ask the user to guess in a while loop. Print \"Too high\" or \"Too low\" until they get it. Then print \"Correct!\".",
      hint: "Use while True with a break when guess == secret. Compare guess to secret for high/low hints.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Reverse the roles. The computer picks a number between 1 and 100 (you choose). Aarav gives hints: the user types \"higher\" or \"lower\". The computer adjusts its guess in a while loop until Aarav types \"correct\".",
      hint: "Keep low = 1, high = 100. Guess = (low + high) // 2. Adjust low or high based on the hint.",
    },
  ],

  // ============================================================
  // DAY 8: For Loops and the range() Function
  // ============================================================
  8: [
    {
      id: 10,
      difficulty: "easy",
      description: "Use a for loop with range() to print the squares of numbers from 1 to 10.",
      hint: "for n in range(1, 11): print(n * n). range stops before the second number.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Use a for loop to print each of Aarav's favorite cricket players from a list: Virat, Rohit, Bumrah, Gill.",
      hint: "for player in players: print(player). Loop directly over the list.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Use a for loop and the accumulator pattern to find the sum of all even numbers from 2 to 100. Print the total.",
      hint: "range(2, 101, 2) gives even numbers. Start total = 0 and add each number.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Use a for loop with range() to print the first 10 multiples of 7. Format each line like: 7 x 1 = 7.",
      hint: "for i in range(1, 11): print(f\"7 x {i} = {7 * i}\").",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Create a list of 5 Minecraft items. Use enumerate() in a for loop to print each item with a number like: 1. Pickaxe.",
      hint: "for index, item in enumerate(items, start=1): print(f\"{index}. {item}\"). enumerate can take a start value.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Use a for loop to find the factorial of 6 (6 x 5 x 4 x 3 x 2 x 1). Print the result.",
      hint: "Start result = 1. Loop for n in range(1, 7): result *= n. Print result.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Use a for loop to count how many vowels (a, e, i, o, u) are in the string \"Aarav loves cricket\". Print the count.",
      hint: "Loop for ch in text:. Use an if check like if ch.lower() in \"aeiou\":. Add to a counter.",
    },
  ],

  // ============================================================
  // DAY 9: Loop Practice: Nested Loops and Patterns
  // ============================================================
  9: [
    {
      id: 10,
      difficulty: "easy",
      description: "Use nested for loops to print a 4x4 grid of # symbols, with a space between each.",
      hint: "Outer loop 4 times for rows, inner loop 4 times for columns. Use print(\"#\", end=\" \") and an empty print() at the end of each row.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Use a nested loop to print a left-aligned right triangle of * with 5 rows. Row 1 has 1 star, row 5 has 5 stars.",
      hint: "Outer for i in range(1, 6). Inner for j in range(i): print(\"*\", end=\"\"). Then print() to end the row.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Use nested loops to print a hollow square of # with side length 5. Only the border shows #, the inside is spaces.",
      hint: "Print # on the first and last row, or first and last column of each row. Otherwise print a space.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Use nested loops to print a pyramid of stars with 5 rows. The top has 1 star, the bottom has 9 stars, centered.",
      hint: "For row i (1 to 5): print spaces first (5 - i of them), then (2 * i - 1) stars.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Use nested loops to print a 10x10 multiplication table from 1 to 10. Use end=\"\\t\" to align columns.",
      hint: "Outer for i in range(1, 11). Inner for j in range(1, 11): print(i * j, end=\"\\t\"). Then print() at end of each row.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Use nested loops to print a diamond pattern of stars with 5 rows in the top half and 5 in the bottom half (total 9 rows).",
      hint: "Top half: rows 1 to 5 with increasing stars centered. Bottom half: rows 4 to 1 with decreasing stars centered.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Use a nested loop to print all combinations of two dice rolls (1 to 6). Print each pair like: (1, 1), (1, 2), and so on.",
      hint: "Two for loops, both range(1, 7). Print as a tuple using f\"({d1}, {d2})\" with end=\" \". Add a newline after the inner loop.",
    },
  ],

  // ============================================================
  // DAY 10: Functions: Reusable Blocks of Code
  // ============================================================
  10: [
    {
      id: 10,
      difficulty: "easy",
      description: "Write a function called welcome() that prints \"Welcome to the cricket academy, Aarav!\". Call it twice.",
      hint: "def welcome(): then a print() inside. Call it with welcome().",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Write a function called double(n) that takes a number and returns it doubled. Test it with 21 and print the result.",
      hint: "def double(n): return n * 2. Then print(double(21)).",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a function called greet_player(name, sport) that returns a greeting string. Call it for Aarav and cricket, and print the result.",
      hint: "def greet_player(name, sport): return f\"Hi {name}, ready for {sport}?\". Then print the call.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a function called bmi(weight_kg, height_m) that returns the BMI value (weight / height squared). Test it with weight 45 and height 1.6 and print the result rounded to 1 decimal.",
      hint: "return weight_kg / (height_m ** 2). Wrap the call in round(..., 1) or use :.1f in a print f-string.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a function called is_even(n) that returns True if n is even, False otherwise. Use it in a print statement for the number 37.",
      hint: "def is_even(n): return n % 2 == 0. The expression already returns a bool.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a function called is_prime(n) that returns True if n is a prime number. Test it with 7 and 9 and print both results.",
      hint: "Loop from 2 to n - 1. If n % i == 0 for any i, return False. Otherwise return True at the end.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a function called over_runs(balls) that takes a list of 6 ball-by-ball runs and returns the total. Then write a second function called over_summary(balls) that calls over_runs and returns a string like \"Over total: 12 runs\". Print the summary.",
      hint: "First function uses sum(balls). Second function calls the first inside an f-string and returns it.",
    },
  ],

  // ============================================================
  // DAY 11: Functions Practice: Defaults and Multiple Returns
  // ============================================================
  11: [
    {
      id: 10,
      difficulty: "easy",
      description: "Write a function called greet(name, greeting=\"Hello\") that uses a default greeting. Call it once with just a name and once with both arguments.",
      hint: "def greet(name, greeting=\"Hello\"): then print(f\"{greeting}, {name}!\"). The default kicks in when greeting is omitted.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Write a function called power(base, exp=2) that returns base raised to exp, with exp defaulting to 2. Test it with power(5) and power(3, 4).",
      hint: "return base ** exp. The default makes power(5) act like power(5, 2).",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a function called min_max(a, b, c) that returns both the smallest and the largest of three numbers as a tuple. Unpack the result into two variables when calling it.",
      hint: "return min(a, b, c), max(a, b, c). Call it like low, high = min_max(5, 2, 9).",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a function called ticket_price(age, base=200) where the base price defaults to 200. Kids under 13 get half price. Return the final price. Test it for age 10 and age 25.",
      hint: "Use an if inside the function. Kids: return base / 2. Adults: return base.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a function called batting_stats(runs, balls, name=\"Aarav\") that returns a string with the strike rate. The name has a default. Test it with and without passing a name.",
      hint: "strike_rate = (runs / balls) * 100. Return f\"{name} strike rate: {strike_rate:.1f}\".",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a function called analyze_scores(scores) that returns three things: the average, the highest, and the lowest. Call it with a list of 5 cricket scores and unpack all three results.",
      hint: "return sum(scores) / len(scores), max(scores), min(scores). Unpack: avg, high, low = analyze_scores([...]).",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a function called order_pizza(size=\"medium\", toppings=0) where size can be small, medium, or large with prices 150, 250, 400, and each topping adds 30. Return the total. Test it three different ways: defaults only, with size only, and with both.",
      hint: "Use a dictionary inside the function to map size to price. Total = price + toppings * 30.",
    },
  ],

  // ============================================================
  // DAY 12: Lists: Storing Many Values in Order
  // ============================================================
  12: [
    {
      id: 10,
      difficulty: "easy",
      description: "Create a list of 5 cricket scores. Use max() and min() to print the highest and lowest scores.",
      hint: "scores = [45, 87, 102, 23, 67]. Use print(max(scores)) and print(min(scores)).",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a list of 4 Minecraft blocks. Use append() to add a fifth block, then print the list and its length.",
      hint: "blocks.append(\"obsidian\") adds to the end. len(blocks) gives the count.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Create a list of 6 friends' names. Use a for loop to print only the names that have 5 or more letters.",
      hint: "for name in friends: if len(name) >= 5: print(name).",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Start with a list of cricket scores: [12, 87, 45, 12, 87, 23]. Remove the duplicates using a set, then convert back to a list and print it.",
      hint: "unique = list(set(scores)). Sets cannot have duplicates, so converting drops them.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Create a list of 5 car names. Use slicing to print the first 3 cars and the last 2 cars separately.",
      hint: "cars[:3] gives the first three. cars[-2:] gives the last two.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Take a list of 5 cricket scores and reverse it WITHOUT using the reverse() method or [::-1]. Use a loop to build a new reversed list.",
      hint: "Loop from the end. new_list = []. for i in range(len(scores) - 1, -1, -1): new_list.append(scores[i]).",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Create a list of 8 random scores. Use a for loop to split them into two new lists: one of scores above 50, and one of scores 50 or below. Print both lists.",
      hint: "Make two empty lists. Loop through the scores and append to the right list based on the if condition.",
    },
  ],

  // ============================================================
  // DAY 13: Dictionaries: Key-Value Pairs
  // ============================================================
  13: [
    {
      id: 10,
      difficulty: "easy",
      description: "Create a dictionary of 3 cricket players and their highest scores. Print Virat's score by accessing it with his key.",
      hint: "scores = {\"Virat\": 183, ...}. Use print(scores[\"Virat\"]).",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a dictionary for a Minecraft player with keys: name, level, health. Print all keys using .keys() and all values using .values().",
      hint: "print(player.keys()) and print(player.values()).",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Create a report card dictionary with 5 subjects and marks. Use a for loop over .items() to print each subject and mark, then print the average.",
      hint: "for subject, mark in report.items(): print(subject, mark). Track total to compute the average.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Build a dictionary that counts how many times each letter appears in the word \"cricket\". Print the dictionary.",
      hint: "Start with an empty dict. for ch in word: counts[ch] = counts.get(ch, 0) + 1.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Create a dictionary of 4 cars and their top speeds. Add a new car, then update one existing car's speed. Print the dictionary after each change.",
      hint: "cars[\"Ferrari\"] = 211 adds or updates. Print the dict after each step.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Create a nested dictionary: 3 cricket players, each with keys runs and balls. Use a for loop to compute and print each player's strike rate.",
      hint: "players[\"Virat\"] = {\"runs\": 82, \"balls\": 54}. Loop and compute runs / balls * 100 per player.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Create a dictionary of 5 friends and their favorite games. Find and print the friend whose game name is the longest, and the game most friends chose (if there is a tie, print any one winner).",
      hint: "Loop over .items() to find the longest game name. Use another dict to count game popularity and pick the max.",
    },
  ],

  // ============================================================
  // DAY 14: Tuples, Sets, and String Methods
  // ============================================================
  14: [
    {
      id: 10,
      difficulty: "easy",
      description: "Create a tuple with Aarav's details: (name, age, favorite_sport). Unpack it into three variables and print each one.",
      hint: "info = (\"Aarav\", 13, \"cricket\"). Then name, age, sport = info.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Take the string \"Minecraft\". Print it in all uppercase, all lowercase, and print its length.",
      hint: "Use s.upper(), s.lower(), and len(s).",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Make a list of colors with duplicates: [\"red\", \"blue\", \"red\", \"green\", \"blue\"]. Convert it to a set to remove duplicates, then print both the list and the set.",
      hint: "set(colors) drops the duplicates. Print len() of each to compare.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Take the string \"Aarav loves cricket\". Use .split() to break it into words, then use .join() to put them back together with hyphens instead of spaces.",
      hint: "words = s.split(). joined = \"-\".join(words). Print the joined result.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Create two sets of friends: Aarav's cricket friends and Aarav's Minecraft friends. Print the friends who are in BOTH groups (intersection) and the friends in either group (union).",
      hint: "Use cricket_friends & minecraft_friends for intersection, and cricket_friends | minecraft_friends for union.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Take a string from the user. Check if it is a palindrome (reads the same forwards and backwards) using string slicing. Print True or False.",
      hint: "Compare s == s[::-1]. The [::-1] slice reverses the string.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Take the string \"Spider-Man is a superhero\". Count vowels, count consonants (ignore spaces and hyphens), replace \"superhero\" with \"cricketer\", and print all three results.",
      hint: "Use s.count() for vowels after lowercasing. Loop for consonants. Use s.replace(\"superhero\", \"cricketer\").",
    },
  ],

  // ============================================================
  // DAY 15: File Handling and Exceptions
  // ============================================================
  15: [
    {
      id: 10,
      difficulty: "easy",
      description: "Use io.StringIO to write three cricket team names (India, Australia, England), each on a new line. Then seek(0) and read them back, printing each.",
      hint: "import io. f = io.StringIO(). f.write(\"India\\n\"). f.seek(0). Loop with for line in f: print(line.strip()).",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Write a try/except block that tries to convert the string \"abc\" to an int. Catch the ValueError and print a friendly message.",
      hint: "try: n = int(\"abc\") except ValueError: print(\"That is not a number\").",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Use a loop to try converting [\"7\", \"hello\", \"42\", \"abc\", \"99\"] to integers. Print each success and catch ValueError for each failure with a friendly message.",
      hint: "for s in items: try int(s) inside try, except ValueError prints a failure line.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Use io.StringIO to write 4 of Aarav's favorite foods. Then read them back into a list and print the list and the count.",
      hint: "Write each food with a newline. seek(0). Loop with for line in f: foods.append(line.strip()).",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a try/except/else block. Try to divide 100 by a number the user gives. If the user types 0, catch ZeroDivisionError. If they type text, catch ValueError. The else prints the result only when nothing went wrong.",
      hint: "try: n = int(input()); result = 100 / n. except ZeroDivisionError: ... except ValueError: ... else: print(result).",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Build a cricket score logger. Use io.StringIO to write 5 player names and their scores in the format \"Virat:82\". Then read them back, split each line on the colon, and build a dictionary. Print the dictionary. Handle the case where a line might be empty.",
      hint: "Write each line with f\"{name}:{score}\\n\". seek(0). for line in f: skip empty lines, split on \":\", build a dict.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Ask the user for a number and an index. Try to print the number from the list [10, 20, 30] at that index. Catch IndexError if the index is out of range, and ValueError if the input is not a number. Use a finally block to print \"Done\" no matter what.",
      hint: "try: convert input to int, then access the list. except IndexError, except ValueError, finally: print(\"Done\").",
    },
  ],

  // ============================================================
  // DAY 16: What is Artificial Intelligence?
  // ============================================================
  16: [
    {
      id: 10,
      difficulty: "easy",
      description: "List five AI tools Aarav uses in daily life. For each, write one line on what it does. Write your answer as comments in a Python file.",
      hint: "Think about Siri, YouTube recommendations, Google Maps, face unlock, Spotify. Each line starts with #.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "In your own words, write a one-sentence Python comment that explains what AI is, using the phrase \"learns from examples\".",
      hint: "Use a # comment. Keep it to one sentence and include the phrase about learning from examples.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Make a Python list of 6 tasks. For each task, print \"AI can\" or \"AI cannot\" based on what you learned. Example tasks: translate Hindi, feel sad, recognize a face, invent a brand new fact.",
      hint: "Use a list of (task, can_or_cannot) tuples. Loop and print each. AI cannot feel or invent new facts.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a short Python program that asks Aarav to name an AI tool, then prints which company made it. Cover at least Siri, YouTube recommendations, and Google Maps.",
      hint: "Use a dictionary mapping tool names to companies. Look up the user input and print the company, or \"Unknown\".",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Trace the AI feedback loop from the lesson. Write a Python list of the 5 steps in order: user asks a question, AI looks for patterns, AI predicts an answer, user gets an answer, user feedback helps AI improve. Print each step on its own line.",
      hint: "Put the 5 steps as strings in a list in the correct order. Loop and print each one numbered.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that decides if a task is good for AI. Ask the user for a task. If it includes words like \"recognize\", \"predict\", \"translate\", or \"recommend\", print \"Good for AI\". Otherwise print \"Not a great fit for AI\".",
      hint: "Use a list of keywords. Loop through them and check if keyword in task.lower(). Set a flag if any match.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Build a small table in Python. Create a list of 4 tasks. For each, decide if AI can do it, partly do it, or not do it, and add a one-line reason. Print the table nicely aligned.",
      hint: "Use a list of tuples (task, ability, reason). Loop and print with formatted columns using f-strings and padding like {task:<20}.",
    },
  ],

  // ============================================================
  // DAY 17: Machine Learning vs Deep Learning
  // ============================================================
  17: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, finish this sentence: All deep learning is ___, but not all ___ is deep learning.",
      hint: "The missing word is machine learning. Write it as a # comment.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create two Python lists: one called ml_examples and one called dl_examples. Add at least two examples to each. Example ML: spam filter. Example DL: face unlock.",
      hint: "ml_examples = [\"spam filter\", \"cricket score predictor\"]. dl_examples = [\"face unlock\", \"self-driving car\"].",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a Python program that asks the user for a task and classifies it as ML or DL based on keywords. \"face\", \"image\", \"photo\", \"self-driving\" suggest DL. \"spam\", \"score\", \"recommend\" suggest ML.",
      hint: "Lowercase the input. Check which keyword list has a match. Print the classification.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Explain in a Python comment why iPhone Face ID uses deep learning instead of basic machine learning. Mention that faces are too complex for hand-picked rules.",
      hint: "Write a # comment. The key point is that faces have too many tiny details for simple rules to capture.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Build a comparison table in Python. Print 4 rows comparing ML and DL on: how it learns, data needed, computer power, and example. Use f-strings with padding so the columns line up.",
      hint: "Use a list of (feature, ml, dl) tuples. Loop and print with {feature:<18}{ml:<25}{dl:<25} inside an f-string.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that explains the YouTube recommendation loop. Use a list of 5 steps in order (Aarav watches a Virat video, YouTube logs it, etc.) and print them numbered. End with a comment on why the recommendations improve over time.",
      hint: "Put the 5 steps in the right order as strings. Loop with enumerate for numbering. Add a # comment about learning from clicks.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Create a small quiz program. Ask Aarav 3 questions: (1) Is DL a type of ML? (2) What does \"deep\" refer to? (3) Which needs more data? Print his score out of 3 at the end.",
      hint: "Use input() and compare answers with ==. Track a score variable. Print the final score.",
    },
  ],

  // ============================================================
  // DAY 18: Neural Networks
  // ============================================================
  18: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, list the three layers of a neural network in order: input, hidden, output.",
      hint: "Write the three layer names as a # comment, separated by commas or arrows.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python list of 4 friends who each check one feature in a photo: Riya checks ears, Kabir checks tail, Samar checks face shape, and Diya checks fur color. Print each friend and their feature.",
      hint: "Use a list of (name, feature) tuples. Loop and print with f-strings.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Explain in a Python comment why a single neuron cannot decide on its own whether a photo is a car or a bike. Mention that one neuron is too simple.",
      hint: "Write a # comment. The key idea is that a single neuron only checks one simple thing.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a Python program that traces a car photo through a neural network. Print each layer and what it checks: input layer receives pixels, hidden layer 1 checks wheels, hidden layer 2 checks shape and color, output layer decides car or bike.",
      hint: "Use a list of (layer, job) tuples. Loop and print each one numbered.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Build the friends voting analogy in Python. Create a list of 4 friends, each with a vote of \"cat\" or \"dog\". Count the votes and print which animal wins.",
      hint: "Use a list of votes. Count cat and dog using .count() or a loop. Print the winner.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that simulates a tiny voting network. Three friends each give a number between 0 and 1 (their confidence the photo is a car). Add the numbers and print \"Car\" if the total is above 1.5, otherwise print \"Bike\".",
      hint: "Use a list of 3 confidences. Sum them. Compare to 1.5 with an if/else.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a Python program that explains how a neural network learns, in 4 steps. Print each step numbered. Then add a comment that weights start random and get better over time.",
      hint: "Use the 4 steps from the lesson: first guess is wrong, compare to correct answer, tweak weights, repeat. Add a # comment.",
    },
  ],

  // ============================================================
  // DAY 19: Transformers and Attention
  // ============================================================
  19: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, explain in one sentence why older models like RNNs struggled with long sentences. Mention they read one word at a time.",
      hint: "Write a # comment. The key idea is that RNNs read word by word and forget early words.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python list of 3 transformer-based AI tools (for example ChatGPT, Gemini, Claude). Print each one with a number.",
      hint: "tools = [\"ChatGPT\", \"Gemini\", \"Claude\"]. Loop with enumerate for the numbers.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a Python program that explains attention. Create a sentence: \"Aarav kicked the red ball\". Print which word the model pays attention to in order to understand \"kicked\". Hint: it should be \"ball\".",
      hint: "Store the sentence as a string. Print which word best explains the action. Explain with a # comment why.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a Python program that prints 3 differences between transformers and older models. Use a list and loop. Cover: process all words at once, use attention, handle long sentences better.",
      hint: "Make a list of 3 difference strings. Loop and print each one numbered.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "In Python, build a tiny attention-style demo. Take the word \"bat\" in two sentences: \"Aarav hit the ball with the bat\" and \"A bat flew across the cave\". Print which word in each sentence helps the model know if bat means cricket bat or the animal.",
      hint: "Sentence 1: \"ball\" gives context for cricket bat. Sentence 2: \"flew\" and \"cave\" give context for the animal. Print these in Python.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that asks Aarav for a short sentence, then prints each word and an attention score (just a made-up number between 0 and 1) for how much the model focuses on it. Use a loop and random numbers if you like.",
      hint: "Split the sentence with .split(). Loop over each word. Assign a score (random.random() if you want). Print word and score.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Build a small table in Python that compares RNNs and transformers on 3 things: how they read text, how they handle long sentences, and speed. Print the table with aligned columns.",
      hint: "Use a list of (feature, rnn, transformer) tuples. Loop and print with f-string padding like {feature:<22}.",
    },
  ],

  // ============================================================
  // DAY 20: Large Language Models (LLMs)
  // ============================================================
  20: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, decode the letters of GPT. Write: G = Generative, P = Pre-trained, T = Transformer.",
      hint: "Write three # comments, one for each letter and its meaning.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python dictionary of 5 LLMs and their makers. Include GPT by OpenAI, Gemini by Google, Claude by Anthropic, Llama by Meta, and DeepSeek by DeepSeek. Print each pair.",
      hint: "Use llms = {\"GPT\": \"OpenAI\", ...}. Loop over .items() to print.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a Python program that plays the next-word prediction game. Start with \"Aarav loves to play\". Print 3 likely next words you think the model might suggest, in a list.",
      hint: "Start with the prefix string. Put 3 guesses in a list. Print the list. Cricket is a strong guess.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "In a Python comment, explain why an LLM is NOT a search engine. Mention that it predicts the next word instead of looking up answers.",
      hint: "Write a # comment. The key point is prediction vs lookup.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a Python program that simulates an LLM building a sentence. Start with \"Aarav loves\". Use a list of 4 next words (one at a time) and print the growing sentence after each word is added.",
      hint: "Start with sentence = \"Aarav loves\". For each word in a list, do sentence += \" \" + word and print(sentence).",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Build a small table in Python comparing 4 LLMs on: maker, known for, and one example use. Print the table with aligned columns using f-strings.",
      hint: "Use a list of (llm, maker, known_for, use) tuples. Loop and print with padding like {llm:<12}{maker:<12}{known_for:<28}{use:<24} inside an f-string.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a Python program that explains why LLMs sound human even though they do not understand words. Print 3 reasons in a numbered list. End with a comment about how they were trained on lots of human writing.",
      hint: "Use a list of 3 reason strings. Loop and print with numbers. Add a # comment about training data.",
    },
  ],

  // ============================================================
  // DAY 21: Tokens, Context Window, and Embeddings
  // ============================================================
  21: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, estimate the token count for each of these words: Aarav (1), cat (1), Unbelievable (3), Spider-Man (3).",
      hint: "Write the words and counts as # comments. Common words are 1 token, long words get split.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python dictionary of 4 LLMs and their context window sizes (GPT-3: 2K, GPT-4 Turbo: 128K, Gemini 1.5 Pro: 2M, Claude 3: 200K). Print each pair.",
      hint: "windows = {\"GPT-3\": \"2K\", ...}. Loop over .items() to print.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "In a Python comment, explain the context window as Aarav's short-term memory. Mention that if a teacher says too much, only the most recent bits stick.",
      hint: "Write a # comment using the short-term memory analogy from the lesson.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a Python program that prints 4 pairs of words and says whether their embeddings would be close or far. Example: (cricket, football) close, (pizza, car) far.",
      hint: "Use a list of (word1, word2, distance) tuples. Loop and print each. Similar meanings are close.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a Python program that simulates token splitting. Take the sentence \"Spider-Man is unbelievable\" and print a list of tokens you think the model would create.",
      hint: "Use a list like [\"Spider\", \"-\", \"Man\", \"is\", \"un\", \"believ\", \"able\"]. Print the list and its length.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that explains embeddings. Take 3 words: cricket, football, pizza. Print which two would have embeddings closest to each other and why, in a comment.",
      hint: "cricket and football are both sports, so they are close. pizza is far. Print this and add a # comment.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Build a small program that estimates token cost. Ask Aarav for a sentence. Estimate the tokens as roughly the number of words plus 1 extra token for every word longer than 8 letters. Print the estimate.",
      hint: "Split the sentence. tokens = len(words) + sum(1 for w in words if len(w) > 8). Print the total.",
    },
  ],

  // ============================================================
  // DAY 22: Prompt Engineering
  // ============================================================
  22: [
    {
      id: 10,
      difficulty: "easy",
      description: "Rewrite this bad prompt into a good one: \"tell me about cars\". Add a format, an audience, and a length limit. Write the improved prompt in a Python string and print it.",
      hint: "Example: \"Explain 3 differences between petrol and electric cars in bullet points for a 13-year-old.\" Print the string.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "In a Python comment, write the 4 parts of a good prompt: Role, Task, Format, Audience.",
      hint: "Write four # comments, one for each part with a short example.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Write a system prompt for a friendly cricket coach for kids. Save it in a Python string and print it. The system prompt should tell the model its role and tone.",
      hint: "Example: \"You are a friendly cricket coach for kids. Always answer in simple words and be encouraging.\"",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a few-shot prompt in Python. Show 2 examples (Spider-Man -> Superhero, Virat Kohli -> Cricketer), then ask the model to classify \"iPhone\" and \"Iron Man\". Print the whole prompt as a multi-line string.",
      hint: "Use a triple-quoted string with the examples and the new inputs to classify.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "In a Python comment, explain what temperature controls in an LLM. Mention that low means precise and high means creative.",
      hint: "Write a # comment covering the low-precise vs high-creative idea.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Write a Python program that picks the right temperature for a task. Ask the user what they want to do (math, story, summary, code). Print the suggested temperature based on a small lookup table.",
      hint: "Use a dictionary mapping task to temperature (math: 0, story: 1.0, summary: 0.3, code: 0). Look up the input.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Take the bad prompt \"write about minecraft\". Improve it using Role, Task, Format, and Audience. Then explain in a comment why each addition makes the answer better. Print the improved prompt and the explanation.",
      hint: "Improved: \"You are a Minecraft expert. Write 3 tips for surviving the first night in bullet points for a 13-year-old.\" Add # comments for each part.",
    },
  ],

  // ============================================================
  // DAY 23: Hallucinations, RAG, and Fine-tuning
  // ============================================================
  23: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, define what an AI hallucination is. Mention that the model confidently says something wrong.",
      hint: "Write a # comment. The key words are confidently and wrong.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python list of 3 hallucination examples. Include inventing a fake book title, making up a cricket score, and giving a wrong date.",
      hint: "examples = [\"invented book title\", \"made-up cricket score\", \"wrong date\"]. Print the list.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "In a Python comment, explain why RAG is like an open-book exam. Mention that the model searches real documents before answering.",
      hint: "Write a # comment using the open-book exam analogy from the lesson.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "Write a Python program that decides between RAG and fine-tuning for 3 tasks. (1) Look up today's cricket score, (2) Speak like a cricket coach, (3) Answer questions from a school handbook. Print RAG or Fine-tuning for each.",
      hint: "Use a list of (task, choice) tuples. RAG for fresh or changing facts, fine-tuning for stable style.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a Python program that prints the steps of RAG in order: user query, search database, find relevant documents, inject context into prompt, LLM reads context, LLM answers. Number each step.",
      hint: "Put the 6 steps in a list in the correct order. Loop with enumerate to print numbered.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Build a comparison table in Python. Compare RAG and fine-tuning on 4 things: when it happens, does it change the model, best for, and example. Print the table with aligned columns.",
      hint: "Use a list of (feature, rag, finetune) tuples. Loop and print with f-string padding.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a Python program that explains why LLMs hallucinate. Print 4 reasons in a numbered list. End with a comment that RAG is one way to reduce hallucinations.",
      hint: "Reasons: they predict plausible words, training data may lack the answer, vague prompts, recent events not in training. Add a # comment.",
    },
  ],

  // ============================================================
  // DAY 24: AI Agents and Tool Calling
  // ============================================================
  24: [
    {
      id: 10,
      difficulty: "easy",
      description: "In a Python comment, write the main difference between a regular LLM and an AI agent. Mention that an agent can take actions and use tools.",
      hint: "Write a # comment. The key idea is actions and tools, not just text.",
    },
    {
      id: 11,
      difficulty: "easy",
      description: "Create a Python list of 4 tools an agent might use. Include web search, calculator, code interpreter, and weather API.",
      hint: "tools = [\"web search\", \"calculator\", \"code interpreter\", \"weather API\"]. Print the list.",
    },
    {
      id: 12,
      difficulty: "medium",
      description: "Trace the agent flow for a weather question in Python. Print each step in order: user asks about Delhi weather, LLM calls the weather tool, tool returns the data, LLM writes a friendly answer.",
      hint: "Put the 4 steps in a list in order. Loop and print each numbered.",
    },
    {
      id: 13,
      difficulty: "medium",
      description: "In a Python comment, explain the common mistake about tool calling. Mention that the LLM does NOT run the tool itself, a separate program does.",
      hint: "Write a # comment. The LLM only outputs the instruction to call the tool.",
    },
    {
      id: 14,
      difficulty: "medium",
      description: "Write a Python program that simulates tool calling. The user asks a question. If the question contains \"weather\", print \"call weather_tool\". If it contains \"calculate\", print \"call calculator_tool\". Otherwise print \"answer from memory\".",
      hint: "Use if \"weather\" in question.lower() and elif for calculate. Use a default else for memory.",
    },
    {
      id: 15,
      difficulty: "hard",
      description: "Design 3 tools for a homework helper agent in Python. For each tool, print its name, what it does, and one example input. Example: math_solver, solves equations, input \"2x + 5 = 11\".",
      hint: "Use a list of (name, purpose, example) tuples. Loop and print with f-strings.",
    },
    {
      id: 16,
      difficulty: "hard",
      description: "Write a Python program that explains when to use an agent instead of a plain LLM. Print 3 scenarios where an agent is better (live data, running code, sending messages). End with a safety comment that you should always check what actions the agent can take.",
      hint: "Use a list of 3 scenario strings. Loop and print. Add a # comment about safety and checking allowed actions.",
    },
  ],
};
