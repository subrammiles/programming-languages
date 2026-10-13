"""
Generics: functions and classes that work with ANY type while keeping it consistent.
Python 3.12 syntax (PEP 695):
 def first[T](items: list[T]) -> T
 class Box[T]: ...
 type Alias = ...        (the "type" statement)
Older code uses TypeVar("T") and Generic[T]; it means the same thing.
"""
from collections.abc import Callable, Sequence


def first[T](items: Sequence[T]) -> T:
    return items[0]


def apply_all[T, R](items: list[T], func: Callable[[T], R]) -> list[R]:
    return [func(i) for i in items]


class Stack[T]:
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

    def __len__(self) -> int:
        return len(self._items)


def largest[N: (int, float)](a: N, b: N) -> N:  # constrained: only int or float
    return a if a > b else b


type Json = dict[str, Json] | list[Json] | str | int | float | bool | None  # recursive alias
type Pair[T] = tuple[T, T]


def swap[T](pair: Pair[T]) -> Pair[T]:
    return pair[1], pair[0]


print(first([10, 20]))  # 10 -> the checker knows the result is an int
print(first("abc"))  # a
print(apply_all(["a", "bb"], len))  # [1, 2] -> list[int]

s = Stack[str]()
s.push("x")
s.push("y")
print(s.pop(), len(s))  # y 1

print(largest(3, 7), largest(2.5, 1.0))  # 7 2.5
print(swap((1, 2)))  # (2, 1)
print(Json.__value__)  # the alias is evaluated lazily
