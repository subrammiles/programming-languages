"""
You cannot delete items from a tuple, but you can delete the whole tuple.
"""
my_tuple = (1, 2, 3, 4)

try:
    del my_tuple[1]
except TypeError as e:
    print(e)  # 'tuple' object doesn't support item deletion

del my_tuple
try:
    print(my_tuple)
except NameError as e:
    print(e)  # name 'my_tuple' is not defined

# To "remove" an item, build a new tuple
t = (1, 2, 3, 4)
t = t[:1] + t[2:]
print(t)  # (1, 3, 4)
