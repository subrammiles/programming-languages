"""
 obj.__dict__        the object's attributes, as a dict
 getattr / setattr / hasattr / delattr   access attributes by name (strings)
 __slots__           fix the allowed attributes: less memory, faster, no typos
"""
import sys


class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y


class SlottedPoint:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y


p = Point(1, 2)
print(p.__dict__)  # {'x': 1, 'y': 2}
print(getattr(p, "x"), hasattr(p, "z"), getattr(p, "z", "default"))  # 1 False default
setattr(p, "z", 3)
print(p.z)  # 3

s = SlottedPoint(1, 2)
try:
    s.z = 3  # typo protection
except AttributeError as e:
    print("AttributeError:", e)

print(sys.getsizeof(p) + sys.getsizeof(p.__dict__) > sys.getsizeof(s))  # True -> slots use less memory
