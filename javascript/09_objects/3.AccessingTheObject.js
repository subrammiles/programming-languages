/*
Property accessors:
Property accessors provide access to an object's properties by using the dot notation or the bracket notation.

*/
/*
The syntax for accessing the property of an object is:
objectName.property      // person.age
or
objectName["property"]   // person["age"]
or
objectName[expression]   // x = "age"; person[x]
*/
let x={"name":"Subbu","age":28}
let key="age"
console.log(x.age);
console.log(x["age"]);
console.log(x[key])
