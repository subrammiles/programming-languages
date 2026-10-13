r"""
re - regular expressions (patterns for searching text)
 re.search   first match anywhere          re.match     match at the START only
 re.fullmatch the whole string must match  re.findall   all matches as strings
 re.finditer all matches as Match objects  re.sub       replace
 re.split    split on a pattern            re.compile   reuse a pattern
Use raw strings r"..." for patterns so backslashes reach the regex engine.
 \d digit  \w word char  \s space  .  any  ^ start  $ end
 * 0+  + 1+  ? 0/1  {2,4} 2 to 4   [abc] one of   (group)   (?P<name>group)
"""
import re

text = "Order #123 shipped to asha@example.com on 2026-10-13; order #456 pending"

print(re.search(r"#(\d+)", text).group(1))  # 123
print(re.findall(r"#(\d+)", text))  # ['123', '456']
print(re.findall(r"[\w.]+@[\w.]+\.\w+", text))  # ['asha@example.com']

m = re.search(r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})", text)
print(m.group("year"), m["month"], m.groupdict())  # 2026 10 {...}

print(re.sub(r"(\d{4})-(\d{2})-(\d{2})", r"\3/\2/\1", "due 2026-10-13"))  # due 13/10/2026
print(re.sub(r"#(\d+)", lambda m: f"#{int(m[1]) * 2}", "items #2 and #5"))  # items #4 and #10
print(re.split(r"[;,\s]+", "a, b;c  d"))  # ['a', 'b', 'c', 'd']

print("<<<< flags and compile >>>>")
pattern = re.compile(r"^order", re.IGNORECASE | re.MULTILINE)
print(pattern.findall("Order 1\norder 2\nnot an order"))  # ['Order', 'order']

print(bool(re.fullmatch(r"[6-9]\d{9}", "9876543210")))  # True -> Indian mobile number
print(bool(re.match(r"\d+", "abc123")), bool(re.search(r"\d+", "abc123")))  # False True

print("<<<< greedy vs lazy >>>>")
html = "<b>bold</b> and <i>italic</i>"
print(re.findall(r"<.+>", html))  # ['<b>bold</b> and <i>italic</i>'] greedy
print(re.findall(r"<.+?>", html))  # ['<b>', '</b>', '<i>', '</i>']  lazy
