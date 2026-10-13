"""
Subinterpreters (Python 3.14)
Several independent Python interpreters inside ONE process, each with its own GIL,
so they run in parallel like processes but start faster and use less memory.
 concurrent.futures.InterpreterPoolExecutor  - the easy way
 concurrent.interpreters                     - lower-level API
Functions and arguments must be picklable (like with processes).
Requires Python 3.14+.
"""
import time
from concurrent.futures import InterpreterPoolExecutor


def count_primes(limit):
    count = 0
    for n in range(2, limit):
        if all(n % d for d in range(2, int(n ** 0.5) + 1)):
            count += 1
    return count


if __name__ == "__main__":
    start = time.perf_counter()
    with InterpreterPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(count_primes, [60_000] * 4))
    print(results, f"in {time.perf_counter() - start:.2f}s")  # [6057, 6057, 6057, 6057]

    from concurrent import interpreters
    interp = interpreters.create()
    interp.exec("import sys; print('hello from a subinterpreter, id', id(sys))")
    interp.close()
