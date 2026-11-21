"""
List (array) programs asked in Python interviews.
Patterns to recognise: dict/set lookups, two pointers, sliding window, running max/min.
"""
from collections import Counter
from itertools import chain


# 1. Remove duplicates keeping order
nums = [3, 1, 3, 2, 1, 4]
print(list(dict.fromkeys(nums)))           # [3, 1, 2, 4]
print(sorted(set(nums)))                   # [1, 2, 3, 4]   (list(set(...)) loses the original order)


# 2. Find duplicates
print([x for x, n in Counter([4, 2, 7, 2, 4, 4]).items() if n > 1])   # [4, 2]


# 3. Missing number in 1..n
def missing_number(arr):
    n = len(arr) + 1
    return n * (n + 1) // 2 - sum(arr)


print(missing_number([1, 2, 4, 5, 6]))     # 3


# 4. Two sum (indices), O(n)
def two_sum(arr, target):
    seen = {}
    for i, x in enumerate(arr):
        if target - x in seen:
            return seen[target - x], i
        seen[x] = i
    return None


print(two_sum([2, 7, 11, 15], 9), two_sum([3, 2, 4], 6))   # (0, 1) (1, 2)


# 5. Rotate right by k
def rotate(arr, k):
    k %= len(arr)
    return arr[-k:] + arr[:-k]


print(rotate([1, 2, 3, 4, 5], 2))          # [4, 5, 1, 2, 3]


# 6. Move zeros to the end, in place
def move_zeros(arr):
    write = 0
    for x in arr:
        if x != 0:
            arr[write] = x
            write += 1
    arr[write:] = [0] * (len(arr) - write)
    return arr


print(move_zeros([0, 1, 0, 3, 12]))        # [1, 3, 12, 0, 0]


# 7. Merge two sorted lists (two pointers)
def merge_sorted(a, b):
    out, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    return out + a[i:] + b[j:]


print(merge_sorted([1, 4, 7], [2, 3, 8]))  # [1, 2, 3, 4, 7, 8]


# 8. Maximum subarray sum (Kadane)
def max_subarray(arr):
    best = cur = arr[0]
    for x in arr[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best


print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))   # 6


# 9. Best time to buy and sell a stock
def max_profit(prices):
    low, profit = float("inf"), 0
    for p in prices:
        low = min(low, p)
        profit = max(profit, p - low)
    return profit


print(max_profit([7, 1, 5, 3, 6, 4]))      # 5


# 10. Flatten a nested list (any depth)
def flatten(items):
    for x in items:
        if isinstance(x, list):
            yield from flatten(x)
        else:
            yield x


print(list(flatten([1, [2, [3, [4]]], 5])))   # [1, 2, 3, 4, 5]
print(list(chain.from_iterable([[1, 2], [3], [4, 5]])))   # [1, 2, 3, 4, 5]   (one level only)


# 11. Chunk a list
data = [1, 2, 3, 4, 5, 6, 7]
print([data[i:i + 3] for i in range(0, len(data), 3)])   # [[1, 2, 3], [4, 5, 6], [7]]
from itertools import batched                           # Python 3.12+
print(list(batched(data, 3)))                           # [(1, 2, 3), (4, 5, 6), (7,)]


# 12. Intersection, union, difference
a, b = [1, 2, 2, 3, 4], [2, 4, 6]
print(sorted(set(a) & set(b)), sorted(set(a) | set(b)), sorted(set(a) - set(b)))   # [2, 4] [1, 2, 3, 4, 6] [1, 3]


# 13. Pairs with a given sum
def pairs_with_sum(arr, target):
    seen, pairs = set(), set()
    for x in arr:
        if target - x in seen:
            pairs.add((min(x, target - x), max(x, target - x)))
        seen.add(x)
    return sorted(pairs)


print(pairs_with_sum([1, 5, 7, -1, 5, 3], 6))   # [(-1, 7), (1, 5)]   (3 appears once, so (3, 3) is not a pair)
print(pairs_with_sum([3, 3, 2, 4], 6))          # [(2, 4), (3, 3)]


# 14. Sliding window: largest sum of k consecutive numbers
def max_window_sum(arr, k):
    window = best = sum(arr[:k])
    for i in range(k, len(arr)):
        window += arr[i] - arr[i - k]
        best = max(best, window)
    return best


print(max_window_sum([2, 1, 5, 1, 3, 2], 3))   # 9


# 15. Majority element (appears more than n/2 times)
print(Counter([2, 2, 1, 1, 2, 2, 3]).most_common(1)[0][0])   # 2


# 16. Matrix: transpose and rotate 90 degrees clockwise
matrix = [[1, 2, 3], [4, 5, 6]]
print([list(row) for row in zip(*matrix)])                   # [[1, 4], [2, 5], [3, 6]]
print([list(row) for row in zip(*matrix[::-1])])             # [[4, 1], [5, 2], [6, 3]]
