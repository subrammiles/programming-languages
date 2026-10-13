"""
functools
 partial(f, x)        a new function with some arguments filled in
 reduce(f, items)     combine items into one value
 cache / lru_cache    memoisation (chapter 12)
 wraps                for decorators
 cmp_to_key           use an old-style compare function with sorted()
"""
from functools import cmp_to_key, partial, reduce

print("<<<< partial >>>>")
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(square(5), cube(2))  # 25 8

to_binary = partial(int, base=2)
print(to_binary("1010"))  # 10

print("<<<< reduce >>>>")
print(reduce(lambda a, b: a * b, [1, 2, 3, 4, 5]))  # 120
print(reduce(lambda acc, word: acc + len(word), ["hi", "there"], 0))  # 7
# for sums and maximums, prefer sum() / max(): they are clearer

print("<<<< cmp_to_key >>>>")
def by_length_then_alpha(a, b):
    return (len(a) - len(b)) or (a > b) - (a < b)

print(sorted(["pear", "fig", "apple", "kiwi"], key=cmp_to_key(by_length_then_alpha)))
# ['fig', 'kiwi', 'pear', 'apple']
