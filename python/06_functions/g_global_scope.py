"""
Scope - where a name is visible. Python looks names up in this order (LEGB):
 Local -> Enclosing function -> Global (module) -> Built-in
A variable assigned inside a function is LOCAL unless declared "global".
Reading a global needs nothing special; assigning to one needs "global".
Prefer passing values in and returning results over using global.
"""

a = 2


def read_global():
    print("inside the function a =", a)  # reading is fine


def broken():
    # Because "a" is assigned below, Python treats it as local for the WHOLE function,
    # so reading it first fails.
    print("a =", a)
    a = 3


def set_global():
    global b
    b = 40


def read_new_global():
    print("global b =", b)


read_global()
try:
    broken()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)
set_global()
read_new_global()  # global b = 40
