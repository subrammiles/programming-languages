
/*
JavaScript functions can be loosely classified as the following:
1.Function declarations
2.Function expressions
*/

/// Function declarations
function hello1()  {
  console.log("Hello,I am a function and my name is hello1")
};
hello1();

////Function expressions
////The function keyword can be used to define a function
//// inside an expression.

//  function (a, b) {
//   return a * b
// };
// SyntaxError: Function statements require a function name
var x = function (a, b) {
  return a +b
};
console.log(x(4, 3))