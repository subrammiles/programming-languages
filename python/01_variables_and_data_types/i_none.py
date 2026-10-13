"""
None means "no value" (like null or nil in other languages).
There is exactly one None object, so test for it with "is", not "==".
"""


def none_keyword_test():
    print("<<<< None keyword >>>>")
    print(None == 0)  # False
    print(None == False)  # False
    a = None
    b = None
    print(a is b)  # True -> the same single object
    print(type(None))  # <class 'NoneType'>


def get_result():
    # A function without a return statement (or whose return is not reached)
    # returns None automatically.
    if 2 > 3:
        return True


none_keyword_test()
result = get_result()
print(result)  # None
print(result is None)  # True

# A common use: an optional argument
def greet(name=None):
    if name is None:
        name = "guest"
    print(f"Hello {name}")


greet()  # Hello guest
greet("Asha")  # Hello Asha
