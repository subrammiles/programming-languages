"""
import module  -> use it as module.name
Run from this folder:  python3 a_import_module.py
"""
import mysquare

result = mysquare.square(4)
print("By using the module, square of the number is:", result)  # 16
print(mysquare.PI)  # 3.14159
print(mysquare.__name__)  # mysquare -> when imported, __name__ is the module name
