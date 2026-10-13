"""
More typing tools
 Final           a constant that must not be reassigned
 ClassVar        a class-level attribute
 Self            "an instance of this class" (3.11) for fluent methods
 @overload       several signatures for one function
 TypeIs          a custom type-narrowing check (3.13)
 @override       mark methods that override a parent's (3.12)
 @deprecated     warn about old APIs (warnings.deprecated, 3.13)
 Any             opt out of checking (use sparingly)
"""
from typing import Any, ClassVar, Final, Self, TypeIs, overload, override
from warnings import deprecated

MAX_RETRIES: Final = 3


class QueryBuilder:
    instances: ClassVar[int] = 0

    def __init__(self) -> None:
        self.parts: list[str] = []
        QueryBuilder.instances += 1

    def select(self, *cols: str) -> Self:
        self.parts.append("SELECT " + ", ".join(cols))
        return self

    def where(self, cond: str) -> Self:
        self.parts.append("WHERE " + cond)
        return self

    def build(self) -> str:
        return " ".join(self.parts)


print(QueryBuilder().select("name", "age").where("age > 18").build())


@overload
def double(x: int) -> int: ...
@overload
def double(x: str) -> str: ...
def double(x: int | str) -> int | str:
    return x * 2


print(double(4), double("ab"))  # 8 abab


def is_str_list(values: list[Any]) -> TypeIs[list[str]]:
    return all(isinstance(v, str) for v in values)


data: list[Any] = ["a", "b"]
if is_str_list(data):
    print(", ".join(data))  # the checker now knows data is list[str]


class Base:
    def run(self) -> str:
        return "base"


class Child(Base):
    @override
    def run(self) -> str:  # a typo like "rnu" would be reported by the checker
        return "child"


@deprecated("use new_function() instead")
def old_function() -> None:
    pass


import warnings
with warnings.catch_warnings(record=True) as w:
    warnings.simplefilter("always")
    old_function()
print(Child().run(), "|", w[0].message)  # child | use new_function() instead
