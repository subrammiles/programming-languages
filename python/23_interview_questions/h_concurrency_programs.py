"""
Concurrency programs asked in Python interviews.
Concepts are in chapters 16 (threads, processes, the GIL) and 17 (asyncio).

Quick answer to "threads, processes or asyncio?":
 - I/O-bound with a few blocking libraries  -> threads (ThreadPoolExecutor)
 - I/O-bound, many connections, async libs  -> asyncio
 - CPU-bound                                -> processes (ProcessPoolExecutor),
                                               or free-threaded Python 3.14+ (no GIL)
"""
import asyncio
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

# 1. Print odd and even numbers alternately from two threads
odd_turn, even_turn = threading.Semaphore(1), threading.Semaphore(0)
out = []


def odd():
    for i in range(1, 10, 2):
        odd_turn.acquire()
        out.append(i)
        even_turn.release()


def even():
    for i in range(2, 11, 2):
        even_turn.acquire()
        out.append(i)
        odd_turn.release()


threads = [threading.Thread(target=odd), threading.Thread(target=even)]
for t in threads:
    t.start()
for t in threads:
    t.join()
print(out)                               # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


# 2. A thread-safe counter (and why += is not atomic)
class Counter:
    def __init__(self):
        self.value = 0
        self._lock = threading.Lock()

    def increment(self):
        with self._lock:                 # read + add + write must happen together
            self.value += 1


c = Counter()
with ThreadPoolExecutor(max_workers=8) as pool:
    for _ in range(10_000):
        pool.submit(c.increment)
print(c.value)                           # 10000


# 3. Download many "URLs" with a thread pool, handling results as they finish
def fetch(url):
    time.sleep({"slow": 0.05}.get(url, 0.01))
    if url == "broken":
        raise ConnectionError(f"{url}: 500")
    return f"{url}: ok"


urls = ["a", "slow", "broken", "b"]
results = {}
start = time.perf_counter()
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = {pool.submit(fetch, u): u for u in urls}
    for future in as_completed(futures):         # in completion order, not submission order
        url = futures[future]
        try:
            results[url] = future.result()
        except ConnectionError as e:
            results[url] = f"error ({e})"
print([results[u] for u in urls])
# ['a: ok', 'slow: ok', 'error (broken: 500)', 'b: ok']
print("parallel:", time.perf_counter() - start < 0.08)   # parallel: True   (sequential would be ~0.08s)


# 4. asyncio: run many coroutines with a concurrency limit and a timeout
async def fetch_async(url, sem):
    async with sem:                               # at most 2 at a time
        await asyncio.sleep(0.5 if url == "hangs" else 0.02)
        return f"{url}: done"


async def main():
    sem = asyncio.Semaphore(2)
    tasks = [asyncio.wait_for(fetch_async(u, sem), timeout=0.2) for u in ("x", "y", "hangs", "z")]
    results = await asyncio.gather(*tasks, return_exceptions=True)   # errors become results
    return [r if isinstance(r, str) else type(r).__name__ for r in results]


print(asyncio.run(main()))               # ['x: done', 'y: done', 'TimeoutError', 'z: done']


# 5. Producer-consumer with asyncio.Queue
async def pipeline():
    queue = asyncio.Queue(maxsize=2)
    consumed = []

    async def producer():
        for i in range(5):
            await queue.put(i)           # waits when the queue is full
        await queue.put(None)            # sentinel: "no more items"

    async def consumer():
        while (item := await queue.get()) is not None:
            consumed.append(item * 10)

    async with asyncio.TaskGroup() as tg:
        tg.create_task(producer())
        tg.create_task(consumer())
    return consumed


print(asyncio.run(pipeline()))           # [0, 10, 20, 30, 40]


# 6. Deadlock, and how lock ordering prevents it
lock_a, lock_b = threading.Lock(), threading.Lock()


def transfer(first, second, log, name):
    # Always take locks in the same global order (here: by id) to avoid a deadlock
    for lock in sorted((first, second), key=id):
        lock.acquire()
    log.append(name)
    for lock in (first, second):
        lock.release()


log = []
t1 = threading.Thread(target=transfer, args=(lock_a, lock_b, log, "a->b"))
t2 = threading.Thread(target=transfer, args=(lock_b, lock_a, log, "b->a"))
t1.start(); t2.start(); t1.join(); t2.join()
print(sorted(log))                       # ['a->b', 'b->a']   (finished, no deadlock)
