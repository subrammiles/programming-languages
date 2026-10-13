"""
The GIL (Global Interpreter Lock) and free-threaded Python
 - Standard CPython has a GIL: only one thread executes Python bytecode at a time.
   Threads still help with I/O (the GIL is released while waiting), but not with CPU work.
 - Python 3.13 added an optional FREE-THREADED build (python3.13t) without the GIL.
   Python 3.14 made it officially supported. There, threads run CPU work in parallel.
Check what you're running:
"""
import sys
import sysconfig
import threading
import time

free_threaded_build = bool(sysconfig.get_config_var("Py_GIL_DISABLED"))
gil_enabled = sys._is_gil_enabled() if hasattr(sys, "_is_gil_enabled") else True
print(f"Python {sys.version.split()[0]}, free-threaded build: {free_threaded_build}, GIL enabled: {gil_enabled}")


def burn_cpu(n=3_000_000):
    total = 0
    for i in range(n):
        total += i * i
    return total


start = time.perf_counter()
for _ in range(4):
    burn_cpu()
sequential = time.perf_counter() - start

start = time.perf_counter()
threads = [threading.Thread(target=burn_cpu) for _ in range(4)]
for t in threads:
    t.start()
for t in threads:
    t.join()
threaded = time.perf_counter() - start

print(f"sequential {sequential:.2f}s, 4 threads {threaded:.2f}s")
print("With the GIL the times are similar; on a free-threaded build the threaded run is much faster.")
