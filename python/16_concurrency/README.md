# Concurrency

| Tool | Runs on | Best for | Notes |
|---|---|---|---|
| `threading` / `ThreadPoolExecutor` | threads in one process | I/O: network, files, waiting | the GIL limits CPU work (not on free-threaded builds) |
| `ProcessPoolExecutor` / `multiprocessing` | separate processes | CPU-heavy work | data is copied between processes |
| `InterpreterPoolExecutor` (3.14) | subinterpreters in one process | CPU-heavy work | lighter than processes |
| `asyncio` (chapter 17) | one thread, an event loop | many I/O tasks at once (thousands of connections) | needs `async` libraries |

Rule of thumb: **waiting → threads or asyncio; computing → processes or subinterpreters.**
