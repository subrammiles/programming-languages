"""
__eq__ and __hash__: equality, and using objects as dict keys / set members

 - By default, == compares IDENTITY (same object), and hash() is based on id().
 - Define __eq__ to compare by value. Python then sets __hash__ = None,
   making the class UNHASHABLE (cannot go in a set or be a dict key) until you define __hash__.
 - The rule: if a == b then hash(a) == hash(b). Hash the same fields you compare.
 - Only hash IMMUTABLE data: if a key's hash changes after it is stored, the dict loses it.
@dataclass(frozen=True) writes correct __eq__ and __hash__ for you (see chapter 14).
"""
from dataclasses import dataclass


class Plain:
    def __init__(self, x):
        self.x = x


class EqOnly:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return isinstance(other, EqOnly) and self.x == other.x


class Point:
    __slots__ = ("_x", "_y")

    def __init__(self, x, y):
        self._x, self._y = x, y            # "private" + no setters = effectively immutable

    @property
    def x(self):
        return self._x

    @property
    def y(self):
        return self._y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented          # let Python try other.__eq__ / fall back to identity
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))      # hash a tuple of the same fields used in __eq__

    def __repr__(self):
        return f"Point({self.x}, {self.y})"


print(Plain(1) == Plain(1))                        # False  (identity)
print(EqOnly(1) == EqOnly(1))                      # True
try:
    {EqOnly(1)}
except TypeError as e:
    print("TypeError:", e)
    # TypeError: cannot use 'EqOnly' as a set element (unhashable type: 'EqOnly')   (3.15 wording;
    # older versions say just: unhashable type: 'EqOnly')

a, b = Point(1, 2), Point(1, 2)
print(a == b, a is b, hash(a) == hash(b))          # True False True
print(len({a, b}), {a: "found"}[b])                # 1 found
print(a == (1, 2))                                 # False  (NotImplemented -> falls back to identity)


# A mutable key goes missing after it changes
class MutableKey:
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        return self.name == other.name

    def __hash__(self):
        return hash(self.name)


key = MutableKey("ann")
ages = {key: 30}
key.name = "bo"
print(ages.get(key), len(ages))                    # None 1   (stored under the old hash)


# The easy way
@dataclass(frozen=True)
class Card:
    rank: str
    suit: str


print(Card("A", "spades") == Card("A", "spades"), len({Card("A", "spades"), Card("A", "spades")}))   # True 1

# Built-in types: immutable ones are hashable, mutable ones are not
print(hash((1, 2)) == hash((1, 2)), hash("hi") == hash("hi"))   # True True
for value in ([1], {1: 2}, {1}):
    try:
        hash(value)
    except TypeError as e:
        print(e)
# unhashable type: 'list'
# unhashable type: 'dict'
# unhashable type: 'set'
print(hash(frozenset({1, 2})) == hash(frozenset({2, 1})))       # True
try:
    hash((1, [2]))                                 # a tuple is only hashable if its items are
except TypeError as e:
    print(e)                                       # unhashable type: 'list'
