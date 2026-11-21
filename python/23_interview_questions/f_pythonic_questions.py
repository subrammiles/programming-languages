"""
"Write it the Python way" questions: short tasks that test knowledge of the language.
"""
import time
from collections import Counter, defaultdict
from contextlib import contextmanager
from functools import wraps

# 1. Merge two dicts (later values win)
a, b = {"x": 1, "y": 2}, {"y": 20, "z": 30}
print(a | b, {**a, **b} == a | b)                    # {'x': 1, 'y': 20, 'z': 30} True

# 2. Invert a dict; sort a dict by value
scores = {"ann": 82, "bo": 95, "cy": 71}
print({v: k for k, v in scores.items()})             # {82: 'ann', 95: 'bo', 71: 'cy'}
print(dict(sorted(scores.items(), key=lambda kv: kv[1], reverse=True)))   # {'bo': 95, 'ann': 82, 'cy': 71}
print(max(scores, key=scores.get))                   # bo

# 3. Group items by a key
words = ["apple", "avocado", "banana", "blueberry", "cherry"]
groups = defaultdict(list)
for w in words:
    groups[w[0]].append(w)
print(dict(groups))   # {'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}

# 4. Pair up two lists; unzip them again
names, ages = ["ann", "bo"], [30, 25]
pairs = list(zip(names, ages))
print(pairs, dict(pairs), list(zip(*pairs)))         # [('ann', 30), ('bo', 25)] {'ann': 30, 'bo': 25} [('ann', 'bo'), (30, 25)]

# 5. Comprehensions: list, dict, set, nested
print([x * x for x in range(10) if x % 2 == 0])      # [0, 4, 16, 36, 64]
print({x: x ** 3 for x in range(4)})                 # {0: 0, 1: 1, 2: 8, 3: 27}
print([[r * c for c in range(1, 4)] for r in range(1, 4)])   # [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# 6. any / all
nums = [2, 4, 6, 7]
print(any(n % 2 for n in nums), all(n > 0 for n in nums))   # True True

# 7. enumerate with a start index
for i, fruit in enumerate(["apple", "kiwi"], start=1):
    print(i, fruit)
# 1 apple
# 2 kiwi


# 8. A timing decorator
def timed(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"  {func.__name__} took {time.perf_counter() - start < 1}")
        return result
    return wrapper


@timed
def work():
    return sum(range(10_000))


print(work())                                         #   work took True   then   49995000


# 9. A memoise decorator by hand (functools.cache does this)
def memoize(func):
    memo = {}

    @wraps(func)
    def wrapper(*args):
        if args not in memo:
            memo[args] = func(*args)
        return memo[args]
    return wrapper


@memoize
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)


print(fib(80))                                        # 23416728348467685


# 10. A context manager, two ways
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start
        return False                                  # do not swallow exceptions


@contextmanager
def opened(name):
    print(f"  open {name}")
    try:
        yield name.upper()
    finally:
        print(f"  close {name}")


with Timer() as t:
    sum(range(1000))
print(t.elapsed >= 0)                                 # True
with opened("data.txt") as f:
    print(" ", f)
#   open data.txt
#   DATA.TXT
#   close data.txt


# 11. A generator for an infinite sequence, consumed lazily
def count_up(start=1):
    while True:
        yield start
        start += 1


from itertools import islice

print(list(islice(count_up(10), 5)))                  # [10, 11, 12, 13, 14]


# 12. Most frequent element(s)
print(Counter("abracadabra").most_common(1))         # [('a', 5)]


# 13. Check types the right way
print(isinstance(True, int), type(True) is int)      # True False   (bool is a subclass of int)


# 14. Unpacking tricks
first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)                            # 1 [2, 3, 4] 5
(x, y), z = (1, 2), 3
print(x, y, z)                                        # 1 2 3


# 15. Copy vs deepcopy
import copy

grid = [[0, 0], [0, 0]]
shallow, deep = copy.copy(grid), copy.deepcopy(grid)
grid[0][0] = 9
print(shallow[0][0], deep[0][0])                      # 9 0


# 16. *args / **kwargs pass-through
def log_call(func, *args, **kwargs):
    print(f"  calling {func.__name__}{args} {kwargs}")
    return func(*args, **kwargs)


print(log_call(round, 3.14159, ndigits=2))            #   calling round(3.14159,) {'ndigits': 2}   then   3.14
