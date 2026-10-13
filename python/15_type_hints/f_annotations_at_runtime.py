"""
Deferred evaluation of annotations (Python 3.14)
Annotations are now evaluated lazily, only when something asks for them.
 - forward references just work: a class can mention itself or a class defined later
   without quotes or "from __future__ import annotations"
 - annotationlib.get_annotations() reads them in different formats
Requires Python 3.14+.
"""
import annotationlib


class Node:
    def __init__(self, value: int, next: Node | None = None):  # Node used inside Node
        self.value = value
        self.next = next


def connect(a: Server, b: Server) -> Link:  # Server and Link are defined BELOW
    return Link()


class Server: ...
class Link: ...


print(annotationlib.get_annotations(Node.__init__))
# {'value': <class 'int'>, 'next': __main__.Node | None}
print(annotationlib.get_annotations(connect, format=annotationlib.Format.STRING))
# {'a': 'Server', 'b': 'Server', 'return': 'Link'}
