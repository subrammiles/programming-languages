"""
Looping over a dict: by keys (default), values(), or items()
"""
d2 = {"a": 1, "b": [1, 2, 3], "c": "123", "d": (2, True)}

for key in d2:
    print(key, end=" ")  # a b c d
print()

for value in d2.values():
    print(value)

for key, value in d2.items():
    print(key, "->", value)

# Don't add or remove keys while looping; loop over a copy instead
for key in list(d2):
    if key in ("a", "c"):
        del d2[key]
print(d2)  # {'b': [1, 2, 3], 'd': (2, True)}
