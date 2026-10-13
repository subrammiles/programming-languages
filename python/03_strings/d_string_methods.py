"""
Common string methods (all return NEW strings or values)
"""
s = "  Hello, Python World!  "

print("<<<< case >>>>")
print("python".capitalize(), "hello world".title(), "AbC".swapcase(), "ß".casefold())
# Python Hello World aBc ss

print("<<<< whitespace >>>>")
print(f"[{s.strip()}]")  # [Hello, Python World!]
print(f"[{s.lstrip()}]")  # [Hello, Python World!  ]
print(f"[{'xxhixx'.strip('x')}]")  # [hi]

print("<<<< search >>>>")
t = s.strip()
print(t.find("Python"))  # 7  (-1 if not found)
print(t.index("World"))  # 14 (ValueError if not found)
print(t.count("o"))  # 3
print(t.startswith("Hello"), t.endswith("!"))  # True True

print("<<<< replace, split, join >>>>")
print(t.replace("World", "Universe"))  # Hello, Python Universe!
print("a,b,,c".split(","))  # ['a', 'b', '', 'c']
print("one  two\tthree".split())  # ['one', 'two', 'three'] -> any whitespace
print("k=v=x".split("=", 1))  # ['k', 'v=x']
print("-".join(["2026", "10", "13"]))  # 2026-10-13
print("line1\nline2".splitlines())  # ['line1', 'line2']
print("key: value".partition(": "))  # ('key', ': ', 'value')

print("<<<< removeprefix / removesuffix (3.9) >>>>")
print("test_login.py".removeprefix("test_").removesuffix(".py"))  # login

print("<<<< checks >>>>")
print("123".isdigit(), "abc".isalpha(), "abc123".isalnum(), "   ".isspace())  # True True True True

print("<<<< alignment >>>>")
print("[" + "hi".center(10, "*") + "]")  # [****hi****]
print("[" + "hi".ljust(6) + "]", "[" + "hi".rjust(6) + "]")  # [hi    ] [    hi]
print("42".zfill(5))  # 00042
