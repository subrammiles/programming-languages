"""
Dictionaries: key -> value pairs.  {"name": "Asha", "age": 30}
 - keys must be hashable (str, int, tuple ...) and unique
 - since Python 3.7 dicts keep insertion order
"""
d1 = {"a": 1, "b": 2}
print(d1)

d2 = {"a": 1, "b": [1, 2, 3], "c": "123", "d": (2, True)}
print(d2["b"])  # [1, 2, 3]
print(len(d2))  # 4

d2["e"] = "new"  # add
d2["a"] = 100  # update
print(d2)

try:
    d2["missing"]
except KeyError as e:
    print("KeyError:", e)

print(d2.get("missing"))  # None -> no error
print(d2.get("missing", "default"))  # default

print(dict(name="Asha", age=30))  # {'name': 'Asha', 'age': 30}
print(dict(zip(["x", "y"], [1, 2])))  # {'x': 1, 'y': 2}
