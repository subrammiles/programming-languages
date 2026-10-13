/*
1.The spread (...) syntax allows an iterable(anything you can iterate 
over item by item) such as array ,string objects literals
to be expanded in places where zero or more arguments (for function calls) 
or elements (for array literals) are expected. 
2.the three dots "..." are the spread operator syntax.
*/

/*Array*/

const myArray = [1, 2, 3];
const myArray2 = [...myArray]; 
// the three dots "..." are the spread operator syntax.
console.log(myArray2); //[1,2,3]
/*
The spread operator essentially ‘scooped’ out the insides of 
the myArray array and spread the values across the new array in myArray2.
*/

/*Duplicating Iterable Objects */
const foo = {
  english: "hello",
  french: "bonjour",
  japanese: "konnichiwa",
};
const bar = { ...foo };
console.log(bar);

/**
 Function and spread operator Syntax:
 myFunction(a, ...iterableObj, b)
 */

/**
 myFunction(a, ...iterableObj, b)
[1, ...iterableObj, '4', 'five', 6]
{ ...obj, key: 'value' }
 */

function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];
//Feeding Arguments into Functions
console.log(sum(...numbers));
// Expected output: 6

/*Using the Spread Operator With Strings*/

const userName = "subbu";
const userNameCopy = [...userName];
/*This will break the string subbu up into its individual characters.*/
console.log(userNameCopy);
["s", "u", "b", "b", "u"];

