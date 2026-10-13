"""
Assignment does not copy. To copy:
 shallow copy: list.copy(), list[:], dict.copy(), copy.copy(x)
   -> new outer container, but inner objects are SHARED
 deep copy:    copy.deepcopy(x)
   -> copies everything, recursively
"""
import copy

original = [[1, 2], [3, 4]]

alias = original
shallow = original.copy()
deep = copy.deepcopy(original)

original[0].append(99)  # change an inner list
original.append([5])  # change the outer list

print(alias)  # [[1, 2, 99], [3, 4], [5]] -> same object
print(shallow)  # [[1, 2, 99], [3, 4]]   -> outer copied, inner shared
print(deep)  # [[1, 2], [3, 4]]          -> fully independent

print("<<<< the [[]] * n trap >>>>")
grid = [[0] * 3] * 2  # the SAME inner list twice!
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0]]
grid = [[0] * 3 for _ in range(2)]  # correct: a new list each time
grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0]]
