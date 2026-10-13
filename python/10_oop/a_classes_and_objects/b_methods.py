"""
Methods are functions defined inside a class.
An instance method receives the object as its first parameter, named self by convention.
 obj.method()  is the same as  ClassName.method(obj)
"""


class Greeter:
    def say_hello(self):
        print("Hello from", type(self).__name__)

    def greet(self, name):
        print(f"Hello, {name}!")


g = Greeter()
g.say_hello()  # Hello from Greeter
g.greet("Asha")  # Hello, Asha!
Greeter.greet(g, "Ravi")  # Hello, Ravi! -> what Python does behind the scenes
