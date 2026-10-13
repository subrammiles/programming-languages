"""
Highlights of Python 3.10 (2021) and 3.11 (2022)
3.10: match/case, X | Y unions, zip(strict=True), better error messages, parenthesised context managers
3.11: 10-60% faster, ExceptionGroup/except*, add_note, TaskGroup, tomllib, Self, StrEnum,
      error locations shown with ^^^ in tracebacks
"""
import tomllib
from enum import StrEnum
from typing import Self

print("<<<< 3.10 match >>>>")
def kind(value):
    match value:
        case int() | float():
            return "number"
        case [*_]:
            return "list"
        case _:
            return "other"
print(kind(3), kind([1]), kind("x"))  # number list other

print("<<<< 3.10 zip(strict=True) >>>>")
try:
    list(zip([1, 2], ["a"], strict=True))
except ValueError as e:
    print("ValueError:", e)

print("<<<< 3.10 unions with | >>>>")
def parse(value: int | str) -> int | None:
    return int(value) if str(value).isdigit() else None
print(parse("42"), parse("x"))  # 42 None

print("<<<< 3.11 tomllib, StrEnum, Self >>>>")
print(tomllib.loads('title = "demo"')["title"])  # demo

class Color(StrEnum):
    RED = "red"
print(Color.RED == "red")  # True

class Builder:
    def set(self, x) -> Self:
        self.x = x
        return self
print(Builder().set(5).x)  # 5

print("<<<< 3.11 exception notes >>>>")
try:
    try:
        int("x")
    except ValueError as e:
        e.add_note("while reading the config")
        raise
except ValueError as e:
    print(e.__notes__)  # ['while reading the config']
