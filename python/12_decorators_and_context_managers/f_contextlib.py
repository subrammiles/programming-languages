"""
contextlib - easier context managers
 @contextmanager   write one as a generator: code before yield = enter, after = exit
 suppress(Exc)     ignore specific exceptions
 redirect_stdout   capture print output
 ExitStack         manage a variable number of context managers
 chdir             temporarily change directory (3.11)
"""
import io
import os
import tempfile
from contextlib import ExitStack, chdir, contextmanager, redirect_stdout, suppress


@contextmanager
def tag(name):
    print(f"<{name}>")
    try:
        yield
    finally:
        print(f"</{name}>")


with tag("div"):
    with tag("p"):
        print("hello")

with suppress(FileNotFoundError):
    os.remove("no-such-file.txt")
print("no error raised")

buffer = io.StringIO()
with redirect_stdout(buffer):
    print("captured!")
print("buffer contains:", buffer.getvalue().strip())

folder = tempfile.mkdtemp()
names = [os.path.join(folder, f"part{i}.txt") for i in range(3)]
with ExitStack() as stack:
    files = [stack.enter_context(open(n, "w")) for n in names]
    for i, f in enumerate(files):
        f.write(f"part {i}")
print(all(f.closed for f in files))  # True -> all closed together

with chdir(folder):
    print(sorted(os.listdir(".")))  # ['part0.txt', 'part1.txt', 'part2.txt']
for n in names:
    os.remove(n)
os.rmdir(folder)
