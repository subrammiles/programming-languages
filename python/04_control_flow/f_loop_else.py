"""
for/while ... else
The else block runs only if the loop finished WITHOUT hitting break.
Think of it as "no break".
"""


def find(items, target):
    for index, item in enumerate(items):
        if item == target:
            print(f"found {target} at index {index}")
            break
    else:
        print(f"{target} not found")


find([4, 7, 9], 7)  # found 7 at index 1
find([4, 7, 9], 5)  # 5 not found

# Classic example: prime numbers
for n in range(2, 12):
    for d in range(2, n):
        if n % d == 0:
            break
    else:
        print(n, "is prime")
# 2 3 5 7 11
