/*
Primitive data types such as string, number, 
null, undefined, and boolean, are passed by 
value
*/

let num1 = 70
let num2 = num1

console.log(num1) // 70
console.log(num2) // 70

num1 = 40

console.log(num1) // 40
console.log(num2) // 70


let x = 10;
  primitiveMutator(x);
  function primitiveMutator(val) {
    val = val + 1;
  }
console.log(x); // 10
//x value is not changed because it is passed by value
