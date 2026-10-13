"""
Lambda: a small anonymous function written in one expression.
 lambda arguments: expression
Good for short functions passed to sorted(), map(), filter(), max() ...
If it needs a name or more than one line, use def instead.
"""

add = lambda a, b: a + b
print(add(1, 2))  # 3

# The usual use: as a key function
words = ["banana", "kiwi", "apple"]
print(sorted(words, key=lambda w: len(w)))  # ['kiwi', 'apple', 'banana']

people = [{"name": "Asha", "age": 30}, {"name": "Ravi", "age": 25}]
youngest = min(people, key=lambda p: p["age"])
print(youngest["name"])  # Ravi
