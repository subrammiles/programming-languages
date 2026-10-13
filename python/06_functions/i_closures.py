"""
Closures
An inner function that remembers variables from the function that created it,
even after that function has returned.
Used for factories, counters, callbacks and decorators (chapter 12).
"""


def make_multiplier(factor):
    def multiply(x):
        return x * factor  # "factor" is remembered

    return multiply


double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5), triple(5))  # 10 15


def make_counter():
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter


c1 = make_counter()
c2 = make_counter()
print(c1(), c1(), c1(), c2())  # 1 2 3 1 -> each counter has its own state

print("<<<< late binding gotcha >>>>")
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])  # [2, 2, 2] -> all see the final i
funcs = [lambda i=i: i for i in range(3)]  # capture the current value as a default
print([f() for f in funcs])  # [0, 1, 2]
