


t=(1,2,3,4,5,6)
# Accessing elements

print(t[1]);

# Iterating 

for i in t:
    print(i);

# trying to access element index more than the length of a tuple  

try:
    print(t[10])
except Exception as e:
   print(e);  
