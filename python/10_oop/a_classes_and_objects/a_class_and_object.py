"""
A class is a blueprint; an object (instance) is a thing built from it.
 class ClassName:
     ...
 obj = ClassName()      <- the () creates an object
Class names use CapWords (PEP 8).
"""


class MyClass1:
    pass


obj = MyClass1()  # an object
not_an_object = MyClass1  # without () this is just another name for the CLASS itself

print(obj)  # <__main__.MyClass1 object at 0x...>
print(not_an_object)  # <class '__main__.MyClass1'>
print(type(obj) is MyClass1)  # True
print(isinstance(obj, MyClass1))  # True

# Objects can get attributes at any time (but normally you set them in __init__)
obj.colour = "red"
print(obj.colour)  # red
