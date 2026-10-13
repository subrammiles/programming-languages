"""
Unpacking
 a, b = [1, 2]
 first, *rest = items          (* collects the remaining items)
 [*a, *b]  {**d1, **d2}        unpack into a new list / dict
 f(*args)  f(**kwargs)         unpack into function arguments
"""
first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)  # 1 [2, 3, 4] 5

head, *tail = "abc"
print(head, tail)  # a ['b', 'c']

(x, y), z = (1, 2), 3  # nested
print(x, y, z)  # 1 2 3

a = [1, 2]
b = (3, 4)
print([*a, *b, 5])  # [1, 2, 3, 4, 5]
print({**{"x": 1}, "y": 2})  # {'x': 1, 'y': 2}

def area(width, height):
    return width * height

size = (3, 4)
print(area(*size))  # 12
print(area(**{"width": 5, "height": 2}))  # 10

_, important, _ = ("skip", "keep", "skip")  # _ means "I don't need this"
print(important)  # keep
