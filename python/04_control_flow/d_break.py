"""
break leaves the innermost loop immediately.
"""

numbers = [1, 2, 3, 4, 5, 6]

for i in numbers:
    print(i)
    if i == 3:
        print("item matches, stopping")
        break
# 1 2 3 item matches, stopping

# break only exits the inner loop
for row in range(3):
    for col in range(3):
        if col == 1:
            break
        print(f"row={row} col={col}")
# row=0 col=0, row=1 col=0, row=2 col=0
