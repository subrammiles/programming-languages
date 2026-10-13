"""
return
 - ends the function immediately
 - no return (or a bare return) gives None
 - "return a, b" returns a tuple, which you can unpack
"""


def divide(a, b):
    if b == 0:
        return None  # early exit
    return a / b


def stats(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)


def say_hi():
    print("hi")


print(divide(10, 2))  # 5.0
print(divide(1, 0))  # None

low, high, average = stats([4, 8, 6])
print(low, high, average)  # 4 8 6.0

result = say_hi()
print(result)  # None
