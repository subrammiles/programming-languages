"""
@dataclass options
 frozen=True    immutable (and hashable): can be a dict key or set item
 order=True     adds < <= > >= comparing fields in order
 slots=True     uses __slots__ (3.10): less memory
 kw_only=True   all fields must be passed by keyword (3.10)
 __post_init__  validation or computed fields after __init__
 copy.replace / dataclasses.replace  -> a modified copy (copy.replace is 3.13)
"""
import copy
from dataclasses import dataclass, field, replace


@dataclass(frozen=True, order=True, slots=True)
class Version:
    major: int
    minor: int = 0
    patch: int = 0

    def __str__(self):
        return f"{self.major}.{self.minor}.{self.patch}"


@dataclass(kw_only=True)
class Order:
    item: str
    qty: int
    unit_price: float
    total: float = field(init=False)  # computed, not passed in

    def __post_init__(self):
        if self.qty <= 0:
            raise ValueError("qty must be positive")
        self.total = self.qty * self.unit_price


versions = [Version(3, 12), Version(3, 9, 7), Version(3, 14)]
print([str(v) for v in sorted(versions)])  # ['3.9.7', '3.12.0', '3.14.0']
print(max(versions))  # Version(major=3, minor=14, patch=0)
print({Version(3, 13): "free-threading"})  # frozen -> hashable

v = Version(3, 13)
try:
    v.minor = 14
except Exception as e:
    print(type(e).__name__)  # FrozenInstanceError
print(replace(v, minor=14), copy.replace(v, patch=1))  # 3.14.0 3.13.1

print(Order(item="pen", qty=3, unit_price=10.0))  # Order(item='pen', qty=3, unit_price=10.0, total=30.0)
try:
    Order("pen", 3, 10.0)
except TypeError as e:
    print("TypeError:", e)  # keyword-only
