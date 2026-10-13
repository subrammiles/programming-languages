"""
A package is a folder of modules with an __init__.py file.
Code here runs once, the first time the package is imported.
__all__ controls what "from shop import *" exports.
"""
from .cart import Cart
from .pricing import apply_discount

__all__ = ["Cart", "apply_discount"]
__version__ = "1.0.0"
