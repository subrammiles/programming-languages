"""
Overriding: a child defines a method with the same name as the parent's.
The child's version is used for child objects.
"""


class Animal:
    def speak(self):
        return "..."


class Dog(Animal):
    def speak(self):
        return "Woof"


class Cat(Animal):
    def speak(self):
        return "Meow"


for animal in [Animal(), Dog(), Cat()]:
    print(type(animal).__name__, "says", animal.speak())
