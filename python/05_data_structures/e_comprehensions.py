"""
Comprehensions: build a list/set/dict from another iterable in one line.
 [expression for item in iterable if condition]
 {expression for ...}            set
 {key: value for ...}            dict
 (expression for ...)            generator (lazy, see chapter 11)
Python 3.15: [*x for x in lists] unpacks inside a comprehension.
"""
numbers = range(1, 11)

squares = [n * n for n in numbers]
evens = [n for n in numbers if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in range(4)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
print(evens)  # [2, 4, 6, 8, 10]
print(labels)  # ['even', 'odd', 'even', 'odd']

print("<<<< the same with a loop >>>>")
result = []
for n in numbers:
    if n % 2 == 0:
        result.append(n)
print(result == evens)  # True

print("<<<< set and dict comprehensions >>>>")
words = ["apple", "avocado", "banana", "blueberry"]
print(sorted({w[0] for w in words}))  # ['a', 'b']
print({w: len(w) for w in words})  # {'apple': 5, 'avocado': 7, 'banana': 6, 'blueberry': 9}
prices = {"tea": 20, "coffee": 150}
print({k: v * 1.1 for k, v in prices.items() if v > 50})  # {'coffee': 165.0...}

print("<<<< nested >>>>")
matrix = [[1, 2, 3], [4, 5, 6]]
print([cell for row in matrix for cell in row])  # [1, 2, 3, 4, 5, 6] -> flatten
print([[row[i] for row in matrix] for i in range(3)])  # [[1, 4], [2, 5], [3, 6]] -> transpose

print("<<<< Python 3.15: unpacking in comprehensions >>>>")
print([*row for row in matrix])  # [1, 2, 3, 4, 5, 6]
