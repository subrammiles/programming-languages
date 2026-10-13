"""
List operators: * repetition, + concatenation, in membership, len(), iteration
"""
l1 = [1, 2, 3, 4]
l2 = [5, 6, 7, 8]

print(l1 * 2)  # [1, 2, 3, 4, 1, 2, 3, 4]
print(l1 + l2)  # [1, 2, 3, 4, 5, 6, 7, 8]
print(2 in l1, 100 in l1)  # True False

for i in l1:
    print(i, end=" ")
print()

print(len(l1))  # 4

try:
    print(l1[10])
except IndexError as e:
    print(e)  # list index out of range

print(min(l1), max(l1), sum(l1))  # 1 4 10
