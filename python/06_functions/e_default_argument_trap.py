"""
The mutable default argument trap
Default values are created ONCE, when the function is defined, not on every call.
So a list or dict default is SHARED between calls.
Fix: use None as the default and create the object inside.
"""


def add_item_bad(item, basket=[]):
    basket.append(item)
    return basket


print(add_item_bad("apple"))  # ['apple']
print(add_item_bad("pear"))  # ['apple', 'pear']  <- surprise!


def add_item(item, basket=None):
    if basket is None:
        basket = []
    basket.append(item)
    return basket


print(add_item("apple"))  # ['apple']
print(add_item("pear"))  # ['pear']
