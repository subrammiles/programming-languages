"""
Class variables are shared by ALL objects of the class.
Instance variables (self.x, usually set in __init__) belong to ONE object.
"""


class Dog:
    species = "Canis familiaris"  # class variable
    count = 0

    def __init__(self, name):
        self.name = name  # instance variable
        Dog.count += 1

    def describe(self):
        print(f"{self.name} is a {self.species}")


a = Dog("Bruno")
b = Dog("Tiger")
a.describe()  # Bruno is a Canis familiaris
b.describe()
print(Dog.count)  # 2

print("<<<< careful: assigning through self creates an INSTANCE variable >>>>")
a.species = "robot dog"  # only a changes; it now hides the class variable
print(a.species, "|", b.species, "|", Dog.species)  # robot dog | Canis familiaris | Canis familiaris

print("<<<< careful: a mutable class variable is shared >>>>")
class Team:
    members = []  # shared by every Team!

    def add(self, name):
        self.members.append(name)

t1, t2 = Team(), Team()
t1.add("Asha")
print(t2.members)  # ['Asha'] -> create lists in __init__ instead
