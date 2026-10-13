"""
Docstrings document a function; annotations describe the expected types.
Annotations are NOT enforced at runtime; tools like mypy and your editor use them.
See chapter 15 for type hints in depth.
"""


def bmi(weight_kg: float, height_m: float) -> float:
    """Return the body mass index.

    Args:
        weight_kg: weight in kilograms
        height_m: height in metres
    """
    return round(weight_kg / height_m ** 2, 1)


print(bmi(70, 1.75))  # 22.9
print(bmi.__doc__.splitlines()[0])  # Return the body mass index.
print(bmi.__annotations__)  # {'weight_kg': <class 'float'>, 'height_m': <class 'float'>, 'return': <class 'float'>}
# bmi("70", 1.75) is not stopped by the annotations; it fails inside with a TypeError
# help(bmi) shows the docstring in the REPL
