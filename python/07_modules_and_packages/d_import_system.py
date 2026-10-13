"""
How import finds modules
 sys.path   -> the list of folders Python searches
 sys.modules -> modules already imported (a module's code runs only once)
 importlib  -> import by name at runtime
"""
import importlib
import sys

print(sys.path[0])  # the folder of the script being run
print("json" in sys.modules)  # False (not imported yet)
json = importlib.import_module("json")
print("json" in sys.modules)  # True
print(json.dumps({"a": 1}))  # {"a": 1}

print(sys.builtin_module_names[:5])  # modules compiled into the interpreter
