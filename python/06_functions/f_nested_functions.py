"""
A function can be defined inside another function.
The inner function is only visible inside the outer one,
and it can read the outer function's variables.
"""


def func1():
    print("I am func 1")

    def func_inner():
        print("I am the inner function")

    func_inner()


func1()


def make_greeting(name):
    def decorate(text):
        return f"*** {text} ***"

    return decorate(f"Hello {name}")


print(make_greeting("Asha"))  # *** Hello Asha ***
