"""
if / elif / else
The body of each branch is the INDENTED block below it.
"""


def check(a):
    if a == 2:
        print("2 is passed")
    elif a == 3:
        print("3 is passed")
    else:
        print("something else was passed")


def grade(marks):
    if marks >= 90:
        return "A"
    elif marks >= 75:
        return "B"
    elif marks >= 35:
        return "C"
    return "Fail"


check(2)  # 2 is passed
check(1)  # something else was passed
print(grade(95), grade(80), grade(40), grade(10))  # A B C Fail

# One-line conditional expression
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # adult

# Nested conditions can often be flattened with and / or
temperature, raining = 30, False
if temperature > 25 and not raining:
    print("go to the beach")
