"""
 TypedDict  - type the keys of a dict (e.g. JSON from an API)
 Protocol   - "structural typing": any class with the right methods matches,
              no inheritance needed (duck typing that type checkers understand)
 Literal    - only these exact values
"""
from typing import Literal, NotRequired, Protocol, TypedDict


class Movie(TypedDict):
    title: str
    year: int
    rating: NotRequired[float]  # this key may be missing


def label(movie: Movie) -> str:
    return f"{movie['title']} ({movie['year']})"


print(label({"title": "Inception", "year": 2010}))  # Inception (2010)


class Drawable(Protocol):
    def draw(self) -> str: ...


class Circle:  # does NOT inherit from Drawable
    def draw(self) -> str:
        return "()"


class Square:
    def draw(self) -> str:
        return "[]"


def render(shapes: list[Drawable]) -> str:
    return " ".join(s.draw() for s in shapes)


print(render([Circle(), Square()]))  # () []

Mode = Literal["r", "w", "a"]


def open_file(path: str, mode: Mode = "r") -> str:
    return f"opening {path} in {mode!r} mode"


print(open_file("a.txt", "w"))
# open_file("a.txt", "x")  -> mypy: Argument 2 has incompatible type "Literal['x']"
