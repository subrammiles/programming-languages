"""
Values can be anything, including other dicts and lists (nested data, like JSON).
"""
my_dict = {"a": 1, "b": True, "c": [1, 2, 3, 4], "d": (1, 2), "e": {1, 2}, "f": {"a": 1}}
print(my_dict)
my_dict["a"] = 34
print(my_dict["a"])  # 34
print(list(my_dict.keys()))  # ['a', 'b', 'c', 'd', 'e', 'f']

user = {
    "name": "Asha",
    "address": {"city": "Hyderabad", "pin": "500001"},
    "skills": ["python", "sql"],
}
print(user["address"]["city"])  # Hyderabad
print(user["skills"][-1])  # sql
