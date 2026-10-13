"""
Lambda with filter() and map(), and the more Pythonic comprehension equivalents.
filter(fn, items) keeps items where fn(item) is truthy.
map(fn, items) applies fn to every item.
Both return lazy iterators; wrap in list() to see the values.
"""
numbers = [34, 12, 64, 55, 75, 13, 63]

odd = list(filter(lambda n: n % 2 != 0, numbers))
print(odd)  # [55, 75, 13, 63]
print([n for n in numbers if n % 2 != 0])  # same, usually preferred

squared = list(map(lambda n: n ** 2, [2, 4, 5]))
print(squared)  # [4, 16, 25]
print([n ** 2 for n in [2, 4, 5]])  # same

print(list(map(str.upper, ["a", "b"])))  # ['A', 'B'] -> any function works with map
print(list(map(lambda a, b: a + b, [1, 2], [10, 20])))  # [11, 22]

# A list of lambdas: capture n as a default so each one keeps its own value
square_funcs = [lambda n=n: n ** 2 for n in range(5)]
print([f() for f in square_funcs])  # [0, 1, 4, 9, 16]
