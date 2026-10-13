"""
Assignment expression :=  ("walrus operator", Python 3.8)
Assigns AND returns a value inside an expression.
Avoids computing something twice or writing an extra line.
"""
import re

print("<<<< in an if >>>>")
data = [1, 2, 3, 4, 5, 6]
if (n := len(data)) > 5:
    print(f"list is too long ({n} items)")

print("<<<< in a while loop >>>>")
lines = iter(["first", "second", ""])
while (line := next(lines)) != "":
    print("read:", line)

print("<<<< in a comprehension >>>>")
numbers = [3, 8, 12, 5]
results = [y for x in numbers if (y := x * x) > 20]
print(results)  # [64, 144, 25]

print("<<<< with regex >>>>")
if match := re.search(r"(\d+) items", "you have 42 items"):
    print(match.group(1))  # 42
