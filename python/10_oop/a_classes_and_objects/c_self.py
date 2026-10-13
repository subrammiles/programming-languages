"""
self refers to the CURRENT object.
It must be the first parameter of every instance method.
"self" is only a convention (any name works), but always use self.
A method defined WITHOUT self cannot be called on an object.
"""


class TestMe:
    def print_me1(self):
        print("I am M1, called on", self)

    def print_me2():  # missing self
        print("I am M2")


test_me = TestMe()
test_me.print_me1()

try:
    test_me.print_me2()  # Python passes the object in, but print_me2 accepts nothing
except TypeError as e:
    print("TypeError:", e)

TestMe.print_me2()  # works when called on the class, but this is a mistake waiting to happen;
                    # use @staticmethod for methods that don't need self (see f_class_and_static_methods.py)
