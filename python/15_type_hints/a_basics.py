"""
Type hints (annotations) describe the types a function expects and returns.
 - Python does NOT check them at runtime
 - type checkers (mypy, pyright) and editors use them to find bugs before you run the code
 - they also document the code
Run a checker:  pip install mypy  &&  mypy a_basics.py
"""

age: int = 30
name: str = "Asha"
price: float = 9.99
active: bool = True


def greet(name: str, times: int = 1) -> str:
    return ", ".join([f"Hello {name}"] * times)


def log(message: str) -> None:  # returns nothing
    print(message)


print(greet("Asha", 2))  # Hello Asha, Hello Asha
log("done")

# Not enforced at runtime:
print(greet(42))  # Hello 42 -> runs, but mypy would report: Argument 1 has incompatible type "int"
