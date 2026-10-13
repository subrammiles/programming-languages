"""
Mixing async with blocking code
A blocking call (time.sleep, requests.get, heavy CPU) inside a coroutine freezes the event loop.
 await asyncio.to_thread(func, *args)   run blocking code in a thread (3.9)
"""
import asyncio
import time


def blocking_report():
    time.sleep(1)  # e.g. a library that has no async version
    return "report ready"


async def heartbeat():
    for _ in range(4):
        print("  heartbeat")
        await asyncio.sleep(0.25)


async def bad_job():
    return blocking_report()  # blocks the whole event loop for 1 second


async def main():
    print("<<<< blocking call: heartbeat freezes for a second >>>>")
    start = time.perf_counter()
    await asyncio.gather(heartbeat(), bad_job())
    print(f"took {time.perf_counter() - start:.1f}s (heartbeats were delayed)")

    print("<<<< to_thread: heartbeat keeps going >>>>")
    result, _ = await asyncio.gather(asyncio.to_thread(blocking_report), heartbeat())
    print(result)


asyncio.run(main())
