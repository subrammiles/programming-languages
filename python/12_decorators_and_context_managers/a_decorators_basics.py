"""
Decorators wrap a function to add behaviour before/after it, without changing its code.
 @decorator
 def f(): ...
is the same as
 f = decorator(f)
Always use functools.wraps so the wrapped function keeps its name and docstring.
"""
import functools
import time


def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}{args}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result

    return wrapper


def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            print(f"{func.__name__} took {(time.perf_counter() - start) * 1000:.1f} ms")

    return wrapper


@log_calls
def add(a, b):
    """Add two numbers."""
    return a + b


@timer
@log_calls  # stacked: applied bottom-up, so timer wraps log_calls(slow_square)
def slow_square(n):
    time.sleep(0.1)
    return n * n


add(2, 3)
slow_square(4)
print(add.__name__, "-", add.__doc__)  # add - Add two numbers.  (thanks to wraps)
