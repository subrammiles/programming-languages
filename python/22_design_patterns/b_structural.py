"""
Structural patterns: decorator, adapter, facade, proxy, composite

The decorator PATTERN (wrap an object to add behaviour) is related to, but not the same as,
Python's @decorator SYNTAX (wrap a function). Both are shown.
"""
import functools
import time

# ---- Decorator (function wrapping) ----
def retry(times=3, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)               # keep the name and docstring of func
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    print(f"  attempt {attempt} failed: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator


calls = {"n": 0}


@retry(times=3, exceptions=(ConnectionError,))
def flaky_fetch():
    calls["n"] += 1
    if calls["n"] < 3:
        raise ConnectionError("timeout")
    return "data"


print(flaky_fetch(), flaky_fetch.__name__)
#   attempt 1 failed: timeout
#   attempt 2 failed: timeout
# data flaky_fetch


# ---- Decorator (object wrapping): same interface, extra behaviour ----
class FileStorage:
    def save(self, key, data):
        return f"saved {key}"


class CompressedStorage:
    def __init__(self, inner):
        self.inner = inner

    def save(self, key, data):
        return self.inner.save(key, data[: len(data) // 2]) + " (compressed)"


class LoggedStorage:
    def __init__(self, inner):
        self.inner = inner

    def save(self, key, data):
        result = self.inner.save(key, data)
        print("  log:", result)
        return result


storage = LoggedStorage(CompressedStorage(FileStorage()))   # stack behaviours freely
storage.save("report", "x" * 100)                           #   log: saved report (compressed)


# ---- Adapter: make an existing class fit the interface you need ----
class LegacyPayment:
    def make_payment(self, cents, currency_code):
        return f"paid {cents / 100:.2f} {currency_code}"


class PaymentAdapter:
    """Our code expects pay(amount_in_dollars)."""

    def __init__(self, legacy):
        self.legacy = legacy

    def pay(self, amount):
        return self.legacy.make_payment(round(amount * 100), "USD")


print(PaymentAdapter(LegacyPayment()).pay(19.99))           # paid 19.99 USD


# ---- Facade: one simple entry point over a complicated subsystem ----
class Inventory:
    def reserve(self, item):
        return f"reserved {item}"


class Billing:
    def charge(self, user, amount):
        return f"charged {user} ${amount}"


class Shipping:
    def ship(self, item, user):
        return f"shipped {item} to {user}"


class OrderFacade:
    def __init__(self):
        self.inventory, self.billing, self.shipping = Inventory(), Billing(), Shipping()

    def place_order(self, user, item, amount):
        return [self.inventory.reserve(item), self.billing.charge(user, amount), self.shipping.ship(item, user)]


print(OrderFacade().place_order("ann", "lamp", 30))
# ['reserved lamp', 'charged ann $30', 'shipped lamp to ann']


# ---- Proxy: control access to an object (lazy loading, caching, permissions) ----
class SlowImage:
    def __init__(self, path):
        time.sleep(0.01)                     # pretend to load a big file
        self.path = path

    def render(self):
        return f"<img {self.path}>"


class LazyImage:
    def __init__(self, path):
        self.path, self._real = path, None

    def render(self):
        if self._real is None:               # load only when first needed
            print("  loading", self.path)
            self._real = SlowImage(self.path)
        return self._real.render()


img = LazyImage("cat.png")                   # instant: nothing loaded yet
print(img.render())                          #   loading cat.png   then   <img cat.png>
print(img.render())                          # <img cat.png>


# ---- Composite: treat a group of objects like a single object ----
class File:
    def __init__(self, name, size):
        self.name, self.size_ = name, size

    def size(self):
        return self.size_


class Folder:
    def __init__(self, name, *children):
        self.name, self.children = name, list(children)

    def size(self):
        return sum(child.size() for child in self.children)   # files and folders alike


root = Folder("root", File("a.txt", 10), Folder("src", File("main.py", 200), File("util.py", 50)))
print(root.size())                           # 260
