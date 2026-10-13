"""
Higher-order functions take functions as arguments or return them.
Built-ins that take a key or function: sorted, min, max, map, filter, any, all
"""


def apply_twice(func, value):
    return func(func(value))


def shout(text):
    return text.upper() + "!"


print(apply_twice(shout, "hi"))  # HI!!
print(apply_twice(lambda x: x * 3, 2))  # 18

scores = {"Asha": 90, "Ravi": 75, "Meena": 88}
print(max(scores, key=scores.get))  # Asha
print(sorted(scores, key=scores.get, reverse=True))  # ['Asha', 'Meena', 'Ravi']

pipeline = [str.strip, str.lower, lambda s: s.replace(" ", "-")]
text = "  Hello Python World "
for step in pipeline:
    text = step(text)
print(text)  # hello-python-world
