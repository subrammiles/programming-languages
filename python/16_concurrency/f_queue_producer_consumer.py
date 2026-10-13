"""
queue.Queue - a thread-safe queue for passing work between threads.
Producer/consumer: some threads put jobs in, worker threads take them out.
 put(), get(), task_done(), join()
"""
import queue
import random
import threading
import time

jobs: queue.Queue[int | None] = queue.Queue()
results = []
results_lock = threading.Lock()


def worker(name):
    while True:
        job = jobs.get()
        if job is None:  # a "poison pill" tells the worker to stop
            jobs.task_done()
            break
        time.sleep(random.uniform(0.01, 0.05))
        with results_lock:
            results.append((name, job, job * job))
        jobs.task_done()


workers = [threading.Thread(target=worker, args=(f"w{i}",)) for i in range(3)]
for w in workers:
    w.start()

for n in range(10):  # producer
    jobs.put(n)
for _ in workers:
    jobs.put(None)

jobs.join()  # wait until every job is marked done
print(len(results), "jobs done")  # 10 jobs done
print(sorted(r[2] for r in results))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(sorted({r[0] for r in results}))  # the workers that took part
