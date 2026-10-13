"""
Tuples: ordered and IMMUTABLE.  (1, 2, 3)
Use them for fixed groups of values: coordinates, RGB colours, rows from a database,
returning several values from a function. They can be dict keys; lists cannot.
"""
my_tuple = ("A", "B", "C", "D")
my_list = ["A", "B", "C", "D"]
print(my_tuple[1], my_list[1])  # B B

try:
    my_tuple[1] = "X"
except TypeError as e:
    print(e)  # 'tuple' object does not support item assignment

my_list[1] = "X"
print(my_tuple[1], my_list[1])  # B X

locations = {(17.38, 78.48): "Hyderabad"}  # a tuple as a dict key
print(locations[(17.38, 78.48)])  # Hyderabad
