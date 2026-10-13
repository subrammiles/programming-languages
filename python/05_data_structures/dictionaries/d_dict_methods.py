"""
Useful dict methods
 get, setdefault, update, pop, popitem, keys, values, items, copy, clear, fromkeys
 |  and |=  merge dicts (Python 3.9)
"""
stock = {"pen": 10, "book": 4}

print(stock.pop("pen"))  # 10 -> remove and return
print(stock.pop("ink", 0))  # 0 -> default instead of KeyError

stock.setdefault("ruler", 1)  # add only if missing
stock.setdefault("book", 999)  # already there: unchanged
print(stock)  # {'book': 4, 'ruler': 1}

stock.update({"book": 5, "bag": 2})
print(stock)  # {'book': 5, 'ruler': 1, 'bag': 2}

print("<<<< merging >>>>")
defaults = {"theme": "light", "lang": "en"}
user_prefs = {"theme": "dark"}
print(defaults | user_prefs)  # {'theme': 'dark', 'lang': 'en'} -> right side wins
print({**defaults, **user_prefs})  # same, works before 3.9

print("<<<< counting with get >>>>")
counts = {}
for word in "the cat and the hat".split():
    counts[word] = counts.get(word, 0) + 1
print(counts)  # {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}

print("<<<< sort a dict by value >>>>")
scores = {"Ravi": 75, "Asha": 92, "Meena": 88}
print(dict(sorted(scores.items(), key=lambda kv: kv[1], reverse=True)))  # {'Asha': 92, 'Meena': 88, 'Ravi': 75}

print(dict.fromkeys(["a", "b"], 0))  # {'a': 0, 'b': 0}
