import argparse

from .core import greet


def main() -> None:
    parser = argparse.ArgumentParser(prog="greet", description="Say hello.")
    parser.add_argument("name")
    parser.add_argument("--shout", action="store_true")
    args = parser.parse_args()
    print(greet(args.name, shout=args.shout))


if __name__ == "__main__":
    main()
