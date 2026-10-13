"""
Lists: ordered, mutable, allow duplicates and mixed types.  [1, "a", True]
"""


def creating():
    print("<<<< creating >>>>")
    numbers = [1, 3]
    mixed = ["a", 1, True]
    nested = ["a", 1, True, [1, 2, 3]]
    print(numbers, mixed, nested)
    print(len(nested))  # 4
    print(nested[3][0])  # 1 -> index into the inner list
    print(list(range(3)), list("hi"))  # [0, 1, 2] ['h', 'i']


def changing():
    print("<<<< sort, change, append, pop >>>>")
    numbers = [1, 3, 7, 6, 2]
    # sort() sorts IN PLACE and returns None, so "numbers = numbers.sort()" is a bug
    numbers.sort()
    print(numbers)  # [1, 2, 3, 6, 7]
    print(sorted([3, 1, 2], reverse=True))  # [3, 2, 1] -> sorted() returns a NEW list

    numbers[0] = 0
    print(numbers)  # [0, 2, 3, 6, 7]
    numbers.append(23)
    print(numbers)  # [0, 2, 3, 6, 7, 23]
    numbers.pop()  # removes and returns the last item
    numbers.pop(2)  # removes the item at index 2
    print(numbers)  # [0, 2, 6, 7]


def concatenating():
    print("<<<< concatenating >>>>")
    print([1, 2, 3] + [4, 5, 6])  # [1, 2, 3, 4, 5, 6]


creating()
changing()
concatenating()
