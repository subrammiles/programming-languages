"""
Threads run code concurrently inside one process and share its memory.
Good for I/O-bound work (network, disk, waiting). In standard CPython the GIL lets only
one thread run Python code at a time, so threads don't speed up CPU-heavy work
(see e_gil_and_free_threading.py).
 t = threading.Thread(target=func, args=(...,))
 t.start()   begin running
 t.join()    wait for it to finish
"""
import logging
import threading
import time


def thread_function(name):
    logging.info("Thread %s: starting", name)
    time.sleep(1)
    logging.info("Thread %s: finishing", name)


if __name__ == "__main__":
    logging.basicConfig(format="%(asctime)s: %(message)s", level=logging.INFO, datefmt="%H:%M:%S")

    logging.info("Main    : before creating thread")
    x = threading.Thread(target=thread_function, args=(1,))
    logging.info("Main    : before running thread")
    x.start()
    logging.info("Main    : wait for the thread to finish")
    x.join()  # without join, "all done" would print before the thread finishes
    logging.info("Main    : all done")

    print("<<<< several threads: total time ~1s, not 3s >>>>")
    start = time.perf_counter()
    threads = [threading.Thread(target=time.sleep, args=(1,)) for _ in range(3)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    print(f"3 sleeping threads took {time.perf_counter() - start:.1f}s")
