"""
Reading and writing text files
 open(path, mode, encoding="utf-8")
 modes: "r" read (default), "w" write (empties the file first), "a" append,
        "x" create (fails if it exists), add "b" for binary: "rb", "wb"
Always use "with": it closes the file even if an error happens.
"""
import os
import tempfile

folder = tempfile.mkdtemp()
path = os.path.join(folder, "notes.txt")

print("<<<< write >>>>")
with open(path, "w", encoding="utf-8") as f:
    f.write("line 1\n")
    f.write("line 2\n")
    f.writelines(["line 3\n", "line 4\n"])

print("<<<< append >>>>")
with open(path, "a", encoding="utf-8") as f:
    print("line 5", file=f)  # print can write to a file

print("<<<< read everything >>>>")
with open(path, encoding="utf-8") as f:
    print(f.read())

print("<<<< read line by line (memory friendly for big files) >>>>")
with open(path, encoding="utf-8") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.rstrip("\n"))

print("<<<< read all lines into a list >>>>")
with open(path, encoding="utf-8") as f:
    lines = f.read().splitlines()
print(lines)

print("<<<< x mode refuses to overwrite >>>>")
try:
    open(path, "x")
except FileExistsError as e:
    print("FileExistsError:", e.strerror)

print("<<<< missing file >>>>")
try:
    open(os.path.join(folder, "missing.txt"))
except FileNotFoundError:
    print("file not found")

os.remove(path)
os.rmdir(folder)
