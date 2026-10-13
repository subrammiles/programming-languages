"""
Writing your own iterator class: implement __iter__ and __next__.
(A generator, next file, is usually much shorter.)
"""


class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


for n in Countdown(3):
    print(n)  # 3 2 1


class Range2D:
    """An ITERABLE (reusable): __iter__ returns a fresh iterator every time."""

    def __init__(self, rows, cols):
        self.rows, self.cols = rows, cols

    def __iter__(self):
        for r in range(self.rows):
            for c in range(self.cols):
                yield (r, c)


grid = Range2D(2, 2)
print(list(grid))  # [(0, 0), (0, 1), (1, 0), (1, 1)]
print(len(list(grid)))  # 4 -> works again because __iter__ starts over
