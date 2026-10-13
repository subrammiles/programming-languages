
"""
[start:stop:step]
"""


mystring="qbcdefghij";

print(mystring[0]) #q
print(mystring[1])#b
print("Start to stop")
print(mystring[0:1]) # excludes 1st index
print(mystring[0:]) # This will gives including element from index 0 to rest
print(mystring[1:]) # This will gives including element from index 1 to rest
print(mystring[:1])# 0th index to 1st index.Excluding 1st index

print(mystring[:4])# 0th index to 1st index.Excluding 4st index
print(mystring[::])
print("Step")
print(mystring[::1])
print(mystring[::-1])
print(mystring[::2])