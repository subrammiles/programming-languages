"""
print() writes to the screen, input() reads a line typed by the user.
print(*values, sep=" ", end="\n")
"""


def print_examples():
    print("<<<< print several values >>>>")
    x, y, z = 1, 2, 3
    print(x, y, z)  # 1 2 3  -> separated by a space by default

    print("<<<< joining strings with + >>>>")
    first, last = "Subbu", "Gary"
    print("Hello " + first + " " + last)  # Hello Subbu Gary
    # print("Age: " + 30)  # TypeError: cannot add str and int, use str(30) or an f-string

    print("<<<< sep and end >>>>")
    print("2026", "10", "13", sep="-")  # 2026-10-13
    print("no new line", end=" | ")
    print("same line")  # no new line | same line

    print("<<<< f-strings (the usual way to mix text and values) >>>>")
    age = 30
    print(f"{first} is {age} years old")  # Subbu is 30 years old


def input_example():
    # input() always returns a STRING; convert it if you need a number
    name = input("What is your name? ")
    age = int(input("How old are you? "))
    print(f"Hi {name}, next year you will be {age + 1}")


print_examples()

if __name__ == "__main__":
    import sys
    if sys.stdin.isatty():  # only ask questions when a person is typing
        input_example()
