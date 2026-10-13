"""
Highlights of Python 3.12 (2023)
 - type parameter syntax: def f[T](...), class Box[T], and the "type" statement
 - f-strings can reuse quotes, contain backslashes, comments and span lines
 - @typing.override
 - itertools.batched
 - better error messages ("Did you forget to import 'sys'?")
"""
from itertools import batched
from typing import override

def first[T](items: list[T]) -> T:
    return items[0]

type Point = tuple[float, float]

print(first(["a", "b"]))  # a

songs = ["Song A", "Song B"]
print(f"Playlist: {", ".join(songs)}")  # same quotes inside: new in 3.12
print(f"{'\n'.join(songs)}")  # backslash inside {}: new in 3.12

print(list(batched("ABCDEFG", 3)))  # [('A', 'B', 'C'), ('D', 'E', 'F'), ('G',)]

class Base:
    def run(self) -> str:
        return "base"

class Child(Base):
    @override
    def run(self) -> str:
        return "child"

print(Child().run())  # child
