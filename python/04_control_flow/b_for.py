"""
for loops go over any ITERABLE: list, tuple, str, dict, set, range, file ...
Helpers: range(), enumerate(), zip(), reversed(), sorted()
"""


def over_a_list():
    print("<<<< list >>>>")
    for item in [1, 2, 3, 4]:
        print(item)


def unpacking_pairs():
    print("<<<< unpacking tuples >>>>")
    for a, b in [(1, 2), (2, 0), (3, 0)]:
        print(a, b)


def over_a_string():
    print("<<<< string >>>>")
    for ch in "hey":
        print(ch, end=" ")  # h e y
    print()


def with_range():
    print("<<<< range(start, stop, step) >>>>")
    print(list(range(5)))  # [0, 1, 2, 3, 4]
    print(list(range(2, 10, 3)))  # [2, 5, 8]
    print(list(range(5, 0, -1)))  # [5, 4, 3, 2, 1]


def with_enumerate_and_zip():
    print("<<<< enumerate: index and value >>>>")
    for i, fruit in enumerate(["apple", "mango"], start=1):
        print(i, fruit)  # 1 apple / 2 mango

    print("<<<< zip: loop over several lists together >>>>")
    names = ["Asha", "Ravi", "Meena"]
    scores = [90, 75, 88]
    for name, score in zip(names, scores):
        print(f"{name}: {score}")
    # zip stops at the shortest list; use strict=True (3.10) to get an error instead


def over_a_dict():
    print("<<<< dict >>>>")
    prices = {"tea": 20, "coffee": 150}
    for key, value in prices.items():
        print(key, value)


over_a_list()
unpacking_pairs()
over_a_string()
with_range()
with_enumerate_and_zip()
over_a_dict()
