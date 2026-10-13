"""
Template strings: t"..."  (Python 3.14)
Look like f-strings but DON'T produce a str. They produce a Template object
that keeps the literal text and the interpolated values separate.
A function then decides how to combine them, for example escaping HTML or SQL safely.
Requires Python 3.14+.
"""
from html import escape
from string.templatelib import Interpolation, Template

name = "Asha"
age = 30
t = t"Name: {name}, Age: {age}"

print(type(t).__name__)  # Template
print(t.strings)  # ('Name: ', ', Age: ', '')
print(t.values)  # ('Asha', 30)


def render_html(template: Template) -> str:
    """Escape every interpolated value, keep the literal text as written."""
    parts = []
    for part in template:
        if isinstance(part, Interpolation):
            parts.append(escape(str(part.value)))
        else:
            parts.append(part)
    return "".join(parts)


comment = "<script>alert('hacked')</script>"
print(render_html(t"<p>{comment}</p>"))
# <p>&lt;script&gt;alert(&#x27;hacked&#x27;)&lt;/script&gt;</p>

# With an f-string the dangerous text would go straight into the HTML:
print(f"<p>{comment}</p>")
