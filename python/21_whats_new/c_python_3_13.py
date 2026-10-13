"""
Highlights of Python 3.13 (2024)
 - a new interactive REPL: colours, multi-line editing, paste mode (F3), help (F1)
 - experimental FREE-THREADED build (no GIL): python3.13t
 - experimental JIT compiler (build option)
 - copy.replace() for dataclasses, namedtuples, datetimes ...
 - @warnings.deprecated, typing.TypeIs, typing.ReadOnly
 - locals() has well-defined semantics; many old modules removed (cgi, telnetlib ...)
"""
import copy
from dataclasses import dataclass
from datetime import date
from typing import ReadOnly, TypedDict
from warnings import deprecated

@dataclass(frozen=True)
class Config:
    host: str
    port: int

base = Config("localhost", 8000)
print(copy.replace(base, port=9000))  # Config(host='localhost', port=9000)
print(copy.replace(date(2026, 1, 31), month=3))  # 2026-03-31

class Movie(TypedDict):
    title: ReadOnly[str]  # type checkers forbid changing this key
    rating: float

@deprecated("use connect_v2()")
def connect():
    return "connected"

import warnings
with warnings.catch_warnings(record=True) as caught:
    warnings.simplefilter("always")
    connect()
print(caught[0].category.__name__, "-", caught[0].message)  # DeprecationWarning - use connect_v2()
