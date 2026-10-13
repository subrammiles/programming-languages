"""
by adding the double underscore (___) as a prefix to
 the attribute which is to be hidden. After this, the attribute will not be visible outside of the class through the object.
"""

class Employee:  
    __count = 0;  
    def __init__(self):  
        Employee.__count = Employee.__count+1  
    def display(self):  
        print("The number of employees",Employee.__count)  
emp = Employee()  
emp2 = Employee()  
try:  
    print(emp.__count)  
finally:  
    emp.display()  