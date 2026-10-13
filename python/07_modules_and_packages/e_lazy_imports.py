"""
Lazy imports (Python 3.15)
 lazy import module
The module is NOT loaded until the name is first used.
Speeds up start-up of programs and command-line tools that import a lot
but only use some of it on each run.
Requires Python 3.15+.
"""
import sys
import time

lazy import json
lazy from decimal import Decimal

print("json loaded yet?", "json" in sys.modules)  # False

start = time.perf_counter()
print(json.dumps({"lazy": True}))  # first use: json is imported now
print("json loaded yet?", "json" in sys.modules)  # True
print(Decimal("1.10") + Decimal("2.20"))  # 3.30
print(f"first use took {(time.perf_counter() - start) * 1000:.1f} ms")
