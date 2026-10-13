"""
Multilevel inheritance: a child of a child.  Animal -> Dog -> Puppy
"""


class Animal:
    def speak(self):
        print("Animal speaking")


class Dog(Animal):
    def bark(self):
        print("Dog barking")


class Puppy(Dog):
    def eat(self):
        print("Eating bread...")


p = Puppy()
p.bark()
p.speak()
p.eat()
print([c.__name__ for c in Puppy.__mro__])  # ['Puppy', 'Dog', 'Animal', 'object']
