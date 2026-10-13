"""
TaskGroup (Python 3.11) - "structured concurrency"
 async with asyncio.TaskGroup() as tg:
     tg.create_task(...)
 - the block waits for ALL tasks to finish
 - if one task fails, the others are CANCELLED and the errors come out as an ExceptionGroup
Safer than gather(): no task is left running in the background by accident.
"""
import asyncio


async def job(name, seconds, fail=False):
    try:
        await asyncio.sleep(seconds)
        if fail:
            raise ValueError(f"{name} failed")
        print(f"{name} done")
        return name
    except asyncio.CancelledError:
        print(f"{name} cancelled")
        raise


async def main():
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(job("a", 0.1))
        t2 = tg.create_task(job("b", 0.2))
    print("results:", t1.result(), t2.result())

    print("<<<< one task fails >>>>")
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(job("fast-fail", 0.1, fail=True))
            tg.create_task(job("slow", 1.0))
    except* ValueError as group:
        print("caught:", [str(e) for e in group.exceptions])


asyncio.run(main())
# a done, b done, results: a b
# slow cancelled
# caught: ['fast-fail failed']
