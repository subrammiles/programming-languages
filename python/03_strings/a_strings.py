

letter="S";
name="Subbu";
def method1():
    # gives error as strigs are immutable
    name[0]="P"

def method2():
    print(letter*10)
    print(letter+"Garu")
    print(name.upper())
    print(name.lower())

# String Interpolation
def method3():
    print('This {2}{1}{0}'.format('one','two','three'))
    
# String literaler
def method4():
    print(f'Hello,I am {name}')
        
    

#method1()
method2()
method3()
method4()