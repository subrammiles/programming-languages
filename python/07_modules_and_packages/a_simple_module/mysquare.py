"""
A module is just a .py file. Its functions, classes and variables
can be imported by other files in the same folder (or on sys.path).
"""

PI = 3.14159


def square(number):
    """Return the square of a number."""
    return number ** 2


if __name__ == "__main__":
    # Runs only when this file is executed directly, not when imported
    print("testing mysquare:", square(3))
