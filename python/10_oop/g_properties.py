"""
@property - use methods as if they were attributes.
 - add validation without changing how callers use the attribute
 - computed (read-only) attributes
"""


class Circle:
    def __init__(self, radius):
        self.radius = radius  # goes through the setter below

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("radius cannot be negative")
        self._radius = value

    @property
    def area(self):  # computed, read-only
        return round(3.14159 * self._radius ** 2, 2)


c = Circle(2)
print(c.radius, c.area)  # 2 12.57
c.radius = 3
print(c.area)  # 28.27

try:
    c.radius = -1
except ValueError as e:
    print("ValueError:", e)

try:
    c.area = 100
except AttributeError as e:
    print("AttributeError:", e)  # property 'area' of 'Circle' object has no setter
