"""
CSV files (spreadsheets) with the csv module
 csv.writer / csv.reader       -> rows as lists
 csv.DictWriter / DictReader   -> rows as dicts (uses the header line)
Open with newline="" so line endings are handled correctly.
"""
import csv
import tempfile
from pathlib import Path

path = Path(tempfile.mkdtemp()) / "staff.csv"

rows = [
    {"name": "Asha", "dept": "IT", "salary": 90000},
    {"name": "Ravi", "dept": "HR", "salary": 60000},
    {"name": "Meena, R", "dept": "IT", "salary": 75000},  # comma inside a value gets quoted
]

with path.open("w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "dept", "salary"])
    writer.writeheader()
    writer.writerows(rows)

print(path.read_text(encoding="utf-8"))
# name,dept,salary
# Asha,IT,90000
# Ravi,HR,60000
# "Meena, R",IT,75000

with path.open(newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    it_total = sum(int(row["salary"]) for row in reader if row["dept"] == "IT")
print("IT salaries:", it_total)  # 165000 -> values are read back as strings, so convert

with path.open(newline="", encoding="utf-8") as f:
    header, *data = list(csv.reader(f))
print(header, len(data))  # ['name', 'dept', 'salary'] 3

path.unlink()
path.parent.rmdir()
