"""
pathlib - object-oriented file paths (the modern way, instead of os.path)
 Path("a") / "b" / "c.txt"   join with /
 .read_text() .write_text() .exists() .mkdir() .glob() .iterdir() .unlink()
"""
import tempfile
from pathlib import Path

root = Path(tempfile.mkdtemp())

notes = root / "docs" / "notes.txt"
notes.parent.mkdir(parents=True, exist_ok=True)
notes.write_text("hello pathlib\n", encoding="utf-8")
print(notes.read_text(encoding="utf-8"), end="")  # hello pathlib

print(notes.name)  # notes.txt
print(notes.stem, notes.suffix)  # notes .txt
print(notes.parent.name)  # docs
print(notes.exists(), notes.is_file(), notes.parent.is_dir())  # True True True
print(notes.with_suffix(".md").name)  # notes.md

(root / "src").mkdir()
for name in ["app.py", "utils.py", "README.md"]:
    (root / "src" / name).write_text("# " + name)

print("<<<< glob >>>>")
print(sorted(p.name for p in (root / "src").glob("*.py")))  # ['app.py', 'utils.py']
print(sorted(p.relative_to(root).as_posix() for p in root.rglob("*") if p.is_file()))
# ['docs/notes.txt', 'src/README.md', 'src/app.py', 'src/utils.py']

print(Path.home().is_dir(), Path.cwd().is_absolute())  # True True

# clean up: delete files first, then folders (deepest first)
for p in sorted(root.rglob("*"), reverse=True):
    p.unlink() if p.is_file() else p.rmdir()
root.rmdir()
print("cleaned up:", not root.exists())
