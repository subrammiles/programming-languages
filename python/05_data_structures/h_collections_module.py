"""
collections - specialised containers
 Counter      count things
 defaultdict  dict with a default value for missing keys
 deque        fast append/pop at both ends
 namedtuple   tuple with named fields (see also dataclasses, chapter 14)
 ChainMap     look up keys in several dicts in order
"""
from collections import ChainMap, Counter, defaultdict, deque, namedtuple

print("<<<< Counter >>>>")
votes = Counter(["red", "blue", "red", "green", "red", "blue"])
print(votes)  # Counter({'red': 3, 'blue': 2, 'green': 1})
print(votes.most_common(1))  # [('red', 3)]
print(votes["purple"])  # 0 -> no KeyError
print(Counter("mississippi").most_common(2))  # [('i', 4), ('s', 4)]

print("<<<< defaultdict >>>>")
by_letter = defaultdict(list)
for word in ["apple", "avocado", "banana"]:
    by_letter[word[0]].append(word)  # no need to check if the key exists
print(dict(by_letter))  # {'a': ['apple', 'avocado'], 'b': ['banana']}

print("<<<< deque >>>>")
recent = deque(maxlen=3)  # keeps only the last 3
for page in ["home", "about", "blog", "contact"]:
    recent.append(page)
print(recent)  # deque(['about', 'blog', 'contact'], maxlen=3)
recent.appendleft("start")
recent.rotate(1)
print(recent)

print("<<<< namedtuple >>>>")
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p[1], p)  # 3 4 Point(x=3, y=4)
print(p._replace(x=10))  # Point(x=10, y=4)

print("<<<< ChainMap >>>>")
cli_args = {"debug": True}
env = {"debug": False, "port": 8000}
defaults = {"port": 80, "host": "localhost"}
config = ChainMap(cli_args, env, defaults)
print(config["debug"], config["port"], config["host"])  # True 8000 localhost
