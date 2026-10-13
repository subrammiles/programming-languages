"""
Operator overloading: define what + - * / == etc. mean for your class.
 __add__ +   __sub__ -   __mul__ *   __truediv__ /   __neg__ -x   __abs__ abs()
 __radd__ etc. are used when your object is on the RIGHT side (e.g. 3 * v)
Return NotImplemented for types you don't support.
"""


class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    __rmul__ = __mul__  # so 3 * v works as well as v * 3

    def __neg__(self):
        return Vector(-self.x, -self.y)

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __eq__(self, other):
        return isinstance(other, Vector) and (self.x, self.y) == (other.x, other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"


v1, v2 = Vector(1, 2), Vector(3, 4)
print(v1 + v2)  # Vector(4, 6)
print(v1 * 3, 3 * v1)  # Vector(3, 6) Vector(3, 6)
print(-v1, abs(v2))  # Vector(-1, -2) 5.0
print(v1 + v2 == Vector(4, 6))  # True
try:
    v1 + 5
except TypeError as e:
    print("TypeError:", e)
