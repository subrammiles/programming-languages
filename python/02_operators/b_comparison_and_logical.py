"""
Comparison: == != > < >= <=   (can be chained: 1 < x < 10)
Logical:    and  or  not
and / or return one of their operands (not always True/False) and "short-circuit".
"""
age = 25
print(18 <= age < 60)  # True -> chained comparison, same as 18 <= age and age < 60
print("apple" < "banana")  # True -> strings compare alphabetically
print([1, 2] == [1, 2])  # True

print("<<<< and / or / not >>>>")
print(True and False, True or False, not True)  # False True False

print("<<<< short-circuit and return values >>>>")
print(0 or "default")  # default -> or returns the first truthy value
print("" or None or "x")  # x
print(5 and 10)  # 10 -> and returns the first falsy value, or the last one
username = ""
display = username or "Guest"
print(display)  # Guest

def expensive():
    print("expensive() was called")
    return True

print(False and expensive())  # False -> expensive() never runs

print("<<<< ternary (conditional expression) >>>>")
marks = 72
print("pass" if marks >= 35 else "fail")  # pass
