"""
String operators
 +       concatenation
 *       repetition
 []      index, [:] slice
 in      membership, not in
 r"..."  raw string: backslashes are not escapes
 %       old-style formatting
"""

s1 = "Hello"
s2 = "World"

print(s1 + s2)  # HelloWorld

print("<<<< repetition >>>>")
print(s1 * 3)  # HelloHelloHello

print("<<<< membership >>>>")
print("W" in s2)  # True
print("a" in s2)  # False
print("W" not in s2)  # True

print("<<<< raw strings >>>>")
print("C:\new_folder")  # \n became a new line!
print(r"C:\new_folder")  # C:\new_folder

print("<<<< % formatting (old style, still seen in older code) >>>>")
print("The string is: %s, number: %d, float: %.2f" % ("abc", 7, 3.14159))
# The string is: abc, number: 7, float: 3.14
