
s1="Hello"
s2="World"


# +	It is known as concatenation operator used to join the strings given 
# either side of the operator.

print(s1+s2);

# *	It is known as repetition operator. It concatenates the multiple copies of the same string.
print("Repetation....");
print(s1*3);

# []	It is known as slice operator. It is used to access the sub-strings of a particular string.


# [:]	It is known as range slice operator. It is used to access the characters from the specified range.
# in	It is known as membership operator. It returns if a particular sub-string is present in the specified string.
print("Membership....");
print("W" in s2);
print("a" in s2);

# not in	It is also a membership operator and does the exact reverse of in. It returns true if a particular substring is not present in the specified string.

print("Membership:Not in....");
print("W" not in s2);
print("a" not in s2);

# r/R	It is used to specify the raw string. Raw strings are used in the cases where we need to print the actual meaning of escape characters such as "C://python". To define any string as a raw string, the character r or R is followed by the string.

print("C://python37")
# %	It is used to perform string formatting. It makes use of the format specifiers used in C programming like %d or %f to map their values in python. We will discuss how formatting is done in python.

print("The string str : %s"%(str))
