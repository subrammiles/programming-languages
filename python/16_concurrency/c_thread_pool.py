"""
concurrent.futures - the simplest way to run work in parallel
 ThreadPoolExecutor   threads   -> I/O-bound work
 ProcessPoolExecutor  processes -> CPU-bound work (next file)
 executor.map(fn, items)          results in input order
 executor.submit(fn, arg) -> Future; as_completed(futures) yields them as they finish
"""
import time
from concurrent.futures import ThreadPoolExecutor, as_completed


def download(url):
    time.sleep(0.5)  # pretend network delay
    return f"{url}: {len(url) * 100} bytes"


urls = [f"https://example.com/page{i}" for i in range(8)]

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=8) as pool:
    for result in pool.map(download, urls):
        print(result)
print(f"8 downloads in {time.perf_counter() - start:.1f}s (sequential would take 4s)")

print("<<<< submit + as_completed >>>>")
def slow_square(n):
    time.sleep(0.3 * (3 - n))
    return n, n * n

with ThreadPoolExecutor() as pool:
    futures = [pool.submit(slow_square, n) for n in range(3)]
    for future in as_completed(futures):
        print("finished:", future.result())  # (2, 4) first, it sleeps least
