"""
continue skips the rest of the current iteration and goes to the next one.
"""

for i in [1, 2, 3, 4, 5]:
    if i == 3:
        continue
    print(i)
# 1 2 4 5

# Skip blank lines and comments
lines = ["x = 1", "", "# comment", "y = 2"]
for line in lines:
    if not line or line.startswith("#"):
        continue
    print("code:", line)
