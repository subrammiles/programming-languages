"""
match / case - structural pattern matching (Python 3.10)
Python's "switch", but far more powerful: it can match values, types,
the shape of lists/tuples/dicts and attributes of objects.
 case _:          the default (matches anything)
 case a | b:      either
 case x if ...:   a guard (extra condition)
"""
from dataclasses import dataclass


def http_status(code):
    match code:
        case 200:
            return "OK"
        case 301 | 302:
            return "Redirect"
        case 404:
            return "Not Found"
        case n if 500 <= n < 600:
            return "Server error"
        case _:
            return "Unknown"


def command(text):
    match text.split():
        case ["go", direction]:
            return f"going {direction}"
        case ["pick", "up", *items]:  # capture the rest
            return f"picking up {', '.join(items)}"
        case ["quit" | "exit"]:
            return "bye"
        case []:
            return "say something"
        case _:
            return f"unknown command: {text}"


def describe(event):
    match event:  # matching dicts: extra keys are allowed
        case {"type": "click", "x": x, "y": y}:
            return f"click at ({x}, {y})"
        case {"type": "key", "key": str(key)}:  # also check the type
            return f"key {key}"
        case _:
            return "other event"


@dataclass
class Point:
    x: int
    y: int


def where(p):
    match p:  # matching objects by attributes
        case Point(x=0, y=0):
            return "origin"
        case Point(x=0, y=y):
            return f"on the y axis at {y}"
        case Point(x, y) if x == y:
            return "on the diagonal"
        case Point():
            return "somewhere else"


print(http_status(200), http_status(302), http_status(503), http_status(999))
# OK Redirect Server error Unknown

print(command("go north"))  # going north
print(command("pick up sword shield"))  # picking up sword, shield
print(command("exit"))  # bye
print(command("dance"))  # unknown command: dance

print(describe({"type": "click", "x": 10, "y": 20, "button": "left"}))  # click at (10, 20)
print(describe({"type": "key", "key": "Enter"}))  # key Enter

print(where(Point(0, 0)), "|", where(Point(0, 5)), "|", where(Point(3, 3)), "|", where(Point(1, 2)))
# origin | on the y axis at 5 | on the diagonal | somewhere else

# Before 3.10, a dict lookup was the usual "switch":
def old_switch(x):
    return {"a": 1, "b": 2}.get(x, 0)


print(old_switch("b"), old_switch("z"))  # 2 0
