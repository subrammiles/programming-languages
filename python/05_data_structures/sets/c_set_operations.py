"""
Set operations (operator or method):
 a | b   union                 a.union(b)
 a & b   intersection          a.intersection(b)
 a - b   difference            a.difference(b)
 a ^ b   symmetric difference  a.symmetric_difference(b)
 a <= b  subset, a >= b superset, a.isdisjoint(b)
frozenset: an immutable set (can be a dict key or an item of another set)
"""
frontend = {"html", "css", "js", "ts"}
backend = {"python", "js", "sql", "ts"}

print(sorted(frontend | backend))  # ['css', 'html', 'js', 'python', 'sql', 'ts']
print(sorted(frontend & backend))  # ['js', 'ts']
print(sorted(frontend - backend))  # ['css', 'html']
print(sorted(frontend ^ backend))  # ['css', 'html', 'python', 'sql']

print({"html", "css"} <= frontend)  # True
print(frontend.isdisjoint({"go", "rust"}))  # True

frozen = frozenset({"read", "write"})
permissions = {frozen: "editor"}
print(permissions[frozenset({"write", "read"})])  # editor
