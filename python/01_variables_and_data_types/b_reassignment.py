"""
Assignment never copies a value; it makes a name point to an object.
"""

a = 2
b = a  # b points to the same object as a (the int 2)
a = 23  # a now points to a NEW object; b still points to 2

print(b)  # 2

# With a MUTABLE object (like a list) both names see changes made through either one
list_a = [1, 2]
list_b = list_a
list_a.append(3)
print(list_b)  # [1, 2, 3]  -> same list, two names
# See 05_data_structures/g_copying.py for how to make a real copy
