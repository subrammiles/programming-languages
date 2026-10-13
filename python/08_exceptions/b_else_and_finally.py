"""
try / except / else / finally
 else:    runs only if NO exception happened
 finally: ALWAYS runs (success, error or return) -> clean-up code
For files and locks, prefer "with" (chapter 12), which does the clean-up for you.
"""


def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("  error: division by zero")
        return None
    else:
        print("  no error, result =", result)
        return result
    finally:
        print("  finally: always runs")


print(divide(10, 2))
print(divide(1, 0))
