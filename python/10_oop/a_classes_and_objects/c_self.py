

#self refers to the current object.This is optional
#The self-parameter refers to the current instance of the class and accesses the
#  class variables. We can use anything instead of self, but it must be the first 
# parameter of any function which belongs to the class.
class TestMe:
    def printMe1(self):
        print("I am M1")
    def printMe2():
        print("I am M2")

testMe=TestMe();
testMe.printMe1();
#If you pust "()",it indicate we are passing arguments
testMe2=TestMe;
testMe2.printMe2();