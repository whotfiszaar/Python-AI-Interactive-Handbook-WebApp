import type { CodingChallenge } from "@/types";

export const codingChallenges: CodingChallenge[] = [
  {
    "id": 1,
    "title": "Hello, World!",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print the text `Hello, World!` to the screen.",
    "examples": [
      {
        "input": "",
        "output": "Hello, World!"
      }
    ],
    "starterCode": "# Write your code here\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Hello, World!",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use print() with quotes."
    ]
  },
  {
    "id": 2,
    "title": "Welcome Message",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `Welcome to Python Programming!`.",
    "examples": [
      {
        "input": "",
        "output": "Welcome to Python Programming!"
      }
    ],
    "starterCode": "# Print welcome message\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Welcome to Python Programming!",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use print()."
    ]
  },
  {
    "id": 3,
    "title": "Print Number 100",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print the number `100`.",
    "examples": [
      {
        "input": "",
        "output": "100"
      }
    ],
    "starterCode": "# Print 100\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "100",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(100)"
    ]
  },
  {
    "id": 4,
    "title": "Print Sum 5+7",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print the sum of 5 and 7 directly.",
    "examples": [
      {
        "input": "",
        "output": "12"
      }
    ],
    "starterCode": "# Print 5+7\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "12",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(5 + 7)"
    ]
  },
  {
    "id": 5,
    "title": "Define name variable",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Define `name = \"Aarav\"` and print it.",
    "examples": [
      {
        "input": "",
        "output": "Aarav"
      }
    ],
    "starterCode": "name = \"Aarav\"\n# Print name\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Aarav",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(name)"
    ]
  },
  {
    "id": 6,
    "title": "Define age variable",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Define `age = 13` and print it.",
    "examples": [
      {
        "input": "",
        "output": "13"
      }
    ],
    "starterCode": "age = 13\n# Print age\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "13",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(age)"
    ]
  },
  {
    "id": 7,
    "title": "Sum two variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Given `a = 15` and `b = 25`, print their sum.",
    "examples": [
      {
        "input": "",
        "output": "40"
      }
    ],
    "starterCode": "a = 15\nb = 25\n# Sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "40",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(a + b)"
    ]
  },
  {
    "id": 8,
    "title": "Subtract two variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Given `x = 50` and `y = 20`, print `x - y`.",
    "examples": [
      {
        "input": "",
        "output": "30"
      }
    ],
    "starterCode": "x = 50\ny = 20\n# Subtract\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "30",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(x - y)"
    ]
  },
  {
    "id": 9,
    "title": "Multiply two variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Given `m = 6` and `n = 8`, print `m * n`.",
    "examples": [
      {
        "input": "",
        "output": "48"
      }
    ],
    "starterCode": "m = 6\nn = 8\n# Multiply\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "48",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(m * n)"
    ]
  },
  {
    "id": 10,
    "title": "Divide two variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Given `p = 80` and `q = 4`, print `p / q`.",
    "examples": [
      {
        "input": "",
        "output": "20.0"
      }
    ],
    "starterCode": "p = 80\nq = 4\n# Divide\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(p / q)"
    ]
  },
  {
    "id": 11,
    "title": "Double a Number",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Write a program that takes an input number and prints its double.",
    "examples": [
      {
        "input": "10",
        "output": "20"
      }
    ],
    "starterCode": "num = int(input())\n# Print double\n",
    "testCases": [
      {
        "id": 1,
        "input": "10",
        "expected": "20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Multiply by 2"
    ]
  },
  {
    "id": 12,
    "title": "Triple a Number",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Take an input number and print its triple.",
    "examples": [
      {
        "input": "5",
        "output": "15"
      }
    ],
    "starterCode": "num = int(input())\n# Print triple\n",
    "testCases": [
      {
        "id": 1,
        "input": "5",
        "expected": "15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Multiply by 3"
    ]
  },
  {
    "id": 13,
    "title": "Square of a Number",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Take an input number and print its square.",
    "examples": [
      {
        "input": "6",
        "output": "36"
      }
    ],
    "starterCode": "num = int(input())\n# Print square\n",
    "testCases": [
      {
        "id": 1,
        "input": "6",
        "expected": "36",
        "label": "Test 1"
      }
    ],
    "hints": [
      "num ** 2"
    ]
  },
  {
    "id": 14,
    "title": "Cube of a Number",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Take an input number and print its cube.",
    "examples": [
      {
        "input": "3",
        "output": "27"
      }
    ],
    "starterCode": "num = int(input())\n# Print cube\n",
    "testCases": [
      {
        "id": 1,
        "input": "3",
        "expected": "27",
        "label": "Test 1"
      }
    ],
    "hints": [
      "num ** 3"
    ]
  },
  {
    "id": 15,
    "title": "Area of Rectangle",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given length = 12 and width = 7, print the area.",
    "examples": [
      {
        "input": "",
        "output": "84"
      }
    ],
    "starterCode": "length = 12\nwidth = 7\n# Area\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "84",
        "label": "Test 1"
      }
    ],
    "hints": [
      "length * width"
    ]
  },
  {
    "id": 16,
    "title": "Perimeter of Rectangle",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given length = 10 and width = 5, print the perimeter.",
    "examples": [
      {
        "input": "",
        "output": "30"
      }
    ],
    "starterCode": "length = 10\nwidth = 5\n# Perimeter\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "30",
        "label": "Test 1"
      }
    ],
    "hints": [
      "2 * (length + width)"
    ]
  },
  {
    "id": 17,
    "title": "Modulo Remainder",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print the remainder when 17 is divided by 5.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "# Print modulo\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use % operator."
    ]
  },
  {
    "id": 18,
    "title": "Floor Division",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print the floor division of 19 by 4.",
    "examples": [
      {
        "input": "",
        "output": "4"
      }
    ],
    "starterCode": "# Floor division\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "4",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use // operator."
    ]
  },
  {
    "id": 19,
    "title": "Average of Three",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `a=10`, `b=20`, `c=30`, print their average as a float.",
    "examples": [
      {
        "input": "",
        "output": "20.0"
      }
    ],
    "starterCode": "a = 10\nb = 20\nc = 30\n# Average\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "(a + b + c) / 3"
    ]
  },
  {
    "id": 20,
    "title": "Swap Variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Swap `x = 5` and `y = 10`. Print x and y on separate lines.",
    "examples": [
      {
        "input": "",
        "output": "10\n5"
      }
    ],
    "starterCode": "x = 5\ny = 10\n# Swap\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10\n5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "x, y = y, x"
    ]
  },
  {
    "id": 21,
    "title": "String Concatenation",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Concatenate `hello` and `world` with a space and print.",
    "examples": [
      {
        "input": "",
        "output": "hello world"
      }
    ],
    "starterCode": "a = \"hello\"\nb = \"world\"\n# Concatenate\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "hello world",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a + ' ' + b"
    ]
  },
  {
    "id": 22,
    "title": "Float Conversion",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert integer 5 to float and print.",
    "examples": [
      {
        "input": "",
        "output": "5.0"
      }
    ],
    "starterCode": "x = 5\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "5.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "float(x)"
    ]
  },
  {
    "id": 23,
    "title": "Int Conversion",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert string \"25\" to integer and print.",
    "examples": [
      {
        "input": "",
        "output": "25"
      }
    ],
    "starterCode": "s = \"25\"\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "25",
        "label": "Test 1"
      }
    ],
    "hints": [
      "int(s)"
    ]
  },
  {
    "id": 24,
    "title": "String Conversion",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert integer 100 to string, add it to string \" dollars\" and print.",
    "examples": [
      {
        "input": "",
        "output": "100 dollars"
      }
    ],
    "starterCode": "n = 100\n# Convert and print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "100 dollars",
        "label": "Test 1"
      }
    ],
    "hints": [
      "str(n) + ' dollars'"
    ]
  },
  {
    "id": 25,
    "title": "Exponent Math",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print 2 to the power of 10.",
    "examples": [
      {
        "input": "",
        "output": "1024"
      }
    ],
    "starterCode": "# Power\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1024",
        "label": "Test 1"
      }
    ],
    "hints": [
      "2 ** 10"
    ]
  },
  {
    "id": 26,
    "title": "Negative Number Modulo",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print the result of `-5 % 3`.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "# Modulo\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "In Python, -5 % 3 is 1."
    ]
  },
  {
    "id": 27,
    "title": "Unary Minus",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `val = 15`, print its negative value.",
    "examples": [
      {
        "input": "",
        "output": "-15"
      }
    ],
    "starterCode": "val = 15\n# Negative\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "-15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "-val"
    ]
  },
  {
    "id": 28,
    "title": "Operator Precedence 1",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print the result of `2 + 3 * 4`.",
    "examples": [
      {
        "input": "",
        "output": "14"
      }
    ],
    "starterCode": "# Precedence\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "14",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Multiplication first."
    ]
  },
  {
    "id": 29,
    "title": "Operator Precedence 2",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print the result of `(2 + 3) * 4`.",
    "examples": [
      {
        "input": "",
        "output": "20"
      }
    ],
    "starterCode": "# Precedence\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Parentheses first."
    ]
  },
  {
    "id": 30,
    "title": "Operator Precedence 3",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print `10 - 4 + 2`.",
    "examples": [
      {
        "input": "",
        "output": "8"
      }
    ],
    "starterCode": "# Precedence\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Left to right."
    ]
  },
  {
    "id": 31,
    "title": "Circle Area",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given radius `r = 7`, print the area rounded to 2 decimal places. Use `3.14` for pi.",
    "examples": [
      {
        "input": "",
        "output": "153.86"
      }
    ],
    "starterCode": "r = 7\n# Circle area\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "153.86",
        "label": "Test 1"
      }
    ],
    "hints": [
      "3.14 * r * r"
    ]
  },
  {
    "id": 32,
    "title": "Define multiple variables",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Assign 1, 2, 3 to a, b, c in one line. Print their sum.",
    "examples": [
      {
        "input": "",
        "output": "6"
      }
    ],
    "starterCode": "# Assign and sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "6",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a, b, c = 1, 2, 3"
    ]
  },
  {
    "id": 33,
    "title": "Simple Interest",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Calculate simple interest for Principal=1000, Rate=5, Time=2. Formula: `(P * R * T) / 100`.",
    "examples": [
      {
        "input": "",
        "output": "100.0"
      }
    ],
    "starterCode": "p = 1000\nr = 5\nt = 2\n# Simple Interest\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "100.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "(p * r * t) / 100"
    ]
  },
  {
    "id": 34,
    "title": "Compound Interest 1",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Calculate compound interest amount for P=1000, R=10, T=2. Formula: `P * (1 + R/100)**T`.",
    "examples": [
      {
        "input": "",
        "output": "1210.0"
      }
    ],
    "starterCode": "p = 1000\nr = 10\nt = 2\n# CI\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1210.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "p * (1 + r/100)**t"
    ]
  },
  {
    "id": 35,
    "title": "Square Perimeter",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given side=6, print perimeter.",
    "examples": [
      {
        "input": "",
        "output": "24"
      }
    ],
    "starterCode": "side = 6\n# Perimeter\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "24",
        "label": "Test 1"
      }
    ],
    "hints": [
      "4 * side"
    ]
  },
  {
    "id": 36,
    "title": "Triangle Area",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given base=10 and height=6, print area.",
    "examples": [
      {
        "input": "",
        "output": "30.0"
      }
    ],
    "starterCode": "base = 10\nheight = 6\n# Area\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "30.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "0.5 * base * height"
    ]
  },
  {
    "id": 37,
    "title": "Kilometers to Miles",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `km = 5` to miles. Formula: `miles = km * 0.621371`. Print rounded to 2 decimals.",
    "examples": [
      {
        "input": "",
        "output": "3.11"
      }
    ],
    "starterCode": "km = 5\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3.11",
        "label": "Test 1"
      }
    ],
    "hints": [
      "round(km * 0.621371, 2)"
    ]
  },
  {
    "id": 38,
    "title": "Miles to Kilometers",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `miles = 10` to km. Formula: `km = miles / 0.621371`. Print rounded to 2 decimals.",
    "examples": [
      {
        "input": "",
        "output": "16.09"
      }
    ],
    "starterCode": "miles = 10\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "16.09",
        "label": "Test 1"
      }
    ],
    "hints": [
      "round(miles / 0.621371, 2)"
    ]
  },
  {
    "id": 39,
    "title": "Minutes to Hours",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `minutes = 150` to hours and print.",
    "examples": [
      {
        "input": "",
        "output": "2.5"
      }
    ],
    "starterCode": "minutes = 150\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2.5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "minutes / 60"
    ]
  },
  {
    "id": 40,
    "title": "Hours to Minutes",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `hours = 3` to minutes.",
    "examples": [
      {
        "input": "",
        "output": "180"
      }
    ],
    "starterCode": "hours = 3\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "180",
        "label": "Test 1"
      }
    ],
    "hints": [
      "hours * 60"
    ]
  },
  {
    "id": 41,
    "title": "Days to Hours",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `days = 4` to hours.",
    "examples": [
      {
        "input": "",
        "output": "96"
      }
    ],
    "starterCode": "days = 4\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "96",
        "label": "Test 1"
      }
    ],
    "hints": [
      "days * 24"
    ]
  },
  {
    "id": 42,
    "title": "Hours to Days",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert `hours = 72` to days.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "hours = 72\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "hours // 24"
    ]
  },
  {
    "id": 43,
    "title": "Cube Surface Area",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given side=3, print total surface area (`6 * side**2`).",
    "examples": [
      {
        "input": "",
        "output": "54"
      }
    ],
    "starterCode": "side = 3\n# Area\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "54",
        "label": "Test 1"
      }
    ],
    "hints": [
      "6 * side**2"
    ]
  },
  {
    "id": 44,
    "title": "Celsius to Kelvin",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Convert Celsius=25 to Kelvin (`C + 273.15`).",
    "examples": [
      {
        "input": "",
        "output": "298.15"
      }
    ],
    "starterCode": "c = 25\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "298.15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "c + 273.15"
    ]
  },
  {
    "id": 45,
    "title": "String Length Print",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print the length of string `word = \"AI\"`.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "word = \"AI\"\n# Print length\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "len(word)"
    ]
  },
  {
    "id": 46,
    "title": "Print Type of Int",
    "difficulty": "easy",
    "topic": "Types",
    "description": "Print the type of variable `x = 45`.",
    "examples": [
      {
        "input": "",
        "output": "<class 'int'>"
      }
    ],
    "starterCode": "x = 45\n# Print type\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "<class 'int'>",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(type(x))"
    ]
  },
  {
    "id": 47,
    "title": "Print Type of Str",
    "difficulty": "easy",
    "topic": "Types",
    "description": "Print the type of variable `s = \"hello\"`.",
    "examples": [
      {
        "input": "",
        "output": "<class 'str'>"
      }
    ],
    "starterCode": "s = \"hello\"\n# Print type\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "<class 'str'>",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(type(s))"
    ]
  },
  {
    "id": 48,
    "title": "Print Type of Float",
    "difficulty": "easy",
    "topic": "Types",
    "description": "Print the type of variable `f = 3.14`.",
    "examples": [
      {
        "input": "",
        "output": "<class 'float'>"
      }
    ],
    "starterCode": "f = 3.14\n# Print type\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "<class 'float'>",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(type(f))"
    ]
  },
  {
    "id": 49,
    "title": "Divide and Remainder",
    "difficulty": "easy",
    "topic": "Math",
    "description": "For a=17, b=5, print floor division followed by remainder on next line.",
    "examples": [
      {
        "input": "",
        "output": "3\n2"
      }
    ],
    "starterCode": "a = 17\nb = 5\n# Print both\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3\n2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(a // b); print(a % b)"
    ]
  },
  {
    "id": 50,
    "title": "Solve linear formula",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `x = 5`, print `3*x + 7`.",
    "examples": [
      {
        "input": "",
        "output": "22"
      }
    ],
    "starterCode": "x = 5\n# Solve\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "22",
        "label": "Test 1"
      }
    ],
    "hints": [
      "3 * x + 7"
    ]
  },
  {
    "id": 51,
    "title": "Boolean NOT",
    "difficulty": "easy",
    "topic": "Logic",
    "description": "Given `flag = True`, print the opposite value.",
    "examples": [
      {
        "input": "",
        "output": "False"
      }
    ],
    "starterCode": "flag = True\n# Opposite\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "False",
        "label": "Test 1"
      }
    ],
    "hints": [
      "not flag"
    ]
  },
  {
    "id": 52,
    "title": "Boolean AND",
    "difficulty": "easy",
    "topic": "Logic",
    "description": "Given `a = True`, `b = False`, print `a and b`.",
    "examples": [
      {
        "input": "",
        "output": "False"
      }
    ],
    "starterCode": "a = True\nb = False\n# AND\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "False",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a and b"
    ]
  },
  {
    "id": 53,
    "title": "Boolean OR",
    "difficulty": "easy",
    "topic": "Logic",
    "description": "Given `a = True`, `b = False`, print `a or b`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "a = True\nb = False\n# OR\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a or b"
    ]
  },
  {
    "id": 54,
    "title": "Strict Inequality",
    "difficulty": "easy",
    "topic": "Comparisons",
    "description": "Given `a = 10`, `b = 20`, print `a != b`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "a = 10\nb = 20\n# Check inequality\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a != b"
    ]
  },
  {
    "id": 55,
    "title": "Compare Greater",
    "difficulty": "easy",
    "topic": "Comparisons",
    "description": "Given `a = 15`, `b = 10`, print `a > b`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "a = 15\nb = 10\n# Compare\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a > b"
    ]
  },
  {
    "id": 56,
    "title": "Compare Less",
    "difficulty": "easy",
    "topic": "Comparisons",
    "description": "Given `a = 15`, `b = 10`, print `a < b`.",
    "examples": [
      {
        "input": "",
        "output": "False"
      }
    ],
    "starterCode": "a = 15\nb = 10\n# Compare\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "False",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a < b"
    ]
  },
  {
    "id": 57,
    "title": "Add Floats",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `a = 1.5`, `b = 2.7`, print sum.",
    "examples": [
      {
        "input": "",
        "output": "4.2"
      }
    ],
    "starterCode": "a = 1.5\nb = 2.7\n# Sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "4.2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a + b"
    ]
  },
  {
    "id": 58,
    "title": "Multiple Print",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `A` then `B` then `C` on the same line with space between.",
    "examples": [
      {
        "input": "",
        "output": "A B C"
      }
    ],
    "starterCode": "# Print A B C\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "A B C",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print('A', 'B', 'C')"
    ]
  },
  {
    "id": 59,
    "title": "Separated Print",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `1`, `2`, `3` separated by `-`.",
    "examples": [
      {
        "input": "",
        "output": "1-2-3"
      }
    ],
    "starterCode": "# Print 1-2-3\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1-2-3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(1, 2, 3, sep='-')"
    ]
  },
  {
    "id": 60,
    "title": "Custom End Print",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `Hello` ending with `!!!`.",
    "examples": [
      {
        "input": "",
        "output": "Hello!!!"
      }
    ],
    "starterCode": "# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Hello!!!",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print('Hello', end='!!!')"
    ]
  },
  {
    "id": 61,
    "title": "Integer division to float",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Divide 5 by 2 and print result.",
    "examples": [
      {
        "input": "",
        "output": "2.5"
      }
    ],
    "starterCode": "# Divide\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2.5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "5 / 2"
    ]
  },
  {
    "id": 62,
    "title": "Square root direct",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Print square root of 64 as integer.",
    "examples": [
      {
        "input": "",
        "output": "8"
      }
    ],
    "starterCode": "# Sqrt\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "int(64 ** 0.5)"
    ]
  },
  {
    "id": 63,
    "title": "Print newline string",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `Line1` and `Line2` on separate lines using a single print statement.",
    "examples": [
      {
        "input": "",
        "output": "Line1\nLine2"
      }
    ],
    "starterCode": "# Newline print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Line1\nLine2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print('Line1\\nLine2')"
    ]
  },
  {
    "id": 64,
    "title": "Tab Character",
    "difficulty": "easy",
    "topic": "Print",
    "description": "Print `A` and `B` separated by a tab.",
    "examples": [
      {
        "input": "",
        "output": "A\tB"
      }
    ],
    "starterCode": "# Tab print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "A\tB",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print('A\\tB')"
    ]
  },
  {
    "id": 65,
    "title": "Empty string check",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Given `s = \"\"`, print its length.",
    "examples": [
      {
        "input": "",
        "output": "0"
      }
    ],
    "starterCode": "s = \"\"\n# Length\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "len(s)"
    ]
  },
  {
    "id": 66,
    "title": "Define boolean",
    "difficulty": "easy",
    "topic": "Variables",
    "description": "Define `is_active = True` and print it.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "# Boolean\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "is_active = True; print(is_active)"
    ]
  },
  {
    "id": 67,
    "title": "Float subtraction",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `a = 10.5`, `b = 4.5`, print difference.",
    "examples": [
      {
        "input": "",
        "output": "6.0"
      }
    ],
    "starterCode": "a = 10.5\nb = 4.5\n# Diff\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "6.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a - b"
    ]
  },
  {
    "id": 68,
    "title": "Double multiplication",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `a = 2.5`, `b = 4`, print product.",
    "examples": [
      {
        "input": "",
        "output": "10.0"
      }
    ],
    "starterCode": "a = 2.5\nb = 4\n# Product\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a * b"
    ]
  },
  {
    "id": 69,
    "title": "Check equal",
    "difficulty": "easy",
    "topic": "Comparisons",
    "description": "Given `x = 5`, `y = 5`, print `x == y`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "x = 5\ny = 5\n# Equal\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "x == y"
    ]
  },
  {
    "id": 70,
    "title": "Modulus division 2",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Given `n = 23`, print remainder when divided by 2.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "n = 23\n# Modulo\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n % 2"
    ]
  },
  {
    "id": 71,
    "title": "If Positive",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `num = 10`, print `Positive` if it is greater than 0.",
    "examples": [
      {
        "input": "",
        "output": "Positive"
      }
    ],
    "starterCode": "num = 10\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Positive",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if num > 0: print('Positive')"
    ]
  },
  {
    "id": 72,
    "title": "If Else Positive Negative",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `num = -5`, print `Positive` if > 0 else `Negative`.",
    "examples": [
      {
        "input": "",
        "output": "Negative"
      }
    ],
    "starterCode": "num = -5\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Negative",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if num > 0: ... else: ..."
    ]
  },
  {
    "id": 73,
    "title": "Is Adult",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `age = 20`, print `Adult` if >= 18 else `Minor`.",
    "examples": [
      {
        "input": "",
        "output": "Adult"
      }
    ],
    "starterCode": "age = 20\n# Age check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Adult",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if age >= 18: ..."
    ]
  },
  {
    "id": 74,
    "title": "Pass or Fail",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `score = 45`, print `Pass` if score >= 50 else `Fail`.",
    "examples": [
      {
        "input": "",
        "output": "Fail"
      }
    ],
    "starterCode": "score = 45\n# Check score\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Fail",
        "label": "Test 1"
      }
    ],
    "hints": [
      "score >= 50"
    ]
  },
  {
    "id": 75,
    "title": "Compare Equal Numbers",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `a=5`, `b=5`, print `Equal` if equal else `Not Equal`.",
    "examples": [
      {
        "input": "",
        "output": "Equal"
      }
    ],
    "starterCode": "a = 5\nb = 5\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Equal",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if a == b:"
    ]
  },
  {
    "id": 76,
    "title": "Even Check Conditional",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 8`, print `Even` if even else `Odd`.",
    "examples": [
      {
        "input": "",
        "output": "Even"
      }
    ],
    "starterCode": "n = 8\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Even",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n % 2 == 0:"
    ]
  },
  {
    "id": 77,
    "title": "Odd Check Conditional",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 11`, print `Odd` if odd else `Even`.",
    "examples": [
      {
        "input": "",
        "output": "Odd"
      }
    ],
    "starterCode": "n = 11\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Odd",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n % 2 != 0:"
    ]
  },
  {
    "id": 78,
    "title": "Zero Check",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `val = 0`, print `Zero` if it is 0, else `Not Zero`.",
    "examples": [
      {
        "input": "",
        "output": "Zero"
      }
    ],
    "starterCode": "val = 0\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Zero",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if val == 0:"
    ]
  },
  {
    "id": 79,
    "title": "Greatest of Two",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `a = 12`, `b = 20`, print the larger number.",
    "examples": [
      {
        "input": "",
        "output": "20"
      }
    ],
    "starterCode": "a = 12\nb = 20\n# Print larger\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "max(a, b)"
    ]
  },
  {
    "id": 80,
    "title": "Smallest of Two",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `a = 12`, `b = 20`, print the smaller number.",
    "examples": [
      {
        "input": "",
        "output": "12"
      }
    ],
    "starterCode": "a = 12\nb = 20\n# Print smaller\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "12",
        "label": "Test 1"
      }
    ],
    "hints": [
      "min(a, b)"
    ]
  },
  {
    "id": 81,
    "title": "Grade A check",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `marks = 92`, print `A` if marks >= 90 else `B`.",
    "examples": [
      {
        "input": "",
        "output": "A"
      }
    ],
    "starterCode": "marks = 92\n# Grade\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "A",
        "label": "Test 1"
      }
    ],
    "hints": [
      "marks >= 90"
    ]
  },
  {
    "id": 82,
    "title": "Discount Eligibility",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `purchase = 150`, print `Discount` if purchase > 100 else `No Discount`.",
    "examples": [
      {
        "input": "",
        "output": "Discount"
      }
    ],
    "starterCode": "purchase = 150\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Discount",
        "label": "Test 1"
      }
    ],
    "hints": [
      "purchase > 100"
    ]
  },
  {
    "id": 83,
    "title": "Divisible by 5",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 35`, print `Yes` if divisible by 5 else `No`.",
    "examples": [
      {
        "input": "",
        "output": "Yes"
      }
    ],
    "starterCode": "n = 35\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Yes",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n % 5 == 0"
    ]
  },
  {
    "id": 84,
    "title": "Divisible by 10",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 35`, print `Yes` if divisible by 10 else `No`.",
    "examples": [
      {
        "input": "",
        "output": "No"
      }
    ],
    "starterCode": "n = 35\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "No",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n % 10 == 0"
    ]
  },
  {
    "id": 85,
    "title": "Vote Eligibility",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `age = 16`, print `Can vote` if age >= 18 else `Cannot vote`.",
    "examples": [
      {
        "input": "",
        "output": "Cannot vote"
      }
    ],
    "starterCode": "age = 16\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Cannot vote",
        "label": "Test 1"
      }
    ],
    "hints": [
      "age >= 18"
    ]
  },
  {
    "id": 86,
    "title": "Senior Citizen",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `age = 65`, print `Senior` if age >= 60 else `Non-Senior`.",
    "examples": [
      {
        "input": "",
        "output": "Senior"
      }
    ],
    "starterCode": "age = 65\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Senior",
        "label": "Test 1"
      }
    ],
    "hints": [
      "age >= 60"
    ]
  },
  {
    "id": 87,
    "title": "Multiple of Both 2 and 3",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 12`, print `Yes` if divisible by both 2 and 3 else `No`.",
    "examples": [
      {
        "input": "",
        "output": "Yes"
      }
    ],
    "starterCode": "n = 12\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Yes",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n % 2 == 0 and n % 3 == 0"
    ]
  },
  {
    "id": 88,
    "title": "Logical AND Check",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `has_ticket = True` and `is_member = True`, print `Welcome` if both are True else `Go away`.",
    "examples": [
      {
        "input": "",
        "output": "Welcome"
      }
    ],
    "starterCode": "has_ticket = True\nis_member = True\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Welcome",
        "label": "Test 1"
      }
    ],
    "hints": [
      "has_ticket and is_member"
    ]
  },
  {
    "id": 89,
    "title": "Logical OR Member Check",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `is_vip = False`, `has_ticket = True`, print `Enter` if either is True else `Exit`.",
    "examples": [
      {
        "input": "",
        "output": "Enter"
      }
    ],
    "starterCode": "is_vip = False\nhas_ticket = True\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Enter",
        "label": "Test 1"
      }
    ],
    "hints": [
      "is_vip or has_ticket"
    ]
  },
  {
    "id": 90,
    "title": "Nested If Range",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 25`, print `In Range` if n is between 10 and 30 (inclusive).",
    "examples": [
      {
        "input": "",
        "output": "In Range"
      }
    ],
    "starterCode": "n = 25\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "In Range",
        "label": "Test 1"
      }
    ],
    "hints": [
      "10 <= n <= 30"
    ]
  },
  {
    "id": 91,
    "title": "Negative Odd Check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `n = -7`, print `Negative Odd` if < 0 and odd, else `Other`.",
    "examples": [
      {
        "input": "",
        "output": "Negative Odd"
      }
    ],
    "starterCode": "n = -7\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Negative Odd",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n < 0 and n % 2 != 0"
    ]
  },
  {
    "id": 92,
    "title": "Three Range Check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `n = 45`, print `Low` (<50), `Medium` (50-100), `High` (>100).",
    "examples": [
      {
        "input": "",
        "output": "Low"
      }
    ],
    "starterCode": "n = 45\n# Classify\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Low",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if/elif/else"
    ]
  },
  {
    "id": 93,
    "title": "Grade System",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `marks = 78`, print `A` (80+), `B` (60-79), `C` (below 60).",
    "examples": [
      {
        "input": "",
        "output": "B"
      }
    ],
    "starterCode": "marks = 78\n# Grade\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "B",
        "label": "Test 1"
      }
    ],
    "hints": [
      "marks >= 80"
    ]
  },
  {
    "id": 94,
    "title": "Leap Year check 1",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `year = 2000`, print `Leap` if divisible by 400 or (divisible by 4 and not 100) else `Common`.",
    "examples": [
      {
        "input": "",
        "output": "Leap"
      }
    ],
    "starterCode": "year = 2000\n# Leap\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Leap",
        "label": "Test 1"
      }
    ],
    "hints": [
      "leap year rule"
    ]
  },
  {
    "id": 95,
    "title": "Leap Year check 2",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `year = 1900`, print `Leap` or `Common`.",
    "examples": [
      {
        "input": "",
        "output": "Common"
      }
    ],
    "starterCode": "year = 1900\n# Leap\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Common",
        "label": "Test 1"
      }
    ],
    "hints": [
      "divisible by 100 but not 400 makes it Common"
    ]
  },
  {
    "id": 96,
    "title": "Quadrant Finder",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `x = 5`, `y = -3`, print `Q1` (x>0,y>0), `Q2` (x<0,y>0), `Q3` (x<0,y<0), `Q4` (x>0,y<0).",
    "examples": [
      {
        "input": "",
        "output": "Q4"
      }
    ],
    "starterCode": "x = 5\ny = -3\n# Quadrant\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Q4",
        "label": "Test 1"
      }
    ],
    "hints": [
      "x > 0 and y < 0"
    ]
  },
  {
    "id": 97,
    "title": "Triangle Validity",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given angles `a = 60`, `b = 60`, `c = 60`, print `Valid` if sum is 180 else `Invalid`.",
    "examples": [
      {
        "input": "",
        "output": "Valid"
      }
    ],
    "starterCode": "a = 60\nb = 60\nc = 60\n# Validity\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Valid",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a + b + c == 180"
    ]
  },
  {
    "id": 98,
    "title": "Triangle Type",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given sides `a=5`, `b=5`, `c=5`, print `Equilateral`, `Isosceles` (any 2 equal), or `Scalene`.",
    "examples": [
      {
        "input": "",
        "output": "Equilateral"
      }
    ],
    "starterCode": "a = 5\nb = 5\nc = 5\n# Type\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Equilateral",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Compare sides"
    ]
  },
  {
    "id": 99,
    "title": "Greatest of Three Numbers",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given a=10, b=25, c=15, print the greatest.",
    "examples": [
      {
        "input": "",
        "output": "25"
      }
    ],
    "starterCode": "a = 10\nb = 25\nc = 15\n# Greatest\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "25",
        "label": "Test 1"
      }
    ],
    "hints": [
      "max(a, b, c)"
    ]
  },
  {
    "id": 100,
    "title": "Smallest of Three Numbers",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given a=10, b=25, c=15, print the smallest.",
    "examples": [
      {
        "input": "",
        "output": "10"
      }
    ],
    "starterCode": "a = 10\nb = 25\nc = 15\n# Smallest\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "min(a, b, c)"
    ]
  },
  {
    "id": 101,
    "title": "Sort Two Numbers",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `x = 15`, `y = 8`, print them in ascending order space separated.",
    "examples": [
      {
        "input": "",
        "output": "8 15"
      }
    ],
    "starterCode": "x = 15\ny = 8\n# Sort\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8 15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Compare x and y"
    ]
  },
  {
    "id": 102,
    "title": "Range Check 50-100",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 75`, print `InRange` if 50 <= n <= 100 else `Out`.",
    "examples": [
      {
        "input": "",
        "output": "InRange"
      }
    ],
    "starterCode": "n = 75\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "InRange",
        "label": "Test 1"
      }
    ],
    "hints": [
      "50 <= n <= 100"
    ]
  },
  {
    "id": 103,
    "title": "State Tax Calculator",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given state `\"CA\"` and amount `100`, if CA tax is 8.25% print total amount (`amount * 1.0825`), else print amount.",
    "examples": [
      {
        "input": "",
        "output": "108.25"
      }
    ],
    "starterCode": "state = \"CA\"\namount = 100\n# Calculate\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "108.25",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if state == 'CA'"
    ]
  },
  {
    "id": 104,
    "title": "Vowel or Consonant Check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `char = \"e\"`, print `Vowel` if in aeiou else `Consonant`.",
    "examples": [
      {
        "input": "",
        "output": "Vowel"
      }
    ],
    "starterCode": "char = \"e\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Vowel",
        "label": "Test 1"
      }
    ],
    "hints": [
      "char in 'aeiou'"
    ]
  },
  {
    "id": 105,
    "title": "Alphabet check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `char = \"9\"`, print `Alphabet` if it is a letter else `Not Alphabet`.",
    "examples": [
      {
        "input": "",
        "output": "Not Alphabet"
      }
    ],
    "starterCode": "char = \"9\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Not Alphabet",
        "label": "Test 1"
      }
    ],
    "hints": [
      "char.isalpha()"
    ]
  },
  {
    "id": 106,
    "title": "Digit check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `char = \"7\"`, print `Digit` if char is 0-9 else `Not Digit`.",
    "examples": [
      {
        "input": "",
        "output": "Digit"
      }
    ],
    "starterCode": "char = \"7\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Digit",
        "label": "Test 1"
      }
    ],
    "hints": [
      "char.isdigit()"
    ]
  },
  {
    "id": 107,
    "title": "Upper or Lower Case",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `char = \"A\"`, print `Upper` if uppercase, `Lower` if lowercase, else `Other`.",
    "examples": [
      {
        "input": "",
        "output": "Upper"
      }
    ],
    "starterCode": "char = \"A\"\n# Case\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Upper",
        "label": "Test 1"
      }
    ],
    "hints": [
      "char.isupper()"
    ]
  },
  {
    "id": 108,
    "title": "Sign Multiply Check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `a = -2`, `b = 4`, print `Negative` if product is negative else `Positive`.",
    "examples": [
      {
        "input": "",
        "output": "Negative"
      }
    ],
    "starterCode": "a = -2\nb = 4\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Negative",
        "label": "Test 1"
      }
    ],
    "hints": [
      "a * b < 0"
    ]
  },
  {
    "id": 109,
    "title": "Century Year check",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `year = 1900`, print `Century` if divisible by 100 else `Not Century`.",
    "examples": [
      {
        "input": "",
        "output": "Century"
      }
    ],
    "starterCode": "year = 1900\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Century",
        "label": "Test 1"
      }
    ],
    "hints": [
      "year % 100 == 0"
    ]
  },
  {
    "id": 110,
    "title": "Month Days Finder",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given month `2` and leap year `False`, print the number of days (28).",
    "examples": [
      {
        "input": "",
        "output": "28"
      }
    ],
    "starterCode": "month = 2\nis_leap = False\n# Days\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "28",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if month == 2 and not is_leap"
    ]
  },
  {
    "id": 111,
    "title": "Speeding Ticket",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `speed = 85`, if speed > 80 print `Ticket`, else `Safe`.",
    "examples": [
      {
        "input": "",
        "output": "Ticket"
      }
    ],
    "starterCode": "speed = 85\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Ticket",
        "label": "Test 1"
      }
    ],
    "hints": [
      "speed > 80"
    ]
  },
  {
    "id": 112,
    "title": "Temperature Status",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `temp = 32`, print `Freezing` if <= 32 else `Normal`.",
    "examples": [
      {
        "input": "",
        "output": "Freezing"
      }
    ],
    "starterCode": "temp = 32\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Freezing",
        "label": "Test 1"
      }
    ],
    "hints": [
      "temp <= 32"
    ]
  },
  {
    "id": 113,
    "title": "Light Switch status",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `status = \"on\"`, print `Light is active` if status == \"on\" else `Dark`.",
    "examples": [
      {
        "input": "",
        "output": "Light is active"
      }
    ],
    "starterCode": "status = \"on\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Light is active",
        "label": "Test 1"
      }
    ],
    "hints": [
      "status == 'on'"
    ]
  },
  {
    "id": 114,
    "title": "BMI Category",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `bmi = 22.5`, print `Underweight` (<18.5), `Normal` (18.5-24.9), `Overweight` (25+).",
    "examples": [
      {
        "input": "",
        "output": "Normal"
      }
    ],
    "starterCode": "bmi = 22.5\n# Category\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Normal",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use if/elif/else"
    ]
  },
  {
    "id": 115,
    "title": "Divisible by 3 and 5",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `n = 15`, print `Divisible` if divisible by 3 and 5, else `Not`.",
    "examples": [
      {
        "input": "",
        "output": "Divisible"
      }
    ],
    "starterCode": "n = 15\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Divisible",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n % 15 == 0"
    ]
  },
  {
    "id": 116,
    "title": "User Role Access",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given role `\"editor\"`, print `Full Access` if admin, `Edit Access` if editor, else `View Access`.",
    "examples": [
      {
        "input": "",
        "output": "Edit Access"
      }
    ],
    "starterCode": "role = \"editor\"\n# Check access\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Edit Access",
        "label": "Test 1"
      }
    ],
    "hints": [
      "role == 'editor'"
    ]
  },
  {
    "id": 117,
    "title": "Weekday or Weekend",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given `day = \"Saturday\"`, print `Weekend` if day is Saturday/Sunday else `Weekday`.",
    "examples": [
      {
        "input": "",
        "output": "Weekend"
      }
    ],
    "starterCode": "day = \"Saturday\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Weekend",
        "label": "Test 1"
      }
    ],
    "hints": [
      "day in ['Saturday', 'Sunday']"
    ]
  },
  {
    "id": 118,
    "title": "Ticket Price Calculator",
    "difficulty": "medium",
    "topic": "Conditionals",
    "description": "Given age `12`, print price: child (under 12) is `5`, adult (12-64) is `10`, senior (65+) is `7`.",
    "examples": [
      {
        "input": "",
        "output": "10"
      }
    ],
    "starterCode": "age = 12\n# Calculate price\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if age < 12: ..."
    ]
  },
  {
    "id": 119,
    "title": "Word Match",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `word = \"python\"`, print `Match` if word is \"python\" else `Mismatch`.",
    "examples": [
      {
        "input": "",
        "output": "Match"
      }
    ],
    "starterCode": "word = \"python\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Match",
        "label": "Test 1"
      }
    ],
    "hints": [
      "word == 'python'"
    ]
  },
  {
    "id": 120,
    "title": "Negative limit check",
    "difficulty": "easy",
    "topic": "Conditionals",
    "description": "Given `x = -15`, print `Below Limit` if x < -10 else `Above Limit`.",
    "examples": [
      {
        "input": "",
        "output": "Below Limit"
      }
    ],
    "starterCode": "x = -15\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Below Limit",
        "label": "Test 1"
      }
    ],
    "hints": [
      "x < -10"
    ]
  },
  {
    "id": 121,
    "title": "Print 1 to 5",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print numbers 1 to 5, one per line.",
    "examples": [
      {
        "input": "",
        "output": "1\n2\n3\n4\n5"
      }
    ],
    "starterCode": "# Loop 1 to 5\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1\n2\n3\n4\n5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(1, 6):"
    ]
  },
  {
    "id": 122,
    "title": "Print 5 to 1",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print numbers 5 down to 1, one per line.",
    "examples": [
      {
        "input": "",
        "output": "5\n4\n3\n2\n1"
      }
    ],
    "starterCode": "# Loop 5 to 1\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "5\n4\n3\n2\n1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(5, 0, -1):"
    ]
  },
  {
    "id": 123,
    "title": "Print Even 1 to 10",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print even numbers from 1 to 10.",
    "examples": [
      {
        "input": "",
        "output": "2\n4\n6\n8\n10"
      }
    ],
    "starterCode": "# Even loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2\n4\n6\n8\n10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "range(2, 11, 2)"
    ]
  },
  {
    "id": 124,
    "title": "Print Odd 1 to 9",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print odd numbers from 1 to 9.",
    "examples": [
      {
        "input": "",
        "output": "1\n3\n5\n7\n9"
      }
    ],
    "starterCode": "# Odd loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1\n3\n5\n7\n9",
        "label": "Test 1"
      }
    ],
    "hints": [
      "range(1, 10, 2)"
    ]
  },
  {
    "id": 125,
    "title": "Print Squares 1 to 5",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print squares of 1 to 5.",
    "examples": [
      {
        "input": "",
        "output": "1\n4\n9\n16\n25"
      }
    ],
    "starterCode": "# Squares loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1\n4\n9\n16\n25",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(i * i)"
    ]
  },
  {
    "id": 126,
    "title": "Sum First 5 Numbers",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Calculate and print the sum of numbers 1 to 5.",
    "examples": [
      {
        "input": "",
        "output": "15"
      }
    ],
    "starterCode": "total = 0\n# Sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(1, 6): total += i"
    ]
  },
  {
    "id": 127,
    "title": "Factorial of 4 Loop",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Calculate and print the product of numbers 1 to 4 (4!).",
    "examples": [
      {
        "input": "",
        "output": "24"
      }
    ],
    "starterCode": "fact = 1\n# Factorial\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "24",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(1, 5): fact *= i"
    ]
  },
  {
    "id": 128,
    "title": "Loop String Characters",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Given `word = \"Loop\"`, print each character on a new line.",
    "examples": [
      {
        "input": "",
        "output": "L\no\no\np"
      }
    ],
    "starterCode": "word = \"Loop\"\n# Print chars\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "L\no\no\np",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for char in word:"
    ]
  },
  {
    "id": 129,
    "title": "Count Characters Loop",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Given `word = \"Python\"`, count characters using a loop (don't use len()). Print count.",
    "examples": [
      {
        "input": "",
        "output": "6"
      }
    ],
    "starterCode": "word = \"Python\"\ncount = 0\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "6",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for char in word: count += 1"
    ]
  },
  {
    "id": 130,
    "title": "Print stars triangle simple",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print 3 rows of stars where row i has i stars.",
    "examples": [
      {
        "input": "",
        "output": "*\n**\n***"
      }
    ],
    "starterCode": "# Triangle\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "*\n**\n***",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(1, 4): print('*' * i)"
    ]
  },
  {
    "id": 131,
    "title": "Loop Multiply Table 3",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print multiplication table of 3 up to 4 (`3 x i = result`).",
    "examples": [
      {
        "input": "",
        "output": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12"
      }
    ],
    "starterCode": "# Table 3\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(1, 5):"
    ]
  },
  {
    "id": 132,
    "title": "While Count Down",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Use a while loop to count down from 3 to 1. Print each.",
    "examples": [
      {
        "input": "",
        "output": "3\n2\n1"
      }
    ],
    "starterCode": "i = 3\n# While loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3\n2\n1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "while i > 0: print(i); i -= 1"
    ]
  },
  {
    "id": 133,
    "title": "While Sum",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Use a while loop to sum numbers from 1 to 4.",
    "examples": [
      {
        "input": "",
        "output": "10"
      }
    ],
    "starterCode": "total = 0\ni = 1\n# While sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "while i <= 4:"
    ]
  },
  {
    "id": 134,
    "title": "Skip Number 3",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Print numbers 1 to 5, skipping 3 using `continue`.",
    "examples": [
      {
        "input": "",
        "output": "1\n2\n4\n5"
      }
    ],
    "starterCode": "# Skip 3\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1\n2\n4\n5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if i == 3: continue"
    ]
  },
  {
    "id": 135,
    "title": "Break at 4",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Print numbers 1 to 5, but break the loop when 4 is reached.",
    "examples": [
      {
        "input": "",
        "output": "1\n2\n3"
      }
    ],
    "starterCode": "# Break at 4\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1\n2\n3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if i == 4: break"
    ]
  },
  {
    "id": 136,
    "title": "Loop through list",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Given `items = [\"a\", \"b\", \"c\"]`, print each item.",
    "examples": [
      {
        "input": "",
        "output": "a\nb\nc"
      }
    ],
    "starterCode": "items = [\"a\", \"b\", \"c\"]\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "a\nb\nc",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for x in items:"
    ]
  },
  {
    "id": 137,
    "title": "Sum list items loop",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Given `nums = [10, 20, 30]`, sum them using a for loop. Print sum.",
    "examples": [
      {
        "input": "",
        "output": "60"
      }
    ],
    "starterCode": "nums = [10, 20, 30]\ntotal = 0\n# Sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "60",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for n in nums: total += n"
    ]
  },
  {
    "id": 138,
    "title": "Loop with index",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `fruits = [\"apple\", \"banana\"]`, print `0: apple`, `1: banana` using range(len()).",
    "examples": [
      {
        "input": "",
        "output": "0: apple\n1: banana"
      }
    ],
    "starterCode": "fruits = [\"apple\", \"banana\"]\n# Print with index\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "0: apple\n1: banana",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(len(fruits)):"
    ]
  },
  {
    "id": 139,
    "title": "Print even index elements",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `chars = [\"a\", \"b\", \"c\", \"d\"]`, print elements at even indices (0 and 2).",
    "examples": [
      {
        "input": "",
        "output": "a\nc"
      }
    ],
    "starterCode": "chars = [\"a\", \"b\", \"c\", \"d\"]\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "a\nc",
        "label": "Test 1"
      }
    ],
    "hints": [
      "for i in range(0, len(chars), 2):"
    ]
  },
  {
    "id": 140,
    "title": "Find max in list loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [3, 8, 2, 7]`, find the maximum using a loop. Print max.",
    "examples": [
      {
        "input": "",
        "output": "8"
      }
    ],
    "starterCode": "nums = [3, 8, 2, 7]\nmx = nums[0]\n# Loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n > mx: mx = n"
    ]
  },
  {
    "id": 141,
    "title": "Find min in list loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [3, 8, 2, 7]`, find the minimum using a loop.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "nums = [3, 8, 2, 7]\nmn = nums[0]\n# Loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n < mn: mn = n"
    ]
  },
  {
    "id": 142,
    "title": "Count evens in list loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [1, 2, 3, 4, 5, 6]`, count even numbers using a loop.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "nums = [1, 2, 3, 4, 5, 6]\ncount = 0\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n % 2 == 0:"
    ]
  },
  {
    "id": 143,
    "title": "Count odds in list loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [1, 2, 3, 4, 5, 6]`, count odd numbers using a loop.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "nums = [1, 2, 3, 4, 5, 6]\ncount = 0\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n % 2 != 0:"
    ]
  },
  {
    "id": 144,
    "title": "Product of list items",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [1, 2, 3, 4]`, print product of all items.",
    "examples": [
      {
        "input": "",
        "output": "24"
      }
    ],
    "starterCode": "nums = [1, 2, 3, 4]\nprod = 1\n# Product\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "24",
        "label": "Test 1"
      }
    ],
    "hints": [
      "prod *= n"
    ]
  },
  {
    "id": 145,
    "title": "Nested Loop Coordinates",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Print coordinates (x, y) for x in 0,1 and y in 0,1 space separated.",
    "examples": [
      {
        "input": "",
        "output": "0,0 0,1 1,0 1,1"
      }
    ],
    "starterCode": "# Coordinates\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "0,0 0,1 1,0 1,1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(f'{x},{y}', end=' ')"
    ]
  },
  {
    "id": 146,
    "title": "Print checkerboard pattern",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Print 2x2 grid of `#` and ` ` alternating: line 1: `# `, line 2: ` #`.",
    "examples": [
      {
        "input": "",
        "output": "# \n #"
      }
    ],
    "starterCode": "# Pattern\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "# \n #",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print('# '); print(' #')"
    ]
  },
  {
    "id": 147,
    "title": "Count letter in string loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `s = \"banana\"`, count `a` using a loop. Print count.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "s = \"banana\"\ncount = 0\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if char == 'a':"
    ]
  },
  {
    "id": 148,
    "title": "Reverse string loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `word = \"abc\"`, reverse it using a loop. Print reversed.",
    "examples": [
      {
        "input": "",
        "output": "cba"
      }
    ],
    "starterCode": "word = \"abc\"\nrev = \"\"\n# Reverse\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "cba",
        "label": "Test 1"
      }
    ],
    "hints": [
      "rev = char + rev"
    ]
  },
  {
    "id": 149,
    "title": "Power loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Calculate `2**5` using a loop instead of **. Print result.",
    "examples": [
      {
        "input": "",
        "output": "32"
      }
    ],
    "starterCode": "base = 2\nexp = 5\nres = 1\n# Loop power\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "32",
        "label": "Test 1"
      }
    ],
    "hints": [
      "res *= base"
    ]
  },
  {
    "id": 150,
    "title": "String list join simple",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `words = [\"A\", \"B\", \"C\"]`, concatenate them with `-` using a loop. Print result.",
    "examples": [
      {
        "input": "",
        "output": "A-B-C"
      }
    ],
    "starterCode": "words = [\"A\", \"B\", \"C\"]\nres = \"\"\n# Loop concat\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "A-B-C",
        "label": "Test 1"
      }
    ],
    "hints": [
      "add separator in loop"
    ]
  },
  {
    "id": 151,
    "title": "Loop until negative",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given input numbers, sum them up until a negative number is entered. Return sum. Input: `5\\n10\\n-1`.",
    "examples": [
      {
        "input": "5\n10\n-1",
        "output": "15"
      }
    ],
    "starterCode": "# Sum until negative\n",
    "testCases": [
      {
        "id": 1,
        "input": "5\n10\n-1",
        "expected": "15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use while True, break on negative"
    ]
  },
  {
    "id": 152,
    "title": "Sum of digits loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Take integer input `1234` and print sum of its digits.",
    "examples": [
      {
        "input": "1234",
        "output": "10"
      }
    ],
    "starterCode": "n = int(input())\ntotal = 0\n# Digit sum loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "1234",
        "expected": "10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use n % 10 and n //= 10"
    ]
  },
  {
    "id": 153,
    "title": "Print elements until string",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `items = [\"apple\", \"STOP\", \"orange\"]`, print each element until \"STOP\" is encountered.",
    "examples": [
      {
        "input": "",
        "output": "apple"
      }
    ],
    "starterCode": "items = [\"apple\", \"STOP\", \"orange\"]\n# Loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "apple",
        "label": "Test 1"
      }
    ],
    "hints": [
      "break when x == 'STOP'"
    ]
  },
  {
    "id": 154,
    "title": "Is list sorted loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [1, 3, 2, 5]`, print True if sorted ascending, else False.",
    "examples": [
      {
        "input": "",
        "output": "False"
      }
    ],
    "starterCode": "nums = [1, 3, 2, 5]\nis_sorted = True\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "False",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Compare nums[i] and nums[i+1]"
    ]
  },
  {
    "id": 155,
    "title": "Search item in list loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `lst = [10, 20, 30]` and target `20`, print index if found, else -1.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "lst = [10, 20, 30]\ntarget = 20\n# Search\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check each index"
    ]
  },
  {
    "id": 156,
    "title": "Count words in sentence loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `sentence = \"Python is fun\"`, count words by splitting manually on spaces (counting spaces + 1).",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "sentence = \"Python is fun\"\nspaces = 0\n# Count spaces\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Count spaces, then add 1"
    ]
  },
  {
    "id": 157,
    "title": "Common elements loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `l1 = [1, 2, 3]` and `l2 = [2, 3, 4]`, print elements present in both as a list.",
    "examples": [
      {
        "input": "",
        "output": "[2, 3]"
      }
    ],
    "starterCode": "l1 = [1, 2, 3]\nl2 = [2, 3, 4]\n# Common\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[2, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check if x in l2"
    ]
  },
  {
    "id": 158,
    "title": "Remove spaces loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `text = \"a b c\"`, print it without spaces using a loop.",
    "examples": [
      {
        "input": "",
        "output": "abc"
      }
    ],
    "starterCode": "text = \"a b c\"\n# Remove spaces\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "abc",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if char != ' ':"
    ]
  },
  {
    "id": 159,
    "title": "Filter negative numbers",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `nums = [5, -2, 10, -1]`, print list with only positive numbers.",
    "examples": [
      {
        "input": "",
        "output": "[5, 10]"
      }
    ],
    "starterCode": "nums = [5, -2, 10, -1]\n# Filter\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[5, 10]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n >= 0:"
    ]
  },
  {
    "id": 160,
    "title": "Perfect square loop check",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `n = 16`, check if it is a perfect square using a loop from 1 to n. Print True/False.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "n = 16\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if i * i == n:"
    ]
  },
  {
    "id": 161,
    "title": "Divisors of a number",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `n = 12`, print all of its divisors separated by spaces.",
    "examples": [
      {
        "input": "",
        "output": "1 2 3 4 6 12"
      }
    ],
    "starterCode": "n = 12\n# Divisors\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1 2 3 4 6 12",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if n % i == 0:"
    ]
  },
  {
    "id": 162,
    "title": "Arithmetic Progression loop",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print the first 5 terms of AP starting at 2 with common difference 3: `2 5 8 11 14`.",
    "examples": [
      {
        "input": "",
        "output": "2 5 8 11 14"
      }
    ],
    "starterCode": "# AP loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2 5 8 11 14",
        "label": "Test 1"
      }
    ],
    "hints": [
      "term = 2; term += 3"
    ]
  },
  {
    "id": 163,
    "title": "Geometric Progression loop",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print the first 4 terms of GP starting at 3 with common ratio 2: `3 6 12 24`.",
    "examples": [
      {
        "input": "",
        "output": "3 6 12 24"
      }
    ],
    "starterCode": "# GP loop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3 6 12 24",
        "label": "Test 1"
      }
    ],
    "hints": [
      "term = 3; term *= 2"
    ]
  },
  {
    "id": 164,
    "title": "Alt signs sum loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Sum `1 - 2 + 3 - 4 + 5` using a loop. Print sum.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "# Alt sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check if even/odd to subtract/add"
    ]
  },
  {
    "id": 165,
    "title": "Prime Check Loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `n = 11`, print True if prime, else False.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "n = 11\n# Prime check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check if divisible by any number 2 to n-1"
    ]
  },
  {
    "id": 166,
    "title": "Vowels count loop sentence",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `text = \"cricket score\"`, print the count of vowels.",
    "examples": [
      {
        "input": "",
        "output": "4"
      }
    ],
    "starterCode": "text = \"cricket score\"\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "4",
        "label": "Test 1"
      }
    ],
    "hints": [
      "check character in 'aeiou'"
    ]
  },
  {
    "id": 167,
    "title": "Count uppercase letters loop",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `text = \"PyThOn\"`, count uppercase letters.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "text = \"PyThOn\"\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "char.isupper()"
    ]
  },
  {
    "id": 168,
    "title": "Print characters at odd positions",
    "difficulty": "medium",
    "topic": "Loops",
    "description": "Given `text = \"abcdef\"`, print characters at odd indices (1, 3, 5).",
    "examples": [
      {
        "input": "",
        "output": "b\nd\nf"
      }
    ],
    "starterCode": "text = \"abcdef\"\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "b\nd\nf",
        "label": "Test 1"
      }
    ],
    "hints": [
      "text[i]"
    ]
  },
  {
    "id": 169,
    "title": "Sum odd numbers 1 to 15",
    "difficulty": "easy",
    "topic": "Loops",
    "description": "Print the sum of all odd numbers between 1 and 15 inclusive.",
    "examples": [
      {
        "input": "",
        "output": "64"
      }
    ],
    "starterCode": "# Sum\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "64",
        "label": "Test 1"
      }
    ],
    "hints": [
      "odd sum"
    ]
  },
  {
    "id": 170,
    "title": "Convert binary string to int loop",
    "difficulty": "hard",
    "topic": "Loops",
    "description": "Given binary string `\"1011\"`, convert to integer using a loop (base 2 progression).",
    "examples": [
      {
        "input": "",
        "output": "11"
      }
    ],
    "starterCode": "binary = \"1011\"\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "11",
        "label": "Test 1"
      }
    ],
    "hints": [
      "digit * (2 ** power)"
    ]
  },
  {
    "id": 171,
    "title": "String Title Case check",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print string `\"hello world\"` in title case using .title().",
    "examples": [
      {
        "input": "",
        "output": "Hello World"
      }
    ],
    "starterCode": "# Title\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Hello World",
        "label": "Test 1"
      }
    ],
    "hints": [
      "\"hello world\".title()"
    ]
  },
  {
    "id": 172,
    "title": "Find Character Index",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Find and print the index of first `\"o\"` in `\"Python\"`.",
    "examples": [
      {
        "input": "",
        "output": "4"
      }
    ],
    "starterCode": "s = \"Python\"\n# Index\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "4",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.index('o')"
    ]
  },
  {
    "id": 173,
    "title": "Count Character occurrences",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Count how many times `\"a\"` appears in `\"banana\"`.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "s = \"banana\"\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.count('a')"
    ]
  },
  {
    "id": 174,
    "title": "Check String Prefix",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"cricket\"` starts with `\"cri\"`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"cricket\"\n# Prefix\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.startswith('cri')"
    ]
  },
  {
    "id": 175,
    "title": "Check String Suffix",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"cricket\"` ends with `\"ket\"`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"cricket\"\n# Suffix\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.endswith('ket')"
    ]
  },
  {
    "id": 176,
    "title": "Is Alphanumeric",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"user123\"` is alphanumeric.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"user123\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.isalnum()"
    ]
  },
  {
    "id": 177,
    "title": "Is Numeric String",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"9845\"` is numeric.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"9845\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.isnumeric()"
    ]
  },
  {
    "id": 178,
    "title": "Is Lowercase String",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"python\"` is lowercase.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"python\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.islower()"
    ]
  },
  {
    "id": 179,
    "title": "Is Uppercase String",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"PYTHON\"` is uppercase.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"PYTHON\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.isupper()"
    ]
  },
  {
    "id": 180,
    "title": "Strip Whitespace",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Remove leading/trailing spaces from `\"  hello  \"` and print.",
    "examples": [
      {
        "input": "",
        "output": "hello"
      }
    ],
    "starterCode": "s = \"  hello  \"\n# Strip\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "hello",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.strip()"
    ]
  },
  {
    "id": 181,
    "title": "Left Strip",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Remove leading spaces from `\"  hello\"`.",
    "examples": [
      {
        "input": "",
        "output": "hello"
      }
    ],
    "starterCode": "s = \"  hello\"\n# Lstrip\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "hello",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.lstrip()"
    ]
  },
  {
    "id": 182,
    "title": "Right Strip",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Remove trailing spaces from `\"hello  \"`.",
    "examples": [
      {
        "input": "",
        "output": "hello"
      }
    ],
    "starterCode": "s = \"hello  \"\n# Rstrip\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "hello",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.rstrip()"
    ]
  },
  {
    "id": 183,
    "title": "Replace Character",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Replace `\"a\"` with `\"o\"` in `\"cat\"`.",
    "examples": [
      {
        "input": "",
        "output": "cot"
      }
    ],
    "starterCode": "s = \"cat\"\n# Replace\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "cot",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.replace('a', 'o')"
    ]
  },
  {
    "id": 184,
    "title": "Split CSV line",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Split `\"apple,banana,cherry\"` by comma.",
    "examples": [
      {
        "input": "",
        "output": "['apple', 'banana', 'cherry']"
      }
    ],
    "starterCode": "s = \"apple,banana,cherry\"\n# Split\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['apple', 'banana', 'cherry']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.split(',')"
    ]
  },
  {
    "id": 185,
    "title": "Join Words list",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Join `['A', 'B', 'C']` with space.",
    "examples": [
      {
        "input": "",
        "output": "A B"
      }
    ],
    "starterCode": "lst = ['A', 'B', 'C']\n# Join\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "A B",
        "label": "Test 1"
      }
    ],
    "hints": [
      "' '.join(lst)"
    ]
  },
  {
    "id": 186,
    "title": "Swap Case",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Swap case of `\"PyThOn\"` and print.",
    "examples": [
      {
        "input": "",
        "output": "pYtHoN"
      }
    ],
    "starterCode": "s = \"PyThOn\"\n# Swap case\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "pYtHoN",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.swapcase()"
    ]
  },
  {
    "id": 187,
    "title": "Find Substring Index",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Find first index of `\"love\"` in `\"I love programming\"`.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "s = \"I love programming\"\n# Find\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.find('love')"
    ]
  },
  {
    "id": 188,
    "title": "Substring not found Find",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Find index of `\"java\"` in `\"I love python\"`. (Should print -1)",
    "examples": [
      {
        "input": "",
        "output": "-1"
      }
    ],
    "starterCode": "s = \"I love python\"\n# Find\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "-1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.find('java')"
    ]
  },
  {
    "id": 189,
    "title": "String slicing simple",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Given `s = \"programming\"`, print first 4 characters.",
    "examples": [
      {
        "input": "",
        "output": "prog"
      }
    ],
    "starterCode": "s = \"programming\"\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "prog",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s[:4]"
    ]
  },
  {
    "id": 190,
    "title": "String slicing middle",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Given `s = \"programming\"`, print characters from index 3 to 7 (inclusive of 3, exclusive of 7).",
    "examples": [
      {
        "input": "",
        "output": "gram"
      }
    ],
    "starterCode": "s = \"programming\"\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "gram",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s[3:7]"
    ]
  },
  {
    "id": 191,
    "title": "String slicing step",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Given `s = \"abcdef\"`, print every second character starting from index 0.",
    "examples": [
      {
        "input": "",
        "output": "ace"
      }
    ],
    "starterCode": "s = \"abcdef\"\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "ace",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s[::2]"
    ]
  },
  {
    "id": 192,
    "title": "String slice negative index",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Given `s = \"python\"`, print last 3 characters.",
    "examples": [
      {
        "input": "",
        "output": "hon"
      }
    ],
    "starterCode": "s = \"python\"\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "hon",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s[-3:]"
    ]
  },
  {
    "id": 193,
    "title": "Capitalize string",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Capitalize `\"python programming\"` (only first char uppercase).",
    "examples": [
      {
        "input": "",
        "output": "Python programming"
      }
    ],
    "starterCode": "s = \"python programming\"\n# Capitalize\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Python programming",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.capitalize()"
    ]
  },
  {
    "id": 194,
    "title": "Format String index",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print `\"Aarav is 13 years old\"` using `\"{} is {} years old\".format()`.",
    "examples": [
      {
        "input": "",
        "output": "Aarav is 13 years old"
      }
    ],
    "starterCode": "# Format\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Aarav is 13 years old",
        "label": "Test 1"
      }
    ],
    "hints": [
      "\"{...}\".format('Aarav', 13)"
    ]
  },
  {
    "id": 195,
    "title": "Format String Named",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print `\"X: 10, Y: 20\"` using named placeholders in `.format()`.",
    "examples": [
      {
        "input": "",
        "output": "X: 10, Y: 20"
      }
    ],
    "starterCode": "# Format\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "X: 10, Y: 20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "\"{x}: ..., {y}: ...\".format(x=10, y=20)"
    ]
  },
  {
    "id": 196,
    "title": "Check if all space",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"   \"` is all spaces.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"   \"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.isspace()"
    ]
  },
  {
    "id": 197,
    "title": "String center align",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Center align `\"AI\"` in 10-char width padded with `*`.",
    "examples": [
      {
        "input": "",
        "output": "****AI****"
      }
    ],
    "starterCode": "s = \"AI\"\n# Center\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "****AI****",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.center(10, '*')"
    ]
  },
  {
    "id": 198,
    "title": "Left justify string",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Left justify `\"AI\"` in 5-char width padded with `-`.",
    "examples": [
      {
        "input": "",
        "output": "AI---"
      }
    ],
    "starterCode": "s = \"AI\"\n# Ljust\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "AI---",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.ljust(5, '-')"
    ]
  },
  {
    "id": 199,
    "title": "Right justify string",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Right justify `\"AI\"` in 5-char width padded with `-`.",
    "examples": [
      {
        "input": "",
        "output": "---AI"
      }
    ],
    "starterCode": "s = \"AI\"\n# Rjust\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "---AI",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.rjust(5, '-')"
    ]
  },
  {
    "id": 200,
    "title": "Count substrings",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Count how many times `\"th\"` appears in `\"python has pythonic paths\"`.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "s = \"python has pythonic paths\"\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.count('th')"
    ]
  },
  {
    "id": 201,
    "title": "Replace with limit",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Replace `\"a\"` with `\"o\"` in `\"banana\"` but only first 2 occurrences.",
    "examples": [
      {
        "input": "",
        "output": "bonona"
      }
    ],
    "starterCode": "s = \"banana\"\n# Replace\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "bonona",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.replace('a', 'o', 2)"
    ]
  },
  {
    "id": 202,
    "title": "Split with limit",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Split `\"a-b-c-d\"` by `-` but only into maximum 3 parts.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b', 'c-d']"
      }
    ],
    "starterCode": "s = \"a-b-c-d\"\n# Split\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b', 'c-d']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.split('-', 2)"
    ]
  },
  {
    "id": 203,
    "title": "Find last occurrence index",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Find the last index of `\"a\"` in `\"banana\"` using .rfind().",
    "examples": [
      {
        "input": "",
        "output": "5"
      }
    ],
    "starterCode": "s = \"banana\"\n# Rfind\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.rfind('a')"
    ]
  },
  {
    "id": 204,
    "title": "Encode string to bytes",
    "difficulty": "hard",
    "topic": "Strings",
    "description": "Convert `\"hello\"` to bytes object using utf-8 encoding. Print it.",
    "examples": [
      {
        "input": "",
        "output": "b'hello'"
      }
    ],
    "starterCode": "s = \"hello\"\n# Encode\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "b'hello'",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.encode('utf-8')"
    ]
  },
  {
    "id": 205,
    "title": "Is ASCII string",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Print True if `\"hello123\"` is ASCII.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"hello123\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.isascii()"
    ]
  },
  {
    "id": 206,
    "title": "Is title case check",
    "difficulty": "easy",
    "topic": "Strings",
    "description": "Print True if `\"Hello World\"` is in title case.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s = \"Hello World\"\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.istitle()"
    ]
  },
  {
    "id": 207,
    "title": "Zfill padding",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Pad string `\"42\"` with leading zeros to width 5.",
    "examples": [
      {
        "input": "",
        "output": "00042"
      }
    ],
    "starterCode": "s = \"42\"\n# Zfill\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "00042",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.zfill(5)"
    ]
  },
  {
    "id": 208,
    "title": "String partition",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Partition `\"Aarav-13\"` by `-` using .partition(). Print tuple result.",
    "examples": [
      {
        "input": "",
        "output": "('Aarav', '-', '13')"
      }
    ],
    "starterCode": "s = \"Aarav-13\"\n# Partition\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "('Aarav', '-', '13')",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.partition('-')"
    ]
  },
  {
    "id": 209,
    "title": "Remove suffix",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Remove suffix `\".py\"` from `\"main.py\"` using .removesuffix().",
    "examples": [
      {
        "input": "",
        "output": "main"
      }
    ],
    "starterCode": "s = \"main.py\"\n# Remove\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "main",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.removesuffix('.py')"
    ]
  },
  {
    "id": 210,
    "title": "Remove prefix",
    "difficulty": "medium",
    "topic": "Strings",
    "description": "Remove prefix `\"pre_\"` from `\"pre_test\"` using .removeprefix().",
    "examples": [
      {
        "input": "",
        "output": "test"
      }
    ],
    "starterCode": "s = \"pre_test\"\n# Remove\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "test",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.removeprefix('pre_')"
    ]
  },
  {
    "id": 211,
    "title": "List index access",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Given `lst = [10, 20, 30]`, print the item at index 1.",
    "examples": [
      {
        "input": "",
        "output": "20"
      }
    ],
    "starterCode": "lst = [10, 20, 30]\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst[1]"
    ]
  },
  {
    "id": 212,
    "title": "List negative index",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Given `lst = [10, 20, 30]`, print the last item.",
    "examples": [
      {
        "input": "",
        "output": "30"
      }
    ],
    "starterCode": "lst = [10, 20, 30]\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "30",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst[-1]"
    ]
  },
  {
    "id": 213,
    "title": "List extend",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Extend `l1 = [1, 2]` with `l2 = [3, 4]`. Print l1.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3, 4]"
      }
    ],
    "starterCode": "l1 = [1, 2]\nl2 = [3, 4]\n# Extend\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3, 4]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "l1.extend(l2)"
    ]
  },
  {
    "id": 214,
    "title": "List insert",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Insert `\"x\"` at index 1 in `lst = [\"a\", \"b\"]`. Print list.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'x', 'b']"
      }
    ],
    "starterCode": "lst = [\"a\", \"b\"]\n# Insert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'x', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.insert(1, 'x')"
    ]
  },
  {
    "id": 215,
    "title": "List remove",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Remove first occurrence of `2` from `lst = [1, 2, 3, 2]`. Print list.",
    "examples": [
      {
        "input": "",
        "output": "[1, 3, 2]"
      }
    ],
    "starterCode": "lst = [1, 2, 3, 2]\n# Remove\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 3, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.remove(2)"
    ]
  },
  {
    "id": 216,
    "title": "List pop index",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Pop the item at index 1 from `lst = [10, 20, 30]`. Print the popped item.",
    "examples": [
      {
        "input": "",
        "output": "20"
      }
    ],
    "starterCode": "lst = [10, 20, 30]\n# Pop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "20",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.pop(1)"
    ]
  },
  {
    "id": 217,
    "title": "List clear",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Clear all items from `lst = [1, 2]` and print.",
    "examples": [
      {
        "input": "",
        "output": "[]"
      }
    ],
    "starterCode": "lst = [1, 2]\n# Clear\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.clear()"
    ]
  },
  {
    "id": 218,
    "title": "List index finder",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Find index of `\"banana\"` in `['apple', 'banana']`.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "lst = ['apple', 'banana']\n# Find index\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.index('banana')"
    ]
  },
  {
    "id": 219,
    "title": "List count element",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Count occurrences of `5` in `[5, 1, 5, 2]`. Print.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "lst = [5, 1, 5, 2]\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.count(5)"
    ]
  },
  {
    "id": 220,
    "title": "List sort ascending",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Sort `lst = [3, 1, 4, 2]` ascending. Print list.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3, 4]"
      }
    ],
    "starterCode": "lst = [3, 1, 4, 2]\n# Sort\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3, 4]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.sort()"
    ]
  },
  {
    "id": 221,
    "title": "List sort descending",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Sort `lst = [3, 1, 4, 2]` descending. Print list.",
    "examples": [
      {
        "input": "",
        "output": "[4, 3, 2, 1]"
      }
    ],
    "starterCode": "lst = [3, 1, 4, 2]\n# Sort desc\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[4, 3, 2, 1]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.sort(reverse=True)"
    ]
  },
  {
    "id": 222,
    "title": "List reverse method",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Reverse `lst = [1, 2, 3]` in-place and print.",
    "examples": [
      {
        "input": "",
        "output": "[3, 2, 1]"
      }
    ],
    "starterCode": "lst = [1, 2, 3]\n# Reverse\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[3, 2, 1]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.reverse()"
    ]
  },
  {
    "id": 223,
    "title": "List copying",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Copy `lst = [1, 2]` using `.copy()` and print copy.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2]"
      }
    ],
    "starterCode": "lst = [1, 2]\n# Copy\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst.copy()"
    ]
  },
  {
    "id": 224,
    "title": "Tuple index access",
    "difficulty": "easy",
    "topic": "Tuples",
    "description": "Given `tup = (5, 10, 15)`, print index 2.",
    "examples": [
      {
        "input": "",
        "output": "15"
      }
    ],
    "starterCode": "tup = (5, 10, 15)\n# Print\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "15",
        "label": "Test 1"
      }
    ],
    "hints": [
      "tup[2]"
    ]
  },
  {
    "id": 225,
    "title": "Tuple count element",
    "difficulty": "easy",
    "topic": "Tuples",
    "description": "Count how many times `1` appears in tuple `(1, 2, 1, 3)`.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "tup = (1, 2, 1, 3)\n# Count\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "tup.count(1)"
    ]
  },
  {
    "id": 226,
    "title": "Tuple index finder",
    "difficulty": "easy",
    "topic": "Tuples",
    "description": "Find index of `10` in `(5, 10, 15)`.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "tup = (5, 10, 15)\n# Index\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "tup.index(10)"
    ]
  },
  {
    "id": 227,
    "title": "Set add item",
    "difficulty": "easy",
    "topic": "Sets",
    "description": "Add `3` to `s = {1, 2}`. Print sorted set.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3]"
      }
    ],
    "starterCode": "s = {1, 2}\n# Add\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.add(3); print(sorted(list(s)))"
    ]
  },
  {
    "id": 228,
    "title": "Set remove item",
    "difficulty": "easy",
    "topic": "Sets",
    "description": "Remove `2` from `s = {1, 2, 3}`. Print sorted set.",
    "examples": [
      {
        "input": "",
        "output": "[1, 3]"
      }
    ],
    "starterCode": "s = {1, 2, 3}\n# Remove\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.remove(2); print(sorted(list(s)))"
    ]
  },
  {
    "id": 229,
    "title": "Set discard item",
    "difficulty": "easy",
    "topic": "Sets",
    "description": "Discard `5` (not present) from set `{1, 2}`. Print sorted set.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2]"
      }
    ],
    "starterCode": "s = {1, 2}\n# Discard\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.discard(5); print(sorted(list(s)))"
    ]
  },
  {
    "id": 230,
    "title": "Set pop item",
    "difficulty": "easy",
    "topic": "Sets",
    "description": "Pop from `s = {1}`. Print popped item.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "s = {1}\n# Pop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s.pop()"
    ]
  },
  {
    "id": 231,
    "title": "Set intersection",
    "difficulty": "medium",
    "topic": "Sets",
    "description": "Intersection of `{1, 2}` and `{2, 3}`. Print sorted.",
    "examples": [
      {
        "input": "",
        "output": "[2]"
      }
    ],
    "starterCode": "s1 = {1, 2}\ns2 = {2, 3}\n# Intersection\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s1.intersection(s2)"
    ]
  },
  {
    "id": 232,
    "title": "Set union",
    "difficulty": "medium",
    "topic": "Sets",
    "description": "Union of `{1, 2}` and `{2, 3}`. Print sorted.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3]"
      }
    ],
    "starterCode": "s1 = {1, 2}\ns2 = {2, 3}\n# Union\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s1.union(s2)"
    ]
  },
  {
    "id": 233,
    "title": "Set difference",
    "difficulty": "medium",
    "topic": "Sets",
    "description": "Difference `s1 - s2` for `{1, 2}` and `{2, 3}`. Print sorted.",
    "examples": [
      {
        "input": "",
        "output": "[1]"
      }
    ],
    "starterCode": "s1 = {1, 2}\ns2 = {2, 3}\n# Difference\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s1.difference(s2)"
    ]
  },
  {
    "id": 234,
    "title": "Set subset check",
    "difficulty": "medium",
    "topic": "Sets",
    "description": "Check if `{1}` is subset of `{1, 2}`. Print result.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "s1 = {1}\ns2 = {1, 2}\n# Check subset\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s1.issubset(s2)"
    ]
  },
  {
    "id": 235,
    "title": "Dict keys print",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Given `d = {\"a\": 1, \"b\": 2}`, print sorted list of keys.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b']"
      }
    ],
    "starterCode": "d = {\"a\": 1, \"b\": 2}\n# Keys\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "sorted(list(d.keys()))"
    ]
  },
  {
    "id": 236,
    "title": "Dict values print",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Given `d = {\"a\": 1, \"b\": 2}`, print sorted list of values.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2]"
      }
    ],
    "starterCode": "d = {\"a\": 1, \"b\": 2}\n# Values\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "sorted(list(d.values()))"
    ]
  },
  {
    "id": 237,
    "title": "Dict get method",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Use `.get(\"c\", 0)` to fetch key `\"c\"` from `d = {\"a\": 1}`.",
    "examples": [
      {
        "input": "",
        "output": "0"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Get\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "d.get('c', 0)"
    ]
  },
  {
    "id": 238,
    "title": "Dict update",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Update `d = {\"a\": 1}` with `{\"b\": 2}`. Print sorted keys.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b']"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Update\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "d.update({'b': 2})"
    ]
  },
  {
    "id": 239,
    "title": "Dict pop item",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Pop key `\"a\"` from `d = {\"a\": 1, \"b\": 2}`. Print value.",
    "examples": [
      {
        "input": "",
        "output": "1"
      }
    ],
    "starterCode": "d = {\"a\": 1, \"b\": 2}\n# Pop\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "1",
        "label": "Test 1"
      }
    ],
    "hints": [
      "d.pop('a')"
    ]
  },
  {
    "id": 240,
    "title": "Dict clear method",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Clear dict `d = {\"a\": 1}`. Print dict.",
    "examples": [
      {
        "input": "",
        "output": "{}"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Clear\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "d.clear()"
    ]
  },
  {
    "id": 241,
    "title": "Tuple to List",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert tuple `(1, 2)` to list and print.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2]"
      }
    ],
    "starterCode": "t = (1, 2)\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "list(t)"
    ]
  },
  {
    "id": 242,
    "title": "List to Tuple",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert list `[1, 2]` to tuple.",
    "examples": [
      {
        "input": "",
        "output": "(1, 2)"
      }
    ],
    "starterCode": "lst = [1, 2]\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "(1, 2)",
        "label": "Test 1"
      }
    ],
    "hints": [
      "tuple(lst)"
    ]
  },
  {
    "id": 243,
    "title": "List to Set",
    "difficulty": "easy",
    "topic": "Type Conversion",
    "description": "Convert list `[1, 2, 2]` to set and print sorted list.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2]"
      }
    ],
    "starterCode": "lst = [1, 2, 2]\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "sorted(list(set(lst)))"
    ]
  },
  {
    "id": 244,
    "title": "Dict popitem",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `d = {\"a\": 1}`, call `.popitem()`. Print returned tuple.",
    "examples": [
      {
        "input": "",
        "output": "('a', 1)"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Popitem\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "('a', 1)",
        "label": "Test 1"
      }
    ],
    "hints": [
      "d.popitem()"
    ]
  },
  {
    "id": 245,
    "title": "Set symmetric difference",
    "difficulty": "medium",
    "topic": "Sets",
    "description": "Symmetric difference of `{1, 2}` and `{2, 3}`. Print sorted.",
    "examples": [
      {
        "input": "",
        "output": "[1, 3]"
      }
    ],
    "starterCode": "s1 = {1, 2}\ns2 = {2, 3}\n# Sym diff\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "s1.symmetric_difference(s2)"
    ]
  },
  {
    "id": 246,
    "title": "Check key in dict",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Given `d = {\"a\": 1}`, print True if `\"a\"` is in d.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "'a' in d"
    ]
  },
  {
    "id": 247,
    "title": "Check value in dict",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `d = {\"a\": 1}`, print True if `1` is in d.values().",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "d = {\"a\": 1}\n# Check\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "1 in d.values()"
    ]
  },
  {
    "id": 248,
    "title": "Create dict from pairs",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given list of pairs `[('a', 1), ('b', 2)]`, convert to dict and print sorted keys.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b']"
      }
    ],
    "starterCode": "pairs = [('a', 1), ('b', 2)]\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "dict(pairs)"
    ]
  },
  {
    "id": 249,
    "title": "List slice copy",
    "difficulty": "medium",
    "topic": "Lists",
    "description": "Slice copy list `lst = [10, 20, 30]` from index 1 to end. Print.",
    "examples": [
      {
        "input": "",
        "output": "[20, 30]"
      }
    ],
    "starterCode": "lst = [10, 20, 30]\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[20, 30]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst[1:]"
    ]
  },
  {
    "id": 250,
    "title": "List step slice copy",
    "difficulty": "medium",
    "topic": "Lists",
    "description": "Given `lst = [1, 2, 3, 4]`, reverse it using slice and print.",
    "examples": [
      {
        "input": "",
        "output": "[4, 3, 2, 1]"
      }
    ],
    "starterCode": "lst = [1, 2, 3, 4]\n# Slice\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[4, 3, 2, 1]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lst[::-1]"
    ]
  },
  {
    "id": 251,
    "title": "Define function simple",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Define a function `add(a, b)` returning sum. Call with 3, 4 and print.",
    "examples": [
      {
        "input": "",
        "output": "7"
      }
    ],
    "starterCode": "def add(a, b):\n    pass\n\nprint(add(3, 4))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "7",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return a + b"
    ]
  },
  {
    "id": 252,
    "title": "Define function square",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Define `square(x)` returning square. Call with 5.",
    "examples": [
      {
        "input": "",
        "output": "25"
      }
    ],
    "starterCode": "def square(x):\n    pass\n\nprint(square(5))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "25",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return x * x"
    ]
  },
  {
    "id": 253,
    "title": "Function Default arg",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Define `greet(name=\"Aarav\")` returning `\"Hello \" + name`. Call greet() and print.",
    "examples": [
      {
        "input": "",
        "output": "Hello Aarav"
      }
    ],
    "starterCode": "def greet(name=\"Aarav\"):\n    pass\n\nprint(greet())\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Hello Aarav",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return 'Hello ' + name"
    ]
  },
  {
    "id": 254,
    "title": "Define class point",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Create class `Point` with `__init__(self, x, y)`. Store them as x and y. Instantiate `Point(3, 4)` and print `p.x` then `p.y` on separate lines.",
    "examples": [
      {
        "input": "",
        "output": "3\n4"
      }
    ],
    "starterCode": "class Point:\n    def __init__(self, x, y):\n        pass\n\np = Point(3, 4)\nprint(p.x)\nprint(p.y)\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3\n4",
        "label": "Test 1"
      }
    ],
    "hints": [
      "self.x = x; self.y = y"
    ]
  },
  {
    "id": 255,
    "title": "Define class Box",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Create `Box` with `__init__(self, val)`. Add method `get_val(self)` returning val.",
    "examples": [
      {
        "input": "",
        "output": "42"
      }
    ],
    "starterCode": "class Box:\n    def __init__(self, val):\n        pass\n    def get_val(self):\n        pass\n\nb = Box(42)\nprint(b.get_val())\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "42",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return self.val"
    ]
  },
  {
    "id": 256,
    "title": "Class inheritance simple",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Base class `Parent` has method `hello(self)` returning `\"parent\"`. Subclass `Child` overrides it to return `\"child\"`. Instantiate `Child` and print result of `.hello()`.",
    "examples": [
      {
        "input": "",
        "output": "child"
      }
    ],
    "starterCode": "class Parent:\n    def hello(self):\n        return \"parent\"\nclass Child(Parent):\n    def hello(self):\n        pass\n\nc = Child()\nprint(c.hello())\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "child",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Override hello method"
    ]
  },
  {
    "id": 257,
    "title": "Lambda square",
    "difficulty": "easy",
    "topic": "Functional",
    "description": "Create a lambda function `sq` that squares a number. Call with 6.",
    "examples": [
      {
        "input": "",
        "output": "36"
      }
    ],
    "starterCode": "sq = lambda x: 0 # Define lambda\nprint(sq(6))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "36",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lambda x: x * x"
    ]
  },
  {
    "id": 258,
    "title": "Lambda add",
    "difficulty": "easy",
    "topic": "Functional",
    "description": "Create lambda `ad` taking a, b and returning sum. Call with 3, 5.",
    "examples": [
      {
        "input": "",
        "output": "8"
      }
    ],
    "starterCode": "ad = lambda a, b: 0 # Define\nprint(ad(3, 5))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "lambda a, b: a + b"
    ]
  },
  {
    "id": 259,
    "title": "Recursion Factorial",
    "difficulty": "medium",
    "topic": "Recursion",
    "description": "Write recursive `fact(n)`. Print `fact(5)`.",
    "examples": [
      {
        "input": "",
        "output": "120"
      }
    ],
    "starterCode": "def fact(n):\n    pass\n\nprint(fact(5))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "120",
        "label": "Test 1"
      }
    ],
    "hints": [
      "n * fact(n-1) if n > 1 else 1"
    ]
  },
  {
    "id": 260,
    "title": "Recursion Fibonacci element",
    "difficulty": "medium",
    "topic": "Recursion",
    "description": "Write recursive `fib(n)` returning nth Fibonacci (0-indexed: 0, 1, 1, 2, 3, 5...). Print `fib(6)` (which is 8).",
    "examples": [
      {
        "input": "",
        "output": "8"
      }
    ],
    "starterCode": "def fib(n):\n    pass\n\nprint(fib(6))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "fib(n-1) + fib(n-2)"
    ]
  },
  {
    "id": 261,
    "title": "Linear Search Algorithm",
    "difficulty": "medium",
    "topic": "Algorithms",
    "description": "Given `arr = [10, 20, 30]`, write a linear search for target 30. Print index if found, else -1.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "arr = [10, 20, 30]\ntarget = 30\n# Search\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Loop and check"
    ]
  },
  {
    "id": 262,
    "title": "Count Evens Function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `count_evens(lst)` returning count of evens. Call with `[1, 2, 3, 4]`.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "def count_evens(lst):\n    pass\n\nprint(count_evens([1, 2, 3, 4]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return sum(1 for x in lst if x % 2 == 0)"
    ]
  },
  {
    "id": 263,
    "title": "Check Sorted List Function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `is_sorted(lst)` returning True/False. Call with `[1, 2, 4]`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "def is_sorted(lst):\n    pass\n\nprint(is_sorted([1, 2, 4]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Compare adjacent elements"
    ]
  },
  {
    "id": 264,
    "title": "Double List items Function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `double_items(lst)` returning new list with doubled values. Call with `[1, 2, 3]`.",
    "examples": [
      {
        "input": "",
        "output": "[2, 4, 6]"
      }
    ],
    "starterCode": "def double_items(lst):\n    pass\n\nprint(double_items([1, 2, 3]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[2, 4, 6]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return [2*x for x in lst]"
    ]
  },
  {
    "id": 265,
    "title": "Calculate Circle Circumference",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Write `circumference(r)` returning `2 * 3.14 * r`. Print `circumference(10)` rounded to 1 decimal place.",
    "examples": [
      {
        "input": "",
        "output": "62.8"
      }
    ],
    "starterCode": "def circumference(r):\n    pass\n\nprint(round(circumference(10), 1))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "62.8",
        "label": "Test 1"
      }
    ],
    "hints": [
      "2 * 3.14 * r"
    ]
  },
  {
    "id": 266,
    "title": "Get extension function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `get_ext(filename)` returning file extension (after dot). Call with `\"index.html\"`.",
    "examples": [
      {
        "input": "",
        "output": "html"
      }
    ],
    "starterCode": "def get_ext(filename):\n    pass\n\nprint(get_ext(\"index.html\"))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "html",
        "label": "Test 1"
      }
    ],
    "hints": [
      "filename.split('.')[-1]"
    ]
  },
  {
    "id": 267,
    "title": "Reverse string function",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Write `rev_str(s)` returning reversed string. Call with `\"cat\"`.",
    "examples": [
      {
        "input": "",
        "output": "tac"
      }
    ],
    "starterCode": "def rev_str(s):\n    pass\n\nprint(rev_str(\"cat\"))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "tac",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return s[::-1]"
    ]
  },
  {
    "id": 268,
    "title": "Binary Search simple",
    "difficulty": "medium",
    "topic": "Algorithms",
    "description": "Binary search target 3 in sorted `[1, 2, 3, 4]`. Print index.",
    "examples": [
      {
        "input": "",
        "output": "2"
      }
    ],
    "starterCode": "arr = [1, 2, 3, 4]\ntarget = 3\n# Binary search\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check mid point"
    ]
  },
  {
    "id": 269,
    "title": "Bubble Sort simple",
    "difficulty": "medium",
    "topic": "Algorithms",
    "description": "Bubble sort `[4, 2, 3, 1]`. Print sorted list.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3, 4]"
      }
    ],
    "starterCode": "arr = [4, 2, 3, 1]\n# Sort\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3, 4]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Compare adjacent elements and swap"
    ]
  },
  {
    "id": 270,
    "title": "Matrix transpose simple",
    "difficulty": "medium",
    "topic": "Algorithms",
    "description": "Transpose `[[1, 2], [3, 4]]`. Print transposed.",
    "examples": [
      {
        "input": "",
        "output": "[[1, 3], [2, 4]]"
      }
    ],
    "starterCode": "matrix = [[1, 2], [3, 4]]\n# Transpose\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[[1, 3], [2, 4]]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "[[matrix[r][c] for r in range(2)] for c in range(2)]"
    ]
  },
  {
    "id": 271,
    "title": "Check power of 2",
    "difficulty": "easy",
    "topic": "Math",
    "description": "Write a function `is_power_of_two(n)` that returns True if n is a power of 2, else False. Print `is_power_of_two(16)`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "def is_power_of_two(n):\n    pass\n\nprint(is_power_of_two(16))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Check if n > 0 and (n & (n - 1)) == 0"
    ]
  },
  {
    "id": 272,
    "title": "Celsius to Fahrenheit conversion function",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Write `c_to_f(c)` returning Fahrenheit value. Print `c_to_f(0)`.",
    "examples": [
      {
        "input": "",
        "output": "32.0"
      }
    ],
    "starterCode": "def c_to_f(c):\n    pass\n\nprint(c_to_f(0))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "32.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return (c * 9/5) + 32"
    ]
  },
  {
    "id": 273,
    "title": "Fahrenheit to Celsius conversion function",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Write `f_to_c(f)` returning Celsius value. Print `f_to_c(32)`.",
    "examples": [
      {
        "input": "",
        "output": "0.0"
      }
    ],
    "starterCode": "def f_to_c(f):\n    pass\n\nprint(f_to_c(32))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "0.0",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return (f - 32) * 5/9"
    ]
  },
  {
    "id": 274,
    "title": "Find average of list function",
    "difficulty": "easy",
    "topic": "Functions",
    "description": "Write `avg_list(lst)` returning average. Call with `[1, 2, 3, 4]`.",
    "examples": [
      {
        "input": "",
        "output": "2.5"
      }
    ],
    "starterCode": "def avg_list(lst):\n    pass\n\nprint(avg_list([1, 2, 3, 4]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2.5",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return sum(lst) / len(lst)"
    ]
  },
  {
    "id": 275,
    "title": "Capitalize words in sentence function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `cap_words(s)` returning sentence with all words capitalized. Call with `\"hello world\"`.",
    "examples": [
      {
        "input": "",
        "output": "Hello World"
      }
    ],
    "starterCode": "def cap_words(s):\n    pass\n\nprint(cap_words(\"hello world\"))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Hello World",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use s.title() or capitalize each word"
    ]
  },
  {
    "id": 276,
    "title": "Get first characters of list of strings",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `first_chars(lst)` returning list of first characters. Call with `[\"apple\", \"banana\"]`.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b']"
      }
    ],
    "starterCode": "def first_chars(lst):\n    pass\n\nprint(first_chars([\"apple\", \"banana\"]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return [x[0] for x in lst]"
    ]
  },
  {
    "id": 277,
    "title": "Sum elements in nested list",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `sum_nested(nested)` returning sum of all numbers in nested 2D list. Call with `[[1, 2], [3, 4]]`.",
    "examples": [
      {
        "input": "",
        "output": "10"
      }
    ],
    "starterCode": "def sum_nested(nested):\n    pass\n\nprint(sum_nested([[1, 2], [3, 4]]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "10",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return sum(sum(x) for x in nested)"
    ]
  },
  {
    "id": 278,
    "title": "Filter positive numbers function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `positives(lst)` returning list of positive numbers. Call with `[-1, 2, -3, 4]`.",
    "examples": [
      {
        "input": "",
        "output": "[2, 4]"
      }
    ],
    "starterCode": "def positives(lst):\n    pass\n\nprint(positives([-1, 2, -3, 4]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[2, 4]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return [x for x in lst if x > 0]"
    ]
  },
  {
    "id": 279,
    "title": "Filter negative numbers function",
    "difficulty": "medium",
    "topic": "Functions",
    "description": "Write `negatives(lst)` returning list of negative numbers. Call with `[-1, 2, -3, 4]`.",
    "examples": [
      {
        "input": "",
        "output": "[-1, -3]"
      }
    ],
    "starterCode": "def negatives(lst):\n    pass\n\nprint(negatives([-1, 2, -3, 4]))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[-1, -3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return [x for x in lst if x < 0]"
    ]
  },
  {
    "id": 280,
    "title": "Class Student name",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Create `Student` with name attribute. Instantiate with `\"Aarav\"` and print `student.name`.",
    "examples": [
      {
        "input": "",
        "output": "Aarav"
      }
    ],
    "starterCode": "class Student:\n    def __init__(self, name):\n        pass\n\ns = Student(\"Aarav\")\nprint(s.name)\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Aarav",
        "label": "Test 1"
      }
    ],
    "hints": [
      "self.name = name"
    ]
  },
  {
    "id": 281,
    "title": "Class Employee salary",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Create `Employee` with salary. Add `raise_salary(self, amount)` modifying salary. Print salary after raising by 500 from initial 2000.",
    "examples": [
      {
        "input": "",
        "output": "2500"
      }
    ],
    "starterCode": "class Employee:\n    def __init__(self, sal):\n        pass\n    def raise_salary(self, amount):\n        pass\n\ne = Employee(2000)\ne.raise_salary(500)\nprint(e.sal)\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "2500",
        "label": "Test 1"
      }
    ],
    "hints": [
      "self.sal += amount"
    ]
  },
  {
    "id": 282,
    "title": "Class Car model",
    "difficulty": "medium",
    "topic": "OOP",
    "description": "Create `Car` with make and model. Add method `get_info(self)` returning `make + ' ' + model`.",
    "examples": [
      {
        "input": "",
        "output": "Tesla Model 3"
      }
    ],
    "starterCode": "class Car:\n    def __init__(self, make, model):\n        pass\n    def get_info(self):\n        pass\n\nc = Car(\"Tesla\", \"Model 3\")\nprint(c.get_info())\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "Tesla Model 3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return self.make + ' ' + self.model"
    ]
  },
  {
    "id": 283,
    "title": "Check instance type",
    "difficulty": "easy",
    "topic": "OOP",
    "description": "Create an instance of class `Dummy` and print `isinstance(d, Dummy)`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "class Dummy:\n    pass\n\nd = Dummy()\n# Print if d is instance of Dummy\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "print(isinstance(d, Dummy))"
    ]
  },
  {
    "id": 284,
    "title": "List to Dict index mapping",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given list `[\"a\", \"b\"]`, print dict mapping element to index: `{'a': 0, 'b': 1}`.",
    "examples": [
      {
        "input": "",
        "output": "{'a': 0, 'b': 1}"
      }
    ],
    "starterCode": "lst = [\"a\", \"b\"]\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{'a': 0, 'b': 1}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Use enumerate"
    ]
  },
  {
    "id": 285,
    "title": "Merge two lists to dict",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `keys = ['a', 'b']` and `vals = [1, 2]`, create a dict and print. Sorted keys output.",
    "examples": [
      {
        "input": "",
        "output": "{'a': 1, 'b': 2}"
      }
    ],
    "starterCode": "keys = ['a', 'b']\nvals = [1, 2]\n# Merge\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{'a': 1, 'b': 2}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "dict(zip(keys, vals))"
    ]
  },
  {
    "id": 286,
    "title": "Check key exists in dict function",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Write `key_exists(d, k)` returning True/False. Call with `{'a': 1}` and `'b'`.",
    "examples": [
      {
        "input": "",
        "output": "False"
      }
    ],
    "starterCode": "def key_exists(d, k):\n    pass\n\nprint(key_exists({'a': 1}, 'b'))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "False",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return k in d"
    ]
  },
  {
    "id": 287,
    "title": "Count character freq in string function",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Write `char_freq(s)` returning dictionary of character counts. Call with `\"aba\"`.",
    "examples": [
      {
        "input": "",
        "output": "{'a': 2, 'b': 1}"
      }
    ],
    "starterCode": "def char_freq(s):\n    pass\n\nprint(char_freq(\"aba\"))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{'a': 2, 'b': 1}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Count characters in dict"
    ]
  },
  {
    "id": 288,
    "title": "Filter dict values",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `d = {'a': 15, 'b': 5}`, filter out keys with values < 10. Print sorted keys.",
    "examples": [
      {
        "input": "",
        "output": "{'a': 15}"
      }
    ],
    "starterCode": "d = {'a': 15, 'b': 5}\n# Filter\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{'a': 15}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "{k: v for k, v in d.items() if v >= 10}"
    ]
  },
  {
    "id": 289,
    "title": "Convert list of dicts to single dict",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `[{'a': 1}, {'b': 2}]`, merge into single dict.",
    "examples": [
      {
        "input": "",
        "output": "{'a': 1, 'b': 2}"
      }
    ],
    "starterCode": "lst = [{'a': 1}, {'b': 2}]\n# Merge\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "{'a': 1, 'b': 2}",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Loop and update"
    ]
  },
  {
    "id": 290,
    "title": "Check if value exists in dict values function",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Write `val_exists(d, v)` returning True/False. Call with `{'a': 1}` and `1`.",
    "examples": [
      {
        "input": "",
        "output": "True"
      }
    ],
    "starterCode": "def val_exists(d, v):\n    pass\n\nprint(val_exists({'a': 1}, 1))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "True",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return v in d.values()"
    ]
  },
  {
    "id": 291,
    "title": "Sum dict values function",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Write `sum_values(d)` returning sum of all values. Call with `{'a': 10, 'b': 20}`.",
    "examples": [
      {
        "input": "",
        "output": "30"
      }
    ],
    "starterCode": "def sum_values(d):\n    pass\n\nprint(sum_values({'a': 10, 'b': 20}))\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "30",
        "label": "Test 1"
      }
    ],
    "hints": [
      "return sum(d.values())"
    ]
  },
  {
    "id": 292,
    "title": "Remove key from dict",
    "difficulty": "easy",
    "topic": "Dictionaries",
    "description": "Remove key `\"a\"` from `d = {\"a\": 1, \"b\": 2}` and print sorted keys.",
    "examples": [
      {
        "input": "",
        "output": "['b']"
      }
    ],
    "starterCode": "d = {\"a\": 1, \"b\": 2}\n# Remove\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "del d['a']"
    ]
  },
  {
    "id": 293,
    "title": "Tuple multiplication",
    "difficulty": "easy",
    "topic": "Tuples",
    "description": "Given `t = (1, 2)`, multiply by 3 and print.",
    "examples": [
      {
        "input": "",
        "output": "(1, 2, 1, 2, 1, 2)"
      }
    ],
    "starterCode": "t = (1, 2)\n# Multiply\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "(1, 2, 1, 2, 1, 2)",
        "label": "Test 1"
      }
    ],
    "hints": [
      "t * 3"
    ]
  },
  {
    "id": 294,
    "title": "Tuple concatenation",
    "difficulty": "easy",
    "topic": "Tuples",
    "description": "Concatenate `(1, 2)` and `(3, 4)`.",
    "examples": [
      {
        "input": "",
        "output": "(1, 2, 3, 4)"
      }
    ],
    "starterCode": "t1 = (1, 2)\nt2 = (3, 4)\n# Concatenate\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "(1, 2, 3, 4)",
        "label": "Test 1"
      }
    ],
    "hints": [
      "t1 + t2"
    ]
  },
  {
    "id": 295,
    "title": "Convert string list to int list",
    "difficulty": "easy",
    "topic": "Lists",
    "description": "Given `[\"1\", \"2\", \"3\"]`, convert to list of integers.",
    "examples": [
      {
        "input": "",
        "output": "[1, 2, 3]"
      }
    ],
    "starterCode": "lst = [\"1\", \"2\", \"3\"]\n# Convert\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[1, 2, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "[int(x) for x in lst]"
    ]
  },
  {
    "id": 296,
    "title": "Find second largest in list",
    "difficulty": "medium",
    "topic": "Algorithms",
    "description": "Given `nums = [10, 20, 4, 45, 99]`, print the second largest number.",
    "examples": [
      {
        "input": "",
        "output": "45"
      }
    ],
    "starterCode": "nums = [10, 20, 4, 45, 99]\n# Find\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "45",
        "label": "Test 1"
      }
    ],
    "hints": [
      "Sort list, get second last unique"
    ]
  },
  {
    "id": 297,
    "title": "List elements intersection",
    "difficulty": "medium",
    "topic": "Lists",
    "description": "Given `l1 = [1, 2, 3, 2]` and `l2 = [2, 3, 4]`, print unique intersection as sorted list.",
    "examples": [
      {
        "input": "",
        "output": "[2, 3]"
      }
    ],
    "starterCode": "l1 = [1, 2, 3, 2]\nl2 = [2, 3, 4]\n# Intersection\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "[2, 3]",
        "label": "Test 1"
      }
    ],
    "hints": [
      "sorted(list(set(l1) & set(l2)))"
    ]
  },
  {
    "id": 298,
    "title": "Find common keys in two dicts",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `d1 = {'a': 1, 'b': 2}` and `d2 = {'b': 3, 'c': 4}`, print list of common keys sorted.",
    "examples": [
      {
        "input": "",
        "output": "['b']"
      }
    ],
    "starterCode": "d1 = {'a': 1, 'b': 2}\nd2 = {'b': 3, 'c': 4}\n# Common keys\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "sorted(list(d1.keys() & d2.keys()))"
    ]
  },
  {
    "id": 299,
    "title": "Matrix element finder",
    "difficulty": "medium",
    "topic": "Lists",
    "description": "Given 2D matrix, print element at row 1, col 0.",
    "examples": [
      {
        "input": "",
        "output": "3"
      }
    ],
    "starterCode": "matrix = [[1, 2], [3, 4]]\n# Print element\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "3",
        "label": "Test 1"
      }
    ],
    "hints": [
      "matrix[1][0]"
    ]
  },
  {
    "id": 300,
    "title": "Check if key is missing and add default",
    "difficulty": "medium",
    "topic": "Dictionaries",
    "description": "Given `d = {'a': 1}`, if key `'b'` is missing, add `'b': 2`. Print sorted keys.",
    "examples": [
      {
        "input": "",
        "output": "['a', 'b']"
      }
    ],
    "starterCode": "d = {'a': 1}\n# Check and add\n",
    "testCases": [
      {
        "id": 1,
        "input": "",
        "expected": "['a', 'b']",
        "label": "Test 1"
      }
    ],
    "hints": [
      "if 'b' not in d: d['b'] = 2"
    ]
  }
];
