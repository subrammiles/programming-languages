"""
Processes have their own memory and their own interpreter (and GIL),
so they really run Python code in parallel on several CPU cores.
Use them for CPU-heavy work. Data passed between processes is pickled (copied).
On Windows/macOS the code that starts processes MUST be inside  if __name__ == "__main__":
"""
import os
import time
from concurrent.futures import ProcessPoolExecutor


def count_primes(limit):
    count = 0
    for n in range(2, limit):
        if all(n % d for d in range(2, int(n ** 0.5) + 1)):
            count += 1
    return count


if __name__ == "__main__":
    jobs = [60_000] * 4
    print("CPU cores:", os.cpu_count())

    start = time.perf_counter()
    sequential = [count_primes(j) for j in jobs]
    t1 = time.perf_counter() - start

    start = time.perf_counter()
    with ProcessPoolExecutor() as pool:
        parallel = list(pool.map(count_primes, jobs))
    t2 = time.perf_counter() - start

    print(sequential == parallel, parallel)  # True [6057, 6057, 6057, 6057]
    print(f"sequential {t1:.2f}s, processes {t2:.2f}s")
