

#we can modify the nested elements of an element if the element itself is a mutable data type like a list.

myTuple=(1,2,3,["a","b","x"])

myTuple[-1][2]="c";

print(myTuple);