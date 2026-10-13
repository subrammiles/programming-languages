"""
del removes a NAME. Using the name afterwards raises NameError.
The object itself is freed automatically when no names refer to it.
"""

a = 2
del a
try:
    print(a)
except NameError as e:
    print(e)  # name 'a' is not defined

# del also removes items from lists and dicts
numbers = [10, 20, 30]
del numbers[0]
print(numbers)  # [20, 30]

user = {"name": "Asha", "age": 30}
del user["age"]
print(user)  # {'name': 'Asha'}
