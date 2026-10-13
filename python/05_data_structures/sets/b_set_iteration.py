"""
Iterating over a set. The order is not guaranteed, so use sorted() when it matters.
"""
my_set = {5, 3, 1, 4, 2}

for i in my_set:
    print(i, end=" ")
print()

for i in sorted(my_set):
    print(i, end=" ")  # 1 2 3 4 5
print()
