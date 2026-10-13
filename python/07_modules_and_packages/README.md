# Modules and packages

- **Module** – a single `.py` file you can import.
- **Package** – a folder of modules with an `__init__.py`.
- **Library** – a package published on [PyPI](https://pypi.org), installed with `pip` (see chapter 20).

| Folder / file | Topic | Run from |
|---|---|---|
| `a_simple_module/` | `import`, `import as`, `from … import` | `cd a_simple_module && python3 a_import_module.py` |
| `b_package/` | packages, `__init__.py`, relative imports, `__all__` | `cd b_package && python3 main.py` |
| `c_name_main.py` | `if __name__ == "__main__":` | this folder |
| `d_import_system.py` | `sys.path`, `sys.modules`, `importlib` | this folder |
| `e_lazy_imports.py` | `lazy import` (Python 3.15) | this folder |

Folders whose names start with a digit (like `07_modules_and_packages`) can't be imported,
which is why the importable examples live in normally named sub-folders.
