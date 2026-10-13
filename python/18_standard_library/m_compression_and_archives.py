"""
 zlib / gzip / bz2 / lzma   classic compression
 compression.zstd (3.14)    Zstandard: fast with good ratios (used by Linux distros, databases)
 zipfile / tarfile          archives with many files
"""
import gzip
import io
import zipfile
import zlib
from compression import zstd

data = ("Python " * 1000).encode()
print(len(data), "bytes")  # 7000 bytes

for name, compress, decompress in [
    ("zlib", zlib.compress, zlib.decompress),
    ("gzip", gzip.compress, gzip.decompress),
    ("zstd", zstd.compress, zstd.decompress),
]:
    packed = compress(data)
    assert decompress(packed) == data
    print(f"{name}: {len(packed)} bytes")

buffer = io.BytesIO()
with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
    zf.writestr("hello.txt", "hello zip")
    zf.writestr("data/numbers.csv", "1,2,3")
with zipfile.ZipFile(buffer) as zf:
    print(zf.namelist(), zf.read("hello.txt").decode())  # ['hello.txt', 'data/numbers.csv'] hello zip
