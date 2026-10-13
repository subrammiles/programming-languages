"""
Other lightweight record types
 typing.NamedTuple   an immutable tuple with named, typed fields
 types.SimpleNamespace  a quick object with attributes, no class needed
 dataclass           the most flexible (previous files)
"""
from types import SimpleNamespace
from typing import NamedTuple


class Point(NamedTuple):
    x: float
    y: float = 0.0

    def distance(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5


p = Point(3, 4)
print(p, p.distance())  # Point(x=3, y=4) 5.0
x, y = p  # it is still a tuple
print(x, p[1], p._asdict())  # 3 4 {'x': 3, 'y': 4}

settings = SimpleNamespace(debug=True, port=8000)
settings.host = "localhost"
print(settings)  # namespace(debug=True, port=8000, host='localhost')
