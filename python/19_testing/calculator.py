"""
The code under test.
"""


def add(a, b):
    return a + b


def divide(a, b):
    if b == 0:
        raise ValueError("cannot divide by zero")
    return a / b


def is_palindrome(text):
    """Return True if text reads the same backwards (ignoring case and spaces).

    >>> is_palindrome("Never odd or even")
    True
    >>> is_palindrome("python")
    False
    """
    cleaned = "".join(text.lower().split())
    return cleaned == cleaned[::-1]


class ShoppingCart:
    def __init__(self):
        self.items = {}

    def add(self, name, price, qty=1):
        if price < 0:
            raise ValueError("price cannot be negative")
        self.items[name] = (price, self.items.get(name, (price, 0))[1] + qty)

    def total(self):
        return sum(price * qty for price, qty in self.items.values())
