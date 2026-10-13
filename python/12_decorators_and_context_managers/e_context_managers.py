"""
Context managers and the with statement
 with resource as r:
     ...
guarantees clean-up (closing files, releasing locks, rolling back transactions)
even if an exception happens.
A class becomes a context manager by defining __enter__ and __exit__.
"""
import time


class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self  # this is what "as" receives

    def __exit__(self, exc_type, exc_value, traceback):
        self.elapsed = time.perf_counter() - self.start
        print(f"block took {self.elapsed * 1000:.0f} ms")
        return False  # False -> don't swallow exceptions


class Transaction:
    def __init__(self, db):
        self.db = db

    def __enter__(self):
        self.snapshot = dict(self.db)
        return self.db

    def __exit__(self, exc_type, exc, tb):
        if exc_type is not None:
            self.db.clear()
            self.db.update(self.snapshot)  # roll back
            print(f"rolled back because of {exc_type.__name__}")
        return True  # True -> exception handled, don't re-raise


with Timer() as t:
    time.sleep(0.05)
print(t.elapsed > 0.04)  # True

accounts = {"asha": 100, "ravi": 50}
with Transaction(accounts) as db:
    db["asha"] -= 70
    db["ravi"] += 70
print(accounts)  # {'asha': 30, 'ravi': 120}

with Transaction(accounts) as db:
    db["asha"] -= 500
    raise ValueError("insufficient funds")
print(accounts)  # {'asha': 30, 'ravi': 120} -> unchanged

with open(__file__) as f1, open(__file__) as f2:  # several at once
    print(f1.readline() == f2.readline())  # True
