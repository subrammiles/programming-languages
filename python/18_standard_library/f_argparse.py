"""
argparse - build command-line interfaces with help text for free.
Try:
  python3 f_argparse.py --help
  python3 f_argparse.py data.csv --limit 5 -v
"""
import argparse

parser = argparse.ArgumentParser(description="Summarise a CSV file.")
parser.add_argument("path", nargs="?", default="example.csv", help="file to read")
parser.add_argument("--limit", type=int, default=10, help="rows to show (default 10)")
parser.add_argument("-v", "--verbose", action="store_true", help="print more detail")
parser.add_argument("--format", choices=["table", "json"], default="table")

args = parser.parse_args()
print(args)
print(f"reading {args.path}, limit={args.limit}, verbose={args.verbose}, format={args.format}")
