
//3 three ways to create a function in JavaScript:

/*1.Function Declaration: the function in the main code flow*/

function sumOfTwoNumbers(a, b) {
  let result = a + b;
  return result;
}
/*2.Function Expression: the function in the context of an expression*/

let sumOfTwoNumbers = function(a, b) {
  let result = a + b;
  return result;
};
//3.Arrow functions:

// expression on the right side
let sumOfTwoNumbers = (a, b) => a + b;

// or multi-line syntax with { ... }, need "return" here:
let sumOfTwoNumbers = (a, b) => {
  // ...
  return a + b;
}

// without arguments
let sayHi = () => alert("Hello");

// with a single argument
let double = t => t * 2;