"""
Thread synchronisation tools (threading module)
 Lock / RLock   mutual exclusion                     (see b_locks_and_race_conditions.py)
 Event          one thread signals, others wait       ("start now", "stop now")
 Condition      wait until some shared state changes (wait / notify)
 Semaphore      at most N threads in a section       (connection limits)
 Barrier        N threads wait for each other, then all continue
 threading.local  each thread gets its own copy of a variable
 Timer          run a function after a delay, in a new thread
"""
import threading
import time
from concurrent.futures import ThreadPoolExecutor

# ---- Event ----
start = threading.Event()
stop = threading.Event()
ticks = []


def worker():
    start.wait()                          # block until the event is set
    while not stop.is_set():
        ticks.append(1)
        stop.wait(0.01)                   # sleep, but wake up immediately if stop is set


t = threading.Thread(target=worker)
t.start()
time.sleep(0.02)
print("ticks before start:", len(ticks))  # ticks before start: 0
start.set()
time.sleep(0.05)
stop.set()
t.join()
print("worker ticked:", len(ticks) > 0)   # worker ticked: True


# ---- Condition: a bounded buffer ----
buffer, capacity = [], 2
cond = threading.Condition()
consumed = []


def producer():
    for item in range(5):
        with cond:
            cond.wait_for(lambda: len(buffer) < capacity)   # wait while full
            buffer.append(item)
            cond.notify_all()


def consumer():
    for _ in range(5):
        with cond:
            cond.wait_for(lambda: buffer)                   # wait while empty
            consumed.append(buffer.pop(0))
            cond.notify_all()


threads = [threading.Thread(target=producer), threading.Thread(target=consumer)]
for th in threads:
    th.start()
for th in threads:
    th.join()
print(consumed)                           # [0, 1, 2, 3, 4]


# ---- Semaphore ----
sem = threading.Semaphore(2)              # like 2 database connections
lock = threading.Lock()
active = peak = 0


def use_connection(_):
    global active, peak
    with sem:
        with lock:
            active += 1
            peak = max(peak, active)
        time.sleep(0.02)
        with lock:
            active -= 1


with ThreadPoolExecutor(max_workers=6) as pool:
    list(pool.map(use_connection, range(6)))
print("most at once:", peak)              # most at once: 2


# ---- Barrier ----
barrier = threading.Barrier(3, action=lambda: print("--- all 3 ready, go! ---"))
order = []


def runner(name, delay):
    time.sleep(delay)
    order.append(f"{name} ready")
    barrier.wait()                        # nobody continues until all 3 arrive
    order.append(f"{name} running")


threads = [threading.Thread(target=runner, args=(n, d)) for n, d in [("A", 0.01), ("B", 0.03), ("C", 0.02)]]
for th in threads:
    th.start()
for th in threads:
    th.join()
print(order[:3], all("running" in s for s in order[3:]))
# --- all 3 ready, go! ---
# ['A ready', 'C ready', 'B ready'] True


# ---- threading.local ----
context = threading.local()               # e.g. the current request or DB connection per thread
results = {}


def handle(user):
    context.user = user                   # each thread sees only its own value
    time.sleep(0.01)
    results[user] = context.user


threads = [threading.Thread(target=handle, args=(u,)) for u in ("ann", "bo", "cy")]
for th in threads:
    th.start()
for th in threads:
    th.join()
print(results)                            # {'ann': 'ann', 'bo': 'bo', 'cy': 'cy'}   (key order may vary)


# ---- Timer ----
fired = threading.Event()
threading.Timer(0.02, fired.set).start()
print("timer fired:", fired.wait(timeout=1))   # timer fired: True
