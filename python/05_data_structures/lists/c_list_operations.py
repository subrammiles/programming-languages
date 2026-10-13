

l1 = [1, 2, 3, 4]
l2 = [5, 6, 7, 8]

#Repetition	The repetition operator enables the list elements to be repeated multiple times.	
print(l1*2) 
#[1, 2, 3, 4, 1, 2, 3, 4]

# Concatenation	It concatenates the list mentioned on either side of the operator.	
print(l1+l2) 
#[1, 2, 3, 4, 5, 6, 7, 8]



#Membership	It returns true if a particular item exists in a particular list otherwise false.	

print(2 in l1) #prints True.
print(100 in l1) # prints False



# Iteration	The for loop is used to iterate over the list elements.	
for i in l1: 
    print(i)

4

# Length	It is used to get the length of the list	
print(len(l1)) 


# trying to access element index more than the length of a list  

try:
    print(l1[10])
except Exception as e:
   print(e);  
