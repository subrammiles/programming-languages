"""

"""

print("Hello World");
#Python 3.10 (2021) introduced the match-case statement which provides a first-class implementation of a "switch" for Python. For example:

#def f(x):
    # match x:
    #     case 'a':
    #         return 1
    #     case 'b':
    #         return 2
    #     case _:
    #         return 0   # 0 is the default case if x is not found

def f(x):
    return {
        'a': 1,
        'b': 2
    }.get(x, 9) 
def method1():
    print("<<<<<<<<<Method1>>>>>>>>>")

def method2():
    print("<<<<<<<<<Method1>>>>>>>>>")    

method1()
method2()