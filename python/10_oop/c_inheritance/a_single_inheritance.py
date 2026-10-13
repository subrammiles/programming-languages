"""
Inheritance: a child class gets all the methods of its parent and can add its own.
 class Child(Parent):
Every class ultimately inherits from object.
"""


class Animal:
    def speak(self):
        print("I am an Animal speaking")


class Dog(Animal):
    def bark(self):
        print("I am a Dog barking")


dog = Dog()
dog.speak()  # inherited
dog.bark()  # its own
print(isinstance(dog, Animal), issubclass(Dog, Animal))  # True True
print(Dog.__bases__)  # (<class '__main__.Animal'>,)
