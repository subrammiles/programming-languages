"""
Functions
 def name(parameters):
     body
     return value
Parameters are the names in the definition; arguments are the values you pass.
"""


def show(a):
    print(a)


def add(a, b):
    return a + b


show("a")  # a
total = add(1, 2)
print(total)  # 3
print(add("ab", "cd"))  # abcd -> works for any type that supports +

# Functions are objects: they can be stored in variables and passed around
operation = add
print(operation(10, 5))  # 15
print(add.__name__)  # add
