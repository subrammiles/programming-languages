"""
Tuples have only two methods: count() and index().
"""
my_tuple = (1, 2, 3, 4, 5, 2)

print(my_tuple * 2)  # (1, 2, 3, 4, 5, 2, 1, 2, 3, 4, 5, 2)
print(my_tuple.count(2))  # 2
print(my_tuple.index(5))  # 4
print(my_tuple.index(2))  # 1 -> the first occurrence
