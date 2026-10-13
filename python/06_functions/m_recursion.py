"""
Recursion: a function that calls itself.
Every recursive function needs a BASE CASE that stops it.
Python limits the depth (about 1000 calls) and does not optimise tail calls,
so prefer loops for long sequences.
"""
import sys
from functools import cache


def factorial(n):
    if n <= 1:  # base case
        return 1
    return n * factorial(n - 1)


def flatten(items):
    result = []
    for item in items:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result


@cache  # remember results: turns this from exponential to linear time
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(factorial(5))  # 120
print(flatten([1, [2, [3, [4]], 5]]))  # [1, 2, 3, 4, 5]
print(fib(80))  # 23416728348467685
print(sys.getrecursionlimit())  # 1000

try:
    factorial(100_000)
except RecursionError as e:
    print("RecursionError:", e)
