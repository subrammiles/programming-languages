"""
assert condition, message
 - raises AssertionError if the condition is false
 - for catching BUGS during development, not for validating user input
   (python -O removes all asserts)
warnings.warn(...) - tell the user about something odd without stopping the program.
"""
import warnings


def average(numbers):
    assert len(numbers) > 0, "numbers must not be empty"
    return sum(numbers) / len(numbers)


print(average([2, 4]))  # 3.0
try:
    average([])
except AssertionError as e:
    print("AssertionError:", e)


def old_api():
    warnings.warn("old_api() is deprecated, use new_api()", DeprecationWarning, stacklevel=2)
    return "still works"


warnings.simplefilter("always")
print(old_api())

with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter("always")
    old_api()
print(len(caught), caught[0].category.__name__)  # 1 DeprecationWarning
