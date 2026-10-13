"""
List methods
 append(x) extend(iterable) insert(i, x) remove(x) pop([i]) clear()
 index(x) count(x) sort(key=, reverse=) reverse() copy()
"""
fruits = ["apple", "banana"]
fruits.append("cherry")
fruits.extend(["date", "fig"])  # add many
fruits.insert(1, "avocado")
print(fruits)  # ['apple', 'avocado', 'banana', 'cherry', 'date', 'fig']

fruits.remove("banana")  # first match; ValueError if missing
print(fruits.index("cherry"), fruits.count("apple"))  # 2 1

fruits.reverse()
print(fruits)  # ['fig', 'date', 'cherry', 'avocado', 'apple']

print("<<<< sort with a key >>>>")
words = ["banana", "apple", "Cherry", "kiwi"]
words.sort()
print(words)  # ['Cherry', 'apple', 'banana', 'kiwi'] -> capital letters sort before lowercase
words.sort(key=str.lower)
print(words)  # ['apple', 'banana', 'Cherry', 'kiwi'] -> case-insensitive
words.sort(key=len, reverse=True)
print(words)  # ['banana', 'Cherry', 'apple', 'kiwi'] -> longest first

people = [("Asha", 30), ("Ravi", 25), ("Meena", 35)]
print(sorted(people, key=lambda p: p[1]))  # sorted by age

print("<<<< append vs extend >>>>")
a = [1, 2]
a.append([3, 4])
b = [1, 2]
b.extend([3, 4])
print(a, b)  # [1, 2, [3, 4]] [1, 2, 3, 4]

copy = fruits.copy()
fruits.clear()
print(fruits, len(copy))  # [] 5
