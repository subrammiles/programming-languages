"""
Abstract base classes (ABC)
An abstract class defines methods that subclasses MUST implement.
You cannot create an object of a class that still has abstract methods.
 from abc import ABC, abstractmethod
"""
from abc import ABC, abstractmethod


class Car(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def mileage(self):
        """Return kilometres per litre."""

    def describe(self):  # normal methods are allowed too
        return f"{self.name}: {self.mileage()} kmpl"


class Tesla(Car):
    def mileage(self):
        return "n/a (electric)"


class Suzuki(Car):
    def mileage(self):
        return 25


class Broken(Car):
    pass  # forgot mileage()


for car in [Tesla("Model 3"), Suzuki("Swift")]:
    print(car.describe())

try:
    Car("generic")
except TypeError as e:
    print("TypeError:", e)  # Can't instantiate abstract class Car ...

try:
    Broken("oops")
except TypeError as e:
    print("TypeError:", e)
