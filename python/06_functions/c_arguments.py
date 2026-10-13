"""
Kinds of arguments
 1. positional      f(1, 2)
 2. keyword         f(x=1, y=2)   -> order does not matter
 3. default values  def f(x=40)
 4. *args           any number of positional arguments -> a tuple
 5. **kwargs        any number of keyword arguments    -> a dict
"""


def with_default(x=40):
    print(x)


with_default()  # 40
with_default(56)  # 56


def describe(name, city):
    print(f"{name} lives in {city}")


describe("Subbu", "Hyderabad")
describe(city="Pune", name="Ravi")  # keyword arguments

try:
    describe(name="Subbu")  # missing a required argument
except TypeError as e:
    print(e)  # describe() missing 1 required positional argument: 'city'


def total(*args):
    print(type(args).__name__, args)
    return sum(args)


def profile(**kwargs):
    for key, value in kwargs.items():
        print(f"  {key} = {value}")


print(total(1, 2, 3, 4, 5))  # tuple (1, 2, 3, 4, 5) then 15
profile(fruit="apple", game="cricket")


def everything(a, b=2, *args, c, **kwargs):
    # order: positional, defaults, *args, keyword-only, **kwargs
    print(a, b, args, c, kwargs)


everything(1, 2, 3, 4, c=5, d=6)  # 1 2 (3, 4) 5 {'d': 6}
