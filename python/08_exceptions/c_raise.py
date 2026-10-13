"""
raise - signal an error yourself.
raise with no argument inside an except block re-raises the current exception.
"""


def set_age(age):
    if not isinstance(age, int):
        raise TypeError(f"age must be an int, got {type(age).__name__}")
    if age < 0:
        raise ValueError("age cannot be negative")
    return age


for value in [30, -1, "thirty"]:
    try:
        print(set_age(value))
    except (TypeError, ValueError) as e:
        print(f"{type(e).__name__}: {e}")


def load():
    try:
        {}["missing"]
    except KeyError:
        print("logging the error, then passing it on")
        raise


try:
    load()
except KeyError as e:
    print("caught again:", e)
