

d2={"a":1,"b":[1,2,3],"c":"123","d":(2,True)}
print(d2);

#We use keys for iteration
for i in d2:
    print(i)

# Iterate using keys and print values
for i in d2:
    print(d2[i])
   

for key,value in d2.items():
    print(key,value)