# Python

Examples organised as chapters, in the order they are meant to be read.
They cover the whole [official Python tutorial](https://docs.python.org/3/tutorial/)
plus the modern features and tools used in real projects today.

Written for **Python 3.12+**. Files that use newer features (3.13, 3.14, 3.15) say so at the top.
Check your version with `python3 --version`.

## Running the examples

Every file is a standalone script:

```bash
cd python
python3 04_control_flow/h_match_case.py
```

Files starting `a_`, `b_`, `c_` … are meant to be read in that order.
In chapters 07 and 19, run the files from inside their folder (the READMEs say how).

## Chapters

| #  | Chapter | Topics |
|----|---------|--------|
| 00 | [Getting started](00_getting_started) | running Python, the REPL, `print`, `input`, comments |
| 01 | [Variables and data types](01_variables_and_data_types) | variables, identity, numbers, booleans and truthiness, type conversion, `None` |
| 02 | [Operators](02_operators) | arithmetic, comparison, logical, `is` vs `==`, membership, bitwise, walrus `:=`, precedence |
| 03 | [Strings](03_strings) | slicing, methods, f-strings and format specs, Unicode and bytes, t-strings (3.14) |
| 04 | [Control flow](04_control_flow) | `if`, `for`, `while`, `break` / `continue`, loop `else`, `pass`, `match` / `case` |
| 05 | [Data structures](05_data_structures) | lists, tuples, sets, dicts, comprehensions, unpacking, copying, `collections` |
| 06 | [Functions](06_functions) | arguments (`*args`, `**kwargs`, `/`, `*`), scope, closures, lambdas, recursion, docstrings |
| 07 | [Modules and packages](07_modules_and_packages) | `import`, packages, `__name__ == "__main__"`, `sys.path`, `lazy import` (3.15) |
| 08 | [Exceptions](08_exceptions) | `try` / `except` / `else` / `finally`, `raise`, custom exceptions, chaining, exception groups |
| 09 | [File handling](09_file_handling) | reading and writing, `pathlib`, JSON, CSV, binary and pickle, `shutil` |
| 10 | [Object-oriented programming](10_oop) | classes, constructors, inheritance, `super`, MRO, encapsulation, ABCs, properties, dunder methods |
| 11 | [Iterators and generators](11_iterators_and_generators) | iterator protocol, `yield`, generator expressions, pipelines |
| 12 | [Decorators and context managers](12_decorators_and_context_managers) | writing decorators, `functools.cache`, `with`, `contextlib` |
| 13 | [Functional programming](13_functional_programming) | `functools`, `itertools`, `operator`, pure functions |
| 14 | [Dataclasses and enums](14_dataclasses_and_enums) | `@dataclass`, frozen/slots/kw_only, `Enum`, `StrEnum`, `Flag`, `NamedTuple` |
| 15 | [Type hints](15_type_hints) | annotations, unions, `TypedDict`, `Protocol`, generics `def f[T]`, `TypeIs`, lazy annotations |
| 16 | [Concurrency](16_concurrency) | threads, locks, thread/process pools, the GIL and free-threading, subinterpreters |
| 17 | [asyncio](17_asyncio) | `async` / `await`, tasks, `TaskGroup`, timeouts, async iterators, semaphores |
| 18 | [Standard library](18_standard_library) | `os`, `datetime`, `re`, `logging`, `argparse`, `subprocess`, `sqlite3`, `decimal` and more |
| 19 | [Testing](19_testing) | `unittest`, `pytest`, fixtures, mocking, doctest |
| 20 | [Virtual environments and packaging](20_virtual_environments_and_packaging) | `venv`, `pip`, `uv`, `pyproject.toml`, an installable package |
| 21 | [What's new](21_whats_new) | Python 3.10 → 3.15, version by version |
