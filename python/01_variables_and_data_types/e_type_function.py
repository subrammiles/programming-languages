"""
type(x) tells you the class of a value. Everything in Python is an object.
isinstance(x, SomeType) is the better way to CHECK a type (it also accepts subclasses).
"""

print(type("Subbu"))  # <class 'str'>
print(type("2"))  # <class 'str'> -> quotes make it text, not a number
print(type(2))  # <class 'int'>
print(type((1, 2, 3)))  # <class 'tuple'>
print(type(print))  # <class 'builtin_function_or_method'>

print(isinstance(5, int))  # True
print(isinstance(True, int))  # True -> bool is a subclass of int
print(isinstance(5.0, (int, float)))  # True -> check against several types
