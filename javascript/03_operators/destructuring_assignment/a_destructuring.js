/*
Destructuring assignment:  
It is possible to unpack values from arrays, or properties from objects, 
into distinct variables.
*/
const myArray1 = [10, 20, 30, 40, 50];
[num1, num2, num3, num4] = myArray1;
console.log(num1, num2, num3, num4);
/*We unpacked values into the variables  num1,num2,num3 and num4  */

let a, b;
[a, b, ...rest] = [10, 20, 30, 40, 50,60];
/*In this We used rest property( ...rest ) which selects all the elements 
expect the 0th and 1st index. 
*/
console.log(rest); // output: Array [30, 40, 50,60]

const myObj1 = {
  x: "test",
  y: { apple: 23, Mango: 34 },
  q: "test",
};

//x,y,z are keys and they must be keys of the myObj
const { x, y, z } = myObj1;

console.log(x, y);

const myObj2 = {
    k1: "US",
    k2: "India",
    k3: "China",
    k4: "Canada",
    k5: "Russia",
  };
  
  
  const { k1, k4, ...restOfTheCountries } = myObj2;
  
  console.log(k1, k4,restOfTheCountries);
