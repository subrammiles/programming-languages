#Deleting a Tuple
#The elements of a tuple cannot be changed, as was already said. Therefore, we are unable to eliminate or remove elements of a tuple.

#However, the keyword del makes it feasible to delete a tuple completely.

myTuple=(1,2,3,4)

try:
 del myTuple[1];
 #error:'tuple' object doesn't support item deletion
except:
 pass;
del myTuple;
print(myTuple)

