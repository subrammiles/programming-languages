"""
Every object has a unique identity while it exists.
id(obj) returns it (in CPython, its memory address).
"is" compares identities; "==" compares values.
"""

a = 12
b = a
print("<<<< a and b point to the same object >>>>")
print(id(a) == id(b))  # True
print(a is b)  # True

a = 134  # a is reassigned to a different object
print(id(a) == id(b))  # False
print(b)  # 12

print("<<<< equal values, different objects >>>>")
x = [1, 2, 3]
y = [1, 2, 3]
print(x == y)  # True  -> same contents
print(x is y)  # False -> two separate lists
