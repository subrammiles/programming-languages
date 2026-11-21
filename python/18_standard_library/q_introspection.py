"""
Introspection: examining objects, functions and code at runtime
 type / isinstance / dir / vars / getattr / callable   the basics
 inspect     signatures, source code, members, the call stack
 dis         disassemble functions into bytecode (see what Python really runs)
 sys._getframe / inspect.stack  where am I being called from?
Used by frameworks (FastAPI reads type hints and signatures), debuggers, test tools.
"""
import dis
import inspect


def greet(name: str, greeting: str = "Hello", *, punctuation: str = "!") -> str:
    """Return a greeting."""
    return f"{greeting}, {name}{punctuation}"


class Shape:
    sides = 0

    def area(self):
        return 0


print(callable(greet), greet.__name__, greet.__doc__)   # True greet Return a greeting.
print([n for n in dir(Shape) if not n.startswith("_")]) # ['area', 'sides']
print(vars(Shape)["sides"])                             # 0

# ---- inspect.signature: parameters, defaults, kinds, annotations ----
sig = inspect.signature(greet)
print(sig)                                              # (name: str, greeting: str = 'Hello', *, punctuation: str = '!') -> str
for p in sig.parameters.values():
    print(f"  {p.name:12} kind={p.kind.name:22} default={p.default!r}")
#   name         kind=POSITIONAL_OR_KEYWORD  default=<class 'inspect._empty'>
#   greeting     kind=POSITIONAL_OR_KEYWORD  default='Hello'
#   punctuation  kind=KEYWORD_ONLY           default='!'

bound = sig.bind("Ann", punctuation="?")                # check arguments without calling
bound.apply_defaults()
print(bound.arguments)                                  # {'name': 'Ann', 'greeting': 'Hello', 'punctuation': '?'}


# A tiny "framework" that calls a function with only the arguments it asks for
def call_with_available(func, **available):
    wanted = inspect.signature(func).parameters
    return func(**{k: v for k, v in available.items() if k in wanted})


def handler(user, db):
    return f"{user} via {db}"


print(call_with_available(handler, user="ann", db="sqlite", request="ignored"))   # ann via sqlite

# ---- members, source, kinds of objects ----
print([name for name, _ in inspect.getmembers(Shape, inspect.isfunction)])   # ['area']
print(inspect.getsource(Shape.area).strip().splitlines()[0])                 # def area(self):
print(inspect.isclass(Shape), inspect.isgeneratorfunction(greet))            # True False


# ---- who called me? ----
def where_am_i():
    caller = inspect.stack()[1]
    return f"called from {caller.function}() line {caller.lineno > 0}"


def some_function():
    return where_am_i()


print(some_function())                                  # called from some_function() line True


# ---- dis: the bytecode ----
def add_one(x):
    return x + 1


ops = [ins.opname for ins in dis.get_instructions(add_one)]
print("BINARY_OP" in ops, ops[-1])                      # True RETURN_VALUE
# dis.dis(add_one) prints the full listing
