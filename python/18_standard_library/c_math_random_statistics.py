"""
math, random, statistics
random is NOT for passwords or tokens: use secrets (see h_hashlib_secrets_uuid.py).
"""
import math
import random
import statistics

print(math.sqrt(16), math.pi, math.e)  # 4.0 3.14159... 2.71828...
print(math.floor(2.7), math.ceil(2.1), math.trunc(-2.7))  # 2 3 -2
print(math.gcd(12, 18), math.lcm(4, 6), math.factorial(5))  # 6 12 120
print(math.comb(5, 2), math.perm(5, 2))  # 10 20
print(math.dist((0, 0), (3, 4)), math.hypot(3, 4))  # 5.0 5.0
print(math.isclose(0.1 + 0.2, 0.3), math.prod([2, 3, 4]))  # True 24
print(math.log(100, 10), math.log2(8), math.degrees(math.pi))  # 2.0 3.0 180.0

random.seed(42)  # same "random" numbers every run (good for tests)
print(random.randint(1, 6), random.random() < 1, random.uniform(1, 2) < 2)
print(random.choice(["red", "green", "blue"]))
print(random.sample(range(100), 3))  # 3 unique numbers
items = [1, 2, 3, 4]
random.shuffle(items)
print(items)
print(random.choices(["win", "lose"], weights=[1, 9], k=5))

data = [2, 4, 4, 4, 5, 5, 7, 9]
print(statistics.mean(data), statistics.median(data), statistics.mode(data))  # 5 4.5 4
print(round(statistics.stdev(data), 3))  # 2.138
print(statistics.quantiles(data, n=4))  # [4.0, 4.5, 6.5]
print(round(statistics.correlation([1, 2, 3, 4], [2, 4, 5, 8]), 3))  # 0.981
