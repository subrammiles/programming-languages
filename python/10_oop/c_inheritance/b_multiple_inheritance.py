"""
Multiple inheritance: a class can have several parents.
 class Child(Parent1, Parent2):
If both parents have the same method, the one listed FIRST wins (see e_mro.py).
Often used for small "mixin" classes that add one ability.
"""


class Boat:
    def boat(self):
        print("I float on water")


class Home:
    def home(self):
        print("People live in me")


class BoatHome(Home, Boat):
    pass


boat_home = BoatHome()
boat_home.boat()
boat_home.home()


class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)


class User(JsonMixin):
    def __init__(self, name):
        self.name = name


print(User("Asha").to_json())  # {"name": "Asha"}
