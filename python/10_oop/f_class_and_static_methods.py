"""
Three kinds of methods
 instance method   def m(self)        works with one object
 @classmethod      def m(cls)         works with the class (alternative constructors, counters)
 @staticmethod     def m()            a plain function that lives in the class for organisation
"""
from datetime import date


class Person:
    population = 0

    def __init__(self, name, birth_year):
        self.name = name
        self.birth_year = birth_year
        Person.population += 1

    def age(self):  # instance method
        return date.today().year - self.birth_year

    @classmethod
    def from_string(cls, text):  # "Asha-1995"
        name, year = text.split("-")
        return cls(name, int(year))

    @classmethod
    def how_many(cls):
        return cls.population

    @staticmethod
    def is_adult(age):
        return age >= 18


p = Person.from_string("Asha-1995")
print(p.name, p.birth_year)  # Asha 1995
print(Person.is_adult(p.age()))  # True
print(Person.how_many())  # 1
