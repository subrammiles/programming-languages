"""
Type conversion (casting)
 int(x), float(x), str(x), bool(x), list(x), tuple(x), set(x), dict(x)
Implicit conversion only happens between numbers (int + float -> float).
"""

print(int("42") + 1)  # 43
print(int(3.99))  # 3 -> cuts off the decimal part (does not round)
print(int("ff", 16))  # 255 -> from hexadecimal
print(float("3.5"))  # 3.5
print(str(100) + " points")  # 100 points
print(3 + 2.5)  # 5.5 -> int converted to float automatically

print(list("abc"))  # ['a', 'b', 'c']
print(set([1, 1, 2]))  # {1, 2}
print(tuple([1, 2]))  # (1, 2)
print(dict([("a", 1), ("b", 2)]))  # {'a': 1, 'b': 2}

print("<<<< failed conversions raise ValueError >>>>")
for text in ["12", "12.5", "twelve"]:
    try:
        print(int(text))
    except ValueError as e:
        print("ValueError:", e)
# 12
# ValueError: invalid literal for int() with base 10: '12.5'
# ValueError: invalid literal for int() with base 10: 'twelve'

print(int(float("12.5")))  # 12 -> convert to float first
