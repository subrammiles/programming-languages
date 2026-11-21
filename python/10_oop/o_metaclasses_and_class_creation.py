"""
How classes are created: __new__, __init_subclass__, metaclasses

 __new__(cls, ...)     creates the instance (then __init__ initialises it).
                       Override it for immutable types (subclassing int / str / tuple),
                       caching instances, or singletons.
 __init_subclass__     a hook on the PARENT class that runs whenever a subclass is defined.
                       The simple, modern way to register plugins or validate subclasses.
 metaclass             the "class of a class". type is the default metaclass:
                       type(name, bases, namespace) builds a class.
                       Custom metaclasses can change class creation, but are rarely needed:
                       "If you wonder whether you need them, you don't." (Tim Peters)
"""


# ---- __new__ ----
class UpperStr(str):
    def __new__(cls, value):
        return super().__new__(cls, value.upper())     # str is immutable: must be set in __new__


print(UpperStr("hello"), isinstance(UpperStr("x"), str))   # HELLO True


class Color:
    _cache = {}

    def __new__(cls, name):
        if name not in cls._cache:                         # reuse instances (like the int cache)
            instance = super().__new__(cls)
            instance.name = name
            cls._cache[name] = instance
        return cls._cache[name]


print(Color("red") is Color("red"), Color("red") is Color("blue"))   # True False


class Order:
    def __new__(cls, *args, **kwargs):
        print("1. __new__ creates the object")
        return super().__new__(cls)

    def __init__(self, item):
        print("2. __init__ sets it up:", item)


Order("book")
# 1. __new__ creates the object
# 2. __init__ sets it up: book


# ---- __init_subclass__: a plugin registry ----
class Exporter:
    registry = {}

    def __init_subclass__(cls, fmt, **kwargs):
        super().__init_subclass__(**kwargs)
        if not hasattr(cls, "export"):
            raise TypeError(f"{cls.__name__} must define export()")
        Exporter.registry[fmt] = cls


class CsvExporter(Exporter, fmt="csv"):
    def export(self, rows):
        return "\n".join(",".join(map(str, r)) for r in rows)


class JsonExporter(Exporter, fmt="json"):
    def export(self, rows):
        import json
        return json.dumps(rows)


print(sorted(Exporter.registry))                           # ['csv', 'json']
print(Exporter.registry["csv"]().export([[1, 2], [3, 4]]))
# 1,2
# 3,4
try:
    class Broken(Exporter, fmt="xml"):
        pass
except TypeError as e:
    print(e)                                               # Broken must define export()


# ---- classes are objects; type builds them ----
print(type(5), type(int), type(type))                      # <class 'int'> <class 'type'> <class 'type'>

Dog = type("Dog", (), {"sound": "woof", "speak": lambda self: self.sound})
print(Dog().speak(), Dog.__name__)                         # woof Dog


# ---- a metaclass ----
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):                    # runs on Database(...)
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class Database(metaclass=SingletonMeta):
    def __init__(self, url):
        self.url = url


print(Database("sqlite://a") is Database("sqlite://b"), Database("x").url)   # True sqlite://a


class InterfaceMeta(type):
    """Reject classes whose method names are not snake_case, at definition time."""

    def __new__(mcs, name, bases, namespace):
        for attr in namespace:
            if callable(namespace[attr]) and not attr.startswith("_") and attr != attr.lower():
                raise TypeError(f"{name}.{attr}: method names must be snake_case")
        return super().__new__(mcs, name, bases, namespace)


try:
    class Service(metaclass=InterfaceMeta):
        def getData(self):
            pass
except TypeError as e:
    print(e)                                               # Service.getData: method names must be snake_case
