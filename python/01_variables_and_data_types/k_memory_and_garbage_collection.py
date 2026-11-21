"""
Memory management in CPython
 - Every value is an object on the heap; variables are NAMES that refer to objects.
 - REFERENCE COUNTING: each object counts how many references point to it.
   When the count drops to 0, it is freed immediately.
 - The cyclic GARBAGE COLLECTOR (module gc) finds groups of objects that only refer
   to each other (cycles), which reference counting alone can never free.
 - weakref: a reference that does NOT keep the object alive (caches, observers).
 - Small integers (-5..256) and many short strings are cached / interned and shared.
   That is an optimisation detail: always compare values with ==, never with `is`.
"""
import gc
import sys
import weakref

# ---- reference counting ----
data = [1, 2, 3]
print(sys.getrefcount(data))        # 2   (data + the temporary argument to getrefcount)
alias = data
print(sys.getrefcount(data))        # 3
del alias                           # del removes a NAME, not the object
print(sys.getrefcount(data))        # 2


class Resource:
    def __init__(self, name):
        self.name = name

    def __del__(self):              # called when the object is freed (do not rely on it for cleanup)
        print(f"  {self.name} freed")


r = Resource("file A")
r = None                            #   file A freed   (count hit 0: freed immediately)


# ---- cycles need the garbage collector ----
class Node:
    def __init__(self, name):
        self.name = name
        self.other = None


gc.disable()                        # so we can see the cycle survive until we collect it
a, b = Node("a"), Node("b")
a.other, b.other = b, a             # a -> b -> a
a_ref = weakref.ref(a)
del a, b                            # no names left, but each still references the other
print(a_ref() is not None)          # True   (still alive: refcount is 1, not 0)
print(gc.collect() >= 2)            # True   (the collector found and freed the cycle)
print(a_ref())                      # None
gc.enable()


# ---- weak references ----
class Image:
    def __init__(self, path):
        self.path = path


cache = weakref.WeakValueDictionary()   # entries disappear when nobody else uses the image
img = Image("cat.png")
cache["cat"] = img
print("cat" in cache)               # True
del img
print("cat" in cache)               # False


# ---- caching of small ints and strings ----
x, y = 256, 256
print(x is y)                       # True   (cached)
x, y = int("257"), int("257")
print(x is y, x == y)               # False True   (two different objects)
s1 = "hello"
s2 = "".join(["hel", "lo"])         # built at runtime
print(s1 == s2, s1 is s2)           # True False
print(sys.intern(s2) is s1)         # True   (intern returns the shared copy)


# ---- sizes ----
print(sys.getsizeof(0), sys.getsizeof(10**100) > sys.getsizeof(0))   # 28 True  (ints grow as needed)
print(sys.getsizeof([]) < sys.getsizeof([1, 2, 3]))                  # True
nums = list(range(1000))
gen = (n for n in range(1000))
print(sys.getsizeof(gen) < sys.getsizeof(nums))                      # True   (generators are lazy)

# Profile memory with tracemalloc (standard library) to find leaks:
#   import tracemalloc; tracemalloc.start(); ...; print(tracemalloc.get_traced_memory())
