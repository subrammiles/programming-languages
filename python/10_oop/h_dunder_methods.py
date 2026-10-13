"""
Special ("dunder" = double underscore) methods let your objects work with Python syntax.
 __str__   print(obj), str(obj)          -> for users
 __repr__  the REPL, repr(obj), debugging -> for developers
 __eq__    ==            __lt__ <  (with functools.total_ordering you get the rest)
 __len__   len(obj)      __bool__  if obj:
 __getitem__ obj[i]      __contains__ in      __iter__ for loops
 __call__  obj()         __hash__ for dict keys / sets
"""
from functools import total_ordering


@total_ordering
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return f"'{self.title}'"

    def __repr__(self):
        return f"Book(title={self.title!r}, pages={self.pages})"

    def __eq__(self, other):
        return isinstance(other, Book) and self.pages == other.pages

    def __lt__(self, other):
        return self.pages < other.pages

    def __hash__(self):
        return hash(self.pages)


class Library:
    def __init__(self, *books):
        self.books = list(books)

    def __len__(self):
        return len(self.books)

    def __getitem__(self, index):
        return self.books[index]

    def __contains__(self, title):
        return any(b.title == title for b in self.books)

    def __call__(self, title):
        return next((b for b in self.books if b.title == title), None)


a, b = Book("Python 101", 300), Book("Algorithms", 900)
lib = Library(a, b)

print(a)  # 'Python 101'
print(repr(a))  # Book(title='Python 101', pages=300)
print([a, b])  # lists use repr
print(a < b, a >= b, a == Book("Other", 300))  # True False True
print(len(lib), lib[1], "Algorithms" in lib)  # 2 'Algorithms' True
for book in lib:  # __getitem__ is enough to make it iterable
    print(" -", book)
print(lib("Python 101"))  # 'Python 101'
print(sorted([b, a]))  # [Book(title='Python 101', ...), Book(title='Algorithms', ...)]
