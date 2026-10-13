
#The non-parameterized constructor uses when we do not want to manipulate the value or the constructor 
# that has only self as an argument. 


class Test1:
    def __init__(self):
        print("This is a constracture call")
    def show(self,name):
        print(name);

test1=Test1();
test1.show("Subbu")
