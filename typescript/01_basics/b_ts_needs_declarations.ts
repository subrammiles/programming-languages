/*
In TypeScript you must declare variables with let, const or var.
 a = 2;   // error TS2304: Cannot find name 'a'.
 let    - can be reassigned, block scoped
 const  - cannot be reassigned, block scoped (use it by default)
 var    - old function-scoped declaration; avoid it
*/

var a = 2;
let myFirstLetVar = 3.56;
const myFirstConstVar = "st";
console.log(a, myFirstLetVar, myFirstConstVar);
