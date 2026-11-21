"""
Descriptors: the machinery behind property, methods, classmethod, staticmethod and __slots__.

A descriptor is an object stored as a CLASS attribute that defines any of:
 __get__(self, obj, objtype)   called on   instance.attr
 __set__(self, obj, value)     called on   instance.attr = value
 __delete__(self, obj)         called on   del instance.attr
 __set_name__(self, owner, name)  called once when the class is created: tells it its name

Data descriptors (with __set__) win over the instance __dict__; non-data ones do not.
Use them to reuse validation logic across many attributes and classes (ORMs like Django
and SQLAlchemy build model fields this way).
"""


class Positive:
    """A reusable validated attribute."""

    def __set_name__(self, owner, name):
        self.private_name = "_" + name            # where the value is really stored
        self.public_name = name

    def __get__(self, obj, objtype=None):
        if obj is None:                            # accessed on the class: return the descriptor
            return self
        return getattr(obj, self.private_name)

    def __set__(self, obj, value):
        if not isinstance(value, (int, float)) or value <= 0:
            raise ValueError(f"{self.public_name} must be a positive number, got {value!r}")
        setattr(obj, self.private_name, value)


class Product:
    price = Positive()                             # one line per validated field
    quantity = Positive()

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price                         # goes through Positive.__set__
        self.quantity = quantity

    @property
    def total(self):
        return self.price * self.quantity


p = Product("pen", 1.5, 10)
print(p.total, p.__dict__)                         # 15.0 {'name': 'pen', '_price': 1.5, '_quantity': 10}
for bad in (0, -3, "ten"):
    try:
        p.quantity = bad
    except ValueError as e:
        print(e)
# quantity must be a positive number, got 0
# quantity must be a positive number, got -3
# quantity must be a positive number, got 'ten'
print(type(Product.__dict__["price"]).__name__)    # Positive


# property is a descriptor: these two are equivalent
class Temperature:
    def __init__(self, c):
        self._c = c

    def _get_f(self):
        return self._c * 9 / 5 + 32

    fahrenheit = property(_get_f)                  # same as @property on a method


print(Temperature(100).fahrenheit)                 # 212.0
print(hasattr(property, "__get__"), hasattr(property, "__set__"))   # True True


# Functions are non-data descriptors: that is how obj.method becomes a "bound method"
class Greeter:
    def hello(self):
        return "hi"


g = Greeter()
print(Greeter.__dict__["hello"].__get__(g, Greeter)())   # hi   (what g.hello() does under the hood)
print(type(g.hello).__name__, g.hello.__self__ is g)      # method True


# A lazy, non-data descriptor: computes once, then the instance __dict__ shadows it
class lazy:
    def __init__(self, func):
        self.func = func

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        value = self.func(obj)
        obj.__dict__[self.name] = value            # next access finds it in __dict__ first
        return value


class Page:
    calls = 0

    @lazy
    def content(self):
        Page.calls += 1
        return "<html>...</html>"


page = Page()
page.content, page.content
print(Page.calls)                                  # 1   (this is how functools.cached_property works)
