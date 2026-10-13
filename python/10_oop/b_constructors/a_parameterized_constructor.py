
#The non-parameterized constructor uses when we do not want to manipulate the value or the constructor 
# that has only self as an argument. 


class Test1:
    def __init__(self,myName):
        self.name=myName;
        #We are adding "name" to current object.We also assiging value to it 
    def show(self):
        print(self.name);
        #We are using the  name from the current object that we assinged in the constracture

test1=Test1("Subbu");
test1.show()
