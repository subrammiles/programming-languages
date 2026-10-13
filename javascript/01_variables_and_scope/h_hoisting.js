
/*
Hoisting is a JavaScript mechanism where variables and function 
declarations are moved to the top 
of their scope(global or functional) before code execution
 */

/*
The hoisting mechanism only moves the declaration. 
The assignments are left in place.
*/
console.log(h);///Prints undefiend
var h="I am var hoisting";

///Gives error "Cannot access 'x' before initialization"
console.log(x);
let x="I am var hoisting";
/* If x is not declayled then we get ReferenceError : x is not defined
and if "x" is declayrd but not initialization then we get 
"Cannot access 'x' before initialization"
*/
z=2;
console.log(z)
var z;