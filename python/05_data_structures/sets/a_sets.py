"""
Sets: UNORDERED collections of UNIQUE items.  {1, 2, 3}
Very fast "in" checks. Items must be hashable (no lists or dicts inside).
Empty set: set()  ({} is an empty dict!)
"""
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # {1, 2, 3, 4}

print({10, 20, 30, 40, 10})  # {40, 10, 20, 30} -> duplicates removed, order not guaranteed

my_set3 = {11, 36, 64}
my_set3.update({"a", "b"})  # add many
print(len(my_set3))  # 5

print("<<<< discard vs remove >>>>")
s = {111, 336, 644}
s.discard(336)
s.discard(66)  # missing item: no error
print(s)

s2 = {111, 336, 644}
s2.remove(336)
try:
    s2.remove(66)
except KeyError as e:
    print("KeyError:", e)  # remove() raises if the item is missing

print("<<<< remove duplicates from a list >>>>")
emails = ["a@x.com", "b@x.com", "a@x.com"]
print(list(dict.fromkeys(emails)))  # ['a@x.com', 'b@x.com'] -> keeps the order
print(type(set()).__name__, type({}).__name__)  # set dict
