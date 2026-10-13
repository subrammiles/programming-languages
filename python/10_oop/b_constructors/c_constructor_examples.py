"""
More constructor details
 - a class can have only ONE __init__ (a second definition replaces the first)
 - use default arguments or @classmethod "alternative constructors" instead
 - __init__ must return None
"""


class Temperature:
    def __init__(self, celsius=0.0):
        self.celsius = celsius

    @classmethod
    def from_fahrenheit(cls, f):  # an alternative constructor
        return cls((f - 32) * 5 / 9)

    def __repr__(self):
        return f"Temperature({self.celsius:.1f}C)"


print(Temperature(25))  # Temperature(25.0C)
print(Temperature.from_fahrenheit(98.6))  # Temperature(37.0C)


class Overwritten:
    def __init__(self):
        print("first __init__")

    def __init__(self, x):  # replaces the one above
        print("second __init__ with", x)


Overwritten(1)
try:
    Overwritten()
except TypeError as e:
    print("TypeError:", e)
