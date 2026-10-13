
#Tuples are immutable
myTuple1=("A","B","C","D")
myList1=["A","B","C","D"]
print(myTuple1[1])
print(myList1[1])


try:
 myTuple1[1]="X"; # You will get this error: 'tuple' object does not support item assignment
except:
    pass;

    
myList1[1]="X";
print("After changing values")
print(myTuple1[1])
print(myList1[1])


