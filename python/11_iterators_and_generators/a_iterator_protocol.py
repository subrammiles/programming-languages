"""
Iterables and iterators
 ITERABLE: anything you can loop over (has __iter__): list, str, dict, file, range ...
 ITERATOR: the object that produces the values one by one (has __next__)
 iter(iterable) -> iterator,  next(iterator) -> next value, StopIteration at the end
A for loop just calls iter() once and next() until StopIteration.
"""
numbers = [10, 20, 30]
it = iter(numbers)
print(next(it))  # 10
print(next(it))  # 20
print(next(it))  # 30
try:
    next(it)
except StopIteration:
    print("StopIteration: the iterator is used up")

print(next(iter([]), "default"))  # default -> no exception

print("<<<< what a for loop does >>>>")
it = iter("hi")
while True:
    try:
        ch = next(it)
    except StopIteration:
        break
    print(ch)

print("<<<< iterators are single-use, iterables are not >>>>")
squares = map(lambda x: x * x, [1, 2, 3])  # map returns an iterator
print(list(squares))  # [1, 4, 9]
print(list(squares))  # [] -> already consumed
