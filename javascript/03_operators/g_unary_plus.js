/*
1.The arithmetic unary plus (+) operator precedes(come before in order or position) 
its operand.
2.It is used to convert its operand to a number, if it isn’t already a number. 
3.If it cannot parse a particular value, it will evaluate to NaN.
*/

const x= 10;
const y=-10;

console.log(+x);
/*Output: 10*/

console.log(+y);
/*Output: -10*/

const z = "100";
let temp; 
temp = +z; 
console.log(temp); /*Output: 10*/
console.log(typeof y); /*Output: number*/ 

console.log(+true);
//*Output: 1*/

console.log(+false);
/*Output: 0*/

console.log(+'hello');
/*Output: NaN*/

console.log(+'');
/*Output: 0*/

console.log(+function (val) { return val; }) 
/*Output: NaN*/