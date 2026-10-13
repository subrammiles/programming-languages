


#Sets are mutable
myset={1,2,3}
myset.add(4)
print(myset)

# Sets removes dulicate code
myset2={10,20,30,40,10}
print(myset2)

# Update method
myset3={11,36,64}
myset3.update({"a","b"});
print(myset3)

#discard and remove
#Python provides the discard() method and remove() method which can be 
# used to remove the items from the set. The difference between these function, 
# using discard() function if the item does not exist in the set then the set
#  remain unchanged whereas remove() method will through an error.
myset4={111,336,644}
myset4.discard(336)
myset4.discard(66)
print(myset4)

myset5={111,336,644}
myset5.remove(336)
try:
    myset5.remove(66)
except:
    pass    
print(myset5)