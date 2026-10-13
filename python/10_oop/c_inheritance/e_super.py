"""
super() calls the parent's version of a method.
Most common in __init__, so the parent can set up its part of the object.
"""


class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def describe(self):
        return f"{self.name} earns {self.salary}"


class Manager(Employee):
    def __init__(self, name, salary, reports):
        super().__init__(name, salary)  # let Employee set name and salary
        self.reports = reports

    def describe(self):
        return super().describe() + f" and manages {len(self.reports)} people"


m = Manager("Asha", 150000, ["Ravi", "Meena"])
print(m.describe())  # Asha earns 150000 and manages 2 people
