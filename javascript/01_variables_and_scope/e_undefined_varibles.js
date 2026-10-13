
/*
Variables should be initialized before accessing it. 
Unassigned variable has value undefined
*/
var x;
let y;
// const z; //const must be initialized while defining it

console.log(x);
console.log(y);
// console.log(z)

/*
In JS, an undeclared variable is assigned the value 
undefined at execution and is also of type undefined.
*/
console.log(typeof variable); // Output: undefined

/*
access a previously undeclared variable thrown an ReferenceError 
*/
console.log(variable2); // Output: ReferenceError: variable is not defined