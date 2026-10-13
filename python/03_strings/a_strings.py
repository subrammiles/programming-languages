"""
Strings (str) are sequences of Unicode characters.
Create with 'single', "double" or '''triple''' / \"\"\"triple\"\"\" quotes (triple = multi-line).
Strings are IMMUTABLE: methods return a new string; the original never changes.
"""

letter = "S"
name = "Subbu"


def immutability():
    print("<<<< strings cannot be changed in place >>>>")
    try:
        name[0] = "P"
    except TypeError as e:
        print(e)  # 'str' object does not support item assignment
    new_name = "P" + name[1:]  # build a new string instead
    print(new_name)  # Pubbu


def basic_operations():
    print("<<<< basic operations >>>>")
    print(letter * 10)  # SSSSSSSSSS
    print(letter + "Garu")  # SGaru
    print(name.upper())  # SUBBU
    print(name.lower())  # subbu
    print(len(name))  # 5


def formatting():
    print("<<<< three ways to format >>>>")
    print("This %s is %d years old" % (name, 30))  # old printf style
    print("This {2}{1}{0}".format("one", "two", "three"))  # This threetwoone
    print(f"Hello, I am {name}")  # f-string: the modern way


def multi_line():
    print("<<<< multi-line strings >>>>")
    poem = """Roses are red,
Violets are blue."""
    print(poem)


immutability()
basic_operations()
formatting()
multi_line()
