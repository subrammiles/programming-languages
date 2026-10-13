"""
f-strings (formatted string literals, Python 3.6+)
 f"{expression}"         any expression inside {}
 f"{value:format_spec}"  width, alignment, precision ...
 f"{x=}"                 debug: prints "x=value"   (3.8)
 Python 3.12: you can reuse the same quotes inside {} and use backslashes and comments.
Format spec mini-language:  [fill][align][sign][width][,][.precision][type]
"""
name = "Asha"
price = 1234.5678
items = ["pen", "book"]

print(f"{name} has {len(items)} items")  # Asha has 2 items
print(f"{price:.2f}")  # 1234.57
print(f"{price:,.2f}")  # 1,234.57
print(f"{1234567:_}")  # 1_234_567
print(f"{0.256:.1%}")  # 25.6%
print(f"{42:08b} {255:x} {255:#X}")  # 00101010 ff 0XFF
print(f"{3.14159e10:.3e}")  # 3.142e+10

print("<<<< width and alignment >>>>")
print(f"[{name:<10}]")  # [Asha      ]
print(f"[{name:>10}]")  # [      Asha]
print(f"[{name:^10}]")  # [   Asha   ]
print(f"[{name:*^10}]")  # [***Asha***]
width = 8
print(f"[{price:{width}.1f}]")  # [  1234.6] -> nested format values

print("<<<< debugging with = >>>>")
x, y = 3, 4
print(f"{x=}, {y=}, {x * y=}")  # x=3, y=4, x * y=12

print("<<<< !r and !s >>>>")
print(f"{name!r}")  # 'Asha' -> repr(), shows the quotes

print("<<<< Python 3.12 improvements >>>>")
user = {"name": "Ravi"}
print(f"Hello {user["name"]}")  # Hello Ravi -> same quotes inside are allowed now
print(f"{'\n'.join(items)}")  # backslashes inside {} are allowed now

print("<<<< tables >>>>")
for item, cost in [("Tea", 20), ("Coffee", 150.5)]:
    print(f"{item:<10}|{cost:>8.2f}")
# Tea       |   20.00
# Coffee    |  150.50

print("<<<< dates >>>>")
from datetime import date
print(f"{date(2026, 10, 13):%d %B %Y}")  # 13 October 2026
