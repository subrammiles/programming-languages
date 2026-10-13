"""
Polymorphism: the same call works on different types.
Duck typing: "if it walks like a duck and quacks like a duck, it's a duck."
Python doesn't care about the class, only that the object has the method you call.
(typing.Protocol lets type checkers verify this; see chapter 15.)
"""


class PDFExporter:
    def export(self, data):
        return f"PDF with {len(data)} rows"


class CSVExporter:
    def export(self, data):
        return "\n".join(",".join(map(str, row)) for row in data)


class Robot:  # not related to the exporters at all
    def export(self, data):
        return "beep boop " * len(data)


def save(exporter, data):
    print(exporter.export(data))  # no isinstance checks needed


rows = [(1, "Asha"), (2, "Ravi")]
for exporter in [PDFExporter(), CSVExporter(), Robot()]:
    save(exporter, rows)

# Built-in polymorphism: len and + work on many types
print(len("abc"), len([1, 2]), len({"a": 1}))  # 3 2 1
print(1 + 2, "a" + "b", [1] + [2])  # 3 ab [1, 2]
