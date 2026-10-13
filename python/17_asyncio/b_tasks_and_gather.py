"""
Tasks schedule coroutines to run in the background.
 asyncio.create_task(coro)   start now, await the result later
 asyncio.gather(*coros, return_exceptions=True)  run together, collect results
 asyncio.as_completed(...)   handle results as they finish
"""
import asyncio
import random


async def fetch(user_id):
    await asyncio.sleep(random.uniform(0.1, 0.5))
    if user_id == 3:
        raise ConnectionError(f"user {user_id} failed")
    return {"id": user_id, "name": f"user{user_id}"}


async def main():
    task = asyncio.create_task(fetch(1))  # starts running right away
    print("doing other work while the task runs...")
    print(await task)

    results = await asyncio.gather(*(fetch(i) for i in range(1, 5)), return_exceptions=True)
    for r in results:
        print("  error:" if isinstance(r, Exception) else "  ok:", r)

    print("<<<< as_completed >>>>")
    for coro in asyncio.as_completed([fetch(i) for i in (1, 2, 4)]):
        print("  finished:", (await coro)["name"])


random.seed(1)
asyncio.run(main())
