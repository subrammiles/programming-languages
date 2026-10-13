from .pricing import with_tax  # relative import: "from the same package"


class Cart:
    def __init__(self):
        self.items = {}

    def add(self, name, price, qty=1):
        self.items[name] = (price, qty)

    def total(self):
        subtotal = sum(price * qty for price, qty in self.items.values())
        return with_tax(subtotal)
