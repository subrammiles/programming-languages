"""
Generators: functions that use yield.
Calling one returns a generator (an iterator); the body runs only as values are requested,
pausing at each yield and resuming where it left off.
 - memory efficient: values are made one at a time
 - can be infinite
"""


def countdown(n):
    print("starting")
    while n > 0:
        yield n
        n -= 1
    print("done")


gen = countdown(3)
print(type(gen).__name__)  # generator -> nothing printed yet: the body hasn't started
print(next(gen))  # starting, then 3
print(list(gen))  # prints "done" while list() drains the generator, then [2, 1]


def fibonacci():
    a, b = 0, 1
    while True:  # infinite, which is fine for a generator
        yield a
        a, b = b, a + b


for i, f in enumerate(fibonacci()):
    if i == 10:
        break
    print(f, end=" ")  # 0 1 1 2 3 5 8 13 21 34
print()


def read_large_file(lines):
    """Process a huge file line by line without loading it all."""
    for line in lines:
        if line.strip():
            yield line.strip().upper()


print(list(read_large_file(["a\n", "\n", "b\n"])))  # ['A', 'B']
