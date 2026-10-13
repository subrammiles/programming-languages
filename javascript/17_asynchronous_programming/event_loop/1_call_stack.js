/*
The call stack
Each function call is pushed on the stack; when it returns, it is popped.
JS can only do one thing at a time: whatever is on top of the stack.
*/
function third() {
  console.log("3. third");
  console.trace("stack right now");// prints: third <- second <- first <- (main)
}
function second() {
  console.log("2. second");
  third();
}
function first() {
  console.log("1. first");
  second();
}
first();
console.log("4. back in main, stack is empty after this");

// Stack overflow: too many calls without returning
function forever() { return forever(); }
try {
  forever();
} catch (e) {
  console.log(e.constructor.name, "-", e.message);// RangeError - Maximum call stack size exceeded
}
