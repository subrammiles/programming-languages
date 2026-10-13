"""
if __name__ == "__main__":
Every module has a __name__.
 - Run directly:   __name__ == "__main__"
 - Imported:       __name__ == the module's name
Put "script" code under this check so the file can also be imported safely.
"""


def main():
    print("running as a script")


print("__name__ is", __name__)

if __name__ == "__main__":
    main()
