"""
bool has two values: True and False (capitalised).
Every value can be tested as true or false ("truthiness").
FALSY values: False, None, 0, 0.0, "", [], (), {}, set(), range(0)
Everything else is TRUTHY.
"""

values = [0, 1, -1, "", "0", " ", [], [0], {}, None, 0.0]
for v in values:
    print(f"{v!r:6} -> {bool(v)}")
# 0 -> False, 1 -> True, -1 -> True, '' -> False, '0' -> True (non-empty string!) ...

print("<<<< used in if statements >>>>")
name = ""
if not name:
    print("name is empty")

cart = ["pen"]
if cart:
    print(f"{len(cart)} item(s) in cart")

print("<<<< bool is a kind of int >>>>")
print(True + True)  # 2
print(sum([True, False, True]))  # 2 -> handy for counting matches
