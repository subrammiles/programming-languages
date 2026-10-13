"""
Decorators from the standard library
 @functools.cache / @lru_cache(maxsize)   remember results
 @property @classmethod @staticmethod     (chapter 10)
 @dataclass                               (chapter 14)
 @functools.singledispatch                choose an implementation by argument type
 @contextlib.contextmanager               (next files)
"""
import functools
import time


@functools.lru_cache(maxsize=128)
def slow_lookup(user_id):
    time.sleep(0.2)
    return f"user-{user_id}"


start = time.perf_counter()
slow_lookup(1)
slow_lookup(1)  # instant: cached
print(f"two calls took {time.perf_counter() - start:.2f}s")  # ~0.20s, not 0.40s
print(slow_lookup.cache_info())  # CacheInfo(hits=1, misses=1, maxsize=128, currsize=1)


@functools.singledispatch
def to_text(value):
    return str(value)


@to_text.register
def _(value: list):
    return ", ".join(to_text(v) for v in value)


@to_text.register
def _(value: dict):
    return "; ".join(f"{k}={to_text(v)}" for k, v in value.items())


print(to_text(42))  # 42
print(to_text([1, 2, 3]))  # 1, 2, 3
print(to_text({"a": [1, 2], "b": 3}))  # a=1, 2; b=3
