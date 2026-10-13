/*
Function types describe a function's parameters and return type.
 (a: number, b: number) => number
They type callbacks, variables that hold functions, and object methods.
*/

type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b; // a and b are inferred from the type
const multiply: MathOperation = (a, b) => a * b;

function calculate(op: MathOperation, x: number, y: number): number {
  return op(x, y);
}
console.log(calculate(add, 2, 3), calculate(multiply, 2, 3)); // 5 6

// Callbacks
function repeat(times: number, callback: (index: number) => void): void {
  for (let i = 0; i < times; i++) callback(i);
}
repeat(3, (i) => console.log("call", i));

// A function returning a function
function makeGreeter(greeting: string): (name: string) => string {
  return (name) => `${greeting}, ${name}!`;
}
console.log(makeGreeter("Hi")("Subbu")); // Hi, Subbu!

// Method signatures in an object type
type Counter = { count: number; increment(by?: number): void };
const counter: Counter = {
  count: 0,
  increment(by = 1) {
    this.count += by;
  },
};
counter.increment();
counter.increment(5);
console.log(counter.count); // 6
