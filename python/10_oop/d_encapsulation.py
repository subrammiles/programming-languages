"""
Encapsulation - hiding internal details.
Python has no private keyword; it uses naming conventions:
 name     public
 _name    "internal, please don't touch" (a convention only)
 __name   name mangling: stored as _ClassName__name, so it's hard to reach by accident
          and subclasses can't clash with it
Use @property (see g_properties.py) to control access instead of getters/setters.
"""


class Employee:
    __count = 0  # mangled class variable

    def __init__(self, name, salary):
        self.name = name
        self._department = "IT"  # internal by convention
        self.__salary = salary  # mangled
        Employee.__count += 1

    def display(self):
        print(f"employees: {Employee.__count}, {self.name} earns {self.__salary}")


emp = Employee("Asha", 90000)
emp2 = Employee("Ravi", 70000)

print(emp._department)  # IT -> allowed, but a signal not to
try:
    print(emp.__salary)
except AttributeError as e:
    print("AttributeError:", e)

print(emp._Employee__salary)  # 90000 -> still reachable; mangling is not security
emp.display()  # employees: 2, Asha earns 90000
