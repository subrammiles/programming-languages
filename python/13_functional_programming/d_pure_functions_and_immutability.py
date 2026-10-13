"""
Functional style in Python
 - pure functions: output depends only on input, no side effects -> easy to test
 - prefer returning new data over changing data in place
 - Python is not a purely functional language; mix styles where it reads best
"""


def add_tax_impure(prices):
    for i in range(len(prices)):  # changes the caller's list!
        prices[i] *= 1.18
    return prices


def add_tax(prices):
    return [round(p * 1.18, 2) for p in prices]  # new list, original untouched


original = [100, 200]
print(add_tax(original), original)  # [118.0, 236.0] [100, 200]

result = add_tax_impure(original)
print(original)  # [118.0, 236.0] -> surprise side effect

# Immutable data structures: tuple, frozenset, str, and frozen dataclasses (chapter 14)
config = (("debug", False), ("port", 8000))
print(dict(config)["port"])  # 8000
