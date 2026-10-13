"""
Generator expressions: like a list comprehension but with ( ) -> lazy.
 sum(x * x for x in range(10))   no brackets needed when it's the only argument
Use them when you only need to loop once, especially over big data.
"""
import sys

squares_list = [x * x for x in range(1_000_000)]
squares_gen = (x * x for x in range(1_000_000))
print(sys.getsizeof(squares_list) > 1_000_000)  # True  -> megabytes
print(sys.getsizeof(squares_gen) < 1_000)  # True  -> a few hundred bytes

print(sum(x * x for x in range(10)))  # 285
print(max(len(w) for w in ["a", "abc", "ab"]))  # 3
print(any(n > 5 for n in [1, 9, 3]))  # True -> stops at 9

words = ["apple", "banana", "cherry"]
print(", ".join(w.upper() for w in words if "a" in w))  # APPLE, BANANA
