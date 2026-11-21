"""
Creational patterns, the Python way: singleton, factory, builder, registry

Python's features make many classic (Java-style) patterns smaller:
 - modules are singletons already
 - functions and classes are first-class objects, so a factory can be a dict of classes
 - keyword arguments with defaults replace most builders
"""
from dataclasses import dataclass, field, replace
from functools import cache

# ---- Singleton ----
# 1. The Pythonic singleton: a module. `import config` always gives the same module object.
#    Put shared state in config.py and import it wherever you need it.

# 2. A cached factory function: simple, lazy, testable
@cache
def get_settings():
    print("  loading settings once")
    return {"env": "prod", "debug": False}


print(get_settings() is get_settings())        #   loading settings once   then   True


# 3. __new__ (see 10_oop/o_metaclasses_and_class_creation.py for the metaclass version)
class Logger:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.lines = []
        return cls._instance


Logger().lines.append("started")
print(Logger().lines, Logger() is Logger())    # ['started'] True
# Singletons are global state in disguise: they make tests harder. Prefer passing objects in.


# ---- Factory ----
class Email:
    def send(self, to, msg):
        return f"email to {to}: {msg}"


class Sms:
    def send(self, to, msg):
        return f"sms to {to}: {msg[:20]}"


NOTIFIERS = {"email": Email, "sms": Sms}       # classes are objects: store them in a dict


def make_notifier(kind):
    try:
        return NOTIFIERS[kind]()
    except KeyError:
        raise ValueError(f"unknown notifier {kind!r}") from None


for kind in ("email", "sms", "pigeon"):
    try:
        print(make_notifier(kind).send("ann", "Your order has shipped"))
    except ValueError as e:
        print(e)
# email to ann: Your order has shipped
# sms to ann: Your order has shipped
# unknown notifier 'pigeon'


# Alternative constructors with @classmethod (a factory method on the class itself)
@dataclass
class Color:
    r: int
    g: int
    b: int

    @classmethod
    def from_hex(cls, code):
        code = code.lstrip("#")
        return cls(*(int(code[i:i + 2], 16) for i in (0, 2, 4)))


print(Color.from_hex("#ff8000"))               # Color(r=255, g=128, b=0)


# ---- Builder ----
# Often unnecessary in Python: keyword arguments + defaults do the job.
@dataclass(frozen=True)
class Request:
    url: str
    method: str = "GET"
    headers: dict = field(default_factory=dict)
    timeout: float = 10.0


r = Request("https://api.example.com", timeout=3)
print(r)                                       # Request(url='https://api.example.com', method='GET', headers={}, timeout=3)
print(replace(r, method="POST").method)        # POST   (copy with changes: a "wither")


# When a fluent, step-by-step API really helps (e.g. building queries), return self:
class Query:
    def __init__(self, table):
        self._table, self._wheres, self._order, self._limit = table, [], None, None

    def where(self, cond):
        self._wheres.append(cond)
        return self

    def order_by(self, col):
        self._order = col
        return self

    def limit(self, n):
        self._limit = n
        return self

    def build(self):
        sql = f"SELECT * FROM {self._table}"
        if self._wheres:
            sql += " WHERE " + " AND ".join(self._wheres)
        if self._order:
            sql += f" ORDER BY {self._order}"
        if self._limit:
            sql += f" LIMIT {self._limit}"
        return sql


print(Query("users").where("age > 18").where("active").order_by("name").limit(10).build())
# SELECT * FROM users WHERE age > 18 AND active ORDER BY name LIMIT 10


# ---- Registry with a decorator ----
HANDLERS = {}


def handles(event):
    def register(func):
        HANDLERS[event] = func
        return func
    return register


@handles("signup")
def welcome(user):
    return f"welcome {user}"


@handles("purchase")
def receipt(user):
    return f"receipt for {user}"


print(HANDLERS["signup"]("ann"), "|", HANDLERS["purchase"]("bo"))   # welcome ann | receipt for bo
