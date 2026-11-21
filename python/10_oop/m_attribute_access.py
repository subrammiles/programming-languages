"""
Customising attribute access
 __getattr__(self, name)        called only when normal lookup FAILS (missing attribute)
 __getattribute__(self, name)   called for EVERY attribute access (easy to break; rarely needed)
 __setattr__(self, name, value) called for every assignment obj.name = value
 __delattr__(self, name)        called for del obj.name
 functools.cached_property      compute once on first access, then store it on the instance

Uses: proxies and wrappers, lazy loading, read-only objects, dot access to dict data.
Inside these methods, use object.__setattr__ / super() to avoid infinite recursion.
"""
from functools import cached_property
import time


class AttrDict(dict):
    """A dict you can also read with dots: cfg.db.host"""

    def __getattr__(self, name):
        try:
            value = self[name]
        except KeyError:
            raise AttributeError(name) from None
        return AttrDict(value) if isinstance(value, dict) else value


cfg = AttrDict({"debug": True, "db": {"host": "localhost", "port": 5432}})
print(cfg.debug, cfg.db.host, cfg["db"]["port"])   # True localhost 5432
print(hasattr(cfg, "missing"))                     # False


class Proxy:
    """Forward every missing attribute to a wrapped object, and log it."""

    def __init__(self, target):
        self._target = target
        self.calls = []

    def __getattr__(self, name):                   # not called for _target or calls (they exist)
        self.calls.append(name)
        return getattr(self._target, name)


p = Proxy([3, 1, 2])
p.append(0)
p.sort()
print(p._target, p.calls)                          # [0, 1, 2, 3] ['append', 'sort']


class ReadOnlyAfterInit:
    def __init__(self, name):
        self.name = name
        object.__setattr__(self, "_frozen", True)  # bypass our own __setattr__

    def __setattr__(self, name, value):
        if getattr(self, "_frozen", False):
            raise AttributeError(f"cannot set {name!r}: object is read-only")
        super().__setattr__(name, value)


r = ReadOnlyAfterInit("ann")
try:
    r.name = "bo"
except AttributeError as e:
    print(e)                                       # cannot set 'name': object is read-only


class Report:
    def __init__(self, rows):
        self.rows = rows

    @cached_property
    def total(self):                               # runs once; the result is stored in __dict__
        print("  computing total...")
        time.sleep(0.01)
        return sum(self.rows)


rep = Report([1, 2, 3])
print(rep.total)                                   #   computing total...  then  6
print(rep.total)                                   # 6   (no recomputation)
print("total" in rep.__dict__)                     # True
del rep.total                                      # clear the cache
rep.rows.append(4)
print(rep.total)                                   #   computing total...  then  10


class Counted:
    """__getattribute__ sees every access, even of existing attributes."""

    def __init__(self):
        self.x = 1
        self.reads = 0

    def __getattribute__(self, name):
        if name != "reads":
            object.__setattr__(self, "reads", object.__getattribute__(self, "reads") + 1)
        return object.__getattribute__(self, name)


c = Counted()
c.x, c.x, c.x
print(c.reads)                                     # 3
