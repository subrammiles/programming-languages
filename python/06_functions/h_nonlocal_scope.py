"""
nonlocal lets a nested function assign to a variable of the ENCLOSING function
(not the global one).
"""


def the_outer_function():
    var = 10

    def the_inner_function():
        nonlocal var
        var = 14
        print("inside the inner function:", var)

    the_inner_function()
    print("inside the outer function:", var)  # 14 -> changed by the inner function


the_outer_function()
