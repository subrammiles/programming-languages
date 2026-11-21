"""
Generator methods: send(), throw(), close()
 gen.send(value)  resume the generator; `value` becomes the result of the paused `yield`
                  (the first call must be next(gen) or gen.send(None) to start it)
 gen.throw(exc)   raise an exception at the paused yield (the generator may catch it)
 gen.close()      raise GeneratorExit at the paused yield: used for clean-up (finally runs)

These turn generators into "coroutines" that receive data, the idea asyncio grew out of.
"""


def running_total():
    total = 0
    while True:
        value = yield total          # pauses here; receives the sent value when resumed
        total += value


acc = running_total()
next(acc)                            # start it: runs to the first yield
print(acc.send(10), acc.send(5), acc.send(-3))   # 10 15 12


def chat():
    name = yield "What is your name?"
    hobby = yield f"Hi {name}! Your hobby?"
    return f"{name} likes {hobby}"   # return value travels in StopIteration.value


c = chat()
print(next(c))                       # What is your name?
print(c.send("Ann"))                 # Hi Ann! Your hobby?
try:
    c.send("chess")
except StopIteration as e:
    print(e.value)                   # Ann likes chess


def resilient_worker():
    processed = 0
    while True:
        try:
            item = yield processed
            processed += 1
        except ValueError as e:      # errors thrown in from outside
            print("  worker skipped bad item:", e)


w = resilient_worker()
next(w)
w.send("a")
print(w.throw(ValueError("corrupt record")))   # worker skipped bad item...  then  1
print(w.send("b"))                             # 2


def reader(lines):
    print("  open file")
    try:
        for line in lines:
            yield line
    finally:
        print("  close file")        # runs on close(), on break, or when garbage collected


r = reader(["l1", "l2", "l3"])
print(next(r))                       #   open file   then   l1
r.close()                            #   close file
print(list(r))                       # []   (a closed generator is finished)

for line in reader(["x", "y"]):
    break                            # break closes the generator too
#   open file
#   close file


# A coroutine pipeline: each stage sends results to the next one
def printer(prefix):
    while True:
        item = yield
        print(prefix, item)


def upper_filter(target):
    while True:
        item = yield
        if item.isalpha():
            target.send(item.upper())


sink = printer("  got:")
next(sink)
pipeline = upper_filter(sink)
next(pipeline)
for word in ["hello", "123", "world"]:
    pipeline.send(word)
#   got: HELLO
#   got: WORLD
