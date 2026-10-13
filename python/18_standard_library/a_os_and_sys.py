"""
os  - talk to the operating system: environment variables, files, processes
sys - information about the Python interpreter: arguments, version, paths, exit
"""
import os
import sys

print("<<<< os >>>>")
print(os.name, os.getcwd() != "")  # posix True
print(os.environ.get("HOME", "not set"))
print(os.getenv("MY_APP_DEBUG", "false"))  # read config from environment variables
print(os.cpu_count() >= 1)  # True
print(os.path.join("data", "2026", "file.csv"))  # data/2026/file.csv
print(os.path.splitext("report.final.pdf"))  # ('report.final', '.pdf')

print("<<<< sys >>>>")
print(sys.version_info >= (3, 12))  # True
print(sys.argv)  # [script name, *arguments]  -> try: python3 a_os_and_sys.py hello
print(sys.platform)  # linux / darwin / win32
print(sys.maxsize)
print(sys.getsizeof([]), "bytes for an empty list")
sys.stdout.write("written directly to stdout\n")
# sys.exit(1)  -> stop the program with an exit code
