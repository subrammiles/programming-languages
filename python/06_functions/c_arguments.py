# Function Arguments
# The following are the types of arguments that we can use to call a function:

# Default arguments:A default argument is a kind of parameter that 
# takes as input a default value if no value is supplied for the argument when
#  the function is called.

def test1(x=40):
    print(x);
test1()
test1(56)   


# Keyword arguments:The arguments in a function called are connected to keyword arguments.
def test2(x,y):
    print(x);
    print(y);
test2(x="Subbu",y="Gabbu")

# Required arguments:The arguments given to a function while calling in a pre-defined positional sequence are required arguments. The count of required arguments in the method call must be equal to the count of arguments provided while defining the function.
def test3(x,y):
    print(x);
    print(y);

try:
 test3(x="Subbu") # gives an error
except:
    pass

# Variable-length arguments:We can use special characters in Python functions to pass as many arguments as we want in a function. There are two types of characters that we can use for this purpose:
#    *args -These are Non-Keyword Arguments
#    **kwargs - These are Keyword Arguments.

def method2(*args):
    print("<<<<<<<<<Method1>>>>>>>>>") 
    for a in args:
        print(a);

def method3(**kwargs):
    print("<<<<<<<<<Method1>>>>>>>>>")
    print(kwargs);        
    
method2(1,2,3,4,5)
method3(fruit="apple",game="Cricket")