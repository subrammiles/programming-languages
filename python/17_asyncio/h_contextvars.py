"""
contextvars: per-task "global" values for async code
threading.local gives each THREAD its own value, but many asyncio tasks share one thread.
A ContextVar gives each TASK its own value: perfect for a request id, the current user,
or a database transaction, without passing them through every function.

 var = ContextVar("name", default=...)
 token = var.set(value)   set it in the current context (returns a token)
 var.get()                read it
 var.reset(token)         restore the previous value
Each asyncio task runs in a COPY of the context from when it was created.
"""
import asyncio
import contextvars

request_id = contextvars.ContextVar("request_id", default="-")


def log(message):
    # deep inside the code, no request id parameter needed
    print(f"[{request_id.get()}] {message}")


async def load_user():
    await asyncio.sleep(0.01)
    log("loaded user")


async def handle_request(rid, delay):
    request_id.set(rid)                    # only affects this task's context
    await asyncio.sleep(delay)
    await load_user()


async def main():
    log("server starting")                 # [-] server starting
    async with asyncio.TaskGroup() as tg:
        tg.create_task(handle_request("req-1", 0.03))
        tg.create_task(handle_request("req-2", 0.01))
    log("done")                            # [-] done   (the tasks' values did not leak out)
    # [req-2] loaded user
    # [req-1] loaded user

    token = request_id.set("admin")
    log("maintenance")                     # [admin] maintenance
    request_id.reset(token)
    log("back to normal")                  # [-] back to normal

    # Running a function in a copied context
    ctx = contextvars.copy_context()
    ctx.run(request_id.set, "in-copy")
    print(ctx[request_id], request_id.get())   # in-copy -


asyncio.run(main())
