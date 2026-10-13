"""
itertools - fast building blocks for iterators
 infinite:      count, cycle, repeat
 combining:     chain, zip_longest, product
 filtering:     islice, takewhile, dropwhile, compress, filterfalse
 grouping:      groupby, batched (3.12), pairwise (3.10)
 maths:         accumulate, permutations, combinations
"""
from itertools import (accumulate, batched, chain, combinations, count, cycle, groupby,
                       islice, pairwise, permutations, product, takewhile, zip_longest)

print(list(islice(count(10, 5), 4)))  # [10, 15, 20, 25]
print(list(islice(cycle("AB"), 5)))  # ['A', 'B', 'A', 'B', 'A']
print(list(chain([1, 2], (3,), "ab")))  # [1, 2, 3, 'a', 'b']
print(list(zip_longest("abc", [1], fillvalue="-")))  # [('a', 1), ('b', '-'), ('c', '-')]
print(list(product("ab", [1, 2])))  # [('a', 1), ('a', 2), ('b', 1), ('b', 2)]
print(list(takewhile(lambda x: x < 4, [1, 3, 5, 2])))  # [1, 3]

print("<<<< maths >>>>")
print(list(accumulate([1, 2, 3, 4])))  # [1, 3, 6, 10] running total
print(list(permutations("abc", 2)))  # 6 ordered pairs
print(list(combinations([1, 2, 3, 4], 2)))  # 6 unordered pairs

print("<<<< grouping >>>>")
print(list(pairwise([1, 4, 9, 16])))  # [(1, 4), (4, 9), (9, 16)]
print(list(batched(range(7), 3)))  # [(0, 1, 2), (3, 4, 5), (6,)]

sales = [("IT", 100), ("IT", 50), ("HR", 70), ("IT", 10)]
sales.sort(key=lambda s: s[0])  # groupby only groups ADJACENT items, so sort first
for dept, group in groupby(sales, key=lambda s: s[0]):
    print(dept, sum(amount for _, amount in group))  # HR 70 / IT 160
