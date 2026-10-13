"""
Race conditions: when threads update shared data at the same time, updates can be lost.
"counter += 1" is read, add, write: another thread can run in between.
A Lock lets only one thread into a "critical section" at a time.
"""
import threading
import time

counter = 0
lock = threading.Lock()


def unsafe_increment(n):
    global counter
    for _ in range(n):
        value = counter
        time.sleep(0)  # let another thread run here, as the OS may do at any moment
        counter = value + 1  # writes back a value that may be out of date


def safe_increment(n):
    global counter
    for _ in range(n):
        with lock:  # acquire, and release even if an error happens
            value = counter
            time.sleep(0)
            counter = value + 1


def run(target):
    global counter
    counter = 0
    threads = [threading.Thread(target=target, args=(2_000,)) for _ in range(4)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    return counter


print("unsafe:", run(unsafe_increment), "(expected 8000)")  # much less: updates were lost
print("safe:  ", run(safe_increment))  # 8000
