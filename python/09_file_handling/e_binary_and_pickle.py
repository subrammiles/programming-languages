"""
Binary files and pickle
 "rb" / "wb" read and write bytes
 pickle saves almost any Python object to bytes and back.
WARNING: never unpickle data from a source you don't trust; it can run code.
For data shared with other programs, use JSON instead.
"""
import pickle
import tempfile
from pathlib import Path

folder = Path(tempfile.mkdtemp())

print("<<<< bytes >>>>")
image = folder / "pixel.bin"
image.write_bytes(bytes([255, 0, 128]))
data = image.read_bytes()
print(data, list(data))  # b'\xff\x00\x80' [255, 0, 128]

print("<<<< pickle >>>>")
state = {"level": 3, "inventory": {"sword", "shield"}, "position": (10, 20)}
save = folder / "game.pkl"
with save.open("wb") as f:
    pickle.dump(state, f)
with save.open("rb") as f:
    loaded = pickle.load(f)
print(loaded == state, type(loaded["inventory"]).__name__)  # True set -> sets and tuples survive

for p in folder.iterdir():
    p.unlink()
folder.rmdir()
