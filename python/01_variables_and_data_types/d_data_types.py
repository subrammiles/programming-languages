"""
Built-in data types
 Text:      str
 Numeric:   int, float, complex
 Sequence:  list, tuple, range
 Mapping:   dict
 Set:       set, frozenset
 Boolean:   bool
 Binary:    bytes, bytearray, memoryview
 None:      NoneType
Mutable (can change in place): list, dict, set, bytearray
Immutable: int, float, complex, bool, str, tuple, frozenset, bytes, None
"""


def using_constructors():
    print("<<<< creating values with constructors >>>>")
    values = [
        str("Hello World"),
        int(20),
        float(20.5),
        complex(1j),
        list(("apple", "banana")),
        tuple(("apple", "banana")),
        range(6),
        dict(name="John", age=36),
        set(("apple", "banana")),
        frozenset(("apple", "banana")),
        bool(5),
        bytes(5),
        bytearray(5),
        memoryview(bytes(5)),
    ]
    for v in values:
        print(f"{type(v).__name__:12} {v!r}")


def using_literals():
    print("<<<< creating values with literals (the usual way) >>>>")
    values = [
        "Hello World",
        20,
        20.5,
        1j,
        ["apple", "banana"],
        ("apple", "banana"),
        {"name": "John", "age": 36},
        {"apple", "banana"},
        True,
        b"Hello",
        None,
    ]
    for v in values:
        print(f"{type(v).__name__:12} {v!r}")


using_constructors()
using_literals()
