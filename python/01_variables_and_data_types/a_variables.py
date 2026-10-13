"""
Variables
A variable is a NAME that refers to a value. No type is declared:
Python works it out from the value (dynamic typing).
Naming rules: letters, digits and _ ; cannot start with a digit; case-sensitive.
Convention (PEP 8): snake_case for variables, UPPER_CASE for constants.
"""


def method1():
    print("<<<< simple variables >>>>")
    a = 2
    b = "Hi"
    print(a)  # 2
    print(b)  # Hi

    a = "now a string"  # the same name can point to a value of another type
    print(a)


def method2():
    print("<<<< multiple variables in one line >>>>")
    # the number of variables must match the number of values
    x, y, z = "Orange", "Banana", "Grapes"
    print(x, y, z)  # Orange Banana Grapes


def method3():
    print("<<<< one value to multiple variables >>>>")
    x = y = z = "Orange"
    print(x, y, z)  # Orange Orange Orange


def method4():
    print("<<<< unpacking a collection >>>>")
    fruits = ["apple", "mango", "banana"]
    x, y, z = fruits
    print(x, y, z)  # apple mango banana

    first, *rest = fruits  # * collects the remaining items into a list
    print(first, rest)  # apple ['mango', 'banana']


def method5():
    print("<<<< swapping >>>>")
    a, b = 1, 2
    a, b = b, a  # no temporary variable needed
    print(a, b)  # 2 1


MAX_USERS = 100  # a constant by convention; Python does not stop you changing it

method1()
method2()
method3()
method4()
method5()
