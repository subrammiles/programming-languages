"""
Tuple slicing returns a new tuple.
"""
my_tuple = (1, 2, 3, 4, 5)

print(my_tuple[0:2])  # (1, 2)
print(my_tuple[1:2])  # (2,)
print(my_tuple[-1:-3])  # () -> start is after stop, so nothing
print(my_tuple[-3:-1])  # (3, 4)
print(my_tuple[::-1])  # (5, 4, 3, 2, 1)
