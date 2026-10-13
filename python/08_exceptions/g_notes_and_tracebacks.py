"""
 e.add_note("...")  attach extra context to an exception (3.11)
 traceback module   print or format the stack trace yourself
"""
import traceback


def parse_row(row_number, text):
    try:
        return int(text)
    except ValueError as e:
        e.add_note(f"while parsing row {row_number}")
        raise


try:
    parse_row(7, "abc")
except ValueError as e:
    print(e)  # invalid literal for int() with base 10: 'abc'
    print(e.__notes__)  # ['while parsing row 7']
    print("".join(traceback.format_exception_only(e)), end="")
