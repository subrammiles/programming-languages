"""
Collection types and unions (modern syntax, Python 3.9 / 3.10+)
 list[int]  dict[str, float]  tuple[int, str]  tuple[int, ...]  set[str]
 int | None        a value that may be missing   (old: Optional[int])
 int | str         either type                   (old: Union[int, str])
 collections.abc.Iterable / Sequence / Mapping / Callable  for flexible parameters
"""
from collections.abc import Callable, Iterable, Mapping


def average(numbers: list[float]) -> float:
    return sum(numbers) / len(numbers)


def find_user(users: dict[int, str], user_id: int) -> str | None:
    return users.get(user_id)


def total(values: Iterable[int]) -> int:  # accepts list, tuple, set, generator ...
    return sum(values)


def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)


def describe(config: Mapping[str, int | str]) -> str:
    return ", ".join(f"{k}={v}" for k, v in config.items())


point: tuple[float, float] = (1.5, 2.0)
scores: tuple[int, ...] = (90, 85, 77)  # any length

print(average([1.0, 2.0, 4.0]))  # 2.3333333333333335
print(find_user({1: "Asha"}, 2))  # None
print(total(x for x in range(5)))  # 10
print(apply(lambda a, b: a * b, 6, 7))  # 42
print(describe({"port": 8000, "host": "local"}))  # port=8000, host=local

user = find_user({1: "Asha"}, 1)
if user is not None:  # "narrowing": after this check the checker knows user is a str
    print(user.upper())  # ASHA
