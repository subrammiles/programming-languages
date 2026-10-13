"""
 textwrap  - wrap and indent paragraphs
 pprint    - pretty-print nested data
 string    - constants and $-templates
 difflib   - compare texts, "did you mean"
"""
import difflib
import pprint
import string
import textwrap

paragraph = "Python is a programming language that lets you work quickly and integrate systems more effectively."
print(textwrap.fill(paragraph, width=40))
print(textwrap.shorten(paragraph, width=40, placeholder="..."))
print(textwrap.indent("line1\nline2", "> "))
print(textwrap.dedent("""
    indented in the source
    but not in the output
""").strip())

data = {"users": [{"name": "Asha", "roles": ["admin", "dev"], "address": {"city": "Hyderabad", "pin": 500001}}] * 2}
pprint.pp(data, width=60)

print(string.ascii_lowercase, string.digits, string.punctuation[:5])
print(string.Template("Hello $name, you owe $$$amount").substitute(name="Ravi", amount=20))

print(difflib.get_close_matches("pyhton", ["python", "java", "typhon"]))  # ['python']
print(round(difflib.SequenceMatcher(None, "kitten", "sitting").ratio(), 2))  # 0.62
