"""
Highlights of Python 3.14 (October 2025)
 - template strings: t"..." (PEP 750), see 03_strings/g_template_strings.py
 - deferred evaluation of annotations (PEP 649), see 15_type_hints/f_annotations_at_runtime.py
 - free-threaded Python is officially supported (PEP 779)
 - multiple interpreters in the stdlib: concurrent.interpreters, InterpreterPoolExecutor
 - compression.zstd
 - except A, B: without parentheses (PEP 758)
 - a warning for return/break/continue inside finally (PEP 765)
 - uuid.uuid7(), syntax highlighting in the REPL, colour in unittest/argparse output
"""
import uuid
from compression import zstd
from string.templatelib import Template

name = "Asha"
template = t"Hello {name}"
print(isinstance(template, Template), template.values)  # True ('Asha',)

print("<<<< except without parentheses >>>>")
for value in ["x", None]:
    try:
        int(value)
    except ValueError, TypeError:
        print("could not convert", repr(value))

print("<<<< zstd >>>>")
data = b"abc" * 1000
print(len(data), "->", len(zstd.compress(data)), "bytes")

print("<<<< uuid7 >>>>")
ids = [uuid.uuid7() for _ in range(3)]
print(ids == sorted(ids))  # True -> sortable by creation time

print("<<<< annotations are lazy: forward references just work >>>>")
def link(a: Node) -> Node:  # Node is defined below
    return a
class Node: ...
print("no NameError")
