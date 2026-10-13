#A variable declared outside the function is the global variable by default. 
# Python provides the global keyword to use global variable inside the function. 
# If we don't use the global keyword, the function treats it as a local variable.


a=2

def test1():
    print("I am inside the method a = "+str(a))
   

def test2():
    print("I am inside the method a = "+str(a))
    a=3;
    print("I am inside the method a = "+str(a))   
    # UnboundLocalError: local variable 'a' referenced before assignment 

def test3():
    global b
    b=40;

def test4():
      print("I am testign global b = "+str(b)) 


test1() 
#test2() #commenting as it gives error
test3()  
test4()  