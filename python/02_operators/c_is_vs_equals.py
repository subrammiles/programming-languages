"""
is  -> are both names the SAME object?   (identity)
==  -> do they have the same VALUE?       (equality)
Use "is" only for None, True and False (singletons). Use == for everything else.
"""

print(2 == 2)  # True
print(True is True)  # True
print(True is False)  # False
print(2 == "2")  # False -> an int never equals a str
print("" == "")  # True

a = [1, 2]
b = [1, 2]
print(a == b)  # True
print(a is b)  # False

value = None
print(value is None)  # True -> the correct way to check for None

# Small ints and some strings are cached by CPython, so "is" may happen to be True.
# Never rely on it:
x = 1000
y = int("1000")
print(x == y, x is y)  # True False
