"""
The comma makes a tuple, not the parentheses ("tuple packing").
"""
my_tuple = 1, "apple", "hi", True
print(my_tuple)  # (1, 'apple', 'hi', True)

# Tuple unpacking
number, fruit, greeting, flag = my_tuple
print(fruit)  # apple


def min_max(values):
    return min(values), max(values)  # returns a tuple


low, high = min_max([4, 9, 1])
print(low, high)  # 1 9
