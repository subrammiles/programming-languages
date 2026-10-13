"""
A tuple cannot change which objects it holds,
but a MUTABLE object inside it (like a list) can still be changed.
"""
my_tuple = (1, 2, 3, ["a", "b", "x"])
my_tuple[-1][2] = "c"
print(my_tuple)  # (1, 2, 3, ['a', 'b', 'c'])

# Such a tuple cannot be used as a dict key or in a set
try:
    hash(my_tuple)
except TypeError as e:
    print(e)  # unhashable type: 'list'
