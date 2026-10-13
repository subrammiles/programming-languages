"""

 class <DerivedClassName>(<BaseClass1>,<BaseClass2>):
    ////Body
"""

class Boat:
    def boat(self):
        print("I will float on Water")

class Home:
    def home(self):
        print("People use me to live ")

class BoatHome(Home,Boat):
    pass;

boatHome = BoatHome();
boatHome.boat();
boatHome.home();
                
