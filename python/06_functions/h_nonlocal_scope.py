
# The keyword nonlocal is designed to indicate that a variable within a
#  function that is inside a function, i.e., a nested function is just not local to it, 
# implying that it is located in the outer function. 
def the_outer_function():  
    var = 10  
    def the_inner_function():  
        nonlocal var  
        var = 14  
        print("The value inside the inner function: ", var)  
    the_inner_function()  
    print("The value inside the outer function: ", var)  
  
the_outer_function()  


