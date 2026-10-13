// In JavaScript a variable can hold a number now and a string later.
// Run: node 01_basics/d_js_mutability.js

function testTheVariablesMutability() {
  let x1 = 1;
  var y1 = 2;
  x1 = "Subbu"; // allowed in JavaScript
  y1 = "Subbu";
  console.log(x1, y1); // Subbu Subbu
}

testTheVariablesMutability();
