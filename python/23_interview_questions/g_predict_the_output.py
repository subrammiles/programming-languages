"""
Predict the output: Python gotchas interviewers love.
Cover the comments, guess, then run.

On Python 3.14+ the file starts with "SyntaxWarning: 'return' in a 'finally' block".
That is expected: Q7 does it on purpose to show why it is a bad idea.
"""

# Q1: mutable default arguments are created ONCE, when the function is defined
def add_item(item, items=[]):
    items.append(item)
    return items


print(add_item(1), add_item(2))          # [1, 2] [1, 2]   (the same list both times!)
# Fix: def add_item(item, items=None): items = [] if items is None else items


# Q2: closures bind variables late (at call time), not values
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])              # [2, 2, 2]
funcs = [lambda i=i: i for i in range(3)]   # fix: freeze the value with a default argument
print([f() for f in funcs])              # [0, 1, 2]


# Q3: list multiplication copies REFERENCES
grid = [[0] * 3] * 3
grid[0][0] = 1
print(grid)                              # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
grid = [[0] * 3 for _ in range(3)]       # fix: build each row separately
grid[0][0] = 1
print(grid)                              # [[1, 0, 0], [0, 0, 0], [0, 0, 0]]


# Q4: is vs ==
a = [1, 2]
b = [1, 2]
print(a == b, a is b)                    # True False
x = 1000
y = int("1000")
print(x == y, x is y)                    # True False   (small ints -5..256 are cached; 1000 is not)


# Q5: += on a list inside a tuple does both things
t = (1, [2])
try:
    t[1] += [3]                          # the list is extended, THEN the tuple assignment fails
except TypeError as e:
    print("TypeError:", e)               # TypeError: 'tuple' object does not support item assignment
print(t)                                 # (1, [2, 3])


# Q6: chained comparisons
print(1 < 2 < 3, 3 > 2 > 1, 1 < 3 > 2)   # True True True
print((1 < 2) < 3, 2 == 2 == 2)          # True True    ((1<2) is True, which equals 1)
print(False == False in [False])         # True   (means False == False and False in [False])


# Q7: return inside finally wins
def f():
    try:
        return "try"
    finally:
        return "finally"                 # overrides (and swallows exceptions). Python 3.14 warns about this.


print(f())                               # finally


# Q8: UnboundLocalError
count = 0


def increment():
    try:
        count += 1                       # assignment makes `count` local to the whole function
    except UnboundLocalError as e:
        print("UnboundLocalError")       # UnboundLocalError   (fix: `global count`)


increment()


# Q9: class variables are shared by all instances (if mutable)
class Dog:
    tricks = []                          # one list for the whole class

    def __init__(self, name):
        self.name = name


d1, d2 = Dog("rex"), Dog("fido")
d1.tricks.append("roll")
print(d2.tricks)                         # ['roll']
d1.tricks = ["sit"]                      # assignment creates an INSTANCE attribute instead
print(d1.tricks, d2.tricks, Dog.tricks)  # ['sit'] ['roll'] ['roll']


# Q10: generators can be consumed only once
squares = (n * n for n in range(3))
print(list(squares), list(squares))      # [0, 1, 4] []


# Q11: modifying a list while iterating skips items
nums = [1, 2, 2, 3]
for n in nums:
    if n == 2:
        nums.remove(n)
print(nums)                              # [1, 2, 3]   (one 2 survived)
nums = [1, 2, 2, 3]
print([n for n in nums if n != 2])       # [1, 3]   (build a new list instead)


# Q12: dict changing size during iteration
d = {"a": 1, "b": 2}
try:
    for k in d:
        d[k + "!"] = 0
except RuntimeError as e:
    print(e)                             # dictionary changed size during iteration


# Q13: truthiness
print(bool([]), bool([0]), bool(""), bool(" "), bool(0.0), bool(None))   # False True False True False False
print([] or "default", 0 or None or "last")                               # default last
print(1 and 2, 0 and 2)                                                   # 2 0


# Q14: integer division and rounding
print(7 // 2, -7 // 2, 7 % -3, round(2.5), round(-0.5))   # 3 -4 -2 2 0   (// floors; round to even)


# Q15: string immutability, and sort vs sorted
s = "hello"
s.upper()
print(s)                                 # hello
lst = [3, 1, 2]
result = lst.sort()                      # sorts IN PLACE and returns None
print(result, lst, sorted([3, 1, 2]))    # None [1, 2, 3] [1, 2, 3]


# Q16: else on loops runs when there was NO break
for n in [1, 3, 5]:
    if n % 2 == 0:
        print("found even")
        break
else:
    print("no even number")              # no even number


# Q17: the walrus operator and scope in comprehensions
data = [1, 5, 12, 7, 20]
if (big := [x for x in data if x > 10]):
    print(big)                           # [12, 20]
print([y := x * 2 for x in range(3)], y)  # [0, 2, 4] 4   (the walrus target leaks out of the comprehension)
