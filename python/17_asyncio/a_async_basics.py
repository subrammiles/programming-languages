"""
asyncio - concurrency with one thread and an event loop.
 async def  -> defines a coroutine function
 await      -> pause here until the awaited thing finishes; other tasks run meanwhile
 asyncio.run(main())  -> start the event loop
Only "awaitable" operations let other tasks run: asyncio.sleep, async network/file libraries.
A plain time.sleep() or heavy calculation blocks EVERYTHING.
"""
import asyncio
import time


async def brew(drink, seconds):
    print(f"start {drink}")
    await asyncio.sleep(seconds)  # pretend I/O wait
    print(f"{drink} ready")
    return drink


async def main():
    start = time.perf_counter()

    # Awaiting one after another: still sequential (3s)
    await brew("tea", 1)
    await brew("coffee", 2)
    print(f"sequential: {time.perf_counter() - start:.1f}s")

    # Running concurrently: total time = the longest (2s)
    start = time.perf_counter()
    results = await asyncio.gather(brew("tea", 1), brew("coffee", 2))
    print(results, f"concurrent: {time.perf_counter() - start:.1f}s")


coro = brew("test", 0)
print(type(coro).__name__)  # coroutine -> calling an async function doesn't run it
coro.close()

asyncio.run(main())
