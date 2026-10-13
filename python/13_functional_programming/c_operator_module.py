"""
operator - functions for Python's operators, handy as key functions
 itemgetter("key") / itemgetter(0)   instead of lambda x: x["key"]
 attrgetter("name")                  instead of lambda x: x.name
 methodcaller("upper")               instead of lambda x: x.upper()
 add, mul, ...                       instead of lambda a, b: a + b
"""
from functools import reduce
from operator import add, attrgetter, itemgetter, methodcaller, mul
from types import SimpleNamespace

people = [{"name": "Asha", "age": 30}, {"name": "Ravi", "age": 25}]
print([p["name"] for p in sorted(people, key=itemgetter("age"))])  # ['Ravi', 'Asha']

rows = [(2, "b"), (1, "a"), (2, "a")]
print(sorted(rows, key=itemgetter(0, 1)))  # [(1, 'a'), (2, 'a'), (2, 'b')]

objs = [SimpleNamespace(name="Zed"), SimpleNamespace(name="Amy")]
print([o.name for o in sorted(objs, key=attrgetter("name"))])  # ['Amy', 'Zed']

print(list(map(methodcaller("strip", "*"), ["*a*", "**b"])))  # ['a', 'b']
print(reduce(mul, [1, 2, 3, 4]), reduce(add, ["a", "b", "c"]))  # 24 abc
