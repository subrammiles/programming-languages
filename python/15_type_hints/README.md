# Type hints

Type hints are optional and not enforced when the program runs.
Their value comes from **tools** that read them:

```bash
pip install mypy          # or: pip install pyright
mypy 15_type_hints/       # reports type errors without running the code
```

Editors (VS Code with Pylance, PyCharm) use them for autocomplete and inline errors.

| File | Topics |
|---|---|
| `a_basics.py` | annotating variables, parameters, return values |
| `b_collections_and_unions.py` | `list[int]`, `dict[str, int]`, `X \| None`, `Iterable`, `Callable` |
| `c_typeddict_and_protocol.py` | `TypedDict`, `Protocol`, `Literal` |
| `d_generics.py` | `def f[T]`, `class Box[T]`, the `type` statement (3.12) |
| `e_advanced_typing.py` | `Final`, `Self`, `@overload`, `TypeIs`, `@override`, `@deprecated` |
| `f_annotations_at_runtime.py` | lazy annotations and `annotationlib` (3.14) |
