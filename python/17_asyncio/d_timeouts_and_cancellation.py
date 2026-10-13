"""
Timeouts and cancellation
 async with asyncio.timeout(seconds):   (3.11)  cancel the block if it takes too long
 asyncio.wait_for(coro, timeout)         older equivalent
 task.cancel()                           request cancellation; the task sees CancelledError
"""
import asyncio


async def slow_api():
    await asyncio.sleep(5)
    return "data"


async def ticker():
    try:
        while True:
            print("tick")
            await asyncio.sleep(0.2)
    except asyncio.CancelledError:
        print("ticker cleaning up")
        raise


async def main():
    try:
        async with asyncio.timeout(0.5):
            await slow_api()
    except TimeoutError:
        print("slow_api timed out")

    try:
        await asyncio.wait_for(slow_api(), timeout=0.3)
    except TimeoutError:
        print("wait_for timed out too")

    task = asyncio.create_task(ticker())
    await asyncio.sleep(0.5)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("ticker was cancelled")


asyncio.run(main())
