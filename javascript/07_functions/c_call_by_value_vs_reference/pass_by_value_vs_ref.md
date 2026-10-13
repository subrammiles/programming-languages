
In function paramaters,
# Primitives
1.Primitive type variables like strings and numbers are always passed by value.

# Arrays and Objects
2.Arrays and Objects are passed by reference or by value based on these conditions:
if you are setting the value of an object or array it is Pass by Value.

 object1 = { prop: "car" };
 array1 = [1,2,3];
if you are changing a property value of an object or array then it is Pass by Reference.

 object1.prop = "car";
 array1[0] = 9;