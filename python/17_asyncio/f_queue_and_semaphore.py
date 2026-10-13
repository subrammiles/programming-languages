"""
 asyncio.Queue      producer/consumer between tasks
 asyncio.Semaphore  limit how many tasks do something at once (e.g. max 3 requests)
"""
import asyncio
import time


async def download(i, limit):
    async with limit:  # at most 3 inside at a time
        await asyncio.sleep(0.3)
        return i


async def worker(name, queue, done):
    while True:
        item = await queue.get()
        await asyncio.sleep(0.05)
        done.append((name, item))
        queue.task_done()


async def main():
    start = time.perf_counter()
    limit = asyncio.Semaphore(3)
    results = await asyncio.gather(*(download(i, limit) for i in range(9)))
    print(results, f"{time.perf_counter() - start:.1f}s")  # 9 downloads, 3 at a time -> ~0.9s

    queue = asyncio.Queue()
    done = []
    workers = [asyncio.create_task(worker(f"w{i}", queue, done)) for i in range(2)]
    for item in range(6):
        queue.put_nowait(item)
    await queue.join()  # wait until all items are processed
    for w in workers:
        w.cancel()
    print(len(done), "items processed by", sorted({n for n, _ in done}))


asyncio.run(main())
