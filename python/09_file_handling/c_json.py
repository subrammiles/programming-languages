"""
JSON - the most common data format for APIs and config files.
 json.dumps(obj) -> str       json.loads(str) -> obj
 json.dump(obj, file)         json.load(file)
Python dict/list/str/int/float/bool/None  <->  JSON object/array/string/number/true/false/null
"""
import json
import tempfile
from pathlib import Path

user = {"name": "Asha", "age": 30, "skills": ["python", "sql"], "active": True, "manager": None}

text = json.dumps(user)
print(text)  # {"name": "Asha", "age": 30, "skills": ["python", "sql"], "active": true, "manager": null}
print(json.dumps(user, indent=2, sort_keys=True))

back = json.loads(text)
print(back["skills"][0], back == user)  # python True

print("<<<< files >>>>")
path = Path(tempfile.mkdtemp()) / "user.json"
with path.open("w", encoding="utf-8") as f:
    json.dump(user, f, indent=2)
with path.open(encoding="utf-8") as f:
    print(json.load(f)["name"])  # Asha

print("<<<< things JSON cannot store directly >>>>")
from datetime import date
try:
    json.dumps({"day": date(2026, 10, 13)})
except TypeError as e:
    print(e)  # Object of type date is not JSON serializable
print(json.dumps({"day": date(2026, 10, 13)}, default=str))  # {"day": "2026-10-13"}
print(json.loads('{"t": [1, 2]}')["t"], json.loads("[1, 2]"))  # tuples become lists

path.unlink()
path.parent.rmdir()
