"""
Accessing, iterating, and out-of-range errors
"""
t = (1, 2, 3, 4, 5, 6)

print(t[1])  # 2

for i in t:
    print(i, end=" ")
print()

try:
    print(t[10])
except IndexError as e:
    print(e)  # tuple index out of range

print(t + (7,), len(t), 3 in t)  # (1, 2, 3, 4, 5, 6, 7) 6 True
