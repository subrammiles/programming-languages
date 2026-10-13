"""
List slicing works like string slicing: list[start:stop:step]
A slice is a NEW list (a shallow copy). Slices can also be assigned to.
"""
numbers = [1, 2, 3, 4, 5, 6]

print(numbers[0:2])  # [1, 2]
print(numbers[-2:])  # [5, 6]
print(numbers[::2])  # [1, 3, 5]
print(numbers[::-1])  # [6, 5, 4, 3, 2, 1]

copy = numbers[:]  # quick copy
copy[0] = 99
print(numbers[0])  # 1 -> the original is unchanged

numbers[1:3] = ["b", "c", "extra"]  # replace a slice (sizes may differ)
print(numbers)  # [1, 'b', 'c', 'extra', 4, 5, 6]
numbers[1:4] = []  # delete a slice
print(numbers)  # [1, 4, 5, 6]
