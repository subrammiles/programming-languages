"""
Looping techniques from the official tutorial
 enumerate, zip, reversed, sorted, dict.items, set() for unique items
 any() / all(), and building strings with join
"""
names = ["Asha", "Ravi", "Meena"]
ages = [30, 25, 35]

for i, name in enumerate(names):
    print(i, name)

for name, age in zip(names, ages):
    print(f"{name} is {age}")

for name in reversed(names):
    print(name, end=" ")
print()

for name in sorted(names, key=len):
    print(name, end=" ")  # Asha Ravi Meena
print()

print(any(a > 32 for a in ages))  # True
print(all(a > 18 for a in ages))  # True

print(dict(zip(names, ages)))  # {'Asha': 30, 'Ravi': 25, 'Meena': 35}
print(", ".join(names))  # Asha, Ravi, Meena
