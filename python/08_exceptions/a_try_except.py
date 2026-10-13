"""
Exceptions are errors that happen while the program runs.
 try:     code that might fail
 except:  what to do if it fails
Catch SPECIFIC exceptions; a bare "except:" also hides bugs and Ctrl+C.
Common built-ins: ValueError, TypeError, KeyError, IndexError, ZeroDivisionError,
FileNotFoundError, AttributeError, NameError, ImportError
"""


def to_int(text):
    try:
        return int(text)
    except ValueError:
        print(f"{text!r} is not a number")
        return None


print(to_int("42"))  # 42
print(to_int("abc"))  # 'abc' is not a number / None

print("<<<< several exception types >>>>")
for value in [10, 0, "x"]:
    try:
        print(100 / value)
    except ZeroDivisionError:
        print("cannot divide by zero")
    except TypeError as e:
        print("wrong type:", e)

print("<<<< one handler for several types >>>>")
data = {"a": [1, 2]}
for key, index in [("b", 0), ("a", 5)]:
    try:
        print(data[key][index])
    except (KeyError, IndexError) as e:
        print(f"{type(e).__name__}: {e}")
# KeyError: 'b'
# IndexError: list index out of range
