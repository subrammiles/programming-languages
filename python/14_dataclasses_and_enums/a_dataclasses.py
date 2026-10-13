"""
@dataclass (Python 3.7) writes __init__, __repr__ and __eq__ for you,
based on the annotated class attributes.
"""
from dataclasses import asdict, dataclass, field


@dataclass
class Product:
    name: str
    price: float
    quantity: int = 0  # default value
    tags: list[str] = field(default_factory=list)  # mutable default: use default_factory

    def total(self) -> float:
        return self.price * self.quantity


p = Product("pen", 10.0, 5)
print(p)  # Product(name='pen', price=10.0, quantity=5, tags=[])
print(p.total())  # 50.0
print(p == Product("pen", 10.0, 5))  # True -> compares fields
print(asdict(p))  # {'name': 'pen', 'price': 10.0, 'quantity': 5, 'tags': []}

p.tags.append("office")
print(Product("book", 99.0).tags)  # [] -> each object gets its own list


# The same class written by hand:
class ProductByHand:
    def __init__(self, name, price, quantity=0, tags=None):
        self.name = name
        self.price = price
        self.quantity = quantity
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"ProductByHand(name={self.name!r}, price={self.price!r}, quantity={self.quantity!r}, tags={self.tags!r})"

    def __eq__(self, other):
        return (self.name, self.price, self.quantity, self.tags) == (other.name, other.price, other.quantity, other.tags)
