"""
Arithmetic: + - * / // % **
Assignment: = += -= *= /= //= %= **=
There is no ++ or -- in Python; use x += 1.
"""
a, b = 17, 5
print(a + b, a - b, a * b)  # 22 12 85
print(a / b)  # 3.4
print(a // b)  # 3 -> floor division
print(a % b)  # 2 -> remainder
print(a ** 2)  # 289 -> power

x = 10
x += 5  # x = x + 5
x *= 2
print(x)  # 30

# + and * also work on sequences
print("ab" * 3)  # ababab
print([0] * 4)  # [0, 0, 0, 0]
print([1, 2] + [3])  # [1, 2, 3]
