"""
__init__ runs automatically when an object is created.
It sets up the object's starting state (its instance variables).
Strictly, __init__ is the "initialiser"; __new__ creates the object, but you rarely need it.
"""


class Person:
    def __init__(self, name, age):
        self.name = name  # store the arguments on the object
        self.age = age

    def show(self):
        print(f"{self.name} ({self.age})")


p = Person("Subbu", 30)
p.show()  # Subbu (30)
print(p.name)  # Subbu
