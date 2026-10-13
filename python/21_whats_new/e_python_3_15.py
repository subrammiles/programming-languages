"""
Highlights of Python 3.15 (October 2026)
 - lazy imports: "lazy import json" (PEP 810)
 - unpacking in comprehensions: [*row for row in rows] (PEP 798)
 - frozendict: an immutable, hashable dict built-in (PEP 814)
 - UTF-8 mode is the default on every platform (PEP 686)
 - profiling.sampling: a sampling profiler that can attach to running programs (PEP 799)
Requires Python 3.15+.
"""
import sys

lazy import json

print("<<<< lazy import >>>>")
print("json loaded:", "json" in sys.modules)  # False
print(json.dumps([1, 2]))
print("json loaded:", "json" in sys.modules)  # True

print("<<<< unpacking in comprehensions >>>>")
rows = [[1, 2], [3], [4, 5]]
print([*row for row in rows])  # [1, 2, 3, 4, 5]
dicts = [{"a": 1}, {"b": 2}]
print({**d for d in dicts})  # {'a': 1, 'b': 2}

print("<<<< frozendict >>>>")
settings = frozendict(host="localhost", port=8000)
print(settings["port"])  # 8000
try:
    settings["port"] = 9000
except TypeError as e:
    print("TypeError:", e)
cache = {settings: "cached result"}  # hashable -> usable as a dict key
print(cache[frozendict(port=8000, host="localhost")])  # cached result

print("<<<< UTF-8 by default >>>>")
print(sys.flags.utf8_mode)  # 1 -> open() uses UTF-8 unless told otherwise

print("<<<< sampling profiler (run from a terminal) >>>>")
print("python3 -m profiling.sampling run some_script.py")
