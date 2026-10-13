"""
In python, a derived class can inherit base class by
 just mentioning the base in the bracket after the derived class name. 
 Consider the following syntax to inherit a base class into the derived class.

 class <DerivedClassName>(<BaseClassName>):
    ////Body
"""
# A class can inherit multiple classes by mentioning all of them inside the bracket. Consider the following syntax.

class Animal:
    def speak(self):
        print("I am an Animal speaking")

class Dog(Animal):
    def bark(self):
        print("I am a Dog barking")

dog=Dog(); 
dog.speak();
dog.bark();      