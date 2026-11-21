/*
Predict the output: hoisting and the Temporal Dead Zone (TDZ)
Cover the answer comments, guess, then run the file.

Rules:
  - `var` declarations are hoisted and start as undefined
  - `let` / `const` / `class` are hoisted too, but cannot be touched before
    their line runs (the TDZ) -> ReferenceError
  - function DECLARATIONS are hoisted with their body
  - function EXPRESSIONS follow the rules of the variable they are assigned to
*/

console.log("<<<< Q1: var before declaration >>>>");
console.log(a);// undefined
var a = 5;

console.log("<<<< Q2: let before declaration >>>>");
try {
  console.log(b);
  let b = 5;
} catch (e) {
  console.log(e.constructor.name + ": " + e.message);// ReferenceError: Cannot access 'b' before initialization
}

console.log("<<<< Q3: function declaration vs expression >>>>");
console.log(declared());// I am hoisted
try {
  expressed();
} catch (e) {
  console.log(e.constructor.name + ": " + e.message);// TypeError: expressed is not a function
}
function declared() {
  return "I am hoisted";
}
var expressed = function () {
  return "too late";
};

console.log("<<<< Q4: variable shadowing inside a function >>>>");
var x = 1;
function shadow() {
  console.log(x);// undefined   (the local `var x` below is hoisted, hiding the outer x)
  var x = 2;
}
shadow();

console.log("<<<< Q5: function and var with the same name >>>>");
function foo() {
  return 1;
}
var foo;// a declaration without a value does not overwrite the function
console.log(typeof foo);// function

console.log("<<<< Q6: TDZ even when an outer variable exists >>>>");
let y = "outer";
{
  try {
    console.log(y);// the inner `let y` below is in its TDZ here, the outer one is hidden
  } catch (e) {
    console.log(e.constructor.name);// ReferenceError
  }
  let y = "inner";
}

console.log("<<<< Q7: typeof an undeclared vs a TDZ variable >>>>");
console.log(typeof neverDeclared);// undefined   (typeof is safe for undeclared names...)
try {
  console.log(typeof z);// ...but not for names in the TDZ
  let z;
} catch (e) {
  console.log(e.constructor.name);// ReferenceError
}

console.log("<<<< Q8: assignment without a declaration >>>>");
function leak() {
  oops = "global!";// no var/let/const: creates a global (in non-strict code)
}
leak();
console.log(globalThis.oops);// global!
