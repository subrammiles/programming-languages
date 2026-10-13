"""
 decimal.Decimal  - exact decimal arithmetic: use for MONEY
 fractions.Fraction - exact rational numbers
Create Decimals from STRINGS: Decimal(0.1) inherits the float's error.
"""
from decimal import ROUND_HALF_UP, Decimal, getcontext
from fractions import Fraction

print(0.1 + 0.2)  # 0.30000000000000004
print(Decimal("0.1") + Decimal("0.2"))  # 0.3
print(Decimal(0.1))  # 0.1000000000000000055511151231257827021181583404541015625

price = Decimal("19.995")
print(price.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))  # 20.00
print(sum([Decimal("0.10")] * 3))  # 0.30

getcontext().prec = 6
print(Decimal(1) / Decimal(7))  # 0.142857

print(Fraction(1, 3) + Fraction(1, 6))  # 1/2
print(Fraction("0.75"), float(Fraction(3, 8)))  # 3/4 0.375
