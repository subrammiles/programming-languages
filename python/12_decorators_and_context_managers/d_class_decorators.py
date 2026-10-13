"""
Decorators can also be classes, and can decorate classes.
 - a class with __call__ can keep state (e.g. count calls)
 - a function that takes a class can register or modify it
"""
import functools


class CountCalls:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.calls = 0

    def __call__(self, *args, **kwargs):
        self.calls += 1
        return self.func(*args, **kwargs)


@CountCalls
def greet(name):
    return f"hi {name}"


greet("a")
greet("b")
print(greet.calls)  # 2

PLUGINS = {}


def register(cls):
    PLUGINS[cls.__name__.lower()] = cls
    return cls


@register
class CsvExporter:
    pass


@register
class JsonExporter:
    pass


print(sorted(PLUGINS))  # ['csvexporter', 'jsonexporter']
