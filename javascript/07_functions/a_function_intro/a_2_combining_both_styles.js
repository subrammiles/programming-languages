
/* It is possible to combine Function declarations style
and Function expression style : */

var x = function test(a, b) {
  /*both x and test are  visible (defined) here */
  return a +b
};
console.log(x(4, 3))
/* x is visible but test is undefined here */
console.log(x)
console.log(test)//Uncaught ReferenceError

/*In this case, both xyz and abc are aliases of the 
same object:*/

console.log(x === test); // prints "true"
