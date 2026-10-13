"""
 async for   -> loop over an async iterator / async generator (values arrive over time)
 async with  -> async context manager (__aenter__ / __aexit__), e.g. database connections
"""
import asyncio
from contextlib import asynccontextmanager


async def stock_prices(symbol, count):
    price = 100.0
    for i in range(count):
        await asyncio.sleep(0.1)  # waiting for the next price
        price += (-1) ** i * 1.5
        yield symbol, round(price, 2)


@asynccontextmanager
async def database():
    print("connecting...")
    await asyncio.sleep(0.1)
    try:
        yield {"rows": 42}
    finally:
        print("disconnected")


async def main():
    async for symbol, price in stock_prices("TCS", 4):
        print(symbol, price)

    async with database() as db:
        print("rows:", db["rows"])

    squares = [n * n async for _, n in aenumerate(stock_prices("X", 3))]  # async comprehension
    print(len(squares))


async def aenumerate(aiterable):
    i = 0
    async for item in aiterable:
        yield i, item[1]
        i += 1


asyncio.run(main())
