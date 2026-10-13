"""
doctest - examples inside docstrings that are also tests.
Run:  python3 -m doctest -v doctest_example.py   (or python3 doctest_example.py)
"""


def slugify(title):
    """Turn a title into a URL slug.

    >>> slugify("Hello World")
    'hello-world'
    >>> slugify("  Python 3.15 is here!  ")
    'python-315-is-here'
    """
    cleaned = "".join(ch for ch in title.lower() if ch.isalnum() or ch.isspace())
    return "-".join(cleaned.split())


if __name__ == "__main__":
    import doctest
    failures, tests = doctest.testmod()
    print(f"{tests} doctests run, {failures} failed")
